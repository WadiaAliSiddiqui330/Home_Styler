"use client"

import { useState, useEffect, useRef } from "react"
import "./StatsSection.css"

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    { number: 500, label: "Design Projects", suffix: "+" },
    { number: 50, label: "Expert Designers", suffix: "+" },
    { number: 1000, label: "Happy Clients", suffix: "+" },
    { number: 98, label: "Satisfaction Rate", suffix: "%" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="stats-section section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="stat-number">
                <AnimatedNumber value={stat.number} isVisible={isVisible} duration={2000} delay={index * 200} />
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const AnimatedNumber = ({ value, isVisible, duration, delay }) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let startTime = null
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCurrentValue(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, value, duration, delay])

  return <span>{currentValue}</span>
}

export default StatsSection
