"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        <div className="py-4 overflow-y-auto h-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="makeup">
              <AccordionTrigger className="px-4">MAKEUP</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Face
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Eyes
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Lips
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Nails
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Makeup Tools
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skin">
              <AccordionTrigger className="px-4">SKIN</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Cleansers
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Moisturizers
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Serums
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Masks
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Sunscreen
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hair">
              <AccordionTrigger className="px-4">HAIR</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Shampoo
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Conditioner
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Hair Treatments
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Styling
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Hair Tools
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bath">
              <AccordionTrigger className="px-4">BATH & BODY</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Body Wash
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Body Lotion
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Body Scrubs
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Hand Care
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fragrance">
              <AccordionTrigger className="px-4">FRAGRANCE</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Women's Perfume
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Men's Cologne
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Gift Sets
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tools">
              <AccordionTrigger className="px-4">TOOLS</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Makeup Brushes
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Hair Tools
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Skincare Tools
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="brands">
              <AccordionTrigger className="px-4">BRANDS</AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Maybelline
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    L'Oreal Paris
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Nivea
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    MAC
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    The Ordinary
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="px-4 py-2 mt-2">
            <Link href="#" className="block px-4 py-2 text-pink-600 font-medium hover:bg-gray-100">
              OFFERS
            </Link>
          </div>
          <div className="border-t mt-4 pt-4 px-4 space-y-4">
            <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
              My Account
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
              Wishlist
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
              Track Order
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
              Contact Us
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

