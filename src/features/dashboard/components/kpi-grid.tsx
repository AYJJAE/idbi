'use client';

// =============================================================================
// NEXUS KPI Grid — 4 metric cards in responsive layout
// =============================================================================

import { motion } from 'framer-motion';
import { MetricCard, MetricCardSkeleton } from '@/components/metric-card';
import { staggerContainer } from '@/lib/animations';
import type { KPIMetric } from '@/types/financial';

interface KPIGridProps {
  metrics: KPIMetric[];
  isLoading?: boolean;
}

export function KPIGrid({ metrics, isLoading }: KPIGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          label={metric.label}
          formattedValue={metric.formattedValue}
          trend={metric.trend}
          trendValue={metric.trendValue}
          trendLabel={metric.trendLabel}
          icon={metric.icon}
          color={metric.color}
          sparklineData={metric.sparklineData}
        />
      ))}
    </motion.div>
  );
}
