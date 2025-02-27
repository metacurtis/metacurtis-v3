import { motion } from "framer-motion";
import { Link } from "react-scroll";

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen w-full flex items-center justify-center p-4 relative">
      {/* Grid background with animation */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),_linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Animated gradient orb */}
        <motion.div
          className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-3xl"
          style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-16"
        >
          {/* MC */}
          <Link to="meta-curtis" smooth={true} duration={800} offset={-50} className="relative">
            <motion.h1
              whileHover={{ scale: 1.05, color: "rgb(59, 130, 246)", textShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98, textShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
              className="text-9xl md:text-[9.5rem] font-bold text-white cursor-pointer transition-all duration-300"
            >
              M
            </motion.h1>
            <span className="absolute -right-10 bottom-3 text-blue-400 text-lg italic font-[cursive] tracking-wide opacity-80">
              eta
            </span>
          </Link>

          <Link to="meta-curtis" smooth={true} duration={800} offset={-50} className="relative">
            <motion.h1
              whileHover={{ scale: 1.05, color: "rgb(59, 130, 246)", textShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98, textShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
              className="text-9xl md:text-[9.5rem] font-bold text-white cursor-pointer transition-all duration-300"
            >
              C
            </motion.h1>
            <span className="absolute -right-10 bottom-3 text-blue-400 text-lg italic font-[cursive] tracking-wide opacity-80">
              urtis
            </span>
          </Link>

          {/* 3V */}
          <Link to="version-3" smooth={true} duration={800} offset={-50} className="relative">
            <motion.h1
              whileHover={{ scale: 1.05, color: "rgb(16, 185, 129)", textShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.98, textShadow: "0 0 15px rgba(16, 185, 129, 0.7)" }}
              className="text-9xl md:text-[9.5rem] font-bold text-white cursor-pointer transition-all duration-300"
            >
              3
            </motion.h1>
            <span className="absolute -right-6 bottom-3 text-green-400 text-lg italic font-[cursive] tracking-wide opacity-80">
              rd
            </span>
          </Link>

          <Link to="version-3" smooth={true} duration={800} offset={-50} className="relative">
            <motion.h1
              whileHover={{ scale: 1.05, color: "rgb(16, 185, 129)", textShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.98, textShadow: "0 0 15px rgba(16, 185, 129, 0.7)" }}
              className="text-9xl md:text-[9.5rem] font-bold text-white cursor-pointer transition-all duration-300"
            >
              V
            </motion.h1>
            <span className="absolute -right-10 bottom-3 text-green-400 text-lg italic font-[cursive] tracking-wide opacity-80">
              ersion
            </span>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-white/70 text-xl"
        >
          Innovation. Precision. Presence.
        </motion.p>
      </div>
    </section>
  );
}
