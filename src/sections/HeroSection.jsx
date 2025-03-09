import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useMemo, useEffect } from "react";
import WebGLBackground from "../layouts/WebGLBackground";


// Animation Variants (Lazy Loaded for Performance)
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  // Memoized Letter Data to Prevent Unnecessary Renders
  const letters = useMemo(() => [
    { letter: "M", sub: "eta", color: "#ff00ff", section: "meta-curtis" }, // Magenta
    { letter: "C", sub: "urtis", color: "#ff00ff", section: "meta-curtis" }, // Magenta
    { letter: "3", sub: "rd", color: "#ff66ff", section: "version-3" }, // Pink
    { letter: "V", sub: "ersion", color: "#ff66ff", section: "version-3" }, // Pink
  ], []);
  
  // Force body background to match scene background
  useEffect(() => {
    // Save the original background
    const originalBackground = document.body.style.background;
    
    // Set dark background to avoid white flash during load
    document.body.style.background = "#0a0a18";
    
    // Cleanup on unmount
    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);
  
  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative"
      aria-labelledby="hero-heading"
    >
      {/* WebGL Background */}
      <WebGLBackground />
      
      {/* Hero Text */}
      <div className="text-center relative z-10">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          id="hero-heading"
          className="text-3xl md:text-4xl font-light text-white/80 tracking-wider"
        >
          Digital Experience Creator
        </motion.h1>
        
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-2 text-lg md:text-xl text-white/50 tracking-widest"
        >
          MC3V
        </motion.p>
        
        {/* MC3V Letter Reveal */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1.8}
          className="flex items-center justify-center gap-16 mt-8"
        >
          {letters.map(({ letter, sub, color, section }, index) => (
            <Link
              key={letter}
              to={section}
              smooth={true}
              duration={800}
              offset={-50}
              className="relative group"
            >
              <motion.h1
                whileHover={{
                  scale: 1.05,
                  textShadow: `0 0 25px ${color}`,
                }}
                whileTap={{ scale: 0.98, textShadow: `0 0 20px ${color}` }}
                className="text-9xl md:text-[9.5rem] font-bold cursor-pointer transition-all duration-300"
                style={{ color }}
                aria-label={`${letter}${sub}`}
              >
                {letter}
              </motion.h1>
              <span
                className="absolute -right-10 bottom-3 text-white/70 text-lg italic font-[cursive] tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontSize: "1rem", fontFamily: "Dancing Script, cursive" }}
              >
                {sub}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-white/50 text-sm mb-2">Scroll to Explore</span>
        <motion.div
          className="w-5 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div
            className="w-1 h-2 bg-white/40 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}