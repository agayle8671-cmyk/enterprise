/**
 * AnimatedBorder - Glowing Border with Conic Gradient
 * 
 * Implements the Raycast-style "traveling light" border effect.
 * Uses conic gradients with CSS custom properties for smooth rotation.
 * The gradient "comet" orbits the element continuously.
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  gradientColors?: string[];
  animationDuration?: number;
  glowIntensity?: "low" | "medium" | "high";
}

export function AnimatedBorder({
  children,
  className,
  borderWidth = 1,
  borderRadius = 12,
  gradientColors = ["#00F0FF", "#7000FF", "#00F0FF"],
  animationDuration = 4,
  glowIntensity = "medium",
}: AnimatedBorderProps) {
  
  const glowBlur = {
    low: "10px",
    medium: "20px",
    high: "30px",
  };

  const gradient = `conic-gradient(from var(--border-angle), ${gradientColors.join(", ")})`;

  return (
    <div
      className={cn("relative group", className)}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          background: gradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `border-spin ${animationDuration}s linear infinite`,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderRadius: `${borderRadius}px`,
          background: gradient,
          filter: `blur(${glowBlur[glowIntensity]})`,
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * PulsingBorder - Static glowing border with pulse animation
 */
interface PulsingBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  pulseSpeed?: number;
}

export function PulsingBorder({
  children,
  className,
  color = "#BBFF00",
  pulseSpeed = 2,
}: PulsingBorderProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        boxShadow: [
          `0 0 0 1px ${color}40`,
          `0 0 0 2px ${color}60, 0 0 20px ${color}30`,
          `0 0 0 1px ${color}40`,
        ],
      }}
      transition={{
        duration: pulseSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
