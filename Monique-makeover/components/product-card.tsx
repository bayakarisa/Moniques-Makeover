"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { id, name, brand, price, image, rating, reviewCount, isNew } = product

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(id)) {
      removeFromWishlist(id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg overflow-hidden border hover:shadow-md transition-shadow",
        className,
      )}
    >
      {isNew && (
        <div className="absolute top-2 left-2 z-10 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded">
          NEW
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        onClick={handleToggleWishlist}
      >
        <Heart
          className={`h-5 w-5 ${isInWishlist(id) ? "fill-purple-600 text-purple-600" : "text-gray-600 hover:text-purple-600"}`}
        />
      </Button>
      <Link href={`/product/${id}`} className="block">
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-1">{brand}</p>
          <h3 className="font-medium text-sm line-clamp-2 mb-1 h-10">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1 text-gray-700">{rating}</span>
            </div>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Ksh {price.toLocaleString()}</p>
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2"
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}

