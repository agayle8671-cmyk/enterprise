/**
 * Live Bento Grid - Bloomberg-style Data Grid with Container Queries
 * 
 * Modular, resizable cellular layout that organizes disparate data streams.
 * Uses CSS Grid with container queries for adaptive component rendering.
 * Maintains high information density regardless of viewport size.
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiveBentoGridProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

export function LiveBentoGrid({
  children,
  columns = 12,
  gap = 8,
  className,
}: LiveBentoGridProps) {
  return (
    <div
      className={cn("grid w-full", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        gridAutoFlow: "dense", // Bloomberg-style dense packing
      }}
    >
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  glowOnHover?: boolean;
  animated?: boolean;
}

export function BentoItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
  glowOnHover = true,
  animated = true,
}: BentoItemProps) {
  const Component = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }
    : {};

  return (
    <Component
      {...animationProps}
      className={cn(
        // Container query setup
        "@container",
        // Grid positioning
        `col-span-${colSpan} row-span-${rowSpan}`,
        // Base styling - Sovereign Aesthetic
        "relative overflow-hidden",
        "bg-[var(--color-structure)] border border-white/10",
        "rounded-lg",
        // Hover effects
        glowOnHover && "group hover:border-[var(--color-acid)]/30 transition-all duration-300",
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {/* Hover glow effect */}
      {glowOnHover && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-acid)]/0 to-[var(--color-acid)]/0 group-hover:from-[var(--color-acid)]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
      )}
      
      {/* Content with container query responsive design */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </Component>
  );
}

/**
 * BentoCell - Individual data cell with adaptive content
 * Uses container queries to show different levels of detail
 */
interface BentoCellProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  chartData?: ReactNode; // For larger containers
  className?: string;
}

export function BentoCell({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  chartData,
  className,
}: BentoCellProps) {
  const trendColors = {
    up: "text-[var(--color-acid)]",
    down: "text-[var(--color-alarm)]",
    neutral: "text-[var(--color-text-muted)]",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <div className={cn("p-4 h-full flex flex-col", className)}>
      
      {/* Header - Always visible */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-[var(--color-text-muted)]">{icon}</div>}
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
            {title}
          </div>
        </div>
        {trend && (
          <div className={cn("text-xs font-mono", trendColors[trend])}>
            {trendIcons[trend]} {trendValue}
          </div>
        )}
      </div>

      {/* Value - Always visible, large in small containers */}
      <div className="text-3xl font-bold font-mono tracking-tight mb-2 @[200px]:text-4xl @[300px]:text-5xl">
        {value}
      </div>

      {/* Subtitle - Visible in medium+ containers */}
      {subtitle && (
        <div className="hidden @[200px]:block text-xs text-[var(--color-text-muted)] mb-2">
          {subtitle}
        </div>
      )}

      {/* Chart/Details - Visible in large containers */}
      {chartData && (
        <div className="hidden @[400px]:block flex-1 mt-auto">
          {chartData}
        </div>
      )}
    </div>
  );
}

/**
 * BentoSection - Grouped section with header
 */
interface BentoSectionProps {
  title: string;
  children: ReactNode;
  colSpan?: number;
  className?: string;
}

export function BentoSection({
  title,
  children,
  colSpan = 12,
  className,
}: BentoSectionProps) {
  return (
    <div
      className={cn("col-span-full", className)}
      style={{ gridColumn: `span ${colSpan}` }}
    >
      <div className="mb-2 px-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
          {title}
        </h3>
      </div>
      <div
        className="grid w-full gap-2"
        style={{
          gridTemplateColumns: `repeat(${colSpan}, minmax(0, 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
