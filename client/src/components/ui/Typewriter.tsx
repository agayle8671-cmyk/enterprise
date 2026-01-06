import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
    strings: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
    cursorClassName?: string;
    showCursor?: boolean;
}

type Phase = 'TYPING' | 'PAUSING' | 'DELETING' | 'SWITCHING';

export function TypewriterText({
    strings,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
    className = '',
    cursorClassName = '',
    showCursor = true,
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('TYPING');
    const [isTyping, setIsTyping] = useState(true);

    // Calculate common prefix for smart backspacing
    const getCommonPrefixLength = useCallback((str1: string, str2: string): number => {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return i;
    }, []);

    useEffect(() => {
        if (strings.length === 0) return;

        const currentString = strings[currentIndex];
        const nextIndex = (currentIndex + 1) % strings.length;
        const nextString = strings[nextIndex];
        const commonPrefixLength = getCommonPrefixLength(currentString, nextString);

        let timeout: ReturnType<typeof setTimeout>;

        switch (phase) {
            case 'TYPING':
                setIsTyping(true);
                if (displayText.length < currentString.length) {
                    // Add slight randomness for natural feel
                    const variance = Math.random() * 40 - 20;
                    timeout = setTimeout(() => {
                        setDisplayText(currentString.slice(0, displayText.length + 1));
                    }, typingSpeed + variance);
                } else {
                    setPhase('PAUSING');
                }
                break;

            case 'PAUSING':
                setIsTyping(false);
                timeout = setTimeout(() => {
                    setPhase('DELETING');
                }, pauseDuration);
                break;

            case 'DELETING':
                setIsTyping(true);
                // Smart backspacing - only delete to common prefix
                if (displayText.length > commonPrefixLength) {
                    timeout = setTimeout(() => {
                        setDisplayText(displayText.slice(0, -1));
                    }, deletingSpeed);
                } else {
                    setPhase('SWITCHING');
                }
                break;

            case 'SWITCHING':
                setCurrentIndex(nextIndex);
                setPhase('TYPING');
                break;
        }

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, phase, strings, typingSpeed, deletingSpeed, pauseDuration, getCommonPrefixLength]);

    return (
        <span className={`inline-flex items-center ${className}`}>
            <span className="font-mono">{displayText}</span>
            {showCursor && (
                <span
                    className={`${isTyping ? 'cursor-solid' : 'cursor-block'} ${cursorClassName}`}
                    aria-hidden="true"
                />
            )}
            {/* Screen reader accessible version */}
            <span className="sr-only">{strings[currentIndex]}</span>
        </span>
    );
}

// Simpler variant for single line typewriter with loop
interface SimpleTypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

export function SimpleTypewriter({
    text,
    speed = 50,
    delay = 0,
    className = '',
    onComplete,
}: SimpleTypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const delayTimeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(delayTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (displayText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(text.slice(0, displayText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            onComplete?.();
        }
    }, [displayText, text, speed, started, onComplete]);

    return (
        <span className={`font-mono ${className}`}>
            {displayText}
            {displayText.length < text.length && (
                <span className="cursor-solid" aria-hidden="true" />
            )}
        </span>
    );
}

// Staggered text reveal for headers
interface StaggerTextProps {
    text: string;
    className?: string;
    staggerDelay?: number;
}

export function StaggerText({ text, className = '', staggerDelay = 0.03 }: StaggerTextProps) {
    const letters = text.split('');

    return (
        <motion.span className={className}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: i * staggerDelay,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="inline-block"
                    style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.span>
    );
}

export default TypewriterText;
