/**
 * TactileButton - Neumorphic Button with Multi-Sensory Feedback
 * 
 * Features:
 * - Neumorphic 2.0 visual style with architectural lighting
 * - Haptic feedback via Web Vibration API
 * - Acoustic feedback (mechanical keyboard sound)
 * - Spring physics animations
 * - Magnetic cursor integration
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  hapticPattern?: number | number[];
  playSound?: boolean;
}

export function TactileButton({
  children,
  className,
  onClick,
  variant = 'default',
  size = 'md',
  hapticPattern = 15,
  playSound = true,
  ...props
}: TactileButtonProps) {
  
  const handleInteraction = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Haptic Confirmation
    if (navigator.vibrate) {
      navigator.vibrate(hapticPattern);
    }
    
    // Acoustic Confirmation (simple click sound using AudioContext)
    if (playSound) {
      playClickSound();
    }
    
    // Call original onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  // Simple click sound generator using Web Audio API
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Simulate mechanical keyboard "thock" - low frequency, short duration
      oscillator.frequency.value = 150;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      // Silently fail if audio context not available
      console.debug('Audio feedback not available');
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    default: 'bg-[var(--color-sos-base)] text-[var(--color-sos-text)]',
    primary: 'bg-[var(--color-sos-soul)] text-white',
    secondary: 'bg-[var(--color-sos-panel)] text-[var(--color-sos-text)]',
    ghost: 'bg-transparent text-[var(--color-sos-text)] border border-[var(--color-sos-shadow)]'
  };

  return (
    <motion.button
      data-magnetic="true"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleInteraction}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative font-sans font-medium rounded-xl",
        "border border-white/40",
        "transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={{
        boxShadow: 'var(--shadow-tactile-sm)',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-tactile-inset)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-tactile-sm)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-tactile-sm)';
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/**
 * TactileIconButton - Circular icon button variant
 */
interface TactileIconButtonProps extends Omit<TactileButtonProps, 'size'> {
  icon: React.ReactNode;
  size?: number;
}

export function TactileIconButton({
  icon,
  size = 40,
  className,
  ...props
}: TactileIconButtonProps) {
  return (
    <TactileButton
      className={cn(
        "rounded-full p-0 flex items-center justify-center",
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...props}
    >
      {icon}
    </TactileButton>
  );
}
