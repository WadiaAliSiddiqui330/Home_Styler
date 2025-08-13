import Navigation from "./Navigation"
import Footer from "./Footer"
import { WishlistProvider } from "../contexts/WishlistContext"
import { SearchProvider } from "../contexts/SearchContext"
import ScrollToTop from "./ScrollToTop"
import "./Layout.css"

const Layout = ({ children }) => {
  return (
    <WishlistProvider>
      <SearchProvider>
        <div className="app">
          <Navigation />
          <main className="main-content fade-in">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </SearchProvider>
    </WishlistProvider>
  )
}

export default Layout
