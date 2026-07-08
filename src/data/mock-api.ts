// =============================================================================
// Mock API Responses for Financial Ecosystem Integrations
// =============================================================================

export const MOCK_API_RESPONSES = {
  '/api/gst/profile': {
    status: 200,
    latency: 350,
    response: {
      gstin: '29ABCDE1234F1Z5',
      legalName: 'ACME TECHNOLOGIES PVT LTD',
      tradeName: 'Acme Tech',
      status: 'Active',
      registrationDate: '2017-07-01',
      taxpayerType: 'Regular',
      centerJurisdiction: 'Bangalore',
      stateJurisdiction: 'Karnataka',
      natureOfBusiness: 'Software Development',
      returnsFiled: 72,
      lastFiling: '2023-11-20',
      complianceScore: 98
    }
  },
  '/api/upi/transactions': {
    status: 200,
    latency: 210,
    response: {
      merchantVpa: 'acmetech@okaxis',
      totalCollections: 1450000.00,
      transactionCount: 1245,
      averageTicketSize: 1164.66,
      currency: 'INR',
      recentTransactions: [
        { id: 'TXN893247923', amount: 5000, date: '2023-12-01T10:30:00Z', status: 'SUCCESS' },
        { id: 'TXN893247924', amount: 12000, date: '2023-12-01T11:45:00Z', status: 'SUCCESS' },
        { id: 'TXN893247925', amount: 350, date: '2023-12-01T14:20:00Z', status: 'FAILED' }
      ]
    }
  },
  '/api/aa/connect': {
    status: 201,
    latency: 850,
    response: {
      consentHandle: 'CON-98A7-4B2C-9F11',
      status: 'PENDING',
      redirectUrl: 'https://demo-aa.onemoney.in/consent/verify?handle=CON-98A7-4B2C-9F11',
      expiresAt: '2023-12-02T10:00:00Z'
    }
  },
  '/api/ocen/loan': {
    status: 202,
    latency: 1200,
    response: {
      loanRequestId: 'LR-202312-000452',
      status: 'PROCESSING',
      message: 'Loan request broadcasted to OCEN network participants. Polling for offers.',
      participantsNotified: 14
    }
  },
  '/api/uli/verify': {
    status: 200,
    latency: 600,
    response: {
      verificationId: 'VER-ULI-7734',
      property: {
        status: 'VERIFIED',
        owner: 'ACME TECHNOLOGIES PVT LTD',
        encumbranceFree: true,
        valuation: 45000000
      },
      income: {
        status: 'VERIFIED',
        annualIncome: 12000000,
        source: 'GST_RETURNS'
      }
    }
  },
  '/api/epfo/payroll': {
    status: 200,
    latency: 420,
    response: {
      establishmentId: 'BGBNG0012345000',
      establishmentName: 'ACME TECHNOLOGIES PVT LTD',
      activeEmployees: 142,
      lastContributionMonth: 'October 2023',
      totalContribution: 456000.00,
      complianceStatus: 'CLEAN'
    }
  }
};

export async function simulateApiRequest(endpoint: string) {
  const match = Object.keys(MOCK_API_RESPONSES).find(key => endpoint.includes(key));
  const defaultResponse = { status: 404, latency: 100, response: { error: 'Not Found' } };
  
  const result = match ? MOCK_API_RESPONSES[match as keyof typeof MOCK_API_RESPONSES] : defaultResponse;
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, result.latency));
  
  return result;
}
