import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import "./Sitemap.css"

const Sitemap = () => {
  const siteStructure = [
    {
      category: "Main Pages",
      pages: [
        { name: "Home", path: "/", description: "Welcome to HomeStyler - Your interior design destination" },
        {
          name: "Design Styles",
          path: "/design-styles",
          description: "Explore various interior design styles and inspirations",
        },
        { name: "Products", path: "/products", description: "Browse our curated collection of home decor products" },
        { name: "Professional Designers", path: "/designers", description: "Connect with expert interior designers" },
      ],
    },
    {
      category: "User Features",
      pages: [
        { name: "Wishlist", path: "/wishlist", description: "Save your favorite products and designs" },
        { name: "Feedback", path: "/feedback", description: "Share your experience and project reviews" },
      ],
    },
    {
      category: "Information",
      pages: [
        { name: "About Us", path: "/about", description: "Learn about HomeStyler and our mission" },
        { name: "Contact", path: "/contact", description: "Get in touch with our team" },
        { name: "Sitemap", path: "/sitemap", description: "Navigate through all pages of our website" },
      ],
    },
  ]

  return (
    <div className="sitemap-page">
      <Hero
        title="Sitemap"
        subtitle="Navigate through all pages of HomeStyler"
        backgroundImage="/interior-design-navigation-map.png"
      />

      <div className="container section">
        <div className="sitemap-content">
          {siteStructure.map((section, index) => (
            <div key={index} className="sitemap-section">
              <h2 className="section-title">{section.category}</h2>
              <div className="pages-grid">
                {section.pages.map((page, pageIndex) => (
                  <Link key={pageIndex} to={page.path} className="page-card">
                    <div className="page-info">
                      <h3 className="page-name">{page.name}</h3>
                      <p className="page-description">{page.description}</p>
                      <span className="page-path">{page.path}</span>
                    </div>
                    <div className="page-arrow">→</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sitemap-footer">
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">9</span>
              <span className="stat-label">Total Pages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Main Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Mobile Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sitemap
