import React from 'react';
import {
  Users,
  Award,
  Calculator,
  AlertTriangle,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  PhoneCall,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../data/store';
import { EXAM_SCHEDULE_SEED } from '../data/seedData';

export const ParentDashboard: React.FC = () => {
  const { currentStudent, attendance, marks } = useAppState();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-violet-950/40 border border-violet-500/30 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentStudent.avatar}
            alt={currentStudent.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-violet-500/40 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                PARENT MONITORING PORTAL
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk'] mt-1">
              {currentStudent.name}&apos;s Academic Overview
            </h1>
            <p className="text-xs text-slate-400">
              Roll No: {currentStudent.rollNumber} • {currentStudent.department} (Semester {currentStudent.semester})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contact Mentor</span>
          </button>
        </div>
      </div>

      {/* AI Daily Parent Bulletin */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-950/30 via-slate-900/80 to-slate-900/80 border border-violet-500/30 shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-300 text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-violet-400" />
            AI Parent Intelligence Bulletin
          </div>
          <span className="text-[10px] font-mono text-slate-400">Verified by Academic Dean</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          &quot;{currentStudent.name} is performing well academically with a cumulative CGPA of <strong>{currentStudent.cgpa.toFixed(2)}</strong>. Course attendance is healthy at <strong>{currentStudent.currentAttendance}%</strong> overall. Upcoming Mid-Semester examinations begin on <strong>September 24, 2026</strong>. No critical disciplinary or fee dues are pending.&quot;
        </p>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Attendance Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Overall Attendance</span>
            <Calculator className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black font-mono text-white">{currentStudent.currentAttendance}%</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Above mandatory 75% exam cutoff
          </p>
        </div>

        {/* CGPA Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Cumulative CGPA</span>
            <Award className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-3xl font-black font-mono text-white">{currentStudent.cgpa.toFixed(2)}</p>
          <p className="text-[11px] text-violet-300 font-medium">
            First Class with Distinction trajectory
          </p>
        </div>

        {/* Academic Risk Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Academic Risk Level</span>
            <AlertTriangle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black font-mono text-emerald-400">{currentStudent.academicRisk}</p>
          <p className="text-[11px] text-slate-400 font-medium">
            Continuous evaluation stability: 92%
          </p>
        </div>
      </div>

      {/* Course Attendance Breakdown & Exam Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Attendance (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
            Subject-Wise Attendance Breakdown
          </h3>

          <div className="space-y-3">
            {attendance.map((sub) => (
              <div key={sub.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{sub.name}</span>
                  <span className="font-mono font-bold text-cyan-400">{sub.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sub.percentage < 75 ? 'bg-rose-500' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Faculty: {sub.faculty}</span>
                  <span>{sub.attended} / {sub.total} classes attended</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Examinations (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
            Upcoming Examination Schedule
          </h3>

          <div className="space-y-2.5">
            {EXAM_SCHEDULE_SEED.map((exam) => (
              <div
                key={exam.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{exam.courseName}</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{exam.date}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {exam.time} • Hall: {exam.room}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
