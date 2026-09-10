import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Clock,
  MapPin,
  FileText,
  Calculator,
  CornerDownLeft
} from 'lucide-react';
import { useAppState } from '../../data/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onTriggerCopilot: (query: string) => void;
}

export const GlobalSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerCopilot
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentStudent, attendance, assignments, marks, labs } = useAppState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPrompts = [
    { text: 'Find my DBMS notes', icon: <BookOpen className="w-3.5 h-3.5 text-cyan-400" />, action: 'copilot' },
    { text: 'Show assignments due tomorrow', icon: <CheckSquare className="w-3.5 h-3.5 text-rose-400" />, action: 'assignments' },
    { text: 'Where is AI Lab?', icon: <MapPin className="w-3.5 h-3.5 text-blue-400" />, action: 'campus-map' },
    { text: 'Show my attendance', icon: <Calculator className="w-3.5 h-3.5 text-emerald-400" />, action: 'attendance' },
    { text: 'Show upcoming exams', icon: <Clock className="w-3.5 h-3.5 text-amber-400" />, action: 'timetable' }
  ];

  // Dynamic matching
  const term = searchTerm.toLowerCase().trim();
  const matchedAttendance = attendance.filter(
    (a) => a.name.toLowerCase().includes(term) || a.code.toLowerCase().includes(term)
  );
  const matchedAssignments = assignments.filter(
    (a) => a.title.toLowerCase().includes(term) || a.subjectName.toLowerCase().includes(term)
  );
  const matchedLabs = labs.filter(
    (l) => l.name.toLowerCase().includes(term) || l.building.toLowerCase().includes(term)
  );

  const handleSelect = (route: string, copilotQuery?: string) => {
    if (copilotQuery) {
      onTriggerCopilot(copilotQuery);
    } else {
      onNavigate(route);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim()) {
                handleSelect('copilot', searchTerm);
              }
            }}
            placeholder="Search courses, assignments, labs, or ask AI naturally..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-md text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-400 hover:text-white border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Quick natural language suggestions */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!searchTerm ? (
            <div>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 px-1">
                Suggested Natural Language Searches
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (p.action === 'copilot') {
                        handleSelect('copilot', p.text);
                      } else {
                        handleSelect(p.action);
                      }
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      {p.icon}
                      <span className="text-xs text-slate-300 group-hover:text-white font-medium">
                        {p.text}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Copilot Direct Query Trigger */}
              <button
                onClick={() => handleSelect('copilot', searchTerm)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/40 hover:border-cyan-400 text-left transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <div>
                    <p className="text-xs font-semibold text-cyan-200">
                      Ask Campus Copilot: &quot;{searchTerm}&quot;
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Query student database and official university regulations
                    </p>
                  </div>
                </div>
                <CornerDownLeft className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Matched Attendance */}
              {matchedAttendance.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                    Courses & Attendance
                  </p>
                  <div className="space-y-1.5">
                    {matchedAttendance.map((att) => (
                      <div
                        key={att.code}
                        onClick={() => handleSelect('attendance')}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 cursor-pointer border border-slate-800/60 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white">{att.name}</span>
                          <span className="text-slate-400 ml-2 font-mono">({att.code})</span>
                        </div>
                        <span className="font-mono font-bold text-cyan-400">{att.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Assignments */}
              {matchedAssignments.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                    Assignments & Lab Tasks
                  </p>
                  <div className="space-y-1.5">
                    {matchedAssignments.map((asg) => (
                      <div
                        key={asg.id}
                        onClick={() => handleSelect('assignments')}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 cursor-pointer border border-slate-800/60 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white">{asg.title}</span>
                          <span className="text-slate-400 ml-2">({asg.subjectName})</span>
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            asg.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {asg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Labs */}
              {matchedLabs.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                    Campus Labs & Venues
                  </p>
                  <div className="space-y-1.5">
                    {matchedLabs.map((lab) => (
                      <div
                        key={lab.id}
                        onClick={() => handleSelect('campus-map')}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 cursor-pointer border border-slate-800/60 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white">{lab.name}</span>
                          <span className="text-slate-400 ml-2">{lab.building} ({lab.floor})</span>
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            lab.status === 'Available'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {lab.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
