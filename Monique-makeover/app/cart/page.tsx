"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.toLowerCase() === "welcome10") {
      setDiscount(subtotal * 0.1)
    } else {
      setDiscount(0)
    }
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const shipping = subtotal >= 2500 ? 0 : 350
  const total = subtotal - discount + shipping

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="hidden md:grid grid-cols-5 gap-4 mb-4 text-sm font-medium text-gray-500">
                  <div className="col-span-2">Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                </div>

                <Separator className="hidden md:block mb-4" />

                {items.map((item) => (
                  <div key={item.product.id} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div className="col-span-2 flex items-center gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/product/${item.product.id}`} className="hover:text-pink-600">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">{item.product.brand}</p>
                        </div>
                      </div>

                      <div className="text-sm md:text-base">
                        <span className="md:hidden font-medium">Price: </span>
                        Ksh {item.product.price.toLocaleString()}
                      </div>

                      <div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="md:hidden font-medium">Total: </span>
                          <span className="font-medium">
                            Ksh {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => removeItem(item.product.id)}
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
                  <Button variant="ghost" onClick={() => clearCart()}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Ksh {subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- Ksh {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `Ksh ${shipping.toLocaleString()}`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>Ksh {total.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleApplyPromo} className="mt-6">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button type="submit" variant="outline">
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Try "WELCOME10" for 10% off</p>
                </form>

                <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700" size="lg" onClick={handleCheckout}>
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>We accept:</p>
                  <div className="flex gap-2">
                    <Image
                      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=50&auto=format&fit=crop"
                      alt="Visa"
                      width={40}
                      height={25}
                      className="h-6 w-auto"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=50&auto=format&fit=crop"
                      alt="Mastercard"
                      width={40}
                      height={25}
                      className="h-6 w-auto"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=50&auto=format&fit=crop"
                      alt="M-Pesa"
                      width={40}
                      height={25}
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

