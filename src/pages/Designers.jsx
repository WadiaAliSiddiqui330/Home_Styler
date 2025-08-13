"use client"

import { useState, useEffect, useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"
import designersData from "../data/designers.json"
import "./Designers.css"
import bgImage from "../assets/banner2.jpeg" // <-- place your image in assets
import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import Banner from "../components/Banner"
const Designers = () => {
  const [designers, setDesigners] = useState(designersData.designers)
  const [filteredDesigners, setFilteredDesigners] = useState(designersData.designers)
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [experienceFilter, setExperienceFilter] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("name")
  const [selectedDesigner, setSelectedDesigner] = useState(null)

  const { searchTerm } = useContext(SearchContext)

  // Get unique specialties
  const specialties = ["All", ...new Set(designers.flatMap((d) => d.specialties))]

  // Filter and sort designers
  useEffect(() => {
    let filtered = designers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (designer) =>
          designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          designer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          designer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by specialty
    if (selectedSpecialty !== "All") {
      filtered = filtered.filter((designer) => designer.specialties.includes(selectedSpecialty))
    }

    // Filter by experience
    if (experienceFilter !== "All") {
      const [min, max] = experienceFilter.split("-").map(Number)
      filtered = filtered.filter((designer) => {
        if (max) {
          return designer.experienceYears >= min && designer.experienceYears <= max
        }
        return designer.experienceYears >= min
      })
    }

    // Filter by price range
    filtered = filtered.filter(
      (designer) => designer.hourlyRate >= priceRange[0] && designer.hourlyRate <= priceRange[1],
    )

    // Sort designers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return b.experienceYears - a.experienceYears
        case "price-low":
          return a.hourlyRate - b.hourlyRate
        case "price-high":
          return b.hourlyRate - a.hourlyRate
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredDesigners(filtered)
  }, [designers, selectedSpecialty, experienceFilter, priceRange, sortBy, searchTerm])

  const openDesignerModal = (designer) => {
    setSelectedDesigner(designer)
  }

  const closeDesignerModal = () => {
    setSelectedDesigner(null)
  }

  return (
    <div className="designers-page">
      <Banner
        title="Professional Designers"
        subtitle="Meet our team of expert interior designers ready to transform your space"
        backgroundImage="/interior-designers-at-work.png"
      />
      <div className="designers-content">
        <div className="designers-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Specialty</label>
              <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Experience</label>
              <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
                <option value="All">All Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10">10+ years</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name A-Z</option>
                <option value="experience">Most Experienced</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>
                Hourly Rate: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="designers-results">
          <p>{filteredDesigners.length} designers found</p>
        </div>

        <div className="designers-grid">
          {filteredDesigners.map((designer, index) => (
            <div key={designer.id} className="designer-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="designer-photo">
                <img src={designer.photoUrl || "/placeholder.svg"} alt={designer.name} />
                <div className="designer-overlay">
                  <button className="view-profile-btn" onClick={() => openDesignerModal(designer)}>
                    View Profile
                  </button>
                </div>
              </div>

              <div className="designer-info">
                <h3>{designer.name}</h3>
                <div className="designer-experience">{designer.experienceYears} years experience</div>
                <div className="designer-rate">${designer.hourlyRate}/hour</div>

                <div className="designer-specialties">
                  {designer.specialties.map((specialty) => (
                    <span key={specialty} className="specialty-tag">
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="designer-bio">{designer.bio}</p>

                <div className="designer-actions">
                  <button className="contact-btn" onClick={() => openDesignerModal(designer)}>
                    Contact
                  </button>
                  <button className="hire-btn">Hire Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDesigners.length === 0 && (
          <div className="no-results">
            <h3>No designers found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Designer Modal */}
        {selectedDesigner && (
          <div className="designer-modal-overlay" onClick={closeDesignerModal}>
            <div className="designer-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeDesignerModal}>
                ×
              </button>

              <div className="modal-content">
                <div className="modal-header">
                  <img src={selectedDesigner.photoUrl || "/placeholder.svg"} alt={selectedDesigner.name} />
                  <div className="modal-header-info">
                    <h2>{selectedDesigner.name}</h2>
                    <div className="modal-experience">{selectedDesigner.experienceYears} years experience</div>
                    <div className="modal-rate">${selectedDesigner.hourlyRate}/hour</div>
                  </div>
                </div>

                <div className="modal-specialties">
                  <h4>Specialties</h4>
                  <div className="specialty-list">
                    {selectedDesigner.specialties.map((specialty) => (
                      <span key={specialty} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-bio">
                  <h4>About</h4>
                  <p>{selectedDesigner.bio}</p>
                </div>

                <div className="modal-contact">
                  <h4>Contact Information</h4>
                  <div className="contact-info">
                    <div className="contact-item">
                      <strong>Email:</strong> {selectedDesigner.contact.email}
                    </div>
                    <div className="contact-item">
                      <strong>Phone:</strong> {selectedDesigner.contact.phone}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="contact-btn">Send Message</button>
                  <button className="hire-btn">Hire This Designer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Designers
