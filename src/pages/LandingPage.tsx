import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Calculator,
  TrendingUp,
  Calendar,
  Layers,
  GraduationCap,
  Briefcase,
  Users,
  ShieldCheck,
  CheckCircle2,
  Zap,
  BookOpen,
  Bot,
  Flame,
  ArrowUpRight,
  LogIn
} from 'lucide-react';
import { QuantumCampusState } from '../components/quantum/QuantumCampusState';
import { useAppState } from '../data/store';
import { UserRole } from '../types';

interface Props {
  onNavigate: (route: string) => void;
  onTriggerCopilot: (prompt: string) => void;
}

export const LandingPage: React.FC<Props> = ({ onNavigate, onTriggerCopilot }) => {
  const { setRole, currentStudent } = useAppState();

  const handleRoleSelect = (role: UserRole, targetRoute: string) => {
    setRole(role);
    onNavigate(targetRoute);
  };

  const tryAiPrompts = [
    {
      label: 'Predict My Attendance',
      prompt: 'What happens if I miss the next 2 classes in Operating Systems and Discrete Math?',
      route: 'attendance-predictor',
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-300 border-cyan-500/30'
    },
    {
      label: 'Predict My CGPA',
      prompt: 'What is my predicted CGPA and how can I boost it to 8.8 with my current internals?',
      route: 'cgpa-predictor',
      color: 'from-violet-500/20 to-purple-500/10 text-violet-300 border-violet-500/30'
    },
    {
      label: 'Build My Study Plan',
      prompt: 'Generate an AI study schedule for my upcoming Mid-Semester exams focusing on weak subjects.',
      route: 'study-planner',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30'
    },
    {
      label: 'Analyze My Performance',
      prompt: 'Evaluate my current academic risk factors and provide a corrective recovery plan.',
      route: 'academic-risk',
      color: 'from-rose-500/20 to-red-500/10 text-rose-300 border-rose-500/30'
    },
    {
      label: 'Summarize College Notices',
      prompt: 'Summarize today\'s college notices and extract mid-semester examination instructions.',
      route: 'doc-intelligence',
      color: 'from-sky-500/20 to-indigo-500/10 text-sky-300 border-sky-500/30'
    },
    {
      label: 'Find Available Labs',
      prompt: 'Which computer and AI GPU research labs are currently available for project work?',
      route: 'campus-map',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Glow ambient backdrops */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/15 via-blue-600/15 to-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-4 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-2 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI CAMPUS OPERATING SYSTEM • HACKATHON EDITION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-[1.1]">
            Your Campus. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Powered by Intelligence.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            One AI-powered platform for students, faculty, parents, and institutions.
            Featuring quantum-inspired telemetry, predictive attendance engines, dynamic CGPA forecasting, and autonomous Copilot.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Campus Login Portal</span>
            </button>

            <button
              onClick={() => {
                setRole('STUDENT');
                onNavigate('student-dashboard');
              }}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Smart Campus</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => onTriggerCopilot('Hello Campus Copilot, summarize my overall academic status.')}
              className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 font-semibold text-sm border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Try AI Copilot</span>
            </button>

            <button
              onClick={() => {
                setRole('STUDENT');
                onNavigate('student-dashboard');
              }}
              className="px-4 py-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800 transition-colors"
            >
              ⚡ 1-Click Demo
            </button>
          </div>
        </div>

        {/* 3D Quantum Campus State Hero Preview */}
        <div className="mt-12 relative z-10">
          <QuantumCampusState onNavigate={onNavigate} />
        </div>
      </section>

      {/* "TRY AI" Real-Time Prompt Triggers */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/60">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" />
            Interactive AI Demo Experience
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
            Instant AI Capabilities
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click any prompt below to immediately trigger live calculation with realistic campus data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tryAiPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onNavigate(item.route);
              }}
              className={`p-4 rounded-xl text-left bg-gradient-to-br ${item.color} border hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                  &quot;{item.prompt}&quot;
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Deterministic ML + Gemini</span>
                <span className="text-white font-medium group-hover:underline">Launch →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Four Persona Role Gateways */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/60">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            Role-Based Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] mt-1">
            Tailored Experiences for Every Campus Stakeholder
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Student */}
          <div
            onClick={() => handleRoleSelect('STUDENT', 'student-dashboard')}
            className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Student Command Center
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Attendance simulator, CGPA forecasting, AI study scheduler, assignments tracker, and 3D quantum telemetry.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>Open Student OS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Faculty */}
          <div
            onClick={() => handleRoleSelect('FACULTY', 'faculty-dashboard')}
            className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Faculty Workspace
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                1-Click attendance marking, grade uploading, class performance synthesis, and leave authorization.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-400">
              <span>Open Faculty Desk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Parent */}
          <div
            onClick={() => handleRoleSelect('PARENT', 'parent-dashboard')}
            className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-violet-500/30 hover:border-violet-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                Parent Transparency Portal
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Privacy-aware student audit, attendance alerts, examination calendar, and academic risk indicators.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-violet-400">
              <span>Open Parent View</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Admin */}
          <div
            onClick={() => handleRoleSelect('ADMIN', 'admin-dashboard')}
            className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Institutional Admin Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Campus-wide intelligence, lab utilization metrics, official policy knowledge base management, and audit logs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Open Admin Matrix</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating features overview badge */}
      <section className="py-12 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">20+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Seeded Student Profiles</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-400">100%</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Deterministic Fallbacks</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-violet-400">7</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Quantum Orbital Nodes</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">&lt; 150ms</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Simulation Latency</p>
          </div>
        </div>
      </section>
    </div>
  );
};
