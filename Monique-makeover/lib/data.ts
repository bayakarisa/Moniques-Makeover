import type { Product, Category } from "./types"

// You can easily update these categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200&auto=format&fit=crop",
    href: "/category/makeup",
  },
  {
    id: "2",
    name: "Skincare",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop",
    href: "/category/skincare",
  },
  {
    id: "3",
    name: "Hair",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=200&auto=format&fit=crop",
    href: "/category/hair",
  },
  {
    id: "5",
    name: "Fragrance",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop",
    href: "/category/fragrance",
  },
  {
    id: "6",
    name: "Tools",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=200&auto=format&fit=crop",
    href: "/category/tools",
  },
]

// You can easily update your product inventory here
export const products: Product[] = [
  // Makeup Products
  {
    id: "1",
    name: "Maybelline Fit Me Foundation",
    brand: "Maybelline",
    price: 1250,
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?q=80&w=300&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 120,
    description: "A lightweight foundation that matches your skin's tone and texture for a natural, seamless finish.",
    category: "makeup",
    stock: 25,
  },
  {
    id: "5",
    name: "MAC Lipstick Ruby Woo",
    brand: "MAC",
    price: 2200,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 320,
    description: "A vivid blue-red matte lipstick that's universally flattering and provides long-lasting color.",
    category: "makeup",
    stock: 10,
  },
  // Add more products as needed...
]

// The rest of the file remains the same
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.category?.toLowerCase().includes(lowercaseQuery),
  )
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category)
}

export const getBestSellers = (): Product[] => {
  // Sort by rating and review count to get "best sellers"
  return [...products].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, 5)
}

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.isNew)
}

