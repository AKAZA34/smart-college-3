import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  MapPin,
  FileText,
  Download,
  AlertCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TIMETABLE_SEED, EXAM_SCHEDULE_SEED } from '../data/seedData';
import { useAppState } from '../data/store';

export const TimetableExams: React.FC = () => {
  const { currentStudent } = useAppState();
  const [activeTab, setActiveTab] = useState<'timetable' | 'exams'>('timetable');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  const currentDaySlots = TIMETABLE_SEED.filter((t) => t.day === selectedDay);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-blue-950/40 border border-blue-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Academic Timetable & Examination Schedule
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Odd Semester 2026
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Weekly class schedule, classroom venue routing, and official examination hall permits.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'timetable'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Classes
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'exams'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Exam Hall Tickets
          </button>
        </div>
      </div>

      {activeTab === 'timetable' ? (
        <div className="space-y-6">
          {/* Day Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Slots List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDaySlots.map((slot, i) => {
              const isLive = selectedDay === 'Monday' && i === 0;
              return (
                <div
                  key={slot.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isLive
                      ? 'bg-cyan-950/30 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {slot.startTime} - {slot.endTime}
                      </span>
                      {isLive && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-500 text-slate-950 animate-pulse">
                          LIVE NOW
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {slot.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1">{slot.subjectName}</h3>
                  <p className="text-xs text-slate-400 mb-3">{slot.faculty}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {slot.room}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Roll Call Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Examination Schedule & Admit Card View */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white">
                  Mid-Semester Examination Hall Ticket
                </h3>
                <p className="text-xs text-slate-400">
                  Student: {currentStudent.name} • Seat No: {currentStudent.rollNumber}
                </p>
              </div>
              <button className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all">
                <Download className="w-3.5 h-3.5" /> Download Hall Pass
              </button>
            </div>

            <div className="space-y-3">
              {EXAM_SCHEDULE_SEED.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400">
                        {exam.courseCode}
                      </span>
                      <span className="font-bold text-xs text-white">{exam.courseName}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Session: {exam.time} • Duration: 2 Hours
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">Exam Date</span>
                      <span className="text-white font-bold">{exam.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">Venue</span>
                      <span className="text-cyan-300 font-bold">{exam.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
