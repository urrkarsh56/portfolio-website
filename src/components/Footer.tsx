import React, { useState } from 'react';
import { Compass, Award, ArrowUp, Check } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080a] border-t border-white/5 pt-20 pb-12 text-[#8e877c]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Accolades Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-white/5 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#c4a47c] flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white">Prix Versailles 2025</p>
              <p className="text-[11px] text-[#797368]">World Winner · Sustainable Architecture</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#c4a47c] flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white">Michelin Guide 3-Key</p>
              <p className="text-[11px] text-[#797368]">Highest Distinction for World Luxury</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#c4a47c] flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white">Condé Nast Gold List</p>
              <p className="text-[11px] text-[#797368]">Top 10 Worldwide Sanctuaries</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-3xl tracking-[0.25em] text-white block">
              KAIZEN
            </span>
            <p className="text-xs text-[#9c9589] font-light leading-relaxed max-w-sm">
              An architectural retreat of void, light, and volcanic stone perched in the quiet mountain valleys of Kyoto. Twelve private pavilions engineered for profound rest.
            </p>
            <div className="pt-2">
              <span className="font-mono text-[10px] tracking-widest text-[#c4a47c] uppercase block">
                35°01&apos;44.2&quot;N 135°46&apos;19.1&quot;E
              </span>
              <span className="text-[11px] text-[#797368] block mt-0.5">
                Elevation 480m · Kita-ku, Kyoto Prefecture, Japan
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-medium">The Estate</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#sanctuary-3d" className="hover:text-white transition-colors">3D Sanctuary</a></li>
              <li><a href="#suites" className="hover:text-white transition-colors">Villas &amp; Suites</a></li>
              <li><a href="#virtual-tour" className="hover:text-white transition-colors">Spatial Tour</a></li>
              <li><a href="#wellness" className="hover:text-white transition-colors">Thermal Springs</a></li>
              <li><a href="#gastronomy" className="hover:text-white transition-colors">Kaiseki Isshin</a></li>
            </ul>
          </div>

          {/* Private Concierge Desk */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-medium">Private Concierge</h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="text-white">Direct Line: +81 75 882 9100</li>
              <li>Encrypted Signal / Telegram: @KaizenSanctuary</li>
              <li>Helipad Dispatch: heli@kaizen-sanctuary.com</li>
              <li>Guest Relations: concierge@kaizen-sanctuary.com</li>
            </ul>
          </div>

          {/* Newsletter / Seasonal Folio */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-medium">Seasonal Folio</h4>
            <p className="text-xs text-[#797368] font-light">
              Receive private invitations for seasonal villa buyouts and botanical harvest degustations.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#c4a47c] pt-2">
                <Check className="w-4 h-4" />
                <span>You are on our private dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center pt-1">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#121419] border border-white/10 px-3 py-2 text-xs text-white placeholder-[#555] rounded-l-xs outline-none focus:border-[#c4a47c] w-full"
                />
                <button
                  type="submit"
                  className="bg-[#c4a47c] text-[#0b0c0e] px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-r-xs hover:bg-[#d6b78e] transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555]">
          <p>© {new Date().getFullYear()} KAIZEN Architectural Sanctuary. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#8e877c] hover:text-white transition-colors uppercase tracking-widest text-[10px]"
          >
            <span>Return to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
