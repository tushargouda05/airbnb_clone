import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useUser } from "../providers/UserProvider";
import "../airbnb.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
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
      const data = await api("/user/register", {
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
          JOIN THE COMMUNITY
        </span>

        <h1>Create an account</h1>

        <p className="muted">
          Sign up to book stays and share your space.
        </p>

        {error && (
          <p className="error">{error}</p>
        )}

        <label>
          Full name

          <input
            name="name"
            value={form.name}
            onChange={change}
            required
          />
        </label>

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
            minLength="6"
            required
          />
        </label>

        <button
          className="primary-btn full"
          disabled={busy}
        >
          {busy ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-foot">
          Already have an account?
          <Link to="/login"> Log in</Link>
        </p>

      </form>

    </main>
  );
}
