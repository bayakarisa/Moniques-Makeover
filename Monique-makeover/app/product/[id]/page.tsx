"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Heart, Minus, Plus, Star, ShoppingBag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/lib/data"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist.</p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1)
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Sorry, only ${product.stock} items available in stock.`,
        variant: "destructive",
      })
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out ${product.name} on moniquesmakeovers!`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      toast({
        title: "Share",
        description: "Copy the URL to share this product.",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-500 mt-1">{product.brand}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              <div>
                <p className="text-3xl font-bold">Ksh {product.price.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">
                  {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                      disabled={quantity >= (product.stock || 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700" size="lg" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant={isInWishlist(product.id) ? "default" : "outline"}
                  size="lg"
                  onClick={handleToggleWishlist}
                  className={isInWishlist(product.id) ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? "fill-white" : ""}`} />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Product Details</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Brand: {product.brand}</li>
                    <li>Category: {product.category}</li>
                    <li>Rating: {product.rating} out of 5</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">
                      {product.rating} out of 5 ({product.reviewCount} reviews)
                    </span>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">Jane D.</span>
                        <span className="text-xs text-gray-500">2 weeks ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        This product is amazing! I've been using it for a week and already see results. The texture is
                        smooth and it absorbs quickly.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">Michael T.</span>
                        <span className="text-xs text-gray-500">1 month ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Good quality product. Packaging is nice and the product works as described. Would recommend to
                        others.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Shipping Information</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Free delivery on orders above Ksh 2,500</li>
                    <li>Same day delivery in Nairobi for orders placed before 12pm</li>
                    <li>2-3 business days for delivery to other major towns</li>
                    <li>5-7 business days for delivery to remote areas</li>
                  </ul>
                  <h3 className="font-semibold text-lg mt-4">Returns Policy</h3>
                  <p className="text-gray-600">
                    We accept returns within 7 days of delivery if the product is unused and in its original packaging.
                    Please contact our customer service team to initiate a return.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

