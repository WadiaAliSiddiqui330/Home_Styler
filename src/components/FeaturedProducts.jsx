"use client"

import { Link } from "react-router-dom"
import { useWishlist } from "../contexts/WishlistContext"
import "./FeaturedProducts.css"

const FeaturedProducts = ({ products }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star star-full">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star star-half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star star-empty">
          ☆
        </span>,
      )
    }

    return stars
  }

  return (
    <section className="featured-products section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Featured Products</h2>
          <p>Discover our handpicked selection of premium furniture and decor</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="product-image">
                <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} />
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? "wishlist-btn-active" : ""}`}
                  onClick={() => handleWishlistToggle(product)}
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  ♥
                </button>
                <div className="product-overlay">
                  <Link to="/products" className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="rating-text">({product.rating})</span>
                </div>
                <div className="product-price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-cta text-center">
          <Link to="/products" className="btn btn-secondary">
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
