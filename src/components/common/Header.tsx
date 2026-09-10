import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  GraduationCap,
  Users,
  Briefcase,
  LogIn,
  LogOut,
  UserCheck,
  ChevronDown,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useAppState } from '../../data/store';
import { UserRole } from '../../types';

interface Props {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onToggleNotifications: () => void;
}

export const Header: React.FC<Props> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onToggleNotifications
}) => {
  const {
    currentRole,
    setRole,
    currentStudent,
    setStudent,
    students,
    isDarkMode,
    toggleDarkMode,
    notifications,
    isAuthenticated,
    currentUser,
    logout
  } = useAppState();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roles: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'STUDENT', label: 'Student', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { role: 'FACULTY', label: 'Faculty', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { role: 'PARENT', label: 'Parent', icon: <Users className="w-3.5 h-3.5" /> },
    { role: 'ADMIN', label: 'Admin', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white font-['Space_Grotesk']">
                  SMART CAMPUS
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  AI OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
                Autonomous Digital Campus Companion
              </p>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Trigger) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-400 text-xs border border-slate-800 hover:border-cyan-500/40 transition-all shadow-inner group"
          >
            <span className="flex items-center gap-2 text-slate-400 group-hover:text-slate-200">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI anything or search campus... (e.g. &apos;Where is AI Lab?&apos;)</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Tools: Role Selector, Student Switcher, Notifications, Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Selector Pill */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => {
                  setRole(r.role);
                  if (r.role === 'STUDENT') onNavigate('student-dashboard');
                  else if (r.role === 'FACULTY') onNavigate('faculty-dashboard');
                  else if (r.role === 'PARENT') onNavigate('parent-dashboard');
                  else if (r.role === 'ADMIN') onNavigate('admin-dashboard');
                }}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all text-xs ${
                  currentRole === r.role
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r.icon}
                <span className="hidden lg:inline">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Student Switcher (If in Student / Parent role) */}
          {(currentRole === 'STUDENT' || currentRole === 'PARENT') && (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
              <select
                value={currentStudent.id}
                onChange={(e) => setStudent(e.target.value)}
                className="bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500/50"
              >
                {students.slice(0, 5).map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.name} ({std.rollNumber})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Trigger for Mobile */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800"
            title="Global Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button
            onClick={onToggleNotifications}
            className="relative p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* User Account / Login Button */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 text-xs text-left group transition-all"
              >
                <img
                  src={currentUser?.avatar || currentStudent.avatar}
                  alt={currentUser?.name || currentStudent.name}
                  className="w-6 h-6 rounded-full object-cover border border-cyan-500/40"
                />
                <span className="hidden xl:inline-block max-w-[100px] truncate text-slate-200 font-medium text-xs">
                  {currentUser?.name || currentStudent.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
              </button>

              {/* Profile Popover Menu */}
              {isProfileMenuOpen && (
                <>
                  <div
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl z-50 space-y-3">
                    <div className="flex items-center gap-3 pb-2.5 border-b border-slate-800/80">
                      <img
                        src={currentUser?.avatar || currentStudent.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{currentUser?.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{currentUser?.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.2 text-[9px] rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {currentUser?.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onNavigate('login');
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-cyan-300 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Switch Account / Persona</span>
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                          onNavigate('login');
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
