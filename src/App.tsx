import React, { useState } from 'react';
import { Suite } from './types';
import { Header } from './components/Header';
import { HeroSanctuary } from './components/HeroSanctuary';
import { KineticMarquee } from './components/KineticMarquee';
import { SuitesSection } from './components/SuitesSection';
import { SanctuaryKeycard } from './components/SanctuaryKeycard';
import { WellnessSection } from './components/WellnessSection';
import { DiningSection } from './components/DiningSection';
import { ArchitectureStory } from './components/ArchitectureStory';
import { SensoryConsole } from './components/SensoryConsole';
import { SpotlightCursor } from './components/SpotlightCursor';
import { SuiteModal } from './components/SuiteModal';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [inspectedSuite, setInspectedSuite] = useState<Suite | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preselectedSuiteId, setPreselectedSuiteId] = useState<string | undefined>(undefined);
  const [prefilledGuestName, setPrefilledGuestName] = useState<string | undefined>(undefined);

  const handleOpenReservation = (suiteId?: string, guestName?: string) => {
    setPreselectedSuiteId(suiteId);
    setPrefilledGuestName(guestName);
    setIsReservationOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#ded8cf] selection:bg-[#c4a47c] selection:text-[#07080a] relative">
      {/* Avant-Garde Atmospheric Cursor Spotlight */}
      <SpotlightCursor />

      {/* Floating Procedural Web-Audio Console */}
      <SensoryConsole />

      {/* Minimal Luxury Navigation Header */}
      <Header onOpenReservation={() => handleOpenReservation()} />

      {/* HERO SANCTUARY: Interactive Split Daylight Solitude vs Midnight Void */}
      <HeroSanctuary
        onOpenReservation={() => handleOpenReservation()}
        onExploreSuites={() => handleScrollToSection('suites')}
        onConfigureKeycard={() => handleScrollToSection('keycard-pass')}
      />

      {/* KINETIC TYPOGRAPHY MARQUEE */}
      <KineticMarquee />

      {/* ARCHITECTURAL ESSENCE STATEMENT */}
      <section className="py-24 px-6 sm:px-8 max-w-5xl mx-auto text-center space-y-6 select-none">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c4a47c] font-medium">
            The Philosophy of Pure Absence
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#ede7de] font-light leading-relaxed tracking-wide">
          &ldquo;Where the boundary between volcanic rock, quiet water, and sky dissolves completely.&rdquo;
        </h2>
        <p className="text-xs sm:text-sm text-[#8e877c] font-light max-w-2xl mx-auto leading-relaxed">
          Set within sixty acres of protected ancient cedar forests, KAIZEN accommodates a maximum of twenty-four guests at any one time across twelve standalone pavilions, preserving an atmosphere of profound, uninterrupted contemplation.
        </p>
      </section>

      {/* ARCHITECTURAL SUITES & RESIDENCES WITH CAD BLUEPRINT SWITCHER */}
      <SuitesSection
        onSelectSuite={(suite) => setInspectedSuite(suite)}
        onReserveSuite={(id) => handleOpenReservation(id)}
      />

      {/* TACTILE 3D PERSPECTIVE VIP KEYCARD PASS WORKBENCH */}
      <SanctuaryKeycard
        onSelectForBooking={(suiteId, guestName) => handleOpenReservation(suiteId, guestName)}
      />

      {/* SUBTERRANEAN THERMAL ONSEN & WELLNESS */}
      <WellnessSection onOpenReservation={() => handleOpenReservation()} />

      {/* GASTRONOMY & BOTANICAL KAISEKI */}
      <DiningSection />

      {/* ARCHITECTURAL CRAFT MANIFESTO */}
      <ArchitectureStory />

      {/* FOOTER */}
      <Footer onOpenReservation={() => handleOpenReservation()} />

      {/* SUITE DOSSIER INSPECTION MODAL */}
      <SuiteModal
        suite={inspectedSuite}
        onClose={() => setInspectedSuite(null)}
        onReserve={(id) => handleOpenReservation(id)}
      />

      {/* CONCIERGE RESERVATION MODAL */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialSuiteId={preselectedSuiteId}
        initialGuestName={prefilledGuestName}
      />
    </div>
  );
}

