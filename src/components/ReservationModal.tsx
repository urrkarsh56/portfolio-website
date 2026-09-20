import React, { useState, useEffect } from 'react';
import { SUITES_DATA } from '../data/hotelData';
import { X, Check, Calendar, Users, Plane, Car, Sparkles, ShieldCheck } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSuiteId?: string;
  initialGuestName?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialSuiteId,
  initialGuestName
}) => {
  const [selectedSuiteId, setSelectedSuiteId] = useState(initialSuiteId || SUITES_DATA[0].id);
  const [checkIn, setCheckIn] = useState('2026-10-12');
  const [checkOut, setCheckOut] = useState('2026-10-16');
  const [guests, setGuests] = useState(2);
  const [arrivalMethod, setArrivalMethod] = useState<'helicopter' | 'chauffeur' | 'independent'>('helicopter');
  const [specialRequests, setSpecialRequests] = useState('');
  const [guestName, setGuestName] = useState(initialGuestName || '');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  useEffect(() => {
    if (initialSuiteId) {
      setSelectedSuiteId(initialSuiteId);
    }
    if (initialGuestName) {
      setGuestName(initialGuestName);
    }
  }, [initialSuiteId, initialGuestName]);

  if (!isOpen) return null;

  const currentSuite = SUITES_DATA.find((s) => s.id === selectedSuiteId) || SUITES_DATA[0];

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(1, d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = currentSuite.startingPrice * nights;
  const transportCost = arrivalMethod === 'helicopter' ? 1800 : arrivalMethod === 'chauffeur' ? 450 : 0;
  const totalCost = basePrice + transportCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `KZ-${Math.floor(1000 + Math.random() * 9000)}-${currentSuite.id.substring(0, 3).toUpperCase()}`;
    setReservationCode(code);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07080a]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0e1014] border border-white/10 rounded-xs overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0c0e12]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4a47c] font-medium">
              Sanctuary Concierge
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
              {isSubmitted ? 'Reservation Confirmed' : 'Reserve Your Stay'}
            </h2>
          </div>
          <button
            id="close-reservation-modal-btn"
            onClick={onClose}
            className="p-2 text-[#9c9589] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Confirmation */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {isSubmitted ? (
            /* Confirmation Voucher View */
            <div className="space-y-8 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#c4a47c]/20 border border-[#c4a47c] flex items-center justify-center mx-auto text-[#c4a47c]">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#c4a47c] block mb-2 font-medium">
                  Booking Confirmation Voucher
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white">
                  Welcome to KAIZEN, {guestName || 'Distinguished Guest'}
                </h3>
                <p className="text-xs sm:text-sm text-[#9c9589] max-w-md mx-auto mt-2 font-light">
                  Your private concierge has received your request. A personal itinerary briefing has been dispatched to {guestEmail || 'your email'}.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-[#14171d] border border-white/10 p-6 rounded-xs text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#797368]">REFERENCE CODE</span>
                  <span className="text-[#c4a47c] font-bold">{reservationCode}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#797368]">SANCTUARY SUITE</span>
                  <span className="text-white">{currentSuite.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#797368]">DATES</span>
                  <span className="text-white">{checkIn} → {checkOut} ({nights} Nights)</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#797368]">GUESTS</span>
                  <span className="text-white">{guests} Adults</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#797368]">ARRIVAL TRANSIT</span>
                  <span className="text-white capitalize">{arrivalMethod}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-serif">
                  <span className="text-[#ded8cf]">TOTAL ESTIMATE</span>
                  <span className="text-[#c4a47c] font-bold">${totalCost.toLocaleString()} USD</span>
                </div>
              </div>

              <button
                id="done-reservation-btn"
                onClick={onClose}
                className="px-8 py-3 bg-[#c4a47c] text-[#0b0c0e] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#d6b78e] transition-all"
              >
                Return to Sanctuary
              </button>
            </div>
          ) : (
            /* Reservation Input Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Suite Selection Dropdown / Cards */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-[#ded8cf] font-medium block">
                  Select Architectural Residence
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUITES_DATA.map((suite) => (
                    <button
                      type="button"
                      key={suite.id}
                      onClick={() => setSelectedSuiteId(suite.id)}
                      className={`p-4 rounded-xs border text-left flex flex-col justify-between transition-all ${
                        selectedSuiteId === suite.id
                          ? 'border-[#c4a47c] bg-[#1a1c22] shadow-md'
                          : 'border-white/10 bg-[#121419] hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg text-white">{suite.name}</span>
                        <span className="text-xs text-[#c4a47c] font-mono">${suite.startingPrice}/nt</span>
                      </div>
                      <span className="text-[11px] text-[#797368] mt-1">{suite.category} · {suite.sqm} m²</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests (Full Villa)</option>
                  </select>
                </div>
              </div>

              {/* Arrival Transit Method */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-[#ded8cf] font-medium block">
                  Curated Arrival Transfer
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'helicopter',
                      name: 'Private Helicopter',
                      desc: 'Direct summit helipad arrival from KIX/HND',
                      cost: '+$1,800',
                      icon: Plane
                    },
                    {
                      id: 'chauffeur',
                      name: 'Maybach Chauffeur',
                      desc: 'Private luxury transfer from Kyoto Station',
                      cost: '+$450',
                      icon: Car
                    },
                    {
                      id: 'independent',
                      name: 'Self Arrival',
                      desc: 'Private estate garage with EV Supercharger',
                      cost: 'Complimentary',
                      icon: Sparkles
                    }
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setArrivalMethod(method.id as typeof arrivalMethod)}
                        className={`p-4 rounded-xs border text-left space-y-1.5 transition-all ${
                          arrivalMethod === method.id
                            ? 'border-[#c4a47c] bg-[#1a1c22]'
                            : 'border-white/10 bg-[#121419] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider text-white font-medium flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5 text-[#c4a47c]" />
                            {method.name}
                          </span>
                          <span className="text-[10px] text-[#c4a47c] font-mono">{method.cost}</span>
                        </div>
                        <p className="text-[11px] text-[#797368] leading-tight">{method.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                    Primary Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Harrington"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@sanctuary.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                    Telephone (WhatsApp / Signal)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                  />
                </div>
              </div>

              {/* Special Concierge Requests */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#9c9589] block mb-2">
                  Bespoke Requests &amp; Dietary Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Dietary allergies, preferred vintage cellar selections, private tea master session, or helicopter tail number..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#121419] border border-white/10 rounded-xs p-3 text-xs text-white focus:border-[#c4a47c] outline-none"
                />
              </div>

              {/* Price Calculation Summary & Submit */}
              <div className="p-5 bg-[#14171d] border border-white/10 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#797368] block">Estimated Total ({nights} Nights)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl text-white font-light">
                      ${totalCost.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#9c9589]">USD · Taxes, Butler &amp; Dining Inclusions</span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-reservation-btn"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#c4a47c] hover:bg-[#d6b78e] text-[#0b0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all shadow-lg hover:shadow-[0_0_25px_rgba(196,164,124,0.4)]"
                >
                  Confirm Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
