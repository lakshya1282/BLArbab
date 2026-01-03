"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ------------------ DATA ------------------ */

const CATEGORIES = [
  { id: "hot", name: "Hot Coffee" },
  { id: "cold", name: "Cold Brews" },
  { id: "beans", name: "Whole Beans" },
  { id: "merch", name: "Merchandise" },
];

const PRODUCTS: Record<string, any[]> = {
  hot: [
    { name: "BROWN MAGIC", img: "/images/quality.png", desc: "Our signature high-altitude dark roast." },
    { name: "VELVET LATTE", img: "/images/latte.png", desc: "Espresso with micro-foam silkiness." },
    { name: "CAPPUCCINO", img: "/images/cap.png", desc: "A classic balance of foam and soul." },
    { name: "MOCHA BLISS", img: "/images/mocha.png", desc: "Rich chocolate meets espresso." },
    { name: "FLAT WHITE", img: "/images/flat.png", desc: "Pure intensity, zero compromise." },
  ],
  cold: [
    { name: "NITRO COLD", img: "/images/nitro.png", desc: "Infused with nitrogen for a creamy finish." },
    { name: "ICED MOCHA", img: "/images/iced-m.png", desc: "Chilled chocolatey goodness over ice." },
    { name: "VANILLA COLD", img: "/images/v-cold.png", desc: "Sweet vanilla meets 12-hour brew." },
    { name: "ESPRESSO TONIC", img: "/images/tonic.png", desc: "Refreshing, bubbly, and caffeinated." },
    { name: "ICED LATTE", img: "/images/iced-l.png", desc: "The perfect summer refresher." },
  ],
};

/* ------------------ PRODUCT ITEM ------------------ */

const ProductScrollItem = ({ product }: { product: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Smoother ranges: Start appearing at 20% scroll, peak at 50%, fade at 80%
  const yImage = useTransform(smoothProgress, [0, 0.5, 1], ["10vh", "0vh", "-40vh"]);
  const textScale = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0.7, 1, 0.7]);
  const textOpacity = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 0.18, 0]);
  const fogOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 0.4, 0]);
  const descOpacity = useTransform(smoothProgress, [0.35, 0.5, 0.65], [0, 1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full snap-center flex items-center justify-center overflow-hidden">
      
      {/* Fog Ambiance */}
      {/* <motion.div
        style={{ opacity: fogOpacity }}
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(104,52,25,0.25)_0%,_rgba(255,250,243,0)_70%)]"
      /> */}

      {/* Background Text */}
      <motion.h1
        style={{ scale: textScale, opacity: textOpacity }}
        className="font-bebas text-[#683419] text-[22vw] leading-none z-0 select-none pointer-events-none will-change-transform absolute"
      >
        {product.name}
      </motion.h1>

      {/* Sliding Product Image */}
      <motion.div
        style={{ y: yImage }}
        className="relative flex items-center justify-center z-20 pointer-events-none will-change-transform"
      >
        <img
          src={product.img}
          alt={product.name}
          className="h-[60vh] md:h-[75vh] w-auto object-contain drop-shadow-[0_40px_50px_rgba(104,52,25,0.3)]"
        />
      </motion.div>

      {/* Description */}
      <motion.p
        style={{ opacity: descOpacity }}
        className="absolute bottom-[12vh] z-30 text-center px-4 font-lato text-[#683419] text-lg md:text-xl font-bold uppercase tracking-[0.3em]"
      >
        {product.desc}
      </motion.p>
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */

export default function BestSellers() {
  const [activeCat, setActiveCat] = useState("hot");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@300;400;700&display=swap');

        @font-face {
          font-family: 'Awesome_Serif';
          src: url('/fonts/AwesomeSerif-Italic.woff2');
          font-style: italic;
        }

        .font-awesome { font-family: 'Awesome_Serif', serif; font-style: italic; }
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-lato { font-family: 'Lato', sans-serif; }

        .best-sellers-section {
          scroll-snap-type: y mandatory;
          background-color: #fffaf3;
          scroll-behavior: smooth;
        }

        /* Hide scrollbar for cleaner look */
        .best-sellers-section::-webkit-scrollbar { display: none; }
      `}} />

      <section ref={containerRef} className="best-sellers-section relative w-full">
        
        {/* --- PROGRESS LINE (Left Side) --- */}
        {/* <div className="fixed left-6 top-1/2 -translate-y-1/2 h-32 w-[2px] bg-[#683419]/10 z-50 hidden md:block">
          <motion.div 
            className="w-full bg-[#683419] origin-top"
            style={{ scaleY: scrollYProgress, height: '100%' }}
          />
        </div> */}

        {/* --- STICKY HEADER --- */}
        <div className="sticky top-0 z-40 bg-[#fffaf3]/80 backdrop-blur-md py-8 flex flex-col items-center space-y-4">
          <h2 className="font-awesome text-[#683419] text-5xl md:text-6xl">
            Best Sellers
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`font-lato text-[10px] md:text-xs tracking-[0.4em] uppercase transition-all duration-500 pb-1 border-b-2
                ${activeCat === cat.id ? "text-[#683419] border-[#683419]" : "text-[#683419]/30 border-transparent hover:text-[#683419]/60"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="relative">
          {PRODUCTS[activeCat]?.map((product, i) => (
            <ProductScrollItem key={`${activeCat}-${i}`} product={product} />
          ))}
        </div>

        {/* Bottom indicator to show more is coming */}
        <div className="h-[20vh] flex items-start justify-center">
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-[1px] h-12 bg-[#683419]/30"
            />
        </div>
      </section>
    </>
  );
}