'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar as AceternitySidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Building,
  ClipboardList,
  Fingerprint,
  HeartPulse,
  TrendingUp,
  Droplets,
  FileText,
  CreditCard,
  Users,
  Landmark,
  FileSpreadsheet,
  Smartphone,
  Network,
  ShieldAlert,
  Library,
  FolderOpen,
  BadgeCheck,
  Gauge,
  Binary,
  Sparkles,
  CalendarRange,
  Activity,
  Award,
  BarChart3,
  UserCheck,
  ShieldCheck,
  History,
  Cable,
  Settings,
  Bot,
  Search,
  Globe,
  Banknote,
  Braces,
  Lock,
  Brain,
  Gem,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';
import { NAVIGATION, APP_NAME } from '@/lib/constants';
import { useDashboardStore } from '@/store/dashboard-store';
import { motion } from 'framer-motion';
import { FloatingDock } from '@/components/ui/floating-dock';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building,
  ClipboardList,
  Fingerprint,
  HeartPulse,
  TrendingUp,
  Droplets,
  FileText,
  CreditCard,
  Users,
  Landmark,
  FileSpreadsheet,
  Smartphone,
  Network,
  ShieldAlert,
  Library,
  FolderOpen,
  BadgeCheck,
  Gauge,
  Binary,
  Sparkles,
  CalendarRange,
  Activity,
  Award,
  BarChart3,
  UserCheck,
  ShieldCheck,
  History,
  Cable,
  Settings,
  Bot,
  Search,
  Globe,
  Banknote,
  Braces,
  Lock,
  Brain,
  Gem,
  TrendingDown,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useDashboardStore();
  const open = !sidebarCollapsed;
  const setOpen = (value: React.SetStateAction<boolean>) => {
    if (typeof value === 'function') {
      setSidebarCollapsed(!value(open));
    } else {
      setSidebarCollapsed(!value);
    }
  };

  // Flatten the navigation items
  const links = NAVIGATION.flatMap(group => group.items || []).map(item => {
    const Icon = ICON_MAP[item.icon] || LayoutDashboard;
    return {
      label: item.label,
      href: item.href,
      icon: <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
    };
  });

  return (
    <AceternitySidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto nexus-scrollbar">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: 'NEXUS User',
              href: '#',
              icon: (
                <div className="h-7 w-7 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  NX
                </div>
              ),
            }}
          />
        </div>
      </SidebarBody>
    </AceternitySidebar>
  );
}

const Logo = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-foreground">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_15px_rgba(255,100,100,0.15)]">
        <img src="/nexus-logo.png" alt="N" className="w-full h-full object-cover" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold tracking-tight whitespace-pre text-foreground"
      >
        {APP_NAME}
      </motion.span>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-foreground">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_15px_rgba(255,100,100,0.15)]">
        <img src="/nexus-logo.png" alt="N" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export function MobileDock() {
  const links = NAVIGATION.flatMap(group => group.items || []).slice(0, 11).map(item => {
    const Icon = ICON_MAP[item.icon] || LayoutDashboard;
    return {
      title: item.label,
      href: item.href,
      icon: <Icon className="h-full w-full" />
    };
  });

  return (
    <FloatingDock items={links} />
  );
}
