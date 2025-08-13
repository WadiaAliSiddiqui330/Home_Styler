"use client"

import { useState, useEffect, useContext } from "react"
import { WishlistContext } from "../contexts/WishlistContext"
import { SearchContext } from "../contexts/SearchContext"
import designsData from "../data/designs.json"
import "./DesignStyles.css"
import bgImage from "../assets/banner2.jpeg" // <-- place your image in assets
import { Link } from "react-router-dom"

const DesignStyles = () => {
  const [designs, setDesigns] = useState(designsData.designs)
  const [filteredDesigns, setFilteredDesigns] = useState(designsData.designs)
  const [selectedStyle, setSelectedStyle] = useState("All")
  const [selectedRoom, setSelectedRoom] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")

  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  const { searchTerm } = useContext(SearchContext)

  // Get unique styles and room types
  const styles = ["All", ...new Set(designs.map((d) => d.style))]
  const roomTypes = ["All", ...new Set(designs.map((d) => d.roomType))]

  // Filter and sort designs
  useEffect(() => {
    let filtered = designs

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (design) =>
          design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          design.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
          design.roomType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by style
    if (selectedStyle !== "All") {
      filtered = filtered.filter((design) => design.style === selectedStyle)
    }

    // Filter by room type
    if (selectedRoom !== "All") {
      filtered = filtered.filter((design) => design.roomType === selectedRoom)
    }

    // Filter by price range
    filtered = filtered.filter((design) => design.cost >= priceRange[0] && design.cost <= priceRange[1])

    // Sort designs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.cost - b.cost
        case "price-high":
          return b.cost - a.cost
        case "style":
          return a.style.localeCompare(b.style)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredDesigns(filtered)
  }, [designs, selectedStyle, selectedRoom, priceRange, sortBy, searchTerm])

  const handleWishlistToggle = (design) => {
    const isInWishlist = wishlist.some((item) => item.id === design.id)
    if (isInWishlist) {
      removeFromWishlist(design.id)
    } else {
      addToWishlist(design)
    }
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
   
    <div className="design-styles">
      <div className="design-styles-header">
        <h1>Design Styles</h1>
        <p>Explore our curated collection of interior design styles and find inspiration for your space</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Style</label>
          <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Room Type</label>
          <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
            {roomTypes.map((room) => (
              <option key={room} value={room}>
                {room}
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
            <option value="style">Style</option>
          </select>
        </div>

        <div className="filter-group">
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="3000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
            />
            <input
              type="range"
              min="0"
              max="3000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            />
          </div>
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

      <div className="results-info">
        <p>{filteredDesigns.length} designs found</p>
      </div>

      <div className={`designs-container ${viewMode}`}>
        {filteredDesigns.map((design, index) => (
          <div key={design.id} className="design-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="design-image">
              <img src={design.imageUrl || "/placeholder.svg"} alt={design.name} />
              <div className="design-overlay">
                <button className="view-details-btn">View Details</button>
              </div>
            </div>

            <div className="design-info">
              <div className="design-category">{design.roomType}</div>
              <div className="design-style">{design.style}</div>
              <h3>{design.name}</h3>
              <p className="design-description">{design.description}</p>

              <div className="design-meta">
                <div className="design-price">${design.cost}</div>
              </div>

              <button
                className={`wishlist-btn ${wishlist.some((item) => item.id === design.id) ? "active" : ""}`}
                onClick={() => handleWishlistToggle(design)}
              >
                {wishlist.some((item) => item.id === design.id) ? "♥ In Wishlist" : "♡ Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="no-results">
          <h3>No designs found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
   </>
  )
}

export default DesignStyles
