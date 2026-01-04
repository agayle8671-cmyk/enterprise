"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TRANSITIONS, VARIANTS } from "@/lib/animation-constants";

// =============================================================================
// BENTO GRID COMPONENT
// Apple HIG-Compliant Layout with Physics Animations
// =============================================================================

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
    /** Number of columns at different breakpoints */
    columns?: {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    /** Gap between items in pixels */
    gap?: number;
}

export function BentoGrid({
    children,
    className,
    columns = { default: 1, md: 2, lg: 3 },
    gap = 16,
}: BentoGridProps) {
    return (
        <div
            className={cn("bento-grid", className)}
            style={{
                gap: `${gap}px`,
                gridTemplateColumns: `repeat(${columns.lg || 3}, 1fr)`,
            }}
        >
            {children}
        </div>
    );
}

// =============================================================================
// BENTO ITEM COMPONENT
// =============================================================================

interface BentoItemProps {
    children: React.ReactNode;
    className?: string;
    /** Horizontal span (1 or 2) */
    colSpan?: 1 | 2;
    /** Vertical span (1 or 2) */
    rowSpan?: 1 | 2;
    /** Enable hover animation */
    interactive?: boolean;
    /** Click handler */
    onClick?: () => void;
}

export function BentoItem({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    interactive = true,
    onClick,
}: BentoItemProps) {
    const spanClasses = cn(
        colSpan === 2 && "md:col-span-2",
        rowSpan === 2 && "row-span-2"
    );

    if (!interactive) {
        return (
            <div className={cn("bento-item", spanClasses, className)}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={cn("bento-item cursor-pointer", spanClasses, className)}
            whileHover={VARIANTS.cardHover}
            whileTap={VARIANTS.cardTap}
            transition={TRANSITIONS.hover}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

// =============================================================================
// BENTO CARD - Pre-styled Item with Header
// =============================================================================

interface BentoCardProps extends BentoItemProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    /** Badge text (e.g., "New", "Beta") */
    badge?: string;
    /** Footer content */
    footer?: React.ReactNode;
}

export function BentoCard({
    title,
    description,
    icon,
    badge,
    footer,
    children,
    className,
    ...props
}: BentoCardProps) {
    return (
        <BentoItem
            className={cn("flex flex-col", className)}
            {...props}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-foreground">{title}</h3>
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                </div>
                {badge && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground">
                        {badge}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1">{children}</div>

            {/* Footer */}
            {footer && (
                <div className="mt-4 pt-4 border-t border-border/50">{footer}</div>
            )}
        </BentoItem>
    );
}

// =============================================================================
// BENTO STAT - Metric Display Item
// =============================================================================

interface BentoStatProps extends Omit<BentoItemProps, "children"> {
    label: string;
    value: string | number;
    change?: {
        value: number;
        trend: "up" | "down" | "neutral";
    };
    icon?: React.ReactNode;
}

export function BentoStat({
    label,
    value,
    change,
    icon,
    className,
    ...props
}: BentoStatProps) {
    const trendColors = {
        up: "text-success",
        down: "text-destructive",
        neutral: "text-muted-foreground",
    };

    const trendIcons = {
        up: "↑",
        down: "↓",
        neutral: "→",
    };

    return (
        <BentoItem className={cn("flex flex-col justify-between", className)} {...props}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                {icon && (
                    <div className="text-muted-foreground">{icon}</div>
                )}
            </div>

            <div className="mt-2">
                <div className="text-3xl font-bold tracking-tight text-foreground">
                    {value}
                </div>
                {change && (
                    <div className={cn("flex items-center gap-1 mt-1 text-sm", trendColors[change.trend])}>
                        <span>{trendIcons[change.trend]}</span>
                        <span>{Math.abs(change.value)}%</span>
                        <span className="text-muted-foreground">vs last period</span>
                    </div>
                )}
            </div>
        </BentoItem>
    );
}

// =============================================================================
// BENTO FEATURE - Large Feature Showcase
// =============================================================================

interface BentoFeatureProps extends Omit<BentoItemProps, "colSpan"> {
    title: string;
    description: string;
    image?: string;
    gradient?: boolean;
}

export function BentoFeature({
    title,
    description,
    image,
    gradient = false,
    children,
    className,
    ...props
}: BentoFeatureProps) {
    return (
        <BentoItem
            colSpan={2}
            className={cn(
                "relative overflow-hidden",
                gradient && "bg-gradient-primary text-white",
                className
            )}
            {...props}
        >
            {image && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}

            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className={cn(
                    "text-lg",
                    gradient ? "text-white/80" : "text-muted-foreground"
                )}>
                    {description}
                </p>
                {children && <div className="mt-4">{children}</div>}
            </div>
        </BentoItem>
    );
}

export default BentoGrid;
