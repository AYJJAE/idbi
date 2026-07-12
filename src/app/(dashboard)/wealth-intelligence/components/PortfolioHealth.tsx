'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, Briefcase, TrendingUp, ShieldCheck, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const performanceData = [
  { month: 'Jan', value: 12500000 },
  { month: 'Feb', value: 12800000 },
  { month: 'Mar', value: 12400000 },
  { month: 'Apr', value: 13200000 },
  { month: 'May', value: 13500000 },
  { month: 'Jun', value: 14200000 },
  { month: 'Jul', value: 14800000 },
];

const allocationData = [
  { name: 'Mutual Funds', value: 45 },
  { name: 'Direct Equity', value: 25 },
  { name: 'Fixed Deposits', value: 15 },
  { name: 'Gold', value: 10 },
  { name: 'Cash', value: 5 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--primary)/0.7)', 'hsl(var(--muted-foreground))', 'hsl(var(--amber-500))', 'hsl(var(--emerald-500))'];

export function PortfolioHealth() {
  const formatCurrencyLabel = (val: number) => `₹${(val / 10000000).toFixed(1)}Cr`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        {/* Main Score Card */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 border-primary/20 bg-primary/5 relative overflow-hidden">
          <NexusScoreRing score={810} maxScore={900} size="lg" />
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-center">Portfolio Health</h3>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Well diversified & performing above benchmark.
          </p>
        </Card>

        {/* Top Metrics */}
        <div className="md:col-span-3 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Total AUM</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">₹1.48 Cr</p>
                <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +18.4% YoY</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Activity className="h-4 w-4 text-emerald-600" />
                </div>
                <Badge variant="secondary" className="text-[10px]">XIRR</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">14.2%</p>
                <p className="text-xs text-muted-foreground mt-1">Annualized Return</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <PieChartIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Diversification</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">High</p>
                <p className="text-xs text-muted-foreground mt-1">Across 5 asset classes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Risk Profile</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">Moderate</p>
                <p className="text-xs text-muted-foreground mt-1">70% Equity / 30% Debt</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Performance Trend */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trend (YTD)</CardTitle>
            <CardDescription>Aggregate portfolio valuation tracking.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatCurrencyLabel} fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Valuation']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPerformance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current exposure across categories.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${value}%`, '']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))', zIndex: 50 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold">100%</span>
                <span className="text-[10px] text-muted-foreground uppercase">Allocated</span>
              </div>
            </div>
            
            <div className="w-full mt-4 space-y-2.5">
              {allocationData.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            AI Portfolio Diagnostics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Your portfolio is well-structured and aligns perfectly with a <strong>Moderate Risk Profile</strong>. The recent outperformance is driven largely by your Mutual Fund SIPs in the Mid-Cap segment.
            </p>
            <div className="p-4 mt-3 rounded-lg bg-background border border-border shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-500/10 mt-0.5">
                <ShieldCheck className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Risk Alert: Direct Equity Concentration</h4>
                <p className="text-muted-foreground mt-1">Your Direct Equity portfolio (25%) is heavily concentrated in the Financial Services sector (over 60% of equity holdings). Consider rebalancing towards FMCG or IT to hedge against sector-specific volatility.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
