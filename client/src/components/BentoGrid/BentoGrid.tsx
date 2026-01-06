/**
 * BentoGrid & BentoItem Components
 * 
 * Sovereign Aesthetic Phase 1: The Bloomberg Layer
 * Dense, data-first grid layout with container queries for adaptive content.
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PHYSICS } from '@/lib/animation-constants';

// ============================================================================
// TYPES
// ============================================================================

export interface BentoGridProps {
    children: ReactNode;
    className?: string;
    columns?: 6 | 8 | 12;
    gap?: 'tight' | 'normal' | 'loose';
}

export interface BentoItemProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4 | 6 | 12;
    rowSpan?: 1 | 2 | 3;
    glowing?: boolean;
    glass?: boolean;
    onClick?: () => void;
}

export interface BentoDataCardProps {
    label: string;
    value: string | number;
    delta?: number;
    unit?: string;
    icon?: ReactNode;
    className?: string;
    trend?: 'up' | 'down' | 'neutral';
}

// ============================================================================
// BENTO GRID
// ============================================================================

export function BentoGrid({
    children,
    className,
    columns = 12,
    gap = 'normal'
}: BentoGridProps) {
    const gapClass = {
        tight: 'gap-1',
        normal: 'gap-2',
        loose: 'gap-4',
    }[gap];

    const columnsClass = {
        6: 'grid-cols-6',
        8: 'grid-cols-8',
        12: 'grid-cols-12',
    }[columns];

    return (
        <div
            className={cn(
                'grid grid-auto-flow-dense',
                columnsClass,
                gapClass,
                className
            )}
            style={{
                gridAutoFlow: 'dense',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
        >
            {children}
        </div>
    );
}

// ============================================================================
// BENTO ITEM (Container Query Enabled)
// ============================================================================

export function BentoItem({
    children,
    className,
    colSpan = 3,
    rowSpan = 1,
    glowing = false,
    glass = true,
    onClick,
}: BentoItemProps) {
    const spanClass = {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        6: 'col-span-6',
        12: 'col-span-12',
    }[colSpan];

    const rowClass = {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
    }[rowSpan];

    return (
        <motion.div
            className={cn(
                // Base styles
                'relative overflow-hidden rounded-xl',
                // Span
                spanClass,
                rowClass,
                // Glass effect
                glass && 'glass-panel',
                // Background
                'bg-[var(--color-structure)]',
                // Border - glows on hover
                'border border-[var(--glass-sovereign-border)]',
                'transition-all duration-200',
                'hover:border-[var(--color-acid)]',
                // Glowing border animation
                glowing && 'sovereign-border',
                // Clickable
                onClick && 'cursor-pointer',
                className
            )}
            style={{
                containerType: 'inline-size',
            }}
            whileHover={{
                y: -2,
                transition: PHYSICS.interaction
            }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// BENTO DATA CARD (Bloomberg-style data display)
// ============================================================================

export function BentoDataCard({
    label,
    value,
    delta,
    unit,
    icon,
    className,
    trend = 'neutral',
}: BentoDataCardProps) {
    const trendColor = {
        up: 'text-[var(--color-acid)]',
        down: 'text-[var(--color-alarm)]',
        neutral: 'text-[var(--text-sovereign-muted)]',
    }[trend];

    const deltaSign = delta && delta > 0 ? '+' : '';

    return (
        <div className={cn('p-4 h-full flex flex-col justify-between', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                    {label}
                </span>
                {icon && (
                    <span className="text-[var(--text-sovereign-muted)]">
                        {icon}
                    </span>
                )}
            </div>

            {/* Main Value - Container Query Responsive */}
            <div className="flex-1 flex items-center">
                <div className="flex items-baseline gap-1">
                    <span
                        className="text-data text-2xl font-bold"
                        style={{
                            fontFamily: 'var(--font-sovereign-mono)',
                            fontVariantNumeric: 'tabular-nums',
                        }}
                    >
                        {value}
                    </span>
                    {unit && (
                        <span className="text-xs text-[var(--text-sovereign-muted)]">
                            {unit}
                        </span>
                    )}
                </div>
            </div>

            {/* Delta/Change */}
            {delta !== undefined && (
                <div className={cn('text-terminal text-xs', trendColor)}>
                    {deltaSign}{delta}%
                </div>
            )}
        </div>
    );
}

// ============================================================================
// BENTO TICKER (Live data stream)
// ============================================================================

export interface BentoTickerProps {
    items: Array<{ label: string; value: string | number; trend?: 'up' | 'down' | 'neutral' }>;
    className?: string;
}

export function BentoTicker({ items, className }: BentoTickerProps) {
    const trendColor = (trend?: string) => {
        switch (trend) {
            case 'up': return 'text-[var(--color-acid)]';
            case 'down': return 'text-[var(--color-alarm)]';
            default: return 'text-[var(--text-sovereign-primary)]';
        }
    };

    return (
        <div className={cn('ticker-strip bg-[var(--color-void)] border-y border-[var(--glass-sovereign-border)] py-2', className)}>
            <div className="ticker-content">
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((item, index) => (
                    <span key={index} className="mx-4 inline-flex items-center gap-2">
                        <span className="text-[var(--text-sovereign-muted)]">{item.label}</span>
                        <span className={trendColor(item.trend)}>{item.value}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default BentoGrid;
