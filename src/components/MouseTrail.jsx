import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const MouseTrail = ({ 
  className = "",
  particleCount = 20,
  trailLength = 15,
  colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"]
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

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

    // Initialize particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: trailLength,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0,
        trail: []
      });
    }
    particlesRef.current = particles;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const lastMouse = lastMouseRef.current;

      particles.forEach((particle, index) => {
        // Update particle position
        if (particle.life <= 0) {
          // Spawn new particle
          particle.x = mouse.x;
          particle.y = mouse.y;
          particle.vx = (mouse.x - lastMouse.x) * 0.1;
          particle.vy = (mouse.y - lastMouse.y) * 0.1;
          particle.life = particle.maxLife;
          particle.alpha = 1;
          particle.trail = [];
        }

        // Add current position to trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }

        // Update particle physics
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95; // Friction
        particle.vy *= 0.95;
        particle.life--;
        particle.alpha = particle.life / particle.maxLife;

        // Draw particle trail
        particle.trail.forEach((point, trailIndex) => {
          const trailAlpha = (trailIndex / particle.trail.length) * particle.alpha;
          const trailSize = particle.size * (trailIndex / particle.trail.length);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = trailAlpha * 0.6;
          ctx.fill();
        });

        // Draw main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha * 0.3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      lastMouseRef.current = { x: mouse.x, y: mouse.y };
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount, trailLength, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ display: "block", zIndex: 9999 }}
    />
  );
};
