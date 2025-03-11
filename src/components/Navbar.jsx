import { useState } from "react";
import { motion, useTransform, useScroll, useReducedMotion } from "framer-motion";
import { Link } from "react-scroll";

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Smooth scrolling with optimized state management
  const navbarY = useTransform(scrollY, [0, 300], [0, -15]);

  const handleSetActive = (to) => setActiveSection(to);
  const handleClick = (to) => {
    setClickedLink(to);
    setTimeout(() => setClickedLink(null), 200);
  };

  // Navigation links with colors & animations
  const navLinks = [
    { name: "Service", to: "service", color: "#fbbf24", shadow: "rgba(251, 191, 36, 0.7)", borderColor: "#d97706" },
    { name: "Meta Curtis", to: "meta-curtis", color: "#60a5fa", shadow: "rgba(96, 165, 250, 0.7)", borderColor: "#1e40af" },
    { name: "Version 3", to: "version-3", color: "#34d399", shadow: "rgba(52, 211, 153, 0.7)", borderColor: "#065f46" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ y: prefersReducedMotion ? 0 : navbarY }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[80%] max-w-5xl h-12 flex justify-between items-center rounded-full border border-white/20 backdrop-blur-xl bg-transparent"
    >
      {/* MC3V Home Button on the Left Side */}
      <Link to="hero" smooth duration={800} className="cursor-pointer">
        <motion.div className="flex items-center pl-4" whileHover={{ scale: 1.05 }}>
          <motion.span className="text-blue-400 font-bold text-xl">MC</motion.span>
          <motion.span className="text-green-400 font-bold text-xl">3V</motion.span>
        </motion.div>
      </Link>

      {/* Navigation Links on the Right Side */}
      <motion.div className="flex space-x-6 pr-4">
        {navLinks.map((link) => (
          <motion.button
            key={link.to}
            className="relative group px-4 py-1 rounded-lg font-semibold text-white text-sm tracking-wide text-center cursor-pointer"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: `1px solid ${link.color}`,
              borderRadius: "12px",
              color: hoveredLink === link.to || activeSection === link.to ? link.color : "white",
              textShadow: hoveredLink === link.to || activeSection === link.to ? `0 0 10px ${link.shadow}` : "none",
              willChange: "transform, opacity",
            }}
            whileHover={{ boxShadow: `0 0 15px ${link.shadow}` }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: clickedLink === link.to ? `0 0 25px ${link.shadow}` : "none" }}
            onMouseEnter={() => setHoveredLink(link.to)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Link to={link.to} smooth duration={800} onClick={() => handleClick(link.to)} onSetActive={handleSetActive} spy>
              {link.name}
            </Link>
          </motion.button>
        ))}
      </motion.div>
    </motion.nav>
  );
}
