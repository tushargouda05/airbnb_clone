import { Link } from "react-router-dom";
import "../airbnb.css";

export default function NotFoundPage() {
  return (
    <main className="empty-state not-found">

      <span className="eyebrow">
        404 ERROR
      </span>

      <h1>Looks like you're lost.</h1>

      <p className="muted">
        The page you're looking for doesn't exist
        or may have moved.
      </p>

      <Link
        className="primary-btn button-link"
        to="/"
      >
        Back to home
      </Link>

    </main>
  );
}