import React from 'react';
import {
  GraduationCap,
  Calculator,
  Award,
  AlertTriangle,
  CheckSquare,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  Activity,
  Bot
} from 'lucide-react';
import { useAppState } from '../data/store';
import { QuantumCampusState } from '../components/quantum/QuantumCampusState';
import { TIMETABLE_SEED, EXAM_SCHEDULE_SEED } from '../data/seedData';

interface Props {
  onNavigate: (route: string) => void;
  onTriggerCopilot: (prompt: string) => void;
}

export const StudentDashboard: React.FC<Props> = ({ onNavigate, onTriggerCopilot }) => {
  const { currentStudent, attendance, assignments } = useAppState();

  const pendingAssignments = assignments.filter((a) => a.status !== 'Completed');
  const todayTimetable = TIMETABLE_SEED.slice(0, 4);
  const upcomingExams = EXAM_SCHEDULE_SEED.slice(0, 2);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Greeting Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/30 border border-cyan-500/20 shadow-xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ACADEMIC YEAR 2026-27 • SEMESTER {currentStudent.semester}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Good morning, {currentStudent.name}
          </h1>
          <p className="text-xs text-slate-400">
            {currentStudent.department} • Roll No: {currentStudent.rollNumber}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTriggerCopilot('What is my attendance summary and academic risk status?')}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask Copilot</span>
          </button>
          <button
            onClick={() => onNavigate('study-planner')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Today&apos;s Study Plan</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. CGPA */}
        <div
          onClick={() => onNavigate('cgpa-predictor')}
          className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-violet-500/40 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">Current CGPA</span>
            <Award className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-white">
              {currentStudent.cgpa.toFixed(2)}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">/ 10.0</span>
          </div>
          <div className="mt-2 text-[10px] text-violet-300/80 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            Simulate +0.32
          </div>
        </div>

        {/* 2. Attendance */}
        <div
          onClick={() => onNavigate('attendance-predictor')}
          className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">Attendance</span>
            <Calculator className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-white">
              {currentStudent.currentAttendance}%
            </span>
            <span
              className={`text-[10px] font-bold ${
                currentStudent.currentAttendance >= 75 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {currentStudent.currentAttendance >= 75 ? 'ELIGIBLE' : 'WARNING'}
            </span>
          </div>
          <div className="mt-2 text-[10px] text-cyan-300/80 flex items-center gap-1 font-medium">
            <Activity className="w-3 h-3" />
            Safe buffer: 3 classes
          </div>
        </div>

        {/* 3. Academic Risk */}
        <div
          onClick={() => onNavigate('academic-risk')}
          className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">Academic Risk</span>
            <AlertTriangle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-emerald-400">
              {currentStudent.academicRisk}
            </span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-medium">
            Factor: 72% stable
          </div>
        </div>

        {/* 4. Assignments */}
        <div
          onClick={() => onNavigate('assignments')}
          className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">Assignments</span>
            <CheckSquare className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-white">
              {pendingAssignments.length}
            </span>
            <span className="text-[10px] text-rose-400 font-semibold">pending</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 truncate font-medium">
            Next: Neural Nets
          </div>
        </div>

        {/* 5. Examinations */}
        <div
          onClick={() => onNavigate('timetable')}
          className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">Examinations</span>
            <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-white">
              {upcomingExams.length}
            </span>
            <span className="text-[10px] text-amber-400 font-semibold">scheduled</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 truncate font-medium">
            Mid-terms in 14 days
          </div>
        </div>

        {/* 6. Today's Timetable */}
        <div
          onClick={() => onNavigate('timetable')}
          className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">Today&apos;s Schedule</span>
            <Calendar className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-white">
              {todayTimetable.length}
            </span>
            <span className="text-[10px] text-blue-400 font-semibold">classes</span>
          </div>
          <div className="mt-2 text-[10px] text-emerald-400 font-medium truncate">
            Now: CS301 (B204)
          </div>
        </div>
      </div>

      {/* Quantum Campus State Component (3D Interactive Orbit) */}
      <QuantumCampusState onNavigate={onNavigate} />

      {/* Middle Split: Today's Live Timetable + Subject Attendance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable with Active indicators (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 backdrop-blur-xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Today&apos;s Lectures & Labs
                </h3>
              </div>
              <button
                onClick={() => onNavigate('timetable')}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium"
              >
                Full Week →
              </button>
            </div>

            <div className="space-y-2.5">
              {todayTimetable.map((slot, idx) => {
                const isCurrent = idx === 0;
                const isNext = idx === 1;

                return (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/40 border-cyan-500/40 shadow-inner'
                        : isNext
                        ? 'bg-slate-900/90 border-slate-700'
                        : 'bg-slate-950/50 border-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-slate-300">
                        {slot.startTime} - {slot.endTime}
                      </span>
                      {isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 animate-pulse">
                          LIVE NOW
                        </span>
                      ) : isNext ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          NEXT CLASS
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {slot.type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs text-white">{slot.subjectName}</p>
                        <p className="text-[11px] text-slate-400">{slot.faculty}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-[11px] font-mono text-cyan-300">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Next free study slot: 15:30 PM</span>
            <button
              onClick={() => onNavigate('campus-map')}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Locate Room B204 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Course-wise Attendance Progress Bars (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Course Attendance Breakdown
              </h3>
            </div>
            <button
              onClick={() => onNavigate('attendance-predictor')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              Open AI Simulator →
            </button>
          </div>

          <div className="space-y-4">
            {attendance.map((sub) => {
              const isBelow75 = sub.percentage < 75;
              const isBorderline = sub.percentage >= 75 && sub.percentage < 80;

              return (
                <div key={sub.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 font-bold">{sub.code}</span>
                      <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                        {sub.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">
                        {sub.attended}/{sub.total} classes
                      </span>
                      <span
                        className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                          isBelow75
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : isBorderline
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {sub.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                    {/* 75% threshold marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-400/80 z-10"
                      style={{ left: '75%' }}
                      title="75% Mandatory Examination Threshold"
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isBelow75
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                          : isBorderline
                          ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                      }`}
                      style={{ width: `${Math.min(100, sub.percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-950/70 border border-cyan-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                <strong>Copilot Tip:</strong> Maintain attendance in Discrete Math (73%) to prevent exam condonation fee.
              </span>
            </div>
            <button
              onClick={() => onNavigate('attendance-predictor')}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-mono transition-colors whitespace-nowrap ml-2"
            >
              Simulate Scenarios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
