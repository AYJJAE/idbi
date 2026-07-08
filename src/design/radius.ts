// ============================================================================
// NEXUS Design System — Radius
// Consistent radius scale (24px cards, 16px inputs/buttons)
// ============================================================================

export const radius = {
  scale: {
    sm: '8px',
    md: '12px',
    lg: '16px', // Inputs, Buttons
    xl: '20px',
    '2xl': '24px', // Large Cards, Dialogs
    '3xl': '32px',
    full: '9999px',
  },
  classes: {
    card: 'rounded-2xl', // Maps to 24px in customized tailwind/css
    button: 'rounded-xl', // Maps to 16px
    input: 'rounded-xl', // Maps to 16px
    dialog: 'rounded-2xl', // Maps to 24px
    badge: 'rounded-full',
  }
};
