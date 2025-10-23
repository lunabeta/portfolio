import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const TypewriterText = ({ 
  text, 
  speed = 0.05, 
  className = "",
  onComplete = () => {},
  delay = 0 
}) => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    const cursor = cursorRef.current;
    
    if (!element) return;

    // Clear the element
    element.textContent = "";
    
    // Set initial cursor state
    gsap.set(cursor, { opacity: 1 });

    // Create typewriter effect
    const chars = text.split("");
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < chars.length) {
        element.textContent += chars[currentIndex];
        currentIndex++;
        
        // Add slight delay for spaces
        const delayTime = chars[currentIndex - 1] === ' ' ? speed * 3 : speed;
        setTimeout(typeNextChar, delayTime * 1000);
      } else {
        // Animation complete
        onComplete();
      }
    };

    // Start typing after delay
    setTimeout(typeNextChar, delay * 1000);

    // Cursor blinking effect
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, [text, speed, delay, onComplete]);

  return (
    <div className={`inline-block ${className}`}>
      <span ref={textRef}></span>
      <span ref={cursorRef} className="text-blue-400 font-bold">|</span>
    </div>
  );
};
