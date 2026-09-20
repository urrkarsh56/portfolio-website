import React from 'react';
import { Compass, Layers, ShieldCheck, Sun } from 'lucide-react';

export const ArchitectureStory: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Title */}
      <div className="max-w-3xl mb-20">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
          Architectural Philosophy
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f2eee9] font-light mt-2 mb-6 tracking-wide leading-tight">
          Void, Light, &amp; Uncut Stone
        </h2>
        <p className="text-sm sm:text-base text-[#9c9589] font-light leading-relaxed">
          Designed by Kengo Kuma &amp; Associates in collaboration with Studio MK27, KAIZEN was conceived not as a building, but as a deliberate absence. A sequence of floating monolithic volumes that invite the mountain mist, ancient pine trees, and changing light to become the true interior architecture.
        </p>
      </div>

      {/* 3 Columns of Craft Manifesto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4 border-l border-white/10 pl-6">
          <span className="font-serif text-3xl text-[#c4a47c]/60">01</span>
          <h3 className="font-serif text-2xl text-white">Monolithic Cantilevers</h3>
          <p className="text-xs sm:text-sm text-[#8e877c] font-light leading-relaxed">
            Post-tensioned architectural concrete anchors deeply into the quartz bedrock, allowing primary living pavilions to cantilever up to 18 meters over the precipice without visible ground supports.
          </p>
        </div>

        <div className="space-y-4 border-l border-white/10 pl-6">
          <span className="font-serif text-3xl text-[#c4a47c]/60">02</span>
          <h3 className="font-serif text-2xl text-white">Tactile Naturalism</h3>
          <p className="text-xs sm:text-sm text-[#8e877c] font-light leading-relaxed">
            Surfaces are left raw and honest. Chiseled volcanic basalt, hand-rubbed beeswax on reclaimed timber, and unlacquered bronze that acquires a deep natural patina with each passing mountain season.
          </p>
        </div>

        <div className="space-y-4 border-l border-white/10 pl-6">
          <span className="font-serif text-3xl text-[#c4a47c]/60">03</span>
          <h3 className="font-serif text-2xl text-white">Geothermal Equilibrium</h3>
          <p className="text-xs sm:text-sm text-[#8e877c] font-light leading-relaxed">
            100% powered by subterranean geothermal heat pumps and on-site solar glass arrays. Rainwater is harvested through natural volcanic gravel beds for infinity water plane circulation.
          </p>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="mt-20 p-10 sm:p-14 bg-[#0e1014] border border-white/5 rounded-xs text-center space-y-4">
        <p className="font-serif text-xl sm:text-2xl text-[#ded8cf] italic font-light max-w-2xl mx-auto leading-relaxed">
          &ldquo;Luxury in the modern age is not ornamentation. It is absolute silence, boundless space, and intimacy with the elements.&rdquo;
        </p>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a47c] block">
          Tatsuro Morioka · Chief Principal Architect
        </span>
      </div>
    </section>
  );
};
