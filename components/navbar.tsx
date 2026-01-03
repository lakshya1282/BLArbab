"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const [activeLink, setActiveLink] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      // Increased detection height to match the larger navbar
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, linkName: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      setActiveLink(linkName)
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
      }
    }
  }

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "The Story", href: "#about", id: "story" },
    { name: "Menu", href: "#menu", id: "menu" },
    { name: "Franchise", href: "/franchise", id: "franchise", isExternal: true },
    { name: "Contact", href: "#dishes", id: "aboutus" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent">
      {/* Increased vertical padding from py-4 to py-6 or py-8 */}
      <div className="w-full px-2 sm:px-6 lg:px-10 py-2 md:py-3">
        <div className="flex items-center justify-between">
          
          {/* LOGO: Increased height significantly */}
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <img 
              src={isDarkBackground ? "/BL-WHITE-LOGO (1).png" : "/BL-LOGO.png"} 
              alt="Brownland Coffee" 
              className="h-12 sm:h-11 md:h-20 lg:h-15 w-auto object-contain transition-all duration-500" 
            />
          </div>

          {/* DESKTOP NAV: Increased font size and spacing */}
          <div className="hidden md:flex items-center gap-8 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`text-xs lg:text-sm uppercase tracking-[0.35em] font-medium relative group transition-colors duration-500 ${
                  isDarkBackground
                    ? "text-white/90 hover:text-white"
                    : "text-[#683419] hover:text-[#683419]/70"
                }`}
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {item.name}
                {/* Thicker underline for the larger text */}
                <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${
                  isDarkBackground ? "bg-white" : "bg-[#683419]"
                }`} />
              </a>
            ))}
          </div>

          {/* MOBILE TOGGLE: Larger icon */}
          <button 
            className={`md:hidden p-3 transition-colors duration-500 ${
              isDarkBackground ? "text-white" : "text-[#683419]"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* MOBILE MENU: Increased font and padding */}
        {isOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 border-t py-14 flex flex-col items-center gap-10 animate-in fade-in slide-in-from-top-4 transition-colors duration-500 ${
            isDarkBackground
              ? "bg-[#3b2213]/98 border-white/5 text-white"
              : "bg-[#FFFAF3]/98 border-[#683419]/5 text-[#683419]"
          }`}>
            {navItems.map((item) => (
               <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if(!item.isExternal) handleNavClick(e, item.href, item.id)
                }}
                className="text-[13px] uppercase tracking-[0.45em] font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}