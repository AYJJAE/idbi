'use client';

// =============================================================================
// NEXUS Sidebar — Premium floating glass navigation
// =============================================================================

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronsLeft,
  ChevronsRight,
  Bot,
  Search,
  Globe,
  Banknote,
  Braces,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { tokens } from '@/design/tokens';
import { NAVIGATION, APP_NAME } from '@/lib/constants';
import { useDashboardStore } from '@/store/dashboard-store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

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
};

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col',
        tokens.glass.classes.sidebar,
        'border-r border-border/30 rounded-none shadow-none',
        'shadow-[4px_0_32px_-8px_rgba(0,0,0,0.15)] dark:shadow-[4px_0_32px_-8px_rgba(0,0,0,0.5)]',
      )}
    >
      {/* Logo */}
      <div className="flex h-[60px] items-center gap-3 px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D4A8] to-[#00836C] shadow-lg shadow-[#00836C]/20">
          <span className="text-sm font-bold text-white">N</span>
        </div>
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden text-base font-bold tracking-tight text-sidebar-foreground"
            >
              {APP_NAME}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-sidebar-border/60 to-transparent" />

      {/* Navigation Groups */}
      <nav className="nexus-scrollbar flex-1 overflow-y-auto px-3 py-3">
        {NAVIGATION.map((group, idx) => (
          <div key={group.label || `group-${idx}`} className="mb-4">
            {group.isDivider && (
              <div className="mx-3 mb-4 mt-1 h-px bg-gradient-to-r from-transparent via-sidebar-border/50 to-transparent" />
            )}
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && group.label && (
                <motion.p
                  key={`group-${group.label}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/30"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                const navButton = (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-primary'
                        : 'text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground/80'
                    )}
                  >
                    {/* Active Indicator — glowing pill */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary shadow-[0_0_8px_rgba(0,212,168,0.5)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <Icon className={cn(
                      'h-[18px] w-[18px] shrink-0 transition-colors duration-200',
                      isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/40 group-hover:text-sidebar-foreground/60'
                    )} />

                    <AnimatePresence mode="wait">
                      {!sidebarCollapsed && (
                        <motion.span
                          key={`nav-${item.id}`}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Badge */}
                    {!sidebarCollapsed && item.badge && (
                      <Badge
                        variant={typeof item.badge === 'number' ? 'default' : 'secondary'}
                        className="ml-auto h-4 text-[9px] px-1.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );

                // In collapsed mode, wrap with tooltip
                if (sidebarCollapsed) {
                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger
                        render={
                          <Link
                            href={item.href}
                            className={cn(
                              'group relative flex items-center justify-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200',
                              isActive
                                ? 'bg-sidebar-accent text-sidebar-primary'
                                : 'text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground/80'
                            )}
                          />
                        }
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active-collapsed"
                            className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary shadow-[0_0_8px_rgba(0,212,168,0.5)]"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                        <Icon className={cn(
                          'h-[18px] w-[18px] shrink-0 transition-colors duration-200',
                          isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/40'
                        )} />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium text-xs">
                        {item.label}
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2 h-4 text-[9px]">
                            {item.badge}
                          </Badge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return navButton;
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-sidebar-border/60 to-transparent" />

      {/* Collapse Toggle */}
      <div className="p-3">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/30 transition-all duration-200 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground/60"
        >
          {sidebarCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
