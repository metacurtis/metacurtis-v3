import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedConcept = ({ animationData, trigger, size = "medium" }) => {
  const lottieRef = useRef(null);
  const containerRef = useRef(null);

  const sizeClasses = {
    small: "w-24 h-24",
    medium: "w-40 h-40 md:w-48 md:h-48",
    large: "w-60 h-60 md:w-72 md:h-72",
  };

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set(containerRef.current, { opacity: 0, scale: 0.8 });

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: trigger || containerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(containerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            onComplete: () => {
              if (lottieRef.current) {
                lottieRef.current.play();
              }
            },
          });
        },
      },
    });
  }, [trigger]);

  return (
    <div ref={containerRef} className={`animated-concept ${sizeClasses[size]}`}>
      <Lottie ref={lottieRef} animationData={animationData} loop={true} autoplay={false} />
    </div>
  );
};

export default AnimatedConcept;
