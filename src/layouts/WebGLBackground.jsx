import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Particle system component using react-three-fiber.
 * Optimized for GPU instancing and performance-based updates.
 */
function ParticleSystem() {
  const pointsRef = useRef();
  const { viewport } = useThree();
  const timeRef = useRef(0);
  
  // Detect device capabilities
  const isMobile = window.innerWidth < 768;
  const isLowPerformance = window.innerWidth < 1200 || navigator.hardwareConcurrency < 6;

  // Adjust particle count dynamically
  const particleCount = isLowPerformance ? 2500 : (isMobile ? 4000 : 7000);
  
  // Precompute particle attributes (buffered for performance)
  const [positions, colors, animationFactors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const animationFactors = new Float32Array(particleCount * 4); // x-freq, y-freq, phase, amp

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 12;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Color scheme (purple/magenta)
      const colorFactor = Math.random();
      colors[i3] = 0.7 + colorFactor * 0.3; 
      colors[i3 + 1] = 0.0 + colorFactor * 0.2;
      colors[i3 + 2] = 0.8 - colorFactor * 0.3;

      // Precompute animation factors
      animationFactors[i4] = Math.random() * 0.2 + 0.1; 
      animationFactors[i4 + 1] = Math.random() * 0.15 + 0.05;
      animationFactors[i4 + 2] = Math.random() * Math.PI * 2; 
      animationFactors[i4 + 3] = Math.random() * 0.3 + 0.2; 
    }

    return [positions, colors, animationFactors];
  }, [particleCount]);

  // Optimized animation loop using batching
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const currentTime = clock.elapsedTime * 0.3;
    const deltaTime = currentTime - timeRef.current;
    timeRef.current = currentTime;
    
    const positions = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      
      const xFactor = animationFactors[i4];
      const yFactor = animationFactors[i4 + 1];
      const phaseOffset = animationFactors[i4 + 2];
      const amplitude = animationFactors[i4 + 3];

      const wave = Math.sin(positions.array[i3] * xFactor + positions.array[i3 + 1] * yFactor + currentTime + phaseOffset) * amplitude;
      positions.array[i3 + 2] = positions.array[i3 + 2] * 0.98 + wave * 0.02;
    }

    positions.needsUpdate = true;
    pointsRef.current.rotation.y += deltaTime * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.06 : 0.04}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Main WebGL Background component using react-three-fiber.
 * Optimized with adaptive FPS and safe cleanup.
 */
export default function WebGLBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("WebGL Background mounted");
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = "#0a0a18";
    }
    return () => {
      console.log("WebGL Background unmounted");
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)} 
        gl={{
          antialias: false,
          alpha: false, 
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
          precision: "lowp",
          clearColor: "#0a0a18",
          clearAlpha: 1,
          toneMapping: THREE.NoToneMapping, // Removes extra rendering calculations
        }}
        performance={{ min: 0.1 }} 
        onCreated={(state) => {
          console.log("WebGL Canvas created");
          state.gl.autoClear = false;
        }}
        onError={(error) => {
          console.error("WebGL Canvas error:", error);
          if (containerRef.current) {
            containerRef.current.style.backgroundColor = "#0a0a18";
          }
        }}
      >
        <color attach="background" args={["#0a0a18"]} />
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
