import React, { useState } from 'react';
import {
  MapPin,
  Cpu,
  Server,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  Layers
} from 'lucide-react';
import { useAppState } from '../data/store';
import { CAMPUS_LABS_SEED } from '../data/seedData';
import { CampusLab } from '../types';

export const CampusMapLabs: React.FC = () => {
  const { labs } = useAppState();
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedLab, setSelectedLab] = useState<CampusLab>(labs[0]);
  const [reservedSlot, setReservedSlot] = useState<string | null>(null);

  const filteredLabs = filterType === 'All'
    ? labs
    : filterType === 'Available'
    ? labs.filter((l) => l.status === 'Available')
    : labs.filter((l) => l.equipment.toLowerCase().includes('gpu') || l.equipment.toLowerCase().includes('nvidia'));

  const handleReserve = (labId: string) => {
    setReservedSlot(labId);
    setTimeout(() => {
      alert(`Workstation successfully reserved in ${selectedLab.name}! RFID pass authorized.`);
    }, 200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-blue-950/40 border border-blue-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Campus Map & Real-Time Lab Telemetry
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Live Workstation Sensors
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time occupancy tracking across computing laboratories, GPU research clusters, and project workspaces.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          {['All', 'Available', 'GPU Clusters'].map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterType === ft
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {ft}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Campus Map Visualizer (Schematic Architecture) */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Interactive Campus Floor Plan</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sensors Active (MQTT Stream)
          </span>
        </div>

        {/* Schematic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Tech Tower (TT)', desc: 'AI Labs & Deep Learning Clusters', color: 'border-cyan-500/40 bg-cyan-950/20' },
            { name: 'Academic Block B', desc: 'Operating Systems & Database Labs', color: 'border-blue-500/40 bg-blue-950/20' },
            { name: 'Innovation Hub', desc: 'Robotics & Hardware Prototyping', color: 'border-violet-500/40 bg-violet-950/20' },
            { name: 'Central Library', desc: 'Quiet Study & Digital Archives', color: 'border-emerald-500/40 bg-emerald-950/20' }
          ].map((b, i) => (
            <div key={i} className={`p-4 rounded-xl border ${b.color} space-y-1`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{b.name}</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <p className="text-[11px] text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Laboratories Live Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredLabs.map((lab) => {
          const isAvailable = lab.status === 'Available';
          const freeStations = lab.totalCapacity - lab.currentOccupancy;
          const isSelected = selectedLab.id === lab.id;

          return (
            <div
              key={lab.id}
              onClick={() => setSelectedLab(lab)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isAvailable
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {lab.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {lab.floor}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {lab.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{lab.building}</p>
                <p className="text-[11px] text-cyan-400/90 font-mono mt-2 truncate">
                  {lab.equipment}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Capacity:</span>
                  <span className="text-white font-bold">
                    {lab.currentOccupancy} / {lab.totalCapacity} ({freeStations} free)
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isAvailable ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${(lab.currentOccupancy / lab.totalCapacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Lab Detailed Telemetry & Reservation Drawer */}
      {selectedLab && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-cyan-500/30 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">{selectedLab.name}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/20 text-cyan-300">
                  {selectedLab.building} • {selectedLab.floor}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Equipped with {selectedLab.equipment}
              </p>
            </div>

            <button
              onClick={() => handleReserve(selectedLab.id)}
              disabled={selectedLab.status !== 'Available'}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              {selectedLab.status === 'Available' ? 'Reserve Workstation Now' : 'Currently Occupied'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Workstations</span>
              <span className="text-xl font-bold text-white">{selectedLab.totalCapacity} Nodes</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Free Workstations</span>
              <span className="text-xl font-bold text-emerald-400">
                {selectedLab.totalCapacity - selectedLab.currentOccupancy} Available
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Lab Access Timings</span>
              <span className="text-xl font-bold text-cyan-300">08:00 - 20:00</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
