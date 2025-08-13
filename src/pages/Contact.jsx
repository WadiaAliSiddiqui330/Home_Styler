"use client"

import { useState } from "react"
import Hero from "../components/Hero"
import "./Contact.css"
import bgImage from "../assets/banner2.jpeg" // <-- place your image in assets
import { Link } from "react-router-dom"

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "general",
  })

  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "residential",
    budget: "",
    timeline: "",
    description: "",
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    // Handle form submission
    alert("Thank you for your message! We'll get back to you soon.")
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      serviceType: "general",
    })
  }

  const handleConsultationSubmit = (e) => {
    e.preventDefault()
    console.log("Consultation form submitted:", consultationForm)
    // Handle form submission
    alert("Thank you for your consultation request! We'll contact you within 24 hours.")
    setConsultationForm({
      name: "",
      email: "",
      phone: "",
      projectType: "residential",
      budget: "",
      timeline: "",
      description: "",
    })
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


      <div className="contact-page">
     

      <div className="contact-content">
        <div className="container">
          <div className="contact-info-section">
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-icon">📍</div>
                <h3>Visit Our Showroom</h3>
                <p>
                  123 Design Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon">📞</div>
                <h3>Call Us</h3>
                <p>
                  +1 (555) 123-4567
                  <br />
                  Mon-Fri 9AM-6PM
                </p>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Us</h3>
                <p>
                  info@homestyler.com
                  <br />
                  support@homestyler.com
                </p>
              </div>
            </div>
          </div>

          <div className="forms-section">
            <div className="forms-grid">
              <div className="form-container">
                <h2>General Inquiry</h2>
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-email">Email *</label>
                      <input
                        type="email"
                        id="contact-email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-phone">Phone</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-type">Service Type</label>
                    <select
                      id="service-type"
                      value={contactForm.serviceType}
                      onChange={(e) => setContactForm({ ...contactForm, serviceType: e.target.value })}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="design">Interior Design</option>
                      <option value="consultation">Consultation</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject *</label>
                    <input
                      type="text"
                      id="contact-subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>

              <div className="form-container">
                <h2>Schedule Consultation</h2>
                <form onSubmit={handleConsultationSubmit} className="consultation-form">
                  <div className="form-group">
                    <label htmlFor="consultation-name">Full Name *</label>
                    <input
                      type="text"
                      id="consultation-name"
                      value={consultationForm.name}
                      onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="consultation-email">Email *</label>
                      <input
                        type="email"
                        id="consultation-email"
                        value={consultationForm.email}
                        onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="consultation-phone">Phone *</label>
                      <input
                        type="tel"
                        id="consultation-phone"
                        value={consultationForm.phone}
                        onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="project-type">Project Type</label>
                      <select
                        id="project-type"
                        value={consultationForm.projectType}
                        onChange={(e) => setConsultationForm({ ...consultationForm, projectType: e.target.value })}
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="renovation">Renovation</option>
                        <option value="new-construction">New Construction</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">Budget Range</label>
                      <select
                        id="budget"
                        value={consultationForm.budget}
                        onChange={(e) => setConsultationForm({ ...consultationForm, budget: e.target.value })}
                      >
                        <option value="">Select Budget</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="over-100k">Over $100,000</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline">Project Timeline</label>
                    <select
                      id="timeline"
                      value={consultationForm.timeline}
                      onChange={(e) => setConsultationForm({ ...consultationForm, timeline: e.target.value })}
                    >
                      <option value="">Select Timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="planning">Just planning</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="project-description">Project Description *</label>
                    <textarea
                      id="project-description"
                      rows="4"
                      placeholder="Tell us about your project, style preferences, and any specific requirements..."
                      value={consultationForm.description}
                      onChange={(e) => setConsultationForm({ ...consultationForm, description: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-secondary">
                    Schedule Consultation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  )
}

export default Contact
