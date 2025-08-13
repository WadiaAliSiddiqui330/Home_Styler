"use client"

import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import FeaturedGallery from "../components/FeaturedGallery"
import StatsSection from "../components/StatsSection"
import FeaturedProducts from "../components/FeaturedProducts"
import ServicesOverview from "../components/ServicesOverview"
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"
import "./Home.css"

const Home = () => {
  const [designs, setDesigns] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [designsResponse, productsResponse] = await Promise.all([
          fetch("/src/data/designs.json"),
          fetch("/src/data/products.json"),
        ])

        const designsData = await designsResponse.json()
        const productsData = await productsResponse.json()

        setDesigns(designsData.designs)
        setProducts(productsData.products)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading HomeStyler...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <Hero showSlider={true} />
      <FeaturedGallery designs={designs.slice(0, 6)} />
      <StatsSection />
      <FeaturedProducts products={products.slice(0, 4)} />
      <ServicesOverview />
      <Testimonials />
      <Newsletter />
    </div>
  )
}

export default Home
