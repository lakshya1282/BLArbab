"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { AboutCafeSection } from "@/components/about-cafe-section"
// import HappyCustomersSection from "@/components/customer";
import { OurCafeSection } from "@/components/our-cafe-section"
import { MouthWaterersSection } from "@/components/mouth-waterers-section"
import { MenuSection } from "@/components/menu-section"
import { BranchesSection } from "@/components/branches-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { AOSProvider } from "@/components/aos-provider"
import { SplashScreen } from "@/components/splash-screen"
// import HeroBanner from '@/components/cont';
import BestSellers from '@/components/best';

import CoffeeQualitySection from '@/components/quality';    
export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <AOSProvider>
        <main className="min-h-screen bg-background">
          <Navbar />
          <HeroSection />
          <AboutCafeSection />
          <CoffeeQualitySection/>
          <BestSellers />
          {/* <HeroBanner /> */}
          {/* <HappyCustomersSection/> */}

          
          <OurCafeSection />
          <MouthWaterersSection />
          <MenuSection />
          <BranchesSection />
          <ContactSection />
          <Footer />
          
        </main>
      </AOSProvider>
    </>
  )
}
