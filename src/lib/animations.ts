// =============================================================================
// NEXUS — Framer Motion Animation Presets
// =============================================================================

import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};

export const snappyTransition: Transition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1],
  duration: 0.5,
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3 },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Scale Variants
// ---------------------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Chart Animations
// ---------------------------------------------------------------------------

export const chartReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const barGrow: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Page Transitions
// ---------------------------------------------------------------------------

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
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
  collapsed: { opacity: 0, width: 0, transition: { duration: 0.2 } },
  expanded: { opacity: 1, width: 'auto', transition: { duration: 0.3, delay: 0.1 } },
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
  rest: { scale: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  hover: {
    scale: 1.01,
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    transition: { duration: 0.2 },
  },
};

export const buttonPress = {
  rest: { scale: 1 },
  pressed: { scale: 0.98, transition: { duration: 0.1 } },
};
