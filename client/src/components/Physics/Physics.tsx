/**
 * Physics Components
 * 
 * Sovereign Aesthetic Phase 3: The Antigravity Layer
 * Physics-based motion effects: TypewriterText, GravityCard, and spring animations.
 */

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
    animate,
    MotionValue
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { PHYSICS } from '@/lib/animation-constants';

// ============================================================================
// TYPEWRITER TEXT
// ============================================================================

export interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number; // characters per second
    delay?: number; // delay before starting (ms)
    cursor?: boolean;
    cursorChar?: string;
    onComplete?: () => void;
    loop?: boolean;
    pauseDuration?: number; // pause before loop restart (ms)
}

export function TypewriterText({
    text,
    className,
    speed = 40,
    delay = 0,
    cursor = true,
    cursorChar = '_',
    onComplete,
    loop = false,
    pauseDuration = 2000,
}: TypewriterTextProps) {
    // Motion value for character count
    const count = useMotionValue(0);

    // Transform count to displayed text
    const displayedText = useTransform(count, (latest) =>
        text.slice(0, Math.round(latest))
    );

    // State for the displayed string
    const [currentText, setCurrentText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Subscribe to displayedText changes
        const unsubscribe = displayedText.on('change', (latest) => {
            setCurrentText(latest);
        });

        return () => unsubscribe();
    }, [displayedText]);

    useEffect(() => {
        const duration = text.length / speed;

        const startAnimation = () => {
            count.set(0);
            setIsComplete(false);

            const controls = animate(count, text.length, {
                duration,
                ease: 'linear',
                delay: delay / 1000,
                onComplete: () => {
                    setIsComplete(true);
                    onComplete?.();

                    if (loop) {
                        setTimeout(startAnimation, pauseDuration);
                    }
                },
            });

            return controls;
        };

        const controls = startAnimation();

        return () => controls.stop();
    }, [text, speed, delay, loop, pauseDuration, count, onComplete]);

    return (
        <span className={cn('inline-flex', className)}>
            <span
                className="whitespace-pre-wrap"
                style={{ fontFamily: 'var(--font-sovereign-mono)' }}
            >
                {currentText}
            </span>
            {cursor && (
                <motion.span
                    className="inline-block ml-0.5"
                    style={{
                        backgroundColor: 'var(--color-acid)',
                        width: '0.6em',
                        height: '1.1em',
                    }}
                    animate={{ opacity: isComplete ? [1, 0, 1] : 1 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {cursorChar === '_' ? '' : cursorChar}
                </motion.span>
            )}
        </span>
    );
}

// ============================================================================
// GRAVITY CARD (Magnetic Proximity Effect)
// ============================================================================

export interface GravityCardProps {
    children: ReactNode;
    className?: string;
    strength?: number; // How strong the pull effect is (default 10)
    range?: number; // Range in pixels where the effect is active (default 150)
    springConfig?: { stiffness: number; damping: number };
}

export function GravityCard({
    children,
    className,
    strength = 10,
    range = 150,
    springConfig = { stiffness: 400, damping: 30 },
}: GravityCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring-animated values
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Rotation based on position (subtle tilt)
    const rotateX = useTransform(springY, [-20, 20], [5, -5]);
    const rotateY = useTransform(springX, [-20, 20], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < range) {
            // Apply magnetic pull based on distance
            const pullStrength = 1 - (distance / range);
            x.set((distanceX / strength) * pullStrength);
            y.set((distanceY / strength) * pullStrength);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                'relative',
                className
            )}
            style={{
                x: springX,
                y: springY,
                rotateX,
                rotateY,
                transformPerspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// FLOATING ELEMENT (Continuous float animation)
// ============================================================================

export interface FloatingElementProps {
    children: ReactNode;
    className?: string;
    amplitude?: number; // How far it floats (in pixels)
    duration?: number; // Duration of one cycle (in seconds)
    delay?: number; // Animation delay (in seconds)
}

export function FloatingElement({
    children,
    className,
    amplitude = 10,
    duration = 4,
    delay = 0,
}: FloatingElementProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-amplitude, amplitude, -amplitude],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// STREAMING NUMBER (Animated number counter)
// ============================================================================

export interface StreamingNumberProps {
    value: number;
    className?: string;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    format?: (value: number) => string;
}

export function StreamingNumber({
    value,
    className,
    duration = 1,
    decimals = 0,
    prefix = '',
    suffix = '',
    format,
}: StreamingNumberProps) {
    const count = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        const controls = animate(count, value, {
            duration,
            ease: 'easeOut',
            onUpdate: (latest) => {
                if (format) {
                    setDisplayValue(format(latest));
                } else {
                    setDisplayValue(latest.toFixed(decimals));
                }
            },
        });

        return () => controls.stop();
    }, [value, duration, decimals, format, count]);

    return (
        <span
            className={cn(className)}
            style={{ fontFamily: 'var(--font-sovereign-mono)', fontVariantNumeric: 'tabular-nums' }}
        >
            {prefix}{displayValue}{suffix}
        </span>
    );
}

// ============================================================================
// PARTICLE FIELD (Floating particles with physics)
// ============================================================================

export interface ParticleFieldProps {
    count?: number;
    className?: string;
    color?: string;
}

export function ParticleField({
    count = 30,
    className,
    color = 'var(--color-acid)',
}: ParticleFieldProps) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: color,
                        opacity: 0.3,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// ============================================================================
// PULSE RING (Expanding pulse animation)
// ============================================================================

export interface PulseRingProps {
    className?: string;
    color?: string;
    size?: number;
    duration?: number;
}

export function PulseRing({
    className,
    color = 'var(--color-acid)',
    size = 100,
    duration = 2,
}: PulseRingProps) {
    return (
        <div className={cn('relative', className)} style={{ width: size, height: size }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border"
                    style={{
                        borderColor: color,
                    }}
                    animate={{
                        scale: [1, 2],
                        opacity: [0.5, 0],
                    }}
                    transition={{
                        duration,
                        delay: i * (duration / 3),
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            ))}
            {/* Center dot */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}

// ============================================================================
// SPRING COUNTER (Bouncy number changes)
// ============================================================================

export interface SpringCounterProps {
    value: number;
    className?: string;
    prefix?: string;
    suffix?: string;
}

export function SpringCounter({
    value,
    className,
    prefix = '',
    suffix = '',
}: SpringCounterProps) {
    const springValue = useSpring(value, { stiffness: 300, damping: 30 });
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplay(Math.round(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    return (
        <motion.span
            className={cn(className)}
            style={{ fontFamily: 'var(--font-sovereign-mono)', fontVariantNumeric: 'tabular-nums' }}
            key={value}
            initial={{ scale: 1.2, color: 'var(--color-acid)' }}
            animate={{ scale: 1, color: 'var(--text-sovereign-primary)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            {prefix}{display.toLocaleString()}{suffix}
        </motion.span>
    );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TypewriterText;
