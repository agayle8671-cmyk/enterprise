/**
 * Sovereign OS Animation Physics Constants
 * Apple HIG-Compliant Spring Configurations
 * 
 * RULE: No magic numbers in components. All physics defined here.
 */

import type { Transition } from "framer-motion";

// =============================================================================
// SPRING PHYSICS LAWS
// =============================================================================

export const PHYSICS = {
  /**
   * Interaction Response
   * Used for: Buttons, toggles, checkboxes, small interactive elements
   * Feel: Instant but heavy, like tapping glass
   */
  interaction: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1,
  } as const,

  /**
   * Screen Transition
   * Used for: Modal expansion, sheet presentation, page transitions
   * Feel: App Store card expansion—smooth with slight overshoot
   */
  screenTransition: {
    type: "spring",
    stiffness: 140,
    damping: 20,
    mass: 1,
  } as const,

  /**
   * Rubber Banding
   * Used for: Over-scroll, error shake, boundary snap-back
   * Feel: Taught elastic—quick snap with minimal oscillation
   */
  rubberBanding: {
    type: "spring",
    stiffness: 500,
    damping: 15,
    mass: 1,
  } as const,

  /**
   * Gentle Float
   * Used for: Hover states, subtle idle animations
   * Feel: Weightless, like floating in water
   */
  gentleFloat: {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  } as const,

  /**
   * Dock Magnification
   * Used for: FloatingDock icon scaling on hover proximity
   * Feel: Magnetic attraction, smooth tracking
   */
  dockMagnify: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  } as const,
} as const;

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const TRANSITIONS = {
  /** Button/Toggle tap response */
  tap: PHYSICS.interaction as Transition,
  
  /** Modal/Sheet presentation */
  modal: PHYSICS.screenTransition as Transition,
  
  /** Error shake or boundary bounce */
  bounce: PHYSICS.rubberBanding as Transition,
  
  /** Dock icon magnification */
  dock: PHYSICS.dockMagnify as Transition,
  
  /** Subtle hover float */
  hover: PHYSICS.gentleFloat as Transition,
} as const;

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

export const VARIANTS = {
  /** Tap scale for buttons */
  buttonTap: {
    scale: 0.97,
  },
  
  /** Hover lift for cards */
  cardHover: {
    y: -4,
    scale: 1.01,
  },
  
  /** Press state for cards */
  cardTap: {
    scale: 0.98,
  },
  
  /** Error shake pattern */
  errorShake: {
    x: [0, -8, 8, -8, 8, 0],
  },
  
  /** Fade in from below */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  
  /** Scale in from center */
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
} as const;

// =============================================================================
// TIMING CONSTANTS
// =============================================================================

export const TIMING = {
  /** Stagger delay for list items (ms) */
  staggerChildren: 50,
  
  /** Delay before showing loading states (ms) */
  loadingDelay: 150,
  
  /** Duration for crossfade transitions (ms) */
  crossfade: 200,
  
  /** Tooltip show delay (ms) */
  tooltipDelay: 400,
} as const;

// =============================================================================
// DOCK CONFIGURATION
// =============================================================================

export const DOCK_CONFIG = {
  /** Base icon size in pixels */
  baseSize: 48,
  
  /** Maximum scale multiplier on hover */
  maxScale: 1.8,
  
  /** Influence radius in pixels (how far mouse affects icons) */
  influenceRadius: 120,
  
  /** Dock padding */
  padding: 8,
  
  /** Gap between icons */
  gap: 4,
} as const;

// Type exports for strict typing
export type PhysicsConfig = typeof PHYSICS[keyof typeof PHYSICS];
export type TransitionPreset = typeof TRANSITIONS[keyof typeof TRANSITIONS];
