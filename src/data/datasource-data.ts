// =============================================================================
// NEXUS — Extended Data Sources Integration Mock Data
// =============================================================================

export const gstData: Record<string, any> = {
  mfg_pinnacle: {
    gstin: '27AAAAA1000A1Z1',
    status: 'Active',
    filingFrequency: 'Monthly',
    lastFiled: '2025-01-20',
    totalInputTaxCredit: 450000,
    totalTaxLiability: 520000,
    invoicesMatched: 98,
    discrepancies: 2,
    latestGstr3b: 'Filed',
    latestGstr1: 'Filed',
    monthlyTrend: [
      { month: 'Jan', outward: 2100000, inward: 1500000 },
      { month: 'Feb', outward: 2200000, inward: 1600000 },
      { month: 'Mar', outward: 2500000, inward: 1800000 },
    ]
  },
  default: {
    gstin: 'PENDING',
    status: 'Inactive',
    filingFrequency: 'Quarterly',
    lastFiled: '2024-12-20',
    totalInputTaxCredit: 0,
    totalTaxLiability: 0,
    invoicesMatched: 0,
    discrepancies: 0,
    latestGstr3b: 'Pending',
    latestGstr1: 'Pending',
    monthlyTrend: []
  }
};

export const upiData: Record<string, any> = {
  mfg_pinnacle: {
    vpa: 'pinnacle@okicici',
    merchantId: 'MID-123456789',
    status: 'Active',
    dailyLimit: 500000,
    totalTransactions30d: 450,
    totalVolume30d: 1250000,
    successRate: 99.2,
    averageTicketSize: 2777,
    disputes: 1,
    dailyTrend: [
      { day: 'Mon', count: 12 }, { day: 'Tue', count: 15 },
      { day: 'Wed', count: 18 }, { day: 'Thu', count: 14 },
      { day: 'Fri', count: 20 }, { day: 'Sat', count: 5 }, { day: 'Sun', count: 2 }
    ]
  },
  default: {
    vpa: 'Not Configured',
    merchantId: 'N/A',
    status: 'Inactive',
    dailyLimit: 0,
    totalTransactions30d: 0,
    totalVolume30d: 0,
    successRate: 0,
    averageTicketSize: 0,
    disputes: 0,
    dailyTrend: []
  }
};

export const aggregatorData: Record<string, any> = {
  mfg_pinnacle: {
    consentId: 'AA-CONSENT-9912',
    status: 'Active',
    fipCount: 3,
    fips: ['HDFC Bank', 'ICICI Bank', 'SBI'],
    dataRange: '01/01/2024 - 31/12/2024',
    lastFetch: '2025-01-22T08:30:00Z',
    frequency: 'Daily',
    accountsLinked: [
      { mask: 'XX45', type: 'Current', bank: 'HDFC Bank' },
      { mask: 'XX89', type: 'CC/OD', bank: 'ICICI Bank' }
    ]
  },
  default: {
    consentId: 'Pending',
    status: 'Inactive',
    fipCount: 0,
    fips: [],
    dataRange: '-',
    lastFetch: '-',
    frequency: '-',
    accountsLinked: []
  }
};

export const epfoData: Record<string, any> = {
  mfg_pinnacle: {
    establishmentId: 'MH/BAN/12345',
    status: 'Compliant',
    activeMembers: 87,
    lastChallanDate: '2025-01-15',
    lastChallanAmount: 125000,
    totalUANs: 95,
    aadhaarSeeded: 87,
    recentChallans: [
      { month: 'Dec 2024', amount: 125000, trrn: '123456789012', status: 'Paid' },
      { month: 'Nov 2024', amount: 122000, trrn: '123456789013', status: 'Paid' },
      { month: 'Oct 2024', amount: 120000, trrn: '123456789014', status: 'Paid' },
    ]
  },
  default: {
    establishmentId: 'Not Linked',
    status: 'Unknown',
    activeMembers: 0,
    lastChallanDate: '-',
    lastChallanAmount: 0,
    totalUANs: 0,
    aadhaarSeeded: 0,
    recentChallans: []
  }
};
