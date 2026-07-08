// =============================================================================
// NEXUS — User Store (Zustand)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  avatarUrl?: string;
  preferences: {
    notificationsEnabled: boolean;
    weeklyDigest: boolean;
    fiscalCalendar: 'April-March' | 'January-December';
    currencyDisplay: 'INR_CR_L' | 'INR_RAW';
  };
}

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updatePreferences: (prefs: Partial<UserProfile['preferences']>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: {
        id: 'usr_rajesh_01',
        name: 'Rajesh Sharma',
        email: 'rajesh@pinnacle-eng.in',
        phone: '+91 98765 43210',
        designation: 'CFO',
        preferences: {
          notificationsEnabled: true,
          weeklyDigest: true,
          fiscalCalendar: 'April-March',
          currencyDisplay: 'INR_CR_L',
        },
      },
      setProfile: (profile) => set({ profile }),
      updatePreferences: (prefs) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                preferences: { ...state.profile.preferences, ...prefs },
              }
            : null,
        })),
    }),
    {
      name: 'nexus-user-state',
    }
  )
);
