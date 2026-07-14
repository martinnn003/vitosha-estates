import { useState } from "react";
import {
  ChevronLeft, Heart, Eye, MapPin, BedDouble, Bath, Ruler, Check,
  Star, Phone, MessageCircle, Send, Calculator
} from "lucide-react";
import { Badge, PropertyImage, AgentAvatar } from "../components/ui";
import { AGENTS, AMENITIES, fmtPrice } from "../data";

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

export default function DetailView({ property, favorites, toggleFav, goBack }) {
  const [activeImg, setActiveImg] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: `Hello, I'd like to arrange a viewing of ${property.title}.` });
  const agent = AGENTS[(property.id - 1) % AGENTS.length];
  const isFav = favorites.has(property.id);

  const shades = ["", "brightness-110", "brightness-90", "hue-rotate-15", "brightness-75"];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-700 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* GALLERY */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Badge status={property.status} />
                <button onClick={() => toggleFav(property.id)} aria-label="Save to favorites"
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 ${isFav ? "bg-rose-500 text-white" : "bg-white/90 text-slate-600 hover:text-rose-500"}`}>
                  <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
                </button>
                <div className={`transition-all duration-300 ${shades[activeImg]}`}>
                  <PropertyImage property={property} className="h-72 sm:h-96" />
                </div>
                <span className="absolute bottom-4 right-4 bg-slate-900/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Photo {activeImg + 1} of 5</span>
              </div>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {shades.map((s, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-emerald-600 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <div className={s}><PropertyImage property={property} className="h-16 sm:h-20" /></div>
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
