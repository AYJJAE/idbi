// =============================================================================
// NEXUS — Role, Permission & Protected Route Guards
// =============================================================================

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { EmptyState } from '@/components/empty-state';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface GuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// 1. Permission Guard
export function PermissionGuard({
  children,
  permission,
  fallback,
}: GuardProps & { permission: string }) {
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (!hasPermission(permission)) {
    return (
      fallback || (
        <EmptyState
          icon={ShieldAlert}
          title="Access Unauthorized"
          description="Your current CFO/RM user clearances do not permit reading or editing this dataset."
        />
      )
    );
  }

  return <>{children}</>;
}

// 2. Role Guard
export function RoleGuard({
  children,
  role,
  fallback,
}: GuardProps & { role: string }) {
  const hasRole = useAuthStore((state) => state.hasRole);

  if (!hasRole(role)) {
    return (
      fallback || (
        <EmptyState
          icon={ShieldAlert}
          title="Role Clearance Required"
          description={`Viewing this screen requires role privilege level equal or higher to '${role}'.`}
        />
      )
    );
  }

  return <>{children}</>;
}

// 3. Protected Route Wrapper (Client Side Guard)
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
            Securing Connection...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
