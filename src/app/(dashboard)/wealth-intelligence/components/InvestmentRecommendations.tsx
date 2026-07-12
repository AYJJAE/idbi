'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, TrendingUp, ShieldCheck, Zap, LineChart, BookmarkPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const recommendations = [
  {
    fundName: 'NEXUS Alpha Bluechip Fund',
    type: 'Large Cap Mutual Fund',
    icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
    risk: 'Moderate',
    expectedReturn: '12.5% p.a.',
    horizon: '5+ Years',
    minSIP: '₹2,500',
    reason: 'Perfect fit for your core retirement corpus. Offers stable compounding with lower volatility compared to mid-caps.',
    suitability: 'Core Portfolio',
    recommended: true
  },
  {
    fundName: 'NEXUS Tech Opportunities ETF',
    type: 'Sectoral ETF',
    icon: <Zap className="h-6 w-6 text-primary" />,
    risk: 'High',
    expectedReturn: '16.0% p.a.',
    horizon: '3-5 Years',
    minSIP: '₹5,000',
    reason: 'Strategic satellite allocation. Designed to capture the upcoming IT sector rebound you asked about yesterday.',
    suitability: 'Satellite Portfolio',
    recommended: false
  },
  {
    fundName: 'Corporate Bond Fund',
    type: 'Debt Fund',
    icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
    risk: 'Low',
    expectedReturn: '7.8% p.a.',
    horizon: '1-3 Years',
    minSIP: '₹1,000',
    reason: 'Ideal for parking your ₹3L surplus cash. Higher post-tax yield than your savings account with instant liquidity.',
    suitability: 'Cash Management',
    recommended: false
  }
];

export function InvestmentRecommendations() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">AI Investment Curation</h3>
          <p className="text-sm text-muted-foreground">Hyper-personalized funds matching your risk profile and surplus cash.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((rec, i) => (
          <Card key={i} className={`relative flex flex-col ${rec.recommended ? 'border-primary shadow-md' : ''}`}>
            {rec.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Sparkles className="h-3 w-3" /> Top AI Match
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-muted/50 rounded-xl border border-border">
                  {rec.icon}
                </div>
                <Badge variant={rec.risk === 'High' ? 'destructive' : rec.risk === 'Moderate' ? 'default' : 'secondary'}>
                  {rec.risk} Risk
                </Badge>
              </div>
              <CardTitle className="text-xl leading-tight">{rec.fundName}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{rec.type}</p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm bg-muted/30 p-3 rounded-lg border border-border/50">
                <div>
                  <p className="text-muted-foreground text-xs">Exp. Returns</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">{rec.expectedReturn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Horizon</p>
                  <p className="font-semibold">{rec.horizon}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Min. SIP</p>
                  <p className="font-semibold">{rec.minSIP}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Allocation</p>
                  <p className="font-semibold text-primary">{rec.suitability}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" /> Why this fits you
                </p>
                <p className="text-sm leading-snug">{rec.reason}</p>
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-6 flex gap-2">
              <Button className="flex-1" variant={rec.recommended ? 'default' : 'outline'}>
                Invest Now
              </Button>
              <Button size="icon" variant="outline" className="shrink-0 text-muted-foreground hover:text-primary">
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* AI Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <LineChart className="h-4 w-4" />
            Simulated Portfolio Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Executing the <strong>Top AI Match</strong> (NEXUS Alpha Bluechip Fund) via a ₹15,000 monthly SIP will successfully rebalance your portfolio&apos;s Large-Cap allocation from 42% to the target 55% over the next 14 months.
            </p>
            <p className="text-muted-foreground">
              This action alone is projected to reduce your overall portfolio volatility by 1.2% while maintaining your target XIRR of 12.5%.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
