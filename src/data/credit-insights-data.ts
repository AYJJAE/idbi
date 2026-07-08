// =============================================================================
// NEXUS — Extended Credit & Insights Mock Data
// =============================================================================

export const creditData: Record<string, any> = {
  mfg_pinnacle: {
    readinessScore: 88,
    maxEligibleAmount: 25000000, // 2.5 Cr
    currentDebt: 5000000,
    dscr: 1.8, // Debt Service Coverage Ratio
    creditUtilization: 45,
    recommendedProducts: [
      { id: 'p1', name: 'Working Capital Term Loan', amount: 15000000, rate: 10.5, likelihood: 'High' },
      { id: 'p2', name: 'Machinery Finance', amount: 8000000, rate: 9.5, likelihood: 'High' },
      { id: 'p3', name: 'Invoice Discounting Line', amount: 5000000, rate: 11.0, likelihood: 'Medium' }
    ],
    eligibilityFactors: [
      { factor: 'Vintage', status: 'Strong', description: '> 5 Years in operation' },
      { factor: 'Revenue Growth', status: 'Strong', description: 'Consistent YoY growth > 10%' },
      { factor: 'Credit Bureau', status: 'Moderate', description: 'CIBIL Score 740, 1 delayed payment in 2023' },
      { factor: 'Collateral', status: 'Strong', description: 'Factory premises owned' }
    ],
    simulatorDefaults: { interestRate: 10.5, tenureMonths: 36, amount: 10000000 }
  },
  default: {
    readinessScore: 55,
    maxEligibleAmount: 1000000, // 10 Lakhs
    currentDebt: 2000000,
    dscr: 1.1,
    creditUtilization: 85,
    recommendedProducts: [
      { id: 'p1', name: 'Micro-loan (CGTMSE)', amount: 1000000, rate: 14.0, likelihood: 'Medium' }
    ],
    eligibilityFactors: [
      { factor: 'Vintage', status: 'Moderate', description: '3 Years in operation' },
      { factor: 'Revenue Growth', status: 'Weak', description: 'Stagnant revenue' },
      { factor: 'Credit Bureau', status: 'Weak', description: 'No credit history' }
    ],
    simulatorDefaults: { interestRate: 14, tenureMonths: 12, amount: 500000 }
  }
};

export const insightsData: Record<string, any> = {
  mfg_pinnacle: {
    riskRadar: [
      { subject: 'Market Risk', A: 80, fullMark: 100 },
      { subject: 'Operational Risk', A: 40, fullMark: 100 },
      { subject: 'Financial Risk', A: 30, fullMark: 100 },
      { subject: 'Compliance Risk', A: 10, fullMark: 100 },
      { subject: 'Supply Chain Risk', A: 60, fullMark: 100 },
    ],
    timeline: [
      { year: '2015', event: 'Incorporation & MSME Registration' },
      { year: '2017', event: 'First GST Filing (Migration)' },
      { year: '2019', event: 'Crossed ₹1Cr Turnover' },
      { year: '2022', event: 'Factory Expansion & Machinery Loan' },
      { year: '2024', event: 'Zero Default Milestone (5 Yrs)' },
    ],
    benchmarks: [
      { metric: 'Operating Margin', business: 15, industryAvg: 12 },
      { metric: 'Inventory Turnover', business: 8, industryAvg: 6 },
      { metric: 'Debtor Days', business: 42, industryAvg: 55 },
      { metric: 'Debt/Equity', business: 0.8, industryAvg: 1.5 },
    ]
  },
  default: {
    riskRadar: [
      { subject: 'Market Risk', A: 50, fullMark: 100 },
      { subject: 'Operational Risk', A: 50, fullMark: 100 },
      { subject: 'Financial Risk', A: 70, fullMark: 100 },
      { subject: 'Compliance Risk', A: 60, fullMark: 100 },
      { subject: 'Supply Chain Risk', A: 50, fullMark: 100 },
    ],
    timeline: [
      { year: '2023', event: 'Incorporation' },
      { year: '2024', event: 'GST Registration' }
    ],
    benchmarks: [
      { metric: 'Operating Margin', business: 5, industryAvg: 10 },
      { metric: 'Inventory Turnover', business: 4, industryAvg: 6 },
      { metric: 'Debtor Days', business: 60, industryAvg: 45 },
    ]
  }
};

export const adminData = {
  users: [
    { id: 'u1', name: 'Admin User', role: 'Super Admin', status: 'Active', lastLogin: 'Just now' },
    { id: 'u2', name: 'Credit Analyst', role: 'Analyst', status: 'Active', lastLogin: '2 hrs ago' },
    { id: 'u3', name: 'Risk Officer', role: 'Manager', status: 'Inactive', lastLogin: '5 days ago' }
  ],
  auditLogs: [
    { id: 'log1', action: 'GST Sync Requested', user: 'Admin User', timestamp: '2025-01-22 10:00 AM' },
    { id: 'log2', action: 'Report Exported', user: 'Credit Analyst', timestamp: '2025-01-21 04:30 PM' },
    { id: 'log3', action: 'System Login', user: 'Admin User', timestamp: '2025-01-20 09:00 AM' }
  ],
  apiIntegrations: [
    { provider: 'GSTN', status: 'Connected', uptime: '99.9%', latency: '120ms' },
    { provider: 'Sahamati AA', status: 'Connected', uptime: '100%', latency: '85ms' },
    { provider: 'CIBIL', status: 'Warning', uptime: '95%', latency: '400ms' },
    { provider: 'UIDAI', status: 'Connected', uptime: '99.9%', latency: '60ms' }
  ]
};
