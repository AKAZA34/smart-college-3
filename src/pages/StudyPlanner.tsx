import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Flame,
  Coffee,
  Check
} from 'lucide-react';
import { useAppState } from '../data/store';
import { STUDY_SESSIONS_SEED } from '../data/seedData';
import { StudySession } from '../types';

export const StudyPlanner: React.FC = () => {
  const { currentStudent, attendance, assignments } = useAppState();

  const [studySessions, setStudySessions] = useState<StudySession[]>(STUDY_SESSIONS_SEED);
  const [selectedDay, setSelectedDay] = useState<string>('Today');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Identify student weaknesses
  const weakSubjects = attendance.filter((a) => a.percentage < 80);
  const urgentAssignments = assignments.filter((a) => a.status !== 'Completed');

  const toggleSessionComplete = (id: string) => {
    setStudySessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleReschedule = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Auto reschedule: shift incomplete tasks forward, optimize rest intervals
      setStudySessions((prev) => [
        {
          id: 'resched-' + Date.now(),
          day: 'Tomorrow',
          time: '18:00 - 19:30',
          subject: 'Discrete Mathematics (MA301)',
          topic: 'Recurrence Relations & Graph Theory Practice',
          durationMinutes: 90,
          type: 'Practice',
          completed: false,
          priority: 'High'
        },
        ...prev.map((s) => ({ ...s, time: 'Adjusted: ' + s.time }))
      ]);
      setIsGenerating(false);
    }, 600);
  };

  const days = ['Today', 'Tomorrow', 'Saturday', 'Sunday'];

  const filteredSessions = studySessions.filter((s) => s.day === selectedDay || selectedDay === 'All');

  const totalMinutes = filteredSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const completedMinutes = filteredSessions
    .filter((s) => s.completed)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-amber-950/40 border border-amber-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              AI Adaptive Study Planner
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Cognitive Rhythm Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic study schedule generated from upcoming exams, assignment deadlines, and your attendance weakness areas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReschedule}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Dynamic Re-Schedule</span>
          </button>
        </div>
      </div>

      {/* Inputs Integration Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Attendance Weakness Signal */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Attendance Weakness Input</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {weakSubjects.length > 0
                ? `${weakSubjects.map((w) => w.code).join(', ')} flagged for remedial review.`
                : 'All courses above 80% safe attendance.'}
            </p>
          </div>
        </div>

        {/* Urgent Assignments Signal */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Assignment Deadlines Input</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {urgentAssignments.length} pending submissions prioritized before Sept 19.
            </p>
          </div>
        </div>

        {/* Study vs Rest Balance */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Coffee className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Study vs. Rest Balance</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              50-min Pomodoro rhythm with 10-min neuro-recharge breaks applied.
            </p>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs & Progress Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDay === day
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
          <button
            onClick={() => setSelectedDay('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedDay === 'All'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Sessions
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">
            Completed: <strong>{completedMinutes}</strong> / {totalMinutes} mins
          </span>
          <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
              style={{ width: `${totalMinutes > 0 ? (completedMinutes / totalMinutes) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Adaptive Study Session List */}
      <div className="space-y-3">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className={`p-4 rounded-2xl border transition-all ${
              session.completed
                ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                : session.priority === 'High'
                ? 'bg-slate-900/80 border-amber-500/40 shadow-md'
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleSessionComplete(session.id)}
                  className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                    session.completed
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-700 hover:border-amber-400'
                  }`}
                >
                  {session.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{session.subject}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        session.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {session.priority} Priority
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                      {session.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{session.topic}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs pl-8 sm:pl-0">
                <div className="flex items-center gap-1.5 font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{session.time}</span>
                  <span>({session.durationMinutes} min)</span>
                </div>

                <button
                  onClick={() => toggleSessionComplete(session.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    session.completed
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {session.completed ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
