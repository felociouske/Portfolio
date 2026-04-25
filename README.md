# Space Portfolio - React

A SpaceX-inspired personal portfolio for a Full Stack Developer and Data Analyst.

## Features

- Animated starfield canvas background with scanline effect and floating particles
- "Welcome" voice greeting on load using the Web Speech API
- Typing animation cycling through your roles
- Bottom navigation on mobile, side navigation on desktop
- Sections: Hero, About, Skills, Projects, Experience, Contact
- Neon green + black color theme
- Scroll-triggered animations
- Fully responsive

## Tech Stack

- React 18
- CSS3 (CSS variables, keyframes, transitions)
- Canvas API (animated background)
- Web Speech API (welcome sound)
- IntersectionObserver (scroll animations)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Customization Checklist

Open each file and replace placeholder text:

### src/components/Hero.js
- Replace `YOUR` and `NAME` with your actual first and last name
- Update the tagline and location

### src/components/About.js
- Update the bio paragraphs with your actual story
- Change location, availability status
- Update the resume download link

### src/components/Skills.js
- Adjust skill percentages to match your actual level
- Add or remove skills as needed

### src/components/Projects.js
- Replace the 6 placeholder projects with your real projects
- Update GitHub links and live demo URLs

### src/components/Experience.js
- Replace with your actual work history and education

### src/components/Contact.js
- Update email, phone number
- Update social media links (GitHub, LinkedIn, Twitter)

### public/index.html
- Update the `<title>` with your name

## Adding Your Photo

In `src/components/About.js`, replace the `.about-avatar-placeholder` block with:

```jsx
<img
  src="/your-photo.jpg"
  alt="Your Name"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```

Place your photo in the `public/` folder.

## Connecting Contact Form to a Backend

The contact form currently simulates a submission. To wire it to your Django backend:

1. In `src/components/Contact.js`, replace the `handleSubmit` function:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');
  try {
    await fetch('http://localhost:8000/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  } catch (err) {
    setStatus('error');
  }
};
```

2. Create a Django endpoint that receives the POST and sends an email.

## Deployment

For production, run `npm run build` then deploy the `build/` folder to any static host:
- Netlify (drag and drop the build folder)
- Vercel
- GitHub Pages
- Your own VPS behind Nginx

## Font Credits

- [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) — monospace terminal font
- [Exo 2](https://fonts.google.com/specimen/Exo+2) — display / headings font
