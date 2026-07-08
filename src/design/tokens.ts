// ============================================================================
// NEXUS Design System — Tokens Aggregator
// Single import source for all design properties.
// ============================================================================

import { brand, semantic, lightMode, darkMode } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { transitions, variants } from './motion';
import { glass } from './glass';
import { gradients } from './gradients';

export const tokens = {
  colors: {
    brand,
    semantic,
    lightMode,
    darkMode,
  },
  typography,
  spacing,
  radius,
  shadows,
  motion: {
    transitions,
    variants,
  },
  glass,
  gradients,
};

export default tokens;
