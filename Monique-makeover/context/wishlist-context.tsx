"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const { toast } = useToast()

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      // Check if product already exists in wishlist
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems
      }

      // Add new item
      return [...prevItems, product]
    })

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 2000,
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))

    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
      duration: 2000,
    })
  }

  const clearWishlist = () => {
    setItems([])

    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
      duration: 2000,
    })
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        itemCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

