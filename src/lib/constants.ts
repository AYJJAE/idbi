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
    label: 'Dashboard',
    items: [
      { id: 'dashboard', label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
      { id: 'health-card', label: 'Financial Health Card', href: '/intelligence/health-card', icon: 'HeartPulse' },
      { id: 'financial-passport', label: 'Financial Passport', href: '/business/passport', icon: 'Fingerprint' },
      { id: 'eco-gst', label: 'GST Network', href: '/ecosystems/gst', icon: 'FileSpreadsheet' },
      { id: 'eco-upi', label: 'UPI Network', href: '/ecosystems/upi', icon: 'Smartphone' },
      { id: 'eco-aa', label: 'Account Aggregator (AA)', href: '/ecosystems/account-aggregator', icon: 'Network' },
      { id: 'eco-epfo', label: 'EPFO', href: '/ecosystems/epfo', icon: 'ShieldAlert' },
      { id: 'eco-uli', label: 'Unified Lending Interface (ULI)', href: '/ecosystems/uli', icon: 'Landmark' },
      { id: 'eco-ocen', label: 'Open Credit Enablement Network (OCEN)', href: '/ecosystems/ocen', icon: 'Banknote' },
    ],
  },
  {
    label: 'Financial Intelligence',
    isDivider: true,
    items: [
      { id: 'revenue-analysis', label: 'Revenue Analysis', href: '/intelligence/revenue', icon: 'TrendingUp' },
      { id: 'cashflow-analysis', label: 'Cash Flow Analysis', href: '/intelligence/cash-flow', icon: 'Droplets' },
      { id: 'compliance-monitor', label: 'Compliance Monitor', href: '/intelligence/compliance', icon: 'FileText' },
      { id: 'payment-behaviour', label: 'Payment Behaviour', href: '/intelligence/payments', icon: 'CreditCard' },
      { id: 'workforce-analysis', label: 'Workforce Analysis', href: '/intelligence/workforce', icon: 'Users' },
      { id: 'digital-banking-score', label: 'Digital Banking Score', href: '/intelligence/banking-score', icon: 'Landmark' },
      { id: 'loan-eligibility', label: 'Loan Eligibility', href: '/credit/eligibility', icon: 'BadgeCheck' },
      { id: 'credit-readiness', label: 'Credit Readiness', href: '/credit/readiness', icon: 'Gauge' },
      { id: 'scenario-simulator', label: 'Scenario Simulator', href: '/credit/simulator', icon: 'Binary' },
      { id: 'ai-recommendations', label: 'Product Recommendations', href: '/credit/recommendations', icon: 'Sparkles' },
    ],
  },
  {
    label: 'Reports',
    items: [
      { id: 'reports', label: 'Reports', href: '/insights/reports', icon: 'BarChart3' },
      { id: 'business-timeline', label: 'Business Timeline', href: '/insights/timeline', icon: 'CalendarRange' },
      { id: 'risk-radar', label: 'Risk Radar', href: '/insights/risk-radar', icon: 'Activity' },
      { id: 'industry-benchmark', label: 'Industry Benchmark', href: '/insights/benchmarks', icon: 'Award' },
    ],
  },
  {
    label: 'Future Integrations',
    items: [
      { id: 'eco-mca', label: 'MCA', href: '/ecosystems/mca', icon: 'Building' },
      { id: 'eco-ckyc', label: 'CKYC', href: '/ecosystems/ckyc', icon: 'UserCheck' },
      { id: 'bank-statements', label: 'Bank Statements', href: '/data-sources/bank-statements', icon: 'Library' },
      { id: 'documents', label: 'Documents', href: '/data-sources/documents', icon: 'FolderOpen', badge: 14 },
      { id: 'business-profile', label: 'Business Profile', href: '/business/profile', icon: 'Building' },
      { id: 'business-onboarding', label: 'Business Onboarding', href: '/business/onboarding', icon: 'ClipboardList', badge: 'Active' },
    ],
  },
  {
    items: [
      { id: 'eco-api', label: 'API Playground', href: '/ecosystems/api-playground', icon: 'Braces' },
      { id: 'eco-consent', label: 'Consent Manager', href: '/ecosystems/consent-manager', icon: 'Lock' },
      { id: 'eco-sync', label: 'Sync History', href: '/ecosystems/sync-history', icon: 'History' },
      { id: 'eco-health', label: 'Integration Health', href: '/ecosystems/health', icon: 'Activity' },
      { id: 'settings', label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'users', label: 'Users', href: '/admin/users', icon: 'UserCheck' },
      { id: 'roles', label: 'Roles', href: '/admin/roles', icon: 'ShieldCheck' },
      { id: 'audit-logs', label: 'Audit Logs', href: '/admin/audit-logs', icon: 'History' },
      { id: 'api-integrations', label: 'API Integrations', href: '/admin/integrations', icon: 'Cable' },
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
  primary: '#008C5A',     // Primary Green
  secondary: '#2DBE7F',   // Light Green variant
  success: '#008C5A',     // Primary Green
  warning: '#2DBE7F',     // Light Green
  danger: '#006C45',      // Dark Green
  info: '#333333',        // Neutral
  cyan: '#008C5A',        // Primary Green
  muted: '#888888',       // Neutral muted
} as const;

export const DIMENSION_COLORS: Record<string, string> = {
  liquidity: '#008C5A',
  profitability: '#2DBE7F',
  solvency: '#006C45',
  efficiency: '#333333',
  growth: '#008C5A',
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
