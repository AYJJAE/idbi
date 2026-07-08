// =============================================================================
// NEXUS — Framer Motion Animation Presets (Premium 120Hz quality)
// =============================================================================

import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Transitions — Tuned for 120Hz buttery smoothness
// ---------------------------------------------------------------------------

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 32,
};

export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.35,
};

export const snappyTransition: Transition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1],
  duration: 0.4,
};

export const luxuryTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 24,
  mass: 0.8,
};

// ---------------------------------------------------------------------------
// Fade Variants
// ---------------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25 },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Scale Variants
// ---------------------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

// ---------------------------------------------------------------------------
// Stagger Containers
// ---------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Chart Animations
// ---------------------------------------------------------------------------

export const chartReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const barGrow: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Page Transitions
// ---------------------------------------------------------------------------

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 6, filter: 'blur(4px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(2px)',
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Sidebar Animations
// ---------------------------------------------------------------------------

export const sidebarExpand: Variants = {
  collapsed: { width: 72, transition: snappyTransition },
  expanded: { width: 260, transition: snappyTransition },
};

export const sidebarLabelFade: Variants = {
  collapsed: { opacity: 0, width: 0, transition: { duration: 0.15 } },
  expanded: { opacity: 1, width: 'auto', transition: { duration: 0.25, delay: 0.08 } },
};

// ---------------------------------------------------------------------------
// Score Ring Animation
// ---------------------------------------------------------------------------

export const scoreRingFill = (percentage: number): Variants => ({
  hidden: {
    strokeDashoffset: 283, // 2 * PI * 45 (radius)
  },
  visible: {
    strokeDashoffset: 283 - (283 * percentage) / 100,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3,
    },
  },
});

// ---------------------------------------------------------------------------
// Number Count Up
// ---------------------------------------------------------------------------

export const numberCountUpConfig = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  delay: 0.3,
};

// ---------------------------------------------------------------------------
// Hover / Interactive
// ---------------------------------------------------------------------------

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 2px 16px -4px rgba(0,0,0,0.05)',
  },
  hover: {
    scale: 1.005,
    y: -2,
    boxShadow: '0 12px 40px -8px rgba(0,131,108,0.1)',
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const buttonPress = {
  rest: { scale: 1 },
  pressed: { scale: 0.97, transition: { duration: 0.1 } },
};

// ---------------------------------------------------------------------------
// Glass Card Hover
// ---------------------------------------------------------------------------

export const glassCardHover = {
  rest: {
    y: 0,
    boxShadow: '0 2px 16px -4px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
    borderColor: 'rgba(0,0,0,0.06)',
  },
  hover: {
    y: -2,
    boxShadow: '0 12px 40px -8px rgba(0,131,108,0.08), 0 4px 12px rgba(0,0,0,0.04)',
    borderColor: 'rgba(0,131,108,0.12)',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Ambient Float
// ---------------------------------------------------------------------------

export const ambientFloat: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
