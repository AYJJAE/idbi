'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Users, ShieldAlert } from 'lucide-react';

import { EarlyWarningSystem } from './components/EarlyWarningSystem';
import { LoanHealthScore } from './components/LoanHealthScore';
import { AIExplainability } from './components/AIExplainability';
import { PortfolioRiskHeatmap } from './components/PortfolioRiskHeatmap';
import { ScenarioSimulator } from './components/ScenarioSimulator';

const TABS = [
  { id: 'ews', label: 'Early Warning System' },
  { id: 'health', label: 'Loan Health Score' },
  { id: 'explainability', label: 'AI Explainability' },
  { id: 'heatmap', label: 'Portfolio Risk Heatmap' },
  { id: 'simulator', label: 'Scenario Simulator' },
];

export default function RiskIntelligencePage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ews': return <EarlyWarningSystem />;
      case 'health': return <LoanHealthScore />;
      case 'explainability': return <AIExplainability />;
      case 'heatmap': return <PortfolioRiskHeatmap />;
      case 'simulator': return <ScenarioSimulator />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Risk Intelligence"
        description="Predictive Probability of Default (PD) modeling, early warning systems, and portfolio stress testing."
      />

      {/* Executive Dashboard Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Portfolio Health Index</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-emerald-600">84.2</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">Stable</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Early Warning Alerts</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">14</span>
                <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">+3 this week</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Loans Under Obs.</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">8.5%</span>
                <span className="text-xs font-medium text-muted-foreground">of active portfolio</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-500/20 bg-red-500/5 dark:bg-red-950/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Expected Defaults</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">1.2%</span>
                <span className="text-xs font-medium text-red-600 bg-red-500/10 px-1.5 py-0.5 rounded">-0.3% vs Q1</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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
                layoutId="active-tab-indicator-risk"
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
