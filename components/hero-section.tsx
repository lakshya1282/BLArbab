  "use client"

  import { Button } from "@/components/ui/button"

  export function HeroSection() {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ 
            backgroundImage: "url('/BL-HERO.png')",
            filter: "brightness(0.7)"
          }}
        />

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 max-w-5xl mx-auto text-center">
          <p
            className="text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-[#d9bfa5] mb-4 md:mb-6 font-medium"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            
          </p>

          <h1
            className="text-5xl sm:text-3xl md:text-5xl lg:text-7xl  text-white mb-6 md:mb-8 italic"
            style={{ 
              fontFamily: "var(--font-cormorant), serif",
              textShadow: "2px 4px 10px rgba(0,0,0,0.3)"
            }}
          >
            <span className="block">Your Daily Dose Of Brownland</span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#f5e9dd] max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 font-light"
            style={{ fontFamily: " sans-serif" }}
          >
            More than a café — it is a shared experience. Built on the idea of being for us, for everyone. Every cup crafted with passion.
          </p>

          <Button
            size="lg"
          
            className="mt-6 sm:mt-8 bg-white text-[#3b2213] hover:bg-[#d9bfa5] hover:text-white transition-all duration-300 text-sm sm:text-base md:text-lg px-12 py-7 rounded-full shadow-xl shadow-black/30 font-semibold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          > <a
                href="https://www.zomato.com/raipur/brownland-coffee-1-civil-lines"
                target="_blank"
                rel="noopener noreferrer"
              >
            Order Online</a>
          </Button>
        </div>
      </section>
    )
  }