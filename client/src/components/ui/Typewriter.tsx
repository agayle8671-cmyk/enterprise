import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterProps {
    phrases: string[];
    className?: string;
    cursorColor?: string;
    onComplete?: () => void;
}

// Gaussian Random Helper (Box-Muller transform)
// Generates a number with a normal distribution around 0
function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function getTypingDelay() {
    // Base speed 40ms + variance
    // We want a "fast" feel but human.
    const base = 40;
    const variance = 15;
    const noise = gaussianRandom() * variance;
    return Math.max(10, base + noise); // Min 10ms
}

function getDeletionDelay() {
    // Rapid accelerating deletion
    return 20;
}

const CONSTANTS = {
    PAUSE_MS: 2000,
    PUNCTUATION_PAUSE_MS: 300,
};

export function Typewriter({
    phrases,
    className,
    cursorColor = '#FF6363', // Raycast Red default 
    onComplete
}: TypewriterProps) {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [phase, setPhase] = useState<'TYPING' | 'PAUSING' | 'DELETING'>('TYPING');
    const [cursorVisible, setCursorVisible] = useState(true);

    const goalText = phrases[currentPhraseIndex];
    const mountedRef = useRef(true);

    // Layout Stability: Find the longest phrase to set container size
    const longestPhrase = phrases.reduce((a, b) => a.length > b.length ? a : b, '');

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const loop = () => {
            if (!mountedRef.current) return;

            if (phase === 'TYPING') {
                if (displayText !== goalText) {
                    // Determine character to add
                    const nextChar = goalText.slice(0, displayText.length + 1);

                    // Calculate Delay
                    let delay = getTypingDelay();
                    const charAdded = nextChar.slice(-1);

                    // Add pause for punctuation
                    if ([',', '.', '?', '!'].includes(charAdded)) {
                        delay += CONSTANTS.PUNCTUATION_PAUSE_MS;
                    }

                    timeout = setTimeout(() => {
                        setDisplayText(nextChar);
                        setCursorVisible(false); // Hide cursor while typing
                        loop();
                    }, delay);
                } else {
                    // Finished Typing
                    setPhase('PAUSING');
                    setCursorVisible(true); // Show cursor immediately
                    timeout = setTimeout(loop, CONSTANTS.PAUSE_MS);
                }
            } else if (phase === 'PAUSING') {
                // After pause, start deleting
                setPhase('DELETING');
                loop();
            } else if (phase === 'DELETING') {
                // Smart Backspacing Logic
                // Calculate LCP with next phrase
                const nextIndex = (currentPhraseIndex + 1) % phrases.length;
                const nextPhrase = phrases[nextIndex];

                // Find common prefix length
                let lcpLength = 0;
                const minLen = Math.min(goalText.length, nextPhrase.length);
                for (let i = 0; i < minLen; i++) {
                    if (goalText[i] !== nextPhrase[i]) break;
                    lcpLength++;
                }

                if (displayText.length > lcpLength) {
                    timeout = setTimeout(() => {
                        setDisplayText(prev => prev.slice(0, -1));
                        setCursorVisible(false); // Hide cursor while deleting
                        loop();
                    }, getDeletionDelay());
                } else {
                    // Smart delete finished
                    setCurrentPhraseIndex(nextIndex);
                    setPhase('TYPING');
                    setCursorVisible(true);
                    loop();
                }
            }
        };

        // Start the loop
        loop();

        return () => clearTimeout(timeout);
    }, [displayText, phase, currentPhraseIndex, goalText, phrases]);

    return (
        <div className={cn("relative font-mono-raycast inline-block", className)}>
            {/* Ghost Element for Zero CLS */}
            <span className="invisible opacity-0" aria-hidden="true">
                {longestPhrase}
                <span className="inline-block w-[1ch]">&nbsp;</span>
            </span>

            {/* Real Text Overlay */}
            <span className="absolute top-0 left-0 whitespace-nowrap">
                {displayText}
                {/* Block Cursor */}
                <span
                    className={cn(
                        "inline-block w-[1ch] h-[1.1em] align-middle -mt-1 ml-[1px]",
                        cursorVisible ? "animate-cursor-blink" : "opacity-100"
                    )}
                    style={{ backgroundColor: cursorColor }}
                />
            </span>
        </div>
    );
}

// Add these to your global CSS or tailwind config if not present
// @keyframes cursor-blink {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0; }
// }
// .animate-cursor-blink { animation: cursor-blink 1s step-end infinite; }
