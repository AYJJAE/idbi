'use client';

// =============================================================================
// NEXUS Quick Actions — Action cards for common tasks
// =============================================================================

import { motion } from 'framer-motion';
import { Upload, FileText, Sparkles, Fingerprint, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

// ---------------------------------------------------------------------------
// Action Items
// ---------------------------------------------------------------------------

const QUICK_ACTIONS = [
  {
    id: 'upload',
    label: 'Upload Documents',
    description: 'Add GST returns, bank statements, or ITR filings',
    icon: Upload,
    color: '#3b82f6',
    href: '/data-sources/documents',
  },
  {
    id: 'report',
    label: 'Generate Report',
    description: 'Create a comprehensive financial health report',
    icon: FileText,
    color: '#10b981',
    href: '/insights/reports',
  },
  {
    id: 'assessment',
    label: 'AI Assessment',
    description: 'Request an AI-powered financial analysis',
    icon: Sparkles,
    color: '#8b5cf6',
    href: '/intelligence/health-card',
  },
  {
    id: 'passport',
    label: 'View Passport',
    description: 'Access your Digital Financial Passport',
    icon: Fingerprint,
    color: '#06b6d4',
    href: '/business/passport',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Actions</h3>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-2"
      >
        {QUICK_ACTIONS.map((action) => (
          <motion.a
            key={action.id}
            href={action.href}
            variants={staggerItem}
            className={cn(
              'group flex items-start gap-3 rounded-lg border border-border p-3 transition-all duration-200',
              'hover:border-primary/20 hover:bg-accent/50 hover:shadow-sm'
            )}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${action.color}12` }}
            >
              <action.icon className="h-4 w-4" style={{ color: action.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                {action.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Card>
  );
}
