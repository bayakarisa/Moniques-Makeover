"use client"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId)
    if (product) {
      addItem(product, 1)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-purple-200" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="mb-6">Save items you love to your wishlist and revisit them anytime.</p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist</h1>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="hidden md:grid grid-cols-4 gap-4 mb-4 text-sm font-medium text-gray-500">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Actions</div>
            </div>

            <Separator className="hidden md:block mb-4" />

            {items.map((item) => (
              <div key={item.id} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link href={`/product/${item.id}`} className="hover:text-purple-600">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>
                  </div>

                  <div className="text-sm md:text-base">
                    <span className="md:hidden font-medium">Price: </span>
                    Ksh {item.price.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                      size="sm"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {items.indexOf(item) !== items.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button variant="ghost" onClick={() => clearWishlist()}>
                Clear Wishlist
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

