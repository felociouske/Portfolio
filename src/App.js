import React from 'react';
import StarField from './components/StarField';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import WelcomeSound from './components/WelcomeSound';

const App = () => {
  return (
    <div className="app-layout">
      <WelcomeSound />
      <StarField />
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

export default App;
