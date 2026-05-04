# Portfolio Upgrade - Drop-in Replacement Guide

## What changed

### New files (add these to your project)
- `src/components/GalaxyLoader.js` + `GalaxyLoader.css`  — 5s galaxy animation loader
- `src/components/ForestBackground.js` + `ForestBackground.css` — animated leaves/spores for nature themes
- `src/context/ThemeContext.js` — React context powering the 3-theme system
- `src/hooks/useScrollReveal.js` — scroll-triggered sideways card animations

### Replaced files (overwrite yours)
- `src/App.js` — wraps everything in ThemeProvider, shows loader on first visit
- `src/index.css` — full theme variable system (space / forest / vegetation)
- `src/components/Nav.js` — adds Theme switcher button + dropdown
- `src/components/Nav.css` — dropdown styles + accent-token colors
- `src/components/Projects.js` — sideways slide-in on scroll
- `src/components/Projects.css` — uses accent tokens
- `src/components/About.css`, `Skills.css`, `Hero.css`, `Contact.css`, `Experience.css`, `StarField.css`
  — all updated to use `--accent` tokens so they respond to theme changes

## How themes work
1. User clicks **Theme** in the nav  
2. A dropdown shows: Space / Forest / Vegetation  
3. Selecting sets `data-theme="forest"` (or `vegetation`) on `<html>`  
4. All CSS variables swap automatically — colors, glows, backgrounds, borders, fonts  
5. The animated ForestBackground canvas kicks in with floating leaves/spores  

## Install dependencies (none new required)
All libraries used are already part of a standard `create-react-app` / Vite React project.

## Quick start
```bash
# replace src/ with this src/ folder, then:
npm install
npm start
```
