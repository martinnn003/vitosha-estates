import { useState, useMemo } from "react";
import {
  MapPin, ChevronRight, Search, LayoutGrid, Map as MapIcon
} from "lucide-react";
import { PropertyCard } from "../components/PropertyCard";
import { PROPERTIES, PROPERTY_TYPES, AMENITIES, fmtPrice } from "../data";

function MapMock({ properties, openProperty }) {
  const [active, setActive] = useState(null);
  return (
    <div className="relative w-full h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden border border-slate-200 bg-emerald-50">
      {/* stylised terrain */}
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-8 left-10 w-40 h-24 bg-emerald-200/60 rounded-full blur-sm" />
      <div className="absolute bottom-10 right-16 w-56 h-32 bg-emerald-300/50 rounded-full blur-sm" />
      <div className="absolute top-1/3 right-8 w-24 h-24 bg-sky-200/70 rounded-full blur-sm" />
      {/* roads */}
      <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-white/80 -rotate-12 shadow-sm" />
      <div className="absolute left-0 right-0 top-1/2 h-2 bg-white/80 rotate-3 shadow-sm" />
      <div className="absolute left-0 right-0 top-1/4 h-1.5 bg-white/60 -rotate-6" />
      <span className="absolute bottom-3 left-4 text-xs font-semibold text-emerald-900/50 uppercase tracking-widest">Vitosha Nature Park ↓</span>
      <span className="absolute top-3 right-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">City Centre ↑</span>

      {properties.map((p) => (
        <div key={p.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          {active === p.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 z-20 cursor-pointer" onClick={() => openProperty(p)}>
              <p className="text-sm font-semibold text-slate-900 leading-tight">{p.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{p.location}</p>
              <p className="text-sm font-bold text-emerald-700 mt-1">{fmtPrice(p.price, p.status)}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">View details <ChevronRight className="w-3 h-3" /></p>
            </div>
          )}
          <button
            onClick={() => setActive(active === p.id ? null : p.id)}
            className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all duration-200 hover:scale-110 ${active === p.id ? "bg-slate-900 text-white scale-110 z-10" : p.status === "sale" ? "bg-emerald-600 text-white" : "bg-amber-500 text-slate-900"}`}
          >
            <MapPin className="w-3 h-3" />
            {p.status === "rent" ? `€${(p.price / 1000).toFixed(1)}k` : `€${Math.round(p.price / 1000)}k`}
          </button>
        </div>
      ))}
    </div>
  );
}

export default function ListingsView({ filters, setFilters, favorites, toggleFav, openProperty }) {
  const [view, setView] = useState("grid");

  const results = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.location && !`${p.location} ${p.title}`.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.types.length && !filters.types.includes(p.type)) return false;
      if (filters.beds && p.beds < filters.beds) return false;
      const price = p.status === "rent" ? p.price * 250 : p.price; // normalise rent to comparable scale for shared slider
      if (price < filters.minPrice || price > filters.maxPrice) return false;
      if (filters.amenities.length && !filters.amenities.every((a) => p.amenities.includes(a))) return false;
      return true;
    });
  }, [filters]);

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const toggleType = (t) => set({ types: filters.types.includes(t) ? filters.types.filter((x) => x !== t) : [...filters.types, t] });
  const toggleAmenity = (a) => set({ amenities: filters.amenities.includes(a) ? filters.amenities.filter((x) => x !== a) : [...filters.amenities, a] });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Property Listings</h1>
            <p className="text-slate-500 mt-1">{results.length} {results.length === 1 ? "home matches" : "homes match"} your criteria</p>
          </div>
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm self-start">
            {[{ id: "grid", icon: LayoutGrid, label: "Grid" }, { id: "map", icon: MapIcon, label: "Map" }].map((v) => (
              <button key={v.id} onClick={() => setView(v.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${view === v.id ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:text-slate-900"}`}>
                <v.icon className="w-4 h-4" /> {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-7 lg:sticky lg:top-24">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Status</h3>
                <div className="flex gap-2">
                  {[{ v: "all", l: "All" }, { v: "sale", l: "Buy" }, { v: "rent", l: "Rent" }].map((s) => (
                    <button key={s.v} onClick={() => set({ status: s.v })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${filters.status === s.v ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>
                      {s.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Search area</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={filters.location} onChange={(e) => set({ location: e.target.value })} placeholder="Neighbourhood or name"
                    className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Price</h3>
                  <span className="text-xs text-slate-500">€{(filters.minPrice / 1000).toFixed(0)}k – €{(filters.maxPrice / 1000).toFixed(0)}k</span>
                </div>
                <label className="block text-xs text-slate-500 mb-1">Min price</label>
                <input type="range" min="0" max="1500000" step="25000" value={filters.minPrice}
                  onChange={(e) => set({ minPrice: Math.min(Number(e.target.value), filters.maxPrice - 25000) })}
                  className="w-full accent-emerald-600" />
                <label className="block text-xs text-slate-500 mb-1 mt-2">Max price</label>
                <input type="range" min="25000" max="1500000" step="25000" value={filters.maxPrice}
                  onChange={(e) => set({ maxPrice: Math.max(Number(e.target.value), filters.minPrice + 25000) })}
                  className="w-full accent-emerald-600" />
                <p className="text-xs text-slate-400 mt-2">Rentals are matched by yearly-equivalent value.</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Property type</h3>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((t) => (
                    <button key={t} onClick={() => toggleType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filters.types.includes(t) ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 text-slate-600 hover:border-emerald-400"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Bedrooms</h3>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => set({ beds: n })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${filters.beds === n ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>
                      {n === 0 ? "Any" : `${n}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Amenities</h3>
                <div className="space-y-2.5">
                  {AMENITIES.map((a) => (
                    <label key={a.name} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={filters.amenities.includes(a.name)} onChange={() => toggleAmenity(a.name)}
                        className="w-4 h-4 rounded border-slate-300 text-emerald-600 accent-emerald-600" />
                      <a.icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      <span className="text-sm text-slate-700">{a.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={() => setFilters({ status: "all", location: "", types: [], beds: 0, minPrice: 0, maxPrice: 1500000, amenities: [] })}
                className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Reset all filters
              </button>
            </div>
          </aside>

          {/* RESULTS */}
          <div className="lg:col-span-3">
            {view === "map" ? (
              <MapMock properties={results} openProperty={openProperty} />
            ) : results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No homes match these filters</h3>
                <p className="text-slate-500 mt-1 text-sm">Widen the price range or remove an amenity to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((p) => (
                  <PropertyCard key={p.id} property={p} isFav={favorites.has(p.id)} onFav={toggleFav} onOpen={openProperty} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
