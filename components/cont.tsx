// import React from 'react';
// import { motion } from 'framer-motion';

// // Path to your generated Brownland Coffee image
// const generatedImage = '/images/coffee1.png'; 

// const HeroBanner = () => {
//   return (
//     /* Reduced section height from h-screen to h-[500px] */
//     <div className="relative w-full h-[500px] overflow-hidden bg-[#F6EEE5]">
//       {/* Background Image with Fixed Attachment */}
//       <div 
//         className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat grayscale-[15%] brightness-[0.85]"
//         style={{ backgroundImage: `url(${generatedImage})` }}
//       >
//         {/* Brand-aligned gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#834024]/30 via-transparent to-[#F6EEE5]/80"></div>
//       </div>

//       {/* Content Layer */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
//         <div className="max-w-2xl">
//           {/* Subtitle: Reduced to text-xs/sm */}
         

//           {/* Headline: Reduced to text-4xl/6xl */}
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.4 }}
//            style={{ 
//               // fontFamily: "var(--font-cormorant), serif  ",
//               textShadow: "2px 4px 10px rgba(0,0,0,0.3)"
//             }}
//             className="font-['Awesome_Serif'] italic text-4xl md:text-6xl font-stretch-ultra-expanded text-[#834024] leading-tight mb-8 "
//           >
         
//             <span className="text-white drop-shadow-md">Brownland Coffee is more than a coffee.</span>
//           </motion.h1>
          
//           {/* Button: Reduced font and padding */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.8 }}
//           >
            
//           </motion.div>
//         </div>
//       </div>

//       {/* Subtle Bottom Transition */}
//       <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-[#F6EEE5] to-transparent z-20"></div>
//     </div>
//   );
// };

// export default HeroBanner;