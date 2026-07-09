'use client';

// =============================================================================
// NEXUS Skeleton Loaders — Premium shimmer loading skeletons
// =============================================================================

import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Dashboard Skeleton
// ---------------------------------------------------------------------------

export function DashboardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6 animate-in fade-in-0 duration-500', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Score + KPI Grid */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-5">
        {/* Score Ring */}
        <Card className="flex items-center justify-center p-4 md:p-6 lg:p-8 lg:col-span-1">
          <Skeleton className="h-40 w-40 rounded-full" />
        </Card>
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-7 w-24" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-7 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-56 w-full rounded-lg" />
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card className="p-4 md:p-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </Card>
        <Card className="p-4 md:p-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-28" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table Skeleton
// ---------------------------------------------------------------------------

export function TableSkeleton({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('space-y-3 animate-in fade-in-0 duration-300', className)}>
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          {Array.from({ length: 5 }).map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card Grid Skeleton
// ---------------------------------------------------------------------------

export function CardGridSkeleton({
  count = 6,
  columns = 3,
  className,
}: {
  count?: number;
  columns?: number;
  className?: string;
}) {
  const gridCols =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 3
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={cn('grid gap-4 animate-in fade-in-0 duration-300', gridCols, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-5">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </Card>
      ))}
    </div>
  );
}
