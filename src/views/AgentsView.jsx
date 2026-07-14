import { Star, Phone, Mail, ArrowRight } from "lucide-react";
import { SectionTitle, AgentAvatar } from "../components/ui";
import { AGENTS } from "../data";

export default function AgentsView() {
  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Our Agents" title="The people behind the keys" subtitle="Four senior specialists. No junior hand-offs — the person you meet is the person who closes." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className={`h-28 bg-gradient-to-br ${a.gradient} relative`}>
                <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-white shadow-lg border-4 border-white overflow-hidden">
                  <AgentAvatar agent={a} className="w-full h-full rounded-xl" />
                </div>
              </div>
              <div className="p-6 pt-11">
                <h3 className="font-bold text-slate-900 text-lg">{a.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{a.role}</p>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1 font-semibold text-amber-500"><Star className="w-4 h-4 fill-current" />{a.rating}</span>
                  <span className="text-slate-500">{a.listings} active listings</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{a.deals} completed transactions</p>
                <div className="grid grid-cols-2 gap-2.5 mt-5">
                  <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <a href={`mailto:${a.name.toLowerCase().split(" ")[0]}@vitoshaestates.bg`} className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl" />
          <h2 className="relative text-2xl sm:text-3xl font-bold text-white">Think you'd fit the team?</h2>
          <p className="relative text-slate-300 mt-3 max-w-xl mx-auto">We hire two agents a year, and we train them for twelve months before their first solo deal. Quality over headcount.</p>
          <a href="#" className="relative inline-flex items-center gap-2 mt-7 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5">
            View open positions <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
