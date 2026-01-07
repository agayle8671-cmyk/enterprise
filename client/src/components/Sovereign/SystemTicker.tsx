/**
 * SystemTicker - Bloomberg-style Data Ticker
 * 
 * Constant motion ticker displaying system vitals, updates, and real-time data.
 * Uses monospace typography and terminal aesthetics.
 * Implements typewriter effects for dynamic updates.
 */

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TypewriterText } from "@/components/TypewriterText";

interface TickerItem {
  id: string;
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

interface SystemTickerProps {
  items?: TickerItem[];
  speed?: number;
  className?: string;
  variant?: "default" | "billboard" | "typewriter";
}

export function SystemTicker({
  items = [],
  speed = 30,
  className,
  variant = "default",
}: SystemTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate through items for billboard/typewriter variants
  useEffect(() => {
    if (variant !== "default" && items.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant, items.length]);

  if (variant === "billboard") {
    return <BillboardTicker item={items[currentIndex]} className={className} />;
  }

  if (variant === "typewriter") {
    return <TypewriterTicker items={items} className={className} />;
  }

  // Default scrolling ticker
  return (
    <div className={cn("ticker-strip bg-[var(--color-structure)] border-y border-white/10", className)}>
      <div className="ticker-content text-[var(--color-text-muted)]">
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <TickerItemDisplay key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function TickerItemDisplay({ item }: { item: TickerItem }) {
  const trendSymbols = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  const trendColors = {
    up: "var(--color-acid)",
    down: "var(--color-alarm)",
    neutral: "var(--color-text-muted)",
  };

  return (
    <span className="inline-flex items-center gap-2 px-4">
      <span className="text-[var(--color-text-muted)]">{item.label}:</span>
      <span
        className="font-bold"
        style={{ color: item.color || trendColors[item.trend || "neutral"] }}
      >
        {item.value}
      </span>
      {item.trend && (
        <span style={{ color: trendColors[item.trend] }}>
          {trendSymbols[item.trend]}
        </span>
      )}
      <span className="text-[var(--color-text-muted)]">•</span>
    </span>
  );
}

/**
 * BillboardTicker - Large format display (Bloomberg "Billboard" style)
 */
interface BillboardTickerProps {
  item?: TickerItem;
  className?: string;
}

function BillboardTicker({ item, className }: BillboardTickerProps) {
  if (!item) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        className={cn(
          "relative overflow-hidden bg-[var(--color-structure)] border border-white/10 p-8",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-acid)]/5 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
            {item.label}
          </div>
          <div className="text-6xl font-bold font-mono tracking-tight" style={{ color: item.color || "var(--color-text-primary)" }}>
            {item.value}
          </div>
          {item.trend && (
            <div className="mt-2 text-sm font-mono" style={{ 
              color: item.trend === "up" ? "var(--color-acid)" : "var(--color-alarm)" 
            }}>
              {item.trend === "up" ? "↗" : "↘"} {item.trend === "up" ? "Trending up" : "Trending down"}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * TypewriterTicker - Typewriter effect ticker
 */
interface TypewriterTickerProps {
  items: TickerItem[];
  className?: string;
}

function TypewriterTicker({ items, className }: TypewriterTickerProps) {
  const phrases = items.map(item => 
    `${item.label}: ${item.value}${item.trend ? ` ${item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"}` : ""}`
  );

  return (
    <div className={cn("bg-[var(--color-structure)] border-y border-white/10 px-4 py-2", className)}>
      <div className="font-mono text-sm text-[var(--color-text-primary)]">
        <TypewriterText 
          phrases={phrases}
          typingSpeed={50}
          deletingSpeed={30}
          pauseTime={2000}
        />
      </div>
    </div>
  );
}

/**
 * SystemVitals - Pre-configured system vitals ticker
 */
export function SystemVitals({ className }: { className?: string }) {
  const [vitals, setVitals] = useState<TickerItem[]>([
    { id: "cpu", label: "CPU", value: "32%", trend: "neutral", color: "var(--color-acid)" },
    { id: "mem", label: "MEM", value: "8.2GB", trend: "up", color: "var(--color-acid)" },
    { id: "net", label: "NET", value: "12ms", trend: "neutral", color: "var(--color-aurora-cyan)" },
    { id: "agents", label: "AGENTS", value: "6/6", trend: "neutral", color: "var(--color-acid)" },
    { id: "tasks", label: "TASKS", value: "23", trend: "up", color: "var(--color-aurora-cyan)" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => prev.map(item => {
        if (item.id === "cpu") {
          const value = Math.floor(Math.random() * 60) + 20;
          return { ...item, value: `${value}%`, trend: value > 50 ? "up" : "neutral" as any };
        }
        if (item.id === "tasks") {
          const value = Math.floor(Math.random() * 30) + 15;
          return { ...item, value: `${value}`, trend: value > 25 ? "up" : "neutral" as any };
        }
        return item;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <SystemTicker items={vitals} className={className} />;
}
