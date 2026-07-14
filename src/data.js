import {
  Home, Building2, Landmark, Trees, KeyRound, TrendingUp, ShieldCheck,
  Handshake, Waves, Car, Dumbbell, Lock, ArrowUpDown, Sun, Flame
} from "lucide-react";

/*
  NOTE ON IMAGES
  --------------
  Each property/agent has an `img` URL (royalty-free Unsplash photos).
  If a photo fails to load, the UI falls back to a designed gradient
  placeholder, so nothing ever looks broken. Swap the URLs with your
  own CDN paths when you plug in real listings.
*/

export const IMG = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const PROPERTIES = [
  { id: 1, title: "Skyline Penthouse", location: "Lozenets, Sofia", type: "Penthouse", status: "sale", price: 890000, beds: 3, baths: 2, area: 185, amenities: ["Terrace", "Elevator", "Garage", "Security"], img: IMG("1512917774080-9991f1c4c750"), gradient: "from-slate-700 via-slate-800 to-slate-900", icon: Building2, featured: true, x: 58, y: 62, desc: "A commanding top-floor residence with a wraparound terrace and uninterrupted views of Vitosha mountain. Floor-to-ceiling glazing, smart-home controls and a private elevator lobby." },
  { id: 2, title: "Boyana Forest Villa", location: "Boyana, Sofia", type: "Villa", status: "sale", price: 1250000, beds: 5, baths: 4, area: 420, amenities: ["Pool", "Garden", "Garage", "Fireplace", "Security"], img: IMG("1600596542815-ffad4c1539a9"), gradient: "from-emerald-800 via-slate-800 to-slate-900", icon: Trees, featured: true, x: 30, y: 78, desc: "Contemporary villa on a landscaped 1,100 sq.m plot at the foot of the mountain. Heated pool, double-height living room and a self-contained guest wing." },
  { id: 3, title: "Doctor's Garden Residence", location: "Oborishte, Sofia", type: "Apartment", status: "rent", price: 1400, beds: 2, baths: 1, area: 95, amenities: ["Elevator", "Terrace"], img: IMG("1600585154340-be6161a56a0c"), gradient: "from-amber-700 via-slate-800 to-slate-900", icon: Landmark, featured: true, x: 62, y: 38, desc: "Elegant two-bedroom in a restored 1930s building beside Doctor's Garden. High ceilings, herringbone parquet and a sunny east-facing balcony." },
  { id: 4, title: "Dragalevtsi Family House", location: "Dragalevtsi, Sofia", type: "House", status: "sale", price: 760000, beds: 4, baths: 3, area: 310, amenities: ["Garden", "Garage", "Fireplace"], img: IMG("1568605114967-8130f3a36994"), gradient: "from-slate-600 via-slate-700 to-slate-900", icon: Home, featured: true, x: 44, y: 86, desc: "Warm family home in the quiet upper part of Dragalevtsi. Mature garden, stone fireplace and a triple garage with workshop space." },
  { id: 5, title: "Vazov Studio Loft", location: "Ivan Vazov, Sofia", type: "Studio", status: "rent", price: 650, beds: 1, baths: 1, area: 48, amenities: ["Elevator"], img: IMG("1522708323590-d24dbb6b0267"), gradient: "from-teal-800 via-slate-800 to-slate-900", icon: KeyRound, featured: false, x: 50, y: 52, desc: "Bright, efficient studio steps from South Park. Custom joinery maximises every square metre — ideal for a young professional." },
  { id: 6, title: "Manastirski Green Apartment", location: "Manastirski Livadi, Sofia", type: "Apartment", status: "sale", price: 245000, beds: 3, baths: 2, area: 118, amenities: ["Garage", "Elevator", "Gym"], img: IMG("1600607687939-ce8a6c25118c"), gradient: "from-emerald-700 via-teal-900 to-slate-900", icon: Building2, featured: true, x: 36, y: 66, desc: "Three-bedroom apartment in a gated complex with residents' gym and landscaped courtyards. Act I ready with premium finishing package." },
  { id: 7, title: "Simeonovo Townhouse", location: "Simeonovo, Sofia", type: "Townhouse", status: "sale", price: 540000, beds: 4, baths: 3, area: 265, amenities: ["Garden", "Garage", "Terrace", "Security"], img: IMG("1600566753190-17f0baa2a6c3"), gradient: "from-stone-700 via-slate-800 to-slate-900", icon: Home, featured: true, x: 54, y: 80, desc: "Corner townhouse in a boutique gated community near the Simeonovo lift. Private garden, roof terrace and mountain views from every floor." },
  { id: 8, title: "Vitosha Boulevard Penthouse", location: "City Centre, Sofia", type: "Penthouse", status: "rent", price: 3200, beds: 3, baths: 3, area: 210, amenities: ["Terrace", "Elevator", "Security", "Gym"], img: IMG("1600607687920-4e2a09cf159d"), gradient: "from-indigo-900 via-slate-800 to-slate-900", icon: Building2, featured: false, x: 52, y: 44, desc: "Serviced penthouse above the city's most famous boulevard. Concierge, valet parking and a 60 sq.m entertaining terrace." },
  { id: 9, title: "Iztok Park Apartment", location: "Iztok, Sofia", type: "Apartment", status: "sale", price: 385000, beds: 2, baths: 2, area: 104, amenities: ["Elevator", "Garage", "Terrace"], img: IMG("1600210492486-724fe5c67fb0"), gradient: "from-cyan-900 via-slate-800 to-slate-900", icon: Building2, featured: false, x: 70, y: 42, desc: "Quiet two-bedroom overlooking Borisova Gradina's treetops. Fully renovated with underfloor heating and a designer kitchen." },
  { id: 10, title: "Bistritsa Mountain Villa", location: "Bistritsa, Sofia", type: "Villa", status: "rent", price: 2800, beds: 5, baths: 4, area: 380, amenities: ["Pool", "Garden", "Garage", "Fireplace", "Gym"], img: IMG("1613490493576-7fde63acd811"), gradient: "from-emerald-900 via-slate-900 to-slate-950", icon: Trees, featured: false, x: 66, y: 90, desc: "Long-let mountain retreat with indoor pool, sauna and panoramic terraces — twenty minutes from the business district." },
];

export const AGENTS = [
  { id: 1, name: "Elena Petrova", role: "Senior Partner · Luxury Homes", img: "https://randomuser.me/api/portraits/women/44.jpg", listings: 34, rating: 4.9, deals: 210, phone: "+359 88 511 2340", gradient: "from-emerald-700 to-slate-900" },
  { id: 2, name: "Martin Dimitrov", role: "Head of Residential Sales", img: "https://randomuser.me/api/portraits/men/32.jpg", listings: 27, rating: 4.8, deals: 168, phone: "+359 88 733 9021", gradient: "from-amber-700 to-slate-900" },
  { id: 3, name: "Sofia Ivanova", role: "Rentals & Relocation Lead", img: "https://randomuser.me/api/portraits/women/68.jpg", listings: 41, rating: 5.0, deals: 305, phone: "+359 87 640 5518", gradient: "from-slate-600 to-slate-900" },
  { id: 4, name: "Alexander Georgiev", role: "Investment Advisory", img: "https://randomuser.me/api/portraits/men/76.jpg", listings: 19, rating: 4.7, deals: 122, phone: "+359 89 902 6674", gradient: "from-teal-700 to-slate-900" },
];

export const INSIGHTS = [
  { id: 1, tag: "Market Report", title: "Sofia Q2 2026: prices near the mountain keep climbing", read: "6 min read", gradient: "from-emerald-800 to-slate-900", icon: TrendingUp },
  { id: 2, tag: "Buyer Guide", title: "Act 14, 15, 16 — what each construction stage really means", read: "8 min read", gradient: "from-amber-800 to-slate-900", icon: ShieldCheck },
  { id: 3, tag: "Selling", title: "Staging that adds five figures: lessons from 40 sales", read: "5 min read", gradient: "from-slate-700 to-slate-900", icon: Handshake },
];

export const PROPERTY_TYPES = ["Apartment", "House", "Villa", "Penthouse", "Townhouse", "Studio"];

export const AMENITIES = [
  { name: "Pool", icon: Waves }, { name: "Garage", icon: Car }, { name: "Garden", icon: Trees },
  { name: "Gym", icon: Dumbbell }, { name: "Security", icon: Lock }, { name: "Elevator", icon: ArrowUpDown },
  { name: "Terrace", icon: Sun }, { name: "Fireplace", icon: Flame },
];

export const fmtPrice = (p, status) =>
  status === "rent" ? `€${p.toLocaleString()}/mo` : `€${p.toLocaleString()}`;
