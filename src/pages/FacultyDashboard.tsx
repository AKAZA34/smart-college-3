import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  FileSignature,
  Award,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  Upload,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../data/store';

export const FacultyDashboard: React.FC = () => {
  const { students, leaveRequests, approveLeaveRequest, rejectLeaveRequest } = useAppState();

  const [markedToday, setMarkedToday] = useState<Record<string, 'Present' | 'Absent'>>({
    'std-1': 'Present',
    'std-2': 'Present',
    'std-3': 'Absent',
    'std-4': 'Present',
    'std-5': 'Present'
  });

  const [activeCourse, setActiveCourse] = useState('CS301 Database Management Systems');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleStatus = (id: string) => {
    setMarkedToday((prev) => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleBulkSubmit = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const highRiskStudents = students.filter((s) => s.academicRisk === 'HIGH');
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-blue-950/40 border border-blue-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Faculty Command & Instruction Desk
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Dr. Priya Sharma (CSE)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time session attendance roll call, grade uploads, leave approvals, and class performance analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Class Cohort</span>
            <span className="text-xl font-bold font-mono text-white">42 Enrolled</span>
          </div>
          <div className="text-right pl-3 border-l border-slate-800">
            <span className="text-[10px] font-mono text-rose-400">At-Risk Alerts</span>
            <span className="text-xl font-black font-mono text-rose-400">
              {highRiskStudents.length} Students
            </span>
          </div>
        </div>
      </div>

      {/* AI Class Intelligence Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-slate-900/80 to-slate-900/80 border border-cyan-500/30 shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Class Performance Synthesis (CS301 DBMS)
          </div>
          <span className="text-[10px] font-mono text-slate-400">Updated 10m ago</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          &quot;Overall class attendance has rebounded to <strong>84.6%</strong> this week. However, <strong>3 students</strong> (Rohan Sharma, Maya Patel) are approaching the 75% boundary prior to the upcoming B+ Tree lab exam. Consider scheduling a remedial tutorial session on Thursday.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 1-Click Attendance Roll Call (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  1-Click Attendance Roll Call
                </h3>
                <p className="text-[11px] text-slate-400">{activeCourse} • Today 09:00 AM</p>
              </div>

              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
                <button
                  onClick={handleBulkSubmit}
                  className="px-4 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  Commit Attendance
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {students.slice(0, 6).map((std) => {
                const status = markedToday[std.id] || 'Present';
                const isPresent = status === 'Present';

                return (
                  <div
                    key={std.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={std.avatar}
                        alt={std.name}
                        className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-xs text-white">{std.name}</p>
                        <p className="text-[11px] font-mono text-cyan-400">{std.rollNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">
                        {std.currentAttendance}% avg
                      </span>
                      <button
                        onClick={() => toggleStatus(std.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                          isPresent
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                        }`}
                      >
                        {isPresent ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Present
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Absent
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Leave Approvals & Grade Upload (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pending Leave Requests */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileSignature className="w-4 h-4 text-emerald-400" />
                Pending Leave & OD Approvals
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                {pendingLeaves.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingLeaves.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-white">{req.studentName}</p>
                      <p className="text-[10px] font-mono text-cyan-400">{req.rollNumber}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {req.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{req.reason}</p>
                  <p className="text-[10px] font-mono text-slate-500">
                    {req.startDate} to {req.endDate}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-850">
                    <button
                      onClick={() => rejectLeaveRequest(req.id)}
                      className="px-2.5 py-1 rounded-lg text-[11px] text-rose-400 hover:bg-rose-950/40 border border-rose-900 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => approveLeaveRequest(req.id)}
                      className="px-3 py-1 rounded-lg text-[11px] bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-sm"
                    >
                      Authorize OD Exemption
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Marks Upload Box */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-400" />
              Batch Grade & Internal Marks Upload
            </h4>
            <p className="text-xs text-slate-400">
              Upload CSV or Excel sheet containing internal marks for Mid-Term 1.
            </p>
            <div className="p-4 rounded-xl border border-dashed border-slate-700 text-center bg-slate-950/50">
              <Upload className="w-6 h-6 text-violet-400 mx-auto mb-1.5" />
              <p className="text-xs text-slate-300">Drag CSV or click to browse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
