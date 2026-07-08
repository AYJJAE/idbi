// =============================================================================
// NEXUS — Extended Business Data (Ownership, Operational Details)
// =============================================================================

export interface OwnershipDetail {
  name: string;
  share: number;
  role: string;
  pan: string;
  din?: string;
}

export interface OperatingLocation {
  type: 'Headquarters' | 'Manufacturing' | 'Warehouse' | 'Branch';
  address: string;
  state: string;
  facilities: string[];
}

export interface ExtendedBusinessProfile {
  businessId: string;
  legalEntity: 'Private Limited' | 'Public Limited' | 'Partnership' | 'Proprietorship' | 'LLP';
  dateOfIncorporation: string;
  cin: string; // Corporate Identification Number
  iec: string; // Import Export Code
  primaryBank: string;
  auditStatus: 'Audited' | 'Pending' | 'Unaudited';
  latestAuditDate: string;
  ownership: OwnershipDetail[];
  locations: OperatingLocation[];
  keyProducts: string[];
}

export const extendedBusinessProfiles: Record<string, ExtendedBusinessProfile> = {
  mfg_pinnacle: {
    businessId: 'mfg_pinnacle',
    legalEntity: 'Private Limited',
    dateOfIncorporation: '2015-03-15',
    cin: 'U29220PN2015PTC154321',
    iec: '0315045678',
    primaryBank: 'HDFC Bank',
    auditStatus: 'Audited',
    latestAuditDate: '2025-09-30',
    ownership: [
      { name: 'Rajesh Sharma', share: 60, role: 'Managing Director', pan: 'ABCDE1234F', din: '01234567' },
      { name: 'Sanjay Verma', share: 40, role: 'Director', pan: 'FGHIJ5678K', din: '07654321' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Plot No 42, MIDC Bhosari', state: 'Maharashtra', facilities: ['Admin Office', 'R&D Lab'] },
      { type: 'Manufacturing', address: 'Shed 15, Chakan Industrial Area', state: 'Maharashtra', facilities: ['Assembly Line', 'CNC Shop', 'Quality Testing'] }
    ],
    keyProducts: ['Precision Engine Valves', 'Hydraulic Cylinders', 'Custom Transmission Gears']
  },
  agr_vedic: {
    businessId: 'agr_vedic',
    legalEntity: 'Public Limited',
    dateOfIncorporation: '2016-04-20',
    cin: 'L01111KL2016PLC043210',
    iec: '1016098765',
    primaryBank: 'State Bank of India',
    auditStatus: 'Audited',
    latestAuditDate: '2025-10-15',
    ownership: [
      { name: 'Ananya Menon', share: 45, role: 'CEO', pan: 'BZXCV9876M', din: '08889999' },
      { name: 'Public Shareholders', share: 55, role: 'Investors', pan: 'NA' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Spice Board Road, Willingdon Island', state: 'Kerala', facilities: ['Admin', 'Export Processing'] },
      { type: 'Warehouse', address: 'Munnar Storage Facility', state: 'Kerala', facilities: ['Cold Storage', 'Sorting'] }
    ],
    keyProducts: ['Organic Cardamom', 'Black Pepper', 'Cinnamon Sticks', 'Turmeric Powder']
  },
  log_logiroute: {
    businessId: 'log_logiroute',
    legalEntity: 'Private Limited',
    dateOfIncorporation: '2017-05-12',
    cin: 'U60231HR2017PTC054321',
    iec: '0517012345',
    primaryBank: 'ICICI Bank',
    auditStatus: 'Audited',
    latestAuditDate: '2025-08-20',
    ownership: [
      { name: 'Vikram Singh', share: 100, role: 'Sole Proprietor (Converted to Pvt Ltd)', pan: 'QWERT5432Y', din: '09998888' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Udyog Vihar Phase IV', state: 'Haryana', facilities: ['Command Center', 'Fleet Management'] },
      { type: 'Warehouse', address: 'NH-8 Logistics Hub', state: 'Haryana', facilities: ['Cold Chain Storage', 'Cross-docking'] },
      { type: 'Branch', address: 'Mumbai Port Hub', state: 'Maharashtra', facilities: ['Port Operations'] }
    ],
    keyProducts: ['Cold Chain Transport', 'Pharmaceutical Logistics', 'Last-mile FMCG Delivery']
  },
  hc_medvantage: {
    businessId: 'hc_medvantage',
    legalEntity: 'LLP',
    dateOfIncorporation: '2018-06-18',
    cin: 'AAB-1234',
    iec: '0818054321',
    primaryBank: 'Axis Bank',
    auditStatus: 'Audited',
    latestAuditDate: '2025-09-10',
    ownership: [
      { name: 'Dr. Meera Reddy', share: 50, role: 'Designated Partner', pan: 'ASDFG6789H' },
      { name: 'Dr. Rohan Kumar', share: 50, role: 'Designated Partner', pan: 'ZXCVB1234J' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Indiranagar 100ft Road', state: 'Karnataka', facilities: ['Central Reference Lab', 'Admin'] },
      { type: 'Branch', address: 'Koramangala Clinic', state: 'Karnataka', facilities: ['Sample Collection', 'Basic Diagnostics'] },
      { type: 'Branch', address: 'Whitefield Clinic', state: 'Karnataka', facilities: ['Sample Collection', 'Imaging'] }
    ],
    keyProducts: ['Advanced Blood Diagnostics', 'MRI & CT Scans', 'Corporate Health Checkups']
  },
  ret_aura: {
    businessId: 'ret_aura',
    legalEntity: 'Partnership',
    dateOfIncorporation: '2019-07-22',
    cin: 'NA',
    iec: '0719098765',
    primaryBank: 'Kotak Mahindra Bank',
    auditStatus: 'Pending',
    latestAuditDate: '2024-09-30',
    ownership: [
      { name: 'Neha Gupta', share: 70, role: 'Managing Partner', pan: 'POIUY0987T' },
      { name: 'Amit Jain', share: 30, role: 'Partner', pan: 'LKJHGF4321R' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Connaught Place', state: 'Delhi', facilities: ['Flagship Store', 'Admin'] },
      { type: 'Branch', address: 'South Ex Market', state: 'Delhi', facilities: ['Retail Outlet'] },
      { type: 'Warehouse', address: 'Okhla Phase 2', state: 'Delhi', facilities: ['Inventory Storage'] }
    ],
    keyProducts: ['Designer Ethnic Wear', 'Bridal Collections', 'Accessories']
  },
  it_zenith: {
    businessId: 'it_zenith',
    legalEntity: 'Private Limited',
    dateOfIncorporation: '2015-08-05',
    cin: 'U72200TG2015PTC087654',
    iec: '1215045678',
    primaryBank: 'Yes Bank',
    auditStatus: 'Audited',
    latestAuditDate: '2025-10-05',
    ownership: [
      { name: 'Siddharth Rao', share: 80, role: 'Founder & CEO', pan: 'MNBVC5678X', din: '04445555' },
      { name: 'Venture Capital Fund I', share: 20, role: 'Investor', pan: 'VCINF1234Z' }
    ],
    locations: [
      { type: 'Headquarters', address: 'HITEC City', state: 'Telangana', facilities: ['Development Center', 'Executive Offices'] },
      { type: 'Branch', address: 'Pune IT Park', state: 'Maharashtra', facilities: ['Development Center'] }
    ],
    keyProducts: ['ERP Implementation', 'Cloud Migration Services', 'Custom FinTech Platforms']
  },
  agr_greenharvest: {
    businessId: 'agr_greenharvest',
    legalEntity: 'Proprietorship',
    dateOfIncorporation: '2016-09-14',
    cin: 'NA',
    iec: '0916012345',
    primaryBank: 'Bank of Baroda',
    auditStatus: 'Unaudited',
    latestAuditDate: '2024-03-31',
    ownership: [
      { name: 'Harish Patel', share: 100, role: 'Proprietor', pan: 'PLMKO0987N' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Sanand GIDC', state: 'Gujarat', facilities: ['Mixing Plant', 'Admin'] },
      { type: 'Warehouse', address: 'Rajkot Depo', state: 'Gujarat', facilities: ['Distribution Center'] }
    ],
    keyProducts: ['Liquid Bio-fertilizers', 'Neem Coated Urea', 'Micronutrient Blends']
  },
  ret_quickcart: {
    businessId: 'ret_quickcart',
    legalEntity: 'Private Limited',
    dateOfIncorporation: '2017-10-30',
    cin: 'U52100TN2017PTC109876',
    iec: '1017054321',
    primaryBank: 'Standard Chartered',
    auditStatus: 'Audited',
    latestAuditDate: '2025-09-25',
    ownership: [
      { name: 'Lakshmi Narayanan', share: 60, role: 'Managing Director', pan: 'IJNBH6543V', din: '02223333' },
      { name: 'Retail Ventures LLC', share: 40, role: 'Foreign Investor', pan: 'FIILL8765C' }
    ],
    locations: [
      { type: 'Headquarters', address: 'T. Nagar', state: 'Tamil Nadu', facilities: ['Corporate Office'] },
      { type: 'Branch', address: 'Velachery Mall', state: 'Tamil Nadu', facilities: ['Hypermarket'] },
      { type: 'Branch', address: 'Anna Nagar', state: 'Tamil Nadu', facilities: ['Supermarket'] },
      { type: 'Warehouse', address: 'Sriperumbudur', state: 'Tamil Nadu', facilities: ['FMCG Distribution Hub'] }
    ],
    keyProducts: ['Groceries', 'FMCG Goods', 'Fresh Produce', 'Electronics']
  },
  log_express: {
    businessId: 'log_express',
    legalEntity: 'Partnership',
    dateOfIncorporation: '2018-11-11',
    cin: 'NA',
    iec: '1118098765',
    primaryBank: 'IndusInd Bank',
    auditStatus: 'Audited',
    latestAuditDate: '2025-08-30',
    ownership: [
      { name: 'Amitabh Sen', share: 50, role: 'Partner', pan: 'YTREW3210Q' },
      { name: 'Subhash Bose', share: 50, role: 'Partner', pan: 'HGFDS0987A' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Salt Lake Sector V', state: 'West Bengal', facilities: ['Sorting Hub', 'Admin'] },
      { type: 'Branch', address: 'Howrah Station Depo', state: 'West Bengal', facilities: ['Rail Transit Hub'] }
    ],
    keyProducts: ['Same-day City Delivery', 'E-commerce Returns Management', 'Bulk Document Courier']
  },
  mfg_apex: {
    businessId: 'mfg_apex',
    legalEntity: 'Private Limited',
    dateOfIncorporation: '2019-12-05',
    cin: 'U28112TZ2019PTC123456',
    iec: '1219012345',
    primaryBank: 'HDFC Bank',
    auditStatus: 'Audited',
    latestAuditDate: '2025-10-10',
    ownership: [
      { name: 'Karthik Subramaniam', share: 75, role: 'Managing Director', pan: 'VCDER5678X', din: '06667777' },
      { name: 'Priya Karthik', share: 25, role: 'Director', pan: 'BGTRE4321Z', din: '06667778' }
    ],
    locations: [
      { type: 'Headquarters', address: 'Peelamedu Industrial Estate', state: 'Tamil Nadu', facilities: ['Foundry', 'Admin'] },
      { type: 'Manufacturing', address: 'Coimbatore Auto Hub', state: 'Tamil Nadu', facilities: ['Machining Center', 'Assembly'] }
    ],
    keyProducts: ['Aluminium Die Castings', 'Engine Blocks', 'Transmission Housings']
  }
};
