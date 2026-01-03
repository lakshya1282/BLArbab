"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function FranchiseHero() {
  const scrollToForm = () => {
    const element = document.querySelector("#franchise-form")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/coffee-beans-bg.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 max-w-5xl mx-auto text-center">
        <p
          className="text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-[#d9bfa5] mb-4 md:mb-6 font-medium"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Franchise Opportunity
        </p>

        <h1
          className="text-5xl sm:text-3xl md:text-5xl lg:text-7xl text-white mb-6 md:mb-8 italic"
          style={{ 
            fontFamily: "var(--font-cormorant), serif",
            textShadow: "2px 4px 10px rgba(0,0,0,0.3)"
          }}
        >
          <span className="block">Brownland Franchise</span>
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-[#f5e9dd] max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 font-light"
          style={{ fontFamily: " sans-serif" }}
        >
          Become a Member of BROWNLAND COFFEE Family with 0% Royalty!
        </p>

        <Button
          size="lg"
          onClick={scrollToForm}
          className="mt-6 sm:mt-8 bg-white text-[#3b2213] hover:bg-[#d9bfa5] hover:text-white transition-all duration-300 text-sm sm:text-base md:text-lg px-12 py-7 rounded-full shadow-xl shadow-black/30 font-semibold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Apply for Franchise
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          className="text-base sm:text-lg px-6 sm:px-8 border-white/30 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto"
        >
          <a href="tel:+916265470873">Call: +916265470873</a>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  )
}
