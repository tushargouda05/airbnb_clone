import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-inner">

        <div className="footer-columns">

          <div>
            <h3 className="font-bold text-lg mb-3">
              Staybnb
            </h3>

            <p className="text-sm text-gray-500">
              Find unique places to stay and
              make every journey memorable.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Explore
            </h3>

            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/places">Your listings</Link>
              <Link to="/account">My account</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Hosting
            </h3>

            <div className="footer-links">
              <Link to="/account/places/new">
                Become a host
              </Link>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Staybnb. All rights reserved.
        </div>

      </div>

    </footer>
  );
}
