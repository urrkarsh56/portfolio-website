import React from 'react';

export const KineticMarquee: React.FC = () => {
  const statements = [
    'TWELVE MONOLITHIC PAVILIONS',
    'ZERO MOTOR VEHICLES',
    '480 METERS SKYWARD',
    'NATURAL VOLCANIC ONSEN SPRINGS',
    '18 DECIBEL ACOUSTIC VOID',
    '3-MICHELIN BOTANICAL KAISEKI',
    'PRIVATE RIDGE HELIPAD',
    'AN ARCHITECTURE OF DISAPPEARANCE'
  ];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-[#07080a] py-4 select-none relative">
      <div className="flex w-max animate-marquee gap-8 items-center text-xs tracking-[0.35em] text-[#8e877c] uppercase font-mono">
        {[...statements, ...statements].map((text, idx) => (
          <React.Fragment key={idx}>
            <span className="hover:text-[#c4a47c] transition-colors cursor-default whitespace-nowrap">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]/60 flex-shrink-0" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
