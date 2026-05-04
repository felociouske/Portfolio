import React, { useState, useEffect, useRef } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import './Nav.css';

const NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const Nav = () => {
  const [active, setActive] = useState('hero');
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const dropRef = useRef(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-brand-text">SYS</span>
        <span className="nav-brand-dot" />
      </div>

      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-btn ${active === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {active === item.id && <span className="nav-indicator" />}
            </button>
          </li>
        ))}

        {/* Theme switcher */}
        <li className="nav-item nav-theme-item" ref={dropRef}>
          <button
            className={`nav-btn nav-theme-btn ${themeOpen ? 'active' : ''}`}
            onClick={() => setThemeOpen((o) => !o)}
            aria-label="Switch theme"
          >
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </span>
            <span className="nav-label">Theme</span>
          </button>

          {themeOpen && (
            <div className="nav-theme-dropdown">
              <div className="nav-theme-dropdown-label">SELECT THEME</div>
              {Object.values(themes).map((t) => (
                <button
                  key={t.id}
                  className={`nav-theme-option ${theme === t.id ? 'selected' : ''}`}
                  onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                >
                  <span className="nav-theme-option-icon">{t.icon}</span>
                  <span className="nav-theme-option-label">{t.label}</span>
                  {theme === t.id && (
                    <span className="nav-theme-option-check">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </li>
      </ul>

      <div className="nav-footer">
        <span className="nav-status">
          <span className="nav-status-dot" />
          ONLINE
        </span>
      </div>
    </nav>
  );
};

export default Nav;
