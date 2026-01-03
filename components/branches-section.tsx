"use client"

import { MapPin, Navigation, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const branches = [
  {
    id: 1,
    name: "Shailendra Nagar",
    address: "Shailendra Nagar, Raipur, Chhattisgarh 492001",
    mapUrl:
      "https://www.google.com/maps/place/Brownland+Coffee/@21.2430078,81.6670497,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28dd0064a4b2c3:0x926c56c5dc0b2d83!8m2!3d21.2430078!4d81.6696246!16s%2Fg%2F11xlcjtmnp?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 21.2514, lng: 81.6296 },
  },
  {
    id: 2,
    name: "Colours Mall",
    address: "Colours mall, Amrapali Society, Pachpedi Naka, Raipur, Tikrapara, Chhattisgarh 492001",
    mapUrl:
      "https://www.google.com/maps/place/BROWNLAND+COFFEE/@21.2165171,81.6537386,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28dd9f06603401:0xa0364442653eb07e!8m2!3d21.2165171!4d81.6563135!16s%2Fg%2F11xn542tlm?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 21.2365, lng: 81.6337 },
  },
  {
    id: 3,
    name: "Devendra Nagar",
    address: "No 5, opp. gate, near police station, Sector 1, Pandri, Devendra Nagar, Raipur, Chhattisgarh 492004",
    mapUrl:
      "https://www.google.com/maps/place/Brownland+Coffee/@21.2576823,81.6415454,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28dd003f42456b:0x34691268097e5a5c!8m2!3d21.2576824!4d81.6464163!16s%2Fg%2F11wc30z3vk?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 21.2288, lng: 81.6352 },
  },
  {
    id: 4,
    name: "Avanti Vihar",
    address: "L-5, Avanti Vihar, Shankar Nagar, Raipur, Chhattisgarh 492001",
    mapUrl: "https://www.google.com/maps/place/Brownland+Coffee/@21.2430078,81.6670497,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28dd0064a4b2c3:0x926c56c5dc0b2d83!8m2!3d21.2430078!4d81.6696246!16s%2Fg%2F11xlcjtmnp?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 21.2456, lng: 81.6198 },
  },
  {
    id: 5,
    name: "Tatibandh",
    address: "Hirapur Rd, opposite Singhania Sarovar Portico, Sarvodaya Nagar, Brownland, Tatibandh, Raipur, Chhattisgarh 492099",
    mapUrl: "https://www.google.com/maps/place/Brownland+Coffee/@21.2611911,81.5809391,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28dff035731c93:0x65320b00d663b110!8m2!3d21.2611911!4d81.583514!16s%2Fg%2F11ydv73_yq?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 21.2456, lng: 81.6198 },
  },  
  {
    id: 6,
    name: "Samta Colony (Opening Soon)",
    address: " ",
    mapUrl: "",
    coords: { lat: 21.2456, lng: 81.6198 },
  },  
    {
    id: 7,
    name: "Mowa (Opening Soon)",
    address: " ",
    mapUrl: "",
    coords: { lat: 21.2456, lng: 81.6198 },
  },  
]

export function BranchesSection() {
  return (
    <section id="branches" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 aos-fade-up">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-2">Find Us</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Branches</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Visit any of our 4 locations across Raipur for the perfect cup of coffee
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group aos-fade-up"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-full group-hover:bg-primary/30 transition-colors">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{branch.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{branch.address}</p>
              {index !== 5 && index !== 6 && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-4">
                  <Clock className="h-4 w-4" />
                  <span>9:00 AM - 10:00 PM</span>
                </div>
              )}
              <Button
                asChild={index !== 5 && index !== 6}
                variant="outline"
                size="sm"
                className="w-full border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                disabled={index === 5 || index === 6}
              >
                {index === 5 || index === 6 ? (
                  <span>
                    <Navigation className="h-4 w-4 mr-2 inline" />
                    Coming Soon...
                  </span>
                ) : (
                  <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-border aos-fade-up">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59524.04697404!2d81.5878!3d21.2514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dde17cb25c31%3A0x9e5f0f9e8b8b8b8b!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Brownland Coffee Locations in Raipur"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Order Online CTA */}
        <div className="mt-12 text-center aos-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#E23744]/10 to-primary/10 rounded-2xl p-6 border border-[#E23744]/20">
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">Can't visit us?</h3>
              <p className="text-muted-foreground text-sm">Order your favorite coffee online!</p>
            </div>
            <Button asChild size="lg" className="bg-[#E23744] text-white hover:bg-[#E23744]/90">
              <a
                href="https://www.zomato.com/raipur/brownland-coffee-1-civil-lines"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on Zomato
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
