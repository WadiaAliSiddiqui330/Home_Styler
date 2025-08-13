"use client"

import { createContext, useContext, useState, useEffect } from "react"

export const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("homestyler-wishlist")
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("homestyler-wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (item) => {
    setWishlistItems((prev) => {
      const exists = prev.find((wishItem) => wishItem.id === item.id)
      if (exists) return prev
      return [...prev, { ...item, addedAt: new Date().toISOString() }]
    })
  }

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (itemId) => {
    return wishlistItems.some((item) => item.id === itemId)
  }

  const value = {
    wishlist: wishlistItems,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
