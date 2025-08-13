"use client"

import { useState } from "react"
import Hero from "../components/Hero"
import "./Feedback.css"
import bgImage from "../assets/banner2.jpeg" // <-- place your image in assets
import { Link } from "react-router-dom"
const Feedback = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    category: "general",
    rating: 0,
    subject: "",
    message: "",
  })

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    projectType: "",
    designer: "",
    rating: 0,
    title: "",
    review: "",
    recommend: true,
  })

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback submitted:", feedbackForm)
    alert("Thank you for your feedback! We appreciate your input.")
    setFeedbackForm({
      name: "",
      email: "",
      category: "general",
      rating: 0,
      subject: "",
      message: "",
    })
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    console.log("Review submitted:", reviewForm)
    alert("Thank you for your review! It helps other customers make informed decisions.")
    setReviewForm({
      name: "",
      email: "",
      projectType: "",
      designer: "",
      rating: 0,
      title: "",
      review: "",
      recommend: true,
    })
  }

  const renderStars = (rating, setRating, formType) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`star ${index < rating ? "active" : ""}`}
        onClick={() => {
          if (formType === "feedback") {
            setFeedbackForm({ ...feedbackForm, rating: index + 1 })
          } else {
            setReviewForm({ ...reviewForm, rating: index + 1 })
          }
        }}
      >
        ★
      </button>
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
    
    
    <div className="feedback-page">
    

      <div className="feedback-content">
        <div className="container">
          <div className="feedback-intro">
            <h2>We Value Your Opinion</h2>
            <p>
              Your feedback helps us continuously improve our services and create better experiences for all our
              customers. Whether you have suggestions, compliments, or concerns, we want to hear from you.
            </p>
          </div>

          <div className="feedback-forms">
            <div className="forms-grid">
              <div className="form-container">
                <h3>General Feedback</h3>
                <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="feedback-name">Name *</label>
                      <input
                        type="text"
                        id="feedback-name"
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="feedback-email">Email *</label>
                      <input
                        type="email"
                        id="feedback-email"
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="feedback-category">Category</label>
                    <select
                      id="feedback-category"
                      value={feedbackForm.category}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                    >
                      <option value="general">General Feedback</option>
                      <option value="website">Website Experience</option>
                      <option value="products">Products & Services</option>
                      <option value="designers">Designer Experience</option>
                      <option value="support">Customer Support</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Overall Rating *</label>
                    <div className="star-rating">{renderStars(feedbackForm.rating, null, "feedback")}</div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="feedback-subject">Subject *</label>
                    <input
                      type="text"
                      id="feedback-subject"
                      value={feedbackForm.subject}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="feedback-message">Your Feedback *</label>
                    <textarea
                      id="feedback-message"
                      rows="5"
                      placeholder="Please share your thoughts, suggestions, or concerns..."
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      required
                    ></textarea>
                    <small>Minimum 10 characters</small>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit Feedback
                  </button>
                </form>
              </div>

              <div className="form-container">
                <h3>Project Review</h3>
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="review-name">Name *</label>
                      <input
                        type="text"
                        id="review-name"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="review-email">Email *</label>
                      <input
                        type="email"
                        id="review-email"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="project-type">Project Type</label>
                      <select
                        id="project-type"
                        value={reviewForm.projectType}
                        onChange={(e) => setReviewForm({ ...reviewForm, projectType: e.target.value })}
                      >
                        <option value="">Select Project Type</option>
                        <option value="residential">Residential Design</option>
                        <option value="commercial">Commercial Design</option>
                        <option value="consultation">Design Consultation</option>
                        <option value="renovation">Home Renovation</option>
                        <option value="furniture">Furniture Purchase</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="designer-name">Designer Name</label>
                      <input
                        type="text"
                        id="designer-name"
                        placeholder="If you worked with a specific designer"
                        value={reviewForm.designer}
                        onChange={(e) => setReviewForm({ ...reviewForm, designer: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Project Rating *</label>
                    <div className="star-rating">{renderStars(reviewForm.rating, null, "review")}</div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="review-title">Review Title *</label>
                    <input
                      type="text"
                      id="review-title"
                      placeholder="Summarize your experience in a few words"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="review-text">Your Review *</label>
                    <textarea
                      id="review-text"
                      rows="5"
                      placeholder="Share details about your project experience, quality of work, communication, etc."
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={reviewForm.recommend}
                        onChange={(e) => setReviewForm({ ...reviewForm, recommend: e.target.checked })}
                      />
                      I would recommend HomeStyler to others
                    </label>
                  </div>

                  <button type="submit" className="btn btn-secondary">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="feedback-stats">
            <h3>Customer Satisfaction</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">4.8</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1,247</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">856</div>
                <div className="stat-label">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Feedback
