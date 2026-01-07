/**
 * IntentReplay - AI Text Generation Visualization
 * 
 * Character-by-character typing simulation for AI-generated content.
 * Makes AI output feel "crafted" rather than magically appearing.
 * Uses International Orange cursor to indicate AI authorship.
 */

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface IntentReplayProps {
    /** The full text to "type out" */
    text: string;
    /** Typing speed in characters per second */
    speed?: number;
    /** Called when typing completes */
    onComplete?: () => void;
    /** Whether to show the blinking cursor */
    showCursor?: boolean;
    /** CSS class for the container */
    className?: string;
}

export function IntentReplay({
    text,
    speed = 60,
    onComplete,
    showCursor = true,
    className = ''
}: IntentReplayProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);

        if (!text) return;

        const interval = 1000 / speed;
        let currentIndex = 0;

        const timer = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(timer);
                setIsComplete(true);
                onComplete?.();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [text, speed, onComplete]);

    return (
        <div className={`relative font-mono ${className}`}>
            <span className="whitespace-pre-wrap">{displayedText}</span>
            {showCursor && !isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-5 ml-0.5 align-middle"
                    style={{ background: 'var(--color-sos-soul)' }}
                />
            )}
        </div>
    );
}

/**
 * useIntentReplay - Hook for controlling intent replay programmatically
 */
export function useIntentReplay(initialText = '') {
    const [text, setText] = useState(initialText);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState('');

    const startReplay = useCallback((newText: string, speed = 60) => {
        setText(newText);
        setIsTyping(true);
        setDisplayedText('');

        let currentIndex = 0;
        const interval = 1000 / speed;

        const timer = setInterval(() => {
            if (currentIndex < newText.length) {
                setDisplayedText(newText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(timer);
                setIsTyping(false);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const skip = useCallback(() => {
        setDisplayedText(text);
        setIsTyping(false);
    }, [text]);

    return {
        text,
        displayedText,
        isTyping,
        startReplay,
        skip,
    };
}

/**
 * IntentReplayMessage - Full message bubble with intent replay
 */
interface IntentReplayMessageProps {
    text: string;
    sender: 'user' | 'agent';
    agentName?: string;
    speed?: number;
    onComplete?: () => void;
}

export function IntentReplayMessage({
    text,
    sender,
    agentName = 'Sovereign',
    speed = 80,
    onComplete
}: IntentReplayMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${sender === 'user' ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                    background: sender === 'agent'
                        ? 'var(--color-sos-soul)'
                        : 'var(--glass-surface)',
                    color: sender === 'agent'
                        ? 'white'
                        : 'var(--text-sovereign-primary)',
                }}
            >
                {sender === 'agent' ? agentName[0] : 'U'}
            </div>

            {/* Message Bubble */}
            <div
                className="max-w-[70%] p-3 rounded-2xl"
                style={{
                    background: sender === 'agent'
                        ? 'var(--glass-surface-elevated)'
                        : 'var(--color-sos-soul)/20',
                    border: sender === 'agent'
                        ? '1px solid var(--color-sos-soul)/30'
                        : '1px solid var(--glass-border)',
                }}
            >
                {sender === 'agent' ? (
                    <IntentReplay
                        text={text}
                        speed={speed}
                        onComplete={onComplete}
                        className="text-sm text-[var(--text-sovereign-primary)]"
                    />
                ) : (
                    <p className="text-sm text-[var(--text-sovereign-primary)]">{text}</p>
                )}
            </div>
        </motion.div>
    );
}
