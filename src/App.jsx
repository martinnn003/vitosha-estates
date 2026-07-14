import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import HomeView from "./views/HomeView";
import ListingsView from "./views/ListingsView";
import DetailView from "./views/DetailView";
import SellView from "./views/SellView";
import AgentsView from "./views/AgentsView";

const DEFAULT_FILTERS = { status: "all", location: "", types: [], beds: 0, minPrice: 0, maxPrice: 1500000, amenities: [] };

export default function App() {
  const [page, setPage] = useState("home");
  const [activeProperty, setActiveProperty] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const toggleFav = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openProperty = (p) => { setActiveProperty(p); go("details"); };

  // Hero search → translate into listings filters and navigate
  const handleHeroSearch = ({ status, location, type, price }) => {
    let minPrice = 0, maxPrice = 1500000;
    if (price) {
      const [lo, hi] = price.split("-").map(Number);
      // rent values are normalised (×250) inside the listings filter
      minPrice = status === "rent" ? lo * 250 : lo;
      maxPrice = status === "rent" ? Math.min(hi * 250, 99999999) : Math.min(hi, 1500000);
      maxPrice = Math.min(maxPrice, 1500000);
    }
    setFilters({ ...DEFAULT_FILTERS, status, location, types: type ? [type] : [], minPrice, maxPrice });
    go("listings");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 antialiased">
      <Navbar page={page} go={go} favCount={favorites.size} />
      <main className="flex-1">
        {page === "home" && <HomeView favorites={favorites} toggleFav={toggleFav} openProperty={openProperty} onSearch={handleHeroSearch} go={go} />}
        {page === "listings" && <ListingsView filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav} openProperty={openProperty} />}
        {page === "details" && activeProperty && <DetailView key={activeProperty.id} property={activeProperty} favorites={favorites} toggleFav={toggleFav} goBack={() => go("listings")} />}
        {page === "sell" && <SellView />}
        {page === "agents" && <AgentsView />}
      </main>
      <Footer go={go} />
    </div>
  );
}
