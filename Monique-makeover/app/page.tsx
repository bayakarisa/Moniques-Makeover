import { categories, getBestSellers, getNewArrivals } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const bestSellers = getBestSellers()
  const newArrivals = getNewArrivals()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop"
              alt="Beauty Products Sale"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Summer Beauty Sale</h1>
                <p className="text-white text-lg mb-6">Up to 50% off on selected beauty products</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Shop Now</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} name={category.name} image={category.image} href={category.href} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Backgrounds */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore Our Collections</h2>

            {/* Makeup */}
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <div className="relative h-[200px] md:h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1920&auto=format&fit=crop"
                  alt="Makeup Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Makeup</h3>
                    <p className="text-white mb-4 max-w-md">
                      Discover our range of high-quality makeup products from top brands
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/category/makeup">Shop Makeup</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Skincare */}
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <div className="relative h-[200px] md:h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1920&auto=format&fit=crop"
                  alt="Skincare Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Skincare</h3>
                    <p className="text-white mb-4 max-w-md">
                      Nourish and protect your skin with our premium skincare solutions
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/category/skincare">Shop Skincare</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hair */}
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <div className="relative h-[200px] md:h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920&auto=format&fit=crop"
                  alt="Hair Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Hair</h3>
                    <p className="text-white mb-4 max-w-md">
                      Transform your locks with our professional hair care products
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/category/hair">Shop Hair</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fragrance */}
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <div className="relative h-[200px] md:h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1615529162924-f8605388461d?q=80&w=1920&auto=format&fit=crop"
                  alt="Fragrance Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Fragrance</h3>
                    <p className="text-white mb-4 max-w-md">
                      Find your signature scent from our collection of luxury fragrances
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/category/fragrance">Shop Fragrance</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <div className="relative h-[200px] md:h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop"
                  alt="Beauty Tools Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Tools</h3>
                    <p className="text-white mb-4 max-w-md">
                      Professional beauty tools for flawless application and styling
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/category/tools">Shop Tools</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Best Sellers</h2>
              <Link href="/best-sellers" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <Link href="/new-arrivals" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brands Section with Background */}
        <section className="py-10 px-4 relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=1920&auto=format&fit=crop"
              alt="Brands Background"
              fill
              className="object-cover opacity-10"
            />
          </div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Brands</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1627843240167-b1f9a9f9c9f2?q=80&w=120&auto=format&fit=crop"
                  alt="Maybelline"
                  width={120}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1624456735729-03594a40c5fb?q=80&w=120&auto=format&fit=crop"
                  alt="L'Oreal"
                  width={120}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=120&auto=format&fit=crop"
                  alt="MAC"
                  width={120}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1607602132700-068258431c6c?q=80&w=120&auto=format&fit=crop"
                  alt="Nivea"
                  width={120}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=120&auto=format&fit=crop"
                  alt="Cerave"
                  width={120}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=120&auto=format&fit=crop"
                  alt="The Ordinary"
                  width={120}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/brands">View All Brands</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <ShoppingBag className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Free Delivery</h3>
                <p className="text-sm text-gray-600">On orders above Ksh 2,500</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">100% Authentic</h3>
                <p className="text-sm text-gray-600">Guaranteed authentic products</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Same Day Delivery</h3>
                <p className="text-sm text-gray-600">In Nairobi for orders before 12pm</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

