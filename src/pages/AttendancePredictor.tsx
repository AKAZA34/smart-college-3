import React, { useState } from 'react';
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useAppState } from '../data/store';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

export const AttendancePredictor: React.FC = () => {
  const { currentStudent, attendance } = useAppState();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(attendance[0]?.code || 'CS301');
  const [classesToMiss, setClassesToMiss] = useState<number>(1);
  const [classesToAttendNext, setClassesToAttendNext] = useState<number>(0);

  const activeSubject = attendance.find((a) => a.code === selectedSubjectCode) || attendance[0];

  // Mathematical attendance model
  const currentAttended = activeSubject ? activeSubject.attended : 28;
  const currentTotal = activeSubject ? activeSubject.total : 34;
  const currentPct = Number(((currentAttended / currentTotal) * 100).toFixed(1));

  // Simulated numbers
  const simulatedAttended = currentAttended + classesToAttendNext;
  const simulatedTotal = currentTotal + classesToMiss + classesToAttendNext;
  const simulatedPct = Number(((simulatedAttended / simulatedTotal) * 100).toFixed(1));

  // Threshold math
  // To reach target P (e.g. 75% = 0.75): (attended + x) / (total + x) >= 0.75 => x >= (0.75*total - attended) / 0.25
  const neededFor75 = Math.max(0, Math.ceil((0.75 * currentTotal - currentAttended) / 0.25));
  const neededFor80 = Math.max(0, Math.ceil((0.8 * currentTotal - currentAttended) / 0.2));
  const neededFor85 = Math.max(0, Math.ceil((0.85 * currentTotal - currentAttended) / 0.15));

  // Max classes that can be missed without dipping below 75%:
  // attended / (total + y) >= 0.75 => total + y <= attended / 0.75 => y <= attended / 0.75 - total
  const maxCanMissFor75 = Math.max(0, Math.floor(currentAttended / 0.75 - currentTotal));

  // Trend simulation data for Recharts
  const trendData = [
    { week: 'Wk 1', actual: 92, projected: 92, threshold: 75 },
    { week: 'Wk 2', actual: 88, projected: 88, threshold: 75 },
    { week: 'Wk 3', actual: 84, projected: 84, threshold: 75 },
    { week: 'Wk 4', actual: currentPct, projected: currentPct, threshold: 75 },
    { week: 'Wk 5', actual: null, projected: Number((simulatedPct + 1.2).toFixed(1)), threshold: 75 },
    { week: 'Wk 6', actual: null, projected: simulatedPct, threshold: 75 },
    { week: 'Wk 7', actual: null, projected: Number((simulatedPct - (classesToMiss > 1 ? 2.5 : -1.5)).toFixed(1)), threshold: 75 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 border border-cyan-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              AI Attendance Simulation Engine
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Deterministic Matrix
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate future attendance scenarios, calculate exam safety buffers, and evaluate compliance with university 75% thresholds.
          </p>
        </div>

        {/* Course Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Subject:</label>
          <select
            value={selectedSubjectCode}
            onChange={(e) => setSelectedSubjectCode(e.target.value)}
            className="bg-slate-900 text-cyan-300 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-400"
          >
            {attendance.map((sub) => (
              <option key={sub.code} value={sub.code}>
                {sub.code} — {sub.name} ({sub.percentage}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Sliders & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-lg backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Scenario Simulation Controls
              </h3>
              <button
                onClick={() => {
                  setClassesToMiss(0);
                  setClassesToAttendNext(0);
                }}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Simulation
              </button>
            </div>

            {/* Quick Scenario Buttons */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-300">Quick Scenarios</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    setClassesToMiss(1);
                    setClassesToAttendNext(0);
                  }}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                    classesToMiss === 1 && classesToAttendNext === 0
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Miss 1 Class
                </button>
                <button
                  onClick={() => {
                    setClassesToMiss(3);
                    setClassesToAttendNext(0);
                  }}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                    classesToMiss === 3 && classesToAttendNext === 0
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Miss 3 Classes
                </button>
                <button
                  onClick={() => {
                    setClassesToMiss(0);
                    setClassesToAttendNext(5);
                  }}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                    classesToMiss === 0 && classesToAttendNext === 5
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Attend Next 5
                </button>
                <button
                  onClick={() => {
                    setClassesToMiss(0);
                    setClassesToAttendNext(neededFor80);
                  }}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                    classesToAttendNext === neededFor80
                      ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 font-bold'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Target 80%
                </button>
              </div>
            </div>

            {/* Slider 1: Miss Classes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  What if I miss the next classes?
                </span>
                <span className="font-mono font-bold text-rose-400 text-sm">
                  {classesToMiss} {classesToMiss === 1 ? 'class' : 'classes'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={classesToMiss}
                onChange={(e) => {
                  setClassesToMiss(Number(e.target.value));
                  if (Number(e.target.value) > 0) setClassesToAttendNext(0);
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10 classes</span>
              </div>
            </div>

            {/* Slider 2: Attend Classes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  What if I attend upcoming consecutive sessions?
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  +{classesToAttendNext} classes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={classesToAttendNext}
                onChange={(e) => {
                  setClassesToAttendNext(Number(e.target.value));
                  if (Number(e.target.value) > 0) setClassesToMiss(0);
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span>3</span>
                <span>6</span>
                <span>9</span>
                <span>12</span>
                <span>15 classes</span>
              </div>
            </div>

            {/* Live Comparative Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <p className="text-[11px] font-mono text-slate-400">Current Standing</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black font-mono text-white">
                    {currentPct}%
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({currentAttended}/{currentTotal})
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  simulatedPct < 75
                    ? 'bg-rose-950/30 border-rose-500/50'
                    : simulatedPct < 80
                    ? 'bg-amber-950/30 border-amber-500/50'
                    : 'bg-cyan-950/30 border-cyan-500/50'
                }`}
              >
                <p className="text-[11px] font-mono text-slate-400">Simulated Outcome</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-3xl font-black font-mono ${
                      simulatedPct < 75
                        ? 'text-rose-400'
                        : simulatedPct < 80
                        ? 'text-amber-400'
                        : 'text-cyan-400'
                    }`}
                  >
                    {simulatedPct}%
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    ({simulatedAttended}/{simulatedTotal})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Prediction Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Attendance Trend & Projection Trajectory
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <ReferenceLine y={75} stroke="#f43f5e" strokeDasharray="4 4" label={{ value: '75% Mandatory Exam Threshold', fill: '#f43f5e', fontSize: 10 }} />
                  <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} name="Actual %" />
                  <Line type="monotone" dataKey="projected" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Simulated %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: AI Guidance & Buffer Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Critical Threshold Warning Box */}
          {simulatedPct < 75 ? (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/50 shadow-xl space-y-3 animate-pulse">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>CRITICAL EXAM ELIGIBILITY RISK</span>
              </div>
              <p className="text-xs text-rose-200 leading-relaxed">
                By missing <strong>{classesToMiss} class(es)</strong>, your attendance drops to <strong>{simulatedPct}%</strong>, which violates §4.1 of the Academic Regulations (75% minimum).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 text-xs text-slate-300 border border-rose-900">
                ⚠️ Condonation request on medical grounds requires approval from the Academic Dean and carries an administrative processing penalty.
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>SAFE EXAMINATION STANDING</span>
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Under this simulation, your attendance remains at <strong>{simulatedPct}%</strong>, satisfying the institutional requirement.
              </p>
            </div>
          )}

          {/* Buffer Calculator Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Course Threshold Matrix
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Safe Miss Buffer</p>
                  <p className="text-[11px] text-slate-400">Classes you can miss above 75%</p>
                </div>
                <span className="text-lg font-black font-mono text-cyan-400">
                  {maxCanMissFor75} classes
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Target 75% Minimum</p>
                  <p className="text-[11px] text-slate-400">Classes needed right now</p>
                </div>
                <span className="text-lg font-black font-mono text-amber-400">
                  {neededFor75} classes
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Target 80% Safe Buffer</p>
                  <p className="text-[11px] text-slate-400">Classes needed for safety</p>
                </div>
                <span className="text-lg font-black font-mono text-emerald-400">
                  {neededFor80} classes
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Target 85% Distinction</p>
                  <p className="text-[11px] text-slate-400">Classes needed for 85%</p>
                </div>
                <span className="text-lg font-black font-mono text-violet-400">
                  {neededFor85} classes
                </span>
              </div>
            </div>
          </div>

          {/* Actionable AI Guidance */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-500/30 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Copilot Actionable Directive
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;In <strong>{activeSubject.name}</strong>, prioritize attending the next laboratory sessions scheduled on Thursday and Friday. Missing lab sessions incurs double attendance penalty according to departmental regulations.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
