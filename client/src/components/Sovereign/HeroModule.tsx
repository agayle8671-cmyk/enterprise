/**
 * HeroModule - Large-scale "HUGE" thumbnails
 * 
 * Implements the "HUGE and Compact" paradox:
 * - Spans multiple grid tracks
 * - Features large-scale typography
 * - Full-bleed visualizations
 * - Creates visual rhythm in the grid
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { GravityCard } from "./GravityCard";

interface HeroModuleProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animated?: boolean;
}

export function HeroModule({
  title,
  subtitle,
  children,
  className,
  glowColor = "var(--color-acid)",
  animated = true,
}: HeroModuleProps) {
  
  const Component = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, type: "spring", stiffness: 300 },
      }
    : {};

  return (
    <Component
      {...animationProps}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10",
        "bg-[var(--color-structure)]",
        "@container",
        className
      )}
    >
      {/* Hero Header */}
      <div className="relative z-10 p-6 @[400px]:p-8">
        <div className="mb-2">
          <h2 
            className="text-3xl @[400px]:text-5xl @[600px]:text-7xl font-bold font-mono tracking-tighter leading-none"
            style={{ color: glowColor }}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-sm @[400px]:text-base font-mono text-[var(--color-text-muted)]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content Area */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Atmospheric Glow - only visible in large sizes */}
      <div 
        className="hidden @[600px]:block absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${glowColor}20, transparent 70%)`,
        }}
      />
    </Component>
  );
}

/**
 * HeroChart - Hero module with chart visualization
 */
interface HeroChartProps {
  title: string;
  value: string | number;
  data: number[];
  trend: "up" | "down" | "neutral";
  changePercent?: number;
  unit?: string;
}

export function HeroChart({ title, value, data, trend, changePercent = 0, unit = "" }: HeroChartProps) {
  const trendColors = {
    up: "#4AF6C3",
    down: "#FF433D",
    neutral: "#BBFF00",
  };

  const color = trendColors[trend];

  // Generate path
  const generatePath = (data: number[]): string => {
    if (data.length === 0) return "";
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 800;
    const height = 300;
    const step = width / (data.length - 1);
    
    return data
      .map((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / range) * height;
        return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
      })
      .join(' ');
  };

  const pathData = generatePath(data);
  const areaPath = pathData ? `${pathData} L 800,300 L 0,300 Z` : "";

  return (
    <HeroModule title={title} glowColor={color}>
      {/* Large Value Display */}
      <div className="px-6 @[400px]:px-8 pb-4">
        <div className="flex items-baseline gap-4">
          <span 
            className="text-5xl @[400px]:text-7xl @[600px]:text-9xl font-bold font-mono tracking-tighter"
            style={{ color }}
          >
            {value}
          </span>
          {unit && (
            <span className="text-2xl @[400px]:text-3xl font-mono text-[var(--color-text-muted)]">
              {unit}
            </span>
          )}
        </div>
        {changePercent !== 0 && (
          <div 
            className="text-xl @[400px]:text-2xl font-mono font-bold mt-2"
            style={{ color }}
          >
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </div>
        )}
      </div>

      {/* Full-bleed chart */}
      <div className="relative h-48 @[600px]:h-64">
        <svg
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`heroGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {areaPath && (
            <path
              d={areaPath}
              fill={`url(#heroGradient-${title})`}
            />
          )}

          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            />
          )}
        </svg>
      </div>
    </HeroModule>
  );
}

/**
 * HeroStat - Hero module with large stat display
 */
interface HeroStatProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  glowColor?: string;
}

export function HeroStat({ label, value, subtitle, icon, glowColor = "var(--color-acid)" }: HeroStatProps) {
  return (
    <GravityCard magneticRange={200} magneticStrength={20}>
      <HeroModule title={label} subtitle={subtitle} glowColor={glowColor}>
        <div className="px-6 @[400px]:px-8 pb-8 flex items-center gap-6">
          {icon && (
            <div 
              className="hidden @[400px]:flex h-24 w-24 rounded-2xl items-center justify-center"
              style={{ background: `${glowColor}20` }}
            >
              <div style={{ color: glowColor }} className="scale-150">
                {icon}
              </div>
            </div>
          )}
          <div 
            className="text-6xl @[400px]:text-8xl @[600px]:text-9xl font-bold font-mono tracking-tighter"
            style={{ color: glowColor }}
          >
            {value}
          </div>
        </div>
      </HeroModule>
    </GravityCard>
  );
}
