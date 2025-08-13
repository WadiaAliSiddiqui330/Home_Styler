"use client"

import { useState, useEffect, useContext } from "react"
import { WishlistContext } from "../contexts/WishlistContext"
import { SearchContext } from "../contexts/SearchContext"
import productsData from "../data/products.json"
import "./Products.css"
import Hero from "../components/Hero"
import bgImage from "../assets/banner2.jpeg" // <-- place your image in assets
import { Link } from "react-router-dom"

const Products = () => {
  const [products, setProducts] = useState(productsData.products)
  const [filteredProducts, setFilteredProducts] = useState(productsData.products)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubCategory, setSelectedSubCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [minRating, setMinRating] = useState(0)

  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  const { searchTerm } = useContext(SearchContext)

  // Get unique categories and subcategories
  const categories = ["All", ...new Set(products.map((p) => p.category))]
  const subCategories =
    selectedCategory === "All"
      ? ["All", ...new Set(products.map((p) => p.subCategory))]
      : ["All", ...new Set(products.filter((p) => p.category === selectedCategory).map((p) => p.subCategory))]

  // Filter and sort products
  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by subcategory
    if (selectedSubCategory !== "All") {
      filtered = filtered.filter((product) => product.subCategory === selectedSubCategory)
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by rating
    filtered = filtered.filter((product) => product.rating >= minRating)

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, selectedSubCategory, sortBy, priceRange, minRating, searchTerm])

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id)
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < Math.floor(rating) ? "star filled" : "star"}>
        ★
      </span>
    ))
  }

  return (
    <>
    
     <section
          className="banner-section"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          {/* Overlay */}
          <div className="banner-overlay"></div>
    
          {/* Content */}
          <div className="container banner-content">
            <h1 className="banner-title">Transform Your Living Space</h1>
            <p className="banner-slogan">Beautiful Designs. Timeless Comfort.</p>
            <div className="banner-actions">
              <Link to="/designs" className="btn btn-primary">
                Explore Designs
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </section>
    <div className="products-page">
      
      <div className="products-content">
        <div className="products-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setSelectedSubCategory("All")
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Subcategory</label>
              <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
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

          <div className="filter-row">
            <div className="filter-group">
              <label>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                />
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(Number.parseFloat(e.target.value))}>
                <option value="0">All Ratings</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        <div className="products-results">
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className={`products-grid ${viewMode}`}>
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="product-image">
                <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} />
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>

              <div className="product-info">
                <div className="product-category">
                  {product.category} • {product.subCategory}
                </div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="rating-value">({product.rating})</span>
                </div>

                <div className="product-price">${product.price}</div>

                <div className="product-actions">
                  <button
                    className={`wishlist-btn ${wishlist.some((item) => item.id === product.id) ? "active" : ""}`}
                    onClick={() => handleWishlistToggle(product)}
                  >
                    {wishlist.some((item) => item.id === product.id) ? "♥ In Wishlist" : "♡ Add to Wishlist"}
                  </button>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
    
    </>
    
  )
}

export default Products
