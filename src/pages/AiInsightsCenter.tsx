import React from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Brain,
  Zap,
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useAppState } from '../data/store';

export const AiInsightsCenter: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { currentStudent, attendance, marks } = useAppState();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-violet-950/40 border border-violet-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              AI Insights & Academic Optimization Engine
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              Deep Neural Correlation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous multi-modal intelligence analyzing academic velocity, attendance friction, and exam leverage points.
          </p>
        </div>
      </div>

      {/* Top Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight 1: Correlation */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase">
            <Brain className="w-4 h-4" />
            Attendance / Grade Sensitivity
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Students maintaining &gt;85% attendance in <strong>CS301 (DBMS)</strong> demonstrate a <strong>+1.4 GPA advantage</strong> on external SQL indexing questions compared to the departmental cohort.
          </p>
        </div>

        {/* Insight 2: Opportunity */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-violet-400 text-xs font-mono font-bold uppercase">
            <Target className="w-4 h-4" />
            Highest Leverage Subject
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your <strong>Operating Systems (CS302)</strong> internal score of 29/40 has the highest elastic yield. Scoring 54+ on the final examination boosts your semester GPA by <strong>+0.32 points</strong>.
          </p>
        </div>

        {/* Insight 3: Health */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
            <Zap className="w-4 h-4" />
            Cognitive Rhythm
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your peak retention window occurs between <strong>08:30 AM and 11:30 AM</strong>. Scheduling complex algorithms study sessions during this block increases concept mastery by 34%.
          </p>
        </div>
      </div>

      {/* Prescriptive Directives List */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
          Personalized AI Directives for {currentStudent.name}
        </h3>

        <div className="space-y-3">
          {[
            {
              title: 'Attend Next 3 Discrete Math Sessions',
              category: 'Immediate Risk Intervention',
              actionRoute: 'attendance-predictor',
              desc: 'Current standing is 73%. Three consecutive classes safely clears the 75% examination eligibility boundary.'
            },
            {
              title: 'Complete Neural Network Backprop Lab',
              category: 'High-Weight Submission',
              actionRoute: 'assignments',
              desc: 'Accounts for 15% of your CIE marks in CS303. Due in 3 days.'
            },
            {
              title: 'Reserve NVIDIA A100 GPU Slot for Project',
              category: 'Lab Infrastructure',
              actionRoute: 'campus-map',
              desc: 'Quantum AI Lab 4 has open workstations today from 16:00 to 19:00.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{item.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/20 text-violet-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </div>

              <button
                onClick={() => onNavigate(item.actionRoute)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap"
              >
                <span>Execute Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
