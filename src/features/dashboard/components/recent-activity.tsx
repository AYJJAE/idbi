'use client';

// =============================================================================
// NEXUS Recent Activity — Timeline feed of events
// =============================================================================

import { motion } from 'framer-motion';
import {
  TrendingUp,
  FileCheck,
  Sparkles,
  AlertTriangle,
  Upload,
  FileText,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, getRelativeTime, getSeverityBg } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';
import type { ActivityEvent } from '@/types/financial';

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  FileCheck,
  Sparkles,
  AlertTriangle,
  Upload,
  FileText,
  BarChart3,
};

// ---------------------------------------------------------------------------
// Activity Item
// ---------------------------------------------------------------------------

function ActivityItem({ event }: { event: ActivityEvent }) {
  const Icon = ICON_MAP[event.icon] || FileText;

  return (
    <motion.div variants={staggerItem} className="flex gap-3 py-3">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
          getSeverityBg(event.severity)
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-semibold leading-tight text-foreground">
            {event.title}
          </p>
          {!event.isRead && (
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground/90">
          {event.description}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          {getRelativeTime(event.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface RecentActivityProps {
  events: ActivityEvent[];
}

export function RecentActivity({ events }: RecentActivityProps) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Recent Activity</h3>
        <button className="text-xs font-medium text-primary hover:underline">
          View all
        </button>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="divide-y divide-border"
        >
          {events.slice(0, 6).map((event) => (
            <ActivityItem key={event.id} event={event} />
          ))}
        </motion.div>
      </ScrollArea>
    </Card>
  );
}
