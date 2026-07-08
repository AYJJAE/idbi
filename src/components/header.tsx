'use client';

// =============================================================================
// NEXUS Header — Top bar with breadcrumbs, search, and business switcher
// =============================================================================

import * as React from 'react';
import { Search, Building2, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/store/dashboard-store';
import { useBusinessStore } from '@/store/business-store';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export function Header() {
  const { setCommandPaletteOpen } = useDashboardStore();
  const { businesses, currentBusiness, setActiveBusinessId } = useBusinessStore();
  const pathname = usePathname();

  // Dynamic breadcrumbs based on pathname
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map((path, i) => {
    const href = '/' + paths.slice(0, i + 1).join('/');
    const label = path
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { label, href };
  });

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/40 bg-background/70 px-6 backdrop-blur-xl"
    >
      {/* Left: Breadcrumbs & Search */}
      <div className="flex items-center gap-4">
        {breadcrumbs.length > 0 && (
          <nav className="hidden items-center gap-1 text-[13px] text-muted-foreground lg:flex mr-4">
            <Link href="/" className="hover:text-foreground transition-colors font-medium">
              NEXUS
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                <span className="text-border/80 mx-0.5">›</span>
                <Link
                  href={crumb.href}
                  className={idx === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'hover:text-foreground transition-colors'}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        )}

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search or jump to...</span>
          <kbd className="ml-6 hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Demo Mode Badge */}
        <Badge
          variant="outline"
          className="h-6 border-emerald-500/20 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 font-medium px-2.5 text-[11px] gap-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Demo
        </Badge>

        <ThemeToggle />

        {/* Dynamic MSME Profile Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="truncate max-w-[120px] md:max-w-[180px]">
              {currentBusiness.name}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto">
            <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Select MSME Profile
            </div>
            <DropdownMenuSeparator />
            {businesses.map((biz) => (
              <DropdownMenuItem
                key={biz.id}
                onClick={() => setActiveBusinessId(biz.id)}
                className="flex items-center justify-between text-xs cursor-pointer py-2"
              >
                <span className={biz.id === currentBusiness.id ? 'font-semibold text-primary' : ''}>
                  {biz.name}
                </span>
                <Badge variant="secondary" className="h-4 text-[9px] scale-90">
                  {biz.sector}
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
