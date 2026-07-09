// =============================================================================
// NEXUS — Dashboard UI State Store (Zustand)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimePeriod } from '@/types/financial';

// ---------------------------------------------------------------------------
// Store Interface
// ---------------------------------------------------------------------------

interface DashboardState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Time Period
  selectedTimePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;

  // Dashboard Options
  showBenchmarks: boolean;
  toggleBenchmarks: () => void;
  compareMode: boolean;
  toggleCompareMode: () => void;

  // Command Palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  // Notifications
  notificationsPanelOpen: boolean;
  setNotificationsPanelOpen: (open: boolean) => void;

  // Active Navigation
  activeNavItem: string;
  setActiveNavItem: (id: string) => void;

  // Device Simulator
  simulatorMode: 'desktop' | 'tablet' | 'phone';
  setSimulatorMode: (mode: 'desktop' | 'tablet' | 'phone') => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      // Time Period
      selectedTimePeriod: '1Y',
      setTimePeriod: (period) =>
        set({ selectedTimePeriod: period }),

      // Dashboard Options
      showBenchmarks: true,
      toggleBenchmarks: () =>
        set((state) => ({ showBenchmarks: !state.showBenchmarks })),
      compareMode: false,
      toggleCompareMode: () =>
        set((state) => ({ compareMode: !state.compareMode })),

      // Command Palette
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) =>
        set({ commandPaletteOpen: open }),
      toggleCommandPalette: () =>
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

      // Notifications
      notificationsPanelOpen: false,
      setNotificationsPanelOpen: (open) =>
        set({ notificationsPanelOpen: open }),

      // Active Navigation
      activeNavItem: 'dashboard',
      setActiveNavItem: (id) =>
        set({ activeNavItem: id }),

      // Device Simulator
      simulatorMode: 'desktop',
      setSimulatorMode: (mode) => set({ simulatorMode: mode }),
    }),
    {
      name: 'nexus-dashboard-state',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        selectedTimePeriod: state.selectedTimePeriod,
        showBenchmarks: state.showBenchmarks,
        simulatorMode: state.simulatorMode,
      }),
    }
  )
);
