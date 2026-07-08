// =============================================================================
// NEXUS — Financial Health Snapshots Store (Zustand)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HealthScore } from '@/types/financial';
import { getHealthScoreForBusiness } from '@/data/mock-data';

interface FinancialState {
  activeScoreSnapshot: HealthScore | null;
  selectedFinancialQuarter: string;
  setActiveScoreSnapshot: (score: HealthScore) => void;
  setFinancialQuarter: (quarter: string) => void;
}

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set) => ({
      activeScoreSnapshot: getHealthScoreForBusiness('mfg_pinnacle'),
      selectedFinancialQuarter: 'Q2 FY26',
      setActiveScoreSnapshot: (score) => set({ activeScoreSnapshot: score }),
      setFinancialQuarter: (quarter) => set({ selectedFinancialQuarter: quarter }),
    }),
    {
      name: 'nexus-financial-state',
    }
  )
);
