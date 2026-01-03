"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Images and data remain the same
const foodImages = [
  "/images/img-6403.jpeg",
  "/images/img-6398.jpeg",
  "/images/img-6400.jpeg",
  "/images/img-6410.jpeg",
  "/images/img-6411.jpeg",
  "/images/img-6402.jpeg",
  "/images/img-6414.jpeg",
  "/images/img-6412.jpeg",
]

const menuData = {
  sandwiches: [
    { name: "Butter Toast", price: 40 },
    { name: "Cheese Sandwich", price: 70 },
    { name: "Veg Cheese Sandwich", price: 90, tag: "Jain" },
    { name: "Chocolate Sandwich", price: 90, bestseller: true },
    { name: "Bombay Masala Sandwich", price: 120, bestseller: true },
    { name: "Mexican Sandwich", price: 150 },
    { name: "Jain Cheese Corn Sandwich", price: 150 },
  ],
  icedBrews: [
    { name: "Iced Lemon Tea", price: 80 },
    { name: "Iced Americano", price: 90, tag: "No Sugar, No Milk" },
    { name: "Iced Peach Tea", price: 90 },
    { name: "Iced Mocha", price: 90 },
    { name: "Iced Chocolate", price: 90 },
    { name: "Browncoffee", price: 90 },
    { name: "Brownchino", price: 100, tag: "Ice Latte" },
    { name: "Brownlano", price: 100, bestseller: true, tag: "Cold Coffee" },
    { name: "Iced Lemon Americano", price: 100 },
    { name: "Iced Nutella Chocolate", price: 100 },
    { name: "Iced Nutella Coffee", price: 100 },
    { name: "Iced Biscoff Coffee", price: 120 },
    { name: "Orange Americano", price: 120 },
    { name: "Iced Nutella Biscoff Coffee", price: 140, bestseller: true },
  ],
  thickShakes: [
    { name: "Brownland Cold Coffee", price: 110, bestseller: true },
    { name: "Butterscotch Shake", price: 110 },
    { name: "Oreo Shake", price: 130 },
    { name: "Strawberry Shake", price: 130 },
    { name: "Blueberry Shake", price: 130 },
    { name: "Mocha Shake", price: 150 },
    { name: "Kit-Kat Shake", price: 150 },
    { name: "Brownie Shake", price: 150, bestseller: true },
    { name: "Chocolate Shake", price: 150 },
    { name: "Hazelnut Shake", price: 150 },
    { name: "Nutella Coffee Shake", price: 150 },
    { name: "Lotus Biscoff Shake", price: 180 },
    { name: "Nutella Biscoff Coffee Shake", price: 200, bestseller: true },
    { name: "Try Your Own", price: 200, bestseller: true },
  ],
  hotCoffee: [
    { name: "Black Coffee", price: 50 },
    { name: "Hot Latte", price: 60 },
    { name: "Hot Cappuccino", price: 60 },
    { name: "Signature Hot Coffee", price: 60, bestseller: true },
    { name: "Hot Chocolate", price: 70 },
    { name: "Hot Mocha", price: 70 },
    { name: "Hot Nutella Coffee", price: 90 },
  ],
  specials: [
    { name: "Korean Cream Cheese Bun", price: 120, bestseller: true },
    { name: "Masala Tea", price: 60, bestseller: true },
    { name: "Hibiscus Tea", price: 90, tag: "Sugar Free" },
    { name: "Instant Coffee Powder", price: 150, tag: "Take Home" },
  ],
}

function MenuItem({ item }: { item: { name: string; price: number; bestseller?: boolean; tag?: string } }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#834024]/10 last:border-0 group hover:bg-[#834024]/5 px-3 -mx-3 transition-colors duration-300">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="font-['Lato'] font-bold text-[#834024] group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
          {item.bestseller && (
            <Badge className="bg-[#834024] text-[#F6EEE5] rounded-none font-['Bebas_Neue'] text-[10px] tracking-widest px-2">
              Best Seller
            </Badge>
          )}
        </div>
        {item.tag && <span className="text-[10px] font-['Bebas_Neue'] tracking-[0.1em] text-[#834024]/60 uppercase">{item.tag}</span>}
      </div>
      <span className="font-['Awesome_Serif'] italic text-[#834024] font-bold">₹{item.price}/-</span>
    </div>
  )
}

export function MenuSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % foodImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="menu" className="py-24 px-4 relative overflow-hidden bg-[#F6EEE5]">
      {/* Background Image Carousel 
        Reduced tint and increased visibility:
      */}
      <div className="absolute inset-0 z-0">
        {foodImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-60" : "opacity-0"
            }`}
          >
            {/* Removed brightness-50 and grayscale to make photos more visible */}
            <img src={img} alt="" className="w-full h-full object-cover brightness-75" />
          </div>
        ))}
        {/* Adjusted the gradient overlay to be lighter (reduced opacity from 95/80 to 70/40) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6EEE5]/70 via-[#F6EEE5]/40 to-[#F6EEE5]/70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="font-['Bebas_Neue'] text-[#834024] text-xl tracking-[0.4em] mb-4 uppercase opacity-80">
            Discover
          </p>
          <h2 className="font-['Awesome_Serif'] italic text-5xl md:text-7xl text-[#834024] mb-6">
            Our Menu
          </h2>
          <div className="w-24 h-[1px] bg-[#834024] mx-auto mb-6 opacity-40" />
          <p className="font-['Lato'] font-bold text-[#834024] max-w-xl mx-auto opacity-90 leading-relaxed drop-shadow-sm">
            From signature cold coffees to thick creamy shakes, every sip is crafted with artisanal love.
          </p>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="icedBrews" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-4 bg-transparent mb-12 h-auto">
              {Object.keys(menuData).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-[#834024] data-[state=active]:text-[#F6EEE5] px-8 py-3 rounded-none bg-white/60 backdrop-blur-md font-['Bebas_Neue'] tracking-[0.2em] text-[#834024] border border-[#834024]/20 transition-all duration-300"
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Added higher backdrop-blur and white opacity for content readability */}
            <div className="bg-white/70 backdrop-blur-xl rounded-none p-8 md:p-12 border border-[#834024]/10 shadow-2xl">
              {Object.entries(menuData).map(([key, items]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
                    {items.map((item) => (
                      <MenuItem key={item.name} item={item} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Combo Deals Section */}
        <div className="mt-20 bg-white/60 backdrop-blur-lg rounded-none p-10 md:p-14 border border-[#834024]/15 text-center">
          <h3 className="font-['Awesome_Serif'] italic text-3xl md:text-4xl text-[#834024] mb-10">
            Artisanal Combo Deals
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Signature Hot Coffee + Bombay Masala Sandwich", price: 150 },
              { name: "Cold Coffee + Veg Cheese Sandwich", price: 170 },
              { name: "Brownlano / Iced Mocha + Bombay Masala", price: 180 }
            ].map((combo, i) => (
              <div key={i} className="flex flex-col items-center group">
                <p className="font-['Lato'] font-bold text-[#834024] mb-4 opacity-90 min-h-[3rem]">
                  {combo.name}
                </p>
                <div className="w-full h-[1px] bg-[#834024]/20 mb-4" />
                <p className="font-['Awesome_Serif'] italic text-[#834024] text-3xl font-bold">
                  ₹{combo.price}/-
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}