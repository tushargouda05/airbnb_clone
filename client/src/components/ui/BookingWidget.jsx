import { useState } from "react";
import { api, money } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export default function BookingWidget({
  place
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              86400000
          )
        )
      : 0;

  async function handleBooking(e) {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (nights <= 0) {
      setError("Please select valid dates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api("/bookings/create-booking", {
        method: "POST",
        body: JSON.stringify({
          place: place._id,
          checkIn,
          checkOut,
          name,
          phone
        })
      });

      alert("Booking successful!");

      navigate("/account");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-5">
        {money(place.price)}
        <span className="text-sm font-normal text-gray-500">
          {" "} / night
        </span>
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      <form
        onSubmit={handleBooking}
        className="space-y-4"
      >

        <label className="block">
          <span className="text-sm font-medium">
            Check-in
          </span>

          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().slice(0, 10)}
            onChange={e => setCheckIn(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Check-out
          </span>

          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().slice(0, 10)}
            onChange={e => setCheckOut(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Your name
          </span>

          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Phone number
          </span>

          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mt-1"
          />
        </label>

        <button
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-lg py-3 font-semibold"
        >
          {loading ? "Booking..." : "Reserve"}
        </button>

      </form>

      {nights > 0 && (
        <div className="border-t mt-5 pt-4 flex justify-between">
          <span>
            {money(place.price)} × {nights} nights
          </span>

          <b>
            {money(place.price * nights)}
          </b>
        </div>
      )}

    </div>
  );
}