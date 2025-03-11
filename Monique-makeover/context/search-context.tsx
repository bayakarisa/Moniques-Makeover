"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Product } from "@/lib/types"
import { searchProducts } from "@/lib/data"

interface SearchContextType {
  query: string
  results: Product[]
  setQuery: (query: string) => void
  isSearching: boolean
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSetQuery = (newQuery: string) => {
    setQuery(newQuery)

    if (newQuery.trim().length > 0) {
      setIsSearching(true)
      // Search products
      const searchResults = searchProducts(newQuery)
      setResults(searchResults)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsSearching(false)
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        setQuery: handleSetQuery,
        isSearching,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

