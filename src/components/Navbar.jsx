import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const handleClick = (to) => {
    setClickedLink(to);
    setTimeout(() => setClickedLink(null), 200);
  };

  const navLinks = [
    { name: "Home", to: "hero", color: "#ffffff", shadow: "rgba(255, 255, 255, 0.7)", borderColor: "#888888" },
    { name: "Meta Curtis", to: "meta-curtis", color: "#60a5fa", shadow: "rgba(96, 165, 250, 0.7)", borderColor: "#1e40af" },
    { name: "Version 3", to: "version-3", color: "#34d399", shadow: "rgba(52, 211, 153, 0.7)", borderColor: "#065f46" },
    { name: "Contact", to: "contact", color: "#a78bfa", shadow: "rgba(167, 139, 250, 0.7)", borderColor: "#5b21b6" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* MC3V Logo - Left Side */}
        <Link to="hero" smooth={true} duration={800} className="cursor-pointer">
          <motion.div 
            className="flex items-center" 
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-blue-400 font-bold text-xl"
              whileHover={{ 
                textShadow: "0 0 12px rgba(96, 165, 250, 0.8)"
              }}
            >
              MC
            </motion.span>
            <motion.span
              className="text-green-400 font-bold text-xl"
              whileHover={{ 
                textShadow: "0 0 12px rgba(52, 211, 153, 0.8)"
              }}
            >
              3V
            </motion.span>
          </motion.div>
        </Link>

        {/* Holographic Navigation Links - Right Side */}
        <div className="flex space-x-3">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              className="relative group"
              onMouseEnter={() => setHoveredLink(link.to)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {/* Transparent Glow Background - this creates the outer glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-lg blur-lg transition-opacity duration-300 ${
                  hoveredLink === link.to || activeSection === link.to ? "opacity-80" : "opacity-0"
                }`}
                style={{
                  background: `radial-gradient(circle, ${link.color} 0%, transparent 70%)`,
                  transform: "scale(1.2)",
                }}
                animate={{
                  opacity: hoveredLink === link.to || activeSection === link.to ? 0.8 : 0
                }}
              />

              {/* Button Border Glow */}
              <motion.div
                className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                  hoveredLink === link.to || activeSection === link.to ? "opacity-100" : "opacity-50"
                }`}
                style={{
                  boxShadow: `0 0 15px ${link.shadow}`,
                  border: `1px solid ${link.color}`,
                  borderRadius: "15px",
                }}
              />

              {/* Holographic Button */}
              <motion.div
                className="relative px-6 py-2 rounded-lg font-semibold text-white text-sm tracking-wide text-center cursor-pointer"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "15px",
                  border: `1px solid ${link.color}`,
                  color: hoveredLink === link.to || activeSection === link.to ? link.color : "white",
                  textShadow: hoveredLink === link.to || activeSection === link.to ? `0 0 10px ${link.shadow}` : "none",
                }}
                whileHover={{
                  boxShadow: `0 0 20px ${link.shadow}`,
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: clickedLink === link.to ? `0 0 25px ${link.shadow}` : "none"
                }}
              >
                <Link 
                  to={link.to} 
                  smooth={true} 
                  duration={800} 
                  onClick={() => handleClick(link.to)}
                  onSetActive={handleSetActive}
                  spy={true}
                >
                  {link.name}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}