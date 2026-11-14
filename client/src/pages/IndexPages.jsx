import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Castle, Compass, Heart, House, Search,
  SlidersHorizontal, Sparkles, TentTree, Waves, Trees, Warehouse,
} from "lucide-react";
import { api, money } from "../lib/api";
import { demoPlaces } from "../data/demoPlaces";
import "../airbnb.css";

const categories = [
  { name: "All homes", Icon: House },
  { name: "Amazing views", Icon: Sparkles, terms: /view|mountain|lake|valley|sea/i },
  { name: "Beachfront", Icon: Waves, terms: /beach|sea|ocean|coast/i },
  { name: "Cabins", Icon: TentTree, terms: /cabin|cottage|lodge|hut/i },
  { name: "Countryside", Icon: Trees, terms: /farm|country|rural|village/i },
  { name: "Design", Icon: Warehouse, terms: /design|architect|modern|loft/i },
  { name: "Historic", Icon: Castle, terms: /historic|heritage|castle|old/i },
];

const fallback = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900";

export default function IndexPages() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All homes");
  const [favorites, setFavorites] = useState(() => new Set(JSON.parse(localStorage.getItem("staybnbFavorites") || "[]")));
  const [loading, setLoading] = useState(true);
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  async function loadPlaces(term = "") {
    setLoading(true);
    try {
      const data = await api(`/places${term ? `?search=${encodeURIComponent(term)}` : ""}`);
      if (data.places?.length) {
        setPlaces(data.places);
        setShowDemoNotice(false);
      } else {
        const sampleResults = term
          ? demoPlaces.filter((place) => `${place.title} ${place.address} ${place.description}`.toLowerCase().includes(term.toLowerCase()))
          : demoPlaces;
        setPlaces(sampleResults);
        setShowDemoNotice(true);
      }
    } catch (err) {
      const sampleResults = term
        ? demoPlaces.filter((place) => `${place.title} ${place.address} ${place.description}`.toLowerCase().includes(term.toLowerCase()))
        : demoPlaces;
      setPlaces(sampleResults);
      setShowDemoNotice(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPlaces(); }, []);

  const selectedCategory = categories.find(({ name }) => name === activeCategory);
  const visiblePlaces = useMemo(() => {
    if (!selectedCategory?.terms) return places;
    return places.filter((place) => selectedCategory.terms.test(
      `${place.title || ""} ${place.address || ""} ${place.description || ""}`
    ));
  }, [places, selectedCategory]);

  function handleSearch(event) {
    event.preventDefault();
    setActiveCategory("All homes");
    loadPlaces(search.trim());
  }

  function toggleFavorite(event, id) {
    event.preventDefault();
    event.stopPropagation();
    setFavorites((previous) => {
      const next = new Set(previous);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("staybnbFavorites", JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <main className="catalog-shell">
      <div className="category-bar" aria-label="Browse by category">
        <div className="category-list">
          {categories.map(({ name, Icon }) => (
            <button
              className={`category-item${activeCategory === name ? " is-active" : ""}`}
              key={name}
              type="button"
              aria-pressed={activeCategory === name}
              onClick={() => setActiveCategory(name)}
            >
              <Icon size={23} strokeWidth={1.6} />
              <span>{name}</span>
            </button>
          ))}
        </div>
        <button className="filter-button" type="button" onClick={() => setActiveCategory("All homes")}>
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <section className="catalog-results" aria-live="polite">
        <div className="catalog-heading">
          <h1>{search ? `Stays near “${search}”` : "Places to stay"}</h1>
          <Link className="host-link" to="/places">Your listings <ArrowRight size={14} /></Link>
        </div>

        {showDemoNotice && <p className="demo-notice">Sample stays are shown. Connect the server to use live listings and bookings.</p>}
        {loading ? (
          <div className="listing-grid" aria-label="Loading stays">
            {Array.from({ length: 8 }, (_, index) => <div className="stay-skeleton" key={index}><div /><span /><span /></div>)}
          </div>
        ) : visiblePlaces.length === 0 ? (
          <div className="empty-state">
            <Compass size={30} strokeWidth={1.5} />
            <h3>No stays found</h3>
            <p>{places.length ? "Try another category or browse all homes." : "New places to stay will show up here."}</p>
            {places.length > 0 && <button className="clear-category" onClick={() => setActiveCategory("All homes")}>Show all homes</button>}
          </div>
        ) : (
          <div className="listing-grid">
            {visiblePlaces.map((place) => (
              <Link className="stay-card" to={`/place/${place._id}`} key={place._id}>
                <div className="stay-photo">
                  <img src={place.photos?.[0] || fallback} alt={place.title || "Stay"} loading="lazy" />
                  <span className="photo-tag">Guest favourite</span>
                  <button
                    className={`favorite-button${favorites.has(place._id) ? " is-favorite" : ""}`}
                    type="button"
                    aria-label={favorites.has(place._id) ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={favorites.has(place._id)}
                    onClick={(event) => toggleFavorite(event, place._id)}
                  ><Heart size={23} strokeWidth={1.8} fill={favorites.has(place._id) ? "#ff385c" : "#00000080"} /></button>
                  <span className="image-next" aria-hidden="true"><ArrowRight size={14} /></span>
                </div>
                <div className="stay-meta">
                  <div className="stay-copy">
                    <h2>{place.title}</h2>
                    <p>{place.address}</p>
                    <p className="stay-date">Available now</p>
                    <p className="price"><b>{money(place.price)}</b><span> night</span></p>
                  </div>
                  <span className="stay-rating">★ <span>4.9</span></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <form className="mobile-search" onSubmit={handleSearch}>
        <Search size={18} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Where to?" aria-label="Search destinations" />
        <button type="submit" aria-label="Search"><Search size={17} /></button>
      </form>
    </main>
  );
}
