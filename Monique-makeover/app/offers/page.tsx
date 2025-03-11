import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CalendarDays, Tag, Percent } from "lucide-react"

const offers = [
  {
    id: "1",
    title: "Summer Beauty Sale",
    description: "Up to 50% off on selected beauty products",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    discount: "50% OFF",
    validUntil: "August 31, 2025",
    code: "SUMMER50",
    category: "All Categories",
  },
  {
    id: "2",
    title: "New Customer Special",
    description: "Get 15% off your first order with us",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    discount: "15% OFF",
    validUntil: "Ongoing",
    code: "WELCOME15",
    category: "All Categories",
  },
  {
    id: "3",
    title: "Skincare Bundle",
    description: "Buy any 3 skincare products and get the cheapest one free",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    discount: "Buy 3, Get 1 Free",
    validUntil: "September 15, 2025",
    code: "SKINCARE3",
    category: "Skincare",
  },
  {
    id: "4",
    title: "Makeup Masterclass",
    description: "Book a makeup service and get a free mini product",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
    discount: "Free Gift",
    validUntil: "July 31, 2025",
    code: "MASTERCLASS",
    category: "Services",
  },
]

export default function OffersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop"
              alt="Special Offers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Special Offers</h1>
                <p className="text-white text-lg mb-6">Discover our latest deals and promotions</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Shop Now</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Offers List */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Current Promotions</h2>

            <div className="grid gap-8">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <Image
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-full">
                        {offer.discount}
                      </div>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                      <p className="text-gray-600 mb-4">{offer.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <CalendarDays className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm">Valid until: {offer.validUntil}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm">Category: {offer.category}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="bg-gray-100 py-2 px-4 rounded-md flex items-center">
                          <Percent className="h-4 w-4 text-purple-600 mr-2" />
                          <span className="font-medium">Code: {offer.code}</span>
                        </div>
                        <Button asChild className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                          <Link href={`/search?q=${encodeURIComponent(offer.category)}`}>Shop Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

