import { MapPin, BedDouble, Bath, Ruler, Heart, ChevronRight } from "lucide-react";
import { Badge, PropertyImage } from "./ui";
import { fmtPrice } from "../data";

export function PropertyCard({ property, isFav, onFav, onOpen }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => onOpen(property)}>
      <div className="relative">
        <Badge status={property.status} />
        <button
          onClick={(e) => { e.stopPropagation(); onFav(property.id); }}
          aria-label="Save to favorites"
          className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${isFav ? "bg-rose-500 text-white" : "bg-white/90 text-slate-600 hover:text-rose-500"}`}
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
        </button>
        <PropertyImage property={property} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors">{property.title}</h3>
            <p className="flex items-center gap-1 text-sm text-slate-500 mt-1"><MapPin className="w-3.5 h-3.5" />{property.location}</p>
          </div>
          <p className="text-lg font-bold text-emerald-700 whitespace-nowrap">{fmtPrice(property.price, property.status)}</p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-slate-400" />{property.beds}</span>
            <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-slate-400" />{property.baths}</span>
            <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4 text-slate-400" />{property.area} m²</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(property); }}
            className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:gap-2 transition-all"
          >
            Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
