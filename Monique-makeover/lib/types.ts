export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  rating: number
  reviewCount: number
  isNew?: boolean
  description?: string
  category?: string
  stock?: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Category {
  id: string
  name: string
  image: string
  href: string
}

