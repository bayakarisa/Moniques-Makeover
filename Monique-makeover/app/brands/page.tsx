import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const brands = [
  {
    id: "1",
    name: "Maybelline",
    image: "https://images.unsplash.com/photo-1627843240167-b1f9a9f9c9f2?q=80&w=300&auto=format&fit=crop",
    description: "Affordable, high-quality makeup for everyone.",
    featured: true,
  },
  {
    id: "2",
    name: "L'Oreal Paris",
    image: "https://images.unsplash.com/photo-1624456735729-03594a40c5fb?q=80&w=300&auto=format&fit=crop",
    description: "Because you're worth it. Innovative beauty products for all.",
    featured: true,
  },
  {
    id: "3",
    name: "MAC",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=300&auto=format&fit=crop",
    description: "Professional quality makeup for all ages, races, and genders.",
    featured: true,
  },
  {
    id: "4",
    name: "Nivea",
    image: "https://images.unsplash.com/photo-1607602132700-068258431c6c?q=80&w=300&auto=format&fit=crop",
    description: "Trusted skincare for generations.",
    featured: true,
  },
  {
    id: "5",
    name: "Cerave",
    image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=300&auto=format&fit=crop",
    description: "Developed with dermatologists for effective skincare.",
    featured: true,
  },
  {
    id: "6",
    name: "The Ordinary",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=300&auto=format&fit=crop",
    description: "Clinical formulations with integrity.",
    featured: true,
  },
  {
    id: "7",
    name: "Fenty Beauty",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=300&auto=format&fit=crop",
    description: "Beauty for all. Inclusive makeup range by Rihanna.",
    featured: false,
  },
  {
    id: "8",
    name: "Olaplex",
    image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=300&auto=format&fit=crop",
    description: "Revolutionary hair repair and maintenance products.",
    featured: false,
  },
  {
    id: "9",
    name: "Huda Beauty",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=300&auto=format&fit=crop",
    description: "Trendsetting makeup created by beauty influencer Huda Kattan.",
    featured: false,
  },
  {
    id: "10",
    name: "Garnier",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
    description: "Naturally-inspired hair and skin care products.",
    featured: false,
  },
]

export default function BrandsPage() {
  const featuredBrands = brands.filter((brand) => brand.featured)
  const otherBrands = brands.filter((brand) => !brand.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="relative w-full h-[250px] md:h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=1920&auto=format&fit=crop"
              alt="Brands Collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
              <div className="p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Brands</h1>
                <p className="text-white max-w-md">Discover premium beauty brands curated for quality and excellence</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Featured Brands */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Featured Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBrands.map((brand) => (
                <Link key={brand.id} href={`/search?q=${encodeURIComponent(brand.name)}`} className="group block">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={brand.image || "/placeholder.svg"}
                        alt={brand.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white text-xl font-bold">{brand.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600">{brand.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Brands */}
          <section>
            <h2 className="text-xl font-semibold mb-6">All Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/search?q=${encodeURIComponent(brand.name)}`}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="relative h-20 w-20 mb-3">
                    <Image
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="font-medium text-purple-600">{brand.name}</h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

