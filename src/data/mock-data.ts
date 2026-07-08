// =============================================================================
// NEXUS — Realistic Multi-Industry Enterprise Demo Data (10 MSME Profiles)
// =============================================================================

import type {
  Business,
  HealthScore,
  KPIMetric,
  TrendDataPoint,
  CashflowDataPoint,
  ScoreHistoryPoint,
  PeerComparisonData,
  ActivityEvent,
} from '@/types/financial';

// Industry characteristics helper to generate highly realistic, customized profiles
const INDUSTRIES = [
  { id: 'mfg_pinnacle', name: 'Pinnacle Engineering Pvt Ltd', sector: 'Manufacturing', subSector: 'Precision CNC Components', state: 'Maharashtra', city: 'Pune', turnover: 24200000, category: 'Small', employees: 87, score: 742 },
  { id: 'agr_vedic', name: 'Vedic Organics Ltd', sector: 'Agriculture', subSector: 'Organic Spice Exports', state: 'Kerala', city: 'Kochi', turnover: 12500000, category: 'Micro', employees: 24, score: 815 },
  { id: 'log_logiroute', name: 'LogiRoute Logistics', sector: 'Logistics', subSector: 'Cold Chain Trucking', state: 'Haryana', city: 'Gurugram', turnover: 48000000, category: 'Medium', employees: 142, score: 688 },
  { id: 'hc_medvantage', name: 'MedVantage Healthcare', sector: 'Healthcare', subSector: 'Diagnostic Lab Network', state: 'Karnataka', city: 'Bengaluru', turnover: 32000000, category: 'Small', employees: 65, score: 795 },
  { id: 'ret_aura', name: 'Aura Retail Ventures', sector: 'Retail', subSector: 'Apparel Franchise Chain', state: 'Delhi', city: 'New Delhi', turnover: 18000000, category: 'Small', employees: 42, score: 620 },
  { id: 'it_zenith', name: 'Zenith Soft Solutions', sector: 'IT Services', subSector: 'Enterprise SaaS Integration', state: 'Telangana', city: 'Hyderabad', turnover: 85000000, category: 'Medium', employees: 195, score: 840 },
  { id: 'agr_greenharvest', name: 'GreenHarvest Fertilizers', sector: 'Agriculture', subSector: 'Bio-chemical Fertilizers', state: 'Gujarat', city: 'Ahmedabad', turnover: 21000000, category: 'Small', employees: 38, score: 710 },
  { id: 'ret_quickcart', name: 'QuickCart Hypermarkets', sector: 'Retail', subSector: 'Supermarket Operations', state: 'Tamil Nadu', city: 'Chennai', turnover: 95000000, category: 'Medium', employees: 210, score: 665 },
  { id: 'log_express', name: 'ExpressCargo Courier', sector: 'Logistics', subSector: 'Last-Mile Courier Network', state: 'West Bengal', city: 'Kolkata', turnover: 15500000, category: 'Micro', employees: 55, score: 730 },
  { id: 'mfg_apex', name: 'Apex Die-Casting Ltd', sector: 'Manufacturing', subSector: 'Automotive Die-Cast Parts', state: 'Tamil Nadu', city: 'Coimbatore', turnover: 55000000, category: 'Medium', employees: 120, score: 775 },
] as const;

// 1. Build List of 10 Businesses
export const mockBusinesses: Business[] = INDUSTRIES.map((ind, i) => ({
  id: ind.id,
  name: ind.name,
  gstin: `${(27 + i).toString().padStart(2, '0')}AAAAA${(1000 + i).toString()}A1Z${(i % 9) + 1}`,
  pan: `AAAAA${(1000 + i).toString()}A`,
  sector: ind.sector,
  subSector: ind.subSector,
  incorporationDate: `201${5 + (i % 5)}-03-15`,
  registeredAddress: `Building ${42 + i}, Sector ${2 + i}, Industrial Area`,
  city: ind.city,
  state: ind.state,
  pincode: `${400001 + i * 111}`,
  employeeCount: ind.employees,
  annualTurnover: ind.turnover,
  msmeCategory: ind.category as 'Micro' | 'Small' | 'Medium',
  udyamNumber: `UDYAM-${ind.state.substring(0,2).toUpperCase()}-${(27 + i).toString()}-${(100000 + i).toString()}`,
  contactEmail: `finance@${ind.name.toLowerCase().replace(/[^a-z]/g, '')}.in`,
  contactPhone: `+91 98765 ${43210 + i}`,
}));

// 2. Helper to get business details
export function getBusinessById(id: string): Business {
  return mockBusinesses.find((b) => b.id === id) || mockBusinesses[0];
}

// 3. Generate Complete Financial Data Keyed by Business ID
export function getHealthScoreForBusiness(id: string): HealthScore {
  const ind = INDUSTRIES.find((x) => x.id === id) || INDUSTRIES[0];
  const baseScore = ind.score;

  const weights = { liquidity: 20, profitability: 25, solvency: 20, efficiency: 15, growth: 20 };

  const dims = (['liquidity', 'profitability', 'solvency', 'efficiency', 'growth'] as const).map((dimId) => {
    let dimScore = Math.min(100, Math.round(baseScore / 9 + (Math.sin(dimId.length) * 8)));
    if (ind.sector === 'IT Services' && dimId === 'profitability') dimScore = 92;
    if (ind.sector === 'Retail' && dimId === 'efficiency') dimScore = 85;
    if (ind.sector === 'Logistics' && dimId === 'liquidity') dimScore = 60;

    let grade: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Good';
    if (dimScore >= 85) grade = 'Excellent';
    else if (dimScore >= 70) grade = 'Good';
    else if (dimScore >= 50) grade = 'Fair';
    else grade = 'Poor';

    return {
      id: dimId,
      name: dimId.charAt(0).toUpperCase() + dimId.slice(1),
      score: dimScore,
      weight: weights[dimId],
      grade,
      trend: (dimScore % 2 === 0 ? 'up' : 'down') as 'up' | 'down',
      trendValue: parseFloat((Math.random() * 5).toFixed(1)),
      color: dimId === 'liquidity' ? '#3b82f6' : dimId === 'profitability' ? '#10b981' : dimId === 'solvency' ? '#8b5cf6' : dimId === 'efficiency' ? '#f59e0b' : '#06b6d4',
      icon: dimId === 'liquidity' ? 'Droplets' : dimId === 'profitability' ? 'TrendingUp' : dimId === 'solvency' ? 'Shield' : dimId === 'efficiency' ? 'Gauge' : 'Rocket',
      subMetrics: [
        { id: `${dimId}_m1`, name: `${dimId.charAt(0).toUpperCase() + dimId.slice(1)} Index`, value: dimScore / 50, unit: 'x', benchmark: 1.5, benchmarkLabel: 'Industry Median', score: dimScore, trend: 'up' as const, trendValue: 0.1, description: `Key assessment benchmark metric for ${dimId}` },
        { id: `${dimId}_m2`, name: `${dimId.charAt(0).toUpperCase() + dimId.slice(1)} Ratio`, value: dimScore * 1.1, unit: '%', benchmark: 70, benchmarkLabel: 'Benchmark', score: dimScore, trend: 'stable' as const, trendValue: 0, description: `Efficiency indicator for ${dimId}` }
      ],
      aiInsight: `AI analysis validates strong operational structures under ${dimId} for ${ind.name}. Values reflect stable execution.`,
      factors: {
        positive: [`Strong historical performance in ${dimId}`, `Exceeds the ${ind.sector} median`],
        negative: [`Margins under pressure from operational overheads`]
      },
      recommendations: [`Maintain optimization strategies for ${dimId}`, `Review working capital trends quarterly`]
    };
  });

  let overallGrade: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Good';
  if (baseScore >= 800) overallGrade = 'Excellent';
  else if (baseScore >= 650) overallGrade = 'Good';
  else if (baseScore >= 450) overallGrade = 'Fair';
  else overallGrade = 'Poor';

  return {
    overall: baseScore,
    grade: overallGrade,
    percentile: Math.round(baseScore / 10),
    dimensions: dims,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    nextUpdate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    dataCompleteness: 95,
  };
}

export function getKPIMetricsForBusiness(id: string): KPIMetric[] {
  const ind = INDUSTRIES.find((x) => x.id === id) || INDUSTRIES[0];
  const scale = ind.turnover / 24200000;

  return [
    {
      id: 'annual_revenue',
      label: 'Annual Revenue',
      value: ind.turnover,
      formattedValue: `₹${(ind.turnover / 10000000).toFixed(2)} Cr`,
      prefix: '₹',
      trend: 'up',
      trendValue: 12.3,
      trendLabel: '+12.3% YoY',
      icon: 'IndianRupee',
      color: '#10b981',
      sparklineData: [15, 17, 16, 18, 19, 21, 20, 22, 23, 24, 23.5, 24.2].map((x) => x * scale),
    },
    {
      id: 'current_ratio',
      label: 'Current Ratio',
      value: 1.85,
      formattedValue: `${(1.5 + (ind.score % 10) * 0.05).toFixed(2)}x`,
      trend: 'up',
      trendValue: 5.2,
      trendLabel: 'Optimal range',
      icon: 'Scale',
      color: '#3b82f6',
      sparklineData: [1.4, 1.45, 1.5, 1.52, 1.58, 1.62, 1.65, 1.7, 1.75, 1.8, 1.83, 1.85],
    },
    {
      id: 'debt_equity',
      label: 'Debt-to-Equity',
      value: 0.42,
      formattedValue: `${(0.2 + (1000 - ind.score) * 0.0005).toFixed(2)}x`,
      trend: 'stable',
      trendValue: 0.2,
      trendLabel: 'Low Leverage',
      icon: 'Shield',
      color: '#8b5cf6',
      sparklineData: [0.5, 0.48, 0.47, 0.46, 0.45, 0.44, 0.44, 0.43, 0.43, 0.42, 0.42, 0.42],
    },
    {
      id: 'net_margin',
      label: 'Net Margin',
      value: 18.7,
      formattedValue: `${(10 + (ind.score % 20) * 0.5).toFixed(1)}%`,
      trend: 'up',
      trendValue: 2.1,
      trendLabel: 'Growth YoY',
      icon: 'TrendingUp',
      color: '#f59e0b',
      sparklineData: [14, 14.5, 15.2, 15.8, 16, 16.5, 17, 17.5, 18, 18.2, 18.5, 18.7],
    },
  ];
}

// 4. Generate Revenue and Cashflow trend points
export function getRevenueTrendForBusiness(id: string): TrendDataPoint[] {
  const ind = INDUSTRIES.find((x) => x.id === id) || INDUSTRIES[0];
  const monthlyBase = ind.turnover / 12;

  const months = [
    'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026',
    'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'
  ];

  return months.map((m, idx) => {
    // Introduce seasonality factor based on index
    const seasonalFactor = 1 + Math.sin(idx / 1.5) * 0.15;
    const rev = Math.round(monthlyBase * seasonalFactor);
    const exp = Math.round(rev * (0.8 - (ind.score / 15000)));
    return {
      month: `202${idx < 5 ? 5 : 6}-${(idx + 8) % 12 || 12}`,
      label: m,
      revenue: rev,
      expenses: exp,
      profit: rev - exp,
    };
  });
}

export function getCashflowDataForBusiness(id: string): CashflowDataPoint[] {
  const trend = getRevenueTrendForBusiness(id);
  return trend.map((t) => {
    const inflow = Math.round(t.revenue * (0.95 + Math.random() * 0.1));
    const outflow = Math.round(t.expenses * (0.98 + Math.random() * 0.05));
    return {
      month: t.month,
      label: t.label.split(' ')[0],
      inflow,
      outflow,
      net: inflow - outflow,
    };
  });
}

// 5. Build Dynamic Peer Comparison benchmark
export function getPeerComparisonForBusiness(id: string): PeerComparisonData[] {
  const score = getHealthScoreForBusiness(id);
  return score.dimensions.map((d) => ({
    dimension: d.name,
    dimensionId: d.id,
    business: d.score,
    industryMedian: Math.round(d.score * 0.82),
    topQuartile: Math.round(d.score * 0.95),
  }));
}

// 6. Generate Timeline and Activities
export function getTimelineEventsForBusiness(id: string): ActivityEvent[] {
  const ind = INDUSTRIES.find((x) => x.id === id) || INDUSTRIES[0];
  return [
    {
      id: 'evt_1',
      type: 'score_change',
      title: 'Financial Health Score Assessment',
      description: `Active credit assessment updated to ${ind.score} for ${ind.name}. Profile ranks in Top 15% in ${ind.sector}.`,
      timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      severity: 'success',
      icon: 'TrendingUp',
      isRead: false,
    },
    {
      id: 'evt_2',
      type: 'document_verified',
      title: 'GST Filings Verified',
      description: 'GSTR-1 and GSTR-3B filings fetched and verified from portal APIs. Zero mismatches detected.',
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      severity: 'success',
      icon: 'FileCheck',
      isRead: false,
    },
    {
      id: 'evt_3',
      type: 'insight_generated',
      title: 'AI Credit Readiness Analysis',
      description: `Risk model confirms strong solvency markers. Pre-approved credit limits estimated at ₹${(ind.turnover * 0.15 / 100000).toFixed(0)} Lakhs.`,
      timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      severity: 'info',
      icon: 'Sparkles',
      isRead: true,
    },
    {
      id: 'evt_4',
      type: 'alert',
      title: 'Operating Ratio Alert',
      description: 'Monthly cash-inflows reflect slight operational cost pressures from commodity pricing updates.',
      timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      severity: 'warning',
      icon: 'AlertTriangle',
      isRead: true,
    },
  ];
}

// 7. Loan eligibility details
export interface LoanEligibility {
  eligibleAmount: number;
  eligibleTenorMonths: number;
  interestRate: number;
  processingFee: number;
  isEligible: boolean;
  rejectReason?: string;
}

export function getLoanEligibility(id: string): LoanEligibility {
  const ind = INDUSTRIES.find((x) => x.id === id) || INDUSTRIES[0];
  const isEligible = ind.score >= 500;
  return {
    eligibleAmount: Math.round(ind.turnover * 0.25),
    eligibleTenorMonths: 36,
    interestRate: parseFloat((9.5 + (900 - ind.score) * 0.01).toFixed(2)),
    processingFee: 1.0,
    isEligible,
    rejectReason: isEligible ? undefined : 'Credit score falls below minimum lender requirement of 500.',
  };
}

// 8. Scenario simulation data
export interface SimulationResult {
  currentScore: number;
  simulatedScore: number;
  delta: number;
  monthlySavings: number;
  impactMessage: string;
}

export function simulateScenario(id: string, params: { reductionDays: number; extraCredit: number }): SimulationResult {
  const score = getHealthScoreForBusiness(id).overall;
  const delta = Math.round(params.reductionDays * 1.5 - (params.extraCredit > 0 ? 5 : 0));
  return {
    currentScore: score,
    simulatedScore: Math.min(900, score + delta),
    delta,
    monthlySavings: Math.round(params.reductionDays * 8500),
    impactMessage: delta > 0 
      ? `Accelerating receivables by ${params.reductionDays} days optimizes liquidity score and unlocks lower interest options.`
      : 'No score impact detected with current parameter offsets.',
  };
}

export function getScoreHistoryForBusiness(id: string): ScoreHistoryPoint[] {
  const base = getHealthScoreForBusiness(id);
  const overall = base.overall;
  const dims = base.dimensions;

  const quarters = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26', 'Q2 FY26'];
  return quarters.map((q, idx) => {
    const factor = 1 - (5 - idx) * 0.02;
    const getVal = (val: number) => Math.round(val * factor);
    
    return {
      quarter: q,
      label: `Historical data for ${q}`,
      overall: getVal(overall),
      liquidity: getVal(dims.find(d => d.id === 'liquidity')?.score || 70),
      profitability: getVal(dims.find(d => d.id === 'profitability')?.score || 70),
      solvency: getVal(dims.find(d => d.id === 'solvency')?.score || 70),
      efficiency: getVal(dims.find(d => d.id === 'efficiency')?.score || 70),
      growth: getVal(dims.find(d => d.id === 'growth')?.score || 70),
    };
  });
}
