// =============================================================================
// NEXUS — Authentication Store (Zustand)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  session: UserSession | null;
  token: string | null;
  login: (session: UserSession, token: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true, // Auto-authenticate for demonstration
      session: {
        id: 'usr_rajesh_01',
        email: 'rajesh@pinnacle-eng.in',
        name: 'Rajesh Sharma',
        role: 'Administrator',
        permissions: ['read:all', 'write:all', 'admin:access', 'upload:documents'],
      },
      token: null,
      login: (session, token) => set({ isAuthenticated: true, session, token }),
      logout: () => set({ isAuthenticated: false, session: null, token: null }),
      hasPermission: (permission) => {
        const { session } = get();
        if (!session) return false;
        return session.permissions.includes(permission) || session.permissions.includes('admin:access');
      },
      hasRole: (role) => {
        const { session } = get();
        if (!session) return false;
        return session.role === role || session.role === 'Administrator';
      },
    }),
    {
      name: 'nexus-auth-state',
    }
  )
);
