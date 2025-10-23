import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ScrollReveal = ({ 
  children, 
  animation = "fadeInUp",
  delay = 0,
  duration = 1,
  distance = 50,
  className = ""
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on animation type
    const animations = {
      fadeInUp: { opacity: 0, y: distance },
      fadeInDown: { opacity: 0, y: -distance },
      fadeInLeft: { opacity: 0, x: distance },
      fadeInRight: { opacity: 0, x: -distance },
      fadeIn: { opacity: 0 },
      scaleIn: { opacity: 0, scale: 0.8 },
      slideInUp: { y: distance },
      slideInDown: { y: -distance },
      slideInLeft: { x: distance },
      slideInRight: { x: -distance }
    };

    gsap.set(element, animations[animation] || animations.fadeInUp);

    // Create scroll trigger
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: "power3.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, distance]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
