// =============================================================================
// NEXUS Financial Health Intelligence Platform — Core Type Definitions
// =============================================================================

// ---------------------------------------------------------------------------
// Business Entity
// ---------------------------------------------------------------------------

export interface Business {
  id: string;
  name: string;
  gstin: string;
  pan: string;
  sector: string;
  subSector: string;
  incorporationDate: string;
  registeredAddress: string;
  city: string;
  state: string;
  pincode: string;
  employeeCount: number;
  annualTurnover: number;
  msmeCategory: 'Micro' | 'Small' | 'Medium';
  udyamNumber: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  logoUrl?: string;
}

// ---------------------------------------------------------------------------
// Health Score System
// ---------------------------------------------------------------------------

export type ScoreGrade = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';

export interface SubMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  benchmark: number;
  benchmarkLabel: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  description: string;
}

export type HealthDimensionId =
  | 'liquidity'
  | 'profitability'
  | 'solvency'
  | 'efficiency'
  | 'growth';

export interface HealthDimension {
  id: HealthDimensionId;
  name: string;
  score: number; // 0-100
  weight: number; // percentage weight in overall score
  grade: ScoreGrade;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  subMetrics: SubMetric[];
  aiInsight: string;
  factors: {
    positive: string[];
    negative: string[];
  };
  recommendations: string[];
  color: string;
  icon: string;
}

export interface HealthScore {
  overall: number; // 0-900 scale
  grade: ScoreGrade;
  percentile: number;
  dimensions: HealthDimension[];
  lastUpdated: string;
  nextUpdate: string;
  dataCompleteness: number; // percentage
}

// ---------------------------------------------------------------------------
// KPI Metrics
// ---------------------------------------------------------------------------

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  unit?: string;
  prefix?: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  trendLabel: string;
  icon: string;
  color: string;
  sparklineData?: number[];
}

// ---------------------------------------------------------------------------
// Chart Data
// ---------------------------------------------------------------------------

export interface TrendDataPoint {
  month: string;
  label: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface CashflowDataPoint {
  month: string;
  label: string;
  inflow: number;
  outflow: number;
  net: number;
}

export interface ScoreHistoryPoint {
  quarter: string;
  label: string;
  overall: number;
  liquidity: number;
  profitability: number;
  solvency: number;
  efficiency: number;
  growth: number;
}

export interface PeerComparisonData {
  dimension: string;
  dimensionId: HealthDimensionId;
  business: number;
  industryMedian: number;
  topQuartile: number;
}

// ---------------------------------------------------------------------------
// Activity & Alerts
// ---------------------------------------------------------------------------

export type ActivityType =
  | 'document_upload'
  | 'score_change'
  | 'alert'
  | 'report_generated'
  | 'assessment_complete'
  | 'document_verified'
  | 'insight_generated';

export type AlertSeverity = 'info' | 'warning' | 'critical' | 'success';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  severity: AlertSeverity;
  icon: string;
  metadata?: Record<string, string | number>;
  isRead: boolean;
}

// ---------------------------------------------------------------------------
// Financial Passport
// ---------------------------------------------------------------------------

export interface FinancialPassport {
  id: string;
  businessId: string;
  healthScore: HealthScore;
  issuedAt: string;
  expiresAt: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  shareableLink?: string;
  qrCode?: string;
  documents: {
    gstReturns: DocumentStatus;
    bankStatements: DocumentStatus;
    itrFiling: DocumentStatus;
    creditReport: DocumentStatus;
    financialStatements: DocumentStatus;
  };
}

export interface DocumentStatus {
  uploaded: boolean;
  verified: boolean;
  lastUploadDate?: string;
  fileCount: number;
  coveragePeriod?: string;
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// ---------------------------------------------------------------------------
// Dashboard State
// ---------------------------------------------------------------------------

export type TimePeriod = '1M' | '3M' | '6M' | '1Y' | '2Y' | 'ALL';

export interface DashboardFilters {
  timePeriod: TimePeriod;
  compareMode: boolean;
  showBenchmarks: boolean;
}

// ---------------------------------------------------------------------------
// API Response Wrappers
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
