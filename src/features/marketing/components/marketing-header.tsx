'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { tokens } from '@/design/tokens';

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#060A0E]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00836C] to-[#00D4A8] text-white shadow-[0_0_20px_rgba(0,131,108,0.3)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-bold text-xl tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white leading-tight">NEXUS</span>
              <span className="text-[10px] font-medium text-white/50 tracking-wider">MSME Financial Intelligence</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Product', 'Solutions', 'Data Sources', 'How It Works', 'Resources', 'About Us'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-[13px] font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1"
            >
              {item}
              {['Solutions', 'Resources'].includes(item) && (
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button 
              className="hidden md:inline-flex bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white border-0 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300"
            >
              Request Demo
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant="outline"
              className="border-white/10 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
