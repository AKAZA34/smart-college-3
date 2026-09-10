import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Sparkles,
  Calculator,
  RefreshCw,
  Target,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAppState } from '../data/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const CgpaPredictor: React.FC = () => {
  const { currentStudent, marks } = useAppState();

  // Working state for subject marks simulation
  const [simulatedSubjects, setSimulatedSubjects] = useState(
    marks.map((m) => ({
      code: m.subjectCode,
      name: m.subjectName,
      credits: m.credits,
      internal: m.internalMarks, // out of 40
      predictedExternal: m.externalMarks || 48, // out of 60
    }))
  );

  const [targetCgpa, setTargetCgpa] = useState<number>(8.5);

  // Grade point mapping
  const calculateGradePoint = (totalMarks: number) => {
    if (totalMarks >= 90) return 10; // O
    if (totalMarks >= 80) return 9;  // A+
    if (totalMarks >= 70) return 8;  // A
    if (totalMarks >= 60) return 7;  // B+
    if (totalMarks >= 50) return 6;  // B
    if (totalMarks >= 40) return 5;  // C
    return 0; // F
  };

  // Compute SGPA
  const totalCredits = simulatedSubjects.reduce((acc, s) => acc + s.credits, 0);
  const totalPoints = simulatedSubjects.reduce((acc, s) => {
    const total = s.internal + s.predictedExternal;
    const gp = calculateGradePoint(total);
    return acc + gp * s.credits;
  }, 0);

  const predictedSGPA = totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 8.0;

  // Cumulative CGPA calculation assuming 4 completed semesters with currentStudent.cgpa
  const completedSemesters = currentStudent.semester - 1; // e.g. 4
  const predictedCGPA = Number(
    ((currentStudent.cgpa * completedSemesters + predictedSGPA) / currentStudent.semester).toFixed(2)
  );

  const updateSubjectExternal = (code: string, newExternal: number) => {
    setSimulatedSubjects((prev) =>
      prev.map((s) => (s.code === code ? { ...s, predictedExternal: newExternal } : s))
    );
  };

  // Sensitivity analysis: calculate how much +5 marks in each subject raises the semester GPA
  const sensitivityData = simulatedSubjects.map((s) => {
    const baselineGP = calculateGradePoint(s.internal + s.predictedExternal);
    const boostedGP = calculateGradePoint(Math.min(100, s.internal + s.predictedExternal + 5));
    const gpaDelta = ((boostedGP - baselineGP) * s.credits) / totalCredits;

    return {
      name: s.code,
      fullName: s.name,
      impact: Number(gpaDelta.toFixed(3)),
      credits: s.credits,
      currentTotal: s.internal + s.predictedExternal
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-violet-950/40 border border-violet-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              AI CGPA & SGPA Predictor
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              Sensitivity Optimization
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate external examination outcomes, identify high-leverage courses, and plan target milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-400">Current CGPA</p>
            <p className="text-lg font-bold font-mono text-white">{currentStudent.cgpa.toFixed(2)}</p>
          </div>
          <div className="text-right pl-3 border-l border-slate-800">
            <p className="text-[10px] font-mono text-violet-400 font-bold">Projected CGPA</p>
            <p className="text-xl font-black font-mono text-violet-300">{predictedCGPA.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Target Milestone Calculator Card */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Target CGPA Milestone</h3>
            <p className="text-xs text-slate-400">
              Set your target grade to calculate required external marks across all subjects.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {[8.0, 8.5, 9.0, 9.5].map((val) => (
            <button
              key={val}
              onClick={() => {
                setTargetCgpa(val);
                // Adjust predicted externals to meet target
                const targetSGPA = val * currentStudent.semester - currentStudent.cgpa * (currentStudent.semester - 1);
                const reqExternal = Math.min(58, Math.max(30, Math.round(targetSGPA * 5.8)));
                setSimulatedSubjects((prev) =>
                  prev.map((s) => ({ ...s, predictedExternal: reqExternal }))
                );
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                targetCgpa === val
                  ? 'bg-violet-500 text-white border-violet-400 shadow-md shadow-violet-500/20'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {val.toFixed(1)} CGPA
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Subject Marks Sliders + Impact Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders for each course (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-violet-400" />
                Course Marks Simulation (Internal + External)
              </h3>
              <button
                onClick={() =>
                  setSimulatedSubjects(
                    marks.map((m) => ({
                      code: m.subjectCode,
                      name: m.subjectName,
                      credits: m.credits,
                      internal: m.internalMarks,
                      predictedExternal: m.externalMarks || 48
                    }))
                  )
                }
                className="text-xs text-slate-400 hover:text-violet-300 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {simulatedSubjects.map((sub) => {
              const total = sub.internal + sub.predictedExternal;
              const gp = calculateGradePoint(total);

              return (
                <div key={sub.code} className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-violet-400 mr-2">{sub.code}</span>
                      <span className="font-semibold text-white">{sub.name}</span>
                      <span className="text-slate-400 ml-2 font-mono text-[10px]">({sub.credits} Credits)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px] font-mono">
                        Int: {sub.internal}/40 + Ext: {sub.predictedExternal}/60 =
                      </span>
                      <span className="font-mono font-bold text-white text-sm">
                        {total}/100
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/20 text-violet-300">
                        {gp} Pts
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={sub.predictedExternal}
                    onChange={(e) => updateSubjectExternal(sub.code, Number(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>15 min (Pass cutoff)</span>
                    <span>Predicted External Score: {sub.predictedExternal} / 60</span>
                    <span>60 max</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sensitivity & Highest Impact Subjects (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Summary Scoreboard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/40 via-slate-900/80 to-slate-900/80 border border-violet-500/40 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Simulated Performance Output
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <p className="text-[11px] font-mono text-slate-400">Predicted SGPA</p>
                <p className="text-3xl font-black font-mono text-violet-300 mt-1">
                  {predictedSGPA.toFixed(2)}
                </p>
                <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Sem {currentStudent.semester} Forecast
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <p className="text-[11px] font-mono text-slate-400">Predicted Cumulative CGPA</p>
                <p className="text-3xl font-black font-mono text-white mt-1">
                  {predictedCGPA.toFixed(2)}
                </p>
                <p className="text-[10px] text-cyan-400 mt-1 font-mono">
                  Δ {predictedCGPA >= currentStudent.cgpa ? '+' : ''}
                  {(predictedCGPA - currentStudent.cgpa).toFixed(2)} overall
                </p>
              </div>
            </div>

            {/* Target 8.5 Status */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-violet-500/30 text-xs">
              <div className="flex items-center gap-2 text-violet-300 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                Target 8.5 CGPA Roadmap
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {predictedCGPA >= 8.5 ? (
                  <span className="text-emerald-300">
                    🎉 Excellent! Under this scenario, your overall CGPA reaches <strong>{predictedCGPA.toFixed(2)}</strong>, earning First Class with Distinction!
                  </span>
                ) : (
                  <span>
                    To hit 8.5 CGPA, score at least <strong>52/60</strong> in Operating Systems and <strong>50/60</strong> in Artificial Intelligence.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Subject Sensitivity Bar Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-400" />
              Course Sensitivity Index (Highest Leverage)
            </h3>
            <p className="text-[11px] text-slate-400 mb-4">
              Shows how much each course raises your SGPA when you score +5 marks.
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sensitivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="impact" name="SGPA Boost per +5 marks" radius={[4, 4, 0, 0]}>
                    {sensitivityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#8b5cf6' : index === 1 ? '#06b6d4' : '#3b82f6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
