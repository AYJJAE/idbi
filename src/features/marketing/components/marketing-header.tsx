'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { tokens } from '@/design/tokens';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard-store';
import { cn } from '@/lib/utils';

export function MarketingHeader() {
  const { simulatorMode, setSimulatorMode } = useDashboardStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_20px_rgba(255,100,100,0.2)]">
              <img src="/nexus-logo.png" alt="Nexus" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-foreground leading-tight">NEXUS</span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wider">MSME Financial Intelligence</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8">
          {['Features', 'Architecture', 'Hackathon Perspective'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center gap-4">
          {/* Device Simulator Toggle */}
          <div className="hidden lg:flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/50 rounded-lg p-1 h-9 shadow-sm">
            <button
              onClick={() => setSimulatorMode('desktop')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                simulatorMode === 'desktop' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title="Desktop View"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSimulatorMode('tablet')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                simulatorMode === 'tablet' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title="Tablet View"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSimulatorMode('phone')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                simulatorMode === 'phone' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title="Phone View"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
          
          <Link href="/business/onboarding" className="hidden sm:block">
            <Button className="bg-[#008C5A] hover:bg-[#2DBE7F] text-white transition-all shadow-[0_0_20px_rgba(0,140,90,0.3)] hover:shadow-[0_0_25px_rgba(45,190,127,0.5)]">
              Enter Demo
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}
