// ✅ Ensure this file is named `index.jsx`
// ✅ Re-exports all sections from their respective files
// ✅ Tailwind v4 + Vite Optimized

export { default as HeroSection } from "./HeroSection";
export { default as MetaCurtisSection } from "./MetaCurtisSection"; // ✅ Includes AboutSection content
export { default as Version3Section } from "./Version3Section"; // ✅ Restored Version 3 Section
export { default as ContactSection } from "./ContactSection";
export { default as ServicesSection } from "./ServicesSection"; // ✅ Ensure services section is included

