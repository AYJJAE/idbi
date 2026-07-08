'use client';

// =============================================================================
// NEXUS Cashflow Chart — Stacked bar chart with net cashflow line
// =============================================================================

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  type TooltipContentProps,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { chartReveal } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/constants';
import type { CashflowDataPoint } from '@/types/financial';

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------

function CashflowTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-card px-3 py-2.5 shadow-xl shadow-black/5">
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
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
            <span className="capitalize text-muted-foreground">
              {entry.name === 'net' ? 'Net Flow' : entry.name}
            </span>
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

interface CashflowChartProps {
  data: CashflowDataPoint[];
}

export function CashflowChart({ data }: CashflowChartProps) {
  return (
    <motion.div variants={chartReveal} initial="hidden" animate="visible">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Cash Flow</h3>
            <p className="text-xs text-muted-foreground">Inflows vs Outflows • Monthly</p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS.success }} />
              Inflow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS.danger }} />
              Outflow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-6 rounded border-t-2" style={{ borderColor: CHART_COLORS.primary }} />
              Net
            </span>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => formatCurrency(val, { decimals: 0 })}
              />
              <RechartsTooltip content={<CashflowTooltip />} />
              <Bar
                dataKey="inflow"
                fill={CHART_COLORS.success}
                radius={[4, 4, 0, 0]}
                opacity={0.7}
                barSize={20}
              />
              <Bar
                dataKey="outflow"
                fill={CHART_COLORS.danger}
                radius={[4, 4, 0, 0]}
                opacity={0.5}
                barSize={20}
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke={CHART_COLORS.primary}
                strokeWidth={2}
                dot={{ r: 3, fill: CHART_COLORS.primary }}
                activeDot={{ r: 5, strokeWidth: 2, fill: 'white' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
