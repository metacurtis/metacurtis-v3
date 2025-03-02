# Create a new script file
touch optimize-mc.sh

# Append the first part to the file
cat >> optimize-mc.sh << 'PART1'
# Create required directories if they don't exist
mkdir -p public/fonts
mkdir -p src/layouts
mkdir -p src/utils

# Create Vite configuration file
cat > vite.config.mjs << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    // React with better Fast Refresh
    react({
      fastRefresh: true,
      // Minimize re-renders
      jsxRuntime: 'automatic',
    }),
    
    // Tailwind CSS v4 integration - faster than PostCSS
    tailwindcss(),
    
    // Image optimization
    imagetools({
      defaultDirectives(url) {
        // Apply WebP format for better compression
        return new URLSearchParams('format=webp&q=80')
      },
    }),
    
    // PWA support for offline capability and better performance
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Meta Curtis V3',
        short_name: 'MC3V',
        description: 'A bold, minimal digital experience',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
    
    // Bundle analysis (only in build mode)
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  // Path aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  
  // Build optimizations
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Only generate sourcemaps in dev mode
    sourcemap: process.env.NODE_ENV !== 'production',
    // Optimize CSS
    cssCodeSplit: true,
    // Aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
      },
    },
    // Output chunk optimization
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion', 'react-scroll'],
        },
        // Use hashes for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
    // Create compressed files
    reportCompressedSize: true,
    // Pre-loading for critical assets
    assetsInlineLimit: 4096, // 4kb
    // Avoid excessive chunks
    chunkSizeWarningLimit: 1000,
  },
  
  // Server optimizations
  server: {
    port: 3000,
    // Fast Hot Module Replacement
    hmr: {
      overlay: true,
    },
    // Disable host check for dev
    strictPort: false,
    // Compression for faster dev loading
    middlewareMode: true,
  },
  
  // Preview server for testing production build
  preview: {
    port: 8080,
    // Add compression
    compress: true,
    // Add headers for better caching
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  
  // Experimental features
  experimental: {
    // Much faster builds
    renderBuiltUrl(filename) {
      return `/${filename}`
    },
  },
})
EOF

# Create Tailwind config file (optional but optimized)
cat > tailwind.config.mjs << 'EOF'
import { type Config } from 'tailwindcss'

/** @type {Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Modern font stack
      fontFamily: {
        sans: [
          'var(--font-sans, system-ui)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono, ui-monospace)',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      // Performance-optimized animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gentle': 'pulseGentle 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      // More efficient blur and backdrop settings
      backdropBlur: {
        'xs': '2px',
      },
      // Transitions optimized for animations
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
      // Additional modern colors for gradients
      colors: {
        // P3 colors for wider gamut displays
        'blue': {
          400: 'oklch(0.66 0.22 261.8)',
          500: 'oklch(0.59 0.24 262.4)',
        },
        'green': {
          400: 'oklch(0.77 0.18 153.6)',
          500: 'oklch(0.73 0.21 154.5)',
        },
      },
    },
  },
  // Optimized plugins
  plugins: [],
  // Tailwind v4 CSS variables enabled
  corePlugins: {
    // Disable preflight if using custom reset
    preflight: true,
    container: true,
  },
  // Safelist essential classes that might be generated dynamically
  safelist: [
    'text-blue-500',
    'text-green-500',
    'opacity-0',
    'opacity-100',
    'scale-100',
    'scale-105',
  ],
}
EOF

# Update the main CSS file
cat > src/style.css << 'EOF'
@import "tailwindcss";

/* Theme Variables  */
@layer theme {
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
    
    /* Font Configuration */
    --font-sans: "CustomFont", system-ui, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, monospace;
    --font-cursive: "Satisfy", cursive, sans-serif;
    
    /* Animation Speeds */
    --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    
    /* Spacing Scale */
    --spacing: 0.25rem;
    
    /* Brand Colors */
    --color-blue-400: oklch(0.66 0.22 261.8);
    --color-blue-500: oklch(0.59 0.24 262.4);
    --color-green-400: oklch(0.77 0.18 153.6);
    --color-green-500: oklch(0.73 0.21 154.5);
  }
}

/* Base Layer */
@layer base {
  html {
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
  }
  
  body {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    background-color: var(--color-black);
    color: var(--color-white);
  }
  
  /* Font Optimizations */
  @font-face {
    font-family: "CustomFont";
    src: url("/fonts/custom-font.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: "CustomFont";
    src: url("/fonts/custom-font-bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Improve Performance for animations */
  .will-change-transform {
    will-change: transform;
  }
  
  .font-cursive {
    font-family: var(--font-cursive);
  }
  
  /* Content Visibility for better performance */
  .content-visibility-auto {
    content-visibility: auto;
  }
  
  /* Avoid layout shifts */
  img, video, canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }
}

/* Custom Components */
@layer components {
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Optimized grid display for hero */
  .optimized-grid {
    background-image: 
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  /* Custom blur with better performance */
  .optimized-blur {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  /* Optimized image display */
  .img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  }
  
  .img-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Custom Utilities */
@layer utilities {
  /* Optimized transitions with better performance */
  .transition-gpu {
    transition-property: transform, opacity;
    transition-timing-function: var(--ease-standard);
    transition-duration: 300ms;
    transform: translateZ(0); /* Forces GPU acceleration */
  }
  
  /* High contrast focus indicators for accessibility */
  .focus-visible-outline {
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black;
  }
  
  /* Image rendering optimizations */
  .rendering-crisp {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
EOF

# Create optimized index.html in the root directory
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Charset & Viewport -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">

    <!-- SEO & Social Media Meta Tags -->
    <meta name="description" content="Meta Curtis V3 – A Bold Digital Experience">
    <meta property="og:title" content="Meta Curtis V3">
    <meta property="og:description" content="A bold, minimal digital experience combining design, innovation, and branding.">
    <meta property="og:image" content="/meta-preview.jpg">
    <meta property="og:url" content="https://www.metacurtis.com">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Meta Curtis V3">
    <meta name="twitter:description" content="A bold, minimal digital experience combining design, innovation, and branding.">
    <meta name="twitter:image" content="/meta-preview.jpg">
    <link rel="canonical" href="https://www.metacurtis.com">

    <!-- Performance optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    
    <!-- Resource hints -->
    <link rel="preload" href="/fonts/custom-font.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/src/style.css" as="style">
    <link rel="preload" fetchpriority="high" href="/meta-preview.jpg" as="image">

    <!-- PWA support -->
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" href="/favicon.ico" sizes="any">

    <!-- Critical CSS inline -->
    <style>
      /* Minimal critical CSS */
      :root {
        color-scheme: dark;
      }
      body {
        margin: 0;
        background-color: #000;
        color: #fff;
        font-family: system-ui, -apple-system, sans-serif;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      .sr-only.focus\:not-sr-only:focus {
        position: fixed;
        top: 0.5rem;
        left: 0.5rem;
        width: auto;
        height: auto;
        padding: 0.5rem;
        background: #000;
        color: #fff;
        z-index: 9999;
        border: 2px solid #3b82f6;
      }
      
      /* Initial loading state */
      .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        z-index: 9999;
      }
      .loader::after {
        content: '';
        width: 48px;
        height: 48px;
        border: 3px solid rgba(59, 130, 246, 0.1);
        border-radius: 50%;
        border-top-color: #3b82f6;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>

    <!-- External CSS -->
    <link rel="stylesheet" href="/src/style.css">

    <!-- Page Title -->
    <title>MC3V | Meta Curtis V3</title>

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Website",
        "name": "Meta Curtis V3",
        "url": "https://www.metacurtis.com",
        "description": "A bold, minimal digital experience combining design, innovation, and branding.",
        "image": "https://www.metacurtis.com/meta-preview.jpg"
      }
    </script>
  </head>

  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
    
    <div id="root">
      <!-- Initial loading indicator -->
      <div class="loader" aria-label="Loading content, please wait"></div>
    </div>
    
    <!-- JavaScript -->
    <script type="module" src="/src/main.jsx"></script>
    
    <!-- Optional: Register service worker for PWA -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered:', registration);
          }).catch(error => {
            console.error('SW registration failed:', error);
          });
        });
      }
    </script>
  </body>
</html>
EOF

# Create optimized hero component
cat > src/components/sections/HeroSection.jsx << 'EOF'
import { useState, useEffect, lazy, Suspense, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-scroll";

# Memoized smaller components
const AnimatedLetter = memo(({ letter, suffix, color, to, duration, offset = -50 }) => {
  # Respect user's reduced motion settings
  const prefersReducedMotion = useReducedMotion();
  
  const shadowColor = color === "blue" ? "rgba(59, 130, 246, 0.5)" : "rgba(16, 185, 129, 0.5)";
  const textColor = color === "blue" ? "rgb(59, 130, 246)" : "rgb(16, 185, 129)";
  const suffixColor = color === "blue" ? "text-blue-400" : "text-green-400";
  
  return (
    <Link to={to} smooth={true} duration={duration} offset={offset} className="relative">
      <motion.h1
        whileHover={!prefersReducedMotion ? {
          scale: 1.05,
          color: textColor,
          textShadow: `0 0 20px ${shadowColor}`
        } : {}}
        whileTap={!prefersReducedMotion ? {
          scale: 0.98,
          textShadow: `0 0 15px ${shadowColor}`
        } : {}}
        className="text-7xl sm:text-8xl md:text-9xl font-bold text-white cursor-pointer transition-transform"
      >
        {letter}
      </motion.h1>
      {suffix && (
        <span className={`absolute -right-6 sm:-right-10 bottom-3 ${suffixColor} text-lg italic font-cursive tracking-wide opacity-80`}>
          {suffix}
        </span>
      )}
    </Link>
  );
});

# Memoized Gradient Orb for better performance
const GradientOrb = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="absolute -z-10 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-3xl will-change-transform"
      style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
      animate={!prefersReducedMotion ? {
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.4, 0.3],
      } : {}}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut",
        # Optimize performance with GPU acceleration 
        type: "tween",
      }}
      aria-hidden="true"
    />
  );
});

export default function HeroSection() {
  # State to track if component is mounted (for hydration)
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  # Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  # Pre-connect to necessary resources
  useEffect(() => {
    # Add preconnect link
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = '/';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  # Animations only if motion is allowed
  const textAnimation = !prefersReducedMotion ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  } : {};
  
  const subTextAnimation = !prefersReducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.5, duration: 0.8 }
  } : {};

  return (
    <section 
      id="hero" 
      className="min-h-screen w-full flex items-center justify-center p-4 relative"
      aria-label="Hero section"
    >
      {/* Grid background with optimized rendering */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),_linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
          aria-hidden="true"
        ></div>
        
        {/* Only animate if component is mounted and motion is allowed */}
        {isMounted && <GradientOrb />}
      </div>

      <div className="text-center relative z-10">
        <motion.div 
          {...textAnimation}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {/* MC */}
          <AnimatedLetter 
            letter="M" 
            suffix="eta" 
            color="blue" 
            to="meta-curtis" 
            duration={800} 
          />

          <AnimatedLetter 
            letter="C" 
            suffix="urtis" 
            color="blue" 
            to="meta-curtis" 
            duration={800} 
          />

          {/* 3V */}
          <AnimatedLetter 
            letter="3" 
            suffix="rd" 
            color="green" 
            to="version-3" 
            duration={800} 
          />

          <AnimatedLetter 
            letter="V" 
            suffix="ersion" 
            color="green" 
            to="version-3" 
            duration={800} 
          />
        </motion.div>

        <motion.p
          {...subTextAnimation}
          className="mt-8 text-white/70 text-xl"
        >
          Innovation. Precision. Presence.
        </motion.p>
      </div>
    </section>
  );
}
EOF

# Create service worker for offline performance
cat > public/sw.js << 'EOF'
// Service Worker for Meta Curtis V3
const CACHE_NAME = 'metacurtis-v3-cache-v1';

// Resources to cache immediately
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/src/style.css',
  '/src/main.jsx',
  '/fonts/custom-font.woff2',
  '/fonts/custom-font-bold.woff2',
];

// Resources to cache on first use
const RUNTIME_RESOURCES = [
  '/assets/',
];

// Install event - precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Precache critical resources
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        // Control all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache if available, otherwise fetch and cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    // Images strategy: cache-first with network fallback
    if (event.request.destination === 'image') {
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return fetch(event.request)
              .then(response => {
                // Cache valid responses
                if (response && response.status === 200 && response.type === 'basic') {
                  const responseToCache = response.clone();
                  caches.open(CACHE_NAME)
                    .then(cache => {
                      cache.put(event.request, responseToCache);
                    });
                }
                return response;
              });
          })
      );
      return;
    }
PART1

# Append the second part to the file
cat >> optimize-mc.sh << 'PART2'
    // CSS/JS strategy: stale-while-revalidate
    if (event.request.destination === 'script' || event.request.destination === 'style') {
      event.respondWith(
        caches.open(CACHE_NAME)
          .then(cache => {
            return cache.match(event.request)
              .then(cachedResponse => {
                const fetchPromise = fetch(event.request)
                  .then(networkResponse => {
                    // Update cache with fresh response
                    if (networkResponse && networkResponse.status === 200) {
                      cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                  });
                return cachedResponse || fetchPromise;
              });
          })
      );
      return;
    }
    
    // HTML strategy: network-first with cache fallback
    if (event.request.destination === 'document') {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            return caches.match(event.request)
              .then(cachedResponse => {
                return cachedResponse || caches.match('/index.html');
              });
          })
      );
      return;
    }
  }
  
  // Default strategy: network with cache fallback
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Handle offline analytics
self.addEventListener('sync', event => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

// Background sync for analytics
async function syncAnalytics() {
  try {
    const analyticsQueue = await getAnalyticsQueue();
    if (analyticsQueue.length > 0) {
      // Send analytics data
      await fetch('/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analyticsQueue)
      });
      // Clear queue after successful sync
      await clearAnalyticsQueue();
    }
  } catch (error) {
    console.error('Failed to sync analytics:', error);
  }
}

// Get analytics from IndexedDB
async function getAnalyticsQueue() {
  // Simple implementation with localStorage
  const queue = localStorage.getItem('analytics-queue');
  return queue ? JSON.parse(queue) : [];
}

// Clear analytics queue
async function clearAnalyticsQueue() {
  localStorage.removeItem('analytics-queue');
}
EOF

# Create PWA manifest
cat > public/manifest.json << 'EOF'
{
  "name": "Meta Curtis V3",
  "short_name": "MC3V",
  "description": "A bold, minimal digital# Continue adding to the script file
cat >> optimize-mc.sh << 'PART3'
  "name": "Meta Curtis V3",
  "short_name": "MC3V",
  "description": "A bold, minimal digital experience combining design, innovation, and branding.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/maskable-icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
EOF

# Create an optimized Layout component
mkdir -p src/layouts
cat > src/layouts/Layout.jsx << 'EOF'
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
EOF

# Create a font loader utility
mkdir -p src/utils
cat > src/utils/fontLoader.js << 'EOF'
/**
 * Optimized font loading utility
 * - Uses Font Loading API when available
 * - Falls back to simple preloads
 * - Implements font-display: swap for better performance
 */

// Font definitions with display swap
const fontDefinitions = [
  {
    family: 'CustomFont',
    url: '/fonts/custom-font.woff2',
    weight: '400',
    style: 'normal',
    display: 'swap'
  },
  {
    family: 'CustomFont',
    url: '/fonts/custom-font-bold.woff2',
    weight: '700',
    style: 'normal',
    display: 'swap'
  }
];

// Load fonts using modern Font Loading API
export function loadFonts() {
  // Check if Font Loading API is available
  if ('fonts' in document) {
    Promise.all(
      fontDefinitions.map(font => {
        // Create a new FontFace object
        const fontFace = new FontFace(
          font.family,
          `url(${font.url}) format('woff2')`,
          {
            weight: font.weight,
            style: font.style,
            display: font.display
          }
        );
        
        // Add font to document fonts collection
        return fontFace.load().then(loadedFace => {
          document.fonts.add(loadedFace);
          return loadedFace;
        });
      })
    ).then(
      () => {
        document.documentElement.classList.add('fonts-loaded');
        console.log('All fonts loaded successfully');
      },
      error => {
        console.error('Font loading failed:', error);
        // Add class to use system fonts as fallback
        document.documentElement.classList.add('fonts-failed');
      }
    );
  } else {
    // Fallback for browsers without Font Loading API
    const fontStylesheet = document.createElement('style');
    const fontFaceDeclarations = fontDefinitions.map(font => `
      @font-face {
        font-family: '${font.family}';
        src: url(${font.url}) format('woff2');
        font-weight: ${font.weight};
        font-style: ${font.style};
        font-display: ${font.display};
      }
    `).join('\n');
    
    fontStylesheet.textContent = fontFaceDeclarations;
    document.head.appendChild(fontStylesheet);
    
    // Mark fonts as being loaded
    // This happens immediately regardless of actual loading status
    document.documentElement.classList.add('fonts-loading');
  }
}

// Export a function to set CSS variables
export function setFontVariables() {
  document.documentElement.style.setProperty('--font-sans', '"CustomFont", system-ui, sans-serif');
}
EOF

# Update Main.jsx
cat > src/main.jsx << 'EOF'
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { loadFonts, setFontVariables } from './utils/fontLoader';

// Load the fonts as early as possible
loadFonts();
setFontVariables();

// Lazy-load components for code splitting
const Layout = lazy(() => import('./layouts/Layout'));
const App = lazy(() => import('./App'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
  </div>
);

// Initialize the app with performance optimizations
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Layout>
        <App />
      </Layout>
    </Suspense>
  </React.StrictMode>
);

// Report Web Vitals
if ('performance' in window && 'PerformanceObserver' in window) {
  // Create a performance observer
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Log Web Vitals metrics
      console.log(`${entry.name}: ${entry.value}`);
    }
  });
  
  // Start observing specified performance entry types
  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}
EOF

# Create placeholder icons (you'll need to replace these with real icons)
echo "Creating placeholder icons in public folder..."
mkdir -p public/icons

# Set up npm scripts
echo "Updating package.json scripts..."
cat > package.json << 'EOF'
{
  "name": "meta-curtis-v3",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "analyze": "cross-env ANALYZE=true vite build",
    "lighthouse": "lighthouse http://localhost:8080 --output=html --output-path=./lighthouse-report.html --view",
    "optimize:images": "node scripts/optimize-images.js",
    "prebuild": "npm run optimize:images",
    "test": "vitest run",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
EOF

# Create a simple image optimization script
mkdir -p scripts
cat > scripts/optimize-images.js << 'EOF'
// Simple script to optimize images
console.log('Optimizing images for production...');

// This is a placeholder script
// Install sharp or other image optimization libraries to implement a full solution
// Example implementation:
/*
import { glob } from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

async function optimizeImages() {
  try {
    const imageFiles = await glob('./src/assets/**/*.{jpg,jpeg,png,gif}');
    
    for (const file of imageFiles) {
      const outputFile = file.replace(/\.(jpg|jpeg|png|gif)$/, '.webp');
      
      // Skip if already processed
      if (await fileExists(outputFile)) continue;
      
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputFile);
        
      console.log(`Optimized: ${file} → ${outputFile}`);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Image optimization failed:', error);
  }
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

optimizeImages();
*/
EOF

# Create robots.txt file for better SEO
cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://www.metacurtis.com/sitemap.xml
EOF

echo "Installation and setup complete! Your Meta Curtis V3 project is now optimized for better Lighthouse performance."
PART3

# Make the script executable
chmod +x optimize-mc.sh

