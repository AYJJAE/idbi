// =============================================================================
// NEXUS — Business Profile & Onboarding Store (Zustand)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Business } from '@/types/financial';
import { mockBusinesses } from '@/data/mock-data';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface BusinessState {
  businesses: Business[];
  activeBusinessId: string;
  onboardingSteps: OnboardingStep[];
  currentBusiness: Business;
  setActiveBusinessId: (id: string) => void;
  updateOnboardingStep: (stepId: string, status: OnboardingStep['status']) => void;
  resetOnboarding: () => void;
}

const INITIAL_STEPS: OnboardingStep[] = [
  { id: 'gstin', title: 'GSTIN Verification', description: 'Validate tax credentials and fetch historical records', status: 'completed' },
  { id: 'bank_statements', title: 'Bank Accounts', description: 'Connect bank accounts via Account Aggregator', status: 'in_progress' },
  { id: 'itr_filings', title: 'ITR Returns', description: 'Validate corporate income tax declarations', status: 'pending' },
  { id: 'epfo_auth', title: 'EPFO Consent', description: 'Link employee health and savings account structures', status: 'pending' },
];

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      businesses: mockBusinesses,
      activeBusinessId: mockBusinesses[0].id,
      currentBusiness: mockBusinesses[0],
      onboardingSteps: INITIAL_STEPS,
      setActiveBusinessId: (id) => {
        const found = get().businesses.find((b) => b.id === id);
        if (found) {
          set({ activeBusinessId: id, currentBusiness: found });
        }
      },
      updateOnboardingStep: (stepId, status) =>
        set((state) => ({
          onboardingSteps: state.onboardingSteps.map((step) =>
            step.id === stepId ? { ...step, status } : step
          ),
        })),
      resetOnboarding: () => set({ onboardingSteps: INITIAL_STEPS }),
    }),
    {
      name: 'nexus-business-state',
      partialize: (state) => ({
        activeBusinessId: state.activeBusinessId,
      }),
    }
  )
);
