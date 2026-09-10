import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Filter,
  Sparkles,
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useAppState } from '../data/store';

export const AssignmentTracker: React.FC = () => {
  const { assignments, markAssignmentCompleted } = useAppState();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [uploadModalFor, setUploadModalFor] = useState<string | null>(null);

  const filtered = filterStatus === 'All'
    ? assignments
    : assignments.filter((a) => a.status === filterStatus);

  const handleSubmitFile = (id: string) => {
    markAssignmentCompleted(id);
    setUploadModalFor(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-rose-950/40 border border-rose-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-rose-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Assignment & Lab Exercise Command
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              AI Priority Ranked
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track coursework deadlines, submit code repositories, and prioritize based on submission weighting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Pending Tasks</span>
            <span className="text-xl font-black font-mono text-white">
              {assignments.filter((a) => a.status !== 'Completed').length} active
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-slate-900/60 border border-slate-800 overflow-x-auto no-scrollbar">
        {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === status
                ? 'bg-rose-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isCompleted = item.status === 'Completed';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                  : item.priority === 'Critical'
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-lg'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {item.subjectCode}
                    </span>
                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.priority === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300'
                          : item.priority === 'High'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {item.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{item.description}</p>
                  <p className="text-[11px] text-slate-400">Course: {item.subjectName}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs pt-2 sm:pt-0">
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-500 block">Deadline</span>
                    <span className="text-white font-bold">{item.deadline}</span>
                  </div>

                  {isCompleted ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => setUploadModalFor(item.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/20 hover:scale-105 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Submit Work
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {uploadModalFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-rose-500/40 p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">Submit Assignment Solution</h3>
            <p className="text-xs text-slate-400">
              Upload PDF report, Jupyter Notebook (.ipynb), or ZIP codebase.
            </p>

            <div className="p-6 rounded-xl border border-dashed border-slate-700 text-center bg-slate-950/60">
              <Upload className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-medium">Drag & drop project archive</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Maximum size: 25MB</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUploadModalFor(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitFile(uploadModalFor)}
                className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-bold transition-all"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
