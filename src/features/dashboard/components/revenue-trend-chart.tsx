'use client';

// =============================================================================
// NEXUS Revenue Trend Chart — 12-month area chart with gradient
// =============================================================================

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { chartReveal } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/constants';
import type { TrendDataPoint } from '@/types/financial';

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-card px-3 py-2.5 shadow-xl shadow-black/5">
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4 text-sm"
        >
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize text-muted-foreground">{entry.name}</span>
          </span>
          <span className="font-semibold nexus-financial text-foreground">
            {formatCurrency(entry.value as number, { decimals: 1 })}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface RevenueTrendChartProps {
  data: TrendDataPoint[];
}

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <motion.div variants={chartReveal} initial="hidden" animate="visible">
      <Card className="p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-foreground">Revenue & Profit Trend</h3>
            <p className="text-xs text-muted-foreground">12-month view • Monthly</p>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.success} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: string) => val.split(' ')[0]}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => formatCurrency(val, { decimals: 0 })}
              />
              <RechartsTooltip content={CustomTooltip} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={CHART_COLORS.primary}
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, fill: 'white' }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke={CHART_COLORS.success}
                strokeWidth={2}
                fill="url(#profitGradient)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, fill: 'white' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
