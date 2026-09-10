import React from 'react';
import {
  Award,
  TrendingUp,
  Download,
  Sparkles,
  BarChart3,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useAppState } from '../data/store';

export const MarksResults: React.FC = () => {
  const { currentStudent, marks } = useAppState();

  const totalCredits = marks.reduce((acc, m) => acc + m.credits, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-violet-950/40 border border-violet-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Academic Assessment & Results Ledger
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              Grade Sheet Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuous internal evaluations (CIE) and semester examinations transcript.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Current CGPA</span>
            <span className="text-2xl font-black font-mono text-white">
              {currentStudent.cgpa.toFixed(2)}
            </span>
          </div>
          <div className="text-right pl-4 border-l border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block">Total Credits</span>
            <span className="text-2xl font-black font-mono text-violet-300">
              {totalCredits}
            </span>
          </div>
        </div>
      </div>

      {/* Marks Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Semester {currentStudent.semester} Course Performance
          </h3>
          <span className="text-xs text-slate-400 font-mono">10-Point Relative Scale</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Course</th>
                <th className="p-3.5 text-center">Credits</th>
                <th className="p-3.5 text-center">Internals (40)</th>
                <th className="p-3.5 text-center">External (60)</th>
                <th className="p-3.5 text-center">Total (100)</th>
                <th className="p-3.5 text-center">Grade Letter</th>
                <th className="p-3.5 text-center">Grade Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {marks.map((m) => {
                const total = m.internalMarks + (m.externalMarks || 48);
                return (
                  <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <p className="font-bold text-white">{m.subjectName}</p>
                      <span className="text-[11px] font-mono text-cyan-400">{m.subjectCode}</span>
                    </td>
                    <td className="p-3.5 text-center font-mono text-slate-300">{m.credits}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-cyan-300">
                      {m.internalMarks} / 40
                    </td>
                    <td className="p-3.5 text-center font-mono text-slate-300">
                      {m.externalMarks ? `${m.externalMarks} / 60` : 'Pending (Nov)'}
                    </td>
                    <td className="p-3.5 text-center font-mono font-black text-white">
                      {total} / 100
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        {m.gradeLetter}
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-emerald-400">
                      {m.gradePoints * m.credits} Pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semester GPA History Badges */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Semester SGPA Trajectory
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { sem: 'Semester 1', sgpa: 8.12, status: 'Passed' },
            { sem: 'Semester 2', sgpa: 8.35, status: 'Passed' },
            { sem: 'Semester 3', sgpa: 8.58, status: 'Passed' },
            { sem: 'Semester 4', sgpa: 8.64, status: 'Passed' },
            { sem: 'Semester 5 (Current)', sgpa: 8.64, status: 'Projected' }
          ].map((item, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <p className="text-[11px] font-mono text-slate-400">{item.sem}</p>
              <p className="text-xl font-black font-mono text-white mt-1">{item.sgpa}</p>
              <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
