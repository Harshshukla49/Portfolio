import { useEffect, useState } from 'react';

type TypewriterProps = {
  words: string[];
};

export default function Typewriter({ words }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const duration = deleting ? 35 : 58;
    const timer = window.setTimeout(() => {
      setDisplay((current) => {
        const nextLength = deleting ? current.length - 1 : current.length + 1;
        return word.slice(0, nextLength);
      });

      if (!deleting && display === word) {
        window.setTimeout(() => setDeleting(true), 900);
      }

      if (deleting && display === '') {
        setDeleting(false);
        setIndex((current) => current + 1);
      }
    }, duration);

    return () => window.clearTimeout(timer);
  }, [deleting, display, index, words]);

  return (
    <span className="inline-flex min-h-[1.6em] items-center text-gradient">
      {display}
      <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-neonBlue" />
    </span>
  );
}
