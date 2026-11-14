import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import "../airbnb.css";

const initial = {
  title: "",
  address: "",
  photos: "",
  description: "",
  perks: "",
  extraInfo: "",
  checkIn: "14:00",
  checkOut: "11:00",
  maxGuests: 2,
  price: ""
};

export default function PlacePage() {
  const [form, setForm] = useState(initial);

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function submit(e) {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      const payload = {
        ...form,

        photos: form.photos
          .split("\n")
          .map(x => x.trim())
          .filter(Boolean),

        perks: form.perks
          .split(",")
          .map(x => x.trim())
          .filter(Boolean),

        maxGuests: Number(form.maxGuests),
        price: Number(form.price)
      };

      await api("/places", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      navigate("/places");

    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="form-page">

      <div className="form-intro">
        <span className="eyebrow">
          BECOME A HOST
        </span>

        <h1>Share your place</h1>

        <p className="muted">
          Add the details guests need to imagine their stay.
        </p>
      </div>

      <form
        className="panel-form"
        onSubmit={submit}
      >

        {error && (
          <p className="error">{error}</p>
        )}

        <label>
          Listing title

          <input
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Sunny apartment near the beach"
            required
          />
        </label>

        <label>
          Address

          <input
            name="address"
            value={form.address}
            onChange={change}
            placeholder="Area, city, country"
            required
          />
        </label>

        <label>
          Photo URLs
          <small>One URL per line</small>

          <textarea
            name="photos"
            value={form.photos}
            onChange={change}
            rows="3"
            placeholder="https://..."
          />
        </label>

        <label>
          Description

          <textarea
            name="description"
            value={form.description}
            onChange={change}
            rows="4"
            placeholder="Describe your property..."
          />
        </label>

        <label>
          Amenities / Perks
          <small>Separate with commas</small>

          <input
            name="perks"
            value={form.perks}
            onChange={change}
            placeholder="Wi-Fi, Kitchen, Parking"
          />
        </label>

        <label>
          Additional information

          <textarea
            name="extraInfo"
            value={form.extraInfo}
            onChange={change}
            rows="3"
          />
        </label>

        <div className="form-row">

          <label>
            Check-in

            <input
              type="time"
              name="checkIn"
              value={form.checkIn}
              onChange={change}
            />
          </label>

          <label>
            Check-out

            <input
              type="time"
              name="checkOut"
              value={form.checkOut}
              onChange={change}
            />
          </label>

        </div>

        <div className="form-row">

          <label>
            Maximum guests

            <input
              type="number"
              min="1"
              name="maxGuests"
              value={form.maxGuests}
              onChange={change}
              required
            />
          </label>

          <label>
            Price per night (₹)

            <input
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={change}
              required
            />
          </label>

        </div>

        <button
          className="primary-btn full"
          disabled={busy}
        >
          {busy ? "Publishing..." : "Publish listing"}
        </button>

      </form>

    </main>
  );
}