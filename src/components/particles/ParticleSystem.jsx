import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWindowSize } from "react-use";

/**
 * 🌊 Continuous Wave-Like Particle System
 */
export default function ParticleSystem() {
  const pointsRef = useRef(null);
  const timeRef = useRef(0);

  // **Detect device capabilities**
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isLowPerformance = width < 1200 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 6);

  // **Adaptive Particle Count**
  const particleCount = useRef(isLowPerformance ? 5000 : isMobile ? 8000 : 15000).current;

  // **Precompute Particle Attributes**
  const { positions, colors, motionFactors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const motionFactors = new Float32Array(particleCount * 5); // x-freq, y-freq, phase, amp, speed

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i5 = i * 5;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15;

      // **Spread the Particles Across the Entire Screen**
      positions[i3] = Math.cos(angle) * radius * (Math.random() > 0.5 ? 1 : -1);
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = Math.sin(angle) * radius * (Math.random() > 0.5 ? 1 : -1);

      // **Subtle Color Variations**
      const colorFactor = Math.random();
      colors[i3] = 0.6 + colorFactor * 0.4;
      colors[i3 + 1] = 0.1 + colorFactor * 0.2;
      colors[i3 + 2] = 0.9 - colorFactor * 0.3;

      // **Precompute Motion Factors**
      motionFactors[i5] = Math.random() * 0.2 + 0.1; // x-frequency
      motionFactors[i5 + 1] = Math.random() * 0.15 + 0.05; // y-frequency
      motionFactors[i5 + 2] = Math.random() * Math.PI * 2; // phase offset
      motionFactors[i5 + 3] = Math.random() * 0.5 + 0.2; // amplitude
      motionFactors[i5 + 4] = Math.random() * 0.05 + 0.02; // speed
    }

    return { positions, colors, motionFactors };
  }, [particleCount]);

  // **Continuous Flowing Wave Effect**
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const currentTime = clock.elapsedTime * 0.3;
    const deltaTime = currentTime - timeRef.current;
    timeRef.current = currentTime;

    const posAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = posAttribute.array; // ✅ Modify the existing array, do not reassign

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i5 = i * 5;

      const xFactor = motionFactors[i5];
      const yFactor = motionFactors[i5 + 1];
      const phaseOffset = motionFactors[i5 + 2];
      const amplitude = motionFactors[i5 + 3];
      const speed = motionFactors[i5 + 4];

      // **Create a Wave-Like Flow**
      const wave = Math.sin(
        posArray[i3] * xFactor +
        posArray[i3 + 1] * yFactor +
        currentTime +
        phaseOffset
      ) * amplitude;

      // **Apply the Wave Effect**
      posArray[i3] += Math.sin(currentTime * 0.5 + i * 0.1) * speed;
      posArray[i3 + 1] += Math.cos(currentTime * 0.3 + i * 0.1) * speed;
      posArray[i3 + 2] += wave * 0.02;
    }

    posAttribute.needsUpdate = true; // ✅ Ensure changes apply without resizing

    // **Subtle Rotation for Depth**
    pointsRef.current.rotation.y += deltaTime * 0.02;
    pointsRef.current.rotation.x += Math.sin(currentTime * 0.1) * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={positions} 
          itemSize={3} 
          usage={THREE.DynamicDrawUsage} // ✅ Prevent Buffer Errors
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={particleCount} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.07 : 0.05}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}
