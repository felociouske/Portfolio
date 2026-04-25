import React from 'react';
import useInView from '../hooks/useInView';
import './Experience.css';

const TIMELINE = [
  {
    id: 1,
    year: '2024 – Present',
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    type: 'work',
    description:
      'Building custom web applications for clients using React and Django. Delivering REST APIs, admin dashboards, and data analytics integrations.',
    skills: ['React', 'Django', 'PostgreSQL'],
  },
  {
    id: 2,
    year: '2023 – 2024',
    role: 'Junior Data Analyst',
    company: 'Xplore Data Solutions',
    type: 'work',
    description:
      'Analyzed business datasets using Python and SQL. Built automated reporting pipelines with Pandas and visualized KPIs using Power BI dashboards.',
    skills: ['Python', 'SQL', 'R', 'Pandas'],
  },
  {
    id: 3,
    year: '2023',
    role: 'Statistics',
    company: 'JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY',
    type: 'education',
    description:
      'Completed the Google Data Analytics Professional Certificate — covering data cleaning, analysis, visualization, and storytelling with data.',
    skills: ['SQL', 'R', 'Spreadsheets'],
  },
  {
    id: 4,
    year: '2022 – 2023',
    role: 'BSc Pure Statistics',
    company: 'JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY',
    type: 'education',
    description:
      'Relevant coursework in algorithms, databases, software engineering, and statistics. Final year project: a full-stack student management system.',
    skills: ['Python', 'MySQL', 'Algorithms', 'OOP', 'Data Structures','R'],
  },
];

const Experience = () => {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <span className="section-label">MISSION_LOG</span>
      <h2 className={`section-title ${inView ? 'animate-in' : ''}`}>
        My <span>Journey</span>
      </h2>
      <div className="neon-line" />

      <div className="timeline" ref={ref}>
        {TIMELINE.map((item, i) => (
          <div
            key={item.id}
            className={`timeline-item ${item.type} ${inView ? 'animate-in' : ''}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="timeline-line">
              <div className="timeline-dot">
                {item.type === 'education' ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 7H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
                    <path d="M16 7V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2" />
                  </svg>
                )}
              </div>
            </div>

            <div className="timeline-content card">
              <div className="timeline-header">
                <div>
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                </div>
                <span className={`timeline-type-badge ${item.type}`}>
                  {item.type === 'work' ? 'WORK' : 'EDU'}
                </span>
              </div>

              <p className="timeline-desc">{item.description}</p>

              <div className="timeline-skills">
                {item.skills.map((s) => (
                  <span key={s} className="project-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
