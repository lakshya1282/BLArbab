import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Bebas_Neue, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const bebas = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas", weight: "400" })
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["300", "400", "700"] })

export const metadata: Metadata = {
  title: "Brownland Coffee | Bad Day? Good Day? Coffee.",
  description:
    "Experience premium coffee, thick shakes, and delicious sandwiches at Brownland Coffee. Your perfect coffee companion for every mood.",
    generator: 'v0.app'
}

import { Toaster } from "sonner"
import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${bebas.variable} ${lato.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
