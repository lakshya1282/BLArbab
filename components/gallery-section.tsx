import Image from "next/image"

const galleryImages = [
  {
    src: "/images/img-6403.jpeg",
    alt: "Oreo Shake",
    span: "md:col-span-2",
  },
  {
    src: "/images/img-6398.jpeg",
    alt: "Brownie Shake with Brownie",
    span: "md:col-span-2",
  },
  {
    src: "/images/img-6400.jpeg",
    alt: "Iced Lemon Tea and Bombay Masala Sandwich",
    span: "md:col-span-2",
  },
  {
    src: "/images/img-6402.jpeg",
    alt: "Brownland Iced Lemon Tea",
    span: "",
  },
  {
    src: "/images/img-6401.jpeg",
    alt: "Brownland Coffee Signage",
    span: "",
  },
  {
    src: "/images/img-6399.png",
    alt: "Cafe Interior with Coffee Quotes",
    span: "md:col-span-2",
  },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-2">Moments</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Gallery</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A glimpse into the Brownland experience</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          {galleryImages.map((image, index) => (
            <div key={index} className={`relative overflow-hidden rounded-xl group cursor-pointer ${image.span}`}>
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
