import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import './Header.css';
function Header({ searchTerm, onSearchChange, cartCount, role, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">OneStopShop</Link>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          &#9776; {/* Hamburger icon */}
        </button>

        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />

        <nav role="navigation" aria-label="Main navigation">
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            {isLoggedIn && role === "admin" && (
              <li>
                <Link to="/add-product" onClick={() => setMenuOpen(false)}>
                  Add Product
                </Link>
              </li>
            )}
            {!isLoggedIn ? (
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
            ) : (
              <li
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userRole");
                  window.location.reload(); 
                }}
              >
                Logout
              </li>
            )}
          </ul>
        </nav>

        <Link to="/cart" className="cart">
          🛒 Cart: <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
