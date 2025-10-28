import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Animate cards on scroll
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const skillCategories = [
    {
      id: 1,
      title: "Fullstack Development",
      icon: "</>",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "GraphQL"]
    },
    {
      id: 2,
      title: "UI/UX Design",
      icon: "📄",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Design Systems"]
    },
    {
      id: 3,
      title: "Graphics Design",
      icon: "🎨",
      skills: ["Photoshop", "Illustrator", "Brand Identity", "Typography", "Color Theory", "3D Graphics"]
    },
    {
      id: 4,
      title: "Video Editing",
      icon: "🎥",
      skills: ["Premiere Pro", "After Effects", "CapCut", "Motion Graphics", "Color Grading"]
    },
    {
      id: 5,
      title: "Backend & DevOps",
      icon: "🗄️",
      skills: ["Docker", "AWS", "CI/CD", "MongoDB", "Microservices", "Cloud Computing"]
    },
    {
      id: 6,
      title: "Data Recovery & Tools",
      icon: "🔧",
      skills: ["PC-3000", "Data Recovery", "Hardware Repair", "File System Analysis", "Forensic Tools"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative c-space section-spacing"
      id="skills"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Skills & </span>
            <span 
              className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            >
              Expertise
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for bringing ideas to life across the full development lifecycle
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              ref={el => cardsRef.current[index] = el}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="text-4xl mb-6 text-blue-400">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-6">
                {category.title}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-blue-600/20 hover:text-blue-300 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Additional Expertise</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 glassmorphic-card text-white rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 hover:border-blue-400/50 cursor-pointer">
              Adobe Creative Cloud
            </span>
            <span className="px-6 py-3 glassmorphic-card text-white rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 hover:border-purple-400/50 cursor-pointer">
              PC-3000 Data Recovery
            </span>
            <span className="px-6 py-3 glassmorphic-card text-white rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25 hover:border-pink-400/50 cursor-pointer">
              CapCut Video Editing
            </span>
            <span className="px-6 py-3 glassmorphic-card text-white rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 hover:border-red-400/50 cursor-pointer">
              Hardware Diagnostics
            </span>
            <span className="px-6 py-3 glassmorphic-card text-white rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25 hover:border-orange-400/50 cursor-pointer">
              File System Repair
            </span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Skills;
