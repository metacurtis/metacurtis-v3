import React from "react";
import { Canvas } from "@react-three/fiber";
import ParticleSystem from "../components/particles/ParticleSystem";

/**
 * 🎨 WebGL Background with Particle System
 */
export default function WebGLBackground() {
  console.log("✅ WebGLBackground Mounted");

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        performance={{ max: 0.5 }}
      >
        <ParticleSystem />
      </Canvas>
    </div>
  );
}