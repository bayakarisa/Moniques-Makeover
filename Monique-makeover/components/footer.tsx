import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, TwitterIcon as TikTok, MapPin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 mb-4">
              Transforming beauty, one makeover at a time! At moniquesmakeovers, we specialize in enhancing your natural
              beauty with expert services.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-300" />
                <span className="text-gray-300 text-sm">Roysambu, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-300" />
                <a href="mailto:josephbaya9648@gmail.com" className="text-gray-300 text-sm hover:text-white">
                  josephbaya9648@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-300" />
                <a href="tel:0741026232" className="text-gray-300 text-sm hover:text-white">
                  0741026232
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-white text-sm">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/makeup" className="text-gray-300 hover:text-white text-sm">
                  Makeup
                </Link>
              </li>
              <li>
                <Link href="/category/skincare" className="text-gray-300 hover:text-white text-sm">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/category/hair" className="text-gray-300 hover:text-white text-sm">
                  Hair
                </Link>
              </li>
              <li>
                <Link href="/category/fragrance" className="text-gray-300 hover:text-white text-sm">
                  Fragrance
                </Link>
              </li>
              <li>
                <Link href="/category/tools" className="text-gray-300 hover:text-white text-sm">
                  Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-300 text-sm mb-4">
              Follow us on social media for beauty tips, promotions, and more!
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com/moniques_makeover"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com/@moniques_makeover"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTok className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/moniques_makeover"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Subscribe to our newsletter:</p>
              <div className="flex">
                <Input type="email" placeholder="Your email" className="rounded-l-md text-black" />
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-purple-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 moniquesmakeovers. All rights reserved to Joseph Baya.
            </p>
            <div className="text-sm text-gray-400">
              <p>Book your appointment today and experience beauty at its best!</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

