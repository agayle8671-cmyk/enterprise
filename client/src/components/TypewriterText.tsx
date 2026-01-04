import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export function TypewriterText({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = '',
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const tick = () => {
      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
        return;
      }

      if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
          timeoutRef.current = setTimeout(tick, deletingSpeed + Math.random() * 30);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
          const nextSpeed = typingSpeed + Math.random() * 40;
          timeoutRef.current = setTimeout(tick, nextSpeed);
        } else {
          setIsPaused(true);
          timeoutRef.current = setTimeout(tick, 100);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-1 animate-blink align-middle" />
    </span>
  );
}

interface StaggeredRevealProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  onComplete?: () => void;
}

export function StaggeredReveal({
  text,
  delay = 0,
  staggerDelay = 50,
  className = '',
}: StaggeredRevealProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (visibleChars < text.length) {
      const timeout = setTimeout(() => {
        setVisibleChars((prev) => prev + 1);
      }, staggerDelay + Math.random() * 20);

      return () => clearTimeout(timeout);
    }
  }, [hasStarted, visibleChars, text.length, staggerDelay]);

  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-300"
          style={{
            opacity: i < visibleChars ? 1 : 0,
            transform: i < visibleChars ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: `${i * 15}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

interface MusicalTypeProps {
  words: string[];
  baseDelay?: number;
  className?: string;
}

export function MusicalType({ words, baseDelay = 0, className = '' }: MusicalTypeProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (phase === 'typing') {
      if (displayText.length < currentWord.length) {
        const charDelay = 60 + Math.random() * 40;
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, charDelay);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 100);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 2500);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        const charDelay = 30 + Math.random() * 20;
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, charDelay);
      } else {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, currentWordIndex, words]);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setDisplayText('');
      setPhase('typing');
    }, baseDelay);

    return () => clearTimeout(startDelay);
  }, [baseDelay]);

  return (
    <span className={className}>
      {displayText.split('').map((char, i) => (
        <span
          key={`${currentWordIndex}-${i}`}
          className="inline-block"
          style={{
            animation: 'letterDrop 0.2s ease-out forwards',
            animationDelay: `${i * 30}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <span 
        className="inline-block w-[3px] h-[0.9em] bg-slate-900 ml-0.5 align-middle"
        style={{ animation: 'cursorBlink 1s ease-in-out infinite' }}
      />
    </span>
  );
}
