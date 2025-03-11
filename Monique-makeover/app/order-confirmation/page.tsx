"use client"

import Link from "next/link"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function OrderConfirmationPage() {
  // Generate a random order number
  const orderNumber = `MM${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-xl font-bold">{orderNumber}</p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            We've sent a confirmation email to your registered email address with all the details of your order.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
              <Link href="/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Track Your Order
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

