// import { useState } from "react";
// import { Navbar } from "./components/Navbar";
// import { Footer } from "./components/Footer";
// import HomeView from "./views/HomeView";
// import ListingsView from "./views/ListingsView";
// import DetailView from "./views/DetailView";
// import SellView from "./views/SellView";
// import AgentsView from "./views/AgentsView";

// const DEFAULT_FILTERS = { status: "all", location: "", types: [], beds: 0, minPrice: 0, maxPrice: 1500000, amenities: [] };

// export default function App() {
//   const [page, setPage] = useState("home");
//   const [activeProperty, setActiveProperty] = useState(null);
//   const [favorites, setFavorites] = useState(new Set());
//   const [filters, setFilters] = useState(DEFAULT_FILTERS);

//   const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

//   const toggleFav = (id) =>
//     setFavorites((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });

//   const openProperty = (p) => { setActiveProperty(p); go("details"); };

//   // Hero search → translate into listings filters and navigate
//   const handleHeroSearch = ({ status, location, type, price }) => {
//     let minPrice = 0, maxPrice = 1500000;
//     if (price) {
//       const [lo, hi] = price.split("-").map(Number);
//       // rent values are normalised (×250) inside the listings filter
//       minPrice = status === "rent" ? lo * 250 : lo;
//       maxPrice = status === "rent" ? Math.min(hi * 250, 99999999) : Math.min(hi, 1500000);
//       maxPrice = Math.min(maxPrice, 1500000);
//     }
//     setFilters({ ...DEFAULT_FILTERS, status, location, types: type ? [type] : [], minPrice, maxPrice });
//     go("listings");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 antialiased">
//       <Navbar page={page} go={go} favCount={favorites.size} />
//       <main className="flex-1">
//         {page === "home" && <HomeView favorites={favorites} toggleFav={toggleFav} openProperty={openProperty} onSearch={handleHeroSearch} go={go} />}
//         {page === "listings" && <ListingsView filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav} openProperty={openProperty} />}
//         {page === "details" && activeProperty && <DetailView key={activeProperty.id} property={activeProperty} favorites={favorites} toggleFav={toggleFav} goBack={() => go("listings")} />}
//         {page === "sell" && <SellView />}
//         {page === "agents" && <AgentsView />}
//       </main>
//       <Footer go={go} />
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import HomeView from "./views/HomeView";
import ListingsView from "./views/ListingsView";
import DetailView from "./views/DetailView";
import SellView from "./views/SellView";
import AgentsView from "./views/AgentsView";
import { PROPERTIES } from "./data";

/* ------------------------------------------------------------------ */
/*  URL SCHEME                                                         */
/*  /                       → Home                                     */
/*  /listings               → All listings (filters live in state)     */
/*  /property/3-skyline-penthouse → Property detail (id + SEO slug)    */
/*  /sell                   → Sell with Us                             */
/*  /agents                 → Our Agents                               */
/*  anything else           → 404                                      */
/* ------------------------------------------------------------------ */

const DEFAULT_FILTERS = { status: "all", location: "", types: [], beds: 0, minPrice: 0, maxPrice: 1500000, amenities: [] };

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const propertyPath = (p) => `/property/${p.id}-${slugify(p.title)}`;

/* old page ids (used by Navbar/Footer/HomeView) → real paths */
const PAGE_PATHS = { home: "/", listings: "/listings", sell: "/sell", agents: "/agents" };

const TITLES = {
  "/": "Vitosha Estates — Boutique Real Estate in Sofia",
  "/listings": "Property Listings — Vitosha Estates",
  "/sell": "Sell with Us — Vitosha Estates",
  "/agents": "Our Agents — Vitosha Estates",
};

/* Scrolls to top on every route change (browser back/forward keeps position naturally) */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
}

function NotFound() {
  useEffect(() => { document.title = "Page not found — Vitosha Estates"; }, []);
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4 py-24">
      <div className="text-center">
        <p className="text-6xl font-bold text-slate-200">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mt-4">This page doesn't exist</h1>
        <p className="text-slate-500 mt-2">The link may be outdated, or the property is no longer listed.</p>
        <Link to="/listings" className="inline-flex mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Browse all listings
        </Link>
      </div>
    </div>
  );
}

/* Resolves /property/:slug → property object; 404 if the id is unknown */
function PropertyRoute({ favorites, toggleFav }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const id = parseInt(slug, 10); // "3-skyline-penthouse" → 3
  const property = PROPERTIES.find((p) => p.id === id);

  useEffect(() => {
    if (property) document.title = `${property.title}, ${property.location} — Vitosha Estates`;
  }, [property]);

  if (!property) return <NotFound />;
  return (
    <DetailView
      key={id}
      property={property}
      favorites={favorites}
      toggleFav={toggleFav}
      goBack={() => navigate("/listings")}
    />
  );
}

function Shell() {
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const location = useLocation();
  const navigate = useNavigate();

  /* derive the active nav highlight from the URL */
  const page = Object.keys(PAGE_PATHS).find((k) => PAGE_PATHS[k] === location.pathname) || "";

  useEffect(() => {
    const t = TITLES[location.pathname];
    if (t) document.title = t;
  }, [location.pathname]);

  /* Navbar/Footer/HomeView still call go("listings") etc. — translate to navigation */
  const go = (id) => navigate(PAGE_PATHS[id] || id);

  const toggleFav = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openProperty = (p) => navigate(propertyPath(p));

  const handleHeroSearch = ({ status, location: loc, type, price }) => {
    let minPrice = 0, maxPrice = 1500000;
    if (price) {
      const [lo, hi] = price.split("-").map(Number);
      minPrice = status === "rent" ? lo * 250 : lo;
      maxPrice = status === "rent" ? Math.min(hi * 250, 99999999) : Math.min(hi, 1500000);
      maxPrice = Math.min(maxPrice, 1500000);
    }
    setFilters({ ...DEFAULT_FILTERS, status, location: loc, types: type ? [type] : [], minPrice, maxPrice });
    navigate("/listings");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 antialiased">
      <Navbar page={page} go={go} favCount={favorites.size} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeView favorites={favorites} toggleFav={toggleFav} openProperty={openProperty} onSearch={handleHeroSearch} go={go} />} />
          <Route path="/listings" element={<ListingsView filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav} openProperty={openProperty} />} />
          <Route path="/property/:slug" element={<PropertyRoute favorites={favorites} toggleFav={toggleFav} />} />
          <Route path="/sell" element={<SellView />} />
          <Route path="/agents" element={<AgentsView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer go={go} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>
  );
}
