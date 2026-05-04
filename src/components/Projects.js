import React, { useState } from 'react';
import useInView from '../hooks/useInView';
import useScrollReveal from '../hooks/useScrollReveal';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    category: 'fullstack',
    title: 'Nexcribe - Writting and transcription app and website',
    description:
      'A full-stack web application for transcribing and writting, React and vite frontend based and Django backend. With a fully customized admin panel with user management, subscription management, and content management.',
    tags: ['React', 'Django', 'PostgreSQL', 'Stripe', 'DRF'],
    github: 'https://github.com/felociouske/nexcribe_frontend',
    live: 'https://www.nexcribe.com',
    status: 'LIVE',
  },
  {
    id: 2,
    category: 'data',
    title: 'Sales Analytics Dashboard',
    description:
      'Interactive data dashboard that visualizes KPIs, trends, and forecasts from CSV and SQL sources using Pandas and Matplotlib, exported as a web app.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Django', 'Chart.js'],
    github: '#',
    live: '#',
    status: 'LIVE',
  },
  {
    id: 3,
    category: 'fullstack',
    title: 'Holistic Family Midwifery Website',
    description:
      'Real-time project management tool with WebSockets, team collaboration, Kanban boards, and role-based access control built on Django Channels.',
    tags: ['React', 'Django Channels', 'WebSocket', 'Redis', 'JWT'],
    github: '#',
    live: 'https://holisticfamilymidwife.com',
    status: 'LIVE',
  },
  {
    id: 4,
    category: 'data',
    title: 'Diabetes Analysis Project',
    description:
      'Automated ETL pipeline fetching daily COVID datasets, cleaning data with Pandas, storing in PostgreSQL and rendering a public-facing dashboard.',
    tags: ['Python', 'Celery', 'PostgreSQL', 'Pandas', 'Power BI'],
    github: '#',
    live: '#',
    status: 'LIVE',
  },
  {
    id: 5,
    category: 'frontend',
    title: 'Portfolio (This Site)',
    description:
      'Space-tech themed personal portfolio with animated canvas background, typing effects, WebAudio API welcome sound, and responsive side/bottom navigation.',
    tags: ['React', 'CSS3', 'Canvas API', 'Web Audio API'],
    github: '#',
    live: 'https://portfolio-z26j.vercel.app/',
    status: 'LIVE',
  },
  {
    id: 6,
    category: 'data',
    title: 'Stock Price Predictor',
    description:
      'Machine learning model using historical stock data to predict short-term price movements. Built with scikit-learn, deployed as a lightweight Django REST endpoint.',
    tags: ['Python', 'scikit-learn', 'Django', 'NumPy', 'Pandas'],
    github: '#',
    live: null,
    status: 'PROTOTYPE',
  },
];

const FILTERS = ['all', 'fullstack', 'data', 'frontend'];

const STATUS_COLOR = {
  LIVE: '#00ff41',
  'IN PROGRESS': '#ffcc00',
  ARCHIVED: '#666',
  PROTOTYPE: '#00bfff',
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView();
  const gridRef = useScrollReveal({ threshold: 0.12 });

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  // Alternate left/right for each card
  const getRevealClass = (index) => (index % 2 === 0 ? 'reveal-left' : 'reveal-right');

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <span className="section-label">PROJECT_LOG</span>
      <h2 className={`section-title ${inView ? 'animate-in' : ''}`}>
        What I've <span>Built</span>
      </h2>
      <div className="neon-line" />

      <div className={`projects-filters ${inView ? 'animate-in delay-1' : ''}`}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="projects-grid" ref={gridRef}>
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={`card project-card ${getRevealClass(i)}`}
            data-reveal
            style={{ transitionDelay: `${0.08 * (i % 3)}s` }}
          >
            <div className="project-card-top">
              <div className="project-meta">
                <span
                  className="project-status"
                  style={{ color: STATUS_COLOR[project.status] }}
                >
                  <span
                    className="project-status-dot"
                    style={{ background: STATUS_COLOR[project.status] }}
                  />
                  {project.status}
                </span>
                <span className="project-id">#{String(project.id).padStart(3, '0')}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
            </div>

            <div className="project-card-bottom">
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Code
                </a>
                {project.live && (
                  <a href={project.live} className="project-link project-link-live" target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
