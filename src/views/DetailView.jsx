// import { useState } from "react";
// import {
//   ChevronLeft, Heart, Eye, MapPin, BedDouble, Bath, Ruler, Check,
//   Star, Phone, MessageCircle, Send, Calculator
// } from "lucide-react";
// import { Badge, PropertyImage, AgentAvatar } from "../components/ui";
// import { AGENTS, AMENITIES, fmtPrice } from "../data";

// function MortgageCalculator({ price, isRent }) {
//   const [amount, setAmount] = useState(isRent ? price * 250 : price);
//   const [downPct, setDownPct] = useState(20);
//   const [rate, setRate] = useState(3.2);
//   const [years, setYears] = useState(25);

//   const loan = amount * (1 - downPct / 100);
//   const r = rate / 100 / 12;
//   const n = years * 12;
//   const monthly = r > 0 ? (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan / n;
//   const totalInterest = monthly * n - loan;

//   return (
//     <div className="bg-slate-900 rounded-2xl p-6 text-white">
//       <h3 className="flex items-center gap-2 font-semibold text-lg mb-5"><Calculator className="w-5 h-5 text-emerald-400" /> Mortgage Calculator</h3>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-xs font-medium text-slate-400 mb-1.5">Property price (€)</label>
//           <input type="number" value={amount} min={0} onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
//             className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
//         </div>
//         <div>
//           <div className="flex justify-between text-xs mb-1.5"><label className="font-medium text-slate-400">Down payment</label><span className="text-emerald-400 font-semibold">{downPct}% · €{Math.round(amount * downPct / 100).toLocaleString()}</span></div>
//           <input type="range" min="0" max="80" step="5" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-emerald-500" />
//         </div>
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <div className="flex justify-between text-xs mb-1.5"><label className="font-medium text-slate-400">Rate</label><span className="text-emerald-400 font-semibold">{rate.toFixed(1)}%</span></div>
//             <input type="range" min="1" max="10" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-emerald-500" />
//           </div>
//           <div>
//             <div className="flex justify-between text-xs mb-1.5"><label className="font-medium text-slate-400">Term</label><span className="text-emerald-400 font-semibold">{years} yrs</span></div>
//             <input type="range" min="5" max="35" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-emerald-500" />
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 pt-5 border-t border-slate-700 flex items-end justify-between">
//         <div>
//           <p className="text-xs text-slate-400">Estimated monthly payment</p>
//           <p className="text-3xl font-bold text-emerald-400 mt-1">€{isFinite(monthly) ? Math.round(monthly).toLocaleString() : 0}</p>
//         </div>
//         <div className="text-right text-xs text-slate-400">
//           <p>Loan: €{Math.round(loan).toLocaleString()}</p>
//           <p>Total interest: €{isFinite(totalInterest) ? Math.round(Math.max(0, totalInterest)).toLocaleString() : 0}</p>
//         </div>
//       </div>
//       {isRent && <p className="text-xs text-slate-500 mt-4">This is a rental listing — figures shown model a purchase at an equivalent capital value.</p>}
//     </div>
//   );
// }

// export default function DetailView({ property, favorites, toggleFav, goBack }) {
//   const [activeImg, setActiveImg] = useState(0);
//   const [sent, setSent] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", message: `Hello, I'd like to arrange a viewing of ${property.title}.` });
//   const agent = AGENTS[(property.id - 1) % AGENTS.length];
//   const isFav = favorites.has(property.id);

//   const shades = ["", "brightness-110", "brightness-90", "hue-rotate-15", "brightness-75"];

//   return (
//     <div className="bg-slate-50 min-h-screen py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-700 transition-colors mb-6">
//           <ChevronLeft className="w-4 h-4" /> Back to listings
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* MAIN COLUMN */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* GALLERY */}
//             <div>
//               <div className="relative rounded-2xl overflow-hidden shadow-lg">
//                 <Badge status={property.status} />
//                 <button onClick={() => toggleFav(property.id)} aria-label="Save to favorites"
//                   className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 ${isFav ? "bg-rose-500 text-white" : "bg-white/90 text-slate-600 hover:text-rose-500"}`}>
//                   <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
//                 </button>
//                 <div className={`transition-all duration-300 ${shades[activeImg]}`}>
//                   <PropertyImage property={property} className="h-72 sm:h-96" />
//                 </div>
//                 <span className="absolute bottom-4 right-4 bg-slate-900/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Photo {activeImg + 1} of 5</span>
//               </div>
//               <div className="grid grid-cols-5 gap-3 mt-3">
//                 {shades.map((s, i) => (
//                   <button key={i} onClick={() => setActiveImg(i)}
//                     className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-emerald-600 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}>
//                     <div className={s}><PropertyImage property={property} className="h-16 sm:h-20" /></div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* HEADER */}
//             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{property.title}</h1>
//                   <p className="flex items-center gap-1.5 text-slate-500 mt-2"><MapPin className="w-4 h-4" />{property.location}</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-emerald-700">{fmtPrice(property.price, property.status)}</p>
//               </div>
//               <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
//                 {[[BedDouble, `${property.beds}`, "Bedrooms"], [Bath, `${property.baths}`, "Bathrooms"], [Ruler, `${property.area} m²`, "Living area"]].map(([Icon, v, l]) => (
//                   <div key={l} className="flex items-center gap-3">
//                     <span className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center"><Icon className="w-5 h-5 text-emerald-700" /></span>
//                     <div><p className="font-bold text-slate-900">{v}</p><p className="text-xs text-slate-500">{l}</p></div>
//                   </div>
//                 ))}
//               </div>
//               <h2 className="font-semibold text-slate-900 text-lg mt-8 mb-3">About this home</h2>
//               <p className="text-slate-600 leading-relaxed">{property.desc}</p>
//               <h2 className="font-semibold text-slate-900 text-lg mt-8 mb-4">Amenities</h2>
//               <div className="flex flex-wrap gap-2.5">
//                 {property.amenities.map((a) => {
//                   const meta = AMENITIES.find((x) => x.name === a);
//                   const Icon = meta ? meta.icon : Check;
//                   return (
//                     <span key={a} className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm px-3.5 py-2 rounded-full">
//                       <Icon className="w-4 h-4 text-emerald-600" />{a}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>

//             <MortgageCalculator price={property.price} isRent={property.status === "rent"} />
//           </div>

//           {/* AGENT SIDEBAR */}
//           <aside className="lg:col-span-1">
//             <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 lg:sticky lg:top-24">
//               <div className="flex items-center gap-4">
//                 <AgentAvatar agent={agent} className="w-16 h-16 rounded-2xl" />
//                 <div>
//                   <p className="font-semibold text-slate-900">{agent.name}</p>
//                   <p className="text-xs text-slate-500">{agent.role}</p>
//                   <p className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-1"><Star className="w-3.5 h-3.5 fill-current" />{agent.rating} · {agent.deals} deals</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-5">
//                 <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
//                   <Phone className="w-4 h-4" /> Call
//                 </a>
//                 <a href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
//                   <MessageCircle className="w-4 h-4" /> WhatsApp
//                 </a>
//               </div>
//               <div className="mt-6 pt-6 border-t border-slate-100">
//                 {sent ? (
//                   <div className="text-center py-6">
//                     <span className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-emerald-600" /></span>
//                     <p className="font-semibold text-slate-900">Message sent</p>
//                     <p className="text-sm text-slate-500 mt-1">{agent.name.split(" ")[0]} replies within 2 business hours.</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     <p className="text-sm font-semibold text-slate-900">Request a viewing</p>
//                     <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
//                       className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
//                     <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email address"
//                       className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
//                     <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
//                       className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
//                     <button onClick={() => form.name && form.email.includes("@") && setSent(true)}
//                       className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5">
//                       <Send className="w-4 h-4" /> Send message
//                     </button>
//                     <p className="text-xs text-slate-400 text-center">Both fields required. No spam, ever.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Heart, Eye, MapPin, BedDouble, Bath, Ruler, Check,
  Star, Phone, MessageCircle, Send, Calculator, X, ZoomIn
} from "lucide-react";
import { Badge, PropertyImage, AgentAvatar } from "../components/ui";
import { AGENTS, AMENITIES, fmtPrice } from "../data";

/* ------------------------------------------------------------------ */
/*  GALLERY SETUP                                                      */
/*  Every property shows its own main photo (from data.js) plus a      */
/*  shared set of interior shots. Nothing in data.js needs changing —  */
/*  new properties you add get a full gallery automatically. To give   */
/*  a property its OWN photos later, add `photos: ["/images/a.jpg",    */
/*  "/images/b.jpg"]` to its record in data.js — it takes priority.    */
/* ------------------------------------------------------------------ */

const IMGX = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=75`;

const GALLERY_EXTRAS = [
  IMGX("1600210491892-03d54c0aaf87"), // living room
  IMGX("1556911220-bff31c812dba"),   // kitchen
  IMGX("1616594039964-ae9021a400a0"), // bedroom
  IMGX("1552321554-5fefe8c9ef14"),   // bathroom
];

const getPhotos = (property) =>
  property.photos && property.photos.length
    ? property.photos
    : [property.img, ...GALLERY_EXTRAS].filter(Boolean);

/* Single image with graceful fallback to the gradient placeholder */
function GalleryImage({ src, property, className = "h-72 sm:h-96" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <PropertyImage property={property} className={className} />;
  return (
    <img
      src={src}
      alt={property.title}
      onError={() => setFailed(true)}
      className={`w-full ${className} object-cover`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  LIGHTBOX (fullscreen viewer)                                       */
/* ------------------------------------------------------------------ */

function Lightbox({ photos, property, index, setIndex, onClose }) {
  const next = () => setIndex((i) => (i + 1) % photos.length);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // stop page scroll behind the viewer
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
        <div onClick={(e) => e.stopPropagation()}>
          <p className="font-semibold text-sm sm:text-base">{property.title}</p>
          <p className="text-xs text-slate-400">{index + 1} / {photos.length}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* main image + arrows */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-16 min-h-0">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div onClick={(e) => e.stopPropagation()} className="max-w-5xl w-full">
          <GalleryImage
            key={photos[index]}
            src={photos[index]}
            property={property}
            className="max-h-[72vh] h-auto rounded-xl shadow-2xl"
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* thumbnail strip */}
      <div className="px-4 sm:px-6 py-4 flex justify-center gap-2 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
        {photos.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === index ? "border-emerald-500 opacity-100" : "border-transparent opacity-50 hover:opacity-90"}`}
          >
            <GalleryImage key={src} src={src} property={property} className="h-14" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MORTGAGE CALCULATOR                                                */
/* ------------------------------------------------------------------ */

function MortgageCalculator({ price, isRent }) {
  const [amount, setAmount] = useState(isRent ? price * 250 : price);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(3.2);
  const [years, setYears] = useState(25);

  const loan = amount * (1 - downPct / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r > 0 ? (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan / n;
  const totalInterest = monthly * n - loan;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white">
      <h3 className="flex items-center gap-2 font-semibold text-lg mb-5"><Calculator className="w-5 h-5 text-emerald-400" /> Mortgage Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Property price (€)</label>
          <input type="number" value={amount} min={0} onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5"><label className="font-medium text-slate-400">Down payment</label><span className="text-emerald-400 font-semibold">{downPct}% · €{Math.round(amount * downPct / 100).toLocaleString()}</span></div>
          <input type="range" min="0" max="80" step="5" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-emerald-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs mb-1.5"><label className="font-medium text-slate-400">Rate</label><span className="text-emerald-400 font-semibold">{rate.toFixed(1)}%</span></div>
            <input type="range" min="1" max="10" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5"><label className="font-medium text-slate-400">Term</label><span className="text-emerald-400 font-semibold">{years} yrs</span></div>
            <input type="range" min="5" max="35" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 pt-5 border-t border-slate-700 flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-400">Estimated monthly payment</p>
          <p className="text-3xl font-bold text-emerald-400 mt-1">€{isFinite(monthly) ? Math.round(monthly).toLocaleString() : 0}</p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <p>Loan: €{Math.round(loan).toLocaleString()}</p>
          <p>Total interest: €{isFinite(totalInterest) ? Math.round(Math.max(0, totalInterest)).toLocaleString() : 0}</p>
        </div>
      </div>
      {isRent && <p className="text-xs text-slate-500 mt-4">This is a rental listing — figures shown model a purchase at an equivalent capital value.</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DETAIL VIEW                                                        */
/* ------------------------------------------------------------------ */

export default function DetailView({ property, favorites, toggleFav, goBack }) {
  const photos = getPhotos(property);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: `Hello, I'd like to arrange a viewing of ${property.title}.` });
  const agent = AGENTS[(property.id - 1) % AGENTS.length];
  const isFav = favorites.has(property.id);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      {lightboxOpen && (
        <Lightbox
          photos={photos}
          property={property}
          index={activeImg}
          setIndex={setActiveImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-700 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* GALLERY */}
            <div>
              <div
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <Badge status={property.status} />
                <button onClick={(e) => { e.stopPropagation(); toggleFav(property.id); }} aria-label="Save to favorites"
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 ${isFav ? "bg-rose-500 text-white" : "bg-white/90 text-slate-600 hover:text-rose-500"}`}>
                  <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
                </button>
                <GalleryImage key={photos[activeImg]} src={photos[activeImg]} property={property} className="h-72 sm:h-96" />
                {/* zoom hint on hover */}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-800 rounded-full p-3 shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <span className="absolute bottom-4 right-4 bg-slate-900/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                  <Eye className="w-3.5 h-3.5" /> Photo {activeImg + 1} of {photos.length} — click to enlarge
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {photos.map((src, i) => (
                  <button key={src + i} onClick={() => setActiveImg(i)} onDoubleClick={() => setLightboxOpen(true)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-emerald-600 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <GalleryImage key={src} src={src} property={property} className="h-16 sm:h-20" />
                  </button>
                ))}
              </div>
            </div>

            {/* HEADER */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-slate-500 mt-2"><MapPin className="w-4 h-4" />{property.location}</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-700">{fmtPrice(property.price, property.status)}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                {[[BedDouble, `${property.beds}`, "Bedrooms"], [Bath, `${property.baths}`, "Bathrooms"], [Ruler, `${property.area} m²`, "Living area"]].map(([Icon, v, l]) => (
                  <div key={l} className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center"><Icon className="w-5 h-5 text-emerald-700" /></span>
                    <div><p className="font-bold text-slate-900">{v}</p><p className="text-xs text-slate-500">{l}</p></div>
                  </div>
                ))}
              </div>
              <h2 className="font-semibold text-slate-900 text-lg mt-8 mb-3">About this home</h2>
              <p className="text-slate-600 leading-relaxed">{property.desc}</p>
              <h2 className="font-semibold text-slate-900 text-lg mt-8 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.map((a) => {
                  const meta = AMENITIES.find((x) => x.name === a);
                  const Icon = meta ? meta.icon : Check;
                  return (
                    <span key={a} className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm px-3.5 py-2 rounded-full">
                      <Icon className="w-4 h-4 text-emerald-600" />{a}
                    </span>
                  );
                })}
              </div>
            </div>

            <MortgageCalculator price={property.price} isRent={property.status === "rent"} />
          </div>

          {/* AGENT SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-4">
                <AgentAvatar agent={agent} className="w-16 h-16 rounded-2xl" />
                <div>
                  <p className="font-semibold text-slate-900">{agent.name}</p>
                  <p className="text-xs text-slate-500">{agent.role}</p>
                  <p className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-1"><Star className="w-3.5 h-3.5 fill-current" />{agent.rating} · {agent.deals} deals</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                {sent ? (
                  <div className="text-center py-6">
                    <span className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-emerald-600" /></span>
                    <p className="font-semibold text-slate-900">Message sent</p>
                    <p className="text-sm text-slate-500 mt-1">{agent.name.split(" ")[0]} replies within 2 business hours.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900">Request a viewing</p>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email address"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                    <button onClick={() => form.name && form.email.includes("@") && setSent(true)}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5">
                      <Send className="w-4 h-4" /> Send message
                    </button>
                    <p className="text-xs text-slate-400 text-center">Both fields required. No spam, ever.</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
