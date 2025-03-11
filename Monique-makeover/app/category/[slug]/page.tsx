"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { getProductsByCategory, categories } from "@/lib/data"
import type { Product } from "@/lib/types"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Background images for each category
const categoryBackgrounds = {
  makeup: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1920&auto=format&fit=crop",
  skincare: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1920&auto=format&fit=crop",
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920&auto=format&fit=crop",
  fragrance: "https://images.unsplash.com/photo-1615529162924-f8605388461d?q=80&w=1920&auto=format&fit=crop",
  tools: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop",
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [loading, setLoading] = useState(true)

  const category = categories.find((cat) => {
    const catSlug = cat.href.split("/").pop()
    return catSlug === slug
  })

  useEffect(() => {
    if (slug) {
      setLoading(true)
      const results = getProductsByCategory(slug)
      setProducts(results)
      setLoading(false)
    }
  }, [slug])

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

  const categoryTitle = category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1)
  const backgroundImage = categoryBackgrounds[slug as keyof typeof categoryBackgrounds] || categoryBackgrounds.makeup

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Category Banner */}
        <section className="relative">
          <div className="relative w-full h-[200px] md:h-[250px]">
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt={categoryTitle}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
              <div className="p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{categoryTitle}</h1>
                <p className="text-white">{products.length} products found</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              {products.length > 0 ? (
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
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-6">No products found in this category.</p>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <a href="/">Back to Home</a>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

