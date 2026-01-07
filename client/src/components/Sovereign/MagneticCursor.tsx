/**
 * MagneticCursor - Sovereign OS Cursor System
 * 
 * Implements magnetic field cursor that snaps to interactive elements.
 * Uses spring physics for natural, antigravity movement.
 * Changes to International Orange when Agent is active.
 */

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface MagneticCursorProps {
  magneticRange?: number;
  agentActive?: boolean;
}

export function MagneticCursor({ 
  magneticRange = 50,
  agentActive = false 
}: MagneticCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  // Antigravity Physics: High stiffness = snappy, Damping = friction
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Check if hovering over a "magnetic" element
      const target = (e.target as HTMLElement).closest("[data-magnetic]");
      if (target) {
        const rect = target.getBoundingClientRect();
        // Snap to center of target
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
        setIsHovering(true);
        
        // Haptic feedback on hover
        if (navigator.vibrate) {
          navigator.vibrate(1);
        }
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ 
        x: cursorXSpring, 
        y: cursorYSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 1
        }}
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: agentActive ? 'var(--color-sos-soul)' : 'var(--color-sos-blue)',
          boxShadow: agentActive ? 'var(--shadow-agent-glow)' : 'none'
        }}
      />
    </motion.div>
  );
}
