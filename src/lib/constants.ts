// =============================================================================
// NEXUS — Application Constants
// =============================================================================

import type { NavGroup } from '@/types/financial';

// ---------------------------------------------------------------------------
// App Metadata
// ---------------------------------------------------------------------------

export const APP_NAME = 'NEXUS';
export const APP_DESCRIPTION = 'AI-Powered MSME Financial Health Intelligence';
export const APP_VERSION = '1.0.0';

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAVIGATION: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    ],
  },

  {
    label: 'Business',
    items: [
      { id: 'business-profile', label: 'Business Profile', href: '/business/profile', icon: 'Building' },
      { id: 'business-onboarding', label: 'Business Onboarding', href: '/business/onboarding', icon: 'ClipboardList', badge: 'Active' },
      { id: 'financial-passport', label: 'Financial Passport', href: '/business/passport', icon: 'Fingerprint' },
    ],
  },
  {
    label: 'Financial Intelligence',
    items: [
      { id: 'health-card', label: 'Financial Health Card', href: '/intelligence/health-card', icon: 'HeartPulse' },
      { id: 'revenue-analysis', label: 'Revenue Analysis', href: '/intelligence/revenue', icon: 'TrendingUp' },
      { id: 'cashflow-analysis', label: 'Cash Flow Analysis', href: '/intelligence/cash-flow', icon: 'Droplets' },
      { id: 'compliance-monitor', label: 'Compliance Monitor', href: '/intelligence/compliance', icon: 'FileText' },
      { id: 'payment-behaviour', label: 'Payment Behaviour', href: '/intelligence/payments', icon: 'CreditCard' },
      { id: 'workforce-analysis', label: 'Workforce Analysis', href: '/intelligence/workforce', icon: 'Users' },
      { id: 'digital-banking-score', label: 'Digital Banking Score', href: '/intelligence/banking-score', icon: 'Landmark' },
    ],
  },
  {
    label: 'Data Sources',
    items: [
      { id: 'gst-data', label: 'GST', href: '/data-sources/gst', icon: 'FileSpreadsheet' },
      { id: 'upi-data', label: 'UPI', href: '/data-sources/upi', icon: 'Smartphone' },
      { id: 'account-aggregator', label: 'Account Aggregator', href: '/data-sources/aggregator', icon: 'Network' },
      { id: 'epfo-data', label: 'EPFO', href: '/data-sources/epfo', icon: 'ShieldAlert' },
      { id: 'bank-statements', label: 'Bank Statements', href: '/data-sources/bank-statements', icon: 'Library' },
      { id: 'documents', label: 'Documents', href: '/data-sources/documents', icon: 'FolderOpen', badge: 14 },
    ],
  },
  {
    label: 'Credit Assessment',
    items: [
      { id: 'loan-eligibility', label: 'Loan Eligibility', href: '/credit/eligibility', icon: 'BadgeCheck' },
      { id: 'credit-readiness', label: 'Credit Readiness', href: '/credit/readiness', icon: 'Gauge' },
      { id: 'scenario-simulator', label: 'Scenario Simulator', href: '/credit/simulator', icon: 'Binary' },
      { id: 'ai-recommendations', label: 'Product Recommendations', href: '/credit/recommendations', icon: 'Sparkles' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { id: 'business-timeline', label: 'Business Timeline', href: '/insights/timeline', icon: 'CalendarRange' },
      { id: 'risk-radar', label: 'Risk Radar', href: '/insights/risk-radar', icon: 'Activity' },
      { id: 'industry-benchmark', label: 'Industry Benchmark', href: '/insights/benchmarks', icon: 'Award' },
      { id: 'reports', label: 'Reports', href: '/insights/reports', icon: 'BarChart3' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'users', label: 'Users', href: '/admin/users', icon: 'UserCheck' },
      { id: 'roles', label: 'Roles', href: '/admin/roles', icon: 'ShieldCheck' },
      { id: 'audit-logs', label: 'Audit Logs', href: '/admin/audit-logs', icon: 'History' },
      { id: 'api-integrations', label: 'API Integrations', href: '/admin/integrations', icon: 'Cable' },
      { id: 'settings', label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Score Thresholds (0-900 scale)
// ---------------------------------------------------------------------------

export const SCORE_THRESHOLDS = {
  EXCELLENT: 800,
  GOOD: 650,
  FAIR: 450,
  POOR: 250,
  CRITICAL: 0,
} as const;

export const SCORE_MAX = 900;

// ---------------------------------------------------------------------------
// Dimension Score Thresholds (0-100 scale)
// ---------------------------------------------------------------------------

export const DIMENSION_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  POOR: 20,
  CRITICAL: 0,
} as const;

// ---------------------------------------------------------------------------
// Chart Colors
// ---------------------------------------------------------------------------

export const CHART_COLORS = {
  primary: '#6366f1',     // indigo-500
  secondary: '#8b5cf6',   // violet-500
  success: '#10b981',     // emerald-500
  warning: '#f59e0b',     // amber-500
  danger: '#ef4444',      // red-500
  info: '#3b82f6',        // blue-500
  cyan: '#06b6d4',        // cyan-500
  muted: '#94a3b8',       // slate-400
} as const;

export const DIMENSION_COLORS: Record<string, string> = {
  liquidity: '#3b82f6',
  profitability: '#10b981',
  solvency: '#8b5cf6',
  efficiency: '#f59e0b',
  growth: '#06b6d4',
};

// ---------------------------------------------------------------------------
// Time Period Options
// ---------------------------------------------------------------------------

export const TIME_PERIODS = [
  { value: '1M', label: '1 Month' },
  { value: '3M', label: '3 Months' },
  { value: '6M', label: '6 Months' },
  { value: '1Y', label: '1 Year' },
  { value: '2Y', label: '2 Years' },
  { value: 'ALL', label: 'All Time' },
] as const;

// ---------------------------------------------------------------------------
// Keyboard Shortcuts
// ---------------------------------------------------------------------------

export const SHORTCUTS = {
  COMMAND_PALETTE: 'k',
  SEARCH: '/',
  NAVIGATE_DASHBOARD: '1',
  NAVIGATE_HEALTH_CARD: '2',
  NAVIGATE_DOCUMENTS: '3',
  TOGGLE_SIDEBAR: 'b',
} as const;
