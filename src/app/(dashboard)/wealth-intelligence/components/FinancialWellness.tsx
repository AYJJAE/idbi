'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, PiggyBank, TrendingUp, CreditCard, ShieldAlert, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle } from 'lucide-react';

const savingsGrowthData = [
  { month: 'Jan', amount: 450000 },
  { month: 'Feb', amount: 485000 },
  { month: 'Mar', amount: 510000 },
  { month: 'Apr', amount: 560000 },
  { month: 'May', amount: 595000 },
  { month: 'Jun', amount: 645000 },
];

const spendingData = [
  { name: 'Housing', value: 35 },
  { name: 'Food & Dining', value: 20 },
  { name: 'Transportation', value: 15 },
  { name: 'Shopping', value: 10 },
  { name: 'Utilities', value: 10 },
  { name: 'Entertainment', value: 10 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--primary)/0.8)', 'hsl(var(--primary)/0.6)', 'hsl(var(--primary)/0.4)', 'hsl(var(--muted-foreground))', 'hsl(var(--muted))'];

export function FinancialWellness() {
  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        {/* Wellness Score */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 border-primary/20 bg-gradient-to-b from-primary/10 to-transparent">
          <NexusScoreRing score={780} maxScore={900} size="lg" />
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-center">Financial Wellness</h3>
          <p className="text-xs text-muted-foreground text-center mt-1">Excellent standing</p>
        </Card>

        {/* Sub-scores */}
        <div className="md:col-span-3 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <PiggyBank className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-emerald-600 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">92/100</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Savings Score</p>
                <p className="text-xl font-bold">Excellent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-0.5 rounded">85/100</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Investment Score</p>
                <p className="text-xl font-bold">Strong</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <CreditCard className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-amber-600 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded">68/100</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Debt Score</p>
                <p className="text-xl font-bold">Fair</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <ShieldAlert className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-emerald-600 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">100/100</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Emergency Fund</p>
                <p className="text-xl font-bold">Optimal</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Savings Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Growth (YTD)</CardTitle>
            <CardDescription>Consistent month-over-month wealth accumulation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--emerald-500))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--emerald-500))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatCurrency} fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Total Savings']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="hsl(var(--emerald-500))" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spending Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Discipline</CardTitle>
            <CardDescription>Monthly expense distribution across categories.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="h-[220px] w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`${value}%`, '']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {spendingData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assessment */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            AI Wealth Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="h-4 w-4" /> Financial Strengths
              </strong>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2 items-start"><ArrowUpRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Emergency fund covers 8 months of living expenses.</span></li>
                <li className="flex gap-2 items-start"><ArrowUpRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Savings rate is 32%, well above the recommended 20%.</span></li>
              </ul>
            </div>
            <div>
              <strong className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                <AlertCircle className="h-4 w-4" /> Areas for Improvement
              </strong>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2 items-start"><ArrowDownRight className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /> <span>Credit card utilization on the secondary card is high (65%).</span></li>
                <li className="flex gap-2 items-start"><ArrowDownRight className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /> <span>Too much cash sitting idle in savings account (₹6.4L) losing to inflation.</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/10">
            <p className="text-sm font-medium">Recommended Action:</p>
            <p className="text-sm text-muted-foreground mt-1">Deploy ₹3L from the savings account into a liquid mutual fund or short-term FD to improve the overall investment yield without compromising liquidity.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
