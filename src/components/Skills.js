import React from 'react';
import useInView from '../hooks/useInView';
import './Skills.css';

const WEB_SKILLS = [
  { name: 'React / JSX', level: 88 },
  { name: 'Django / Python', level: 82 },
  { name: 'REST APIs', level: 85 },
  { name: 'JavaScript (ES6+)', level: 87 },
  { name: 'HTML5 / CSS3', level: 90 },
  { name: 'PostgreSQL', level: 76 },
];

const DATA_SKILLS = [
  { name: 'Python (Pandas / NumPy)', level: 84 },
  { name: 'Data Visualization', level: 79 },
  { name: 'SQL Analytics', level: 81 },
  { name: 'Machine Learning Basics', level: 65 },
  { name: 'Data Cleaning / ETL', level: 80 },
];

const TECH_TAGS = [
  'Git', 'Docker', 'Linux - Basics', 'VS Code', 'Figma', 'Celery',
  'Redis', 'Nginx', 'Jupyter', 'Matplotlib', 'Seaborn',
  'Axios', 'Tailwind', 'Bootstrap', 'DRF', 'JWT',
];

const SkillBar = ({ name, level, visible }) => (
  <div className="skill-bar-item">
    <div className="skill-bar-header">
      <span className="skill-bar-name">{name}</span>
      <span className="skill-bar-level">{level}%</span>
    </div>
    <div className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{ width: visible ? `${level}%` : '0%' }}
      />
    </div>
  </div>
);

const Skills = () => {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <span className="section-label">SKILL_MATRIX</span>
      <h2 className={`section-title ${inView ? 'animate-in' : ''}`}>
        Tech <span>Stack</span>
      </h2>
      <div className="neon-line" />

      <div className="skills-grid">
        <div className={`card skills-card ${inView ? 'animate-in delay-1' : ''}`}>
          <div className="skills-card-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Web Development</span>
          </div>
          <div className="skills-bars">
            {WEB_SKILLS.map((skill) => (
              <SkillBar key={skill.name} {...skill} visible={inView} />
            ))}
          </div>
        </div>

        <div className={`card skills-card ${inView ? 'animate-in delay-2' : ''}`}>
          <div className="skills-card-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>Data Analytics</span>
          </div>
          <div className="skills-bars">
            {DATA_SKILLS.map((skill) => (
              <SkillBar key={skill.name} {...skill} visible={inView} />
            ))}
          </div>
        </div>
      </div>

      <div className={`skills-tags-section ${inView ? 'animate-in delay-3' : ''}`}>
        <div className="skills-tags-label">Other Tools & Technologies</div>
        <div className="skills-tags">
          {TECH_TAGS.map((tag) => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
