"use client"
import { Link } from "react-router-dom"
import "./Hero.css"
import bgvideo from '../assets/bgvideo.mp4'
const Hero = () => {
  return (
    <section className="hero">
      {/* Background video */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="container hero-content">
        <h1 className="hero-title">Transform Your Living Space</h1>
        <p className="hero-slogan">Beautiful Designs. Timeless Comfort.</p>
        <div className="hero-actions">
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

export default Hero
