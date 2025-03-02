import React, { Suspense, lazy, useState, useEffect } from 'react';

// Lazy-loaded components for code splitting
const Navbar = lazy(() => import('../components/Navbar'));

// Loading placeholders
const NavbarPlaceholder = () => (
  <header className="fixed top-0 w-full h-16 bg-black/80 backdrop-blur-sm z-50">
    <div className="flex items-center justify-between h-full px-4 max-w-screen-xl mx-auto">
      <div className="w-10 h-10"></div>
      <nav className="hidden md:flex space-x-8"></nav>
      <div className="w-10 h-10 md:hidden"></div>
    </div>
  </header>
);

export default function Layout({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mark as loaded after initial render
  useEffect(() => {
    // Remove loader
    const loader = document.querySelector('.loader');
    if (loader) {
      // Add exit animation
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      
      // Remove after animation
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
        setIsLoaded(true);
      }, 500);
    } else {
      setIsLoaded(true);
    }
    
    // Report performance metrics
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          console.log(`Page load time: ${pageLoadTime}ms`);
          
          // Send to analytics if needed
          // logPerformance('page_load', pageLoadTime);
        }, 0);
      });
    }
  }, []);
  
  return (
    <>
      <Suspense fallback={<NavbarPlaceholder />}>
        <Navbar />
      </Suspense>
      
      <main id="main-content" className="min-h-screen bg-black text-white">
        {children}
      </main>
      
      {/* Minimal footer with better performance */}
      <footer className="py-8 bg-black text-white/50 text-center text-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Meta Curtis. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
