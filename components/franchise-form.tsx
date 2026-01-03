"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"

export function FranchiseForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    residentialAddress: "",
    city: "",
    preferredLocation: "",
  })
  const [showRedirectMessage, setShowRedirectMessage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show redirect message
    setShowRedirectMessage(true)

    // After 2 seconds, redirect to WhatsApp
    setTimeout(() => {
      const message = `*Franchise Inquiry - Brownland Coffee*%0A%0A*Full Name:* ${formData.fullName}%0A*Age:* ${formData.age}%0A*Date of Birth:* ${formData.dateOfBirth}%0A*Contact Number:* ${formData.contactNumber}%0A*Email:* ${formData.email}%0A*Residential Address:* ${formData.residentialAddress}%0A*City:* ${formData.city}%0A*Preferred Franchise Location:* ${formData.preferredLocation}%0A%0AI am interested in owning a Brownland Coffee franchise.`

      const whatsappUrl = `https://wa.me/916265470873?text=${message}`
      window.open(whatsappUrl, "_blank")

      // Reset form and hide message
      setFormData({
        fullName: "",
        age: "",
        dateOfBirth: "",
        contactNumber: "",
        email: "",
        residentialAddress: "",
        city: "",
        preferredLocation: "",
      })
      setShowRedirectMessage(false)
    }, 2000)
  }

  return (
    <section id="franchise-form" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="aos-fade-up">
            <p className="text-primary uppercase tracking-widest text-sm mb-4">Start Your Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Apply for <span className="text-primary">Franchise</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and our team will contact you shortly to discuss your franchise opportunity.
            </p>

            {/* Redirect Message Overlay */}
            {showRedirectMessage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                <div className="bg-card p-8 rounded-lg text-center max-w-md mx-4 border border-border">
                  <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Redirecting to WhatsApp</h3>
                  <p className="text-muted-foreground">
                    You will be redirected to chat. Our team will contact you shortly.
                  </p>
                  <div className="flex gap-2 justify-center mt-4">
                    <span className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]" />
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground"
                    placeholder="Your age"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-foreground">
                    Date of Birth *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-foreground">
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-card border-border text-foreground"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="residentialAddress" className="text-foreground">
                  Current Residential Address *
                </Label>
                <Input
                  id="residentialAddress"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  required
                  className="bg-card border-border text-foreground"
                  placeholder="Enter your full address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground">
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground"
                    placeholder="Your city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLocation" className="text-foreground">
                    Preferred Franchise Location *
                  </Label>
                  <Input
                    id="preferredLocation"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground"
                    placeholder="Where do you want to open?"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <MessageCircle className="mr-2 h-5 w-5" />
                Submit Application
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="aos-fade-up" style={{ transitionDelay: "0.2s" }}>
            <div className="bg-card p-8 rounded-lg border border-border sticky top-24">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Us Today!</h3>

              <div className="space-y-6">
                <a
                  href="tel:"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Us</p>
                    <p className="text-foreground font-medium">+91 6265470873</p>
                  </div>
                </a>

                <a
                  href="mailto:brownlandcoffee@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">brownlandcoffee@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/brownlandcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                    <p className="text-foreground font-medium">@brownlandcoffee</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground font-medium">
                      Behind Zudio, Old Rajendra Nagar,
                      <br />
                      Shailendra Nagar, Raipur,
                      <br />
                      Chhattisgarh 492001
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <a
                href="https://wa.me/916265470873?text=Hi, I am interested in Brownland Coffee franchise opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#25D366]/90 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
