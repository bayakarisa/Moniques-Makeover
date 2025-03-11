"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "mpesa",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order is being processed.",
      })
      clearCart()
      router.push("/order-confirmation")
      setIsSubmitting(false)
    }, 2000)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const shipping = subtotal >= 2500 ? 0 : 350
  const total = subtotal + shipping

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-bold mb-4">Contact Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-bold mb-4">Shipping Address</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Special instructions for delivery"
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-bold mb-4">Payment Method</h2>

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                        <Image
                          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=50&auto=format&fit=crop"
                          alt="M-Pesa"
                          width={40}
                          height={25}
                          className="h-6 w-auto"
                        />
                        M-Pesa
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <div className="flex gap-1">
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
                        </div>
                        Credit/Debit Card
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : `Place Order - Ksh ${total.toLocaleString()}`}
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className="absolute -top-2 -right-2 bg-gray-200 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                        <p className="text-xs text-gray-500">{item.product.brand}</p>
                        <p className="text-sm font-medium">
                          Ksh {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Ksh {subtotal.toLocaleString()}</span>
                  </div>

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
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

