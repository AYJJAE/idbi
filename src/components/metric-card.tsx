'use client';

// =============================================================================
// NEXUS Metric Card — KPI display with sparkline and trend
// =============================================================================

import { motion } from 'framer-motion';
import {
  IndianRupee,
  Scale,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { staggerItem } from '@/lib/animations';

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  IndianRupee,
  Scale,
  Shield,
  TrendingUp,
};

// ---------------------------------------------------------------------------
// Mini Sparkline
// ---------------------------------------------------------------------------

function Sparkline({ data, color, className }: { data: number[]; color: string; className?: string }) {
  if (!data.length) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 32;
  const width = 80;
  const step = width / (data.length - 1);

  const points = data
    .map((val, i) => `${i * step},${height - ((val - min) / range) * height}`)
    .join(' ');

  // Build gradient path for area fill
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className={cn('overflow-visible', className)}>
      <defs>
        <linearGradient id={`sparkline-grad-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#sparkline-grad-${color.replace(/[^a-z0-9]/gi, '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Trend Indicator
// ---------------------------------------------------------------------------

function TrendIndicator({ trend, value }: { trend: 'up' | 'down' | 'stable'; value: number }) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const color =
    trend === 'up'
      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/8'
      : trend === 'down'
        ? 'text-rose-600 dark:text-rose-400 bg-rose-500/8'
        : 'text-muted-foreground bg-muted';

  return (
    <span className={cn('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium', color)}>
      <Icon className="h-3 w-3" />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

// ---------------------------------------------------------------------------
// Metric Card
// ---------------------------------------------------------------------------

interface MetricCardProps {
  label: string;
  formattedValue: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  trendLabel: string;
  icon: string;
  color: string;
  sparklineData?: number[];
  className?: string;
}

export function MetricCard({
  label,
  formattedValue,
  trend,
  trendValue,
  trendLabel,
  icon,
  color,
  sparklineData,
  className,
}: MetricCardProps) {
  const Icon = ICON_MAP[icon] || TrendingUp;

  return (
    <motion.div variants={staggerItem}>
      <Card
        className={cn(
          'group relative overflow-hidden p-5 transition-all duration-200 hover:shadow-md',
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}10` }}
              >
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <span className="text-[13px] font-medium text-muted-foreground">
                {label}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="nexus-financial text-2xl font-bold tracking-tight text-foreground">
                {formattedValue}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TrendIndicator trend={trend} value={trendValue} />
              <span className="text-[11px] text-muted-foreground">{trendLabel}</span>
            </div>
          </div>

          {sparklineData && (
            <div className="mt-2 opacity-50 transition-opacity group-hover:opacity-100">
              <Sparkline data={sparklineData} color={color} />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

export function MetricCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-7 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
    </Card>
  );
}
