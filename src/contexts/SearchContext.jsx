"use client"

import { createContext, useContext, useState } from "react"

export const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    try {
      // Simulate search across designs, products, and designers
      const [designsResponse, productsResponse, designersResponse] = await Promise.all([
        fetch("/src/data/designs.json"),
        fetch("/src/data/products.json"),
        fetch("/src/data/designers.json"),
      ])

      const designs = await designsResponse.json()
      const products = await productsResponse.json()
      const designers = await designersResponse.json()

      const searchTerm = query.toLowerCase()

      const filteredDesigns = designs.designs
        .filter(
          (design) =>
            design.name.toLowerCase().includes(searchTerm) ||
            design.style.toLowerCase().includes(searchTerm) ||
            design.roomType.toLowerCase().includes(searchTerm),
        )
        .map((item) => ({ ...item, type: "design" }))

      const filteredProducts = products.products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.subCategory.toLowerCase().includes(searchTerm),
        )
        .map((item) => ({ ...item, type: "product" }))

      const filteredDesigners = designers.designers
        .filter(
          (designer) =>
            designer.name.toLowerCase().includes(searchTerm) ||
            designer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm)),
        )
        .map((item) => ({ ...item, type: "designer" }))

      setSearchResults([...filteredDesigns, ...filteredProducts, ...filteredDesigners])
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const value = {
    searchQuery,
    searchTerm: searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
