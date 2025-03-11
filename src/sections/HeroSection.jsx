import { motion } from "framer-motion";
import { Suspense, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import WebGLBackground from "../layouts/WebGLBackground";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  // Set Background Color
  useEffect(() => {
    const originalBackground = document.body.style.background;
    document.body.style.background = "#0a0a18";
    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);

  return (
    <section
      id="hero"
      className="h-screen w-full flex items-center justify-center p-4 relative"
      aria-labelledby="hero-heading"
    >
      {/* WebGL Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <WebGLBackground />
      </Suspense>

      {/* Hero Text - Centered */}
      <div className="relative z-10 text-center bg-transparent">
        {/* Hero Heading with Magenta Color */}
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          id="hero-heading"
          className="text-4xl md:text-6xl font-light tracking-wider text-[#ff00ff]"
        >
          Digital Experience Creator
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-4 text-lg md:text-2xl text-white/60 font-semibold tracking-widest"
        >
          <Typewriter
            words={[
              "A Web Design & Business Transformation Company...",
              "Innovate. Transform. Elevate.",
              "Future-Driven Digital Solutions..."
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={60}  // Slower typing effect
            deleteSpeed={40} // Smooth deletion
            delaySpeed={2500} // Longer delay before switching
          />
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-white/50 text-sm mb-2">Scroll to Explore</span>
        <motion.div className="w-5 h-10 border-2 border-white/20 rounded-full flex justify-center">
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
