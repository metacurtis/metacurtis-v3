import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGLBackground - Creates a dynamic flowing particle background
 * Optimized for Lighthouse performance while ensuring no black background
 */
export default function WebGLBackground() {
  const mountRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    // Verify container exists
    if (!mountRef.current) return;

    // Scene setup with explicit background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a18"); // Deep blue

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 8;

    // Performance-optimized renderer settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio < 2, // Only use antialiasing on higher-end devices
      alpha: false, // Disable alpha for better performance
      powerPreference: "high-performance", 
      stencil: false, // Disable unused capabilities
      depth: false
    });
    renderer.setClearColor("#0a0a18", 1); // Explicit background clear
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Ensure the canvas covers the entire viewport
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
    
    mountRef.current.appendChild(renderer.domElement);

    // Adaptive particle count based on device capability
    const isMobile = window.innerWidth < 768;
    const isLowPerformance = navigator.hardwareConcurrency < 4;
    
    // Reduce particle count on lower-end devices
    const particleCount = isLowPerformance ? 5000 : (isMobile ? 8000 : 15000);
    
    // Set up particle system
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Create particles in a field suitable for wave animation
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position in a radial pattern for better wave effects
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 12;
      
      positions[i3] = Math.cos(angle) * radius;     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 8; // y
      positions[i3 + 2] = Math.sin(angle) * radius;  // z
      
      // Purple/magenta color scheme matching reference image
      const colorFactor = Math.random();
      colors[i3] = 0.7 + (colorFactor * 0.3);     // R: high for magenta/purple
      colors[i3 + 1] = 0.0 + (colorFactor * 0.2); // G: very low
      colors[i3 + 2] = 0.8 - (colorFactor * 0.3); // B: medium-high
    }
    
    // Add position and color attributes to geometry
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    
    // Material with performance considerations
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    // Create particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Animation loop with performance optimizations
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime) => {
      requestRef.current = requestAnimationFrame(animate);
      
      // Throttle frame rate for better performance
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < frameInterval) return;
      
      lastFrameTime = currentTime - (deltaTime % frameInterval);
      
      // Update particle positions for wave effect
      const positions = particles.geometry.attributes.position;
      const time = currentTime * 0.0005;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions.array[i3];
        const y = positions.array[i3 + 1];
        
        // Wave patterns
        const waveX = Math.sin(x * 0.3 + time * 2) * 0.5;
        const waveY = Math.cos(y * 0.2 + time * 1.5) * 0.5;
        
        // Apply wave effect to Z position
        positions.array[i3 + 2] = positions.array[i3 + 2] * 0.97 + waveX + waveY;
      }
      
      positions.needsUpdate = true;
      
      // Add subtle overall rotation
      particles.rotation.y = time * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate(0);
    
    // Handle window resize efficiently
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Use a resize observer instead of window event for better performance
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);
    
    // Cleanup on unmount - very important for performance
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(requestRef.current);
      
      // Remove canvas from DOM
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources to prevent memory leaks
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  
  // Return a div with the webgl-background class from our updated CSS
  return <div ref={mountRef} className="webgl-background" />;
}