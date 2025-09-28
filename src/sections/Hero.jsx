import ParallaxBackground from "../components/ParallaxBackground";
import { CustomBackground } from "../components/CustomBackground";
import { useMediaQuery } from "react-responsive";

// Example logos (replace with your own or use SVGs)
const featuredLogos = [
  { src: "/logos/hostinger.svg", alt: "Hostinger" },
  { src: "/logos/upwork.svg", alt: "Upwork" },
  { src: "/logos/careerfoundry.svg", alt: "CareerFoundry" },
  { src: "/logos/frontendmentor.svg", alt: "Frontend Mentor" },
  { src: "/logos/wearedevelop.svg", alt: "WeAreDevelop" },
];

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Background Effects */}
      <ParallaxBackground />
      <CustomBackground
        type="gradient"
        colors={["#667eea", "#764ba2", "#f093fb"]}
        speed={0.5}
        className="absolute inset-0 opacity-20 pointer-events-none"
      />

      {/* Hero Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center w-full px-6 pt-24 pb-12 ${isMobile ? "mt-10" : ""}`}>
        <h1 className={`font-extrabold text-white tracking-tight text-center mb-6 drop-shadow-lg ${isMobile ? "text-4xl" : "text-5xl md:text-7xl"}`}>
          YOUR NAME
        </h1>
        <h2 className={`font-mono text-gray-200 text-center mb-8 tracking-wide ${isMobile ? "text-base" : "text-lg md:text-2xl"}`}>
          SOFTWARE ENGINEER, FRONT END & APP DEVELOPER.
        </h2>
        {/* Featured logos */}
        <div className={`flex flex-wrap justify-center items-center gap-8 mt-8 opacity-80 ${isMobile ? "gap-4" : ""}`}>
          {featuredLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={`grayscale hover:grayscale-0 transition ${isMobile ? "h-6" : "h-8 md:h-10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
