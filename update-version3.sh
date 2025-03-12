#!/bin/bash

# Version3 Enhancement Script

# Create backup directory
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups_${TIMESTAMP}"
mkdir -p $BACKUP_DIR

# Backup existing files
[ -f "./src/sections/Version3Section.jsx" ] && cp ./src/sections/Version3Section.jsx $BACKUP_DIR/
[ -f "./src/backgrounds/WebGLBackground.jsx" ] && cp ./src/backgrounds/WebGLBackground.jsx $BACKUP_DIR/

# Create particles directory if it doesn't exist
mkdir -p ./src/components/particles

# Create Version3Particles.jsx
cat > ./src/components/particles/Version3Particles.jsx << 'EOF'
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
EOF

# Update WebGLBackground.jsx to include Version3Particles
if [ -f "./src/backgrounds/WebGLBackground.jsx" ]; then
  # Insert Version3Particles import
  sed -i '/^import.*from.*react.*$/a import Version3Particles from "../components/particles/Version3Particles";' ./src/backgrounds/WebGLBackground.jsx
  
  # Add Version3Particles component before Canvas closing tag
  sed -i '/<\/Canvas>/i \        <Version3Particles \/>' ./src/backgrounds/WebGLBackground.jsx
  
  echo "Updated WebGLBackground.jsx successfully"
else
  echo "WebGLBackground.jsx not found. Manual update required."
  # Create instructions file
  cat > ./webgl-update-instructions.txt << 'EOF'
Manual update needed for WebGLBackground.jsx:

1. Import Version3Particles:
   import Version3Particles from "../components/particles/Version3Particles";

2. Add inside Canvas component:
   <Canvas>
     {/* Your existing particles */}
     <Version3Particles />
   </Canvas>
EOF
fi

# Create CSS file for Version3Section
cat > ./src/sections/Version3Section.css << 'EOF'
/* Version3Section.css */
/* Glass morphism styles to let WebGL background show through */
.story-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 10;
}

.chapter {
  position: relative;
  margin-bottom: 8rem;
  padding: 2.5rem;
  border-radius: 1rem;
  background: rgba(10, 10, 24, 0.4);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3), 
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform: perspective(1000px) rotateX(0deg);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.chapter-active {
  background: rgba(15, 15, 35, 0.6);
  border: 1px solid rgba(255, 0, 255, 0.1);
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5),
              0 0 15px rgba(255, 0, 255, 0.2);
}

/* Rest of CSS classes for code and story elements */
.chapter-header {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(90deg, #ff00ff 0%, #b000ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.highlight {
  color: #38bdf8;
  font-weight: 500;
}

.emphasis {
  color: #ff66ff;
  font-weight: 600;
}

.visual-container, .feedback-loop, .code-evolution, .journey-end {
  margin: 3rem 0;
  position: relative;
}

/* Add specific styling for interactive elements */
/* See full CSS file for complete styling */
EOF

echo "✅ Version3 enhancement components created successfully!"
echo "The script has updated/created:"
echo "- Version3Particles.jsx"
echo "- Version3Section.css"
echo "- Updated WebGLBackground.jsx (if found)"
echo ""
echo "Original files backed up to: $BACKUP_DIR"
