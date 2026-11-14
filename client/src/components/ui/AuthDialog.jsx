import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { api } from "../../lib/api";
import { useUser } from "../../providers/UserProvider";

export default function AuthDialog({ mode = "login" }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const { login } = useUser();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") navigate("/");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api(`/user/${isRegister ? "register" : "login"}`, {
        method: "POST",
        body: JSON.stringify(isRegister ? form : { email: form.email, password: form.password }),
      });
      if (data.user) login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "We couldn't sign you in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) navigate("/"); }}>
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="auth-dialog-top">
          <button type="button" className="auth-close" aria-label="Close" onClick={() => navigate("/")}><X size={18} /></button>
          <h2>{isRegister ? "Finish signing up" : "Log in or sign up"}</h2>
          <span />
        </div>
        <form className="auth-form" onSubmit={submit}>
          <h1 id="auth-title">Welcome to Staybnb</h1>
          <p className="auth-subtitle">{isRegister ? "Create an account to start planning your next stay." : "Log in to book your next stay or host a place."}</p>
          {error && <p className="error" role="alert">{error}</p>}
          {isRegister && <label>Full name<input name="name" value={form.name} onChange={change} autoComplete="name" placeholder="Your name" required /></label>}
          <label>Email<input name="email" type="email" value={form.email} onChange={change} autoComplete="email" placeholder="Email address" required /></label>
          <label>Password<input name="password" type="password" value={form.password} onChange={change} autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 6 : undefined} placeholder="Password" required /></label>
          <p className="auth-terms">We'll send booking updates and account information to this email.</p>
          <button className="primary-btn full" disabled={busy}>{busy ? "Please wait…" : isRegister ? "Continue" : "Continue"}</button>
          <p className="auth-switch">{isRegister ? "Already have an account?" : "New to Staybnb?"} <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Log in" : "Create an account"}</Link></p>
        </form>
      </section>
    </div>
  );
}
