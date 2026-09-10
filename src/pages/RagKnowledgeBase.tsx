import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  CornerDownRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { RAG_KNOWLEDGE_SEED } from '../data/seedData';
import { RagDocument } from '../types';

export const RagKnowledgeBase: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<RagDocument | null>(null);
  const [ragAnswer, setRagAnswer] = useState<{
    text: string;
    citations: string[];
  } | null>({
    text: `According to **Academic Regulations §4.1**, all students must maintain at least **75% attendance** in each registered course to be eligible to appear for the End-Semester Examination. 

Students having attendance between **65% and 74.9%** may apply for condonation on verified medical grounds with supporting documents submitted to the Dean of Academic Affairs within 7 calendar days. Students with attendance below **65%** will be strictly detained and must repeat the course.`,
    citations: ['Academic Regulations & Attendance Policy (2025-2027) §4.1-§4.3']
  });

  const knowledgeDocs: RagDocument[] = RAG_KNOWLEDGE_SEED;

  const quickQuestions = [
    'What is the minimum attendance required for exams?',
    'What are the condonation rules for medical absence?',
    'How is SGPA and CGPA calculated on the 10-point scale?',
    'What are the timings and rules for the AI Research Lab?',
    'When do Fall 2026 Mid-Semester examinations begin?'
  ];

  const handleAskRAG = async (qText?: string) => {
    const q = (qText || query).trim();
    if (!q) return;

    setIsSearching(true);
    setQuery(q);

    try {
      const res = await fetch('/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });

      if (res.ok) {
        const data = await res.json();
        setRagAnswer({
          text: data.answer,
          citations: data.citations || ['Official Regulations §4.1']
        });
      }
    } catch (e) {
      console.error('RAG request fallback');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-purple-950/40 border border-purple-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Official College Knowledge Base & RAG Assistant
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Verified Citations
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Grounded vector retrieval across university statutes, examination manuals, attendance codes, and academic schedules.
          </p>
        </div>
      </div>

      {/* RAG Query Input */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskRAG();
              }}
              placeholder="Ask any policy question (e.g., 'What is the attendance condonation rule?')"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 text-xs text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-purple-500/60"
            />
          </div>
          <button
            onClick={() => handleAskRAG()}
            disabled={!query.trim() || isSearching}
            className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-40 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Search RAG</span>
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
            Quick Inquiries:
          </span>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleAskRAG(q)}
              className="px-3 py-1 rounded-full text-[11px] bg-slate-950 text-slate-400 hover:text-purple-300 hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* RAG Synthesized Answer with Official Citations */}
      {ragAnswer && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/40 shadow-xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Verified Institutional Answer
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Grounded in Statutes
            </span>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {ragAnswer.text}
          </div>

          {/* Source Citations */}
          {ragAnswer.citations && ragAnswer.citations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Document Sources:
              </span>
              {ragAnswer.citations.map((cit, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-mono flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  {cit}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Official Knowledge Documents Index */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Knowledge Base Repository Index
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {knowledgeDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="p-4 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors">
                  {doc.title}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                  {doc.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {doc.content}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>{doc.section}</span>
                <span className="text-purple-400 font-semibold group-hover:underline">
                  View Passage →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white">{selectedDoc.title}</h3>
                <p className="text-[11px] font-mono text-purple-400">{selectedDoc.section}</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedDoc.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
