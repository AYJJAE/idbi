'use client';

// =============================================================================
// NEXUS Dashboard View — Main orchestrator for the overview page
// =============================================================================

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { DashboardSkeleton } from '@/components/skeleton-loaders';
import { HealthScoreHero } from './health-score-hero';
import { KPIGrid } from './kpi-grid';
import { RevenueTrendChart } from './revenue-trend-chart';
import { CashflowChart } from './cashflow-chart';
import { HealthRadarChart } from './health-radar-chart';
import { RecentActivity } from './recent-activity';
import { ConnectedEcosystemsCard } from '@/features/ecosystems/components/connected-ecosystems-card';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Download, RefreshCcw } from 'lucide-react';

export function DashboardView() {
  const { data, isLoading } = useDashboardData();

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Financial health overview for your business"
        />
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description={`Financial health overview for ${data.business.name}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-1.5 h-3.5 w-3.5" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        }
      />

      {/* Row 1: Health Score + KPI Grid */}
      <motion.div variants={staggerItem} className="grid gap-4 md:gap-6 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <HealthScoreHero healthScore={data.healthScore} />
        </div>
        <div className="lg:col-span-4">
          <KPIGrid metrics={data.kpiMetrics} />
        </div>
      </motion.div>

      {/* Row 2: Revenue Trend + Cashflow */}
      <motion.div variants={staggerItem} className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <RevenueTrendChart data={data.revenueTrend} />
        <CashflowChart data={data.cashflowData} />
      </motion.div>

      {/* Row 3: Radar + Activity */}
      <motion.div variants={staggerItem} className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <HealthRadarChart dimensions={data.healthScore.dimensions} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity events={data.activityEvents} />
        </div>
      </motion.div>

      {/* Row 4: Connected Ecosystems */}
      <motion.div variants={staggerItem}>
        <ConnectedEcosystemsCard />
      </motion.div>
    </motion.div>
  );
}
