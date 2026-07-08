'use client';

// =============================================================================
// NEXUS Trend Badge — Directional percentage indicator
// =============================================================================

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendBadgeProps {
  value: number;
  suffix?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function TrendBadge({ value, suffix = '%', size = 'md', className }: TrendBadgeProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  const Icon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown;

  const colorClasses = isPositive
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : isNeutral
      ? 'text-slate-600 bg-slate-50 border-slate-200'
      : 'text-rose-700 bg-rose-50 border-rose-200';

  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-1.5 py-0.5 gap-0.5'
    : 'text-xs px-2 py-0.5 gap-1';

  const iconSize = size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold',
        colorClasses,
        sizeClasses,
        className
      )}
    >
      <Icon className={iconSize} />
      {isPositive ? '+' : ''}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}
