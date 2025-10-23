import Particles from "./components/Particles";
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import { ScrollReveal } from "./components/ScrollReveal";

const App = () => {
  return (
    <div className="relative container mx-auto max-w-7xl">
      {/* Global star/particles background */}
      <Particles
        className="fixed inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <Navbar />
      <Hero />
      <ScrollReveal animation="fadeInUp" duration={1.2}>
        <About />
      </ScrollReveal>
      <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.2}>
        <Projects />
      </ScrollReveal>
      <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.4}>
        <Experiences />
      </ScrollReveal>
      <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.6}>
        <Contact />
      </ScrollReveal>
      <ScrollReveal animation="fadeInUp" duration={1.2} delay={0.8}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default App;
