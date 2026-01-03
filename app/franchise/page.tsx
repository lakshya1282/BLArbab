"use client"

import { FranchiseNavbar } from "@/components/franchise-navbar"
import { FranchiseHero } from "@/components/franchise-hero"
import { WhyUsSection } from "@/components/why-us-section"
import { FranchiseForm } from "@/components/franchise-form"
import { Footer } from "@/components/footer"
import { AOSProvider } from "@/components/aos-provider"

export default function FranchisePage() {
  return (
    <AOSProvider>
      <main className="min-h-screen bg-background">
        <FranchiseNavbar />
        <FranchiseHero />
        <WhyUsSection />
        <FranchiseForm />
        <Footer />
      </main>
    </AOSProvider>
  )
}
