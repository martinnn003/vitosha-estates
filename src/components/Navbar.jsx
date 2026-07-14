import { useState } from "react";
import { Landmark, Heart, ArrowRight, Menu, X } from "lucide-react";

export function Navbar({ page, go, favCount }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "listings", label: "Listings" },
    { id: "sell", label: "Sell with Us" },
    { id: "agents", label: "Our Agents" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => go("home")} className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center shadow-md group-hover:bg-emerald-500 transition-colors">
              <Landmark className="w-5 h-5 text-white" />
            </span>
            <span className="text-white font-bold text-lg tracking-tight">Vitosha<span className="text-emerald-500">Estates</span></span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${page === l.id ? "text-emerald-400 bg-slate-800" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300 text-sm">
              <Heart className="w-4 h-4 text-rose-400 fill-current" />{favCount}
            </div>
            <button onClick={() => go("sell")} className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-emerald-600/30 hover:shadow-lg">
              Submit Property <ArrowRight className="w-4 h-4" />
            </button>
            <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-1">
          {links.map((l) => (
            <button key={l.id} onClick={() => { go(l.id); setOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${page === l.id ? "text-emerald-400 bg-slate-800" : "text-slate-300"}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { go("sell"); setOpen(false); }} className="w-full mt-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
            Submit Property And Try Again
          </button>
        </div>
      )}
    </header>
  );
}
