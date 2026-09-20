import React, { useState } from 'react';
import { Suite } from '../types';
import { SUITES_DATA } from '../data/hotelData';
import { ArrowUpRight, Compass, FileText, Layers, Maximize, Shield, Sparkles, Users } from 'lucide-react';

interface SuitesSectionProps {
  onSelectSuite: (suite: Suite) => void;
  onReserveSuite: (suiteId: string) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({
  onSelectSuite,
  onReserveSuite
}) => {
  const [filter, setFilter] = useState<'all' | 'signature' | 'forest' | 'water'>('all');
  const [viewMode, setViewMode] = useState<'editorial' | 'blueprint'>('editorial');

  const filteredSuites = SUITES_DATA.filter((s) => {
    if (filter === 'signature') return s.id.includes('monolith') || s.id.includes('horizon');
    if (filter === 'forest') return s.id.includes('cedar');
    if (filter === 'water') return s.id.includes('water');
    return true;
  });

  return (
    <section id="suites" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Subtitle & Heading with View Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
            Private Residences & Sanctuaries
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f2eee9] font-light mt-2 tracking-wide">
            Architectural Pavilions
          </h2>
        </div>

        {/* View Mode: Photography vs CAD Blueprint */}
        <div className="flex items-center gap-2 bg-[#0e1014] p-1 border border-white/10 rounded-xs self-start md:self-end">
          <button
            onClick={() => setViewMode('editorial')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-widest rounded-xs flex items-center gap-1.5 transition-all ${
              viewMode === 'editorial'
                ? 'bg-[#c4a47c] text-[#0b0c0e] font-semibold'
                : 'text-[#8e877c] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Editorial View
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-widest rounded-xs flex items-center gap-1.5 transition-all ${
              viewMode === 'blueprint'
                ? 'bg-[#c4a47c] text-[#0b0c0e] font-semibold'
                : 'text-[#8e877c] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            CAD Blueprint
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Pavilions' },
          { id: 'signature', label: 'Signature Villas' },
          { id: 'forest', label: 'Forest Courtyards' },
          { id: 'water', label: 'Lakeside Residences' }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`filter-${tab.id}-btn`}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
              filter === tab.id
                ? 'bg-white/15 text-white font-medium border border-[#c4a47c]'
                : 'text-[#8e877c] hover:text-[#ded8cf] hover:bg-white/5 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Suites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {filteredSuites.map((suite, index) => (
          <div
            key={suite.id}
            className="group relative bg-[#0e1015] border border-white/10 rounded-xs overflow-hidden transition-all duration-500 hover:border-[#c4a47c]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Top Showcase: Either High-Res Editorial or CAD Architectural Blueprint */}
            {viewMode === 'editorial' ? (
              <div
                className="relative h-72 sm:h-84 w-full overflow-hidden bg-black cursor-pointer"
                onClick={() => onSelectSuite(suite)}
              >
                <img
                  src={suite.images[0]}
                  alt={suite.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-transparent opacity-80" />

                {/* Index Numeral */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#0b0c0e]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#ded8cf] rounded-xs">
                  0{index + 1} // {suite.category}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#9c9589] block">Nightly rate from</span>
                  <span className="font-serif text-2xl text-white tracking-wide">
                    ${suite.startingPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              /* CAD BLUEPRINT SCHEMATIC VIEW */
              <div
                className="relative h-72 sm:h-84 w-full bg-[#080a0d] border-b border-white/10 p-6 flex flex-col justify-between font-mono select-none cursor-pointer overflow-hidden"
                onClick={() => onSelectSuite(suite)}
              >
                {/* Blueprint Grid Lines Background */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#3d485a_1px,transparent_1px),linear-gradient(to_bottom,#3d485a_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Header Callout */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#c4a47c] block">
                      ARCHITECTURAL SCHEMATIC // CAD-0{index + 1}
                    </span>
                    <span className="text-sm text-white font-bold tracking-wider">{suite.name}</span>
                  </div>
                  <span className="text-[10px] text-[#797368] border border-white/10 px-2 py-0.5 rounded-xs">
                    REV 2026.09
                  </span>
                </div>

                {/* Blueprint Technical Data Matrix */}
                <div className="relative z-10 grid grid-cols-2 gap-3 bg-black/40 p-4 border border-white/10 rounded-xs text-[10px]">
                  <div>
                    <span className="text-[#797368] block">STRUCTURAL CANTILEVER:</span>
                    <span className="text-[#ded8cf]">{suite.architecturalSpecs.cantileverSpan}</span>
                  </div>
                  <div>
                    <span className="text-[#797368] block">THERMAL ONSON TEMP:</span>
                    <span className="text-[#c4a47c]">{suite.architecturalSpecs.thermalPoolTemp}</span>
                  </div>
                  <div>
                    <span className="text-[#797368] block">ACOUSTIC ISOLATION:</span>
                    <span className="text-[#ded8cf]">{suite.architecturalSpecs.acousticSilenceRating}</span>
                  </div>
                  <div>
                    <span className="text-[#797368] block">PRIMARY MATERIAL:</span>
                    <span className="text-[#ded8cf] truncate block">{suite.architecturalSpecs.structuralMaterial}</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[9px] text-[#797368]">
                  <span>SCALE: 1:100 ENVELOPE</span>
                  <span className="text-[#c4a47c]">CLICK TO INSPECT DOSSIER →</span>
                </div>
              </div>
            )}

            {/* Suite Details Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#f2eee9] group-hover:text-[#c4a47c] transition-colors tracking-wide">
                  {suite.name}
                </h3>
                <p className="text-xs text-[#8e877c] font-light mt-1 mb-4 italic">
                  {suite.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#b8b1a5] font-light leading-relaxed line-clamp-2">
                  {suite.overview}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-[11px] text-[#9c9589]">
                <div className="flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-[#c4a47c]" />
                  <span>{suite.sqm} m²</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c4a47c]" />
                  <span>Up to {suite.guests} Guests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#c4a47c]" />
                  <span className="truncate">{suite.highlightSpecs[3]?.value || 'Panoramic'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  id={`inspect-${suite.id}-btn`}
                  onClick={() => onSelectSuite(suite)}
                  className="text-xs uppercase tracking-[0.2em] text-[#ded8cf] hover:text-[#c4a47c] transition-colors flex items-center gap-1.5 font-medium"
                >
                  Explore Details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`reserve-direct-${suite.id}-btn`}
                  onClick={() => onReserveSuite(suite.id)}
                  className="px-5 py-2 bg-white/5 hover:bg-[#c4a47c] text-[#ded8cf] hover:text-[#0b0c0e] border border-white/10 hover:border-transparent text-xs uppercase tracking-widest rounded-full transition-all"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

