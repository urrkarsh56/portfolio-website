import React, { useState, useRef } from 'react';
import { SUITES_DATA } from '../data/hotelData';
import { KeycardMaterial, Suite } from '../types';
import { ArrowRight, Check, Compass, Copy, CreditCard, RotateCw, ShieldCheck, Sparkles, Wifi } from 'lucide-react';

interface SanctuaryKeycardProps {
  onSelectForBooking: (suiteId: string, guestName: string) => void;
}

export const SanctuaryKeycard: React.FC<SanctuaryKeycardProps> = ({ onSelectForBooking }) => {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(SUITES_DATA[0].id);
  const [material, setMaterial] = useState<KeycardMaterial>('obsidian');
  const [guestName, setGuestName] = useState<string>('GUEST OF HONOR');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // 3D Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const currentSuite = SUITES_DATA.find((s) => s.id === selectedSuiteId) || SUITES_DATA[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const materialStyles = {
    obsidian: {
      bg: 'bg-gradient-to-br from-[#121417] via-[#0b0c0e] to-[#181a1f]',
      border: 'border-white/15',
      accent: 'text-[#c4a47c]',
      sheen: 'rgba(255,255,255,0.12)',
      label: 'Obsidian Basalt'
    },
    titanium: {
      bg: 'bg-gradient-to-br from-[#23272e] via-[#1a1d22] to-[#2c313a]',
      border: 'border-white/25',
      accent: 'text-[#e5e9f0]',
      sheen: 'rgba(255,255,255,0.22)',
      label: 'Aerospace Titanium'
    },
    bronze: {
      bg: 'bg-gradient-to-br from-[#241e17] via-[#17130f] to-[#362b1e]',
      border: 'border-[#c4a47c]/30',
      accent: 'text-[#e6c79c]',
      sheen: 'rgba(214, 183, 142, 0.25)',
      label: 'Burnished Bronze'
    },
    basalt: {
      bg: 'bg-gradient-to-br from-[#18181a] via-[#101012] to-[#222226]',
      border: 'border-white/10',
      accent: 'text-[#a39c91]',
      sheen: 'rgba(255,255,255,0.08)',
      label: 'Kyoto Raw Basalt'
    }
  };

  const passCode = `KZ-${currentSuite.id.substring(0, 3).toUpperCase()}-9408`;

  const copyPassCipher = () => {
    navigator.clipboard.writeText(`KAIZEN SANCTUARY PASS | ${guestName} | ${currentSuite.name} | CIPHER: ${passCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="keycard-pass" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c4a47c] font-medium">
              Tactile Credential Simulator
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f2eee9] font-light tracking-wide">
            The Sanctuary Pass
          </h2>
        </div>
        <p className="mt-4 md:mt-0 max-w-md text-xs sm:text-sm text-[#8e877c] font-light leading-relaxed">
          Each of our 24 residents receives a bespoke, laser-engraved contactless pass granting direct crest funicular access, private wine vaults, and helicopter ridge landing clearance.
        </p>
      </div>

      {/* Interactive Card Workbench: Controls + 3D Physics Keycard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Interactive Customizer Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Guest Name Input */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-[#8e877c] block">
              Resident Engraving Name
            </label>
            <input
              type="text"
              value={guestName}
              maxLength={28}
              onChange={(e) => setGuestName(e.target.value.toUpperCase())}
              placeholder="YOUR NAME"
              className="w-full bg-[#0e1014] border border-white/10 px-4 py-3 text-xs tracking-widest text-[#ded8cf] focus:outline-none focus:border-[#c4a47c] font-mono transition-colors rounded-xs"
            />
          </div>

          {/* Pavilion Selection */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-[#8e877c] block">
              Assigned Architectural Pavilion
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SUITES_DATA.map((suite) => (
                <button
                  key={suite.id}
                  onClick={() => setSelectedSuiteId(suite.id)}
                  className={`text-left p-3 border transition-all text-xs flex items-center justify-between rounded-xs ${
                    selectedSuiteId === suite.id
                      ? 'border-[#c4a47c] bg-[#c4a47c]/10 text-white'
                      : 'border-white/5 bg-[#0e1014] text-[#8e877c] hover:border-white/20 hover:text-[#ded8cf]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium tracking-wide">{suite.name}</span>
                    <span className="text-[10px] text-[#797368]">{suite.category}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#c4a47c]">
                    ${suite.startingPrice}/n
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Material Finish Toggle */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-[#8e877c] block">
              Card Material Ingot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['obsidian', 'titanium', 'bronze', 'basalt'] as KeycardMaterial[]).map((mat) => (
                <button
                  key={mat}
                  onClick={() => setMaterial(mat)}
                  className={`py-2 px-2 text-[10px] uppercase tracking-wider border rounded-xs transition-all ${
                    material === mat
                      ? 'border-[#c4a47c] text-[#c4a47c] bg-[#c4a47c]/10'
                      : 'border-white/10 text-[#797368] hover:text-[#ded8cf] hover:border-white/20'
                  }`}
                >
                  {materialStyles[mat].label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 bg-[#14171d] hover:bg-[#1c2028] border border-white/10 text-[#ded8cf] text-xs uppercase tracking-widest rounded-xs flex items-center gap-2 transition-all"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Flip Pass ({isFlipped ? 'Front' : 'Back'})
            </button>

            <button
              onClick={copyPassCipher}
              className="px-4 py-2.5 bg-[#14171d] hover:bg-[#1c2028] border border-white/10 text-[#ded8cf] text-xs uppercase tracking-widest rounded-xs flex items-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#c4a47c]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Cipher Copied' : 'Copy Cipher'}
            </button>

            <button
              onClick={() => onSelectForBooking(currentSuite.id, guestName)}
              className="w-full sm:w-auto flex-1 px-6 py-2.5 bg-[#c4a47c] hover:bg-[#d4b58b] text-[#0b0c0e] font-semibold text-xs uppercase tracking-[0.2em] rounded-xs flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              Reserve With This Pass
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 3D Perspective Physics Keycard Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center py-8">
          <div
            className="w-full max-w-[480px] aspect-[1.586/1] relative select-none"
            style={{ perspective: '1200px' }}
          >
            {/* The 3D Interactive Card Container */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-150 ease-out"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* FRONT OF KEYCARD */}
              <div
                className={`absolute inset-0 rounded-2xl p-7 flex flex-col justify-between border ${materialStyles[material].border} ${materialStyles[material].bg} shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-500`}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {/* Dynamic Specular Sheen Layer */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay transition-opacity"
                  style={{
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${materialStyles[material].sheen} 0%, transparent 60%)`
                  }}
                />

                {/* Micro Wireframe Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Card Top Row */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md">
                      <span className="font-serif text-sm tracking-widest text-[#c4a47c]">K</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif text-sm tracking-[0.25em] text-white">
                        KAIZEN
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.3em] text-[#8e877c]">
                        KYOTO RESIDENT
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[#c4a47c]">
                    <Wifi className="w-5 h-5 rotate-90 opacity-70" />
                    <CreditCard className="w-5 h-5 opacity-40" />
                  </div>
                </div>

                {/* Smart Chip Hologram Simulation */}
                <div className="relative z-10 my-auto flex items-center justify-between">
                  <div className="w-12 h-9 rounded-md bg-gradient-to-br from-[#dfb982] via-[#f7e0b5] to-[#a38053] p-1 flex flex-col justify-between shadow-inner border border-amber-300/40 opacity-90">
                    <div className="w-full h-0.5 bg-black/30" />
                    <div className="w-full h-0.5 bg-black/30" />
                    <div className="w-full h-0.5 bg-black/30" />
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#797368] block">
                      Elevation Tier
                    </span>
                    <span className="font-mono text-xs text-white/90 tracking-widest">
                      {currentSuite.architecturalSpecs.elevationLevel || '480M SUMMIT'}
                    </span>
                  </div>
                </div>

                {/* Card Bottom Row: Resident Details & Code */}
                <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-[#8e877c] block">
                      VIP Credential Holder
                    </span>
                    <span className="font-mono text-xs sm:text-sm tracking-wider text-white font-medium block truncate max-w-[220px]">
                      {guestName || 'DISTINGUISHED GUEST'}
                    </span>
                    <span className="text-[9px] tracking-widest text-[#c4a47c] block mt-0.5">
                      {currentSuite.name.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-[#8e877c] block">
                      Encrypted Key
                    </span>
                    <span className="font-mono text-xs text-white/80 tracking-widest">
                      {passCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* BACK OF KEYCARD */}
              <div
                className={`absolute inset-0 rounded-2xl p-7 flex flex-col justify-between border ${materialStyles[material].border} ${materialStyles[material].bg} shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-500`}
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {/* Magnetic Strip */}
                <div className="-mx-7 -mt-2 h-12 bg-[#050608] border-y border-white/10 relative">
                  <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000,#000_2px,#fff_2px,#fff_4px)]" />
                </div>

                {/* Middle Security Hologram & Barcode */}
                <div className="space-y-2 py-2">
                  <div className="flex items-center justify-between text-[8px] uppercase tracking-widest text-[#797368]">
                    <span>Security Cryptographic Strip</span>
                    <span>KYOTO MONOLITH / HELIPAD 01</span>
                  </div>

                  {/* Laser Barcode Simulation */}
                  <div className="h-10 bg-white/5 border border-white/10 rounded-xs flex items-center justify-center px-4 overflow-hidden">
                    <div className="flex items-center justify-between w-full h-6 opacity-70">
                      {[...Array(42)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white/80 h-full"
                          style={{
                            width: i % 4 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1px',
                            marginRight: '2px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fine Legal & Coordinates */}
                <div className="text-[8px] text-[#797368] font-mono leading-relaxed border-t border-white/10 pt-3 flex items-end justify-between">
                  <div>
                    <span className="block">LAT 35°01&apos;44&quot;N · LON 135°46&apos;02&quot;E</span>
                    <span className="block text-[#544f47]">NON-TRANSFERABLE ARCHITECTURAL ENTRY CREDENTIAL</span>
                  </div>
                  <div className="text-right text-[#c4a47c]">
                    <span>24 RESIDENTS MAX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span className="text-[10px] text-[#797368] tracking-widest uppercase mt-4 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#c4a47c]" />
            Hover & drag to tilt in 3D perspective · Click to flip pass
          </span>
        </div>
      </div>
    </section>
  );
};
