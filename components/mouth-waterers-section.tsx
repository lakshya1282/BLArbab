const foodImages = [
  {
    src: "/images/img-6403.jpeg",
    alt: "Oreo Shake",
    description: "Creamy Oreo milkshake topped with a cookie",
  },
  {
    src: "/images/img-6398.jpeg",
    alt: "Brownie Shake",
    description: "Rich brownie shake with a decadent brownie",
  },
  {
    src: "/images/img-6400.jpeg",
    alt: "Iced Lemon Tea & Sandwich",
    description: "Refreshing lemon tea with Bombay Masala Sandwich",
  },
  {
    src: "/images/img-6410.jpeg",
    alt: "Signature Shake",
    description: "Our signature shake on a rustic wooden coaster",
  },
  {
    src: "/images/img-6411.jpeg",
    alt: "Coffee & Sandwich Combo",
    description: "Hot coffee with crispy grilled sandwiches",
  },
  {
    src: "/images/img-6402.jpeg",
    alt: "Iced Lemon Tea",
    description: "Refreshing iced lemon tea to cool you down",
  },
  {
    src: "/images/img-6414.jpeg",
    alt: "Fresh Mint Lemonade",
    description: "Zesty lemonade with fresh mint and lime",
  },
  {
    src: "/images/img-6412.jpeg",
    alt: "Garden Combo",
    description: "Grilled sandwich with coffee in lush greenery",
  },
  {
    src: "/images/img-6413.jpeg",
    alt: "Brownland Nights",
    description: "Our iconic neon sign glowing at night",
  },
]

export function MouthWaterersSection() {
  return (
    <section id="dishes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 aos-fade-up">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-2">Delights</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{"Our Mouth Waterer's"}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Handcrafted treats that make every visit unforgettable
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {foodImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer bg-secondary/50 aos-zoom-in"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-1">{image.alt}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
