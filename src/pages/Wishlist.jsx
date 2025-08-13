"use client"

import { useContext, useState } from "react"
import { WishlistContext } from "../contexts/WishlistContext"
import "./Wishlist.css"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("recent")

  // Sort wishlist items
  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price-low":
        return (a.price || 0) - (b.price || 0)
      case "price-high":
        return (b.price || 0) - (a.price || 0)
      case "recent":
      default:
        return new Date(b.addedAt) - new Date(a.addedAt)
    }
  })

  const handleRemoveItem = (itemId) => {
    removeFromWishlist(itemId)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      clearWishlist()
    }
  }

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: "My HomeStyler Wishlist",
        text: `Check out my wishlist with ${wishlistItems.length} amazing items!`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Wishlist link copied to clipboard!")
    }
  }

  const renderStars = (rating) => {
    if (!rating) return null
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < Math.floor(rating) ? "star filled" : "star"}>
        ★
      </span>
    ))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Your saved products and design inspirations</p>
        </div>

        <div className="empty-wishlist">
          <div className="empty-icon">♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Start browsing our products and designs to add items to your wishlist</p>
          <div className="empty-actions">
            <a href="/products" className="browse-btn">
              Browse Products
            </a>
            <a href="/design-styles" className="browse-btn secondary">
              Explore Designs
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{wishlistItems.length} items saved</p>
      </div>

      <div className="wishlist-controls">
        <div className="controls-left">
          <div className="sort-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Recently Added</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="view-toggle">
            <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
              Grid
            </button>
            <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>
              List
            </button>
          </div>
        </div>

        <div className="controls-right">
          <button className="share-btn" onClick={handleShareWishlist}>
            Share Wishlist
          </button>
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      </div>

      <div className={`wishlist-grid ${viewMode}`}>
        {sortedItems.map((item, index) => (
          <div key={item.id} className="wishlist-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="item-image">
              <img src={item.imageUrl || item.photoUrl || "/placeholder.svg"} alt={item.name} />
              <button className="remove-btn" onClick={() => handleRemoveItem(item.id)} title="Remove from wishlist">
                ×
              </button>
            </div>

            <div className="item-info">
              <div className="item-category">
                {item.category && item.subCategory
                  ? `${item.category} • ${item.subCategory}`
                  : item.specialties
                    ? item.specialties.join(", ")
                    : "Design"}
              </div>
              <h3>{item.name}</h3>
              <p className="item-description">{item.description || item.bio}</p>

              {item.rating && (
                <div className="item-rating">
                  {renderStars(item.rating)}
                  <span className="rating-value">({item.rating})</span>
                </div>
              )}

              {item.price && <div className="item-price">${item.price}</div>}
              {item.hourlyRate && <div className="item-price">${item.hourlyRate}/hour</div>}

              <div className="item-meta">
                <span className="added-date">Added {new Date(item.addedAt).toLocaleDateString()}</span>
              </div>

              <div className="item-actions">
                {item.price && <button className="add-to-cart-btn">Add to Cart</button>}
                {item.hourlyRate && <button className="contact-designer-btn">Contact Designer</button>}
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-summary">
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-number">{wishlistItems.length}</span>
            <span className="stat-label">Total Items</span>
          </div>
          <div className="stat">
            <span className="stat-number">{wishlistItems.filter((item) => item.price).length}</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">{wishlistItems.filter((item) => item.hourlyRate).length}</span>
            <span className="stat-label">Designers</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              ${wishlistItems.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}
            </span>
            <span className="stat-label">Total Value</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
