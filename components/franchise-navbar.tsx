"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function FranchiseNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const [activeLink, setActiveLink] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      // Matching the increased size height for detection
      const navHeight = 120 
      
      let currentBgIsDark = true
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        
        if (rect.top <= navHeight && rect.bottom >= navHeight) {
          const bgColor = window.getComputedStyle(section).backgroundColor
          const rgb = bgColor.match(/\d+/g)
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0])
            const g = parseInt(rgb[1])
            const b = parseInt(rgb[2])
            
            // HSP brightness formula
            const brightness = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
            
            if (brightness > 180) { 
              currentBgIsDark = false
            }
          }
        }
      })
      
      setIsDarkBackground(currentBgIsDark)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent">
      {/* Increased padding to match main Navbar */}
      <div className="w-full px-2 sm:px-6 lg:px-10 py-2 md:py-3">
        <div className="flex items-center justify-between">
          
          {/* LOGO: Increased size & dynamic swap */}
          <Link href="/" className="flex-shrink-0">
            <img 
              src={isDarkBackground ? "/BL-WHITE-LOGO (1).png" : "/BL-LOGO.png"} 
              alt="Brownland Coffee" 
              className="h-12 sm:h-11 md:h-20 lg:h-15 w-auto object-contain transition-all duration-500"
            />
          </Link>

          {/* DESKTOP NAV: Increased size & dynamic colors */}
          <div className="hidden md:flex items-center gap-8 lg:gap-14">
            <Link 
              href="/" 
              className={`text-xs lg:text-sm uppercase tracking-[0.35em] font-medium transition-colors duration-500 relative group ${
                isDarkBackground ? "text-white/90 hover:text-white" : "text-[#683419] hover:text-[#683419]/70"
              }`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Home
              <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${
                isDarkBackground ? "bg-white" : "bg-[#683419]"
              }`} />
            </Link>
            
            <button
              onClick={() => scrollToSection("#why-us")}
              className={`text-xs lg:text-sm uppercase tracking-[0.35em] font-medium transition-colors duration-500 relative group text-left ${
                isDarkBackground ? "text-white/90 hover:text-white" : "text-[#683419] hover:text-[#683419]/70"
              }`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Why Us
              <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${
                isDarkBackground ? "bg-white" : "bg-[#683419]"
              }`} />
            </button>

            <button
              onClick={() => scrollToSection("#franchise-form")}
              className={`text-xs lg:text-sm uppercase tracking-[0.35em] font-medium transition-colors duration-500 relative group text-left ${
                isDarkBackground ? "text-white/90 hover:text-white" : "text-[#683419] hover:text-[#683419]/70"
              }`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Apply Now
              <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${
                isDarkBackground ? "bg-white" : "bg-[#683419]"
              }`} />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden p-3 transition-colors duration-500 ${
                isDarkBackground ? "text-white" : "text-[#683419]"
            }`}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 border-t py-14 flex flex-col items-center gap-10 animate-in fade-in slide-in-from-top-4 transition-colors duration-500 ${
            isDarkBackground
              ? "bg-[#3b2213]/98 border-white/5 text-white"
              : "bg-[#FFFAF3]/98 border-[#683419]/5 text-[#683419]"
          }`}>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-[13px] uppercase tracking-[0.45em] font-medium"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("#why-us")}
              className="text-[13px] uppercase tracking-[0.45em] font-medium"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("#franchise-form")}
              className="text-[13px] uppercase tracking-[0.45em] font-medium"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}