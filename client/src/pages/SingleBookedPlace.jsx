import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, money } from "../lib/api";
import { findDemoPlace } from "../data/demoPlaces";
import "../airbnb.css";

export default function SingleBookedPlace() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    name: "",
    phone: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const demoPlace = findDemoPlace(id);
    if (demoPlace) {
      setPlace(demoPlace);
      return;
    }
    api(`/places/${id}`)
      .then(data => setPlace(data.place))
      .catch(err => setError(err.message));
  }, [id]);

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.checkOut) -
              new Date(form.checkIn)) /
              86400000
          )
        )
      : 0;

  async function book(e) {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      if (place.isDemo) {
        const saved = JSON.parse(localStorage.getItem("demoBookings") || "[]");
        saved.unshift({
          _id: `demo-booking-${Date.now()}`,
          place,
          ...form,
          price: place.price * nights,
        });
        localStorage.setItem("demoBookings", JSON.stringify(saved));
        window.alert("Demo reservation saved to your account.");
        setForm({ checkIn: "", checkOut: "", name: "", phone: "" });
        return;
      }
      await api("/bookings/create-booking", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          place: id
        })
      });

      alert("Booking request created successfully!");

      setForm({
        checkIn: "",
        checkOut: "",
        name: "",
        phone: ""
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!place) {
    return (
      <main className="page-shell">
        {error || "Loading place..."}
      </main>
    );
  }

  return (
    <main className="page-shell detail-page">

      <Link to="/" className="text-link">
        ← Back to stays
      </Link>

      <div className="detail-title">

        <div>
          <h1>{place.title}</h1>
          <p className="muted">{place.address}</p>
        </div>

        <span>★ Guest favourite</span>

      </div>

      <div className="gallery">

        {(place.photos?.length
          ? place.photos
          : [
              "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200"
            ]
        )
          .slice(0, 5)
          .map((photo, index) => (

            <img
              key={index}
              src={photo}
              alt={`${place.title} ${index + 1}`}
            />

          ))}

      </div>

      <div className="detail-columns">

        <section>

          <h2>About this place</h2>

          <p>
            {place.description ||
              "A welcoming place for your next getaway."}
          </p>

          <p className="muted">
            {place.maxGuests} guests
            {" · "}
            Check-in {place.checkIn || "—"}
            {" · "}
            Check-out {place.checkOut || "—"}
          </p>

          <hr />

          <h2>What this place offers</h2>

          <div className="perks">

            {(place.perks || []).map(perk => (
              <span key={perk}>
                {perk}
              </span>
            ))}

          </div>

          {place.extraInfo && (
            <>
              <hr />

              <h2>Good to know</h2>

              <p>{place.extraInfo}</p>
            </>
          )}

        </section>

        <form
          className="booking-card"
          onSubmit={book}
        >

          <h2>
            {money(place.price)}
            <small> / night</small>
          </h2>

          {error && (
            <p className="error">{error}</p>
          )}

          <div className="form-row">

            <label>
              Check-in

              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={form.checkIn}
                onChange={e =>
                  setForm({
                    ...form,
                    checkIn: e.target.value
                  })
                }
                required
              />
            </label>

            <label>
              Check-out

              <input
                type="date"
                min={
                  form.checkIn ||
                  new Date().toISOString().slice(0, 10)
                }
                value={form.checkOut}
                onChange={e =>
                  setForm({
                    ...form,
                    checkOut: e.target.value
                  })
                }
                required
              />
            </label>

          </div>

          <label>
            Your name

            <input
              value={form.name}
              onChange={e =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              required
            />
          </label>

          <label>
            Phone number

            <input
              type="tel"
              value={form.phone}
              onChange={e =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
              required
            />
          </label>

          <button
            className="primary-btn full"
            disabled={busy}
          >
            {busy ? "Booking..." : "Reserve"}
          </button>

          <p className="muted center">
            {place.isDemo ? "Demo stay · reservation saved on this device." : "You won't be charged in this demo."}
          </p>

          {nights > 0 && (
            <div className="total-line">

              <span>
                {money(place.price)} × {nights} nights
              </span>

              <b>
                {money(place.price * nights)}
              </b>

            </div>
          )}

        </form>

      </div>

    </main>
  );
}
