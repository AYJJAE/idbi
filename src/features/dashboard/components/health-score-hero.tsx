'use client';

// =============================================================================
// NEXUS Health Score Hero — Large animated score ring with context
// =============================================================================

import { motion } from 'framer-motion';
import { Calendar, Info, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getRelativeTime } from '@/lib/utils';
import { staggerItem } from '@/lib/animations';
import type { HealthScore } from '@/types/financial';

interface HealthScoreHeroProps {
  healthScore: HealthScore;
}

export function HealthScoreHero({ healthScore }: HealthScoreHeroProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card className="relative overflow-hidden p-4 md:p-6">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent" />

        <div className="relative flex flex-col items-center gap-4 text-center">
          {/* Score Ring */}
          <NexusScoreRing
            score={healthScore.overall}
            size="lg"
            showGrade
          />

          {/* Percentile Badge */}
          <Badge variant="secondary" className="text-xs">
            Top {100 - healthScore.percentile}% in your sector
          </Badge>

          {/* Data Completeness */}
          <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-muted-foreground">
                Data Completeness
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] text-xs">
                    Percentage of required financial data sources connected and up-to-date
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="font-semibold text-foreground">
                {healthScore.dataCompleteness}%
              </span>
            </div>
            <Progress value={healthScore.dataCompleteness} className="h-1.5" />
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            Updated {getRelativeTime(healthScore.lastUpdated)}
          </div>

          {/* CTA */}
          <Link
            href="/intelligence/health-card"
            className="group flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            View detailed breakdown
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
