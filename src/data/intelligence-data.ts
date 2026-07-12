// =============================================================================
// NEXUS — Extended Intelligence Data (Revenue, Cash Flow, Compliance, Payments, Workforce)
// =============================================================================

export interface RevenueData {
  businessId: string;
  monthlyRevenue: { month: string; value: number }[];
  seasonalityScore: number;
  yoyGrowth: number;
  revenueByProduct: { name: string; value: number }[];
}

export interface ComplianceData {
  businessId: string;
  gstFilings: { period: string; status: 'Filed On Time' | 'Delayed' | 'Pending'; delayDays: number }[];
  complianceScore: number;
  activeViolations: number;
  itrStatus: string;
}

export interface PaymentBehaviourData {
  businessId: string;
  debtorDays: number;
  creditorDays: number;
  onTimePaymentRate: number; // percentage
  supplierPaymentHistory: { supplier: string; averageDelay: number }[];
}

export interface WorkforceData {
  businessId: string;
  totalEmployees: number;
  epfoCompliance: number; // percentage
  monthlyAdditions: { month: string; added: number; left: number }[];
  averageSalary: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const intelligenceData: Record<string, any> = {
  mfg_pinnacle: {
    revenue: {
      monthlyRevenue: [
        { month: 'Jan', value: 2100000 }, { month: 'Feb', value: 2200000 },
        { month: 'Mar', value: 2500000 }, { month: 'Apr', value: 1900000 },
        { month: 'May', value: 2000000 }, { month: 'Jun', value: 2300000 }
      ],
      seasonalityScore: 45,
      yoyGrowth: 12.5,
      revenueByProduct: [
        { name: 'Engine Valves', value: 45 },
        { name: 'Hydraulic Cylinders', value: 30 },
        { name: 'Transmission Gears', value: 25 }
      ]
    },
    compliance: {
      gstFilings: [
        { period: 'Jan 2025', status: 'Filed On Time', delayDays: 0 },
        { period: 'Dec 2024', status: 'Filed On Time', delayDays: 0 },
        { period: 'Nov 2024', status: 'Delayed', delayDays: 4 },
        { period: 'Oct 2024', status: 'Filed On Time', delayDays: 0 }
      ],
      complianceScore: 92,
      activeViolations: 0,
      itrStatus: 'Filed (AY 24-25)'
    },
    payments: {
      debtorDays: 42,
      creditorDays: 35,
      onTimePaymentRate: 88,
      supplierPaymentHistory: [
        { supplier: 'Tata Steel', averageDelay: 2 },
        { supplier: 'Bharat Forge', averageDelay: 5 },
        { supplier: 'Local Vendors', averageDelay: 12 }
      ]
    },
    workforce: {
      totalEmployees: 87,
      epfoCompliance: 100,
      monthlyAdditions: [
        { month: 'Jan', added: 2, left: 1 },
        { month: 'Feb', added: 0, left: 0 },
        { month: 'Mar', added: 4, left: 2 }
      ],
      averageSalary: 35000
    }
  },
  agr_vedic: {
    revenue: {
      monthlyRevenue: [
        { month: 'Jan', value: 800000 }, { month: 'Feb', value: 950000 },
        { month: 'Mar', value: 1200000 }, { month: 'Apr', value: 1500000 },
        { month: 'May', value: 1400000 }, { month: 'Jun', value: 1100000 }
      ],
      seasonalityScore: 85,
      yoyGrowth: 22.4,
      revenueByProduct: [
        { name: 'Cardamom', value: 60 },
        { name: 'Black Pepper', value: 25 },
        { name: 'Other Spices', value: 15 }
      ]
    },
    compliance: {
      gstFilings: [
        { period: 'Jan 2025', status: 'Filed On Time', delayDays: 0 },
        { period: 'Dec 2024', status: 'Filed On Time', delayDays: 0 },
        { period: 'Nov 2024', status: 'Filed On Time', delayDays: 0 },
        { period: 'Oct 2024', status: 'Filed On Time', delayDays: 0 }
      ],
      complianceScore: 98,
      activeViolations: 0,
      itrStatus: 'Filed (AY 24-25)'
    },
    payments: {
      debtorDays: 15, // Exports usually have better realization
      creditorDays: 20,
      onTimePaymentRate: 95,
      supplierPaymentHistory: [
        { supplier: 'Farmer Cooperatives', averageDelay: 0 },
        { supplier: 'Packaging Co', averageDelay: 2 }
      ]
    },
    workforce: {
      totalEmployees: 24,
      epfoCompliance: 95,
      monthlyAdditions: [
        { month: 'Jan', added: 5, left: 0 }, // Harvesting season
        { month: 'Feb', added: 2, left: 0 },
        { month: 'Mar', added: 0, left: 1 }
      ],
      averageSalary: 18000
    }
  },
  // Default structure for others
  default: {
    revenue: {
      monthlyRevenue: [
        { month: 'Jan', value: 1000000 }, { month: 'Feb', value: 1050000 },
        { month: 'Mar', value: 1100000 }, { month: 'Apr', value: 1080000 },
        { month: 'May', value: 1120000 }, { month: 'Jun', value: 1150000 }
      ],
      seasonalityScore: 10,
      yoyGrowth: 5.0,
      revenueByProduct: [
        { name: 'Primary Service', value: 80 },
        { name: 'Secondary Service', value: 20 }
      ]
    },
    compliance: {
      gstFilings: [
        { period: 'Jan 2025', status: 'Pending', delayDays: 0 },
        { period: 'Dec 2024', status: 'Delayed', delayDays: 15 },
        { period: 'Nov 2024', status: 'Filed On Time', delayDays: 0 },
      ],
      complianceScore: 75,
      activeViolations: 1,
      itrStatus: 'Pending (AY 24-25)'
    },
    payments: {
      debtorDays: 60,
      creditorDays: 45,
      onTimePaymentRate: 60,
      supplierPaymentHistory: [
        { supplier: 'General Vendor 1', averageDelay: 15 },
        { supplier: 'General Vendor 2', averageDelay: 8 }
      ]
    },
    workforce: {
      totalEmployees: 50,
      epfoCompliance: 80,
      monthlyAdditions: [
        { month: 'Jan', added: 1, left: 1 },
        { month: 'Feb', added: 2, left: 1 }
      ],
      averageSalary: 25000
    }
  }
};
