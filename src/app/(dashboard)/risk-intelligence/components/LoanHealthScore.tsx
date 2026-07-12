'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sparkles, CreditCard, Activity, Briefcase, CalendarCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const historicalPerformanceData = [
  { month: 'Q1', performance: 95 },
  { month: 'Q2', performance: 88 },
  { month: 'Q3', performance: 82 },
  { month: 'Q4', performance: 75 },
  { month: 'Q1 (Cur)', performance: 68 },
];

export function LoanHealthScore() {
  const getBarColor = (val: number) => {
    if (val >= 90) return 'hsl(var(--emerald-500))';
    if (val >= 75) return 'hsl(var(--amber-500))';
    return 'hsl(var(--destructive))';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        {/* Loan Health Score */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 border-primary/20 bg-primary/5">
          <NexusScoreRing score={580} maxScore={900} size="lg" />
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-center">Loan Health Score</h3>
          <Badge variant="outline" className="mt-2 border-amber-500/20 bg-amber-500/10 text-amber-600">Sub-Prime Zone</Badge>
        </Card>

        {/* Top KPIs */}
        <div className="md:col-span-3 grid gap-4 grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-muted rounded-lg">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="text-[10px]">EMI Status</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">2/36</p>
                <p className="text-xs text-muted-foreground mt-1">EMIs Missed/Delayed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Activity className="h-4 w-4 text-amber-600" />
                </div>
                <Badge variant="secondary" className="text-[10px]">DTI Ratio</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-amber-600">62%</p>
                <p className="text-xs text-muted-foreground mt-1">Debt-to-Income (High)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Outstanding</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">₹14.5L</p>
                <p className="text-xs text-muted-foreground mt-1">Of ₹18.0L Disbursed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Historical Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Performance</CardTitle>
            <CardDescription>Quarterly health score tracking.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <RechartsTooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="performance" radius={[4, 4, 0, 0]}>
                    {historicalPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.performance)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Profile & Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Risk Profile</CardTitle>
            <CardDescription>Aggregated metrics influencing the score.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Income Stability Index</span>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">Moderate Variance</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Payment Consistency</span>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">Deteriorating</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Portfolio Contribution</span>
              <span className="text-sm font-semibold">0.45% of branch book</span>
            </div>
            
            <div className="pt-4 flex items-center gap-3">
              <div className="p-3 bg-muted rounded-full">
                <CalendarCheck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Next EMI Due</p>
                <p className="text-xs text-muted-foreground mt-0.5">Aug 5, 2026 (₹45,500)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            AI Loan Diagnostic Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>
              The <strong>Loan Health Score has dropped by 14 points</strong> over the last 30 days, officially crossing into the Sub-Prime risk category. The primary driver is a combination of two consecutive late payments (cleared in grace period) and an elevated DTI ratio stemming from a newly acquired credit line outside of the NEXUS ecosystem.
            </p>
            <p className="text-muted-foreground">
              While the outstanding balance is heavily secured, the behavioral shift signals immediate liquidity stress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
