"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useWishlist } from "../contexts/WishlistContext"
import SearchBar from "./SearchBar"
import "./Navigation.css"
import { FaSearch } from "react-icons/fa";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const { wishlistCount } = useWishlist()

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/design-styles", label: "Design Styles" },
    { path: "/products", label: "Products" },
    { path: "/designers", label: "Designers" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/feedback", label: "Feedback" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-content">
            <Link to="/" className="logo">
              <h2>HomeStyler</h2>
            </Link>

            <div className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {item.path === "/wishlist" && wishlistCount > 0 && (
                    <span className="wishlist-badge">{wishlistCount}</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="nav-actions">
              <button className="search-button" onClick={() => setIsSearchOpen(true)} aria-label="Open search">
                <FaSearch />

              </button>

              <button
                className="nav-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Navigation
