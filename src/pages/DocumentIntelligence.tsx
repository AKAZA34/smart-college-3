import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  AlertCircle,
  FileCheck,
  Download,
  Eye,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../data/store';
import { DocumentExtraction } from '../types';

export const DocumentIntelligence: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<string>('exam-notice');
  const [extractedDoc, setExtractedDoc] = useState<DocumentExtraction>({
    id: 'doc-seed-1',
    fileName: 'Mid_Semester_Exam_Circular_Fall2026.pdf',
    fileType: 'application/pdf',
    uploadDate: '2026-09-08',
    examName: 'Mid-Semester Examinations (Odd Semester 2026-27)',
    date: 'September 24, 2026 - October 03, 2026',
    subjects: [
      'CS301 Database Management Systems',
      'CS302 Operating Systems & Concurrency',
      'CS303 Artificial Intelligence & Neural Networks',
      'MA301 Discrete Mathematics & Logic'
    ],
    venue: 'Academic Complex Block B - Examination Halls North 1, North 2 & South 3',
    summary: 'Administrative notification scheduling mid-semester assessments. Morning shift runs 10:00 to 12:00. RFID student credential cards and verified hall tickets required for security clearance.',
    importantInstructions: [
      'Reporting time is strictly 09:30 AM (30 minutes prior to paper commencement).',
      'Entry gates close strictly 15 minutes after examination begins.',
      'Programmable calculators, smartphones, and smartwatch wearables are strictly prohibited.',
      'Possession of unapproved material incurs immediate disciplinary action under Academic Code §8.3.'
    ],
    deadlines: [
      { item: 'Hall Ticket Verification Portal Closure', date: '2026-09-22' },
      { item: 'Medical Scribe & Special Accommodation Submissions', date: '2026-09-18' }
    ]
  });

  const sampleDocs = [
    {
      id: 'exam-notice',
      title: 'Mid-Term Exam Circular 2026',
      type: 'Official Circular',
      text: `OFFICE OF THE CONTROLLER OF EXAMINATIONS
CIRCULAR NO: COE/MIDSEM/2026/04
Subject: Conduct of Mid-Semester Examinations Fall 2026
Dates: September 24 to October 03, 2026
Venues: Block B Examination Halls North 1 & South 3
Courses: CS301 DBMS, CS302 OS, CS303 AI, MA301 Discrete Math.
Reporting: 09:30 AM. Strictly no smartwatches allowed.`
    },
    {
      id: 'hackathon-notice',
      title: 'QuantumX 2026 Hackathon Brief',
      type: 'Campus Event',
      text: `QUANTUM INNOVATION COUNCIL
EVENT: QuantumX Hackathon 2026
Venue: Innovation Center Labs 1 & 2
Dates: October 16-18, 2026
Attendance Exemption: Participating students will be awarded 3 days of Duty Leave (OD) with full attendance credit upon mentor verification.`
    },
    {
      id: 'lab-protocol',
      title: 'NVIDIA GPU Cluster Protocol',
      type: 'Lab Guidelines',
      text: `DEPARTMENT OF COMPUTER SCIENCE & AI
Protocol §9.1: Computer & AI GPU Laboratories
Operating Hours: 08:00 to 20:00 Monday through Saturday.
GPU Workstations: NVIDIA A100 compute nodes reserved for enrolled deep learning students. Booking required 24 hours in advance.`
    }
  ];

  const handleSelectSample = async (sample: typeof sampleDocs[0]) => {
    setSelectedSample(sample.id);
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/documents/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `${sample.title.replace(/\s+/g, '_')}.pdf`,
          textContent: sample.text
        })
      });

      if (res.ok) {
        const data = await res.json();
        setExtractedDoc(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/documents/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          textContent: `Uploaded Document: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setExtractedDoc(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-sky-950/40 border border-sky-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              AI Document Intelligence & OCR Extraction
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Gemini Vision + Parsing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Upload institutional circulars, syllabi, or exam notices to automatically extract structured schemas, examination timetables, and rules.
          </p>
        </div>
      </div>

      {/* Upload and Sample Pickers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upload Dropzone & Sample Library (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Upload Dropzone */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-dashed border-sky-500/40 hover:border-sky-400 text-center transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white">Upload Campus Document</h4>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Drag & drop PDF, scanned PNG/JPG circulars or click to browse
            </p>

            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span>Browse Files</span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Sample Documents Library */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Sample Documents (1-Click Test)
              </h4>
              <span className="text-[10px] text-sky-400 font-mono">Verified OCR</span>
            </div>

            <div className="space-y-2">
              {sampleDocs.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedSample === sample.id
                      ? 'bg-sky-950/40 text-sky-300 border-sky-500/50 font-semibold shadow-inner'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sample.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {sample.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {sample.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Extracted Structured Intelligence Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {extractedDoc.fileName}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Extracted via Gemini 3.8 Flash • {extractedDoc.uploadDate}
                  </p>
                </div>
              </div>

              {isAnalyzing && (
                <div className="flex items-center gap-2 text-xs text-sky-400 animate-pulse">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Document...</span>
                </div>
              )}
            </div>

            {/* Structured Fields Grid */}
            <div className="space-y-4">
              {/* Exam Name & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    Event / Exam Title
                  </span>
                  <span className="font-bold text-xs text-white">
                    {extractedDoc.examName || 'Administrative Notification'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    Schedule / Dates
                  </span>
                  <span className="font-bold text-xs text-sky-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {extractedDoc.date || 'To be announced'}
                  </span>
                </div>
              </div>

              {/* Venue */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    Venue / Campus Location
                  </span>
                  <span className="font-bold text-xs text-white">
                    {extractedDoc.venue || 'Campus Main Grounds'}
                  </span>
                </div>
                <MapPin className="w-4 h-4 text-rose-400" />
              </div>

              {/* Executive Summary */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block">
                  AI Synthesized Summary
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {extractedDoc.summary}
                </p>
              </div>

              {/* Extracted Subjects List */}
              {extractedDoc.subjects && extractedDoc.subjects.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Extracted Subjects & Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {extractedDoc.subjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 text-cyan-300 border border-slate-800 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Instructions */}
              {extractedDoc.importantInstructions && extractedDoc.importantInstructions.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Mandatory Rules & Instructions
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {extractedDoc.importantInstructions.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
