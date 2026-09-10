import React, { useState } from 'react';
import {
  X,
  Bell,
  AlertTriangle,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Filter,
  Check
} from 'lucide-react';
import { useAppState } from '../../data/store';
import { SmartNotification } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const NotificationDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { notifications, markNotificationRead } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = [
    'All',
    'Attendance',
    'Assignments',
    'Exams',
    'Academic',
    'College',
    'AI Recommendations'
  ];

  const filtered = selectedCategory === 'All'
    ? notifications
    : notifications.filter((n) => n.category === selectedCategory);

  const getUrgencyBadge = (urgency: SmartNotification['urgency']) => {
    switch (urgency) {
      case 'urgent':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
            URGENT
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/20 text-blue-300">
            NORMAL
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-400">
            INFO
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-slate-950 border-l border-slate-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Smart Notifications</h3>
              <p className="text-xs text-slate-400">AI-Prioritized Campus Alerts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="p-3 border-b border-slate-800/60 bg-slate-900/30 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List of Notifications */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No notifications found for this category.
            </div>
          ) : (
            filtered.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.actionUrl) {
                    onNavigate(notif.actionUrl);
                    onClose();
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  !notif.read
                    ? 'bg-slate-900/90 border-cyan-500/30 shadow-md hover:border-cyan-400/60'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-bold text-xs text-white flex items-center gap-1.5">
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                    {notif.title}
                  </span>
                  {getUrgencyBadge(notif.urgency)}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800/80 font-mono">
                    {notif.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notif.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
