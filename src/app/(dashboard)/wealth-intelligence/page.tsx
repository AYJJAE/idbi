'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { motion, AnimatePresence } from 'framer-motion';
import { AIWealthAvatar } from './components/AIWealthAvatar';
import { FinancialWellness } from './components/FinancialWellness';
import { GoalPlanner } from './components/GoalPlanner';
import { PortfolioHealth } from './components/PortfolioHealth';
import { InvestmentRecommendations } from './components/InvestmentRecommendations';

const TABS = [
  { id: 'avatar', label: 'AI Wealth Avatar' },
  { id: 'wellness', label: 'Financial Wellness' },
  { id: 'goals', label: 'Goal Planner' },
  { id: 'portfolio', label: 'Portfolio Health' },
  { id: 'recommendations', label: 'Investment Recommendations' },
];

export default function WealthIntelligencePage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'avatar': return <AIWealthAvatar />;
      case 'wellness': return <FinancialWellness />;
      case 'goals': return <GoalPlanner />;
      case 'portfolio': return <PortfolioHealth />;
      case 'recommendations': return <InvestmentRecommendations />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wealth Intelligence"
        description="Enterprise AI-powered personalized wealth management, portfolio health, and goal planning."
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
                layoutId="active-tab-indicator-wealth"
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
