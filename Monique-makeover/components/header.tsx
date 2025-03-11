"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Heart, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useSearch } from "@/context/search-context"
import { useWishlist } from "@/context/wishlist-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"
import SearchResults from "./search-results"

export default function Header() {
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const { query, setQuery, isSearching, clearSearch } = useSearch()
  const { itemCount: wishlistCount } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      clearSearch()
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-purple-900 text-white py-2 px-4 text-center text-sm md:block">
        Transforming beauty, one makeover at a time! | Book your appointment today: 0741026232
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                  <SheetClose className="absolute right-4 top-4">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </SheetHeader>
                <div className="py-4 overflow-y-auto h-full">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="makeup">
                      <AccordionTrigger className="px-4">MAKEUP</AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 py-2 space-y-2">
                          <Link href="/category/makeup" className="block px-4 py-2 hover:bg-gray-100">
                            Face
                          </Link>
                          <Link href="/category/makeup" className="block px-4 py-2 hover:bg-gray-100">
                            Eyes
                          </Link>
                          <Link href="/category/makeup" className="block px-4 py-2 hover:bg-gray-100">
                            Lips
                          </Link>
                          <Link href="/category/makeup" className="block px-4 py-2 hover:bg-gray-100">
                            Nails
                          </Link>
                          <Link href="/category/makeup" className="block px-4 py-2 hover:bg-gray-100">
                            Makeup Tools
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="skin">
                      <AccordionTrigger className="px-4">SKIN</AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 py-2 space-y-2">
                          <Link href="/category/skincare" className="block px-4 py-2 hover:bg-gray-100">
                            Cleansers
                          </Link>
                          <Link href="/category/skincare" className="block px-4 py-2 hover:bg-gray-100">
                            Moisturizers
                          </Link>
                          <Link href="/category/skincare" className="block px-4 py-2 hover:bg-gray-100">
                            Serums
                          </Link>
                          <Link href="/category/skincare" className="block px-4 py-2 hover:bg-gray-100">
                            Masks
                          </Link>
                          <Link href="/category/skincare" className="block px-4 py-2 hover:bg-gray-100">
                            Sunscreen
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    {/* Other accordion items */}
                  </Accordion>
                  <div className="px-4 py-2 mt-2">
                    <Link href="/offers" className="block px-4 py-2 text-purple-600 font-medium hover:bg-gray-100">
                      OFFERS
                    </Link>
                  </div>
                  <div className="border-t mt-4 pt-4 px-4 space-y-4">
                    <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">
                      Wishlist
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                      Track Order
                    </Link>
                    <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-purple-600">moniquesmakeovers</h1>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative w-full">
                  <Input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full pr-10 rounded-full border-gray-300"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </form>
              {isSearching && <SearchResults />}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                  <Link href="/login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="hidden md:flex relative" asChild>
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="mt-3 md:hidden relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pr-10 rounded-full border-gray-300"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            {isSearching && <SearchResults />}
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block bg-white border-t">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center space-x-8 py-3">
              <li>
                <Link href="/category/makeup" className="flex items-center text-sm font-medium hover:text-purple-600">
                  MAKEUP
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/category/skincare" className="flex items-center text-sm font-medium hover:text-purple-600">
                  SKIN
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/category/hair" className="flex items-center text-sm font-medium hover:text-purple-600">
                  HAIR
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/category/fragrance"
                  className="flex items-center text-sm font-medium hover:text-purple-600"
                >
                  FRAGRANCE
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/category/tools" className="flex items-center text-sm font-medium hover:text-purple-600">
                  TOOLS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/brands" className="flex items-center text-sm font-medium hover:text-purple-600">
                  BRANDS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  OFFERS
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

