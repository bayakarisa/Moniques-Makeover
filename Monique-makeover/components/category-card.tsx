import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  name: string
  image: string
  href: string
}

export default function CategoryCard({ name, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white font-semibold text-lg">{name}</h3>
        </div>
      </div>
    </Link>
  )
}

