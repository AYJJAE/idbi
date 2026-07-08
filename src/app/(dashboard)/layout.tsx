'use client';

// =============================================================================
// NEXUS Dashboard Layout — Sidebar + Header + Main Content
// =============================================================================

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CommandPalette } from '@/components/command-palette';
import { PageTransition } from '@/components/page-transition';
import { useDashboardStore } from '@/store/dashboard-store';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useDashboardStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-primary-foreground">N</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div
        className={cn(
          'flex flex-1 flex-col transition-[margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        )}
      >
        <Header />

        <main className="flex-1 overflow-y-auto">
          <PageTransition>
            <div className="mx-auto w-full max-w-[1600px] px-6 py-6">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
