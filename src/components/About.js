import React from 'react';
import useInView from '../hooks/useInView';
import './About.css';

const About = () => {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className={`about-inner ${inView ? 'visible' : ''}`}>
        <div className="about-left">
          <span className="section-label">// ABOUT_ME</span>
          <h2 className="section-title">
            Who I <span>Am</span>
          </h2>
          <div className="neon-line" />

          <p className="about-bio">
            I am a passionate Full Stack Developer and Data Analyst building
            scalable web applications and deriving meaningful insights from complex
            datasets. My stack is rooted in <strong>React</strong> on the frontend
            and <strong>Django</strong> on the backend, with a deep interest in data
            pipelines and analytics tooling.
          </p>

          <p className="about-bio">
            I believe clean code and meaningful data are two sides of the same coin.
            When I am not shipping features, I am exploring new technologies, solving
            competitive programming challenges, or mentoring fellow developers in my community.
          </p>

          <div className="about-details">
            <div className="about-detail-row">
              <span className="about-detail-key">Location</span>
              <span className="about-detail-sep">::</span>
              <span className="about-detail-val">Nairobi, Kenya</span>
            </div>
            <div className="about-detail-row">
              <span className="about-detail-key">Focus</span>
              <span className="about-detail-sep">::</span>
              <span className="about-detail-val">Web Dev + Data Analytics</span>
            </div>
            <div className="about-detail-row">
              <span className="about-detail-key">Available</span>
              <span className="about-detail-sep">::</span>
              <span className="about-detail-val about-available">Open to opportunities</span>
            </div>
          </div>

          {/* <a
            href="/resume.pdf"
            className="btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            <span>Download Resume</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a> */}
        </div>

        <div className="about-right">
          <div className="about-avatar-wrapper">
            <div className="about-avatar-frame">
              <img
                src="/image.jpeg" 
                alt="Profile"
                className="about-avatar-image"
              />
              <div className="about-avatar-corner about-avatar-tl" />
              <div className="about-avatar-corner about-avatar-tr" />
              <div className="about-avatar-corner about-avatar-bl" />
              <div className="about-avatar-corner about-avatar-br" />
            </div>

            <div className="about-badge">
              <span className="about-badge-dot" />
              <span>Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
