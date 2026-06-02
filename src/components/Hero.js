import React from 'react';
import useTyping from '../hooks/useTyping';
import './Hero.css';

const ROLES = [
  'Full Stack Developer',
  'React Engineer',
  'Django Developer',
  'Data Analyst',
  'React-native app android and ios developer',
];

const Hero = () => {
  const { displayText } = useTyping(ROLES, {
    typingSpeed: 80,
    deletingSpeed: 45,
    pauseAfterType: 2200,
  });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-prefix animate-in">
          <span className="hero-prefix-line" />
          <span className="hero-prefix-text">INITIALIZING PORTFOLIO v2.0</span>
          <span className="hero-prefix-line" />
        </div>

        <div className="hero-greeting animate-in delay-1">
          Hello, World. I am
        </div>

        <h1 className="hero-name animate-in delay-2">
          <span className="hero-name-first">Martin</span>
          <span className="hero-name-last">Dev</span>
        </h1>

        <div className="hero-role animate-in delay-3">
          <span className="hero-role-bracket">[</span>
          <span className="hero-role-text">{displayText}</span>
          <span className="hero-cursor">_</span>
          <span className="hero-role-bracket">]</span>
        </div>

        <p className="hero-tagline animate-in delay-4">
          Building tomorrow's web, today. Turning raw data into decisions.
          <br />
          Based in{' '}
          <span className="hero-location">
            Nairobi, Kenya
          </span>
        </p>

        <div className="hero-actions animate-in delay-5">
          <a href="#projects" className="btn-primary">
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">
            <span>Get In Touch</span>
          </a>
        </div>

        <div className="hero-stats animate-in delay-5">
          <div className="hero-stat">
            <span className="hero-stat-number">2+</span>
            <span className="hero-stat-label">Years Coding</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">20+</span>
            <span className="hero-stat-label">Projects Built</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">2</span>
            <span className="hero-stat-label">Specializations</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span className="hero-scroll-text">SCROLL</span>
        <div className="hero-scroll-line" />
      </div>

      <div className="hero-corner hero-corner-tl" />
      <div className="hero-corner hero-corner-tr" />
      <div className="hero-corner hero-corner-bl" />
      <div className="hero-corner hero-corner-br" />
    </section>
  );
};

export default Hero;
