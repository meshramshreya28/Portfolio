import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Navbar    from "./components/layout/Navbar";
import Hero      from "./sections/Hero";
import About     from "./sections/About";
import Skills    from "./sections/Skills";
import Projects  from "./sections/Projects";
import Journey   from "./sections/Journey";
import Contact   from "./sections/Contact";
import Footer    from "./sections/Footer";

import ScrollProgress  from "./components/ui/ScrollProgress";
import CustomCursor    from "./components/ui/CustomCursor";
import Loader          from "./components/ui/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  /* Lenis smooth scroll — also tick ScrollTrigger */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-bg text-cream overflow-hidden relative">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;