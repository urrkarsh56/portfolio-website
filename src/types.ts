export type SoundscapeMood = 'wind' | 'spring' | 'bell' | 'rain';

export type KeycardMaterial = 'obsidian' | 'titanium' | 'bronze' | 'basalt';

export interface Suite {
  id: string;
  name: string;
  tagline: string;
  category: string;
  sqm: number;
  sqft: number;
  guests: number;
  startingPrice: number;
  currency: string;
  overview: string;
  features: string[];
  amenities: string[];
  images: string[];
  blueprintUrl?: string;
  architecturalSpecs: {
    cantileverSpan?: string;
    thermalPoolTemp?: string;
    acousticSilenceRating?: string;
    elevationLevel?: string;
    structuralMaterial?: string;
  };
  highlightSpecs: { label: string; value: string }[];
}

export interface DiningExperience {
  id: string;
  name: string;
  chef: string;
  cuisine: string;
  hours: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface WellnessTreatment {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  tags: string[];
  image: string;
}

export interface ReservationDetails {
  suiteId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  arrivalMethod: 'helicopter' | 'chauffeur' | 'independent';
  specialRequests: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}
