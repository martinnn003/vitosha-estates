import { useState } from "react";
import { User } from "lucide-react";

export function Badge({ status }) {
  return (
    <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-lg ${status === "sale" ? "bg-emerald-600 text-white" : "bg-amber-500 text-slate-900"}`}>
      {status === "sale" ? "For Sale" : "For Rent"}
    </span>
  );
}

export function PropertyImage({ property, className = "h-56" }) {
  const [failed, setFailed] = useState(false);
  const Icon = property.icon;
  const showPhoto = property.img && !failed;
  return (
    <div className={`relative w-full ${className} bg-gradient-to-br ${property.gradient} overflow-hidden`}>
      {showPhoto && (
        <img
          src={property.img}
          alt={property.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      {!showPhoto && (
        <>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <Icon className="absolute bottom-4 right-4 w-14 h-14 text-white opacity-20" />
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
    </div>
  );
}

export function AgentAvatar({ agent, className = "w-16 h-16 rounded-2xl" }) {
  const [failed, setFailed] = useState(false);
  if (agent.img && !failed) {
    return (
      <img
        src={agent.img}
        alt={agent.name}
        onError={() => setFailed(true)}
        className={`${className} object-cover shadow-md`}
      />
    );
  }
  return (
    <div className={`${className} bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-md`}>
      <User className="w-1/2 h-1/2 text-white" />
    </div>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, light }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      <p className="text-sm font-semibold tracking-widest uppercase text-emerald-600 mb-3">{eyebrow}</p>
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 ${light ? "text-slate-300" : "text-slate-500"}`}>{subtitle}</p>}
    </div>
  );
}
