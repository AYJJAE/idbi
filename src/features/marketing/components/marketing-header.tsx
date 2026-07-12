'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
export function MarketingHeader() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_20px_rgba(255,100,100,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nexus-logo.png" alt="Nexus" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-foreground leading-tight">NEXUS</span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wider">MSME Financial Intelligence</span>
            </div>
          </Link>
        </div>



        {/* Right side Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
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
