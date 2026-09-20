import { Suite, DiningExperience, WellnessTreatment } from '../types';

export const SUITES_DATA: Suite[] = [
  {
    id: 'monolith-pavilion',
    name: 'The Monolith Pavilion',
    tagline: 'Floating architectural marvel suspended above the cedar forest',
    category: 'Signature Presidential Villa',
    sqm: 320,
    sqft: 3444,
    guests: 4,
    startingPrice: 3850,
    currency: 'USD',
    overview: 'Sculpted from board-formed concrete and warm travertine, this standalone cantilevered pavilion hovers weightlessly over the cliffside. Floor-to-ceiling retractable glass borders an infinity cantilever pool warmed by geothermal warmth year-round.',
    features: [
      'Cantilevered 14-meter heated saltwater infinity pool',
      'Sunken living salon with monolithic open hearth fireplace',
      'Master bathroom with hand-carved single-block basalt tub',
      'Private cedar sauna and open-air rain terrace',
      'Private wine vault stocked with Grand Crus',
      'Dedicated bespoke majordomo & private chef service'
    ],
    amenities: [
      'Bespoke Frette linen & goose down bedding',
      'Bang & Olufsen spatial acoustics throughout',
      'Custom organic botanical bath amenities formulated in Kyoto',
      'Private subterranean garage with EV supercharger',
      'Complimentary helicopter airport transfer (roundtrip)',
      'Unrestricted priority reservations at all estate venues'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalSpecs: {
      cantileverSpan: '18.4m Structural Overhang',
      thermalPoolTemp: '38.5°C Geothermal',
      acousticSilenceRating: '18 dB (Whisper Silent)',
      elevationLevel: '482m Above Sea Level',
      structuralMaterial: 'Volcanic Basalt & Japanese Cedar'
    },
    highlightSpecs: [
      { label: 'Total Space', value: '320 m² / 3,444 sq ft' },
      { label: 'Ceiling Height', value: '4.2 meters' },
      { label: 'Bed Configuration', value: '1 King + 1 Queen Suite' },
      { label: 'View', value: '360° Valley & Forest' }
    ]
  },
  {
    id: 'cedar-stone-villa',
    name: 'The Cedar & Stone Villa',
    tagline: 'Intimate wabi-sabi sanctuary wrapped in ancient aromatic hinoki',
    category: 'Forest Residence',
    sqm: 240,
    sqft: 2580,
    guests: 2,
    startingPrice: 2600,
    currency: 'USD',
    overview: 'An ode to tactile tranquility. Constructed using 200-year-old salvaged Japanese hinoki cypress and volcanic slate, this private villa features an enclosed private moss rock garden and an indoor-outdoor thermal onsen pool.',
    features: [
      'Private courtyard moss garden with antique stone lanterns',
      'Continuous indoor-outdoor thermal mineral soaking tub',
      'Custom tatami meditation pavilion with matcha preparation station',
      'Fire table on private timber reflection deck',
      'Walk-in double dressing rooms and rainfall sanctuary'
    ],
    amenities: [
      'Hand-loomed silk and organic linen robes',
      'Daily curated ceremonial matcha service by estate tea master',
      'Sonance invisible architectural sound system',
      'In-suite sommelier consultation and rare sake tasting',
      'Nightly botanical aromatherapy turn-down'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalSpecs: {
      cantileverSpan: 'Ground Level Court Sanctuary',
      thermalPoolTemp: '41.0°C Natural Spring',
      acousticSilenceRating: '16 dB (Sub-ambient)',
      elevationLevel: '468m Above Sea Level',
      structuralMaterial: '200-Yr Hinoki Cypress & Basalt Slate'
    },
    highlightSpecs: [
      { label: 'Total Space', value: '240 m² / 2,580 sq ft' },
      { label: 'Ceiling Height', value: '3.8 meters' },
      { label: 'Bed Configuration', value: '1 Emperor King' },
      { label: 'View', value: 'Private Moss Forest & Ridge' }
    ]
  },
  {
    id: 'horizon-penthouse',
    name: 'The Horizon Sky Crest',
    tagline: 'The ultimate pinnacle residence crowning the summit ridge',
    category: 'Crown Penthouse',
    sqm: 450,
    sqft: 4840,
    guests: 6,
    startingPrice: 5900,
    currency: 'USD',
    overview: 'Commanding the top of the architectural sanctuary, The Horizon Sky Crest offers an uncompromising level of privacy. Features wrap-around cantilever terraces, private rooftop heated lap pool, direct helipad access, and three master suites.',
    features: [
      '360-degree glass envelope with motorized privacy louvers',
      '20-meter rooftop heated lap pool with glass bottom feature',
      'Private commercial chef kitchen for private dinner events',
      'Subterranean 500-bottle temperature-controlled wine cellar',
      'Three expansive master suites with en-suite stone baths'
    ],
    amenities: [
      'Dedicated team: Private chef, butler, and chauffeur on call',
      'Guaranteed roundtrip private helicopter transfer',
      'Customized daily wellness itinerary with private yogi',
      'Complimentary laundry, dry cleaning, and garment pressing',
      'Exclusive access to the Founder’s private art collection'
    ],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalSpecs: {
      cantileverSpan: '22.0m Ridge Overhang & Rooftop Pool',
      thermalPoolTemp: '36.5°C Ozone Saltwater',
      acousticSilenceRating: '20 dB (Summit Breeze)',
      elevationLevel: '512m Above Sea Level (Pinnacle)',
      structuralMaterial: 'Titanium Steel & Low-Iron Acoustic Glass'
    },
    highlightSpecs: [
      { label: 'Total Space', value: '450 m² / 4,840 sq ft' },
      { label: 'Ceiling Height', value: '4.6 meters' },
      { label: 'Bed Configuration', value: '3 King En-Suites' },
      { label: 'View', value: 'Horizon Crest & Ocean Ridge' }
    ]
  },
  {
    id: 'water-garden-residence',
    name: 'The Water Garden Residence',
    tagline: 'Gentle ripples and floating stone pathways on the reflecting lake',
    category: 'Lakeside Residence',
    sqm: 280,
    sqft: 3014,
    guests: 4,
    startingPrice: 3200,
    currency: 'USD',
    overview: 'Hovering directly over the estate’s black obsidian reflecting waters. Open your folding glass facades to step onto floating stone terraces where koi glide beneath illuminated stepping platforms under the midnight stars.',
    features: [
      'Direct water-level floating lounge terrace',
      'Submerged outdoor conversation firepit encircled by water',
      'Twin Japanese soaking baths overlooking private water cascade',
      'Open plan minimalist kitchen and dining bar',
      'Curated contemporary Japanese ceramic and sculpture installations'
    ],
    amenities: [
      'Custom cedar paddleboards for morning water meditation',
      'In-villa breakfast served floating on wooden lacquer trays',
      'Acoustic insulation ensuring absolute whisper-quiet serenity',
      'Full Dyson Supersonic hair care & bespoke bath linen',
      'Curated vinyl library with McIntosh turntable'
    ],
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalSpecs: {
      cantileverSpan: 'Floating Submerged Foundation',
      thermalPoolTemp: '39.0°C Mineral Cascade',
      acousticSilenceRating: '17 dB (Water Ripple Resonance)',
      elevationLevel: '474m Above Sea Level',
      structuralMaterial: 'Black Volcanic Basalt & Floating Timber'
    },
    highlightSpecs: [
      { label: 'Total Space', value: '280 m² / 3,014 sq ft' },
      { label: 'Ceiling Height', value: '3.6 meters' },
      { label: 'Bed Configuration', value: '2 King Suites' },
      { label: 'View', value: 'Reflecting Water & Bamboo Grove' }
    ]
  }
];

export const DINING_EXPERIENCES: DiningExperience[] = [
  {
    id: 'kaizen-omakase',
    name: 'ISSHIN · 一心',
    chef: 'Chef Kenjiro Takahashi (3 Michelin Stars)',
    cuisine: 'Modern Botanical Kaiseki & Sea Urchin Tasting',
    hours: 'Dinner: 18:00 & 20:30 (Seatings limited to 10 guests)',
    description: 'An intimate 10-seat counter carved from a single 800-year-old zelkova tree. Ingredients harvested the same morning from our organic mountain terraced gardens and local fishermen on the Wakasa Bay.',
    highlights: ['14-course seasonal micro-harvest menu', 'Rare artisanal sake pairings from non-commercial micro-breweries', 'Custom Bizen ware pottery crafted specifically for each dish'],
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ember-hearth',
    name: 'KAGARI · 篝火',
    chef: 'Chef Elena Rostova',
    cuisine: 'Binchotan Wood-Fired & Mountain Herbs',
    hours: 'All-Day Dining: 07:00 – 22:00',
    description: 'Centering a monolithic open hearth fired with Kishu Binchotan charcoal. Enjoy pasture-raised Wagyu aged 45 days, wild chanterelles, and rustic stone-oven sourdough overlooking the misty gorge.',
    highlights: ['A5 Miyazaki Wagyu smoked over Japanese cherrywood', 'Terrace dining beside glowing water channels', 'Cellar with over 2,400 Old World biodynamic vintages'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'tea-pavilion',
    name: 'MUEN TEA HOUSE · 無煙',
    chef: 'Tea Master Soshitsu Sen',
    cuisine: 'Ceremonial Matcha & Wasanbon Confections',
    hours: '10:00 – 17:00',
    description: 'Suspended over a quiet bamboo spring. A sacred ritual space celebrating the traditional Way of Tea (Chado) reimagined in minimalist architectural serenity.',
    highlights: ['Single-estate Uji ceremonial grade matcha', 'Handmade artisanal wagashi seasonal sweets', 'Sound of natural mountain spring water'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80'
  }
];

export const WELLNESS_TREATMENTS: WellnessTreatment[] = [
  {
    id: 'onsen-ritual',
    title: 'The Volcanic Onsen & Hinoki Bath Ritual',
    duration: '120 Minutes',
    price: '$480',
    description: 'A deep restorative immersion in natural thermal mineral waters followed by a full-body volcanic clay scrub and aromatic hinoki cypress massage.',
    tags: ['Geothermal Spring', 'Volcanic Clay', 'Aromatherapy'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'bamboo-sound',
    title: 'Deep Resonance Sound Bath & Acupuncture',
    duration: '90 Minutes',
    price: '$390',
    description: 'Acoustic meditation utilizing handcrafted Tibetan singing bowls and bamboo resonant chimes to harmonize neurological frequencies and relieve mental tension.',
    tags: ['Sound Therapy', 'Vibrational Medicine', 'Mindfulness'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cryo-thermal',
    title: 'Contrast Hydrotherapy & Forest Cold Plunge',
    duration: '75 Minutes',
    price: '$320',
    description: 'Alternating cycles between our dry cedar wood sauna (85°C) and the natural glacial waterfall plunge pool (7°C), invigorating immune resilience and vascular vitality.',
    tags: ['Contrast Therapy', 'Immune Reset', 'Glacial Spring'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80'
  }
];
