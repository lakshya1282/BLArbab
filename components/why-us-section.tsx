export function WhyUsSection() {
  const benefits = [
    {
      title: "0% Royalty",
      description: "Keep all your profits. No recurring royalty fees ever.",
      icon: "💰",
    },
    {
      title: "Proven Brand",
      description: "Join a trusted name with a loyal customer base.",
      icon: "⭐",
    },
    {
      title: "Complete Support",
      description: "Training, marketing, and operational support included.",
      icon: "🤝",
    },
    {
      title: "Low Investment",
      description: "Start your business with minimal capital requirements.",
      icon: "📊",
    },
    {
      title: "Premium Products",
      description: "Signature recipes and high-quality ingredients.",
      icon: "☕",
    },
    {
      title: "Fast Setup",
      description: "Quick onboarding and setup process to get you started.",
      icon: "⚡",
    },
  ]

  return (
    <section id="why-us" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 aos-fade-up">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-2">Benefits</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Brownland</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join a growing family of successful franchisees with unmatched support and zero royalty fees
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow aos-zoom-in"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
