import React, { useState } from 'react';
import {
  FileSignature,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  ShieldCheck,
  Upload
} from 'lucide-react';
import { useAppState } from '../data/store';
import { LeaveRequest } from '../types';

export const LeaveApplication: React.FC = () => {
  const { currentStudent, leaveRequests, submitLeaveRequest } = useAppState();

  const [leaveType, setLeaveType] = useState<LeaveRequest['type']>('On Duty (OD)');
  const [startDate, setStartDate] = useState('2026-09-18');
  const [endDate, setEndDate] = useState('2026-09-19');
  const [reason, setReason] = useState('Participation in QuantumX Inter-College Hackathon 2026');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitLeaveRequest({
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        rollNumber: currentStudent.rollNumber,
        type: leaveType,
        startDate,
        endDate,
        reason,
        status: 'Pending',
        submittedAt: 'Just now'
      });

      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-emerald-950/40 border border-emerald-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Digital Leave & Duty Exemption Portal
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              §4.3 Automated Verification
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Submit medical leave, sports on-duty (OD), and hackathon attendance exemptions directly to faculty mentors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Apply for Leave Form (5 cols) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4"
          >
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
              New Leave Submission
            </h3>

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Leave application dispatched to Faculty Advisor!</span>
              </div>
            )}

            {/* Leave Type */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Leave Category</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500/50"
              >
                <option value="On Duty (OD)">On Duty (OD) - Hackathon / Conference</option>
                <option value="Medical">Medical Absence (with Doctor Certificate)</option>
                <option value="Casual">Casual / Personal Leave</option>
                <option value="Sports OD">Sports & Athletic Meet Exemption</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Reason / Event Details</label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="State verified purpose and faculty sanction details..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500/50 resize-none"
              />
            </div>

            {/* AI Policy Impact Note */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                Attendance Policy Protection
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                OD approvals automatically preserve your 100% attendance credit for the missed sessions under Academic Regulation §4.3.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Application</span>
            </button>
          </form>
        </div>

        {/* Right: History & Status Audit (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
              Leave Application Audit Trail
            </h3>

            <div className="space-y-3">
              {leaveRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{req.type}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : req.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{req.reason}</p>
                    <p className="text-[11px] font-mono text-slate-500">
                      Duration: {req.startDate} to {req.endDate}
                    </p>
                  </div>

                  <div className="text-right text-[11px] font-mono text-slate-400">
                    <span>Submitted: {req.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
