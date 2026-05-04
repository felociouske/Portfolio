import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  space: {
    id: 'space',
    label: 'Space',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  forest: {
    id: 'forest',
    label: 'Forest',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 14l-5-9-5 9h10z" />
        <path d="M15 11l-3-5-3 5h6z" />
        <rect x="10" y="14" width="4" height="6" />
      </svg>
    ),
  },
  vegetation: {
    id: 'vegetation',
    label: 'Vegetation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22V12M12 12C12 7 7 4 3 6c4 0 7 3 9 6M12 12c0-5 5-8 9-6-4 0-7 3-9 6" />
      </svg>
    ),
  },
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('space');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
