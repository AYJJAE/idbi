// ============================================================================
// NEXUS Design System — Glass Morphism
// Only used for Sidebar, Top Nav, Cards, Dialogs, Dropdowns, Command Palette
// ============================================================================

export const glass = {
  classes: {
    // Cards: Soft white glass (Light) / Dark glass panels (Dark)
    card: 'bg-white/60 dark:bg-[#121821]/50 backdrop-blur-xl border border-white/40 dark:border-white/5',
    
    // Sidebar & Nav
    sidebar: 'bg-[#0D1117]/80 dark:bg-[#060A0E]/80 backdrop-blur-2xl border-r border-white/5 dark:border-white/5',
    header: 'bg-white/60 dark:bg-[#121821]/60 backdrop-blur-xl border-b border-white/40 dark:border-white/5',
    
    // Floating panels (Command palette, Dropdowns, Dialogs)
    floating: 'bg-white/90 dark:bg-[#121821]/90 backdrop-blur-2xl border border-white/50 dark:border-white/10',
    
    // Sub-elements (Table headers, sticky areas)
    subtle: 'bg-white/40 dark:bg-[#121821]/40 backdrop-blur-md',
  }
};
