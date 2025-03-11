"use client"

import { useSearch } from "@/context/search-context"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SearchResults() {
  const { results, clearSearch } = useSearch()
  const router = useRouter()

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`)
    clearSearch()
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-50 max-h-[400px] overflow-y-auto">
      <div className="p-2">
        <h3 className="text-sm font-medium px-2 py-1 text-gray-500">{results.length} results found</h3>
        <ul>
          {results.map((product) => (
            <li key={product.id} className="border-b last:border-0">
              <button
                onClick={() => handleProductClick(product.id)}
                className="flex items-center gap-3 p-2 w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                </div>
                <div className="text-sm font-semibold">Ksh {product.price.toLocaleString()}</div>
              </button>
            </li>
          ))}
        </ul>
        <div className="p-2 text-center">
          <Link
            href={`/search?q=${encodeURIComponent(results[0]?.category || "")}`}
            className="text-sm text-pink-600 hover:text-pink-700"
            onClick={clearSearch}
          >
            View all results
          </Link>
        </div>
      </div>
    </div>
  )
}

