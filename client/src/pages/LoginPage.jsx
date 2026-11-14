import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useUser } from "../providers/UserProvider";
import "../airbnb.css";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

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
      const data = await api("/user/login", {
        method: "POST",
        body: JSON.stringify(form)
      });

      if (data.user) login(data.user, data.token);
      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-wrap">

      <form className="auth-card" onSubmit={submit}>

        <span className="eyebrow">
          WELCOME BACK
        </span>

        <h1>Log in</h1>

        <p className="muted">
          Your next stay is just around the corner.
        </p>

        {error && (
          <p className="error">{error}</p>
        )}

        <label>
          Email address

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            required
          />
        </label>

        <label>
          Password

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            required
          />
        </label>

        <button
          className="primary-btn full"
          disabled={busy}
        >
          {busy ? "Logging in..." : "Continue"}
        </button>

        <p className="auth-foot">
          Don't have an account?
          <Link to="/register"> Sign up</Link>
        </p>

      </form>

    </main>
  );
}
