// ============================================================================
// NEXUS Design System — Motion
// 120Hz optimized Framer Motion presets
// ============================================================================

import type { Transition, Variants } from 'framer-motion';

export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 350,
    damping: 32,
  } as Transition,
  
  smooth: {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.35,
  } as Transition,

  snappy: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1],
    duration: 0.4,
  } as Transition,

  luxury: {
    type: 'spring',
    stiffness: 200,
    damping: 24,
    mass: 0.8,
  } as Transition,
};

export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.smooth },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  } as Variants,

  fadeInUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
  } as Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: transitions.smooth },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
  } as Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  } as Variants,
  
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.005, 
      y: -2, 
      transition: transitions.smooth 
    },
  },
  
  buttonPress: {
    rest: { scale: 1 },
    pressed: { scale: 0.97, transition: { duration: 0.1 } },
  },

  pageTransition: {
    hidden: { opacity: 0, y: 6, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: transitions.spring },
    exit: { opacity: 0, y: -4, filter: 'blur(2px)' },
  } as Variants,
};
