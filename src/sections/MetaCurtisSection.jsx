import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import ParticleSystem from "../components/particles/ParticleSystem";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ✅ Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export default function MetaCurtisSection() {
  const sectionRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const storyContainer = sectionRef.current;
    if (!storyContainer) return;

    // ✅ Scroll animations for chapters
    const chapters = storyContainer.querySelectorAll(".chapter");
    chapters.forEach((chapter, index) => {
      gsap.fromTo(
        chapter,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveChapter(index),
            onEnterBack: () => setActiveChapter(index),
          },
        }
      );
    });

    // ✅ Dynamic particle interaction based on scroll & hover
    const handleParticleInteraction = (event) => {
      const target = event.target.closest(".chapter");
      if (target) {
        window.dispatchEvent(
          new CustomEvent("particle-interaction", {
            detail: {
              chapterId: target.id,
              mouseX: event.clientX / window.innerWidth,
              mouseY: event.clientY / window.innerHeight,
            },
          })
        );
      }
    };

    // Attach & clean up event listeners
    document.addEventListener("mousemove", handleParticleInteraction);
    return () => {
      document.removeEventListener("mousemove", handleParticleInteraction);
    };
  }, []);

  return (
    <section id="meta-curtis" ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* ✅ WebGL Background with Particles */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        >
          <ParticleSystem activeChapter={activeChapter} />
        </Canvas>
      </div>

      {/* ✅ Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 relative z-10"
      >
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          The Evolution of MetaCurtis
        </h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          The journey of transformation through intelligence, technology, and philosophy.
        </p>
      </motion.div>

      {/* ✅ Story Timeline */}
      <div className="relative z-10 pb-16 max-w-4xl mx-auto space-y-12">
        {[
          {
            id: "chapter1",
            title: "Marine Corps Discipline",
            description: "Foundation in resilience, precision, and leadership.",
          },
          {
            id: "chapter2",
            title: "Wells Fargo Executive",
            description: "Developing high-level financial strategy and leadership.",
          },
          {
            id: "chapter3",
            title: "AI-Driven Web Development",
            description: "Mastering AI-powered workflows to accelerate learning.",
          },
          {
            id: "chapter4",
            title: "MetaCurtis Launched",
            description: "A fusion of technology, philosophy, and transformation.",
          },
        ].map(({ id, title, description }, index) => (
          <motion.div
            key={id}
            id={id}
            className="chapter px-6 py-8 bg-gray-900 bg-opacity-50 rounded-lg shadow-lg backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white">{title}</h3>
            <p className="text-white/60">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
