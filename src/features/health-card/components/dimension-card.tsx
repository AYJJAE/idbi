'use client';

// =============================================================================
// NEXUS Dimension Card — Expandable health dimension with sub-metrics
// =============================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Droplets,
  TrendingUp,
  Shield,
  Gauge,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendBadge } from '@/components/trend-badge';
import { cn, getDimensionColor } from '@/lib/utils';
import type { HealthDimension } from '@/types/financial';

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  TrendingUp,
  Shield,
  Gauge,
  Rocket,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface DimensionCardProps {
  dimension: HealthDimension;
  defaultExpanded?: boolean;
}

export function DimensionCard({ dimension, defaultExpanded = false }: DimensionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const Icon = ICON_MAP[dimension.icon] || TrendingUp;
  const color = getDimensionColor(dimension.score);

  return (
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${dimension.color}15` }}
        >
          <Icon className="h-5 w-5" style={{ color: dimension.color }} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{dimension.name}</h3>
            <Badge
              variant="secondary"
              className="text-[10px]"
              style={{
                backgroundColor: `${color}15`,
                color: color,
                borderColor: `${color}30`,
              }}
            >
              {dimension.grade}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <div className="flex-1">
              <Progress
                value={dimension.score}
                className="h-1.5"
                style={{ ['--progress-color' as string]: color }}
              />
            </div>
            <span className="text-sm font-bold tabular-nums" style={{ color }}>
              {dimension.score}/100
            </span>
          </div>
        </div>

        <TrendBadge value={dimension.trendValue} size="sm" />

        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 pb-5 pt-4">
              {/* Sub-metrics */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sub-Metrics
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {dimension.subMetrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="rounded-lg border border-border bg-muted/30 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-xs font-medium text-foreground">{metric.name}</p>
                        <TrendBadge value={metric.trendValue} size="sm" suffix={metric.unit === '%' ? 'pp' : ''} />
                      </div>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="text-lg font-bold tabular-nums text-foreground">
                          {metric.value}
                        </span>
                        <span className="text-xs text-muted-foreground">{metric.unit}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>Benchmark: {metric.benchmark}{metric.unit}</span>
                        <span>•</span>
                        <span>{metric.benchmarkLabel}</span>
                      </div>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/[0.03] p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-primary/10">✦</span>
                  AI Insight
                </p>
                <p className="text-xs leading-relaxed text-foreground/80">
                  {dimension.aiInsight}
                </p>
              </div>

              {/* Factors */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold text-emerald-600">
                    Positive Factors
                  </p>
                  <ul className="space-y-1">
                    {dimension.factors.positive.map((factor, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-muted-foreground"
                      >
                        <span className="mt-0.5 text-emerald-500">✓</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-amber-600">
                    Areas of Concern
                  </p>
                  <ul className="space-y-1">
                    {dimension.factors.negative.map((factor, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-muted-foreground"
                      >
                        <span className="mt-0.5 text-amber-500">!</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-foreground">
                  Recommendations
                </p>
                <ul className="space-y-1.5">
                  {dimension.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-primary/10 text-[9px] font-bold text-primary">
                        {i + 1}
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
