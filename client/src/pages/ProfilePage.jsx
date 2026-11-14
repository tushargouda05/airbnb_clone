import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, money } from "../lib/api";
import { useUser } from "../providers/UserProvider";
import "../airbnb.css";

export default function ProfilePage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const navigate = useNavigate();
  const { logout: clearSession } = useUser();

  useEffect(() => {
    api("/bookings/get-bookings")
      .then(data => {
        const demoBookings = JSON.parse(localStorage.getItem("demoBookings") || "[]");
        setBookings([...(data.bookings || []), ...demoBookings]);
      })
      .catch(err => {
        const demoBookings = JSON.parse(localStorage.getItem("demoBookings") || "[]");
        setBookings(demoBookings);
        if (!demoBookings.length) setError(err.message);
      });
  }, []);

  function logout() {
    clearSession().finally(() => navigate("/"));
  }

  return (
    <main className="page-shell narrow">

      <section className="profile-head">

        <div className="avatar">
          {user?.name?.[0]?.toUpperCase() || "G"}
        </div>

        <div>
          <span className="eyebrow">
            YOUR ACCOUNT
          </span>

          <h1>
            {user?.name || "Your profile"}
          </h1>

          <p className="muted">
            {user?.email || "Manage your stays and listings."}
          </p>
        </div>

      </section>

      <div className="profile-links">

        <Link to="/account/places">
          Manage your listings →
        </Link>

        <Link to="/account/places/new">
          Add a new place →
        </Link>

        <button onClick={logout}>
          Log out
        </button>

      </div>

      <section className="section-heading">
        <div>
          <span className="eyebrow">
            TRAVEL HISTORY
          </span>

          <h2>Your bookings</h2>
        </div>
      </section>

      {error && (
        <p className="error">{error}</p>
      )}

      {bookings.length === 0 ? (

        <div className="empty-state">

          <p>
            No bookings yet.
            Find a stay for your next trip.
          </p>

          <Link
            to="/"
            className="text-link"
          >
            Explore stays →
          </Link>

        </div>

      ) : (

        <div className="booking-list">

          {bookings.map(booking => (

            <article
              className="booking-row"
              key={booking._id}
            >

              <img
                src={
                  booking.place?.photos?.[0] ||
                  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500"
                }
                alt={booking.place?.title || "Booked place"}
              />

              <div>

                <h3>
                  {booking.place?.title || "Booked place"}
                </h3>

                <p>
                  {new Date(booking.checkIn).toLocaleDateString()}
                  {" – "}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>

                <b>{money(booking.price)}</b>

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}
