import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { useAppState } from '../data/store';

export const AttendanceLogs: React.FC = () => {
  const { currentStudent, attendance, markAttendanceStatus } = useAppState();
  const [selectedCourse, setSelectedCourse] = useState<string>('ALL');

  const filteredCourses = selectedCourse === 'ALL'
    ? attendance
    : attendance.filter((a) => a.code === selectedCourse);

  // Mock past 10 session records for active course
  const recentSessions = [
    { date: '2026-09-09', slot: '09:00 - 10:00', code: 'CS301', name: 'Database Management Systems', status: 'Present', topic: 'B+ Tree Indexing & Search' },
    { date: '2026-09-08', slot: '11:15 - 12:15', code: 'CS302', name: 'Operating Systems', status: 'Present', topic: 'Semaphores & Mutex Locks' },
    { date: '2026-09-08', slot: '14:00 - 15:00', code: 'MA301', name: 'Discrete Mathematics', status: 'Absent', topic: 'Graph Coloring Algorithms' },
    { date: '2026-09-05', slot: '10:00 - 11:00', code: 'CS303', name: 'Artificial Intelligence', status: 'Present', topic: 'Heuristic Search A*' },
    { date: '2026-09-04', slot: '13:30 - 15:30', code: 'CS304', name: 'Web Engineering Lab', status: 'Present', topic: 'GraphQL API Integration' },
    { date: '2026-09-03', slot: '09:00 - 10:00', code: 'CS301', name: 'Database Management Systems', status: 'Present', topic: 'Relational Calculus' },
    { date: '2026-09-02', slot: '11:15 - 12:15', code: 'CS302', name: 'Operating Systems', status: 'Absent', topic: 'Deadlock Banker Algorithm' },
    { date: '2026-09-01', slot: '14:00 - 15:00', code: 'MA301', name: 'Discrete Mathematics', status: 'Present', topic: 'Generating Functions' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 border border-cyan-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Attendance Records & Session Logs
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Audit Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete attendance audit trail for {currentStudent.name} ({currentStudent.rollNumber}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Overall Percentage</span>
            <span className="text-2xl font-black font-mono text-white">
              {currentStudent.currentAttendance}%
            </span>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendance.map((course) => {
          const isBelow = course.percentage < 75;
          return (
            <div
              key={course.code}
              className={`p-5 rounded-2xl border transition-all ${
                isBelow
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-md'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400">{course.code}</span>
                  <h4 className="font-bold text-sm text-white">{course.name}</h4>
                  <p className="text-[11px] text-slate-400">{course.faculty}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                    isBelow
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {course.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden my-3 relative">
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                  style={{ left: '75%' }}
                  title="75% minimum"
                />
                <div
                  className={`h-full rounded-full ${
                    isBelow ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                  }`}
                  style={{ width: `${course.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Attended: {course.attended} / {course.total}</span>
                <span className={isBelow ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                  {isBelow ? 'Shortage Warning' : 'Eligible for Exams'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Session Audit History */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Recent Session Check-in Logs
          </h3>
          <span className="text-[11px] font-mono text-slate-400">RFID Smart Card Timestamped</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Course</th>
                <th className="p-3">Session Topic</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentSessions.map((session, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-slate-300">{session.date}</td>
                  <td className="p-3 font-mono text-slate-400">{session.slot}</td>
                  <td className="p-3 font-semibold text-white">
                    {session.name} <span className="text-cyan-400 font-mono">({session.code})</span>
                  </td>
                  <td className="p-3 text-slate-300">{session.topic}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        session.status === 'Present'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {session.status === 'Present' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
