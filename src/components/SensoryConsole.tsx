import React, { useState, useEffect } from 'react';
import { soundscape } from '../utils/soundscape';
import { SoundscapeMood } from '../types';
import { Bell, CloudRain, Droplets, Volume2, VolumeX, Wind, Sparkles, X, ChevronUp } from 'lucide-react';

export const SensoryConsole: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mood, setMood] = useState<SoundscapeMood>('wind');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const unsub = soundscape.subscribe((playing, currentMood) => {
      setIsPlaying(playing);
      setMood(currentMood);
    });
    return unsub;
  }, []);

  const moods: { id: SoundscapeMood; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'wind',
      label: 'Alpine Mist Wind',
      icon: <Wind className="w-3.5 h-3.5" />,
      desc: 'Sub-audible mountain breath'
    },
    {
      id: 'spring',
      label: 'Geothermal Mineral Spring',
      icon: <Droplets className="w-3.5 h-3.5" />,
      desc: 'Bubbling volcanic spring water'
    },
    {
      id: 'bell',
      label: 'Singing Bowl Resonator',
      icon: <Bell className="w-3.5 h-3.5" />,
      desc: 'Harmonic 440Hz brass overtone'
    },
    {
      id: 'rain',
      label: 'Cedar Wood Rain',
      icon: <CloudRain className="w-3.5 h-3.5" />,
      desc: 'Raindrops on aromatic Hinoki'
    }
  ];

  return (
    <aside
      aria-label="Acoustic Atmosphere Console"
      className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end"
    >
      {/* EXPANDED SOUND CONTROLLER PANEL */}
      {isExpanded && (
        <div className="mb-3 w-80 bg-[#0c0e12]/95 backdrop-blur-xl border border-white/10 p-5 rounded-xs shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
                Sensory Soundscape
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#8e877c] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#8e877c] font-light leading-relaxed">
            Procedural alpine audio synthesized live in your browser. No recorded loops.
          </p>

          {/* Sound Mood Options */}
          <div className="space-y-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  soundscape.setMood(m.id);
                }}
                className={`w-full p-2.5 rounded-xs border text-left flex items-center justify-between transition-all ${
                  isPlaying && mood === m.id
                    ? 'border-[#c4a47c] bg-[#c4a47c]/10 text-white'
                    : 'border-white/5 bg-[#12151b] text-[#8e877c] hover:border-white/20 hover:text-[#ded8cf]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isPlaying && mood === m.id ? 'text-[#c4a47c]' : 'text-[#797368]'}>
                    {m.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs tracking-wide">{m.label}</span>
                    <span className="text-[9px] text-[#5c574e]">{m.desc}</span>
                  </div>
                </div>

                {isPlaying && mood === m.id && (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-[#c4a47c] animate-pulse" />
                    <span className="w-0.5 h-2 bg-[#c4a47c] animate-pulse delay-75" />
                    <span className="w-0.5 h-3.5 bg-[#c4a47c] animate-pulse delay-150" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Bell Strike Trigger */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => soundscape.playBowlChime(261.63 + Math.random() * 200)}
              className="flex-1 py-2 px-3 bg-[#171a22] hover:bg-[#20242f] border border-white/10 text-[10px] uppercase tracking-widest text-[#ded8cf] rounded-xs flex items-center justify-center gap-2 transition-all"
            >
              <Bell className="w-3 h-3 text-[#c4a47c]" />
              Strike Singing Bowl
            </button>

            <button
              onClick={() => soundscape.toggle()}
              className={`p-2 rounded-xs border transition-all ${
                isPlaying
                  ? 'border-[#c4a47c] text-[#c4a47c] bg-[#c4a47c]/10'
                  : 'border-white/10 text-[#8e877c] hover:text-white'
              }`}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* COMPACT FLOATING PILL BUTTON */}
      <button
        id="sensory-console-pill"
        onClick={() => setIsExpanded(!isExpanded)}
        className="group bg-[#0b0c0e]/90 hover:bg-[#13161c] backdrop-blur-md border border-white/15 hover:border-[#c4a47c] px-4 py-2.5 rounded-full flex items-center gap-3 shadow-xl transition-all"
      >
        <div className="flex items-center gap-1.5">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-[#c4a47c] animate-pulse" />
              <span className="w-0.5 h-2 bg-[#c4a47c] animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-[#c4a47c] animate-pulse delay-150" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#8e877c]" />
          )}
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] text-[#ded8cf] font-mono group-hover:text-[#c4a47c] transition-colors">
          {isPlaying ? `Acoustic: ${mood.toUpperCase()}` : 'Soundscape: Muted'}
        </span>

        <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]/50" />
      </button>
    </aside>
  );
};
