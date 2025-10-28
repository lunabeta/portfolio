import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Stable3DHero() {
  const textRef = useRef();
  const buttonRef = useRef();
  const laptopRef = useRef();
  const floatingElementsRef = useRef();

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Text animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      if (textRef.current) {
        tl.from(textRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
      
      if (buttonRef.current) {
        tl.from(buttonRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.5");
      }

      // Laptop floating animation
      if (laptopRef.current) {
        gsap.to(laptopRef.current, {
          y: "+=10",
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // Floating elements animation
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        if (elements && elements.length > 0) {
          Array.from(elements).forEach((element, index) => {
            gsap.to(element, {
              y: "+=20",
              rotation: 360,
              duration: 4 + index * 0.5,
              ease: "power2.inOut",
              yoyo: true,
              repeat: -1,
              delay: index * 0.2
            });
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
          {/* React icon */}
          <div className="absolute top-20 left-20 w-8 h-8 bg-blue-400 rounded-lg opacity-60 transform rotate-45">
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold -rotate-45">⚛</div>
          </div>
          
          {/* Node.js icon */}
          <div className="absolute top-32 right-20 w-8 h-8 bg-green-400 rounded-lg opacity-60 transform rotate-45">
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold -rotate-45">🟢</div>
          </div>
          
          {/* Docker icon */}
          <div className="absolute top-40 left-1/4 w-8 h-8 bg-blue-500 rounded-lg opacity-60 transform rotate-45">
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold -rotate-45">🐳</div>
          </div>
          
          {/* TypeScript icon */}
          <div className="absolute top-24 right-1/3 w-8 h-8 bg-blue-600 rounded-lg opacity-60 transform rotate-45">
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold -rotate-45">📘</div>
          </div>
          
          {/* MongoDB icon */}
          <div className="absolute bottom-32 left-16 w-8 h-8 bg-green-500 rounded-lg opacity-60 transform rotate-45">
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold -rotate-45">🍃</div>
          </div>
          
          {/* Python icon */}
          <div className="absolute bottom-40 right-16 w-8 h-8 bg-yellow-500 rounded-lg opacity-60 transform rotate-45">
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold -rotate-45">🐍</div>
          </div>
        </div>

        {/* 3D Laptop Representation */}
        <div ref={laptopRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Laptop base */}
            <div className="w-32 h-20 bg-gray-800 rounded-lg shadow-2xl">
              {/* Screen */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gray-900 rounded-t-lg shadow-xl">
                {/* Screen content - coding image */}
                <div 
                  className="w-full h-full rounded-t-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/assets/coding-pov.png')",
                    backgroundSize: "cover"
                  }}
                />
              </div>
              
              {/* Keyboard area */}
              <div className="absolute bottom-2 left-2 right-2 h-2 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        <div ref={textRef} className="text-center mb-8">
          <h1 
            className="font-extrabold tracking-tight text-5xl md:text-6xl lg:text-7xl mb-4"
            style={{
              background: "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 3s ease infinite",
            }}
          >
            BETELHEM WORKU
          </h1>
          <h2 className="font-mono text-gray-200 text-lg md:text-xl lg:text-2xl tracking-wide mb-4">
            SOFTWARE ENGINEER, FULLSTACK DEVELOPER, DATA RECOVERY SPECIALIST
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto">
            Crafting exceptional digital experiences with modern web technologies. Specialized in
            building scalable applications with beautiful, intuitive interfaces.
          </p>
        </div>
        
        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View My Work
          </button>
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </button>
        </div>
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40 pointer-events-none z-10"></div>
      
      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
