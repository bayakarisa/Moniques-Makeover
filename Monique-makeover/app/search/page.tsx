"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { searchProducts } from "@/lib/data"
import type { Product } from "@/lib/types"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    if (query) {
      const results = searchProducts(query)
      setProducts(results)
    }
  }, [query])

  const handleSortChange = (value: string) => {
    setSortBy(value)

    const sortedProducts = [...products]

    switch (value) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Default is relevance, no sorting needed
        break
    }

    setProducts(sortedProducts)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {products.length > 0 ? `Search results for "${query}"` : `No results found for "${query}"`}
            </h1>
            <p className="text-gray-600">{products.length} products found</p>
          </div>

          {products.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort by:</span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" asChild>
                  <a href="/">Clear Search</a>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">We couldn't find any products matching your search.</p>
              <Button asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

