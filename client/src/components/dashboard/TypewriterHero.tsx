import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface TypewriterHeroProps {
    phrases: string[];
    label?: string;
    statValue?: string;
    statLabel?: string;
    showLiveIndicator?: boolean;
}

type Phase = 'TYPING' | 'PAUSING' | 'DELETING' | 'SWITCHING';

export function TypewriterHero({
    phrases,
    label = 'Live System',
    statValue,
    statLabel = 'saved today',
    showLiveIndicator = true,
}: TypewriterHeroProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('TYPING');

    // Smart backspacing - calculate common prefix
    const getCommonPrefixLength = useCallback((str1: string, str2: string): number => {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return i;
    }, []);

    useEffect(() => {
        if (phrases.length === 0) return;

        const currentString = phrases[currentIndex];
        const nextIndex = (currentIndex + 1) % phrases.length;
        const nextString = phrases[nextIndex];
        const commonPrefixLength = getCommonPrefixLength(currentString, nextString);

        let timeout: ReturnType<typeof setTimeout>;

        switch (phase) {
            case 'TYPING':
                if (displayText.length < currentString.length) {
                    // Stagger: 0.05s per character
                    timeout = setTimeout(() => {
                        setDisplayText(currentString.slice(0, displayText.length + 1));
                    }, 50);
                } else {
                    setPhase('PAUSING');
                }
                break;

            case 'PAUSING':
                // Pause: 2s delay before deleting
                timeout = setTimeout(() => {
                    setPhase('DELETING');
                }, 2000);
                break;

            case 'DELETING':
                // Deletion Speed: 0.02s (2x faster than typing)
                if (displayText.length > commonPrefixLength) {
                    timeout = setTimeout(() => {
                        setDisplayText(displayText.slice(0, -1));
                    }, 20);
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
    }, [displayText, currentIndex, phase, phrases, getCommonPrefixLength]);

    return (
        <motion.div
            className="raycast-panel p-6 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            layout
        >
            {/* Icon */}
            <div className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #FF6363 0%, #8B5CF6 100%)' }}>
                <Zap className="h-7 w-7 text-white" />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
                {showLiveIndicator && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                        </span>
                        <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wide">{label}</span>
                    </div>
                )}

                {/* Typewriter text with cursor */}
                <div className="flex items-center">
                    <span
                        className="text-xl font-medium text-[#EDEDED]"
                        style={{ letterSpacing: '-0.025em' }}
                    >
                        {displayText}
                    </span>
                    {/* Cursor: 12px width, 1em height, #FF6363, crisp blink */}
                    <motion.span
                        className="inline-block ml-0.5"
                        style={{
                            width: '12px',
                            height: '1em',
                            backgroundColor: '#FF6363',
                        }}
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            times: [0, 0.5, 0.5, 1], // Step effect: on for 0.5s, off for 0.5s
                        }}
                    />
                </div>
            </div>

            {/* Stat display */}
            {statValue && (
                <div className="text-right shrink-0">
                    <div
                        className="text-3xl font-bold"
                        style={{
                            background: 'linear-gradient(135deg, #FF6363 0%, #8B5CF6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.025em'
                        }}
                    >
                        {statValue}
                    </div>
                    <div className="text-xs text-[#989898] uppercase tracking-wide">{statLabel}</div>
                </div>
            )}
        </motion.div>
    );
}

export default TypewriterHero;
