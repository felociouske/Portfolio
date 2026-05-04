import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import GalaxyLoader from './components/GalaxyLoader';
import ForestBackground from './components/ForestBackground';
import StarField from './components/StarField';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import WelcomeSound from './components/WelcomeSound';

const AppContent = () => {
  return (
    <div className="app-layout">
      <WelcomeSound />
      <StarField />
      <ForestBackground />
      <Nav />
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
};

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!loaded && <GalaxyLoader onComplete={() => setLoaded(true)} />}
      {loaded && <AppContent />}
    </ThemeProvider>
  );
};

export default App;
