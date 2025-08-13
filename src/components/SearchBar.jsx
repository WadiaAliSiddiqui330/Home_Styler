"use client"

import { useState, useRef, useEffect } from "react"
import { useSearch } from "../contexts/SearchContext"
import { useNavigate } from "react-router-dom"
import "./SearchBar.css"

const SearchBar = ({ isOpen, onClose }) => {
  const [localQuery, setLocalQuery] = useState("")
  const { searchQuery, setSearchQuery, searchResults, isSearching, performSearch } = useSearch()
  const searchInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (localQuery.trim()) {
        performSearch(localQuery)
        setSearchQuery(localQuery)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [localQuery, performSearch, setSearchQuery])

  const handleResultClick = (result) => {
    if (result.type === "design") {
      navigate("/design-styles")
    } else if (result.type === "product") {
      navigate("/products")
    } else if (result.type === "designer") {
      navigate("/designers")
    }
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-container">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search designs, products, designers..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button className="search-close" onClick={onClose}>
            ×
          </button>
        </div>

        {isSearching && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <span>Searching...</span>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results ({searchResults.length})</h3>
            <div className="results-list">
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <img src={result.imageUrl || result.photoUrl} alt={result.name} />
                  <div className="result-info">
                    <h4>{result.name}</h4>
                    <p className="result-type">{result.type}</p>
                    {result.price && <p className="result-price">${result.price}</p>}
                    {result.cost && <p className="result-price">${result.cost}</p>}
                    {result.hourlyRate && <p className="result-price">${result.hourlyRate}/hr</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {localQuery && !isSearching && searchResults.length === 0 && (
          <div className="no-results">
            <p>No results found for "{localQuery}"</p>
            <p>Try searching for designs, products, or designers</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
