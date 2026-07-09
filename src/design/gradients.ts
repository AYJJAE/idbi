// ============================================================================
// NEXUS Design System — Gradients & Backgrounds
// Soft mesh gradients, radial gradients, ambient lighting
// ============================================================================

export const gradients = {
  classes: {
    // Buttons & Accents
    primary: 'bg-gradient-to-r from-[#008C5A] to-[#006C45] text-white',
    primaryHover: 'hover:from-[#2DBE7F] hover:to-[#008C5A]',
    orange: 'bg-gradient-to-r from-[#008C5A] to-[#2DBE7F] text-white',
    orangeHover: 'hover:from-[#2DBE7F] hover:to-[#008C5A]',
    
    // Borders
    cardBorder: 'border border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-white/10 dark:before:from-white/10 dark:before:to-white/5',
    
    // Backgrounds (For Layout)
    meshLight: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[rgba(0,140,90,0.04)] via-transparent to-[rgba(45,190,127,0.03)]',
    meshDark: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[rgba(0,140,90,0.03)] via-transparent to-[rgba(45,190,127,0.02)]',
    
    // Ambient Glow
    ambientTop: 'absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-[rgba(0,140,90,0.06)] to-transparent dark:from-[rgba(45,190,127,0.04)] blur-3xl opacity-50 pointer-events-none -z-10',
  }
};
