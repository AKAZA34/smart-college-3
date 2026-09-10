import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Calculator,
  TrendingUp,
  Calendar,
  AlertTriangle,
  FileText,
  BookOpen,
  ClipboardList,
  Award,
  Clock,
  CheckSquare,
  FileSignature,
  MapPin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Users,
  KeyRound,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAppState } from '../../data/store';

interface Props {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<Props> = ({
  currentRoute,
  onNavigate,
  isOpen,
  onCloseMobile
}) => {
  const { currentRole, currentStudent, currentUser, isAuthenticated, logout } = useAppState();

  const handleNav = (route: string) => {
    onNavigate(route);
    if (onCloseMobile) onCloseMobile();
  };

  const studentNavItems = [
    {
      group: 'COMMAND CENTER',
      items: [
        { id: 'student-dashboard', label: 'Command Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'quantum-state', label: 'AI Campus State (3D)', icon: <Cpu className="w-4 h-4 text-cyan-400" />, badge: 'Quantum' },
        { id: 'ai-insights', label: 'AI Insights Center', icon: <Sparkles className="w-4 h-4 text-violet-400" /> },
        { id: 'login', label: 'Auth & Role Switcher', icon: <KeyRound className="w-4 h-4 text-cyan-400" /> }
      ]
    },
    {
      group: 'AI ENGINES',
      items: [
        { id: 'attendance-predictor', label: 'Attendance Predictor', icon: <Calculator className="w-4 h-4 text-emerald-400" /> },
        { id: 'cgpa-predictor', label: 'CGPA Predictor', icon: <TrendingUp className="w-4 h-4 text-cyan-400" /> },
        { id: 'study-planner', label: 'AI Study Planner', icon: <Calendar className="w-4 h-4 text-amber-400" /> },
        { id: 'academic-risk', label: 'Academic Risk Engine', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
        { id: 'doc-intelligence', label: 'Document Intelligence', icon: <FileText className="w-4 h-4 text-sky-400" /> },
        { id: 'rag-knowledge', label: 'College Knowledge RAG', icon: <BookOpen className="w-4 h-4 text-purple-400" /> }
      ]
    },
    {
      group: 'CAMPUS LIFE',
      items: [
        { id: 'attendance', label: 'Attendance Records', icon: <ClipboardList className="w-4 h-4" /> },
        { id: 'marks', label: 'Marks & Results', icon: <Award className="w-4 h-4" /> },
        { id: 'timetable', label: 'Timetable & Exams', icon: <Clock className="w-4 h-4" /> },
        { id: 'assignments', label: 'Assignment Tracker', icon: <CheckSquare className="w-4 h-4" /> },
        { id: 'leaves', label: 'Digital Leave Portal', icon: <FileSignature className="w-4 h-4" /> },
        { id: 'campus-map', label: 'Campus Map & Labs', icon: <MapPin className="w-4 h-4 text-blue-400" />, badge: 'Live Labs' }
      ]
    }
  ];

  const facultyNavItems = [
    {
      group: 'FACULTY OPERATIONS',
      items: [
        { id: 'faculty-dashboard', label: 'Faculty Overview', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'faculty-attendance', label: 'Mark Attendance', icon: <ClipboardList className="w-4 h-4" /> },
        { id: 'faculty-marks', label: 'Upload & Grade Marks', icon: <Award className="w-4 h-4" /> },
        { id: 'faculty-leaves', label: 'Leave Requests Approval', icon: <FileSignature className="w-4 h-4" /> },
        { id: 'doc-intelligence', label: 'Notice & Syllabus OCR', icon: <FileText className="w-4 h-4" /> },
        { id: 'ai-insights', label: 'Class Insights & Analytics', icon: <Sparkles className="w-4 h-4 text-violet-400" /> }
      ]
    }
  ];

  const parentNavItems = [
    {
      group: 'PARENT PORTAL',
      items: [
        { id: 'parent-dashboard', label: 'Student Progress', icon: <Users className="w-4 h-4" /> },
        { id: 'attendance', label: 'Attendance Audit', icon: <ClipboardList className="w-4 h-4" /> },
        { id: 'marks', label: 'Grades & Academic Status', icon: <Award className="w-4 h-4" /> },
        { id: 'academic-risk', label: 'Risk & Support Factors', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
        { id: 'timetable', label: 'Exams Timetable', icon: <Clock className="w-4 h-4" /> }
      ]
    }
  ];

  const adminNavItems = [
    {
      group: 'CAMPUS ADMINISTRATION',
      items: [
        { id: 'admin-dashboard', label: 'Admin Command Matrix', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'campus-map', label: 'Facilities & Labs', icon: <MapPin className="w-4 h-4" /> },
        { id: 'rag-knowledge', label: 'Knowledge Base & Policies', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'doc-intelligence', label: 'Document Archive & OCR', icon: <FileText className="w-4 h-4" /> },
        { id: 'ai-insights', label: 'Institutional Intelligence', icon: <Sparkles className="w-4 h-4 text-violet-400" /> }
      ]
    }
  ];

  let currentNavGroups = studentNavItems;
  if (currentRole === 'FACULTY') currentNavGroups = facultyNavItems;
  else if (currentRole === 'PARENT') currentNavGroups = parentNavItems;
  else if (currentRole === 'ADMIN') currentNavGroups = adminNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-[57px] left-0 z-30 h-[calc(100vh-57px)] w-64 bg-slate-950/95 lg:bg-slate-950/70 border-r border-slate-800/80 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation list */}
        <div className="p-4 space-y-6">
          {/* User mini profile badge */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={currentUser?.avatar || currentStudent.avatar}
                alt={currentUser?.name || currentStudent.name}
                className="w-10 h-10 rounded-full object-cover border border-cyan-500/40 shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || currentStudent.name}</p>
                <p className="text-[11px] text-cyan-400 font-mono truncate">
                  {currentUser?.rollNumber || currentUser?.email || currentStudent.rollNumber}
                </p>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] rounded bg-slate-800 text-slate-300">
                  {currentRole}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleNav('login')}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-700/50 transition-colors"
              title="Switch Account / Login"
            >
              <LogIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {currentNavGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                {group.group}
              </p>
              {group.items.map((item) => {
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    ) : isActive ? (
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom System Status & Sign Out */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 space-y-2">
          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                handleNav('login');
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400/90 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Session</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Campus OS v3.8
            </span>
            <span className="font-mono text-cyan-400">Gemini RAG</span>
          </div>
        </div>
      </aside>
    </>
  );
};
