import React from 'react';
import { WELLNESS_TREATMENTS } from '../data/hotelData';
import { Sparkles, Droplets, Flame, Wind } from 'lucide-react';

interface WellnessSectionProps {
  onOpenReservation: () => void;
}

export const WellnessSection: React.FC<WellnessSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="wellness" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16 pb-8 border-b border-white/10">
        <div className="lg:col-span-7">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
            Subterranean Geothermal Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f2eee9] font-light mt-2 tracking-wide">
            Thermal Onsen &amp; Stillness
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs sm:text-sm text-[#9c9589] font-light leading-relaxed">
            Buried deep beneath the moss forest, natural geothermal mineral springs feed basalt baths filtered by volcanic porous rock. Absolute silence, punctuated only by falling droplets and mountain breeze.
          </p>
        </div>
      </div>

      {/* Feature Pillar Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 bg-[#0e1014] border border-white/5 rounded-xs space-y-3">
          <Droplets className="w-5 h-5 text-[#c4a47c]" />
          <h3 className="font-serif text-xl text-white">Pure Volcanic Minerals</h3>
          <p className="text-xs text-[#8e877c] font-light leading-relaxed">
            Rich in silica, metasilicic acid, and magnesium sulphate. Waters flow untouched at 41°C directly from natural aquifers 1,200m underground.
          </p>
        </div>
        <div className="p-8 bg-[#0e1014] border border-white/5 rounded-xs space-y-3">
          <Flame className="w-5 h-5 text-[#c4a47c]" />
          <h3 className="font-serif text-xl text-white">Hinoki Cypress Architecture</h3>
          <p className="text-xs text-[#8e877c] font-light leading-relaxed">
            All cedar baths are carved from naturally fallen 200-year-old Kiso Hinoki, emitting calming phytoncides that induce immediate parasympathetic restoration.
          </p>
        </div>
        <div className="p-8 bg-[#0e1014] border border-white/5 rounded-xs space-y-3">
          <Wind className="w-5 h-5 text-[#c4a47c]" />
          <h3 className="font-serif text-xl text-white">Contrast Cold Plunges</h3>
          <p className="text-xs text-[#8e877c] font-light leading-relaxed">
            Glacial run-off waterfalls fed by mountain snowpack at 7°C, restoring vascular elasticity and releasing invigorating dopamine.
          </p>
        </div>
      </div>

      {/* Treatment Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {WELLNESS_TREATMENTS.map((treatment) => (
          <div
            key={treatment.id}
            className="group bg-[#0e1015] border border-white/10 rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#c4a47c]/50"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#0b0c0e]/80 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#c4a47c] border border-white/10 rounded-xs">
                  {treatment.duration}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-serif text-lg text-white group-hover:text-[#c4a47c] transition-colors">
                    {treatment.title}
                  </h4>
                  <span className="font-serif text-sm text-[#c4a47c] ml-2 flex-shrink-0">
                    {treatment.price}
                  </span>
                </div>
                <p className="text-xs text-[#8e877c] font-light leading-relaxed">
                  {treatment.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex flex-wrap gap-1.5">
              {treatment.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] uppercase tracking-widest text-[#797368] px-2.5 py-1 bg-white/5 border border-white/5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
