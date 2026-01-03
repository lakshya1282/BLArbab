import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// Font Scheme Applied:
// 1. Awesome Serif -> Main Section Title ("OUR JOURNEY") & Decorative Numbers
// 2. Bebas Neue -> Card Headers (Step Titles e.g., "The First Spark" & Years)
// 3. Lato -> Description Paragraphs

interface JourneyStepProps {
  number: number;
  year: string;
  title: string;
  description: string;
  images: string[];
  doodles: { src: string; pos: string }[];
  isRightAligned: boolean;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ number, year, title, description, images = [], doodles, isRightAligned }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images.length]);

  return (
    <div className={`relative w-full flex mb-60 md:mb-96 ${isRightAligned ? 'justify-end' : 'justify-start'}`}>
      
      {/* Freestanding Numbering - FONT: Awesome Serif */}
      <div className={`absolute -top-16 z-40 hidden md:flex items-center justify-center
        ${isRightAligned ? 'left-[10%] lg:left-[15%]' : 'right-[10%] lg:right-[15%]'}`}>
        <span className="font-['Awesome_Serif'] italic text-8xl md:text-9xl font-bold text-[#834024]">
          {number}
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 w-full md:w-[85%] bg-[#F6EEE5] rounded-none min-h-[500px] flex items-center shadow-[0_35px_60px_-15px_rgba(131,64,36,0.15)]"
      >
        {/* Decorative Doodles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {doodles.map((doodle, idx) => (
            <motion.img
              key={idx}
              src={doodle.src}
              alt="Decoration"
              className={`absolute w-32 md:w-48 opacity-20 ${doodle.pos}`}
              animate={{ x: [0, 15, -10, 0], y: [0, -20, 10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 12 + idx * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Image Slider */}
        <div className={`absolute top-1/2 -translate-y-1/2 z-20 w-64 md:w-[450px] lg:w-[500px] 
          ${isRightAligned ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`}>
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative group aspect-square drop-shadow-[0_40px_40px_rgba(131,64,36,0.25)]"
          >
            {totalImages > 1 && (
              <>
                <button onClick={handlePrev} className="absolute -left-4 top-1/2 -translate-y-1/2 z-50 bg-[#834024] text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">‹</button>
                <button onClick={handleNext} className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 bg-[#834024] text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">›</button>
              </>
            )}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain pointer-events-none"
              />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Text Content Area */}
        <div className={`py-20 flex flex-col justify-center max-w-2xl relative z-10
          ${isRightAligned ? 'pl-48 md:pl-72 lg:pl-96 pr-10' : 'pr-48 md:pr-72 lg:pr-96 pl-10 text-right ml-auto'}`}>
          
          {/* Year - FONT: Bebas Neue */}
          <span className="font-['Bebas_Neue'] text-2xl text-[#834024] opacity-50 tracking-[0.4em] mb-4">
            {year}
          </span>
          
          {/* Card Header (Step Title) - FONT: Bebas Neue */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal text-[#834024] mb-8 font-['Bebas_Neue'] tracking-tight leading-none">
            {title}
          </h2>
          
          {/* Description - FONT: Lato */}
          <p className="text-[#834024] text-lg lg:text-xl leading-relaxed font-['Lato'] font-normal opacity-90">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export function AboutCafeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleText = "OUR JOURNEY";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.1", "end 0.9"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0, 0.6], [0, 1]), { stiffness: 45, damping: 30 });

  return (
    <section ref={containerRef} className="relative bg-[#FFFFFF] py-32 overflow-hidden min-h-screen">
      
      {/* Self-contained font imports */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@300;400;700&display=swap');
        
        /* Assuming Awesome Serif is hosted locally or via a separate font-face */
        @font-face {
          font-family: 'Awesome_Serif';
          src: url('/fonts/AwesomeSerif-Italic.woff2') format('woff2'); /* Adjust path as needed */
          font-style: italic;
        }
      `}} />

      {/* Main Section Title - FONT: Awesome Serif */}
      <div className="relative z-40 w-full text-center mb-64 flex flex-col items-center">
        <motion.h1 
          className="text-7xl md:text-[10rem]  font-['Awesome_Serif'] italic text-[#834024]  flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className={char === " " ? "mr-10" : ""}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 relative">
        {/* Decorative Animated Line */}
        <div className="absolute inset-0 z-0 hidden md:block pointer-events-none -top-80">
          <svg width="100%" height="100%" viewBox="0 0 1000 4000" preserveAspectRatio="none" fill="none">
            <motion.path
              d="M 500 100 C 500 400, -130 300, 150 650 L 150 1100 C -110 1450, 850 1450, 850 1800 L 900 2350 C 1000 2950, 250 2800, 150 3100 L 90 3600"
              stroke="#834024" strokeWidth="10" strokeLinecap="round" strokeDasharray="15 25"
              style={{ pathLength, opacity: 0.15 }}
            />
          </svg>
        </div>

        <div className="relative z-10">
          <JourneyStep 
            number={1}
            year="EST. 2024" 
            title="THE FIRST SPARK" 
            description="Your daily dose of Brownland Magic started here. We began with a mission to build a lifestyle and a community that values quality over everything else."
            images={["/outlets/colors/c1.png", "/outlets/colors/c2.png", "/outlets/colors/c3.png"]} 
            isRightAligned={true}
            doodles={[{ src: "/images/sandwich.png", pos: "top-0 -right-0" }, { src: "/images/cake.png", pos: "-bottom-5 right-0" }]}
          />

          <JourneyStep 
            number={2}
            year="FRANCHISE ALPHA" 
            title="SCALING THE DREAM" 
            description="Taking our signature blends to new locations while maintaining artisanal quality and our deep-rooted community values."
            images={["/images/alpha1.png", "/images/alpha2.png", "/images/alpha3.png"]}
            isRightAligned={false}
            doodles={[{ src: "/images/coffee.png", pos: "-top-0 left-0" }, { src: "/images/girl.png", pos: "-bottom-0 left-0" }]}
          />

          <JourneyStep 
            number={3}
            year="THE FUTURE" 
            title="THE BEST IS BREWING" 
            description="A lot more is brewing, and the best is yet to come. The story has only just begun for our community and our flavors."
            images={["/images/future1.png", "/images/future2.png", "/images/future3.png", "/images/future4.png"]}
            isRightAligned={true}
            doodles={[{ src: "/images/girl.png", pos: "top-0 -right-0" }, { src: "/images/cake.png", pos: "-bottom-5 right-0" }]}
          />
        </div>
      </div>
    </section>
  );
}