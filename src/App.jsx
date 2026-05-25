import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Journey from "./sections/Journey";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

import StarsBackground from "./components/three/StarsBackground";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import Loader from "./components/ui/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  const move = (e) => {
    document.body.style.setProperty("--x", `${e.clientX}px`);
    document.body.style.setProperty("--y", `${e.clientY}px`);
  };

  window.addEventListener("mousemove", move);

  return () => {
    window.removeEventListener("mousemove", move);
  };
}, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-dark text-white overflow-hidden relative">
      <StarsBackground />
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