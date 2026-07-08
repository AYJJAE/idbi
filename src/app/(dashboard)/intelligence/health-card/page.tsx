// =============================================================================
// NEXUS Health Card Page
// =============================================================================

import type { Metadata } from 'next';
import { HealthCardView } from '@/features/health-card/components/health-card-view';
import { EmbeddedAIPanel } from '@/components/embedded-ai-panel';
import { PROMPTS } from '@/services/ai/providers';

export const metadata: Metadata = {
  title: 'Financial Health Card',
  description: 'Multi-dimensional financial health assessment with AI-powered insights.',
};

export default function HealthCardPage() {
  return (
    <>
      <HealthCardView />
      <EmbeddedAIPanel 
        title="Insight Explanation" 
        prompt={PROMPTS.HEALTH_CARD} 
      />
    </>
  );
}
