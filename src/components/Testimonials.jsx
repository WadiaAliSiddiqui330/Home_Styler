"use client"

import { useState, useEffect } from "react"
import "./Testimonials.css"

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "",
      text: "HomeStyler transformed our living space beyond our expectations. The design team was professional and creative.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      image: "/placeholder.svg?height=80&width=80",
      text: "The furniture quality is exceptional and the design consultation was invaluable. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Interior Enthusiast",
      image: "/placeholder.svg?height=80&width=80",
      text: "Amazing selection of products and the designers really understood our vision. Our home feels perfect now.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "star-filled" : ""}`}>
        ★
      </span>
    ))
  }

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-header text-center">
          <h2>What Our Clients Say</h2>
          <p>Real feedback from satisfied customers</p>
        </div>

        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-slide ${index === currentTestimonial ? "testimonial-slide-active" : ""}`}
            >
              <div className="testimonial-content">
                <div className="testimonial-text">"{testimonial.text}"</div>
                <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
                <div className="testimonial-author">
                  <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-indicator ${index === currentTestimonial ? "testimonial-indicator-active" : ""}`}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
