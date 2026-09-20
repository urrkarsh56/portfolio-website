import React, { useState } from 'react';
import { Suite } from '../types';
import { X, Check, ArrowRight, ShieldCheck, Waves, Sparkles, FileCode2 } from 'lucide-react';

interface SuiteModalProps {
  suite: Suite | null;
  onClose: () => void;
  onReserve: (suiteId: string) => void;
}

export const SuiteModal: React.FC<SuiteModalProps> = ({
  suite,
  onClose,
  onReserve
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!suite) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#07080a]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0e1014] border border-white/10 rounded-xs overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0e1014]/60">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
              {suite.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
              {suite.name}
            </h2>
          </div>
          <button
            id="close-suite-modal-btn"
            onClick={onClose}
            className="p-2 text-[#9c9589] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Gallery with main preview & thumbnails */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black rounded-xs">
              <img
                src={suite.images[activeImageIdx]}
                alt={suite.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-[#ded8cf] tracking-widest uppercase">
                {activeImageIdx + 1} / {suite.images.length}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {suite.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-xs border transition-all ${
                    activeImageIdx === idx ? 'border-[#c4a47c] scale-105' : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#14171d]/80 border border-white/5 rounded-xs">
            {suite.highlightSpecs.map((spec, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[#797368]">{spec.label}</span>
                <span className="font-serif text-lg text-[#ded8cf] tracking-wide mt-0.5">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Architectural Technical Dossier Callout */}
          <div className="p-5 bg-black/40 border border-white/10 rounded-xs font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#c4a47c]">
              <FileCode2 className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[10px]">Architectural Structural Metrics</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-[11px] text-[#8e877c]">
              <div>
                <span className="text-[#555] block">CANTILEVER SPAN</span>
                <span className="text-[#ded8cf]">{suite.architecturalSpecs.cantileverSpan}</span>
              </div>
              <div>
                <span className="text-[#555] block">ACOUSTIC RATING</span>
                <span className="text-[#ded8cf]">{suite.architecturalSpecs.acousticSilenceRating}</span>
              </div>
              <div>
                <span className="text-[#555] block">THERMAL WATERS</span>
                <span className="text-[#c4a47c]">{suite.architecturalSpecs.thermalPoolTemp}</span>
              </div>
              <div>
                <span className="text-[#555] block">MATERIAL PROVENANCE</span>
                <span className="text-[#ded8cf] truncate block">{suite.architecturalSpecs.structuralMaterial}</span>
              </div>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a47c] font-medium">
              Architectural Concept & Spatial Flow
            </h3>
            <p className="text-sm sm:text-base text-[#b8b1a5] font-light leading-relaxed">
              {suite.overview}
            </p>
          </div>

          {/* Features & Exclusive Inclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#ded8cf] font-medium mb-4 flex items-center gap-2">
                <Waves className="w-4 h-4 text-[#c4a47c]" />
                Architectural Features
              </h4>
              <ul className="space-y-2.5">
                {suite.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#9c9589]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c] mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#ded8cf] font-medium mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c4a47c]" />
                Sanctuary Amenities & Privileges
              </h4>
              <ul className="space-y-2.5">
                {suite.amenities.map((a, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#9c9589]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c] mt-1.5 flex-shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0b0c0e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#797368]">From</span>
            <span className="font-serif text-2xl sm:text-3xl text-white">
              ${suite.startingPrice.toLocaleString()}
            </span>
            <span className="text-xs text-[#9c9589]">/ Night · Inclusive of Private Chef & Transfers</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id={`modal-reserve-btn-${suite.id}`}
              onClick={() => {
                onClose();
                onReserve(suite.id);
              }}
              className="w-full sm:w-auto px-8 py-3 bg-[#c4a47c] hover:bg-[#d6b78e] text-[#0b0c0e] text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Reserve Villa
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
