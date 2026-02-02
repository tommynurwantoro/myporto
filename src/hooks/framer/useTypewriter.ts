import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string | string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
}

interface UseTypewriterReturn {
  displayedText: string;
  isTyping: boolean;
  isComplete: boolean;
  reset: () => void;
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  loop = false,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = Array.isArray(text) ? text : [text];
  const currentText = texts[currentTextIndex];

  const reset = useCallback(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);
    setCurrentIndex(0);
    setCurrentTextIndex(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentTextIndex < texts.length - 1) {
      if (loop) {
        const timer = setTimeout(() => {
          setCurrentIndex(0);
          setCurrentTextIndex((prev) => prev + 1);
          setDisplayedText('');
        }, speed * 10);

        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        setIsComplete(true);
      }
    } else {
      setIsTyping(false);
      setIsComplete(true);
    }
  }, [currentIndex, currentText, currentTextIndex, texts, isTyping, speed, loop]);

  return {
    displayedText,
    isTyping,
    isComplete,
    reset,
  };
}