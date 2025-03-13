// Enhanced Version3Section.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";
import "./Version3Section.css";

// Animation variants to match your existing styles
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: "easeOut" },
  }),
};

export default function Version3Section() {
  const storyContainerRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  
  // Custom event dispatcher for WebGL particles
  const updateParticles = (chapterIndex) => {
    window.dispatchEvent(
      new CustomEvent("version3-chapter-change", { 
        detail: { chapterIndex } 
      })
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const storyContainer = storyContainerRef.current;
    if (!storyContainer) return;

    // Collect cleanup functions so that we can return one combined cleanup
    const cleanupFunctions = [];

    // Create a master timeline for coordinated animations
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: storyContainer,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Chapter reveals with glass morphism effect
    const chapters = storyContainer.querySelectorAll(".chapter");
    chapters.forEach((chapter, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            setActiveChapter(index);
            updateParticles(index);
          },
          onEnterBack: () => {
            setActiveChapter(index);
            updateParticles(index);
          },
        },
      });

      const paragraphs = chapter.querySelectorAll("p");
      tl.fromTo(
        chapter,
        { opacity: 0, y: 50, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      );

      tl.fromTo(
        paragraphs,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "power1.out" },
        "-=0.4"
      );

      masterTimeline.to(
        chapter,
        { y: index % 2 === 0 ? -30 : -50, ease: "none" },
        0
      );
    });

    // Visual journey paths animation
    const visualContainers = storyContainer.querySelectorAll(".visual-container");
    visualContainers.forEach((container) => {
      const journeyPath = container.querySelector(".journey-path");
      const journeyNodes = container.querySelectorAll(".journey-node");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      if (journeyPath) {
        tl.fromTo(
          journeyPath,
          { width: "0%" },
          { width: "100%", duration: 1.5, ease: "power2.inOut" }
        );
      }

      if (journeyNodes.length) {
        tl.fromTo(
          journeyNodes,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.2, duration: 0.5, ease: "back.out(1.7)" },
          "-=1"
        );
      }
    });

    // Code evolution with typewriter effect
    const codeSteps = storyContainer.querySelectorAll(".code-step");
    if (codeSteps.length) {
      let currentStep = 0;
      const codeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".code-evolution",
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      codeTimeline.fromTo(
        codeSteps[0],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );

      const codeInterval = setInterval(() => {
        gsap.to(codeSteps[currentStep], {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power1.in",
          onComplete: () => {
            currentStep = (currentStep + 1) % codeSteps.length;
            gsap.fromTo(
              codeSteps[currentStep],
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
          },
        });
      }, 4000);
      cleanupFunctions.push(() => clearInterval(codeInterval));
    }

    // Feedback loop animation
    const feedbackLoop = storyContainer.querySelector(".feedback-loop");
    if (feedbackLoop) {
      const nodes = feedbackLoop.querySelectorAll(".feedback-node");
      const arrows = feedbackLoop.querySelectorAll(".loop-arrow");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: feedbackLoop,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        nodes,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.5, ease: "back.out(1.7)" }
      );

      tl.fromTo(
        arrows,
        { opacity: 0, width: 0 },
        { opacity: 0.7, width: "100px", stagger: 0.15, duration: 0.6, ease: "power2.inOut" },
        "-=0.8"
      );

      gsap.to([nodes, arrows], {
        scale: 1.05,
        opacity: (opacity) => opacity * 1.2,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.05,
      });
    }

    // Pulse animation for journey end
    const journeyEnd = storyContainer.querySelector(".journey-end");
    if (journeyEnd) {
      const pulse = journeyEnd.querySelector(".pulse");
      
      gsap.to(pulse, {
        scrollTrigger: {
          trigger: journeyEnd,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        scale: 1.2,
        opacity: 0.8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }

    // Enhanced highlight and emphasis animations
    const highlights = storyContainer.querySelectorAll(".highlight, .emphasis");
    highlights.forEach((highlight) => {
      gsap.to(highlight, {
        scrollTrigger: {
          trigger: highlight,
          start: "top 90%",
        },
        color: highlight.classList.contains("emphasis") ? "#ff00ff" : "#38bdf8",
        textShadow: highlight.classList.contains("emphasis")
          ? "0 0 8px rgba(255, 0, 255, 0.4)"
          : "0 0 8px rgba(56, 189, 248, 0.4)",
        duration: 0.5,
        ease: "power1.out",
      });
    });

    // Return a combined cleanup function
    return () => {
      cleanupFunctions.forEach((fn) => fn());
    };
  }, []);

  return (
    <section 
      id="version-3" 
      className="relative min-h-screen w-full overflow-hidden"
      aria-labelledby="version-3-heading"
    >
      {/* Section Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center py-12 relative z-10"
      >
        <h2 
          id="version-3-heading"
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Version 3 Story
        </h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          <Typewriter
            words={["The evolution of learning at the speed of thought..."]}
            typeSpeed={40}
            cursor
            cursorStyle="_"
          />
        </p>
      </motion.div>
      
      {/* Main Story Container */}
      <div ref={storyContainerRef} className="story-container relative z-10 pb-16">
        {/* Chapter 1 */}
        <section id="chapter1" className={`chapter ${activeChapter === 0 ? "chapter-active" : ""}`}>
          <h2 className="chapter-header typewriter">The Spark of Curiosity</h2>
          <div className="chapter-content">
            <p>
              In the beginning, there was <span className="highlight">confusion</span>. A hazy understanding of what could be.
            </p>
            <p>
              The journey of <span className="emphasis">Meta Curtis</span> began not with certainty, but with a simple spark of <span className="highlight">curiosity</span>.
            </p>
            <p>
              What if learning could be <span className="emphasis">accelerated</span>? What if the traditional paths of education could be reimagined?
            </p>

            <div className="visual-container">
              <div className="journey-path"></div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div 
                  key={`node-${index}`} 
                  className="journey-node" 
                  style={{ left: `${10 + index * 20}%` }}
                >
                  {index + 1}
                  <div className="node-label">
                    {[
                      "Curiosity Ignites",
                      "First Questions", 
                      "Exploration Begins",
                      "Vision Forms",
                      "Path Revealed",
                    ][index]}
                  </div>
                </div>
              ))}
            </div>

            <p>
              A journey that would normally take a computer science degree and years of practice was about to be transformed through a revolutionary approach: <span className="emphasis">Meta Learning</span>.
            </p>
          </div>
        </section>

        {/* Chapter 2 */}
        <section id="chapter2" className={`chapter ${activeChapter === 1 ? "chapter-active" : ""}`}>
          <h2 className="chapter-header">The First Steps</h2>
          <div className="chapter-content">
            <p>
              From a simple <span className="emphasis">index.HTML chatbot</span>, the foundations were laid. The mountain of knowledge seemed insurmountable.
            </p>
            <p>
              "Download VS Code," they said. "Learn JavaScript," they recommended. The traditional path stretched endlessly ahead, filled with roadblocks and years of study.
            </p>

            <div className="code-evolution">
              {Array.from({ length: 5 }).map((_, index) => (
                <div 
                  key={`code-${index}`} 
                  className={`code-step ${index === 0 ? "active" : ""}`} 
                  data-step={index + 1}
                >
                  {[
                    `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Simple Chatbot</title>\n  </head>\n  <body>\n    <div class="chat-container">\n      <div class="chat-box"></div>\n    </div>\n  </body>\n</html>`,
                    `// First JavaScript attempt\nfunction sendMessage() {\n  const message = document.getElementById('message').value;\n  if (message.trim() === '') return;\n\n  // Add message to chat\n  addMessage('user', message);\n}`,
                    `// Learning TypeScript\ninterface Message {\n  sender: 'user' | 'bot';\n  content: string;\n  timestamp: Date;\n}\n\nfunction addMessage(message: Message): void {\n  // Implementation\n}`,
                    `// Command line evolution\n$ npm init\n$ npm install typescript --save-dev\n$ npx tsc --init\n\n// Understanding errors\nTS2339: Property 'value' does not exist on type 'HTMLElement'.`,
                    `#!/bin/bash\n\n# Automation script\necho "Setting up project environment..."\nmkdir -p src/components\n\n# Install dependencies\nnpm install react react-dom next tailwindcss\n\necho "Environment ready for development!"`,
                  ][index]}
                </div>
              ))}
            </div>

            <p>
              But <span className="emphasis">Meta Curtis</span> sought a different approach. What if the journey wasn't about memorizing syntax or spending years in classrooms?
            </p>
            <p>
              What if it was about identifying the <span className="highlight">friction points</span> and systematically eliminating them?
            </p>
          </div>
        </section>

        {/* Chapter 3 */}
        <section id="chapter3" className={`chapter ${activeChapter === 2 ? "chapter-active" : ""}`}>
          <h2 className="chapter-header">The Feedback Loop</h2>
          <div className="chapter-content">
            <p>
              This was the birth of <span className="emphasis">Meta Learning</span> – an accelerated path to knowledge acquisition through continuous feedback loops, reinforced by artificial intelligence.
            </p>
            <p>
              Each iteration brought clarity where confusion once reigned. Each cycle eliminated friction points that once seemed immovable obstacles.
            </p>

            <div className="feedback-loop">
              <div className="feedback-node" style={{ top: "0", left: "50%", transform: "translateX(-50%)" }}>
                Identify Friction
              </div>
              <div className="feedback-node" style={{ top: "50%", left: "15%", transform: "translateY(-50%)" }}>
                AI Prompt Engineering
              </div>
              <div className="feedback-node" style={{ top: "50%", right: "15%", transform: "translateY(-50%)" }}>
                Implement Solution
              </div>
              <div className="feedback-node" style={{ bottom: "0", left: "50%", transform: "translateX(-50%)" }}>
                Knowledge Expansion
              </div>

              <div className="loop-arrow" style={{ top: "60px", left: "50%", transformOrigin: "center", width: "100px", transform: "translateX(-50%) rotate(45deg)" }}></div>
              <div className="loop-arrow" style={{ top: "100px", left: "35%", transformOrigin: "center", width: "100px", transform: "translateY(-50%) rotate(90deg)" }}></div>
              <div className="loop-arrow" style={{ top: "100px", right: "35%", transformOrigin: "center", width: "100px", transform: "translateY(-50%) rotate(90deg)" }}></div>
              <div className="loop-arrow" style={{ bottom: "60px", left: "50%", transformOrigin: "center", width: "100px", transform: "translateX(-50%) rotate(45deg)" }}></div>
            </div>

            <p>
              The traditional path said: <span className="emphasis">"Learn everything, then build."</span>
            </p>
            <p>
              Meta Learning declared: <span className="emphasis">"Build to learn, learn to build better."</span>
            </p>
            <p>
              Each problem encountered became not a roadblock but a catalyst for growth. Each error message transformed from frustration into illumination.
            </p>
          </div>
        </section>

        {/* Chapter 4 */}
        <section id="chapter4" className={`chapter ${activeChapter === 3 ? "chapter-active" : ""}`}>
          <h2 className="chapter-header">The Evolution</h2>
          <div className="chapter-content">
            <p>
              As the journey continued, the evolution became clear. What started as copying and pasting code transformed into understanding command line interfaces, then into crafting bash scripts for automation.
            </p>
            <p>
              The WSL environment became a canvas of possibility. Code became not a foreign language but a medium of expression.
            </p>

            <div className="visual-container">
              <div className="journey-path"></div>
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={`node-${index}`} 
                  className="journey-node" 
                  style={{ left: `${10 + index * 15}%` }}
                >
                  {index + 1}
                  <div className="node-label">
                    {[
                      "Simple HTML",
                      "JavaScript", 
                      "VS Code & Debugging",
                      "WSL Environment",
                      "Bash Scripting",
                      "Automated Workflows",
                    ][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
