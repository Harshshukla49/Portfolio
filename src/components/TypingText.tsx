import { useEffect, useState } from 'react';

type TypingTextProps = {
  words: string[];
  className?: string;
};

export default function TypingText({ words, className }: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const typingSpeed = isDeleting ? 45 : 75;
    const timeout = window.setTimeout(() => {
      if (!isDeleting && letterIndex === currentWord.length) {
        window.setTimeout(() => setIsDeleting(true), 1200);
        return;
      }

      if (isDeleting && letterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((value) => (value + 1) % words.length);
        return;
      }

      setLetterIndex((value) => value + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [wordIndex, letterIndex, isDeleting, words]);

  return (
    <span className={className}>
      {words[wordIndex % words.length].slice(0, letterIndex)}
      <span className="ml-1 inline-block animate-pulse text-neonBlue">|</span>
    </span>
  );
}
