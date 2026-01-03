"use client"

export function OurCafeSection() {
  const cafeImages = [
    {
      src: "/images/img-6405.jpeg",
      alt: "Brownland Night Ambiance",
      caption: "Night Vibes",
    },
    {
      src: "/images/img-6409.jpeg",
      alt: "Brownland Cafe Exterior",
      caption: "Our Kiosk",
    },
    {
      src: "/images/img-6415.jpeg",
      alt: "Branded Coffee Cups Display",
      caption: "Signature Cups",
    },
    {
      src: "/images/img-6416.jpeg",
      alt: "Barista at Work",
      caption: "Crafted With Care",
    },
  ]

  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      {/* Header */}
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <div className="text-center aos-fade-up">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-2">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Cafe</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Where every corner tells a story and every cup sparks joy
          </p>
        </div>
      </div>

      <div className="w-full aos-fade-up" style={{ transitionDelay: "0.2s" }}>
        <div className="flex flex-col md:flex-row h-auto md:h-[70vh] gap-2 md:gap-1 px-4 justify-center">
          {cafeImages.map((image, index) => (
            <div key={index} className="relative w-full md:flex-1 h-64 md:h-full group">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="h-full w-full rounded-lg object-cover"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-lg flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                <p className="text-white font-semibold text-lg">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
