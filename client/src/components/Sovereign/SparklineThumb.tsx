/**
 * SparklineThumb - Live Thumbnail with Electric Gradient
 * 
 * Implements the "Electric" aesthetic with:
 * - SVG sparkline paths with gradient fills
 * - Neon stroke colors based on trend
 * - Glowing effect against dark background
 * - Responsive sizing via container queries
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklineThumbProps {
  symbol: string;
  value: string | number;
  data: number[];
  trend: "up" | "down" | "neutral";
  className?: string;
  size?: "micro" | "compact" | "wide" | "hero";
  showChange?: boolean;
  changePercent?: number;
}

export function SparklineThumb({
  symbol,
  value,
  data,
  trend,
  className,
  size = "compact",
  showChange = true,
  changePercent = 0,
}: SparklineThumbProps) {
  
  // Electric colors based on trend
  const trendColors = {
    up: "#4AF6C3",    // Neon Cyan
    down: "#FF433D",  // Signal Red
    neutral: "#BBFF00", // Acid Green
  };

  const strokeColor = trendColors[trend];

  // Generate SVG path from data
  const generatePath = (data: number[]): string => {
    if (data.length === 0) return "";
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const width = 300;
    const height = 100;
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
  
  // Area path (for gradient fill)
  const areaPath = pathData ? `${pathData} L 300,100 L 0,100 Z` : "";

  // Size-based styles
  const sizeStyles = {
    micro: "h-16 w-full",
    compact: "h-32 w-full", 
    wide: "h-32 w-full",
    hero: "h-64 w-full",
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-[var(--color-structure)] rounded-lg border border-white/10",
        sizeStyles[size],
        "@container",
        className
      )}
    >
      {/* Header - Symbol and Value */}
      <div className="absolute top-2 left-3 right-3 z-10 flex items-start justify-between">
        <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase">
          {symbol}
        </span>
        {showChange && (
          <span 
            className="text-xs font-mono font-bold"
            style={{ color: strokeColor }}
          >
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="absolute top-6 left-3 z-10">
        <div 
          className="text-2xl @[200px]:text-3xl @[300px]:text-4xl font-bold font-mono tracking-tight"
          style={{ color: strokeColor }}
        >
          {value}
        </div>
      </div>

      {/* SVG Sparkline with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3">
        <svg
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ display: 'block' }}
        >
          <defs>
            {/* Electric Gradient - fades from full opacity to transparent */}
            <linearGradient id={`electricGradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill with gradient */}
          {areaPath && (
            <path
              d={areaPath}
              fill={`url(#electricGradient-${symbol})`}
              style={{ transition: 'all 0.3s ease' }}
            />
          )}

          {/* Line stroke */}
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                filter: `drop-shadow(0 0 4px ${strokeColor})`,
                transition: 'all 0.3s ease'
              }}
            />
          )}
        </svg>
      </div>

      {/* Scanline Effect - "Electric Concrete" aesthetic */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  );
}

/**
 * CryptoThumb - Pre-configured crypto price thumbnail
 */
interface CryptoThumbProps {
  symbol: string;
  price: number;
  priceHistory: number[];
  change24h: number;
  size?: "micro" | "compact" | "wide" | "hero";
}

export function CryptoThumb({ symbol, price, priceHistory, change24h, size = "compact" }: CryptoThumbProps) {
  return (
    <SparklineThumb
      symbol={symbol}
      value={`$${price.toLocaleString()}`}
      data={priceHistory}
      trend={change24h >= 0 ? "up" : "down"}
      changePercent={change24h}
      size={size}
    />
  );
}

/**
 * MetricThumb - Generic metric thumbnail
 */
interface MetricThumbProps {
  label: string;
  value: string | number;
  data: number[];
  trend?: "up" | "down" | "neutral";
  size?: "micro" | "compact" | "wide" | "hero";
}

export function MetricThumb({ label, value, data, trend = "neutral", size = "compact" }: MetricThumbProps) {
  return (
    <SparklineThumb
      symbol={label}
      value={value}
      data={data}
      trend={trend}
      size={size}
      showChange={false}
    />
  );
}
