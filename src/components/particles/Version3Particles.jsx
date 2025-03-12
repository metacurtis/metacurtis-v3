// Version3Particles.jsx - Enhanced particles for Version3 section
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Version3Particles = () => {
  const pointsRef = useRef();
  const timeRef = useRef(0);
  const activeChapterRef = useRef(0);
  
  // Set up particles
  const particleCount = 5000;
  
  // Chapter-specific colors
  const chapterColors = [
    { r: 0.6, g: 0.3, b: 0.9 },  // Chapter 1: Purple
    { r: 0.2, g: 0.6, b: 0.9 },  // Chapter 2: Blue
    { r: 0.8, g: 0.2, b: 0.9 },  // Chapter 3: Magenta
    { r: 0.4, g: 0.3, b: 1.0 },  // Chapter 4: Deep Purple
    { r: 0.9, g: 0.3, b: 0.8 }   // Chapter 5: Pink
  ];
  
  // Listen for chapter changes from Version3Section component
  useEffect(() => {
    const handleChapterChange = (event) => {
      activeChapterRef.current = event.detail.chapterIndex;
    };
    
    window.addEventListener('version3-chapter-change', handleChapterChange);
    return () => {
      window.removeEventListener('version3-chapter-change', handleChapterChange);
    };
  }, []);
  
  // Animate particles
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    const currentTime = clock.elapsedTime * 0.3;
    const deltaTime = currentTime - timeRef.current;
    timeRef.current = currentTime;
    
    const positions = pointsRef.current.geometry.attributes.position;
    const colors = pointsRef.current.geometry.attributes.color;
    
    // Target color based on active chapter
    const targetColor = chapterColors[activeChapterRef.current];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update positions with wave-like motion
      positions.array[i3] += Math.sin(currentTime * 0.5 + i * 0.1) * 0.01;
      positions.array[i3 + 1] += Math.cos(currentTime * 0.3 + i * 0.1) * 0.01;
      
      // Gradually shift colors towards target chapter color
      colors.array[i3] += (targetColor.r - colors.array[i3]) * 0.01;
      colors.array[i3 + 1] += (targetColor.g - colors.array[i3 + 1]) * 0.01;
      colors.array[i3 + 2] += (targetColor.b - colors.array[i3 + 2]) * 0.01;
    }
    
    positions.needsUpdate = true;
    colors.needsUpdate = true;
    
    // Subtle rotation for more dynamic feeling
    pointsRef.current.rotation.y += deltaTime * 0.05;
    pointsRef.current.rotation.x += Math.sin(currentTime * 0.2) * 0.003;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={new Float32Array(particleCount * 3).map(() => (Math.random() - 0.5) * 20)} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={particleCount} 
          array={new Float32Array(particleCount * 3).map(() => 0.5 + Math.random() * 0.5)} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default Version3Particles;
