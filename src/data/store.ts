import { useState, useEffect } from 'react';
import {
  UserRole,
  AuthUser,
  StudentProfile,
  SubjectAttendance,
  SubjectMark,
  Assignment,
  LeaveRequest,
  SmartNotification,
  CampusLab,
  DocumentAnalysisResult,
  StudyPlanSession
} from '../types';
import {
  STUDENTS_SEED,
  STUDENT_ATTENDANCE_SEED,
  STUDENT_MARKS_SEED,
  ASSIGNMENTS_SEED,
  NOTIFICATIONS_SEED,
  CAMPUS_LABS_SEED,
  LEAVE_REQUESTS_SEED,
  STUDY_SESSIONS_SEED
} from './seedData';

export const DEFAULT_AUTH_USER: AuthUser = {
  id: 'std-1',
  name: 'Alex Chen',
  email: 'alex.chen@smartcampus.edu',
  role: 'STUDENT',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Computer Science & Engineering',
  rollNumber: 'CS23B1042',
  lastLogin: 'Just now',
  authMethod: 'password'
};

export interface AppState {
  isAuthenticated: boolean;
  currentUser: AuthUser;
  currentRole: UserRole;
  currentStudentId: string;
  isDarkMode: boolean;
  students: StudentProfile[];
  attendance: SubjectAttendance[];
  marks: SubjectMark[];
  assignments: Assignment[];
  notifications: SmartNotification[];
  labs: CampusLab[];
  leaveRequests: LeaveRequest[];
  studySessions: StudyPlanSession[];
  analyzedDocuments: DocumentAnalysisResult[];
}

const STORAGE_KEY = 'smart_campus_state_v1';

function getInitialState(): AppState {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: true,
      currentUser: DEFAULT_AUTH_USER,
      currentRole: 'STUDENT',
      currentStudentId: 'std-1',
      isDarkMode: true,
      students: STUDENTS_SEED,
      attendance: STUDENT_ATTENDANCE_SEED,
      marks: STUDENT_MARKS_SEED,
      assignments: ASSIGNMENTS_SEED,
      notifications: NOTIFICATIONS_SEED,
      labs: CAMPUS_LABS_SEED,
      leaveRequests: LEAVE_REQUESTS_SEED,
      studySessions: STUDY_SESSIONS_SEED,
      analyzedDocuments: [
        {
          id: 'doc-seed-1',
          fileName: 'Mid_Semester_Examination_Schedule_Fall2026.pdf',
          fileType: 'application/pdf',
          uploadDate: '2026-09-08',
          examName: 'Mid-Semester Examinations Fall 2026',
          date: '2026-09-24 to 2026-10-03',
          subjects: ['CS301 DBMS', 'CS302 OS', 'CS303 AI', 'MA301 Discrete Math'],
          venue: 'Examination Halls North 2, North 3, South 1',
          summary: 'Official Dean notification announcing Mid-Term examinations timetable, reporting time (09:45 AM), strict electronic ban, and hall ticket protocols.',
          importantInstructions: [
            'Report 15 minutes before exam commencement.',
            'Smartwatches and cellular phones prohibited under Code §12.',
            'Carry physical hall ticket and biometric ID card.'
          ],
          deadlines: [
            { item: 'Hall Ticket Download Closes', date: '2026-09-22' },
            { item: 'Condonation Application Deadline', date: '2026-09-17' }
          ]
        }
      ]
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        isAuthenticated: parsed.isAuthenticated ?? true,
        currentUser: parsed.currentUser || DEFAULT_AUTH_USER,
        students: parsed.students?.length ? parsed.students : STUDENTS_SEED,
        attendance: parsed.attendance?.length ? parsed.attendance : STUDENT_ATTENDANCE_SEED,
        marks: parsed.marks?.length ? parsed.marks : STUDENT_MARKS_SEED,
        assignments: parsed.assignments?.length ? parsed.assignments : ASSIGNMENTS_SEED,
        notifications: parsed.notifications?.length ? parsed.notifications : NOTIFICATIONS_SEED,
        labs: parsed.labs?.length ? parsed.labs : CAMPUS_LABS_SEED,
        leaveRequests: parsed.leaveRequests?.length ? parsed.leaveRequests : LEAVE_REQUESTS_SEED,
        studySessions: parsed.studySessions?.length ? parsed.studySessions : STUDY_SESSIONS_SEED
      };
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }

  return {
    isAuthenticated: true,
    currentUser: DEFAULT_AUTH_USER,
    currentRole: 'STUDENT',
    currentStudentId: 'std-1',
    isDarkMode: true,
    students: STUDENTS_SEED,
    attendance: STUDENT_ATTENDANCE_SEED,
    marks: STUDENT_MARKS_SEED,
    assignments: ASSIGNMENTS_SEED,
    notifications: NOTIFICATIONS_SEED,
    labs: CAMPUS_LABS_SEED,
    leaveRequests: LEAVE_REQUESTS_SEED,
    studySessions: STUDY_SESSIONS_SEED,
    analyzedDocuments: []
  };
}

let globalState: AppState = getInitialState();
const listeners: Array<() => void> = [];

export function updateGlobalState(updater: (prev: AppState) => AppState) {
  globalState = updater(globalState);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }
  listeners.forEach((listener) => listener());
}

export function useAppState() {
  const [state, setState] = useState<AppState>(globalState);

  useEffect(() => {
    const listener = () => setState(globalState);
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const setRole = (role: UserRole) => {
    updateGlobalState((prev) => ({ ...prev, currentRole: role }));
  };

  const setStudent = (studentId: string) => {
    updateGlobalState((prev) => ({ ...prev, currentStudentId: studentId }));
  };

  const toggleDarkMode = () => {
    updateGlobalState((prev) => {
      const nextMode = !prev.isDarkMode;
      if (typeof document !== 'undefined') {
        if (nextMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { ...prev, isDarkMode: nextMode };
    });
  };

  const markAttendance = (code: string, increment: boolean) => {
    updateGlobalState((prev) => {
      const updatedAttendance = prev.attendance.map((sub) => {
        if (sub.code === code) {
          const newAttended = increment ? sub.attended + 1 : Math.max(0, sub.attended - 1);
          const newTotal = sub.total + (increment ? 1 : 0);
          const newPercentage = Math.round((newAttended / newTotal) * 100);
          return {
            ...sub,
            attended: newAttended,
            total: newTotal,
            percentage: newPercentage,
            trend: [...sub.trend.slice(1), newPercentage]
          };
        }
        return sub;
      });

      // Recalculate overall student attendance
      const overallAvg = Math.round(
        updatedAttendance.reduce((sum, s) => sum + s.percentage, 0) / updatedAttendance.length
      );

      const updatedStudents = prev.students.map((std) => {
        if (std.id === prev.currentStudentId) {
          const risk: 'LOW' | 'MEDIUM' | 'HIGH' =
            overallAvg < 70 ? 'HIGH' : overallAvg < 75 ? 'MEDIUM' : 'LOW';
          return {
            ...std,
            currentAttendance: overallAvg,
            academicRisk: risk,
            riskScore: Math.min(100, Math.round((overallAvg * 0.5) + (std.cgpa * 5)))
          };
        }
        return std;
      });

      return {
        ...prev,
        attendance: updatedAttendance,
        students: updatedStudents
      };
    });
  };

  const updateSubjectMarks = (code: string, newInternal: number, newExternal: number) => {
    updateGlobalState((prev) => {
      const updatedMarks = prev.marks.map((m) => {
        if (m.code === code) {
          const total = newInternal + newExternal;
          let grade = 'F';
          let points = 0;
          if (total >= 90) { grade = 'O'; points = 10; }
          else if (total >= 80) { grade = 'A+'; points = 9; }
          else if (total >= 70) { grade = 'A'; points = 8; }
          else if (total >= 60) { grade = 'B+'; points = 7; }
          else if (total >= 50) { grade = 'B'; points = 6; }
          else if (total >= 40) { grade = 'C'; points = 5; }

          return {
            ...m,
            internalMarks: newInternal,
            predictedExternal: newExternal,
            totalPredicted: total,
            grade,
            points
          };
        }
        return m;
      });

      // Recalculate predicted CGPA
      const totalCredits = updatedMarks.reduce((sum, m) => sum + m.credits, 0);
      const earnedPoints = updatedMarks.reduce((sum, m) => sum + m.credits * m.points, 0);
      const newGpa = Number((earnedPoints / totalCredits).toFixed(2));

      const updatedStudents = prev.students.map((std) => {
        if (std.id === prev.currentStudentId) {
          return { ...std, cgpa: newGpa };
        }
        return std;
      });

      return {
        ...prev,
        marks: updatedMarks,
        students: updatedStudents
      };
    });
  };

  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...request,
      id: 'lv-' + Date.now(),
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    updateGlobalState((prev) => ({
      ...prev,
      leaveRequests: [newLeave, ...prev.leaveRequests]
    }));
  };

  const updateLeaveStatus = (leaveId: string, status: 'Approved' | 'Rejected', remarks?: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map((lv) =>
        lv.id === leaveId
          ? {
              ...lv,
              status,
              reviewerRemarks: remarks || `Leave ${status.toLowerCase()} by Faculty.`,
              reviewedBy: 'Dr. Sarah Jenkins'
            }
          : lv
      )
    }));
  };

  const toggleAssignmentStatus = (id: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      assignments: prev.assignments.map((asg) => {
        if (asg.id === id) {
          const nextStatus: Assignment['status'] =
            asg.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...asg, status: nextStatus };
        }
        return asg;
      })
    }));
  };

  const prioritizeAssignments = () => {
    updateGlobalState((prev) => {
      // Sort by urgency, priority and estimated hours
      const priorityWeights: Record<string, number> = {
        CRITICAL: 4,
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1
      };

      const sorted = [...prev.assignments].sort((a, b) => {
        if (a.status === 'Completed' && b.status !== 'Completed') return 1;
        if (b.status === 'Completed' && a.status !== 'Completed') return -1;
        const weightDiff = (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        if (weightDiff !== 0) return weightDiff;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });

      const ranked = sorted.map((asg, idx) => ({ ...asg, aiRank: idx + 1 }));
      return { ...prev, assignments: ranked };
    });
  };

  const toggleStudySession = (id: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      studySessions: prev.studySessions.map((ss) =>
        ss.id === id ? { ...ss, completed: !ss.completed } : ss
      )
    }));
  };

  const addAnalyzedDocument = (doc: DocumentAnalysisResult) => {
    updateGlobalState((prev) => ({
      ...prev,
      analyzedDocuments: [doc, ...prev.analyzedDocuments]
    }));
  };

  const markNotificationRead = (id: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    }));
  };

  const login = (user: AuthUser) => {
    updateGlobalState((prev) => ({
      ...prev,
      isAuthenticated: true,
      currentUser: user,
      currentRole: user.role,
      currentStudentId: user.role === 'STUDENT' ? user.id : prev.currentStudentId
    }));
  };

  const logout = () => {
    updateGlobalState((prev) => ({
      ...prev,
      isAuthenticated: false
    }));
  };

  const currentStudent =
    state.students.find((s) => s.id === state.currentStudentId) || state.students[0];

  return {
    ...state,
    currentStudent,
    setRole,
    setStudent,
    login,
    logout,
    toggleDarkMode,
    markAttendance,
    updateSubjectMarks,
    addLeaveRequest,
    updateLeaveStatus,
    toggleAssignmentStatus,
    prioritizeAssignments,
    toggleStudySession,
    addAnalyzedDocument,
    markNotificationRead
  };
}
