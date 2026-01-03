import React from 'react';

const CoffeeSection: React.FC = () => {
  // Use the image provided
  const cupImage = "/images/quality.png";

  return (
    <>
      {/* Self-contained font imports and CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
        
        .font-title { font-family: 'Playfair Display', serif; font-style: italic; }
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}} />

      {/* Main Section */}
      <section className="relative h-screen w-screen bg-[#fffaf3] overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* BACKGROUND GLOW - Subtle visual depth behind the cup */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-[60%] h-[60%] bg-[#683419]/10 blur-[150px] rounded-full"></div>
        </div>

        {/* --- LARGE CENTER IMAGE WITH 3D POP-OUT EFFECT --- */}
        {/* Changes for 3D effect:
            1. z-40: Placed higher than text to appear "in front".
            2. removed pointer-events-none: so hover works.
            3. drop-shadow-[...]: A heavy, contour-following shadow using the coffee brown color.
            4. rotate-x-[2deg]: A very subtle tilt to add perspective depth.
            5. hover states: Increased scale and deeper shadow on hover to simulate moving closer.
        */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <img 
            src={cupImage} 
            alt="Brownland Coffee Splash" 
            className="h-[85vh] md:h-[92vh] w-auto object-contain 
                       transform transition-all duration-700 ease-out
                       rotate-x-[2deg]
                       drop-shadow-[0_35px_35px_rgba(104,52,25,0.4)]
                       hover:scale-105 hover:rotate-x-[0deg]
                       hover:drop-shadow-[0_60px_60px_rgba(104,52,25,0.5)]"
          />
        </div>

        {/* --- TEXT CONTENT OVERLAY --- 
            z-30 sits just behind the popping image
        */}
        <div className="relative z-30 w-full h-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-between px-10 md:px-20 py-20 pointer-events-none">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col space-y-24 text-center lg:text-right w-full lg:w-1/4 pointer-events-auto">
            <div className="space-y-4">
              {/* Added subtle text shadow to lift text off background */}
              <h2 className="font-bebas text-4xl md:text-6xl tracking-widest text-[#683419] leading-none drop-shadow-sm">
                PREMIUM <br/> QUALITY
              </h2>
              <p className="font-lato text-lg md:text-xl text-[#683419] leading-relaxed max-w-xs ml-auto font-semibold">
                Beans hand-picked from the finest regions around the world.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bebas text-4xl md:text-6xl tracking-widest text-[#683419] leading-none drop-shadow-sm">
                EXPERT <br/> ROASTING
              </h2>
              <p className="font-lato text-lg md:text-xl text-[#683419] leading-relaxed max-w-xs ml-auto font-semibold">
                Perfect flavor unlocked through small-batch master roasting.
              </p>
            </div>
          </div>

          {/* EMPTY CENTER SPACE */}
          <div className="hidden lg:block lg:w-1/2 h-full"></div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col space-y-24 text-center lg:text-left w-full lg:w-1/4 pointer-events-auto">
            <div className="space-y-4">
              <h2 className="font-bebas text-4xl md:text-6xl tracking-widest text-[#683419] leading-none drop-shadow-sm">
                SUSTAINABLE -
              </h2>
              <p className="font-lato text-lg md:text-xl text-[#683419] leading-relaxed max-w-xs font-semibold">
                Ethically sourced from farms committed to the environment.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bebas text-4xl md:text-6xl tracking-widest text-[#683419] leading-none drop-shadow-sm">
                FRESH ALWAYS -
              </h2>
              <p className="font-lato text-lg md:text-xl text-[#683419] leading-relaxed max-w-xs font-semibold">
                Roasted to order and delivered within days of the process.
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM TITLE */}
        {/* <div className="absolute bottom-8 left-0 w-full text-center z-20">
          <h1 className="font-title text-4xl md:text-6xl text-[#683419] opacity-40">
            Brownland Magic.
          </h1>
        </div> */}
      </section>
    </>
  );
};

export default CoffeeSection;