import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, money } from "../lib/api";
import "../airbnb.css";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api("/places/user-places");
      setPlaces(data.places || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm("Delete this listing?")) {
      return;
    }

    try {
      await api(`/places/${id}`, {
        method: "DELETE"
      });

      setPlaces(old =>
        old.filter(place => place._id !== id)
      );

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page-shell">

      <section className="section-heading">

        <div>
          <span className="eyebrow">
            HOST DASHBOARD
          </span>

          <h1>Your listings</h1>

          <p className="muted">
            Manage the places you've shared.
          </p>
        </div>

        <Link
          className="primary-btn button-link"
          to="/account/places/new"
        >
          Add a listing
        </Link>

      </section>

      {error && (
        <p className="error">{error}</p>
      )}

      {places.length === 0 ? (

        <div className="empty-state">
          <h3>No listings yet</h3>

          <p>
            When you publish a place,
            it will appear here.
          </p>

          <Link
            to="/account/places/new"
            className="text-link"
          >
            Create your first listing →
          </Link>
        </div>

      ) : (

        <div className="listing-grid">

          {places.map(place => (

            <article
              className="stay-card"
              key={place._id}
            >

              <Link
                to={`/place/${place._id}`}
                className="stay-photo"
              >
                <img
                  src={
                    place.photos?.[0] ||
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900"
                  }
                  alt={place.title}
                />
              </Link>

              <div className="stay-meta">
                <div>
                  <h3>{place.title}</h3>
                  <p>{place.address}</p>
                </div>
              </div>

              <p className="price">
                <b>{money(place.price)}</b>
                <span> / night</span>
              </p>

              <div className="card-actions">

                <Link
                  to={`/account/places/${place._id}/edit`}
                >
                  Edit
                </Link>

                <button
                  onClick={() => remove(place._id)}
                >
                  Delete
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}