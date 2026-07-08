'use client';

// =============================================================================
// NEXUS Health Card View — Full Financial Health Card page
// =============================================================================

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { DashboardSkeleton } from '@/components/skeleton-loaders';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DimensionCard } from './dimension-card';
import { ScoreHistoryChart } from './score-history-chart';
import { PeerComparison } from './peer-comparison';
import { AIInsightPanel } from './ai-insight-panel';
import { useHealthScore } from '@/hooks/use-health-score';
import { useBusinessStore } from '@/store/business-store';
import { getBusinessById, getScoreHistoryForBusiness, getPeerComparisonForBusiness } from '@/data/mock-data';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { getRelativeTime } from '@/lib/utils';
import { Download, Share2, Calendar, Shield } from 'lucide-react';

export function HealthCardView() {
  const { healthScore, isLoading } = useHealthScore();
  const activeBusinessId = useBusinessStore((state) => state.activeBusinessId);
  const business = getBusinessById(activeBusinessId);
  const scoreHistory = getScoreHistoryForBusiness(activeBusinessId);
  const peerComparison = getPeerComparisonForBusiness(activeBusinessId);

  if (isLoading || !healthScore) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Financial Health Card"
          breadcrumbs={[
            { label: 'Dashboard', href: '/' },
            { label: 'Health Card' },
          ]}
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
        title="Financial Health Card"
        description="Comprehensive multi-dimensional assessment of your business financial health"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Health Card' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
              Share
            </Button>
            <Button size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download PDF
            </Button>
          </div>
        }
      />

      {/* Score Summary Card */}
      <motion.div variants={staggerItem}>
        <Card className="relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-chart-5/[0.02]" />
          <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-10">
            {/* Score Ring */}
            <div className="flex flex-col items-center gap-3">
              <NexusScoreRing score={healthScore.overall} size="xl" showGrade />
              <Badge variant="secondary" className="text-xs">
                Top {100 - healthScore.percentile}% in {business.sector}
              </Badge>
            </div>

            {/* Business Info + Meta */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {business.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {business.sector} • {business.subSector}
                </p>
                <p className="text-xs text-muted-foreground">
                  GSTIN: {business.gstin} • {business.city}, {business.state}
                </p>
              </div>

              {/* Dimension Quick Summary */}
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                {healthScore.dimensions.map((dim) => (
                  <div
                    key={dim.id}
                    className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: dim.color }}
                    />
                    <span className="text-xs text-muted-foreground">{dim.name}</span>
                    <span className="text-sm font-bold" style={{ color: dim.color }}>
                      {dim.score}
                    </span>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground lg:justify-start">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {getRelativeTime(healthScore.lastUpdated)}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Data Completeness: {healthScore.dataCompleteness}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Dimension Cards */}
      <motion.div variants={staggerItem}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Dimension Breakdown
          </h2>
          <span className="text-xs text-muted-foreground">
            Click to expand details
          </span>
        </div>
        <div className="space-y-3">
          {healthScore.dimensions.map((dimension, index) => (
            <DimensionCard
              key={dimension.id}
              dimension={dimension}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={staggerItem} className="grid gap-6 lg:grid-cols-2">
        <ScoreHistoryChart data={scoreHistory} />
        <PeerComparison data={peerComparison} />
      </motion.div>

      {/* AI Analysis Panel */}
      <motion.div variants={staggerItem}>
        <AIInsightPanel dimensions={healthScore.dimensions} />
      </motion.div>
    </motion.div>
  );
}
