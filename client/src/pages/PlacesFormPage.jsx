import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import { api } from "../lib/api";
import "../airbnb.css";

export default function PlacesFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/places/${id}`)
      .then(data => {
        const p = data.place;

        setForm({
          title: p.title || "",
          address: p.address || "",
          photos: (p.photos || []).join("\n"),
          description: p.description || "",
          perks: (p.perks || []).join(", "),
          extraInfo: p.extraInfo || "",
          checkIn: p.checkIn || "",
          checkOut: p.checkOut || "",
          maxGuests: p.maxGuests || 1,
          price: p.price ?? ""
        });
      })
      .catch(err => setError(err.message));

  }, [id]);

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

      await api(`/places/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });

      navigate("/places");

    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!form) {
    return (
      <main className="form-page">
        <p>{error || "Loading listing..."}</p>
      </main>
    );
  }

  const fields = {
    title: "Title",
    address: "Address",
    photos: "Photo URLs",
    description: "Description",
    perks: "Amenities",
    extraInfo: "Additional information",
    checkIn: "Check-in",
    checkOut: "Check-out",
    maxGuests: "Maximum guests",
    price: "Price per night"
  };

  return (
    <main className="form-page">

      <div className="form-intro">
        <span className="eyebrow">
          HOST TOOLS
        </span>

        <h1>Edit your listing</h1>
      </div>

      <form
        className="panel-form"
        onSubmit={submit}
      >

        {error && (
          <p className="error">{error}</p>
        )}

        {Object.entries(fields).map(([key, label]) => (

          <label key={key}>
            {label}

            {[
              "photos",
              "description",
              "extraInfo"
            ].includes(key) ? (

              <textarea
                rows="3"
                name={key}
                value={form[key]}
                onChange={change}
              />

            ) : (

              <input
                type={
                  ["maxGuests", "price"].includes(key)
                    ? "number"
                    : ["checkIn", "checkOut"].includes(key)
                    ? "time"
                    : "text"
                }
                name={key}
                value={form[key]}
                onChange={change}
                required={[
                  "title",
                  "address",
                  "price"
                ].includes(key)}
              />

            )}

          </label>

        ))}

        <button
          className="primary-btn full"
          disabled={busy}
        >
          {busy ? "Saving..." : "Save changes"}
        </button>

      </form>

    </main>
  );
}