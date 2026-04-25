import { useEffect } from 'react';

const WelcomeSound = () => {
  useEffect(() => {
    const playWelcome = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();

        const speak = () => {
          if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance('Welcome');
            utter.rate = 0.85;
            utter.pitch = 0.7;
            utter.volume = 0.9;

            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(
              (v) =>
                v.name.toLowerCase().includes('daniel') ||
                v.name.toLowerCase().includes('alex') ||
                v.name.toLowerCase().includes('google uk') ||
                v.lang === 'en-GB'
            );
            if (preferred) utter.voice = preferred;

            window.speechSynthesis.speak(utter);
          }
        };

        const playBeep = () => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.2);
        };

        playBeep();

        if (window.speechSynthesis.getVoices().length > 0) {
          speak();
        } else {
          window.speechSynthesis.onvoiceschanged = speak;
        }
      } catch (err) {
      }
    };

    const timer = setTimeout(playWelcome, 600);
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default WelcomeSound;
