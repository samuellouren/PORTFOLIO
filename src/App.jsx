import LanguageProvider from "./context/LanguageProvider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-bg font-body text-text">
        {/* Grão de filme sobre toda a página */}
        <div className="noise-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.055] mix-blend-overlay" />

        <Navbar />
        {/* Compensa a navbar fixa de 68px */}
        <div id="top" className="h-[68px]" />

        <main className="relative">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
