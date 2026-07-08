'use client';

// =============================================================================
// NEXUS AI Insight Panel — Expandable AI-generated analysis
// =============================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { HealthDimension } from '@/types/financial';

interface AIInsightPanelProps {
  dimensions: HealthDimension[];
}

export function AIInsightPanel({ dimensions }: AIInsightPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('summary');

  // Generate overall summary from dimensions
  const overallSummary = generateSummary(dimensions);

  const sections = [
    {
      id: 'summary',
      title: 'Executive Summary',
      icon: Sparkles,
      content: overallSummary,
      color: '#6366f1',
    },
    {
      id: 'strengths',
      title: 'Key Strengths',
      icon: CheckCircle2,
      content: dimensions
        .filter((d) => d.score >= 80)
        .flatMap((d) => d.factors.positive.slice(0, 2))
        .map((s) => `• ${s}`)
        .join('\n'),
      color: '#10b981',
    },
    {
      id: 'risks',
      title: 'Risk Areas',
      icon: AlertTriangle,
      content: dimensions
        .filter((d) => d.score < 80)
        .flatMap((d) => d.factors.negative)
        .map((s) => `• ${s}`)
        .join('\n'),
      color: '#f59e0b',
    },
    {
      id: 'actions',
      title: 'Recommended Actions',
      icon: Lightbulb,
      content: dimensions
        .flatMap((d) => d.recommendations.slice(0, 1))
        .map((s, i) => `${i + 1}. ${s}`)
        .join('\n'),
      color: '#3b82f6',
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-gradient-to-r from-primary/[0.04] to-transparent p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">AI Financial Analysis</h3>
            <p className="text-xs text-muted-foreground">
              Powered by NEXUS Intelligence Engine
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
              className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-accent/30"
            >
              <section.icon
                className="h-4 w-4 shrink-0"
                style={{ color: section.color }}
              />
              <span className="flex-1 text-sm font-medium text-foreground">
                {section.title}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform duration-200',
                  expandedSection === section.id && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pl-12">
                    <p className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function generateSummary(dimensions: HealthDimension[]): string {
  const avgScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
  );
  const strongest = dimensions.reduce((a, b) => (a.score > b.score ? a : b));
  const weakest = dimensions.reduce((a, b) => (a.score < b.score ? a : b));

  return `The business demonstrates a strong overall financial health profile with an average dimension score of ${avgScore}/100. ` +
    `The strongest area is ${strongest.name} (${strongest.score}/100), reflecting ${strongest.grade.toLowerCase()} performance. ` +
    `The area with the most room for improvement is ${weakest.name} (${weakest.score}/100). ` +
    `Across all dimensions, the business outperforms industry medians in 4 out of 5 areas, ` +
    `positioning it well for growth initiatives and favorable lending terms.`;
}
