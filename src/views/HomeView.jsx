import { useState } from "react";
import {
  Search, ArrowRight, Award, ShieldCheck, TrendingUp, Handshake, Clock
} from "lucide-react";
import { PropertyCard } from "../components/PropertyCard";
import { SectionTitle } from "../components/ui";
import { PROPERTIES, INSIGHTS, PROPERTY_TYPES } from "../data";

function HeroSearch({ onSearch }) {
  const [tab, setTab] = useState("sale");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const RANGES = tab === "sale"
    ? [{ label: "Any price", v: "" }, { label: "Up to €300k", v: "0-300000" }, { label: "€300k – €700k", v: "300000-700000" }, { label: "€700k – €1.2M", v: "700000-1200000" }, { label: "€1.2M+", v: "1200000-99999999" }]
    : [{ label: "Any price", v: "" }, { label: "Up to €800/mo", v: "0-800" }, { label: "€800 – €1,800", v: "800-1800" }, { label: "€1,800+", v: "1800-99999999" }];
  return (
    <div className="w-full max-w-3xl">
      <div className="flex">
        {[{ id: "sale", label: "Buy" }, { id: "rent", label: "Rent" }].map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setPrice(""); }}
            className={`px-8 py-3 rounded-t-xl text-sm font-semibold transition-all duration-200 ${tab === t.id ? "bg-white text-slate-900" : "bg-slate-900/60 text-slate-300 hover:bg-slate-900/80"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-b-2xl rounded-tr-2xl p-4 sm:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Lozenets"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Property Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="">Any type</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Price Range</label>
          <select value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            {RANGES.map((r) => <option key={r.v} value={r.v}>{r.label}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={() => onSearch({ status: tab, location, type, price })}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:-translate-y-0.5">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomeView({ favorites, toggleFav, openProperty, onSearch, go }) {
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 6);
  const perks = [
    { icon: Award, title: "17 years in Sofia", text: "Deep neighbourhood knowledge from Boyana to Oborishte — we price with data, not guesswork." },
    { icon: ShieldCheck, title: "Verified & vetted", text: "Every listing passes a legal and Act-status check before it reaches you. Zero surprises at the notary." },
    { icon: TrendingUp, title: "Investment-grade advice", text: "Yield modelling and resale forecasts included with every purchase brief, at no extra cost." },
    { icon: Handshake, title: "One agent, start to keys", text: "A single senior agent owns your deal end-to-end. No hand-offs, no call centres." },
  ];
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-4">Sofia · Boutique Real Estate</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl">
            Homes worth the <span className="text-emerald-400">mountain view.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-xl">
            Curated residences across Sofia's finest districts — bought, sold and let with the discretion of a private office.
          </p>
          <div className="mt-10">
            <HeroSearch onSearch={onSearch} />
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-slate-300">
            {[["1,200+", "Homes sold"], ["€480M", "Transaction volume"], ["4.9★", "Client rating"]].map(([n, l]) => (
              <div key={l}><p className="text-2xl font-bold text-white">{n}</p><p className="text-sm text-slate-400">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Handpicked" title="Featured Properties" subtitle="Six residences our partners would buy themselves — refreshed weekly." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} isFav={favorites.has(p.id)} onFav={toggleFav} onOpen={openProperty} />
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => go("listings")} className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:gap-3 transition-all">
              View all listings <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle light eyebrow="Why Vitosha Estates" title="A private-office standard of service" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p) => (
              <div key={p.title} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 hover:border-emerald-600/50 hover:bg-slate-800 transition-all duration-300">
                <span className="w-12 h-12 rounded-xl bg-emerald-600/15 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-emerald-400" />
                </span>
                <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Latest Insights" title="From our research desk" subtitle="Plain-language analysis of the Sofia market, written by the people doing the deals." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSIGHTS.map((a) => (
              <article key={a.id} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className={`relative h-44 bg-gradient-to-br ${a.gradient}`}>
                  <a.icon className="absolute bottom-4 right-4 w-12 h-12 text-white opacity-20" />
                  <span className="absolute top-4 left-4 bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">{a.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors">{a.title}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-3"><Clock className="w-3.5 h-3.5" />{a.read}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
