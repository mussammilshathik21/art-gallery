import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

import "../css/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const { favorites } = useFavorites();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  /* ================================
     CLOSE MENU
  ================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* ================================
     HOME
  ================================= */

  const goHome = () => {
    closeMenu();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };


  /* ================================
     HOME SECTIONS
  ================================= */

  const goToHomeSection = (sectionId) => {
    closeMenu();

    if (location.pathname === "/") {
      const section =
        document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate("/");

    setTimeout(() => {
      const section =
        document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };


  /* ================================
     PAGE NAVIGATION
  ================================= */

  const goToPage = (path) => {
    closeMenu();

    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* ================================
     LOGOUT
  ================================= */

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };


  /* ================================
     SEARCH
  ================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchText.trim();

    if (!value) return;

    navigate(
      `/gallery?search=${encodeURIComponent(value)}`
    );

    setSearchText("");

    closeMenu();
  };


  return (
    <header className="navbar">

      <div className="navbar-container">


        {/* ================================
            BRAND
        ================================= */}

        <button
          className="navbar-brand"
          onClick={goHome}
        >
          ARTS
          <span>GALLERY</span>
        </button>


        {/* ================================
            DESKTOP NAVIGATION
        ================================= */}

        <nav className="navbar-links">

          <button onClick={goHome}>
            Home
          </button>

          <button
            onClick={() =>
              goToPage("/gallery")
            }
          >
            Gallery
          </button>

          <button
            onClick={() =>
              goToHomeSection("artist")
            }
          >
            Artist
          </button>

          <button
            onClick={() =>
              goToHomeSection("about")
            }
          >
            About
          </button>

          <button
            onClick={() =>
              goToHomeSection("contact")
            }
          >
            Contact
          </button>

          {isAdmin && (
            <button
              onClick={() =>
                goToPage("/admin")
              }
            >
              Admin
            </button>
          )}

        </nav>


        {/* ================================
            DESKTOP SEARCH
        ================================= */}

        <form
          className="navbar-search desktop-search"
          onSubmit={handleSearch}
        >

          <Search size={18} />

          <input
            type="text"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            placeholder="Search artworks..."
          />

        </form>


        {/* ================================
            ACTIONS
        ================================= */}

        <div className="navbar-actions">

          {/* FAVORITES */}

          <button
            className="navbar-action"
            onClick={() =>
              goToPage("/favorites")
            }
            aria-label="Favorites"
          >
            <Heart size={20} />

            {favorites.length > 0 && (
              <span className="navbar-badge">
                {favorites.length}
              </span>
            )}
          </button>


          {/* CART */}

          <button
            className="navbar-action"
            onClick={() =>
              goToPage("/cart")
            }
            aria-label="Cart"
          >
            <ShoppingBag size={20} />

            {itemCount > 0 && (
              <span className="navbar-badge">
                {itemCount}
              </span>
            )}
          </button>


          {/* PROFILE */}

          <button
            className="navbar-action"
            onClick={() =>
              goToPage("/profile")
            }
            aria-label="Profile"
          >
            <User size={20} />
          </button>


          {/* LOGOUT (desktop, only when logged in) */}

          {isAuthenticated && (
            <button
              className="navbar-action navbar-logout-desktop"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={19} />
            </button>
          )}


          {/* MOBILE MENU */}

          <button
            className="navbar-menu"
            onClick={() =>
              setMenuOpen(
                (previous) => !previous
              )
            }
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

      </div>


      {/* ================================
          MOBILE SEARCH
      ================================= */}

      <form
        className="navbar-search mobile-search"
        onSubmit={handleSearch}
      >

        <Search size={18} />

        <input
          type="text"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          placeholder="Search artworks..."
        />

      </form>


      {/* ================================
          MOBILE MENU
      ================================= */}

      {menuOpen && (

        <div className="mobile-menu">

          <button onClick={goHome}>
            Home
          </button>

          <button
            onClick={() =>
              goToPage("/gallery")
            }
          >
            Gallery
          </button>

          <button
            onClick={() =>
              goToHomeSection("artist")
            }
          >
            Artist
          </button>

          <button
            onClick={() =>
              goToHomeSection("about")
            }
          >
            About
          </button>

          <button
            onClick={() =>
              goToHomeSection("contact")
            }
          >
            Contact
          </button>


          <div className="mobile-menu-divider" />


          <button
            onClick={() =>
              goToPage("/favorites")
            }
          >
            <Heart size={17} />
            Favorites
          </button>


          <button
            onClick={() =>
              goToPage("/cart")
            }
          >
            <ShoppingBag size={17} />
            Cart
          </button>


          <button
            onClick={() =>
              goToPage("/profile")
            }
          >
            <User size={17} />
            Profile
          </button>


          {isAdmin && (
            <button
              onClick={() =>
                goToPage("/admin")
              }
            >
              <LayoutDashboard size={17} />
              Admin Dashboard
            </button>
          )}


          {isAuthenticated ? (
            <button onClick={handleLogout}>
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <button
              onClick={() =>
                goToPage("/login")
              }
            >
              <User size={17} />
              Login
            </button>
          )}

        </div>

      )}

    </header>
  );
}

export default Navbar;
