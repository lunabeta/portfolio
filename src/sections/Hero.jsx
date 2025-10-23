import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import ParallaxBackground from "../components/ParallaxBackground";
import { CustomBackground } from "../components/CustomBackground";
import { MouseTrail } from "../components/MouseTrail";
import { Particles } from "../components/Particles";
import { PlanetaryParticles } from "../components/PlanetaryParticles";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation Options - Choose your preferred style
const ANIMATION_OPTIONS = {
  textAnimation: "typewriter", // Options: "typewriter", "fadeIn", "slideUp", "scaleIn", "splitText", "glitch", "wave", "bounce"
  backgroundAnimation: "planetaryParticles", // Options: "flowing", "particles", "planetaryParticles", "gradient", "matrix", "geometric", "stars", "minimal"
  mouseEffect: "trail", // Options: "customCursor", "trail", "ripple", "glow", "none"
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cursor = cursorRef.current;

    // Set initial states
    gsap.set([title, subtitle], { opacity: 0, y: 50 });
    gsap.set(cursor, { opacity: 0 });

    // Create main timeline for text animations
    const tl = gsap.timeline();

    // Title animation
    tl.to(title, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    })
    // Subtitle animation
    .to(subtitle, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.5");

    // Mouse follow effect with enhanced interaction
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX - 10,
        y: e.clientY - 10,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        duration: 0.3,
        scale: 1.5,
        backgroundColor: "#667eea",
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        duration: 0.3,
        scale: 1,
        backgroundColor: "#ffffff",
        ease: "power2.out"
      });
    };

    if (ANIMATION_OPTIONS.mouseEffect === "customCursor") {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    // Enhanced scroll reveal for entire page
    ScrollTrigger.create({
      trigger: hero,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => {
        gsap.fromTo(hero, 
          { opacity: 0, scale: 0.9, y: 50 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            duration: 1.2, 
            ease: "power3.out" 
          }
        );
      }
    });

    // Parallax effect for background elements
    ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(hero.querySelector('.parallax-bg'), {
          y: progress * 100,
          ease: "none"
        });
      }
    });

    return () => {
      if (ANIMATION_OPTIONS.mouseEffect === "customCursor") {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseenter", handleMouseEnter);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <section 
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black"
    >
      {/* Background Effects */}
      <ParallaxBackground />
      
      {/* Dynamic Background based on option */}
      {ANIMATION_OPTIONS.backgroundAnimation === "flowing" && (
        <CustomBackground
          type="flowing"
          colors={["#667eea", "#764ba2", "#f093fb"]}
          speed={0.8}
          className="absolute inset-0 opacity-30 pointer-events-none parallax-bg"
        />
      )}
      
      {ANIMATION_OPTIONS.backgroundAnimation === "codeFlowing" && (
        <CodeFlowingBackground
          speed={0.5}
          opacity={0.3}
          className="absolute inset-0"
        />
      )}

      {ANIMATION_OPTIONS.backgroundAnimation === "particles" && (
        <Particles
          quantity={isMobile ? 80 : 150}
          color="#ffffff"
          size={0.4}
          staticity={30}
          ease={50}
          className="absolute inset-0 opacity-60"
        />
      )}

      {ANIMATION_OPTIONS.backgroundAnimation === "planetaryParticles" && (
        <PlanetaryParticles
          quantity={isMobile ? 60 : 100}
          speed={0.8}
          opacity={0.7}
          className="absolute inset-0"
        />
      )}

      {/* Custom Cursor */}
      {ANIMATION_OPTIONS.mouseEffect === "customCursor" && (
        <div 
          ref={cursorRef}
          className="fixed w-5 h-5 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      )}

      {/* Mouse Trail Effect */}
      {ANIMATION_OPTIONS.mouseEffect === "trail" && (
        <MouseTrail
          particleCount={isMobile ? 20 : 35}
          trailLength={25}
          colors={["#667eea", "#764ba2", "#1a1a2e", "#16213e", "#4facfe", "#00f2fe"]}
        />
      )}

      {/* Hero Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-8 sm:pb-12 ${isMobile ? "mt-8" : ""}`}>
        <h1 
          ref={titleRef}
          className={`font-extrabold tracking-tight text-center mb-4 sm:mb-6 drop-shadow-lg ${isMobile ? "text-3xl sm:text-4xl" : "text-5xl md:text-6xl lg:text-7xl"}`}
          style={{
            background: "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 3s ease infinite",
            color: "transparent"
          }}
        >
          BETELHEM WORKU
        </h1>
        <h2 
          ref={subtitleRef}
          className={`font-mono text-gray-200 text-center mb-6 sm:mb-8 tracking-wide px-4 ${isMobile ? "text-sm sm:text-base" : "text-lg md:text-xl lg:text-2xl"}`}
          style={{
            textShadow: "0 0 20px rgba(102, 126, 234, 0.5), 0 0 40px rgba(118, 75, 162, 0.3)"
          }}
        >
          SOFTWARE ENGINEER, FULLSTACK DEVELOPER, DATA RECOVERY SPECIALIST
        </h2>
        
        {/* Cool floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;