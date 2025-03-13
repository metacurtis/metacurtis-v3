import React, { Suspense, lazy, useState, useEffect } from "react";
import WebGLCanvas from "./components/WebGLCanvas"; // ✅ Ensures Background Persistence

// Lazy-load sections
const Navbar = lazy(() => import("./components/Navbar"));
const HeroSection = lazy(() => import("./sections/HeroSection"));
const Version3Section = lazy(() => import("./sections/Version3Section")); // ✅ ADD BACK
const MetaCurtisSection = lazy(() => import("./sections/MetaCurtisSection"));
const ServicesSection = lazy(() => import("./sections/ServicesSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

// Loading Component
function LoadingFallback({ message }) {
  return (
    <div className="flex justify-center items-center min-h-[200px] text-white">
      <div className="animate-pulse">{message}</div>
    </div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Persistent Background */}
      <WebGLCanvas className="fixed inset-0 -z-10" />

      {/* Main App Content */}
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Suspense fallback={<div className="h-16 bg-black bg-opacity-50" />}>
          <Navbar />
        </Suspense>

        <main className="relative z-10">
          <Suspense fallback={<LoadingFallback message="Loading Experience..." />}>
            <HeroSection />
          </Suspense>

          <Suspense fallback={<LoadingFallback message="Loading Version 3..." />}>
            <Version3Section />
          </Suspense>

          <Suspense fallback={<LoadingFallback message="Loading Content..." />}>
            <MetaCurtisSection />
          </Suspense>

          <Suspense fallback={<LoadingFallback message="Loading Services..." />}>
            <ServicesSection />
          </Suspense>

          <Suspense fallback={<LoadingFallback message="Loading Contact..." />}>
            <ContactSection />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;