import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Compass, Maximize2, Shield, Sparkles, Volume2, Waves } from 'lucide-react';
import { soundscape } from '../utils/soundscape';

interface HeroSanctuaryProps {
  onOpenReservation: () => void;
  onExploreSuites: () => void;
  onConfigureKeycard: () => void;
}

export const HeroSanctuary: React.FC<HeroSanctuaryProps> = ({
  onOpenReservation,
  onExploreSuites,
  onConfigureKeycard
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = soundscape.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return unsub;
  }, []);

  const handlePointerDown = () => setIsDragging(true);

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = Math.round((x / rect.width) * 100);
      setSliderPosition(percent);
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isDragging]);

  return (
    <section className="relative pt-24 md:pt-28 pb-16 px-4 sm:px-8 max-w-[1540px] mx-auto overflow-hidden">
      {/* Top Telemetry & Micro Coordinates */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2 text-[10px] font-mono tracking-widest text-[#8e877c] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#c4a47c] animate-pulse" />
          <span className="text-[#ded8cf]">KYOTO RIDGE SANCTUARY</span>
          <span>·</span>
          <span>LAT 35°01&apos;44&quot;N 135°46&apos;02&quot;E</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">ELEVATION 480M</span>
          <span>·</span>
          <span>CAPACITY: 24 RESIDENTS</span>
          <span>·</span>
          <span className="text-[#c4a47c]">18 dB ACOUSTIC VOID</span>
        </div>
      </div>

      {/* Hero Headline Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 px-2 gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#c4a47c] font-medium block mb-2">
            The Architecture of Disappearance
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#f5f1ec] font-light tracking-wide leading-none">
            KAIZEN SANCTUARY
          </h1>
        </div>

        <div className="max-w-md lg:text-right">
          <p className="text-xs sm:text-sm text-[#9c9589] font-light leading-relaxed">
            Where volcanic bedrock, quiet infinity water, and the ancient cedar canopy merge into an unyielding state of silence.
          </p>
        </div>
      </div>

      {/* AVANT-GARDE INTERACTIVE CURTAIN: DAYLIGHT SOLITUDE VS. MIDNIGHT VOID */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative w-full h-[62vh] min-h-[440px] max-h-[720px] rounded-xs overflow-hidden border border-white/10 select-none cursor-ew-resize bg-[#07080a] shadow-[0_25px_60px_rgba(0,0,0,0.85)] group"
      >
        {/* Underneath Layer: MIDNIGHT VOID (Right State) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=85"
            alt="Midnight Void Reflection Pool"
            className="w-full h-full object-cover brightness-75 contrast-125 saturate-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/40" />

          {/* Label Top Right */}
          <div className="absolute top-6 right-6 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.25em] text-[#c4a47c] rounded-xs pointer-events-none">
            Midnight Void · Starlight Stillness
          </div>
        </div>

        {/* Foreground Layer: DAYLIGHT SOLITUDE (Left State) Clipped by Slider */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="w-[100vw] max-w-[1540px] h-full relative">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85"
              alt="Daylight Solitude Cantilever"
              className="w-full h-full object-cover brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/30" />

            {/* Label Top Left */}
            <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.25em] text-[#ded8cf] rounded-xs pointer-events-none whitespace-nowrap">
              Daylight Solitude · Cantilevered Ridge
            </div>
          </div>
        </div>

        {/* The Interactive Slider Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#c4a47c] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0b0c0e] border border-[#c4a47c] shadow-[0_0_20px_rgba(196,164,124,0.5)] flex items-center justify-center pointer-events-auto cursor-ew-resize">
            <div className="flex items-center gap-1 text-[#c4a47c]">
              <span className="text-[9px] font-mono tracking-tighter">◀▶</span>
            </div>
          </div>
        </div>

        {/* Floating Instruction Badge */}
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xs flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#ded8cf] font-mono">
            Drag to split Daylight &amp; Midnight atmosphere ({sliderPosition}%)
          </span>
        </div>

        {/* Atmospheric Sound Activation Overlay Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundscape.toggle();
          }}
          className="absolute bottom-6 right-6 z-20 bg-black/80 hover:bg-[#c4a47c] hover:text-[#0b0c0e] text-[#ded8cf] backdrop-blur-md border border-white/15 px-4 py-2 rounded-xs text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 transition-all"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isPlayingAudio ? 'Soundscape Active' : 'Listen To Sanctuary'}</span>
        </button>
      </div>

      {/* Architectural Telemetry Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Acoustic Rating', value: '18 dB Silent Void', sub: 'Triple-envelope acoustic glass' },
          { label: 'Thermal Waters', value: '41.5°C Geothermal', sub: 'Zero-chlorine basalt filtration' },
          { label: 'Private Residences', value: '12 Pavilions Only', sub: 'Guaranteed total solitude' },
          { label: 'Summit Arrival', value: 'Ridge Helipad 01', sub: '14 min flight from Osaka / Kansai' }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#0e1014] border border-white/5 rounded-xs flex flex-col justify-between hover:border-white/20 transition-colors"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#797368]">{item.label}</span>
            <span className="font-serif text-lg sm:text-xl text-[#f2eee9] mt-2 mb-1">{item.value}</span>
            <span className="text-[10px] text-[#5b564e] font-light">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onExploreSuites}
            className="px-6 py-3 bg-[#c4a47c] hover:bg-[#d6b88e] text-[#0b0c0e] font-medium text-xs uppercase tracking-[0.25em] rounded-xs transition-all shadow-lg"
          >
            Explore 12 Pavilions
          </button>
          <button
            onClick={onConfigureKeycard}
            className="px-6 py-3 bg-[#13151a] hover:bg-[#1b1e25] border border-white/10 hover:border-[#c4a47c] text-[#ded8cf] text-xs uppercase tracking-[0.25em] rounded-xs transition-all"
          >
            Simulate VIP Keycard
          </button>
        </div>

        <button
          onClick={onOpenReservation}
          className="text-xs uppercase tracking-[0.25em] text-[#c4a47c] hover:text-[#e2c69f] transition-colors flex items-center gap-2"
        >
          <span>Request Bespoke Itinerary</span>
          <span className="font-mono">→</span>
        </button>
      </div>
    </section>
  );
};
