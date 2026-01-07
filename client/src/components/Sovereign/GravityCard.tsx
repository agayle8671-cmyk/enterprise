/**
 * GravityCard - Antigravity Physics Component
 * 
 * Implements magnetic cursor attraction based on Google Antigravity concept.
 * Elements translate towards the cursor when within proximity range.
 * Uses Framer Motion spring physics for natural, mass-like behavior.
 */

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GravityCardProps {
  children: React.ReactNode;
  className?: string;
  magneticRange?: number;
  magneticStrength?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
  };
  glowOnHover?: boolean;
}

export function GravityCard({
  children,
  className,
  magneticRange = 150,
  magneticStrength = 10,
  springConfig = { stiffness: 400, damping: 30 },
  glowOnHover = true,
}: GravityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for cursor position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth, natural movement
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform motion values to actual pixel translations
  const translateX = useTransform(springX, (value) => `${value}px`);
  const translateY = useTransform(springY, (value) => `${value}px`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate cursor distance from card center
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const distanceX = cursorX - centerX;
    const distanceY = cursorY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Apply magnetic pull if within range
    if (distance < magneticRange) {
      // Stronger pull when closer (inverse square law simulation)
      const pullFactor = 1 - distance / magneticRange;
      const pullStrength = pullFactor * magneticStrength;
      
      x.set(distanceX / pullStrength);
      y.set(distanceY / pullStrength);
    } else {
      // Return to center when outside magnetic range
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth return to center position
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative transition-shadow duration-300",
        glowOnHover && isHovered && "glow-aurora",
        className
      )}
      style={{
        x: translateX,
        y: translateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      
      {/* Optional glowing border on hover */}
      {glowOnHover && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: "var(--gradient-aurora)",
            opacity: 0.2,
            filter: "blur(20px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
}

/**
 * GravityGroup - Container for multiple GravityCards
 * Allows cards to interact with each other in a shared physics space
 */
interface GravityGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function GravityGroup({ children, className }: GravityGroupProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
}
