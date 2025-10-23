import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CodeFlowingBackground = ({ 
  className = "",
  speed = 1,
  opacity = 0.3 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced code snippets for flowing effect
    const codeSnippets = [
      "const hero = () => {",
      "function animate() {",
      "return <div>",
      "import React from 'react'",
      "useEffect(() => {",
      "gsap.timeline()",
      "className='hero'",
      "const [state, setState] = useState()",
      "export default Component",
      "return {",
      "if (condition) {",
      "console.log('Hello')",
      "const data = await fetch()",
      "return response.json()",
      "try { } catch { }",
      "const element = document.querySelector()",
      "element.style.transform = 'translateX(100px)'",
      "animation: 'fadeIn 1s ease'",
      "background: 'linear-gradient()'",
      "transform: 'scale(1.2)'",
      "const particles = []",
      "function createParticle() {",
      "gsap.to(element, {",
      "duration: 1.5,",
      "ease: 'power2.out'",
      "opacity: 0.8",
      "scale: 1.1",
      "const mouse = { x: 0, y: 0 }",
      "window.addEventListener('mousemove',",
      "requestAnimationFrame(animate)",
      "ctx.clearRect(0, 0, width, height)",
      "particle.x += particle.vx",
      "particle.y += particle.vy"
    ];

    const flowingElements = [];
    // Initialize flowing elements with responsive count
    const elementCount = window.innerWidth < 768 ? 12 : 20;
    for (let i = 0; i < elementCount; i++) {
      flowingElements.push({
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8 * speed,
        vy: (Math.random() - 0.5) * 0.8 * speed,
        fontSize: Math.random() * (window.innerWidth < 768 ? 8 : 12) + (window.innerWidth < 768 ? 10 : 14),
        opacity: Math.random() * 0.4 + opacity,
        color: `hsl(${Math.random() * 60 + 180}, 80%, 70%)`,
        alpha: Math.random() * 0.3 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      flowingElements.forEach(element => {
        // Update position
        element.x += element.vx;
        element.y += element.vy;
        
        // Wrap around screen
        if (element.x < -300) element.x = canvas.width + 300;
        if (element.x > canvas.width + 300) element.x = -300;
        if (element.y < -50) element.y = canvas.height + 50;
        if (element.y > canvas.height + 50) element.y = -50;
        
        // Draw text with enhanced visibility
        ctx.font = `${element.fontSize}px 'Courier New', monospace`;
        ctx.fillStyle = element.color;
        ctx.globalAlpha = element.alpha;
        
        // Add text shadow for better visibility
        ctx.shadowColor = element.color;
        ctx.shadowBlur = 10;
        ctx.fillText(element.text, element.x, element.y);
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ display: "block", zIndex: 1 }}
    />
  );
};
