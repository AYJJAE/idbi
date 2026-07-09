// ============================================================================
// NEXUS Design System — Colors
// Centralized Source of Truth for all color values.
// Only brand colors: #008C5A (IDBI Green), #2DBE7F (Light Green), #1F2937 (Neutral)
// ============================================================================

export const brand = {
  primary: '#008C5A', // IDBI Green
  secondary: '#2DBE7F', // Light Green
  neutral: '#1F2937', // Neutral Text
};

export const semantic = {
  success: brand.primary,
  warning: brand.secondary,
  error: '#DC2626', // Standard error red is retained for severe financial alerts, though brand colors dominate UI
  info: brand.primary,
};

export const lightMode = {
  background: '#FFFFFF',
  secondaryBackground: '#F5F7F8',
  surface: '#FFFFFF',
  text: {
    primary: brand.neutral,
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
  border: {
    light: 'rgba(0, 0, 0, 0.04)',
    default: 'rgba(0, 0, 0, 0.08)',
    strong: 'rgba(0, 0, 0, 0.12)',
  },
};

export const darkMode = {
  background: '#0B1114',
  secondaryBackground: '#121821', // Surface color requested in prompt
  surface: '#121821',
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    muted: '#71717A',
  },
  border: {
    light: 'rgba(255, 255, 255, 0.04)',
    default: 'rgba(255, 255, 255, 0.08)',
    strong: 'rgba(255, 255, 255, 0.12)',
  },
};
