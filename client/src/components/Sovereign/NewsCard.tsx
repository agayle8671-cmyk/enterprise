/**
 * NewsCard - Bloomberg-style news thumbnail
 * 
 * Features:
 * - Thumbnail image (generated placeholders or actual images)
 * - Headline text
 * - Timestamp
 * - Category badge
 * - Hover effects
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, TrendingUp, Bot, DollarSign, Users } from "lucide-react";

interface NewsCardProps {
  title: string;
  category: string;
  timestamp: string;
  thumbnail?: string;
  excerpt?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
  size?: "compact" | "medium" | "large";
}

export function NewsCard({
  title,
  category,
  timestamp,
  thumbnail,
  excerpt,
  trend,
  className,
  size = "medium",
}: NewsCardProps) {
  
  // Category colors
  const categoryColors: Record<string, string> = {
    "AI": "#BBFF00",
    "Agents": "#4AF6C3",
    "Pipeline": "#FF433D",
    "Automation": "#BBFF00",
    "Analytics": "#4AF6C3",
    "System": "#FF433D",
  };

  const categoryIcons: Record<string, any> = {
    "AI": Bot,
    "Agents": Bot,
    "Pipeline": DollarSign,
    "Automation": TrendingUp,
    "Analytics": BarChart3,
    "System": Users,
  };

  const CategoryIcon = categoryIcons[category] || Bot;
  const categoryColor = categoryColors[category] || "#BBFF00";

  // Size variants
  const sizes = {
    compact: {
      container: "h-20",
      image: "w-24 h-20",
      title: "text-xs line-clamp-2",
      excerpt: "hidden",
    },
    medium: {
      container: "h-32",
      image: "w-40 h-32",
      title: "text-sm line-clamp-3",
      excerpt: "text-xs line-clamp-2",
    },
    large: {
      container: "h-48",
      image: "w-full h-48",
      title: "text-base line-clamp-4",
      excerpt: "text-sm line-clamp-3",
    },
  };

  const sizeStyle = sizes[size];

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-[var(--color-structure)] hover:border-[var(--color-acid)]/30 transition-all cursor-pointer",
        sizeStyle.container,
        className
      )}
      whileHover={{ y: -2 }}
    >
      <div className={cn("flex", size === "large" ? "flex-col" : "flex-row")}>
        {/* Thumbnail */}
        <div className={cn("relative flex-shrink-0 overflow-hidden", sizeStyle.image)}>
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${categoryColor}40, ${categoryColor}20)` }}
            >
              <CategoryIcon className="h-8 w-8" style={{ color: categoryColor }} />
            </div>
          )}
          
          {/* Category badge */}
          <div 
            className="absolute top-2 left-2 px-2 py-1 rounded text-[9px] font-mono font-bold"
            style={{ 
              background: `${categoryColor}20`,
              color: categoryColor,
              border: `1px solid ${categoryColor}40`
            }}
          >
            {category.toUpperCase()}
          </div>

          {/* Trend indicator */}
          {trend && (
            <div className="absolute top-2 right-2">
              {trend === "up" && <span className="text-[var(--color-acid)]">↗</span>}
              {trend === "down" && <span className="text-[var(--color-alarm)]">↘</span>}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <h3 className={cn("font-semibold mb-1 group-hover:text-[var(--color-acid)] transition-colors", sizeStyle.title)}>
              {title}
            </h3>
            {excerpt && (
              <p className={cn("text-[var(--color-text-muted)]", sizeStyle.excerpt)}>
                {excerpt}
              </p>
            )}
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1 text-[9px] font-mono text-[var(--color-text-muted)] mt-auto">
            <Clock className="h-3 w-3" />
            {timestamp}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * NewsGrid - Grid layout for news cards
 */
interface NewsGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export function NewsGrid({ children, columns = 3, className }: NewsGridProps) {
  return (
    <div 
      className={cn("grid gap-4", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {children}
    </div>
  );
}

/**
 * NewsFeed - Vertical feed layout (Bloomberg-style)
 */
interface NewsFeedProps {
  items: Array<{
    title: string;
    category: string;
    timestamp: string;
    thumbnail?: string;
    excerpt?: string;
    trend?: "up" | "down" | "neutral";
  }>;
  className?: string;
}

export function NewsFeed({ items, className }: NewsFeedProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <NewsCard
          key={i}
          {...item}
          size="medium"
        />
      ))}
    </div>
  );
}
