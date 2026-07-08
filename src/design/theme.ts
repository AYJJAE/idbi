'use client';

// ============================================================================
// NEXUS Design System — Theme Injector
// Injects CSS variables derived from TS tokens into the document root.
// ============================================================================

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { brand, semantic, lightMode, darkMode } from './colors';

export function ThemeInjector() {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const mode = currentTheme === 'dark' ? darkMode : lightMode;
    
    const root = document.documentElement;
    
    // Core Brand
    root.style.setProperty('--color-nexus-primary', brand.primary);
    root.style.setProperty('--color-nexus-orange', brand.secondary);
    root.style.setProperty('--color-nexus-neutral', brand.neutral);
    
    // Semantic
    root.style.setProperty('--color-nexus-success', semantic.success);
    root.style.setProperty('--color-nexus-warning', semantic.warning);
    root.style.setProperty('--color-nexus-error', semantic.error);
    root.style.setProperty('--color-nexus-info', semantic.info);

    // Surface & Background (Tailwind mapped vars)
    // Note: We leave some standard Shadcn vars to not break base components entirely, 
    // but override their values with our strict tokens.
    root.style.setProperty('--background', mode.background);
    root.style.setProperty('--foreground', mode.text.primary);
    root.style.setProperty('--card', mode.surface);
    root.style.setProperty('--card-foreground', mode.text.primary);
    root.style.setProperty('--popover', mode.surface);
    root.style.setProperty('--popover-foreground', mode.text.primary);
    root.style.setProperty('--primary', brand.primary);
    root.style.setProperty('--primary-foreground', '#FFFFFF');
    root.style.setProperty('--secondary', mode.secondaryBackground);
    root.style.setProperty('--secondary-foreground', mode.text.primary);
    root.style.setProperty('--muted', mode.secondaryBackground);
    root.style.setProperty('--muted-foreground', mode.text.secondary);
    root.style.setProperty('--accent', mode.secondaryBackground);
    root.style.setProperty('--accent-foreground', brand.primary);
    root.style.setProperty('--destructive', semantic.error);
    root.style.setProperty('--border', mode.border.default);
    root.style.setProperty('--input', mode.border.default);
    root.style.setProperty('--ring', brand.primary);

    // Chart Colors (Recharts)
    root.style.setProperty('--chart-1', brand.primary);
    root.style.setProperty('--chart-2', brand.secondary);
    root.style.setProperty('--chart-3', brand.neutral);
    root.style.setProperty('--chart-4', '#4B5563'); // Darker neutral for contrast
    root.style.setProperty('--chart-5', '#9CA3AF'); // Lighter neutral for contrast
    
  }, [theme, systemTheme]);

  return null;
}
