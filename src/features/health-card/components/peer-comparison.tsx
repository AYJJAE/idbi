'use client';

// =============================================================================
// NEXUS Peer Comparison — Horizontal bar chart vs industry benchmarks
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
  Legend,
  type TooltipContentProps,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { chartReveal } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/constants';
import type { PeerComparisonData } from '@/types/financial';

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------

function PeerTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
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
            <span className="text-muted-foreground">
              {entry.name === 'business'
                ? 'Your Score'
                : entry.name === 'industryMedian'
                  ? 'Industry Median'
                  : 'Top Quartile'}
            </span>
          </span>
          <span className="font-semibold text-foreground">{entry.value}/100</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PeerComparisonProps {
  data: PeerComparisonData[];
}

export function PeerComparison({ data }: PeerComparisonProps) {
  return (
    <motion.div variants={chartReveal} initial="hidden" animate="visible">
      <Card className="p-4 md:p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Peer Comparison</h3>
          <p className="text-xs text-muted-foreground">
            Your scores vs manufacturing sector benchmarks
          </p>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="dimension"
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <RechartsTooltip content={<PeerTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px' }}
                formatter={(value: string) =>
                  value === 'business'
                    ? 'Your Score'
                    : value === 'industryMedian'
                      ? 'Industry Median'
                      : 'Top Quartile'
                }
              />
              <Bar
                dataKey="business"
                fill={CHART_COLORS.primary}
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
              <Bar
                dataKey="industryMedian"
                fill={CHART_COLORS.muted}
                radius={[0, 4, 4, 0]}
                barSize={12}
                opacity={0.6}
              />
              <Bar
                dataKey="topQuartile"
                fill={CHART_COLORS.success}
                radius={[0, 4, 4, 0]}
                barSize={12}
                opacity={0.4}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
