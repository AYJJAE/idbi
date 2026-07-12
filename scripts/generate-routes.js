// =============================================================================
// NEXUS Route Generator Script
// Programmatically scaffolds all 28 route placeholders with highly-styled,
// interactive demo screens (Title, Description, PageHeader, KPI Stat Cards,
// interactive widgets, empty states, and mock document upload inputs).
// =============================================================================

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const ROUTES = [
  // Business
  { dir: 'business/profile', title: 'Business Profile', desc: 'Manage core corporate credentials, registrations, and registered address info.' },
  { dir: 'business/onboarding', title: 'Business Onboarding', desc: 'Connect tax portals, bank aggregators, and link corporate workforce ledgers.' },
  { dir: 'business/passport', title: 'Digital Financial Passport', desc: 'Securely share verified financial health score summaries with lenders.' },

  // Financial Intelligence
  { dir: 'intelligence/health-card', title: 'Financial Health Card', desc: 'Multidimensional analysis of liquidity, profitability, solvency, efficiency, and growth.' },
  { dir: 'intelligence/revenue', title: 'Revenue Analysis', desc: 'Granular assessment of monthly sales, operating margins, and seasonal trends.' },
  { dir: 'intelligence/cash-flow', title: 'Cash Flow Analysis', desc: 'Real-time monitoring of monthly inflows, outflows, net flow buffers, and runways.' },
  { dir: 'intelligence/compliance', title: 'Compliance Monitor', desc: 'Track GST return filings, corporate ITR timeline status, and EPFO compliance.' },
  { dir: 'intelligence/payments', title: 'Payment Behaviour', desc: 'Analysis of trade credit lines, creditor ageing, and average debtor days.' },
  { dir: 'intelligence/workforce', title: 'Workforce Analysis', desc: 'Monitor payroll trends, employee attrition rate, and corporate EPFO deposits.' },
  { dir: 'intelligence/banking-score', title: 'Digital Banking Score', desc: 'Unified score tracking across HDFC, SBI, and HDFC credit-line facilities.' },

  // Data Sources
  { dir: 'data-sources/gst', title: 'GST Returns (GSTR-3B & GSTR-1)', desc: 'Direct portal data sync for monthly GSTR filings and invoice logs.' },
  { dir: 'data-sources/upi', title: 'UPI Transactions', desc: 'Aggregated micro-payment transaction volumes, refund rates, and daily checkouts.' },
  { dir: 'data-sources/aggregator', title: 'Account Aggregator Sync', desc: 'Real-time consent management for banking statement downloads.' },
  { dir: 'data-sources/epfo', title: 'EPFO Records', desc: 'Monthly employee provident fund contribution records and active headcounts.' },
  { dir: 'data-sources/bank-statements', title: 'Bank Statement Logs', desc: 'Parsed monthly ledger transactions from primary corporate current accounts.' },
  { dir: 'data-sources/documents', title: 'Document Vault', desc: 'Upload, manage, and verify audited balance sheets, profit & loss, and audit reports.' },

  // Credit Assessment
  { dir: 'credit/eligibility', title: 'Loan Eligibility Assessment', desc: 'Pre-approved commercial loan limits and credit limits across banking partners.' },
  { dir: 'credit/readiness', title: 'Credit Readiness Indicators', desc: 'Verify score gaps and pre-requisite compliance status for commercial credit.' },
  { dir: 'credit/simulator', title: 'Scenario Simulator', desc: 'Model impacts of improving debtor collection cycles on the health score.' },
  { dir: 'credit/recommendations', title: 'AI Recommendation Engine', desc: 'Personalized actions to optimize working capital cycles and lower funding costs.' },

  // Insights
  { dir: 'insights/timeline', title: 'Business Timeline', desc: 'Chronological activity log tracking document uploads, audits, and score updates.' },
  { dir: 'insights/risk-radar', title: 'Risk Radar Alert Feed', desc: 'Early warning indicators and risk markers flagged by financial engines.' },
  { dir: 'insights/benchmarks', title: 'Industry Benchmarks Comparison', desc: 'Compare operating performance and health scores against regional industry peers.' },
  { dir: 'insights/reports', title: 'Financial Intelligence Reports', desc: 'Generate and download complete Financial Health Reports.' },

  // Administration
  { dir: 'admin/users', title: 'Users Directory', desc: 'Manage access levels, relationship manager links, and active users.' },
  { dir: 'admin/roles', title: 'Roles & Clearances', desc: 'Define access groups, permission matrix, and role classifications.' },
  { dir: 'admin/audit-logs', title: 'Security Audit Logs', desc: 'Immutable records of data access, profile updates, and sharing actions.' },
  { dir: 'admin/integrations', title: 'API Connections', desc: 'Manage external API links (GSTIN Portal, UPI Aggregator, Bank APIs).' },
  { dir: 'admin/settings', title: 'Platform Settings', desc: 'Configure default calendars, notification routing rules, and multi-tenant defaults.' },
];

function getTemplate(route) {
  return `'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { formatCurrency } from '@/lib/utils';
import { RefreshCcw, Download, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function GeneratedPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const [loading, setLoading] = React.useState(false);
  const [actionTriggered, setActionTriggered] = React.useState(false);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActionTriggered(true);
      setTimeout(() => setActionTriggered(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="${route.title}"
        description="${route.desc}"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAction} disabled={loading}>
              <RefreshCcw className={\`mr-1.5 h-3.5 w-3.5 \${loading ? 'animate-spin' : ''}\`} />
              Sync Data
            </Button>
            <Button size="sm" onClick={handleAction} disabled={loading}>
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export CSV
            </Button>
          </div>
        }
      />

      {/* Dynamic Switched Profile Alert banner */}
      <Card className="border-secondary/20 bg-secondary/5">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Displaying Live Preloaded Demo Dataset
              </p>
              <p className="text-[10px] text-muted-foreground">
                Active Profile: <span className="font-bold text-foreground">{currentBusiness.name}</span> ({currentBusiness.sector})
              </p>
            </div>
          </div>
          <Badge variant="outline" className="border-secondary text-secondary">
            Live Demo
          </Badge>
        </CardContent>
      </Card>

      {/* Action Notification */}
      {actionTriggered && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-500 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4" />
          Preloaded dataset synced successfully for {currentBusiness.name}.
        </div>
      )}

      {/* Grid Layout of Demo Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Key Summary Stats */}
        <Card className="p-5 md:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Financial & Registration Metrics
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] text-muted-foreground font-medium">GSTIN Registration</p>
              <p className="text-sm font-mono font-bold mt-1 text-foreground">{currentBusiness.gstin}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] text-muted-foreground font-medium">Udyam Registration</p>
              <p className="text-sm font-mono font-bold mt-1 text-foreground">{currentBusiness.udyamNumber}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] text-muted-foreground font-medium">MSME Classification</p>
              <p className="text-sm font-bold mt-1 text-foreground">{currentBusiness.msmeCategory} Enterprise</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] text-muted-foreground font-medium">Annualized Turnover</p>
              <p className="text-sm font-bold mt-1 text-foreground">{formatCurrency(currentBusiness.annualTurnover)}</p>
            </div>
          </div>
        </Card>

        {/* Card 2: Interactive Sandbox Checklist */}
        <Card className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Integration Checks
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Portal Link Status', status: 'Active', color: 'text-emerald-500' },
              { label: 'API Signature Validation', status: 'Secured', color: 'text-emerald-500' },
              { label: 'Audit Log Recording', status: 'Enabled', color: 'text-emerald-500' },
              { label: 'Last Verification Sync', status: '1h ago', color: 'text-muted-foreground' }
            ].map((check, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-border last:border-0">
                <span className="text-muted-foreground font-medium">{check.label}</span>
                <span className={\`font-semibold \${check.color}\`}>{check.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Lower Placeholder Component */}
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
            <FileText className="h-6 w-6 text-muted-foreground/60" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Interactive Module Mock</h4>
          <p className="text-xs text-muted-foreground max-w-sm mt-1">
            This module is pre-populated with live production-quality mock data for presentation purposes. Toggle actions above to explore integrations.
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" onClick={handleAction}>
              Verify Connectivity
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
`;
}

// Scaffolder Logic
const targetBaseDir = path.join(__dirname, '..', 'src', 'app', '(dashboard)');

ROUTES.forEach((route) => {
  const dirPath = path.join(targetBaseDir, route.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }

  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, getTemplate(route), 'utf8');
  console.log(`Scaffolded page: ${filePath}`);
});

console.log('All 28 route placeholders generated successfully!');
