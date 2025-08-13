"use client"
import { Link } from "react-router-dom"
import "./Banner.css"
import bgImage from "../assets/banner2.jpeg" // <-- place your image in assets

const Banner = () => {
  return (
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
  )
}

export default Banner
