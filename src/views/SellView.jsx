import React, { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PROPERTY_TYPES, AMENITIES } from "../data";

export default function SellView() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    intent: "sale", title: "", location: "", type: "Apartment",
    beds: 2, baths: 1, area: "", price: "", amenities: [],
    name: "", email: "", phone: "",
  });
  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const steps = [
    { n: 1, label: "Basic Info" },
    { n: 2, label: "Property Details" },
    { n: 3, label: "Contact" },
  ];
  const canNext =
    step === 1 ? data.title.trim() && data.location.trim() :
    step === 2 ? data.area && data.price :
    data.name.trim() && data.email.includes("@") && data.phone.trim();

  if (done) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-lg text-center">
          <span className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5"><Check className="w-8 h-8 text-emerald-600" /></span>
          <h2 className="text-2xl font-bold text-slate-900">Submission received</h2>
          <p className="text-slate-500 mt-3 leading-relaxed">Thank you, {data.name.split(" ")[0]}. A valuation specialist will review <span className="font-semibold text-slate-700">{data.title}</span> and contact you at {data.phone} within one business day.</p>
          <button onClick={() => { setDone(false); setStep(1); }} className="mt-7 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Submit another property
          </button>
        </div>
      </div>
    );
  }

  const inputCls = "w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-emerald-600 mb-3">Sell with Us</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">List your property in three steps</h1>
          <p className="text-slate-500 mt-3">Free professional valuation, photography and legal check for every accepted listing.</p>
        </div>

        {/* PROGRESS */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${step > s.n ? "bg-emerald-600 border-emerald-600 text-white" : step === s.n ? "border-emerald-600 text-emerald-700 bg-white" : "border-slate-300 text-slate-400 bg-white"}`}>
                  {step > s.n ? <Check className="w-5 h-5" /> : s.n}
                </span>
                <span className={`text-xs mt-2 font-medium ${step >= s.n ? "text-slate-900" : "text-slate-400"}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${step > s.n ? "bg-emerald-600" : "bg-slate-300"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-10">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ v: "sale", l: "Sell my property" }, { v: "rent", l: "Rent it out" }].map((o) => (
                    <button key={o.v} onClick={() => set({ intent: o.v })}
                      className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${data.intent === o.v ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Listing title</label>
                <input value={data.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Sunny 3-bed near South Park" className={inputCls} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Neighbourhood</label>
                  <input value={data.location} onChange={(e) => set({ location: e.target.value })} placeholder="e.g. Lozenets, Sofia" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Property type</label>
                  <select value={data.type} onChange={(e) => set({ type: e.target.value })} className={`${inputCls} bg-white`}>
                    {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms: <span className="text-emerald-700">{data.beds}</span></label>
                  <input type="range" min="0" max="8" value={data.beds} onChange={(e) => set({ beds: Number(e.target.value) })} className="w-full accent-emerald-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms: <span className="text-emerald-700">{data.baths}</span></label>
                  <input type="range" min="1" max="6" value={data.baths} onChange={(e) => set({ baths: Number(e.target.value) })} className="w-full accent-emerald-600" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Living area (m²)</label>
                  <input type="number" min="0" value={data.area} onChange={(e) => set({ area: e.target.value })} placeholder="e.g. 120" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{data.intent === "rent" ? "Monthly rent (€)" : "Asking price (€)"}</label>
                  <input type="number" min="0" value={data.price} onChange={(e) => set({ price: e.target.value })} placeholder={data.intent === "rent" ? "e.g. 1200" : "e.g. 350000"} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => {
                    const on = data.amenities.includes(a.name);
                    return (
                      <button key={a.name} onClick={() => set({ amenities: on ? data.amenities.filter((x) => x !== a.name) : [...data.amenities, a.name] })}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${on ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 text-slate-600 hover:border-emerald-400"}`}>
                        <a.icon className="w-3.5 h-3.5" /> {a.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-100">
                <p className="font-semibold text-slate-900 mb-1">Summary</p>
                {data.title || "Untitled listing"} · {data.type} in {data.location || "—"} · {data.beds} bd / {data.baths} ba · {data.area || "—"} m² · €{Number(data.price || 0).toLocaleString()}{data.intent === "rent" ? "/mo" : ""}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
                <input value={data.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your name" className={inputCls} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input type="email" value={data.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@email.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <input value={data.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+359 ..." className={inputCls} />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-9 pt-6 border-t border-slate-100">
            <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 disabled:opacity-0 transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => (step < 3 ? setStep(step + 1) : setDone(true))}
              disabled={!canNext}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0">
              {step < 3 ? "Continue" : "Submit property"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
