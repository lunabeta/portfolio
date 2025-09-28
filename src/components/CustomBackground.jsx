import React, { useEffect, useRef } from "react";

export const CustomBackground = ({ 
  type = "gradient", 
  colors = ["#667eea", "#764ba2"],
  speed = 1,
  className = ""
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (type === "gradient") {
      return; // CSS gradient doesn't need canvas
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (type === "flowing") {
      let time = 0;
      const animate = () => {
        time += 0.01 * speed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create flowing wave effect
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height / 2 + Math.sin(x * 0.01 + time) * 50;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        animationId = requestAnimationFrame(animate);
      };
      animate();
    }

    if (type === "particles") {
      const particles = [];
      const particleCount = 50;

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2 * speed,
          vy: (Math.random() - 0.5) * 2 * speed,
          size: Math.random() * 3 + 1
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = colors[0];
          ctx.fill();
        });
        
        animationId = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [type, colors, speed]);

  if (type === "gradient") {
    return (
      <div 
        className={`absolute inset-0 ${className}`}
        style={{
          background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
          backgroundSize: "400% 400%",
          animation: `gradientShift ${3 / speed}s ease infinite`
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ display: "block" }}
    />
  );
};

// Add CSS for gradient animation
const style = document.createElement("style");
style.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(style); 