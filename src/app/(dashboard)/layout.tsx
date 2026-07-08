'use client';

// =============================================================================
// NEXUS Dashboard Layout — Ambient glass shell
// =============================================================================

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CommandPalette } from '@/components/command-palette';
import { PageTransition } from '@/components/page-transition';
import { useDashboardStore } from '@/store/dashboard-store';
import { cn } from '@/lib/utils';
import { tokens } from '@/design/tokens';

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D4A8] to-[#00836C] shadow-lg shadow-[#00836C]/20">
            <span className="text-sm font-bold text-white">N</span>
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
    <div className={cn("flex min-h-screen bg-background relative overflow-hidden", tokens.gradients.classes.meshLight, "dark:" + tokens.gradients.classes.meshDark)}>
      
      {/* Ambient mesh gradient background / lighting */}
      <div className={tokens.gradients.classes.ambientTop} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] z-0" 
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <Sidebar />

      <div
        className={cn(
          'relative z-10 flex flex-1 flex-col transition-[margin]',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        )}
        style={{ transitionDuration: '400ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
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
