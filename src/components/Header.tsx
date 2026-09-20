import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Calendar, Compass, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/soundscape';

interface HeaderProps {
  onOpenReservation: (suiteId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sanctuaryTime, setSanctuaryTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const unsub = soundscape.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // Update Kyoto valley time
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      setSanctuaryTime(`${now.toLocaleTimeString('en-US', options)} JST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      unsub();
    };
  }, []);

  const handleToggleSound = () => {
    soundscape.toggle();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0b0c0e]/95 backdrop-blur-md py-4 border-b border-white/10'
            : 'bg-gradient-to-b from-[#0b0c0e]/95 via-[#0b0c0e]/50 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex flex-col group text-left cursor-pointer"
            id="brand-logo"
          >
            <span className="font-serif text-2xl tracking-[0.25em] text-[#f2eee9] font-light group-hover:text-[#c4a47c] transition-colors">
              KAIZEN
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#8e877c] uppercase">
              The Architectural Sanctuary
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[12px] uppercase tracking-[0.2em] text-[#b0a99e]">
            <a href="#suites" className="hover:text-[#f2eee9] transition-colors">
              Pavilions
            </a>
            <a href="#keycard-pass" className="hover:text-[#f2eee9] transition-colors">
              Sanctuary Pass
            </a>
            <a href="#wellness" className="hover:text-[#f2eee9] transition-colors">
              Thermal Onsen
            </a>
            <a href="#gastronomy" className="hover:text-[#f2eee9] transition-colors">
              Gastronomy
            </a>
            <a href="#philosophy" className="hover:text-[#f2eee9] transition-colors">
              Manifesto
            </a>
          </nav>

          {/* Right Utilities: Time/Location, Soundscape & Reservation Button */}
          <div className="flex items-center space-x-4">
            {/* Live Kyoto Sanctuary Time & Elevation */}
            <div className="hidden xl:flex flex-col text-right pr-4 border-r border-white/10">
              <span className="text-[10px] tracking-widest text-[#ded8cf] font-mono font-light">
                {sanctuaryTime || '07:42 JST'}
              </span>
              <span className="text-[9px] tracking-widest text-[#797368] uppercase">
                35°01&apos;N · 480m ELEV
              </span>
            </div>

            {/* Ambient Soundscape Button */}
            <button
              id="soundscape-toggle-btn"
              onClick={handleToggleSound}
              className={`p-2.5 rounded-full border transition-all ${
                isPlaying
                  ? 'border-[#c4a47c] text-[#c4a47c] bg-[#c4a47c]/10'
                  : 'border-white/10 text-[#8e877c] hover:text-[#ded8cf] hover:border-white/25'
              }`}
              title={isPlaying ? 'Mute Atmosphere' : 'Listen to Mountain & Water Atmosphere'}
            >
              {isPlaying ? (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="w-1 h-2 bg-[#c4a47c] animate-pulse" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Primary Reserve CTA */}
            <button
              id="header-reserve-btn"
              onClick={() => onOpenReservation()}
              className="px-5 py-2.5 bg-[#c4a47c] text-[#0b0c0e] hover:bg-[#d6b78e] transition-all text-[11px] uppercase tracking-[0.2em] font-medium rounded-full cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(196,164,124,0.3)]"
            >
              Reserve Stay
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#ded8cf] hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b0c0e]/98 backdrop-blur-2xl flex flex-col justify-between p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl tracking-[0.25em] text-[#f2eee9]">
              KAIZEN
            </span>
            <button
              id="close-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#9c9589] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 my-auto text-center font-serif text-2xl tracking-widest text-[#ded8cf]">
            <a
              href="#suites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#c4a47c] transition-colors"
            >
              Pavilions
            </a>
            <a
              href="#keycard-pass"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#c4a47c] transition-colors"
            >
              Sanctuary Pass
            </a>
            <a
              href="#wellness"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#c4a47c] transition-colors"
            >
              Thermal Onsen
            </a>
            <a
              href="#gastronomy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#c4a47c] transition-colors"
            >
              Gastronomy
            </a>
            <a
              href="#philosophy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#c4a47c] transition-colors"
            >
              Manifesto
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <button
              id="mobile-reserve-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 bg-[#c4a47c] text-[#0b0c0e] font-medium text-xs tracking-widest uppercase rounded-full"
            >
              Reserve Stay
            </button>
            <div className="text-center text-[10px] uppercase tracking-widest text-[#797368]">
              Sanctuary: {sanctuaryTime || 'Kyoto Valleys'} · 35°01&apos;N 135°76&apos;E
            </div>
          </div>
        </div>
      )}
    </>
  );
};
