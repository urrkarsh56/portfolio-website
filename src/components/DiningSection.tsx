import React, { useState } from 'react';
import { DINING_EXPERIENCES } from '../data/hotelData';
import { Clock, Utensils, Award, Flame } from 'lucide-react';

export const DiningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = DINING_EXPERIENCES[activeTab];

  return (
    <section id="gastronomy" className="py-24 bg-[#08090c] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
              Culinary Art &amp; Wild Harvest
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f2eee9] font-light mt-2 tracking-wide">
              Ephemeral Gastronomy
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs sm:text-sm text-[#9c9589] font-light leading-relaxed">
            Centered on hyper-seasonal botanical micro-seasons. Wild herbs foraged from surrounding mountain valleys paired with Binchotan charcoal cooking and rare vintage cellars.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          {DINING_EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.id}
              id={`dining-tab-${exp.id}`}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2 text-xs uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-[#c4a47c] text-[#0b0c0e] font-semibold'
                  : 'text-[#8e877c] hover:text-[#ded8cf] border border-white/10 hover:bg-white/5'
              }`}
            >
              {exp.name}
            </button>
          ))}
        </div>

        {/* Featured Dining Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0e1014] border border-white/10 p-6 sm:p-10 rounded-xs">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative h-80 sm:h-[420px] w-full overflow-hidden rounded-xs bg-black">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-[#c4a47c]">
              {current.cuisine}
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a47c] font-medium block mb-1">
                {current.chef}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white tracking-wide">
                {current.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#9c9589] mt-2">
                <Clock className="w-3.5 h-3.5 text-[#c4a47c]" />
                <span>{current.hours}</span>
              </div>
            </div>

            <p className="text-sm text-[#b8b1a5] font-light leading-relaxed">
              {current.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              <h4 className="text-[11px] uppercase tracking-widest text-[#ded8cf] font-medium">
                The Experience Highlights:
              </h4>
              <ul className="space-y-2">
                {current.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#8e877c]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c] mt-1.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[#797368]">
                In-suite dining and private pavilion degustation available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
