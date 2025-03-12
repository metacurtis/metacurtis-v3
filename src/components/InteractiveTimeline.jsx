import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";

const InteractiveTimeline = ({ milestones }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (!timelineRef.current) return;

    controls.start({
      width: `${(activeIndex / (milestones.length - 1)) * 100}%`,
      transition: { duration: 0.6, ease: "easeOut" },
    });

    // Highlight active milestone
    const activeMilestone = timelineRef.current.querySelector(`.milestone[data-index="${activeIndex}"]`);
    if (activeMilestone) {
      gsap.to(activeMilestone, {
        scale: 1.2,
        duration: 0.3,
        backgroundColor: "#a855f7",
        borderColor: "#f0f9ff",
        boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)",
        ease: "back.out(1.7)",
      });

      // Reset other milestones
      const otherMilestones = timelineRef.current.querySelectorAll(`.milestone:not([data-index="${activeIndex}"])`);
      gsap.to(otherMilestones, {
        scale: 1,
        duration: 0.3,
        backgroundColor: "#0f172a",
        borderColor: "#94a3b8",
        boxShadow: "none",
        ease: "power1.out",
      });
    }
  }, [activeIndex, controls, milestones.length]);

  // Auto advance every 5 seconds, can be canceled by user interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [milestones.length]);

  return (
    <div ref={timelineRef} className="relative w-full py-12 mt-10">
      {/* Progress line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 transform -translate-y-1/2">
        <motion.div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" animate={controls} />
      </div>

      {/* Milestones */}
      <div className="relative flex justify-between">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            data-index={index}
            className={`milestone w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-400 
              cursor-pointer z-10 flex items-center justify-center transition-all`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="sr-only">{milestone.title}</span>
          </div>
        ))}
      </div>

      {/* Milestone labels */}
      <div className="mt-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white">{milestones[activeIndex].title}</h3>
          <p className="text-sm text-gray-300 mt-2">{milestones[activeIndex].description}</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;
