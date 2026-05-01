import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import Hero from './components/Hero';
import Certification from './components/Certification';
import Projects from './components/Projects';
import Research from './components/Research';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#020408]">
      {/* Global effects */}
      <CustomCursor />
      <ParticleField />

      {/* Scanline */}
      <div className="scanline" />

      {/* Navigation */}
      <Navbar />

      {/* Page */}
      <main>
        <Hero />
        <Certification />
        <Projects />
        <Research />
        <Contact />
      </main>
    </div>
  );
}