import Particles from "./components/Particles"; // Make sure the path is correct
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

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
      <About />
      <Projects />
      <Experiences />
      <Contact />
      <Footer/>
    </div>
  );
};

export default App;
