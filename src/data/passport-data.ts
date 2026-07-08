// =============================================================================
// NEXUS — Financial Passport Verification Data
// =============================================================================

export interface PassportVerification {
  id: string;
  type: 'Identity' | 'Statutory' | 'Banking' | 'Credit';
  provider: string;
  status: 'Verified' | 'Pending' | 'Failed';
  verifiedAt: string;
  confidenceScore: number; // 0-100
  referenceNumber: string;
}

export interface FinancialPassport {
  businessId: string;
  passportId: string;
  issueDate: string;
  expiryDate: string;
  overallVerificationScore: number;
  digitalSignature: string;
  verifications: PassportVerification[];
  blockchainHash: string;
}

export const passportData: Record<string, FinancialPassport> = {
  mfg_pinnacle: {
    businessId: 'mfg_pinnacle',
    passportId: 'NEX-PASS-2025-MFG-001',
    issueDate: '2025-01-15',
    expiryDate: '2026-01-14',
    overallVerificationScore: 98,
    digitalSignature: 'SIG-VER-9988776655',
    blockchainHash: '0x3a4b9c...8f2d',
    verifications: [
      { id: 'v1', type: 'Identity', provider: 'UIDAI / MCA', status: 'Verified', verifiedAt: '2025-01-10', confidenceScore: 100, referenceNumber: 'MCA-ID-776' },
      { id: 'v2', type: 'Statutory', provider: 'GSTN', status: 'Verified', verifiedAt: '2025-01-12', confidenceScore: 99, referenceNumber: 'GST-VAL-112' },
      { id: 'v3', type: 'Banking', provider: 'Account Aggregator (Sahamati)', status: 'Verified', verifiedAt: '2025-01-14', confidenceScore: 98, referenceNumber: 'AA-CONSENT-991' },
      { id: 'v4', type: 'Credit', provider: 'CIBIL / Experian', status: 'Verified', verifiedAt: '2025-01-15', confidenceScore: 95, referenceNumber: 'CIB-REQ-334' },
    ]
  },
  agr_vedic: {
    businessId: 'agr_vedic',
    passportId: 'NEX-PASS-2025-AGR-002',
    issueDate: '2025-02-20',
    expiryDate: '2026-02-19',
    overallVerificationScore: 96,
    digitalSignature: 'SIG-VER-1122334455',
    blockchainHash: '0x1c8f3e...9a4b',
    verifications: [
      { id: 'v1', type: 'Identity', provider: 'UIDAI / MCA', status: 'Verified', verifiedAt: '2025-02-18', confidenceScore: 100, referenceNumber: 'MCA-ID-882' },
      { id: 'v2', type: 'Statutory', provider: 'GSTN', status: 'Verified', verifiedAt: '2025-02-19', confidenceScore: 98, referenceNumber: 'GST-VAL-223' },
      { id: 'v3', type: 'Banking', provider: 'Account Aggregator (Sahamati)', status: 'Verified', verifiedAt: '2025-02-20', confidenceScore: 92, referenceNumber: 'AA-CONSENT-887' },
      { id: 'v4', type: 'Credit', provider: 'CIBIL / Experian', status: 'Verified', verifiedAt: '2025-02-20', confidenceScore: 94, referenceNumber: 'EXP-REQ-112' },
    ]
  },
  // Default fallback for others
  default: {
    businessId: 'default',
    passportId: 'NEX-PASS-PENDING',
    issueDate: '2025-01-01',
    expiryDate: '2026-01-01',
    overallVerificationScore: 85,
    digitalSignature: 'PENDING-SIG',
    blockchainHash: '0x...',
    verifications: [
      { id: 'v1', type: 'Identity', provider: 'UIDAI / MCA', status: 'Verified', verifiedAt: '2025-01-01', confidenceScore: 95, referenceNumber: 'MCA-ID-000' },
      { id: 'v2', type: 'Statutory', provider: 'GSTN', status: 'Pending', verifiedAt: '-', confidenceScore: 0, referenceNumber: 'PENDING' },
      { id: 'v3', type: 'Banking', provider: 'Account Aggregator', status: 'Pending', verifiedAt: '-', confidenceScore: 0, referenceNumber: 'PENDING' },
    ]
  }
};
