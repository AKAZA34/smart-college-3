export type UserRole = 'STUDENT' | 'FACULTY' | 'PARENT' | 'ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
  rollNumber?: string;
  designation?: string;
  wardName?: string;
  wardRollNumber?: string;
  lastLogin?: string;
  authMethod?: 'password' | 'biometric' | 'sso';
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  email: string;
  department: string;
  semester: number;
  year: string;
  cgpa: number;
  currentAttendance: number;
  academicRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number; // 0-100
  parentId?: string;
  mentorId?: string;
}

export interface SubjectAttendance {
  code: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
  faculty: string;
  category: 'Core' | 'Elective' | 'Lab';
  trend: number[]; // Last 6 weeks percentages
}

export interface SubjectMark {
  code: string;
  name: string;
  credits: number;
  internalMarks: number; // out of 40
  internalMax: number;
  predictedExternal: number; // out of 60
  totalPredicted: number;
  grade: string;
  points: number;
  weight: number;
}

export interface Assignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedHours: number;
  aiRank?: number;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  room: string;
  faculty: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  category: 'Academic' | 'Attendance' | 'Assignments' | 'Exams' | 'College' | 'AI Recommendations';
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Aliases and unified models for convenience
export type Student = StudentProfile;
export type DocumentExtraction = DocumentAnalysisResult;
export type RagDocument = RagKnowledgeDocument;
export type StudySession = StudyPlanSession;

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  startDate: string;
  endDate: string;
  reason: string;
  category?: 'Medical' | 'Personal' | 'Academic Event' | 'Emergency' | string;
  type?: string;
  documentName?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn?: string;
  submittedAt?: string;
  reviewedBy?: string;
  reviewerRemarks?: string;
}

export interface ExamScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  courseCode?: string;
  courseName?: string;
  date: string;
  time: string;
  room: string;
  seatNumber: string;
  syllabusCovered?: string;
}

export interface CampusLab {
  id: string;
  name: string;
  code: string;
  building: string;
  floor: string;
  capacity: number;
  occupied: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  currentClass?: string;
  equipment: string[];
  nextFreeSlot: string;
}

export interface CampusFacility {
  id: string;
  name: string;
  type: 'Classroom' | 'Lab' | 'Library' | 'Cafeteria' | 'Auditorium' | 'Office';
  building: string;
  floor: string;
  roomNumber: string;
  coordinates: { x: number; y: number };
  status: 'Open' | 'Closed' | 'In Session';
}

export interface DocumentAnalysisResult {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  examName?: string;
  date?: string;
  subjects?: string[];
  venue?: string;
  deadlines?: { item: string; date: string }[];
  summary: string;
  importantInstructions: string[];
  rawText?: string;
}

export interface RagKnowledgeDocument {
  id: string;
  title: string;
  category: 'Regulations' | 'Syllabus' | 'Academic Calendar' | 'Notices' | 'Policies' | 'Exam Rules' | string;
  section?: string;
  lastUpdated: string;
  summary: string;
  content: string;
  citations: string[];
}

export interface StudyPlanSession {
  id: string;
  date: string;
  timeSlot: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  type: 'Concept Revision' | 'Practice Problems' | 'Mock Test' | 'Quick Recap';
  priority: 'High' | 'Medium' | 'Normal';
  completed: boolean;
  notes?: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; section?: string }[];
  quickActions?: { label: string; action: string }[];
}
