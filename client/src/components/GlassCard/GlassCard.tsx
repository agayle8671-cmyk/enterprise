/**
 * GlassCard Component
 * 
 * Sovereign Aesthetic Phase 2: The Raycast Layer
 * Advanced glassmorphism with aurora gradients, container-aware responsiveness,
 * and physics-based hover interactions.
 */

import React, { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PHYSICS } from '@/lib/animation-constants';

// ============================================================================
// TYPES
// ============================================================================

export interface GlassCardProps {
    children: ReactNode;
    className?: string;
    glowing?: boolean;
    magnetic?: boolean;
    intensity?: 'light' | 'medium' | 'heavy';
    variant?: 'default' | 'aurora' | 'acid';
    onClick?: () => void;
}

export interface ContainerCardProps {
    children?: ReactNode;
    className?: string;
    /** Content shown when container is small (<200px) */
    minimalContent: ReactNode;
    /** Content shown when container is medium (200-400px) */
    standardContent?: ReactNode;
    /** Content shown when container is large (>400px) */
    detailedContent?: ReactNode;
    glowing?: boolean;
}

// ============================================================================
// GLASS CARD (Raycast-style glassmorphism with magnetic hover)
// ============================================================================

export function GlassCard({
    children,
    className,
    glowing = false,
    magnetic = false,
    intensity = 'medium',
    variant = 'default',
    onClick,
}: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position for magnetic effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animation for smooth magnetic effect
    const springConfig = { stiffness: 400, damping: 30 };
    const translateX = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), springConfig);
    const translateY = useSpring(useTransform(mouseY, [-100, 100], [-8, 8]), springConfig);

    // Intensity classes
    const intensityClasses = {
        light: 'backdrop-blur-sm bg-black/30',
        medium: 'backdrop-blur-xl bg-black/50',
        heavy: 'backdrop-blur-2xl bg-black/70',
    }[intensity];

    // Variant border colors
    const variantBorder = {
        default: 'border-white/10 hover:border-white/20',
        aurora: 'border-[var(--color-aurora-cyan)]/30 hover:border-[var(--color-aurora-cyan)]/60',
        acid: 'border-[var(--color-acid)]/30 hover:border-[var(--color-acid)]/60',
    }[variant];

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!magnetic || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                // Base glass effect
                'relative overflow-hidden rounded-xl border',
                intensityClasses,
                variantBorder,
                'transition-colors duration-300',
                // Glowing variant
                glowing && 'sovereign-border',
                // Clickable
                onClick && 'cursor-pointer',
                className
            )}
            style={{
                x: magnetic ? translateX : 0,
                y: magnetic ? translateY : 0,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={PHYSICS.interaction}
            onClick={onClick}
        >
            {/* Inner glow overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: variant === 'acid'
                        ? 'radial-gradient(circle at 50% 0%, rgba(187, 255, 0, 0.15) 0%, transparent 50%)'
                        : variant === 'aurora'
                            ? 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.15) 0%, transparent 50%)'
                            : 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

// ============================================================================
// CONTAINER CARD (Container Query Responsive)
// ============================================================================

export function ContainerCard({
    children,
    className,
    minimalContent,
    standardContent,
    detailedContent,
    glowing = true,
}: ContainerCardProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-xl',
                'bg-[var(--color-structure)]',
                'border border-[var(--glass-sovereign-border)]',
                'transition-all duration-200',
                'hover:border-[var(--color-acid)]',
                glowing && 'sovereign-border',
                className
            )}
            style={{
                containerType: 'inline-size',
            }}
        >
            {/* Minimal View: < 200px */}
            <div className="block @[200px]:hidden p-3">
                {minimalContent}
            </div>

            {/* Standard View: 200px - 400px */}
            <div className="hidden @[200px]:block @[400px]:hidden p-4">
                {standardContent || minimalContent}
            </div>

            {/* Detailed View: > 400px */}
            <div className="hidden @[400px]:block p-6">
                {detailedContent || standardContent || minimalContent}
            </div>

            {/* Static children (always shown) */}
            {children}
        </div>
    );
}

// ============================================================================
// AURORA BACKGROUND (Animated gradient backdrop)
// ============================================================================

export interface AuroraBackgroundProps {
    children?: ReactNode;
    className?: string;
    intensity?: 'subtle' | 'medium' | 'vibrant';
}

export function AuroraBackground({
    children,
    className,
    intensity = 'subtle'
}: AuroraBackgroundProps) {
    const opacityMap = {
        subtle: 0.15,
        medium: 0.3,
        vibrant: 0.5,
    };

    return (
        <div className={cn('relative overflow-hidden', className)}>
            {/* Aurora gradient layers */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: opacityMap[intensity] }}
            >
                {/* Layer 1: Cyan pulse */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 20% 50%, var(--color-aurora-cyan, #00F0FF), transparent)',
                    }}
                    animate={{
                        x: [0, 100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Layer 2: Purple pulse */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 60% 40% at 80% 60%, var(--color-aurora-purple, #7000FF), transparent)',
                    }}
                    animate={{
                        x: [0, -100, 0],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Layer 3: Acid accent (rare) */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 40% 30% at 50% 80%, var(--color-acid, #BBFF00), transparent)',
                        opacity: 0.3,
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

// ============================================================================
// GLOW BUTTON (Terminal-style with acid glow)
// ============================================================================

export interface GlowButtonProps {
    children: ReactNode;
    className?: string;
    variant?: 'acid' | 'aurora' | 'alarm';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
}

export function GlowButton({
    children,
    className,
    variant = 'acid',
    size = 'md',
    onClick,
    disabled = false,
}: GlowButtonProps) {
    const variantStyles = {
        acid: {
            bg: 'bg-[var(--color-acid)]',
            text: 'text-black',
            glow: '0 0 20px rgba(187, 255, 0, 0.5), 0 0 40px rgba(187, 255, 0, 0.2)',
            hoverGlow: '0 0 30px rgba(187, 255, 0, 0.7), 0 0 60px rgba(187, 255, 0, 0.3)',
        },
        aurora: {
            bg: 'bg-gradient-to-r from-[var(--color-aurora-cyan)] to-[var(--color-aurora-purple)]',
            text: 'text-white',
            glow: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(112, 0, 255, 0.2)',
            hoverGlow: '0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(112, 0, 255, 0.3)',
        },
        alarm: {
            bg: 'bg-[var(--color-alarm)]',
            text: 'text-white',
            glow: '0 0 20px rgba(255, 51, 102, 0.5), 0 0 40px rgba(255, 51, 102, 0.2)',
            hoverGlow: '0 0 30px rgba(255, 51, 102, 0.7), 0 0 60px rgba(255, 51, 102, 0.3)',
        },
    }[variant];

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    }[size];

    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            className={cn(
                'relative font-mono uppercase tracking-wide rounded-lg',
                'transition-all duration-200',
                variantStyles.bg,
                variantStyles.text,
                sizeStyles,
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            style={{
                boxShadow: isHovered ? variantStyles.hoverGlow : variantStyles.glow,
            }}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}

// ============================================================================
// SPOTLIGHT CARD (Raycast-style spotlight effect on hover)
// ============================================================================

export interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setSpotlight({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            opacity: 1,
        });
    };

    const handleMouseLeave = () => {
        setSpotlight(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={cardRef}
            className={cn(
                'relative overflow-hidden rounded-xl',
                'bg-[var(--color-structure)]',
                'border border-[var(--glass-sovereign-border)]',
                'transition-colors duration-200',
                'hover:border-white/20',
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Spotlight effect */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.06), transparent 40%)`,
                    opacity: spotlight.opacity,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default GlassCard;
