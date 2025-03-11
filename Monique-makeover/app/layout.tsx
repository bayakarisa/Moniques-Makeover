import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { SearchProvider } from "@/context/search-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata title
export const metadata: Metadata = {
  title: "moniquesmakeovers - Kenya's Premier Beauty Store",
  description: "Transforming beauty, one makeover at a time! Expert beauty services in Roysambu, Kenya.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <SearchProvider>
                  {children}
                  <Toaster />
                </SearchProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'