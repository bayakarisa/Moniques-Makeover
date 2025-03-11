"use client"

import type React from "react"

import { useState } from "react"
import { Package, Search, CheckCircle, Truck, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock order data for demo purposes
const mockOrders = [
  {
    orderNumber: "MM123456",
    email: "test@example.com",
    date: "June 15, 2025",
    status: "delivered",
    items: 3,
    total: 5750,
    trackingNumber: "KE987654321",
    deliveryDate: "June 18, 2025",
    timeline: [
      { status: "Order Placed", date: "June 15, 2025, 10:23 AM", completed: true },
      { status: "Payment Confirmed", date: "June 15, 2025, 10:25 AM", completed: true },
      { status: "Processing", date: "June 16, 2025, 9:00 AM", completed: true },
      { status: "Shipped", date: "June 16, 2025, 2:30 PM", completed: true },
      { status: "Out for Delivery", date: "June 18, 2025, 8:45 AM", completed: true },
      { status: "Delivered", date: "June 18, 2025, 2:15 PM", completed: true },
    ],
  },
  {
    orderNumber: "MM789012",
    email: "test@example.com",
    date: "June 20, 2025",
    status: "shipped",
    items: 2,
    total: 3200,
    trackingNumber: "KE123456789",
    deliveryDate: "June 23, 2025",
    timeline: [
      { status: "Order Placed", date: "June 20, 2025, 3:45 PM", completed: true },
      { status: "Payment Confirmed", date: "June 20, 2025, 3:47 PM", completed: true },
      { status: "Processing", date: "June 21, 2025, 10:30 AM", completed: true },
      { status: "Shipped", date: "June 21, 2025, 4:15 PM", completed: true },
      { status: "Out for Delivery", date: "Estimated: June 23, 2025", completed: false },
      { status: "Delivered", date: "Estimated: June 23, 2025", completed: false },
    ],
  },
]

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [order, setOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [error, setError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrders.find(
        (o) =>
          o.orderNumber.toLowerCase() === orderNumber.toLowerCase() && o.email.toLowerCase() === email.toLowerCase(),
      )

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setError("No order found with the provided details. Please check and try again.")
      }

      setIsSearching(false)
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return <ShoppingBag className="h-5 w-5" />
      case "payment confirmed":
        return <CheckCircle className="h-5 w-5" />
      case "processing":
        return <Package className="h-5 w-5" />
      case "shipped":
        return <Package className="h-5 w-5" />
      case "out for delivery":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-gray-600 mb-8">Enter your order details to track your package</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      placeholder="e.g. MM123456"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email used for the order"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Track Order
                      </>
                    )}
                  </Button>
                </form>

                {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

                <div className="mt-6 text-sm text-gray-500">
                  <p>For demo purposes, use:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Order: MM123456, Email: test@example.com (Delivered)</li>
                    <li>Order: MM789012, Email: test@example.com (Shipped)</li>
                  </ul>
                </div>
              </div>
            </div>

            {order && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-medium capitalize bg-purple-100 text-purple-800">
                    {order.status}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Items</p>
                      <p className="font-medium">{order.items} items</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">Ksh {order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-medium">{order.trackingNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-medium">{order.deliveryDate}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="font-semibold mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex">
                      <div
                        className={`mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${event.completed ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                      >
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <a href="/contact">Need Help?</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

