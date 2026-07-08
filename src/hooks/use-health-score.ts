// =============================================================================
// NEXUS — Health Score Data Hook (Dynamic Demo Mode)
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import type { HealthScore } from '@/types/financial';
import { getHealthScoreForBusiness } from '@/data/mock-data';
import { useBusinessStore } from '@/store/business-store';

interface UseHealthScoreReturn {
  healthScore: HealthScore | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch and manage health score data.
 * Computes scores dynamically based on the active business profile.
 */
export function useHealthScore(): UseHealthScoreReturn {
  const activeBusinessId = useBusinessStore((state) => state.activeBusinessId);
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setHealthScore(getHealthScoreForBusiness(activeBusinessId));
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [activeBusinessId]);

  return { healthScore, isLoading, error };
}
