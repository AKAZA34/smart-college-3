import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Award,
  CheckSquare,
  Clock
} from 'lucide-react';
import { useAppState } from '../data/store';
import { Student } from '../types';

export const AcademicRisk: React.FC = () => {
  const { currentStudent, students, setStudent } = useAppState();

  const [riskFilter, setRiskFilter] = useState<'All' | 'LOW' | 'MEDIUM' | 'HIGH'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStudents = students.filter((s) => {
    const matchesRisk = riskFilter === 'All' || s.academicRisk === riskFilter;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesQuery;
  });

  const getRiskBadge = (risk: Student['academicRisk']) => {
    switch (risk) {
      case 'HIGH':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
            HIGH RISK
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            MEDIUM RISK
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            LOW RISK
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-rose-950/40 border border-rose-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Academic Risk & Early Intervention Engine
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Multi-Factor Classification
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Machine-learned academic risk index classifying students through continuous attendance, internal marks, and assignment cadence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-400">Total Monitored</p>
            <p className="text-xl font-bold font-mono text-white">{students.length} Students</p>
          </div>
          <div className="text-right pl-3 border-l border-slate-800">
            <p className="text-[10px] font-mono text-rose-400">Intervention Needed</p>
            <p className="text-xl font-black font-mono text-rose-400">
              {students.filter((s) => s.academicRisk === 'HIGH').length} Critical
            </p>
          </div>
        </div>
      </div>

      {/* Current Selected Student Spotlight */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-12 h-12 rounded-xl object-cover border border-cyan-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{currentStudent.name}</h3>
                <span className="text-xs font-mono text-cyan-400">({currentStudent.rollNumber})</span>
                {getRiskBadge(currentStudent.academicRisk)}
              </div>
              <p className="text-xs text-slate-400">
                {currentStudent.department} • Semester {currentStudent.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">CGPA</span>
              <span className="text-white font-bold text-sm">{currentStudent.cgpa}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Attendance</span>
              <span className="text-white font-bold text-sm">{currentStudent.currentAttendance}%</span>
            </div>
          </div>
        </div>

        {/* AI Corrective Action Plan for Student */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Primary Risk Factor</span>
            </div>
            <p className="text-xs text-slate-300">
              Discrete Mathematics attendance stands at <strong>73%</strong> (2% below mandatory threshold).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>Assignment Factor</span>
            </div>
            <p className="text-xs text-slate-300">
              Operating Systems synchronization assignment is due in 9 days with high internal test weighting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Recovery Action</span>
            </div>
            <p className="text-xs text-slate-300">
              Attend the next 3 consecutive Discrete Math tutorials; utilize peer mentoring slot on Friday.
            </p>
          </div>
        </div>
      </div>

      {/* Cohort Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or roll no..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 text-xs text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-rose-500/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {(['All', 'LOW', 'MEDIUM', 'HIGH'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => setRiskFilter(risk)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                riskFilter === risk
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {risk} Risk
            </button>
          ))}
        </div>
      </div>

      {/* Cohort Student Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Student Details</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5 text-center">CGPA</th>
                <th className="p-3.5 text-center">Attendance</th>
                <th className="p-3.5 text-center">Risk Classification</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((std) => (
                <tr
                  key={std.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    std.id === currentStudent.id ? 'bg-cyan-950/20' : ''
                  }`}
                >
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={std.avatar}
                      alt={std.name}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                    />
                    <div>
                      <p className="font-bold text-white">{std.name}</p>
                      <p className="text-[11px] font-mono text-cyan-400">{std.rollNumber}</p>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {std.department} (Sem {std.semester})
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-white">
                    {std.cgpa.toFixed(2)}
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold">
                    <span
                      className={
                        std.currentAttendance < 75
                          ? 'text-rose-400'
                          : std.currentAttendance < 80
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {std.currentAttendance}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center">{getRiskBadge(std.academicRisk)}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setStudent(std.id)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-medium transition-all"
                    >
                      Inspect Profile
                    </button>
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
