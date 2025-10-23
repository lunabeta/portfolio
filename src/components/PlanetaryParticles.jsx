import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const PlanetaryParticles = ({ 
  className = "",
  quantity = 100,
  speed = 1,
  opacity = 0.8
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

    // Planetary particles with 3D effect
    const particles = [];
    const colors = ["#667eea", "#764ba2", "#4facfe", "#00f2fe", "#1a1a2e", "#16213e"];
    
    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000 + 1, // 3D depth
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: (Math.random() - 0.5) * 0.5 * speed,
        vz: (Math.random() - 0.5) * 0.1 * speed,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        orbitRadius: Math.random() * 50 + 20,
        orbitSpeed: (Math.random() - 0.5) * 0.01,
        orbitAngle: Math.random() * Math.PI * 2,
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Sort particles by z-depth for proper 3D rendering
      particles.sort((a, b) => b.z - a.z);
      
      particles.forEach(particle => {
        // Update 3D position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        
        // Update orbital motion
        particle.orbitAngle += particle.orbitSpeed;
        particle.x = particle.centerX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
        particle.y = particle.centerY + Math.sin(particle.orbitAngle) * particle.orbitRadius;
        
        // Update rotation and pulse
        particle.rotation += particle.rotationSpeed;
        particle.pulse += particle.pulseSpeed;
        
        // Calculate 3D perspective
        const perspective = 400;
        const scale = perspective / (perspective + particle.z);
        const x2d = particle.x;
        const y2d = particle.y;
        const size2d = particle.size * scale;
        
        // Wrap around screen
        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;
        
        // Reset z when it goes too far
        if (particle.z > 1000) particle.z = 1;
        if (particle.z < 1) particle.z = 1000;
        
        // Calculate pulsing alpha
        const pulseAlpha = (Math.sin(particle.pulse) + 1) * 0.5;
        const finalAlpha = particle.alpha * pulseAlpha * opacity;
        
        // Draw particle with 3D effect
        ctx.save();
        ctx.translate(x2d, y2d);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = finalAlpha;
        
        // Create gradient for 3D sphere effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size2d);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.7, particle.color + "80");
        gradient.addColorStop(1, particle.color + "20");
        
        // Draw main particle
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, size2d, 0, Math.PI * 2);
        ctx.fill();
        
        // Add highlight for 3D effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(-size2d * 0.3, -size2d * 0.3, size2d * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = size2d * 2;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = finalAlpha * 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, size2d * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [quantity, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ display: "block", zIndex: 1 }}
    />
  );
};
