'use client';

// =============================================================================
// NEXUS Health Radar Chart — 5-dimension spider chart
// =============================================================================

import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { chartReveal } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/constants';
import type { HealthDimension } from '@/types/financial';

// ---------------------------------------------------------------------------
// Data transform
// ---------------------------------------------------------------------------

function transformRadarData(dimensions: HealthDimension[]) {
  return dimensions.map((dim) => ({
    dimension: dim.name,
    score: dim.score,
    fullMark: 100,
  }));
}

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RadarTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-border/60 bg-card px-3 py-2.5 shadow-xl shadow-black/5">
      <p className="text-xs font-medium text-muted-foreground">{item.payload.dimension}</p>
      <p className="text-sm font-bold nexus-financial text-foreground">{item.value}/100</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface HealthRadarChartProps {
  dimensions: HealthDimension[];
}

export function HealthRadarChart({ dimensions }: HealthRadarChartProps) {
  const radarData = transformRadarData(dimensions);

  return (
    <motion.div variants={chartReveal} initial="hidden" animate="visible">
      <Card className="p-4 md:p-6">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-foreground">Financial Health Radar</h3>
          <p className="text-xs text-muted-foreground">5-dimension assessment</p>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
              <PolarGrid
                stroke="currentColor"
                className="text-border"
                gridType="polygon"
              />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="text-muted-foreground"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: 'currentColor' }}
                className="text-muted-foreground/50"
                tickCount={5}
              />
              <RechartsTooltip content={RadarTooltip} />
              <Radar
                name="Score"
                dataKey="score"
                stroke={CHART_COLORS.primary}
                fill={CHART_COLORS.primary}
                fillOpacity={0.15}
                strokeWidth={2}
                dot={{ r: 4, fill: CHART_COLORS.primary }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Legend */}
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {dimensions.map((dim) => (
            <div key={dim.id} className="flex items-center gap-1.5 text-[11px]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dim.color }}
              />
              <span className="text-muted-foreground">{dim.name}</span>
              <span className="font-semibold nexus-financial text-foreground">{dim.score}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
