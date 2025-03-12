import React, { Suspense, lazy } from "react";
import WebGLBackground from "./backgrounds/WebGLBackground"; // ✅ Ensures Background Persistence

// 🚀 Lazy-load all sections for optimized performance
const Navbar = lazy(() => import("./components/Navbar"));
const HeroSection = lazy(() => import("./sections/HeroSection"));
const MetaCurtisSection = lazy(() => import("./sections/MetaCurtisSection"));
const Version3Section = lazy(() => import("./sections/Version3Section"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const TheSystemSection = lazy(() => import("./sections/TheSystemSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));


function App() {
  return (
    <div className="relative">
      {/* ✅ Background will persist but NOT block sections */}
      <WebGLBackground className="absolute inset-0 -z-10" />

      {/* ✅ Optimized Lazy-loading with Suspense */}
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Navbar />
      </Suspense>

      {/* ✅ Sections are now properly layered ABOVE the background */}
      <main className="relative z-10">
        <Suspense fallback={<div className="text-white">Loading Sections...</div>}>
          <HeroSection />
          <MetaCurtisSection />
          <Version3Section />
          <TheSystemSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
