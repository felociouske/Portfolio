import { useState, useEffect } from 'react';

const useTyping = (texts, options = {}) => {
  const {
    typingSpeed = 70,
    deletingSpeed = 40,
    pauseAfterType = 2000,
    pauseAfterDelete = 500,
    loop = true,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    let timeout;

    if (isTyping) {
      if (charIndex < texts[textIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + texts[textIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        if (!loop && textIndex === texts.length - 1) return;
        timeout = setTimeout(() => setIsTyping(false), pauseAfterType);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, textIndex, texts, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, loop]);

  return { displayText, isTyping };
};

export default useTyping;
