// ParticleInteraction.jsx - Component to enhance WebGL background during story section

import React, { useEffect } from "react";
import { useScroll } from "framer-motion";

const ParticleInteraction = ({ storyContainerRef }) => {
  const { scrollYProgress } = useScroll({
    target: storyContainerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    // Create a custom event dispatcher to communicate with the WebGL background
    const dispatchInteractionEvent = (type, data) => {
      const event = new CustomEvent("particle-interaction", {
        detail: { type, data },
      });
      window.dispatchEvent(event);
    };

    // Subscribe to scroll progress changes
    const unsubscribe = scrollYProgress.onChange((value) => {
      let intensity;
      let colorShift;

      if (value < 0.2) {
        intensity = 0.7 + value * 2;
        colorShift = { r: 0.6, g: 0.3, b: 0.9 };
      } else if (value < 0.4) {
        intensity = 0.8 + (value - 0.2) * 2;
        colorShift = { r: 0.2, g: 0.6, b: 0.9 };
      } else if (value < 0.6) {
        intensity = 0.9 + (value - 0.4) * 2;
        colorShift = { r: 0.8, g: 0.2, b: 0.9 };
      } else if (value < 0.8) {
        intensity = 1.0 + (value - 0.6) * 2;
        colorShift = { r: 0.4, g: 0.3, b: 1.0 };
      } else {
        intensity = 1.2 + (value - 0.8) * 2;
        colorShift = { r: 0.9, g: 0.3, b: 0.8 };
      }

      dispatchInteractionEvent("scroll", { progress: value, intensity, colorShift });
    });

    // Handle chapter interactions
    const handleChapterInteraction = (event) => {
      if (event.target.closest(".chapter")) {
        const chapter = event.target.closest(".chapter");
        dispatchInteractionEvent("chapter-interaction", {
          chapterId: chapter.id,
          mouseX: event.clientX / window.innerWidth,
          mouseY: event.clientY / window.innerHeight,
        });
      }
    };

    // Track mouse movement for particle attraction
    const handleMouseMove = (event) => {
      if (event.target.closest(".story-container")) {
        dispatchInteractionEvent("mouse-move", {
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        });
      }
    };

    // Handle emphasis elements causing particle attraction
    const handleEmphasisHover = (event) => {
      if (event.target.classList.contains("emphasis") || event.target.classList.contains("highlight")) {
        const rect = event.target.getBoundingClientRect();
        dispatchInteractionEvent("emphasis-hover", {
          x: (rect.left + rect.right) / 2 / window.innerWidth,
          y: (rect.top + rect.bottom) / 2 / window.innerHeight,
          type: event.target.classList.contains("emphasis") ? "emphasis" : "highlight",
          state: event.type === "mouseenter" ? "enter" : "leave",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleChapterInteraction);
    document.addEventListener("mouseenter", handleEmphasisHover, true);
    document.addEventListener("mouseleave", handleEmphasisHover, true);

    return () => {
      unsubscribe();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleChapterInteraction);
      document.removeEventListener("mouseenter", handleEmphasisHover, true);
      document.removeEventListener("mouseleave", handleEmphasisHover, true);
    };
  }, [scrollYProgress, storyContainerRef]);

  return null;
};

export default ParticleInteraction;
