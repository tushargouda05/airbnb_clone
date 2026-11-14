import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  UserRound,
  Heart,
} from "lucide-react";
import { useUser } from "../../providers/UserProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-inner">

        <Link
          to="/"
          className="brand"
        >
          <Heart className="brand-mark" size={29} fill="currentColor" strokeWidth={1.7} />
          staybnb
        </Link>

        <Link
          to="/"
          className="header-search"
        >
          <span className="search-segment search-location">Anywhere</span>
          <span className="search-segment search-dates">
            Any week
          </span>
          <span className="search-segment search-guests">
            Add guests
          </span>
          <span className="search-icon">
            <Search size={16} />
          </span>
        </Link>

        <div className="header-actions">

          <Link
            to="/account/places/new"
            className="host-link"
          >
            Become a host
          </Link>

          <button type="button" className="account-link" aria-label="Open account menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <Menu size={19} />
            {user?.picture ? <img className="account-avatar" src={user.picture} alt="" /> : <UserRound size={19} />}
          </button>
          {menuOpen && <div className="account-menu">
            {user ? <>
              <Link to="/account" onClick={() => setMenuOpen(false)}>My account</Link>
              <Link to="/places" onClick={() => setMenuOpen(false)}>Your listings</Link>
              <button type="button" onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}>Log out</button>
            </> : <>
              <Link className="menu-strong" to="/register" onClick={() => setMenuOpen(false)}>Sign up</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/account/places/new" onClick={() => setMenuOpen(false)}>Host your place</Link>
            </>}
          </div>}

        </div>

      </div>
    </header>
  );
}
