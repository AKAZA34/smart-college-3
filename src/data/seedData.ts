import {
  StudentProfile,
  SubjectAttendance,
  SubjectMark,
  Assignment,
  TimetableSlot,
  ExamScheduleItem,
  SmartNotification,
  LeaveRequest,
  CampusLab,
  CampusFacility,
  RagKnowledgeDocument,
  StudyPlanSession
} from '../types';

export const STUDENTS_SEED: StudentProfile[] = [
  {
    id: 'std-1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1042',
    email: 'alex.chen@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.42,
    currentAttendance: 78,
    academicRisk: 'LOW',
    riskScore: 72,
    parentId: 'prt-1',
    mentorId: 'fac-1'
  },
  {
    id: 'std-2',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1088',
    email: 'maya.patel@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 9.15,
    currentAttendance: 92,
    academicRisk: 'LOW',
    riskScore: 94,
    parentId: 'prt-2'
  },
  {
    id: 'std-3',
    name: 'Rohan Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1015',
    email: 'rohan.sharma@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 6.85,
    currentAttendance: 69,
    academicRisk: 'HIGH',
    riskScore: 42,
    parentId: 'prt-3'
  },
  {
    id: 'std-4',
    name: 'Sophia Williams',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'AI23B2004',
    email: 'sophia.w@smartcampus.edu',
    department: 'Artificial Intelligence & Data Science',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.78,
    currentAttendance: 84,
    academicRisk: 'LOW',
    riskScore: 82
  },
  {
    id: 'std-5',
    name: 'Liam Zhang',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1033',
    email: 'liam.zhang@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 7.45,
    currentAttendance: 74,
    academicRisk: 'MEDIUM',
    riskScore: 61
  },
  {
    id: 'std-6',
    name: 'Aanya Gupta',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'EC23B3012',
    email: 'aanya.gupta@smartcampus.edu',
    department: 'Electronics & Communication',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.92,
    currentAttendance: 89,
    academicRisk: 'LOW',
    riskScore: 88
  },
  {
    id: 'std-7',
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1067',
    email: 'david.m@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 7.12,
    currentAttendance: 71,
    academicRisk: 'MEDIUM',
    riskScore: 54
  },
  {
    id: 'std-8',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1072',
    email: 'elena.r@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 9.40,
    currentAttendance: 96,
    academicRisk: 'LOW',
    riskScore: 97
  },
  {
    id: 'std-9',
    name: 'Kavita Rao',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'IT23B4019',
    email: 'kavita.rao@smartcampus.edu',
    department: 'Information Technology',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.10,
    currentAttendance: 81,
    academicRisk: 'LOW',
    riskScore: 78
  },
  {
    id: 'std-10',
    name: 'Marcus Bell',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'ME23B5022',
    email: 'marcus.b@smartcampus.edu',
    department: 'Mechanical Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 7.60,
    currentAttendance: 76,
    academicRisk: 'LOW',
    riskScore: 70
  },
  {
    id: 'std-11',
    name: 'Pooja Nair',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1091',
    email: 'pooja.n@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.65,
    currentAttendance: 86,
    academicRisk: 'LOW',
    riskScore: 84
  },
  {
    id: 'std-12',
    name: 'Tariq Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'AI23B2019',
    email: 'tariq.m@smartcampus.edu',
    department: 'Artificial Intelligence & Data Science',
    semester: 6,
    year: '3rd Year',
    cgpa: 6.95,
    currentAttendance: 68,
    academicRisk: 'HIGH',
    riskScore: 45
  },
  {
    id: 'std-13',
    name: 'Chloe Tanaka',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1104',
    email: 'chloe.t@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 9.02,
    currentAttendance: 90,
    academicRisk: 'LOW',
    riskScore: 91
  },
  {
    id: 'std-14',
    name: 'Arjun Verma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1002',
    email: 'arjun.verma@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 7.90,
    currentAttendance: 80,
    academicRisk: 'LOW',
    riskScore: 76
  },
  {
    id: 'std-15',
    name: 'Fatima Zahra',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'EC23B3045',
    email: 'fatima.z@smartcampus.edu',
    department: 'Electronics & Communication',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.35,
    currentAttendance: 83,
    academicRisk: 'LOW',
    riskScore: 80
  },
  {
    id: 'std-16',
    name: 'Kevin Vance',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1055',
    email: 'kevin.v@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 6.40,
    currentAttendance: 64,
    academicRisk: 'HIGH',
    riskScore: 35
  },
  {
    id: 'std-17',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1028',
    email: 'ananya.d@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.80,
    currentAttendance: 88,
    academicRisk: 'LOW',
    riskScore: 87
  },
  {
    id: 'std-18',
    name: 'Lucas Silva',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'AI23B2031',
    email: 'lucas.s@smartcampus.edu',
    department: 'Artificial Intelligence & Data Science',
    semester: 6,
    year: '3rd Year',
    cgpa: 7.82,
    currentAttendance: 77,
    academicRisk: 'LOW',
    riskScore: 73
  },
  {
    id: 'std-19',
    name: 'Zainab Qureshi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1081',
    email: 'zainab.q@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 8.55,
    currentAttendance: 85,
    academicRisk: 'LOW',
    riskScore: 83
  },
  {
    id: 'std-20',
    name: 'Siddharth Roy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rollNumber: 'CS23B1099',
    email: 'siddharth.r@smartcampus.edu',
    department: 'Computer Science & Engineering',
    semester: 6,
    year: '3rd Year',
    cgpa: 7.20,
    currentAttendance: 72,
    academicRisk: 'MEDIUM',
    riskScore: 59
  }
];

export const STUDENT_ATTENDANCE_SEED: SubjectAttendance[] = [
  {
    code: 'CS301',
    name: 'Database Management Systems',
    attended: 28,
    total: 34,
    percentage: 82,
    faculty: 'Dr. Sarah Jenkins',
    category: 'Core',
    trend: [80, 81, 79, 83, 80, 82]
  },
  {
    code: 'CS302',
    name: 'Operating Systems',
    attended: 25,
    total: 33,
    percentage: 76,
    faculty: 'Prof. Alan Turing',
    category: 'Core',
    trend: [78, 77, 75, 74, 75, 76]
  },
  {
    code: 'CS303',
    name: 'Artificial Intelligence & Neural Nets',
    attended: 29,
    total: 32,
    percentage: 91,
    faculty: 'Dr. Evelyn Carter',
    category: 'Core',
    trend: [88, 89, 90, 92, 90, 91]
  },
  {
    code: 'MA301',
    name: 'Discrete Mathematics & Graph Theory',
    attended: 22,
    total: 30,
    percentage: 73,
    faculty: 'Prof. Ramanujan K.',
    category: 'Core',
    trend: [75, 74, 72, 70, 72, 73]
  },
  {
    code: 'CS304',
    name: 'Computer Networks',
    attended: 27,
    total: 32,
    percentage: 85,
    faculty: 'Dr. Robert Kahn',
    category: 'Core',
    trend: [82, 84, 85, 83, 85, 85]
  },
  {
    code: 'CS305L',
    name: 'AI & Systems Laboratory',
    attended: 14,
    total: 16,
    percentage: 88,
    faculty: 'Prof. Andrew Ng',
    category: 'Lab',
    trend: [85, 87, 88, 88, 88, 88]
  }
];

export const STUDENT_MARKS_SEED: SubjectMark[] = [
  {
    code: 'CS301',
    name: 'Database Management Systems',
    credits: 4,
    internalMarks: 34,
    internalMax: 40,
    predictedExternal: 50,
    totalPredicted: 84,
    grade: 'A',
    points: 9,
    weight: 0.22
  },
  {
    code: 'CS302',
    name: 'Operating Systems',
    credits: 4,
    internalMarks: 29,
    internalMax: 40,
    predictedExternal: 44,
    totalPredicted: 73,
    grade: 'B+',
    points: 8,
    weight: 0.22
  },
  {
    code: 'CS303',
    name: 'Artificial Intelligence & Neural Nets',
    credits: 4,
    internalMarks: 38,
    internalMax: 40,
    predictedExternal: 54,
    totalPredicted: 92,
    grade: 'A+',
    points: 10,
    weight: 0.22
  },
  {
    code: 'MA301',
    name: 'Discrete Mathematics & Graph Theory',
    credits: 3,
    internalMarks: 26,
    internalMax: 40,
    predictedExternal: 45,
    totalPredicted: 71,
    grade: 'B',
    points: 7,
    weight: 0.17
  },
  {
    code: 'CS304',
    name: 'Computer Networks',
    credits: 3,
    internalMarks: 33,
    internalMax: 40,
    predictedExternal: 48,
    totalPredicted: 81,
    grade: 'A',
    points: 9,
    weight: 0.17
  }
];

export const ASSIGNMENTS_SEED: Assignment[] = [
  {
    id: 'asg-1',
    subjectCode: 'CS303',
    subjectName: 'Artificial Intelligence',
    title: 'Backpropagation & Gradient Descent Implementation',
    description: 'Implement a 3-layer neural network from scratch in Python/NumPy on MNIST dataset.',
    deadline: '2026-09-14T23:59:00',
    status: 'Pending',
    priority: 'HIGH',
    estimatedHours: 4,
    aiRank: 1
  },
  {
    id: 'asg-2',
    subjectCode: 'CS301',
    subjectName: 'DBMS',
    title: 'Complex SQL Queries & B+ Tree Index Analysis',
    description: 'Design relational schema for e-commerce system with normalization up to BCNF.',
    deadline: '2026-09-16T18:00:00',
    status: 'In Progress',
    priority: 'MEDIUM',
    estimatedHours: 3,
    aiRank: 2
  },
  {
    id: 'asg-3',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems',
    title: 'Semaphore Synchronization & Deadlock Banker Algorithm',
    description: 'Simulate dining philosophers problem and banker algorithm in C/POSIX threads.',
    deadline: '2026-09-19T23:59:00',
    status: 'Pending',
    priority: 'CRITICAL',
    estimatedHours: 5,
    aiRank: 3
  },
  {
    id: 'asg-4',
    subjectCode: 'MA301',
    subjectName: 'Discrete Mathematics',
    title: 'Eulerian Graphs & Chromatic Polynomials Problem Set',
    description: 'Solve problem set 4 covering planar graphs and 4-color theorem proofs.',
    deadline: '2026-09-22T17:00:00',
    status: 'Completed',
    priority: 'LOW',
    estimatedHours: 2,
    aiRank: 4
  }
];

export const TIMETABLE_SEED: TimetableSlot[] = [
  {
    id: 'tt-1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    subjectCode: 'CS301',
    subjectName: 'Database Management Systems',
    room: 'Hall B204',
    faculty: 'Dr. Sarah Jenkins',
    type: 'Lecture'
  },
  {
    id: 'tt-2',
    day: 'Monday',
    startTime: '10:15',
    endTime: '11:15',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems',
    room: 'Hall B201',
    faculty: 'Prof. Alan Turing',
    type: 'Lecture'
  },
  {
    id: 'tt-3',
    day: 'Monday',
    startTime: '11:30',
    endTime: '12:30',
    subjectCode: 'CS303',
    subjectName: 'Artificial Intelligence',
    room: 'Smart Hall A102',
    faculty: 'Dr. Evelyn Carter',
    type: 'Lecture'
  },
  {
    id: 'tt-4',
    day: 'Monday',
    startTime: '13:30',
    endTime: '15:30',
    subjectCode: 'CS305L',
    subjectName: 'AI & Systems Laboratory',
    room: 'Quantum AI Lab 4',
    faculty: 'Prof. Andrew Ng',
    type: 'Lab'
  },
  {
    id: 'tt-5',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    subjectCode: 'MA301',
    subjectName: 'Discrete Mathematics',
    room: 'Hall B204',
    faculty: 'Prof. Ramanujan K.',
    type: 'Lecture'
  },
  {
    id: 'tt-6',
    day: 'Tuesday',
    startTime: '10:15',
    endTime: '11:15',
    subjectCode: 'CS304',
    subjectName: 'Computer Networks',
    room: 'Hall B201',
    faculty: 'Dr. Robert Kahn',
    type: 'Lecture'
  },
  {
    id: 'tt-7',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:00',
    subjectCode: 'CS303',
    subjectName: 'Artificial Intelligence',
    room: 'Smart Hall A102',
    faculty: 'Dr. Evelyn Carter',
    type: 'Lecture'
  },
  {
    id: 'tt-8',
    day: 'Wednesday',
    startTime: '10:15',
    endTime: '12:15',
    subjectCode: 'CS301',
    subjectName: 'DBMS Query Optimization Lab',
    room: 'Computer Lab 2',
    faculty: 'Dr. Sarah Jenkins',
    type: 'Lab'
  },
  {
    id: 'tt-9',
    day: 'Thursday',
    startTime: '09:00',
    endTime: '10:00',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems',
    room: 'Hall B201',
    faculty: 'Prof. Alan Turing',
    type: 'Lecture'
  },
  {
    id: 'tt-10',
    day: 'Friday',
    startTime: '09:00',
    endTime: '10:00',
    subjectCode: 'CS304',
    subjectName: 'Computer Networks',
    room: 'Hall B204',
    faculty: 'Dr. Robert Kahn',
    type: 'Lecture'
  }
];

export const EXAM_SCHEDULE_SEED: ExamScheduleItem[] = [
  {
    id: 'ex-1',
    subjectCode: 'CS301',
    subjectName: 'Database Management Systems Mid-Term',
    date: '2026-09-24',
    time: '10:00 AM - 12:00 PM',
    room: 'Examination Hall North 3',
    seatNumber: 'N3-42',
    syllabusCovered: 'Units 1-3: Relational Algebra, SQL, Indexing & Storage'
  },
  {
    id: 'ex-2',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems Mid-Term',
    date: '2026-09-26',
    time: '10:00 AM - 12:00 PM',
    room: 'Examination Hall South 1',
    seatNumber: 'S1-18',
    syllabusCovered: 'Units 1-3: Process Management, Memory Paging, Deadlocks'
  },
  {
    id: 'ex-3',
    subjectCode: 'CS303',
    subjectName: 'Artificial Intelligence Mid-Term',
    date: '2026-09-28',
    time: '02:00 PM - 04:00 PM',
    room: 'Examination Hall North 2',
    seatNumber: 'N2-55',
    syllabusCovered: 'Units 1-3: Search algorithms (A*), Heuristics, Perceptrons'
  },
  {
    id: 'ex-4',
    subjectCode: 'MA301',
    subjectName: 'Discrete Mathematics Mid-Term',
    date: '2026-10-01',
    time: '10:00 AM - 12:00 PM',
    room: 'Main Auditorium Tier 2',
    seatNumber: 'AUD-88',
    syllabusCovered: 'Units 1-2: Logic, Set Theory, Combinatorics'
  }
];

export const NOTIFICATIONS_SEED: SmartNotification[] = [
  {
    id: 'notif-1',
    title: 'Attendance Alert',
    message: 'URGENT — Your Discrete Mathematics (MA301) attendance is 73%. You need 3 consecutive attended sessions to cross 75%.',
    category: 'Attendance',
    urgency: 'urgent',
    timestamp: '10 mins ago',
    read: false,
    actionUrl: 'attendance-predictor'
  },
  {
    id: 'notif-2',
    title: 'Assignment Due in 48h',
    message: 'Artificial Intelligence Backpropagation assignment is due Sunday night. AI Copilot created a 2-hour coding session.',
    category: 'Assignments',
    urgency: 'high',
    timestamp: '1 hour ago',
    read: false,
    actionUrl: 'assignments'
  },
  {
    id: 'notif-3',
    title: 'Mid-Term Exam Schedule Published',
    message: 'Official timetable for Mid-Semester Examinations Fall 2026 has been uploaded by Registrar Office.',
    category: 'Exams',
    urgency: 'medium',
    timestamp: '3 hours ago',
    read: true,
    actionUrl: 'timetable'
  },
  {
    id: 'notif-4',
    title: 'AI Lab 4 Available Now',
    message: 'Quantum AI Lab 4 has 18 workstations available with NVIDIA A100 GPU compute until 13:30 PM.',
    category: 'College',
    urgency: 'low',
    timestamp: '4 hours ago',
    read: true,
    actionUrl: 'campus-map'
  },
  {
    id: 'notif-5',
    title: 'AI Copilot Recommendation',
    message: 'Based on your recent quiz scores, boosting Operating Systems by 10 marks elevates your projected CGPA from 8.42 to 8.76.',
    category: 'AI Recommendations',
    urgency: 'medium',
    timestamp: 'Yesterday',
    read: true,
    actionUrl: 'cgpa-predictor'
  }
];

export const CAMPUS_LABS_SEED: CampusLab[] = [
  {
    id: 'lab-1',
    name: 'Quantum AI Research Lab',
    code: 'LAB-AI-401',
    building: 'Turing Technology Tower',
    floor: '4th Floor',
    capacity: 35,
    occupied: 12,
    status: 'Available',
    currentClass: 'Open Project Hours',
    equipment: ['NVIDIA A100 GPUs (x8)', 'VR Development Rigs', 'Edge TPU Dev Boards'],
    nextFreeSlot: 'Now - Available all day'
  },
  {
    id: 'lab-2',
    name: 'Computer Systems Lab 1',
    code: 'LAB-CS-201',
    building: 'Engineering Block B',
    floor: '2nd Floor',
    capacity: 40,
    occupied: 40,
    status: 'Occupied',
    currentClass: 'CS302 OS Kernel Lab (Batch B)',
    equipment: ['Linux Ubuntu Workstations (x40)', 'Logic Analyzers'],
    nextFreeSlot: '12:30 PM'
  },
  {
    id: 'lab-3',
    name: 'Data Engineering & Cloud Lab',
    code: 'LAB-DE-302',
    building: 'Engineering Block B',
    floor: '3rd Floor',
    capacity: 30,
    occupied: 14,
    status: 'Available',
    currentClass: 'Independent Study',
    equipment: ['Dual Monitor Workstations (x30)', 'Dedicated Gigabit Uplink'],
    nextFreeSlot: 'Now - Available'
  },
  {
    id: 'lab-4',
    name: 'Robotics & Embedded Systems Lab',
    code: 'LAB-ROB-105',
    building: 'Innovation Hub',
    floor: '1st Floor',
    capacity: 25,
    occupied: 0,
    status: 'Available',
    currentClass: 'Free Slot',
    equipment: ['Robotic Arms (x6)', 'Oscilloscopes', '3D Printers (x4)'],
    nextFreeSlot: 'Now - Available'
  },
  {
    id: 'lab-5',
    name: 'Cybersecurity & Networks Lab',
    code: 'LAB-NET-208',
    building: 'Turing Technology Tower',
    floor: '2nd Floor',
    capacity: 32,
    occupied: 32,
    status: 'Occupied',
    currentClass: 'Network Penetration Testing',
    equipment: ['Air-Gapped Test Network', 'Hardware Firewalls'],
    nextFreeSlot: '14:00 PM'
  }
];

export const CAMPUS_FACILITIES_SEED: CampusFacility[] = [
  {
    id: 'fac-1',
    name: 'Lecture Hall B204',
    type: 'Classroom',
    building: 'Engineering Block B',
    floor: '2nd Floor',
    roomNumber: 'B204',
    coordinates: { x: 38, y: 45 },
    status: 'In Session'
  },
  {
    id: 'fac-2',
    name: 'Smart Hall A102',
    type: 'Classroom',
    building: 'Academic Block A',
    floor: '1st Floor',
    roomNumber: 'A102',
    coordinates: { x: 22, y: 35 },
    status: 'Open'
  },
  {
    id: 'fac-3',
    name: 'Quantum AI Research Lab',
    type: 'Lab',
    building: 'Turing Technology Tower',
    floor: '4th Floor',
    roomNumber: 'TT-401',
    coordinates: { x: 70, y: 25 },
    status: 'Open'
  },
  {
    id: 'fac-4',
    name: 'Central University Library',
    type: 'Library',
    building: 'Knowledge Pavilion',
    floor: 'Ground & 1st Floor',
    roomNumber: 'KP-LIB',
    coordinates: { x: 50, y: 65 },
    status: 'Open'
  },
  {
    id: 'fac-5',
    name: 'Solar Cafeteria & Lounge',
    type: 'Cafeteria',
    building: 'Student Commons',
    floor: 'Ground Floor',
    roomNumber: 'SC-CAF',
    coordinates: { x: 80, y: 70 },
    status: 'Open'
  },
  {
    id: 'fac-6',
    name: 'Dean of Academic Affairs Office',
    type: 'Office',
    building: 'Administrative Pavilion',
    floor: '1st Floor',
    roomNumber: 'ADM-101',
    coordinates: { x: 15, y: 75 },
    status: 'Open'
  }
];

export const RAG_KNOWLEDGE_SEED: RagKnowledgeDocument[] = [
  {
    id: 'rag-1',
    title: 'Academic Regulations & Attendance Policy (2025-2027)',
    category: 'Regulations',
    lastUpdated: 'August 2025',
    summary: 'Minimum attendance requirement is 75% per registered course. 65%-74% condonable on valid medical grounds with HOD approval.',
    content: `Section 4.1 Attendance Requirements: Every registered candidate must maintain a minimum attendance of 75% in lecture, practical, and tutorial sessions in every individual course.
Section 4.2 Condonation of Attendance: The Head of the Institution / Dean (Academic) may grant condonation up to a maximum of 10% (i.e. between 65% and 74.9%) on genuine medical grounds upon submission of authentic medical certification within 7 days of illness. Attendance strictly below 65% is non-condonable and requires repeating the course.
Section 4.3 Duty Leave: Students representing the university in recognized sporting, hackathon, or cultural competitions are granted official Duty Leave (OD) up to 10 days per academic year with prior departmental sanction.`,
    citations: ['Academic Regulations Handbook §4.1 - §4.3', 'Senate Circular 2025/11']
  },
  {
    id: 'rag-2',
    title: 'Grading System & CGPA Calculation Guidelines',
    category: 'Policies',
    lastUpdated: 'July 2025',
    summary: '10-point scale: O (10), A+ (9), A (8), B+ (7), B (6), C (5), F (0). SGPA and CGPA formulas, minimum passing marks 40% aggregate.',
    content: `Section 6.1 Evaluation and Grading:
- Grade O: 90-100% (Grade Points: 10) - Outstanding
- Grade A+: 80-89% (Grade Points: 9) - Excellent
- Grade A: 70-79% (Grade Points: 8) - Very Good
- Grade B+: 60-69% (Grade Points: 7) - Good
- Grade B: 50-59% (Grade Points: 6) - Above Average
- Grade C: 40-49% (Grade Points: 5) - Pass
- Grade F: Below 40% (Grade Points: 0) - Fail
SGPA = sum(Credits_i * GradePoints_i) / sum(Credits_i).
CGPA = cumulative weighted average of all semester grade points. Minimum CGPA required for graduation is 5.0. First Class with Distinction requires CGPA >= 8.5 without any history of arrears.`,
    citations: ['University Examination Manual §6.1', 'Ordinance on Academic Progression']
  },
  {
    id: 'rag-3',
    title: 'Mid-Semester & End-Semester Examination Rules',
    category: 'Exam Rules',
    lastUpdated: 'January 2026',
    summary: 'Mid-semester tests carry 40% internal weightage. Mandatory student ID, 15-minute grace entry rule, electronic device sanctions.',
    content: `Section 8 Examination Protocols:
8.1 Identification: Hall tickets and student biometric/RFID smart cards are mandatory for entry into examination halls.
8.2 Punctuality: Candidates will not be admitted after 15 minutes from the scheduled start of examination. No student may leave the hall during the first 45 minutes.
8.3 Prohibited Items: Smart watches, mobile devices, programmable calculators, and non-approved electronic storage are strictly prohibited. Possession entails immediate confiscation and disciplinary tribunal action under Code of Conduct §12.`,
    citations: ['Controller of Examinations Circular 2026/02', 'Hall Discipline Code §8']
  },
  {
    id: 'rag-4',
    title: 'Computer & AI Laboratories Usage Protocol',
    category: 'Policies',
    lastUpdated: 'September 2025',
    summary: 'Lab hours 08:00 to 20:00. GPU clusters allocated via Slurm queue. Access to open research labs requires authorized smart card tag.',
    content: `Section 9 Lab Safety and Resource Fair-Share:
9.1 Hours & Access: All department laboratories operate Monday-Saturday from 08:00 to 20:00.
9.2 Compute Cluster Policy: High-performance compute rigs (NVIDIA A100/H100) are shared resources managed via the campus scheduler. Jobs exceeding 4 hours must be registered in the queue.
9.3 Food & Beverages: Strictly prohibited in all server rooms and hardware laboratories. Violators face temporary suspension of laboratory privileges.`,
    citations: ['Department of CSE Lab Guidelines §9.1', 'IT Infrastructure Fair-Use Policy']
  },
  {
    id: 'rag-5',
    title: 'Academic Calendar Fall Semester 2026',
    category: 'Academic Calendar',
    lastUpdated: 'August 2026',
    summary: 'Key dates: Mid-Terms Sept 24-Oct 03; Project Submission Nov 15; End-Sem Examinations Dec 01-Dec 18; Winter Recess starts Dec 20.',
    content: `Key Academic Milestones Fall 2026:
- Commencement of Classes: August 03, 2026
- Mid-Semester Internal Tests: September 24 - October 03, 2026
- Annual Hackathon & Tech Fest (QuantumX): October 16 - October 18, 2026
- Final Project & Capstone Submissions: November 15, 2026
- Last Instructional Working Day: November 25, 2026
- End-Semester Theory Examinations: December 01 - December 18, 2026
- Winter Recess: December 20, 2026 - January 10, 2027`,
    citations: ['Dean Academics Calendar Notification 2026-F', 'Registrar Schedule Gazette']
  }
];

export const LEAVE_REQUESTS_SEED: LeaveRequest[] = [
  {
    id: 'lv-1',
    studentId: 'std-1',
    studentName: 'Alex Chen',
    rollNumber: 'CS23B1042',
    startDate: '2026-09-04',
    endDate: '2026-09-05',
    reason: 'Representing university at Smart India Hackathon Regional Finals in Bengaluru.',
    category: 'Academic Event',
    documentName: 'Hackathon_Selection_Letter.pdf',
    status: 'Approved',
    appliedOn: '2026-09-01',
    reviewedBy: 'Dr. Sarah Jenkins (HOD CSE)',
    reviewerRemarks: 'Duty leave approved. Attendance granted for 2 days.'
  },
  {
    id: 'lv-2',
    studentId: 'std-1',
    studentName: 'Alex Chen',
    rollNumber: 'CS23B1042',
    startDate: '2026-09-18',
    endDate: '2026-09-19',
    reason: 'Viral fever and respiratory tract infection; doctor advised rest.',
    category: 'Medical',
    documentName: 'Medical_Certificate_Apollo.pdf',
    status: 'Pending',
    appliedOn: '2026-09-09'
  }
];

export const STUDY_SESSIONS_SEED: StudyPlanSession[] = [
  {
    id: 'ss-1',
    date: '2026-09-11',
    timeSlot: '18:00 - 19:30',
    subject: 'Operating Systems',
    topic: 'Page Replacement Algorithms (LRU, Optimal, FIFO) & Virtual Memory',
    durationMinutes: 90,
    type: 'Concept Revision',
    priority: 'High',
    completed: false
  },
  {
    id: 'ss-2',
    date: '2026-09-11',
    timeSlot: '20:00 - 21:00',
    subject: 'Discrete Mathematics',
    topic: 'Graph Isomorphism & Planarity Testing Practice Problems',
    durationMinutes: 60,
    type: 'Practice Problems',
    priority: 'High',
    completed: false
  },
  {
    id: 'ss-3',
    date: '2026-09-12',
    timeSlot: '07:00 - 08:30',
    subject: 'Artificial Intelligence',
    topic: 'Backpropagation Vector Calculus & Activation Functions',
    durationMinutes: 90,
    type: 'Concept Revision',
    priority: 'Medium',
    completed: false
  },
  {
    id: 'ss-4',
    date: '2026-09-12',
    timeSlot: '19:00 - 20:30',
    subject: 'DBMS',
    topic: 'B+ Tree Index Insertion & Deletion Mechanics',
    durationMinutes: 90,
    type: 'Practice Problems',
    priority: 'Medium',
    completed: false
  },
  {
    id: 'ss-5',
    date: '2026-09-13',
    timeSlot: '16:00 - 17:30',
    subject: 'Operating Systems',
    topic: 'Timed 30-min Mock Quiz: Deadlock Prevention & Semaphore Code',
    durationMinutes: 90,
    type: 'Mock Test',
    priority: 'High',
    completed: false
  }
];
