import Particles from "./components/Particles";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import { ScrollReveal } from "./components/ScrollReveal";

const App = () => {
  return (
    <div className="relative">
      {/* Global star/particles background */}
      <Particles
        className="fixed inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {/* Keep navbar centered within the content container */}
      <div className="container mx-auto max-w-7xl">
        <Navbar />
      </div>

      {/* Make Hero full-bleed width */}
      <Hero />

      {/* Constrain the rest of the sections */}
      <div className="container mx-auto max-w-7xl">
        <ScrollReveal animation="fadeInUp" duration={1.2}>
          <About />
        </ScrollReveal>
        <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.2}>
          <Skills />
        </ScrollReveal>
        <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.4}>
          <Projects />
        </ScrollReveal>
        <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.6}>
          <Experiences />
        </ScrollReveal>
        <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.8}>
          <Contact />
        </ScrollReveal>
        <ScrollReveal animation="fadeInUp" duration={1.2} delay={1.0}>
          <Footer />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default App;
