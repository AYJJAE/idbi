'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Activity, Percent, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScenarioSimulator() {
  const [revenueChange, setRevenueChange] = useState([0]);
  const [expenseChange, setExpenseChange] = useState([0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [randomVariance, setRandomVariance] = useState(0);

  // Base Metrics
  const baseMetrics = {
    pd: 2.4,
    health: 780,
    risk: 'Low',
    readiness: 'High',
  };

  // Simulated Metrics
  const simMetrics = {
    pd: baseMetrics.pd + (revenueChange[0] < 0 ? Math.abs(revenueChange[0]) * 0.15 : -revenueChange[0] * 0.05) + (expenseChange[0] * 0.1) + randomVariance,
    health: baseMetrics.health + (revenueChange[0] * 1.5) - (expenseChange[0] * 2) - (randomVariance * 10),
  };

  const getRiskCategory = (health: number) => {
    if (health >= 750) return { label: 'Low', color: 'text-emerald-500' };
    if (health >= 600) return { label: 'Medium', color: 'text-amber-500' };
    return { label: 'High', color: 'text-red-500' };
  };

  const simulatedRisk = getRiskCategory(simMetrics.health);

  const handleSimulate = () => {
    setIsSimulating(true);
    setHasSimulated(false);
    setTimeout(() => {
      setRandomVariance((Math.random() * 2) - 1); // Random variance between -1 and +1
      setIsSimulating(false);
      setHasSimulated(true);
    }, 600);
  };

  const reset = () => {
    setRevenueChange([0]);
    setExpenseChange([0]);
    setHasSimulated(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Stress Testing & Simulation Engine
          </h3>
          <p className="text-sm text-muted-foreground">Adjust macroeconomic or individual behavioral parameters to forecast risk impact.</p>
        </div>
        {hasSimulated && (
          <Button variant="outline" size="sm" onClick={reset}>Reset Simulation</Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Parameters Control */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Simulation Parameters</CardTitle>
            <CardDescription>Adjust the levers to simulate stress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Revenue / Salary Change</label>
                <span className={`text-sm font-bold ${revenueChange[0] > 0 ? 'text-emerald-500' : revenueChange[0] < 0 ? 'text-red-500' : ''}`}>
                  {revenueChange[0] > 0 ? '+' : ''}{revenueChange[0]}%
                </span>
              </div>
              <Slider
                value={revenueChange}
                onValueChange={setRevenueChange}
                min={-50}
                max={50}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground text-center">Simulate market slowdown or business expansion.</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Expense Variance</label>
                <span className={`text-sm font-bold ${expenseChange[0] > 0 ? 'text-red-500' : expenseChange[0] < 0 ? 'text-emerald-500' : ''}`}>
                  {expenseChange[0] > 0 ? '+' : ''}{expenseChange[0]}%
                </span>
              </div>
              <Slider
                value={expenseChange}
                onValueChange={setExpenseChange}
                min={-30}
                max={50}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground text-center">Simulate inflation or operational cost spikes.</p>
            </div>

            <div className="pt-4">
              <Button className="w-full" onClick={handleSimulate} disabled={isSimulating}>
                {isSimulating ? 'Recalculating AI Models...' : 'Run Simulation'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Before / After Comparison */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Impact Analysis</CardTitle>
            <CardDescription>Instantaneous recalculation of core risk metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              {/* Before */}
              <div className="md:col-span-3 p-4 rounded-xl border border-border bg-muted/20">
                <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">Current State</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-sm">Probability of Default</span>
                    <span className="font-bold text-emerald-500">{baseMetrics.pd}%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-sm">Loan Health Score</span>
                    <span className="font-bold">{baseMetrics.health}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Category</span>
                    <span className="font-bold text-emerald-500">{baseMetrics.risk}</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-center py-2">
                <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
                <ArrowRight className="h-6 w-6 text-muted-foreground block md:hidden rotate-90" />
              </div>

              {/* After */}
              <div className={`md:col-span-3 p-4 rounded-xl border relative overflow-hidden transition-colors ${hasSimulated ? 'border-primary/40 bg-primary/5 shadow-md' : 'border-border bg-muted/20 opacity-50'}`}>
                {isSimulating && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <h4 className={`text-sm font-bold mb-4 text-center ${hasSimulated ? 'text-primary' : 'text-muted-foreground'}`}>Simulated State</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-sm">Probability of Default</span>
                    <span className={`font-bold transition-all ${hasSimulated && simMetrics.pd > 5 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {hasSimulated ? simMetrics.pd.toFixed(1) : baseMetrics.pd.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-sm">Loan Health Score</span>
                    <span className="font-bold transition-all">
                      {hasSimulated ? Math.max(300, Math.min(900, Math.round(simMetrics.health))) : baseMetrics.health}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Category</span>
                    <span className={`font-bold transition-all ${hasSimulated ? simulatedRisk.color : 'text-emerald-500'}`}>
                      {hasSimulated ? simulatedRisk.label : baseMetrics.risk}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {hasSimulated && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="p-4 rounded-lg bg-background border border-primary/20 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">AI Scenario Analysis</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {simMetrics.pd > 10 
                          ? 'This scenario induces critical systemic stress. The borrower\'s health score drops significantly into the High-Risk category. Recommended action: Do not extend additional credit; consider restructuring existing facilities.' 
                          : 'This scenario is within acceptable variance. The borrower maintains sufficient buffer to service existing debt obligations. No immediate RM intervention is required.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
