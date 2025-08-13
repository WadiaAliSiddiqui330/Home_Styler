import { Link } from "react-router-dom"
import "./ServicesOverview.css"

const ServicesOverview = () => {
  const services = [
    {
      icon: "🎨",
      title: "Interior Design",
      description: "Professional interior design services tailored to your style and budget.",
      link: "/design-styles",
    },
    {
      icon: "🛋️",
      title: "Furniture Selection",
      description: "Curated furniture collections from top brands and designers.",
      link: "/products",
    },
    {
      icon: "👥",
      title: "Expert Consultation",
      description: "One-on-one consultations with experienced interior designers.",
      link: "/designers",
    },
    {
      icon: "📐",
      title: "Space Planning",
      description: "Optimize your space with professional layout and planning services.",
      link: "/contact",
    },
  ]

  return (
    <section className="services-overview section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our Services</h2>
          <p>Comprehensive interior design solutions for every need</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.link} className="service-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview
