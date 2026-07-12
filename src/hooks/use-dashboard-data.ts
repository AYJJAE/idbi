// =============================================================================
// NEXUS — Dashboard Data Aggregation Hook (Dynamic Demo Mode)
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import type {
  HealthScore,
  KPIMetric,
  TrendDataPoint,
  CashflowDataPoint,
  ActivityEvent,
  Business,
} from '@/types/financial';
import {
  getBusinessById,
  getHealthScoreForBusiness,
  getKPIMetricsForBusiness,
  getRevenueTrendForBusiness,
  getCashflowDataForBusiness,
  getTimelineEventsForBusiness,
} from '@/data/mock-data';
import { useBusinessStore } from '@/store/business-store';

interface DashboardData {
  business: Business;
  healthScore: HealthScore;
  kpiMetrics: KPIMetric[];
  revenueTrend: TrendDataPoint[];
  cashflowData: CashflowDataPoint[];
  activityEvents: ActivityEvent[];
}

interface UseDashboardDataReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Aggregates all dashboard data into a single hook.
 * Computes metrics dynamically based on the active business profile.
 */
export function useDashboardData(): UseDashboardDataReturn {
  const activeBusinessId = useBusinessStore((state) => state.activeBusinessId);
  const [data, setData] = useState<DashboardData | null>(null);
  const isLoading = !data || data.business.id !== activeBusinessId;
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic generation triggered instantly or after brief animation buffer
    const timer = setTimeout(() => {
      setData({
        business: getBusinessById(activeBusinessId),
        healthScore: getHealthScoreForBusiness(activeBusinessId),
        kpiMetrics: getKPIMetricsForBusiness(activeBusinessId),
        revenueTrend: getRevenueTrendForBusiness(activeBusinessId),
        cashflowData: getCashflowDataForBusiness(activeBusinessId),
        activityEvents: getTimelineEventsForBusiness(activeBusinessId),
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [activeBusinessId]);

  return { data: isLoading ? null : data, isLoading, error };
}
