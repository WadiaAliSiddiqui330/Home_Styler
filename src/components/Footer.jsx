import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HomeStyler</h3>
            <p>Transform your living spaces with our expert interior design solutions and inspirations.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/design-styles">Design Styles</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/designers">Designers</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/sitemap">Sitemap</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ contact@homestyler.com</p>
            <p>📍 123 Design Street, Creative City</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 HomeStyler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
