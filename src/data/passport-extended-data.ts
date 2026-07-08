// =============================================================================
// NEXUS — Extended Financial Passport Data Generator for 10 MSMEs
// =============================================================================

import { mockBusinesses } from './mock-data';

export interface ScoreExplanation {
  title: string;
  score: number;
  weight: number;
  formula: string;
  factors: {
    positive: string[];
    negative: string[];
  };
  sources: string[];
  confidence: number;
  evidence: string;
  history: string;
}

export interface RelationshipNode {
  id: string;
  label: string;
  type: 'business' | 'owner' | 'director' | 'bank' | 'gst' | 'upi' | 'epfo' | 'customer' | 'supplier' | 'loan' | 'asset' | 'invoice' | 'branch' | 'employee';
  details: string;
  status?: 'active' | 'verified' | 'normal' | 'flagged';
}

export interface RelationshipLink {
  source: string;
  target: string;
  label: string;
  animated: boolean;
  value?: number;
}

export interface PassportTimelineEvent {
  year: number;
  date: string;
  type: 'registration' | 'revenue' | 'loan' | 'employee' | 'compliance' | 'milestone' | 'insight' | 'risk' | 'funding';
  title: string;
  description: string;
  metric?: string;
}

export interface PassportDocument {
  id: string;
  type: 'GST' | 'UPI' | 'EPFO' | 'Bank Statement' | 'Invoice' | 'Utility Bill' | 'Tax Return';
  name: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  lastUpdated: string;
  source: string;
  confidence: number;
  aiSummary: string;
}

export interface RiskProfileMetric {
  id: string;
  label: string;
  score: number; // 0-100 (high = safe, low = risky)
  trend: 'improving' | 'stable' | 'deteriorating';
  history: number[];
  explanation: string;
  action: string;
}

export interface IndustryBenchmark {
  metric: string;
  business: number;
  industryAvg: number;
  top10: number;
  regionalAvg: number;
  nationalAvg: number;
  similarSize: number;
  revenueBracket: number;
}

export interface ExecutiveSummaryReport {
  overview: string;
  financialPosition: string;
  businessHealth: string;
  creditWorthiness: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  opportunities: string[];
  recommendation: string;
}

export interface ExtendedPassport {
  businessId: string;
  identity: {
    cin: string;
    age: number;
    businessType: string;
    operationalStatus: string;
    verificationStatus: string;
  };
  header: {
    healthScore: number;
    creditReadiness: number;
    confidenceScore: number;
    riskClassification: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Minimal Risk';
    recommendedCreditLimit: string;
    loanCategory: string;
    industryRank: string;
    nationalPercentile: number;
    regionalRank: string;
    growthRating: 'A+' | 'A' | 'B+' | 'B' | 'C';
  };
  dna: {
    revenue: number;
    compliance: number;
    liquidity: number;
    growth: number;
    trust: number;
    cashFlow: number;
    digitalAdoption: number;
    operationalStability: number;
  };
  explainability: Record<string, ScoreExplanation>;
  relationshipGraph: {
    nodes: RelationshipNode[];
    links: RelationshipLink[];
  };
  timeline: PassportTimelineEvent[];
  documents: PassportDocument[];
  risks: RiskProfileMetric[];
  benchmarks: IndustryBenchmark[];
  evolution: {
    days30: number[];
    days90: number[];
    year1: number[];
    year3: number[];
    labels30: string[];
    labels90: string[];
    labels1Y: string[];
    labels3Y: string[];
  };
  executiveSummary: ExecutiveSummaryReport;
}

// Generate the database mapping
export const extendedPassportData: Record<string, ExtendedPassport> = {};

mockBusinesses.forEach((biz, index) => {
  const isExcellent = index % 3 === 0;
  const isAverage = index % 3 === 1;

  const baseScore = isExcellent ? 810 + (index % 5) * 10 : isAverage ? 690 + (index % 5) * 12 : 580 + (index % 5) * 15;
  const growthRate = isExcellent ? 24 + (index % 5) : isAverage ? 12 + (index % 3) : 5 + (index % 4);

  const confidenceScore = 92 + (index % 8);
  const creditReadiness = Math.round(baseScore / 9.5 + (index % 4) * 2);

  const limitNum = Math.round((biz.annualTurnover * 0.15 * (baseScore / 600)) / 100000) * 100000;
  const recommendedCreditLimit = `₹${(limitNum / 100000).toFixed(1)} Lakhs`;

  extendedPassportData[biz.id] = {
    businessId: biz.id,
    identity: {
      cin: `U${2010 + (index % 10)}MH${2010 + (index % 10)}PTC${200000 + index * 100}`,
      age: 2026 - parseInt(biz.incorporationDate.split('-')[0]),
      businessType: biz.annualTurnover > 30000000 ? 'Private Limited' : 'Partnership Firm',
      operationalStatus: 'Active & Operating',
      verificationStatus: baseScore > 700 ? 'Fully Verified' : 'Provisionally Verified',
    },
    header: {
      healthScore: baseScore,
      creditReadiness,
      confidenceScore,
      riskClassification: baseScore > 780 ? 'Minimal Risk' : baseScore > 680 ? 'Low Risk' : 'Moderate Risk',
      recommendedCreditLimit,
      loanCategory: baseScore > 750 ? 'Prime Secured / Unsecured Lines' : 'Standard Working Capital Loan',
      industryRank: `#${12 + index} of 412`,
      nationalPercentile: Math.min(99, Math.round((baseScore / 900) * 100)),
      regionalRank: `#${4 + index} of 145`,
      growthRating: baseScore > 800 ? 'A+' : baseScore > 720 ? 'A' : baseScore > 640 ? 'B+' : 'B',
    },
    dna: {
      revenue: Math.round(75 + (index % 5) * 5),
      compliance: Math.round(80 + (index % 4) * 6),
      liquidity: Math.round(70 + (index % 6) * 4),
      growth: Math.round(65 + (index % 7) * 5),
      trust: Math.round(85 + (index % 3) * 7),
      cashFlow: Math.round(60 + (index % 5) * 8),
      digitalAdoption: Math.round(78 + (index % 4) * 5),
      operationalStability: Math.round(72 + (index % 6) * 5),
    },
    explainability: {
      healthScore: {
        title: 'Financial Health Score',
        score: baseScore,
        weight: 100,
        formula: 'Overall score = 0.25 * Profitability + 0.20 * Liquidity + 0.20 * Solvency + 0.20 * Growth + 0.15 * Efficiency',
        factors: {
          positive: ['Robust compliance history with timely GSTR filing', 'Optimal asset turnover ratios relative to peers'],
          negative: ['Slight increase in working capital cycle days in Q1']
        },
        sources: ['GSTN Direct API', 'Linked Bank Statements (Account Aggregator)', 'EPFO Dashboard'],
        confidence: confidenceScore,
        evidence: 'Digital signature hash verified on MCA registry matching verified GSTIN.',
        history: 'Consistent positive trend over last 3 quarters (increased by +45 pts)'
      },
      creditReadiness: {
        title: 'Credit Readiness Score',
        score: creditReadiness,
        weight: 35,
        formula: 'Credit Readiness = 0.40 * Cash Debt Coverage + 0.30 * Leverage Ratio + 0.30 * Payment Discipline',
        factors: {
          positive: ['Zero bank cheque bounces in the last 12 months', 'Consistent debt service coverage ratio (DSCR) above 1.75'],
          negative: ['Utilisation of cash credit limits is currently at 78%']
        },
        sources: ['CIBIL commercial report pull', 'NeSL debt registry database'],
        confidence: 96,
        evidence: 'Active limits registered under bank accounts showing timely repayment cycles.',
        history: 'DSR improved due to reduction of short-term unsecured high-interest credit.'
      },
      compliance: {
        title: 'Compliance Track Score',
        score: Math.round(80 + (index % 4) * 6),
        weight: 15,
        formula: 'Compliance Score = 0.60 * GST Filing Delay Penalty + 0.40 * EPFO Delay Count',
        factors: {
          positive: ['100% GSTR-3B filings completed within due date', 'EPFO premium paid on-time for average 92 employees'],
          negative: ['1 day delay recorded in GSTR-1 filing in November 2025']
        },
        sources: ['GSTN tax portal database', 'EPFO India endpoint'],
        confidence: 99,
        evidence: 'Verified online filing receipts generated directly from GSTN authority.',
        history: 'Maintained 95+ score for last 2 years.'
      }
    },
    relationshipGraph: {
      nodes: [
        { id: 'biz', label: biz.name, type: 'business', details: `Sector: ${biz.sector} | Turnover: ${recommendedCreditLimit}`, status: 'active' },
        { id: 'owner', label: 'Mr. Arvind Sharma', type: 'owner', details: 'Promoter & Managing Director (51% Equity)', status: 'verified' },
        { id: 'director1', label: 'Ms. Priyanjali Sen', type: 'director', details: 'Finance Director (24% Equity)', status: 'verified' },
        { id: 'bank1', label: 'State Bank of India', type: 'bank', details: 'Primary CC Account & Term Loan Provider', status: 'verified' },
        { id: 'bank2', label: 'HDFC Bank', type: 'bank', details: 'Secondary Current Account', status: 'verified' },
        { id: 'gst', label: 'GSTN Gateway', type: 'gst', details: `GSTIN: ${biz.gstin}`, status: 'verified' },
        { id: 'upi', label: 'NPCI UPI Merchant', type: 'upi', details: 'Merchant ID: nexus.upi@sbi', status: 'verified' },
        { id: 'epfo', label: 'EPFO Central Portal', type: 'epfo', details: `Est ID: ${biz.udyamNumber.replace('UDYAM', 'EPF')}`, status: 'verified' },
        { id: 'cust1', label: 'Tata Motors Ltd', type: 'customer', details: 'Enterprise Customer - 35% revenue share', status: 'normal' },
        { id: 'cust2', label: 'Bharat Forge Ltd', type: 'customer', details: 'Enterprise Customer - 18% revenue share', status: 'normal' },
        { id: 'sup1', label: 'Jindal Steel & Power', type: 'supplier', details: 'Raw Steel Supply Partner', status: 'normal' },
        { id: 'sup2', label: 'Sandvik Tooling India', type: 'supplier', details: 'CNC Tooling Equipment Supplier', status: 'normal' },
        { id: 'loan1', label: 'SBI CC Limit (₹1.5Cr)', type: 'loan', details: 'Active CC Account - Bal ₹85L', status: 'verified' },
        { id: 'asset1', label: 'Pune Factory Unit', type: 'asset', details: 'Industrial Property & CNC Machinery', status: 'verified' }
      ],
      links: [
        { source: 'owner', target: 'biz', label: 'Controls', animated: true, value: 51 },
        { source: 'director1', target: 'biz', label: 'Manages Finance', animated: false, value: 24 },
        { source: 'biz', target: 'bank1', label: 'Primary Banker', animated: true },
        { source: 'biz', target: 'bank2', label: 'Secondary Banker', animated: false },
        { source: 'biz', target: 'gst', label: 'Tax Filings', animated: true },
        { source: 'biz', target: 'upi', label: 'Daily Settlements', animated: true },
        { source: 'biz', target: 'epfo', label: 'Staff Savings', animated: true },
        { source: 'biz', target: 'cust1', label: 'Supplies Parts', animated: true },
        { source: 'biz', target: 'cust2', label: 'Supplies Parts', animated: true },
        { source: 'sup1', target: 'biz', label: 'Supplies Metal', animated: true },
        { source: 'sup2', target: 'biz', label: 'Supplies Tools', animated: false },
        { source: 'bank1', target: 'loan1', label: 'Issued Credit', animated: true },
        { source: 'biz', target: 'loan1', label: 'Owes Payment', animated: true },
        { source: 'biz', target: 'asset1', label: 'Owns Land/Machinery', animated: false }
      ]
    },
    timeline: [
      { year: 2018, date: '2018-04-12', type: 'registration', title: 'Company Incorporation', description: `Registered as Private Limited entity under MCA Registrar of Companies with capital ₹50L.` },
      { year: 2018, date: '2018-05-01', type: 'registration', title: 'GST Registration', description: `Obtained GSTIN registration for primary manufacturing unit.` },
      { year: 2020, date: '2020-09-15', type: 'funding', title: 'Seed Debt Funding', description: `Secured Machinery Term Loan of ₹60L from SIDBI for expanding automation floor.` },
      { year: 2021, date: '2021-03-31', type: 'revenue', title: 'Revenue Milestone: ₹5 Cr', description: `Annual revenue crossed the ₹5 Crores mark despite pandemic supply disruptions.`, metric: '₹5.2 Cr' },
      { year: 2022, date: '2022-07-10', type: 'employee', title: 'Employee Expansion', description: `Workforce headcount crossed 50 full-time PF-registered employees.`, metric: '55 Staff' },
      { year: 2023, date: '2023-11-20', type: 'loan', title: 'Working Capital Limit Enhancement', description: `SBI Cash Credit limit enhanced from ₹75L to ₹1.5Cr based on robust cash flow.` },
      { year: 2024, date: '2024-05-15', type: 'compliance', title: 'Compliance Excellence Award', description: `Recognized for continuous perfect score compliance filings with zero delayed months.` },
      { year: 2025, date: '2025-01-15', type: 'milestone', title: 'NEXUS Passport Activation', description: `Initiated verification flow on NEXUS. Overall health score measured at ${baseScore}.` },
      { year: 2026, date: '2026-03-01', type: 'insight', title: 'AI Insight: Market Shift', description: `AI system noticed positive export index shifts, advising credit limit buffer increase.` }
    ],
    documents: [
      { id: 'd1', type: 'GST', name: 'GSTR-3B filings (FY25-26)', status: 'Verified', lastUpdated: '2026-07-05', source: 'GSTN Taxpayer API Portal', confidence: 100, aiSummary: 'Displays ₹3.4 Cr total taxable supply. Tax liability fully discharged with nil defaults.' },
      { id: 'd2', type: 'Bank Statement', name: 'SBI Current Account 12-Month', status: 'Verified', lastUpdated: '2026-07-07', source: 'Sahamati AA Consent Framework', confidence: 98, aiSummary: 'Total credits of ₹4.82 Cr, average balance maintained at ₹18.5L. Debt service ratio at 1.85.' },
      { id: 'd3', type: 'EPFO', name: 'EPF ECR filings (June 2026)', status: 'Verified', lastUpdated: '2026-07-02', source: 'EPFO Portal direct integration', confidence: 99, aiSummary: 'Contributions verified for 87 active employees. Total payment of ₹1.42L cleared.' },
      { id: 'd4', type: 'Tax Return', name: 'ITR-6 Acknowledgment (AY 2025-26)', status: 'Verified', lastUpdated: '2025-10-30', source: 'Income Tax Dept e-filing site', confidence: 100, aiSummary: 'Net taxable income of ₹48.5L declared. Tax fully paid, refund of ₹1.2L adjusted.' },
      { id: 'd5', type: 'UPI', name: 'UPI Merchant Settlements', status: 'Verified', lastUpdated: '2026-07-08', source: 'NPCI UPI Gateway node', confidence: 95, aiSummary: 'Daily average transaction volume of 340 payments, totaling average ₹1.8L daily settlements.' }
    ],
    risks: [
      { id: 'r1', label: 'Operational Risk', score: Math.round(75 + (index % 4) * 4), trend: 'stable', history: [74, 75, 75, 76], explanation: 'High plant utilisation with low down-time. Risk is mitigated by active maintenance contracts.', action: 'Continue weekly preventive scheduling for machinery.' },
      { id: 'r2', label: 'Liquidity Risk', score: Math.round(68 + (index % 5) * 5), trend: 'improving', history: [62, 65, 66, 68], explanation: 'Cash balance covers 2.2 months of operational overheads. Improving collections.', action: 'Review customer collection periods and shorten trade credit where possible.' },
      { id: 'r3', label: 'Compliance Risk', score: Math.round(88 + (index % 3) * 3), trend: 'stable', history: [88, 89, 88, 88], explanation: 'Strong regulatory record. GST filing and PF payments are fully automated.', action: 'Periodically run internal audits to match invoice numbers against GSTR-2B.' },
      { id: 'r4', label: 'Market Risk', score: Math.round(62 + (index % 6) * 4), trend: 'deteriorating', history: [68, 66, 64, 62], explanation: 'Rising raw material prices (steel & tools) put minor pressure on operational profitability margins.', action: 'Consider entering into longer term supply contracts or index prices with buyers.' },
      { id: 'r5', label: 'Credit Risk', score: Math.round(78 + (index % 4) * 3), trend: 'improving', history: [72, 74, 76, 78], explanation: 'Very low leverage, strong debt-servicing ability, and zero payment delays on existing term loan.', action: 'Utilise standard trade credit lines rather than high-interest short term advances.' }
    ],
    benchmarks: [
      { metric: 'Operating Margin', business: 18.7 + (index % 5) * 0.5, industryAvg: 14.2, top10: 22.5, regionalAvg: 15.0, nationalAvg: 14.5, similarSize: 16.2, revenueBracket: 15.8 },
      { metric: 'Current Ratio', business: 1.85 + (index % 4) * 0.05, industryAvg: 1.45, top10: 2.10, regionalAvg: 1.50, nationalAvg: 1.48, similarSize: 1.60, revenueBracket: 1.55 },
      { metric: 'Quick Ratio', business: 1.25 + (index % 4) * 0.05, industryAvg: 0.95, top10: 1.45, regionalAvg: 1.00, nationalAvg: 0.98, similarSize: 1.10, revenueBracket: 1.05 },
      { metric: 'Debt to Equity', business: 0.42 + (index % 3) * 0.03, industryAvg: 0.85, top10: 0.35, regionalAvg: 0.80, nationalAvg: 0.82, similarSize: 0.75, revenueBracket: 0.78 },
      { metric: 'Asset Turnover', business: 2.1 + (index % 4) * 0.1, industryAvg: 1.6, top10: 2.6, regionalAvg: 1.7, nationalAvg: 1.65, similarSize: 1.8, revenueBracket: 1.85 }
    ],
    evolution: {
      days30: [baseScore - 5, baseScore - 3, baseScore - 2, baseScore - 1, baseScore],
      days90: [baseScore - 15, baseScore - 12, baseScore - 8, baseScore - 4, baseScore],
      year1: [baseScore - 45, baseScore - 30, baseScore - 22, baseScore - 10, baseScore],
      year3: [baseScore - 95, baseScore - 70, baseScore - 42, baseScore - 15, baseScore],
      labels30: ['Day 1', 'Day 7', 'Day 14', 'Day 21', 'Day 30'],
      labels90: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
      labels1Y: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
      labels3Y: ['FY 2023-24', 'FY 2024-25', 'FY 2025-26', 'FY 2026-27']
    },
    executiveSummary: {
      overview: `${biz.name} is a leading ${biz.subSector} operating in ${biz.city}, ${biz.state}. Incorporated in ${biz.incorporationDate}, the company exhibits strong operating structures with a dedicated workforce of ${biz.employeeCount} staff.`,
      financialPosition: `With an annual revenue turnover of ${biz.annualTurnover / 10000000} Cr, the financial position is highly liquid. Debt-to-equity is well controlled at 0.42x, indicating a solid equity base with minimum risk of capital default.`,
      businessHealth: `The overall Financial Health score is ${baseScore}/900, placing the business in the ${Math.min(99, Math.round((baseScore / 900) * 100))}th percentile nationally. Cash flow records indicate stable customer collections and strong recurring working capital reserves.`,
      creditWorthiness: `The company qualifies for prime-rate funding with a recommended credit limit of ${recommendedCreditLimit}. Leverage indices suggest clean credit histories across key institutional lenders.`,
      strengths: [
        'Robust revenue growth rate representing strong market demand',
        'Top-quartile profit margins within the manufacturing sector',
        '100% clean regulatory filing compliance on EPFO and GSTN portals'
      ],
      weaknesses: [
        'Raw material price pressure affecting operating margins slightly',
        'Concentrated customer profile with top buyer representing 35% of sales'
      ],
      risks: [
        'Supply chain delays from domestic tool suppliers',
        'Interest rate changes affecting the variable CC limit rate'
      ],
      opportunities: [
        'Establish long-term supply arrangements to lock in raw metal prices',
        'Expand exports to Middle-East regions to lower domestic concentration risk'
      ],
      recommendation: `Recommended for immediate upgrade to Prime Secured Credit limits. Issue low-interest working capital credit lines to support machinery purchase options.`
    }
  };
});
