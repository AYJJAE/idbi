'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerIntent } from './components/CustomerIntent';
import { RepaymentCapacity } from './components/RepaymentCapacity';
import { LoanReadiness } from './components/LoanReadiness';
import { LoanRecommendations } from './components/LoanRecommendations';
import { LeadDashboard } from './components/LeadDashboard';

const TABS = [
  { id: 'intent', label: 'Customer Intent' },
  { id: 'capacity', label: 'Repayment Capacity' },
  { id: 'readiness', label: 'Loan Readiness' },
  { id: 'recommendations', label: 'Loan Recommendations' },
  { id: 'leads', label: 'Lead Dashboard' },
];

export default function LendingIntelligencePage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'intent': return <CustomerIntent />;
      case 'capacity': return <RepaymentCapacity />;
      case 'readiness': return <LoanReadiness />;
      case 'recommendations': return <LoanRecommendations />;
      case 'leads': return <LeadDashboard />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lending Intelligence"
        description="Enterprise-grade workspace for retail lending, prospect assist, and AI product recommendations."
      />

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted/40 p-1.5 rounded-xl w-full overflow-x-auto nexus-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-indicator-lending"
                className="absolute inset-0 bg-background rounded-lg shadow-sm border border-border/50"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
