'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Sparkles, Home, GraduationCap, Plane, Briefcase, Plus, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GOALS = [
  {
    id: 1,
    name: 'Buy a House',
    icon: <Home className="h-5 w-5 text-emerald-500" />,
    targetAmount: 7500000,
    currentSavings: 4875000,
    monthlyContribution: 45000,
    projectedCompletion: 'Oct 2026',
    status: 'On Track',
    color: 'bg-emerald-500'
  },
  {
    id: 2,
    name: 'Child Education',
    icon: <GraduationCap className="h-5 w-5 text-indigo-500" />,
    targetAmount: 5000000,
    currentSavings: 1200000,
    monthlyContribution: 15000,
    projectedCompletion: 'Mar 2032',
    status: 'Behind',
    color: 'bg-indigo-500'
  },
  {
    id: 3,
    name: 'Retirement Corpus',
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    targetAmount: 50000000,
    currentSavings: 8500000,
    monthlyContribution: 65000,
    projectedCompletion: 'Jan 2045',
    status: 'On Track',
    color: 'bg-primary'
  },
  {
    id: 4,
    name: 'European Vacation',
    icon: <Plane className="h-5 w-5 text-amber-500" />,
    targetAmount: 500000,
    currentSavings: 150000,
    monthlyContribution: 25000,
    projectedCompletion: 'May 2025',
    status: 'Ahead',
    color: 'bg-amber-500'
  }
];

export function GoalPlanner() {
  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold">AI-Powered Goal Planner</h3>
          <p className="text-sm text-muted-foreground">Track and optimize your financial aspirations.</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1.5" /> Create New Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {GOALS.map((goal) => {
          const progress = (goal.currentSavings / goal.targetAmount) * 100;
          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-background rounded-xl border border-border/50 shadow-sm">
                      {goal.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{goal.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5 mt-0.5">
                        <Calendar className="h-3.5 w-3.5" /> Target: {goal.projectedCompletion}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    goal.status === 'On Track' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                    goal.status === 'Behind' ? 'border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' :
                    'border-primary/20 bg-primary/10 text-primary'
                  }>
                    {goal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(goal.currentSavings)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Saved of {formatCurrency(goal.targetAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">₹{goal.monthlyContribution.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Monthly SIP</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{progress.toFixed(0)}% Completed</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div className={`${goal.color} h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </CardContent>
              {goal.status === 'Behind' && (
                <CardFooter className="bg-amber-50/50 dark:bg-amber-950/10 p-3 px-5 border-t border-amber-100 dark:border-amber-900/30">
                  <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> AI Tip: Increase SIP by ₹4,500/mo to get back on track.
                  </p>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>

      {/* Scenario Comparison & AI Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            AI Goal Optimization & Scenario Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Your portfolio is heavily skewed towards large-cap equities. For long-term goals like <strong>Retirement</strong> and <strong>Child Education</strong>, introducing a 15% mid-cap allocation could accelerate your timeline by 2.4 years based on historical risk-adjusted returns.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  Current Trajectory
                </h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between"><span>Avg. Portfolio Yield:</span> <span>10.5% p.a.</span></div>
                  <div className="flex justify-between"><span>Retirement Target Hit:</span> <span>Jan 2045</span></div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">AI Optimized</div>
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4" />
                  Optimized Scenario
                </h4>
                <div className="space-y-2 text-foreground/80">
                  <div className="flex justify-between"><span>Expected Yield:</span> <span className="font-medium text-emerald-600 dark:text-emerald-400">12.8% p.a.</span></div>
                  <div className="flex justify-between"><span>Retirement Target Hit:</span> <span className="font-medium text-emerald-600 dark:text-emerald-400">Aug 2042</span></div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3 h-8 border-primary/30 text-primary">Apply AI Rebalancing</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
