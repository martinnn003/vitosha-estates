import { useState } from "react";
import { Landmark, Facebook, Instagram, Linkedin, Twitter, Send, Check } from "lucide-react";

export function Footer({ go }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Landmark className="w-5 h-5 text-white" /></span>
            <span className="text-white font-bold text-lg">Vitosha<span className="text-emerald-500">Estates</span></span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">Sofia's boutique agency for exceptional homes — from mountain villas to boulevard penthouses. Est. 2009.</p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200"><Icon className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => go("listings")} className="hover:text-emerald-400 transition-colors">Browse Listings</button></li>
            <li><button onClick={() => go("sell")} className="hover:text-emerald-400 transition-colors">Sell Your Property</button></li>
            <li><button onClick={() => go("agents")} className="hover:text-emerald-400 transition-colors">Meet Our Agents</button></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Market Insights</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {["About Us", "Careers", "Privacy Policy", "Terms of Service", "Contact"].map((t) => (
              <li key={t}><a href="#" className="hover:text-emerald-400 transition-colors">{t}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Market Newsletter</h4>
          <p className="text-sm text-slate-400 mb-4">Quarterly price data and off-market previews. No noise.</p>
          {subscribed ? (
            <p className="flex items-center gap-2 text-emerald-400 text-sm font-medium"><Check className="w-4 h-4" /> You're on the list.</p>
          ) : (
            <div className="flex gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com"
                className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <button onClick={() => email.includes("@") && setSubscribed(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-lg transition-colors" aria-label="Subscribe">
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © 2026 Vitosha Estates Ltd. · 21 Vitosha Blvd, Sofia · All rights reserved.
      </div>
    </footer>
  );
}
