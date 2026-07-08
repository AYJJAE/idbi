'use client';

// =============================================================================
// NEXUS Command Palette — ⌘K quick navigation and actions
// =============================================================================

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  Fingerprint,
  FileStack,
  Sparkles,
  BarChart3,
  Upload,
  FileText,
  Settings,
  Search,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useDashboardStore } from '@/store/dashboard-store';

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useDashboardStore();

  // ⌘K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const navigate = (href: string) => {
    router.push(href);
    setCommandPaletteOpen(false);
  };

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Search pages, actions, reports..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center py-6 text-center">
            <Search className="mb-2 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No results found</p>
          </div>
        </CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate('/')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/intelligence/health-card')}>
            <HeartPulse className="mr-2 h-4 w-4" />
            <span>Financial Health Card</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/business/passport')}>
            <Fingerprint className="mr-2 h-4 w-4" />
            <span>Digital Passport</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/data-sources/documents')}>
            <FileStack className="mr-2 h-4 w-4" />
            <span>Documents</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/credit/recommendations')}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Recommendations</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/insights/reports')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => navigate('/data-sources/documents')}>
            <Upload className="mr-2 h-4 w-4" />
            <span>Upload Documents</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/insights/reports')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Generate Report</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/credit/simulator')}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Debtor Scenario Simulation</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => navigate('/admin/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
