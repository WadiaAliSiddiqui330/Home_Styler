"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./FeaturedGallery.css"

const FeaturedGallery = ({ designs }) => {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Living Room", "Kitchen", "Bedroom", "Bathroom", "Dining Room", "Office"]

  const filteredDesigns =
    selectedCategory === "All" ? designs : designs.filter((design) => design.roomType === selectedCategory)

  return (
    <section className="featured-gallery section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Featured Design Gallery</h2>
          <p>Explore our curated collection of stunning interior designs</p>
        </div>

        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "filter-btn-active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredDesigns.map((design, index) => (
            <div key={design.id} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="gallery-image">
                <img src={design.imageUrl || "/placeholder.svg"} alt={design.name} />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <h3>{design.name}</h3>
                    <p>
                      {design.style} • {design.roomType}
                    </p>
                    <span className="price">${design.cost}</span>
                  </div>
                  <div className="gallery-actions">
                    <Link to="/design-styles" className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta text-center">
          <Link to="/design-styles" className="btn btn-secondary">
            View All Designs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedGallery
