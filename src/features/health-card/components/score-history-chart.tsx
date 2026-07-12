'use client';

// =============================================================================
// NEXUS Score History Chart — Overall score trend across quarters
// =============================================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { chartReveal } from '@/lib/animations';
import { DIMENSION_COLORS, CHART_COLORS } from '@/lib/constants';
import type { ScoreHistoryPoint, HealthDimensionId } from '@/types/financial';

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScoreTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
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
          <span className="font-semibold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dimension Toggle
// ---------------------------------------------------------------------------

const DIMENSION_OPTIONS: { id: HealthDimensionId | 'overall'; label: string; color: string }[] = [
  { id: 'overall', label: 'Overall', color: CHART_COLORS.primary },
  { id: 'liquidity', label: 'Liquidity', color: DIMENSION_COLORS.liquidity },
  { id: 'profitability', label: 'Profitability', color: DIMENSION_COLORS.profitability },
  { id: 'solvency', label: 'Solvency', color: DIMENSION_COLORS.solvency },
  { id: 'efficiency', label: 'Efficiency', color: DIMENSION_COLORS.efficiency },
  { id: 'growth', label: 'Growth', color: DIMENSION_COLORS.growth },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ScoreHistoryChartProps {
  data: ScoreHistoryPoint[];
}

export function ScoreHistoryChart({ data }: ScoreHistoryChartProps) {
  const [activeDimensions, setActiveDimensions] = useState<Set<string>>(new Set(['overall']));

  const toggleDimension = (id: string) => {
    setActiveDimensions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // Keep at least one
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <motion.div variants={chartReveal} initial="hidden" animate="visible">
      <Card className="p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Score History</h3>
            <p className="text-xs text-muted-foreground">6-quarter trend</p>
          </div>

          {/* Dimension Toggles */}
          <div className="flex flex-wrap gap-1.5">
            {DIMENSION_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleDimension(opt.id)}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all ${
                  activeDimensions.has(opt.id)
                    ? 'border-transparent text-white shadow-sm'
                    : 'border-border bg-background text-muted-foreground hover:bg-accent'
                }`}
                style={
                  activeDimensions.has(opt.id)
                    ? { backgroundColor: opt.color }
                    : {}
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                vertical={false}
              />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={activeDimensions.has('overall') ? [600, 800] : [40, 100]}
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip content={ScoreTooltip} />

              {DIMENSION_OPTIONS.map((opt) =>
                activeDimensions.has(opt.id) ? (
                  <Line
                    key={opt.id}
                    type="monotone"
                    dataKey={opt.id}
                    stroke={opt.color}
                    strokeWidth={opt.id === 'overall' ? 2.5 : 1.5}
                    dot={{ r: 3, fill: opt.color }}
                    activeDot={{ r: 5, strokeWidth: 2, fill: 'white' }}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
