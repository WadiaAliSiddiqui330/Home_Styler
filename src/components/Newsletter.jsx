"use client"

import { useState } from "react"
import "./Newsletter.css"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setEmail("")
    }, 1000)
  }

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Stay Updated with Design Trends</h2>
            <p>Subscribe to our newsletter for the latest interior design inspiration, tips, and exclusive offers.</p>
          </div>

          <div className="newsletter-form-container">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" disabled={isLoading} className="newsletter-btn">
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                <p className="newsletter-disclaimer">
                  By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="newsletter-success">
                <div className="success-icon">✓</div>
                <h3>Thank you for subscribing!</h3>
                <p>You'll receive our latest updates and design inspiration in your inbox.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-outline">
                  Subscribe Another Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
