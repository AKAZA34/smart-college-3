import React from 'react';
import {
  ShieldCheck,
  Users,
  Cpu,
  Building,
  Activity,
  AlertTriangle,
  Sparkles,
  Server,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../data/store';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { students, labs } = useAppState();

  const deptData = [
    { dept: 'CSE & AI', students: 780, attendance: 86.4 },
    { dept: 'ECE', students: 620, attendance: 84.1 },
    { dept: 'Mech', students: 480, attendance: 79.5 },
    { dept: 'Civil', students: 390, attendance: 81.2 },
    { dept: 'Biotech', students: 310, attendance: 88.0 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-emerald-950/40 border border-emerald-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Institutional Administration Matrix
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Campus OS Superuser
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Campus-wide intelligence, departmental telemetry, computing facilities occupancy, and compliance auditing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All Subsystems Nominal
          </span>
        </div>
      </div>

      {/* Institutional KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Total Enrollment</span>
          <p className="text-3xl font-black font-mono text-white mt-1">2,840</p>
          <span className="text-[10px] font-mono text-emerald-400">+12% vs last cycle</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Faculty & Mentors</span>
          <p className="text-3xl font-black font-mono text-cyan-300 mt-1">148</p>
          <span className="text-[10px] font-mono text-slate-400">1:19 student-faculty ratio</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Campus Attendance Avg</span>
          <p className="text-3xl font-black font-mono text-white mt-1">84.2%</p>
          <span className="text-[10px] font-mono text-emerald-400">Above target 80%</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">GPU Workstations</span>
          <p className="text-3xl font-black font-mono text-violet-300 mt-1">115</p>
          <span className="text-[10px] font-mono text-slate-400">NVIDIA A100 Nodes</span>
        </div>
      </div>

      {/* Department Analytics Bar Chart + AI Operational Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Attendance (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Department Attendance & Engagement Matrix
          </h3>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="dept" stroke="#64748b" fontSize={11} />
                <YAxis domain={[60, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Operational Insights (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4" />
            AI Operational Insights
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-white block mb-1">
                Examination Hall Optimization
              </span>
              Exam Hall North 2 reached 94% seat assignment density for Mid-Terms. Recommended overflow routing to Block B South 3.
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-white block mb-1">
                Quantum AI GPU Utilization
              </span>
              Peak workstation demand occurs between 14:00 and 18:00 daily. Automated load balancing has queued 6 deep learning jobs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
