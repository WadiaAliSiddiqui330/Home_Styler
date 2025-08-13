import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import DesignStyles from "./pages/DesignStyles"
import Products from "./pages/Products"
import Designers from "./pages/Designers"
import Wishlist from "./pages/Wishlist"
import Feedback from "./pages/Feedback"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Sitemap from "./pages/Sitemap"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-styles" element={<DesignStyles />} />
        <Route path="/products" element={<Products />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </Layout>
  )
}

export default App
