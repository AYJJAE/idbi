'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Sparkles, Home, Car, Wallet, Briefcase, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const recommendations = [
  {
    product: 'Home Loan',
    icon: <Home className="h-6 w-6 text-primary" />,
    probability: 92,
    amount: '₹75,00,000',
    tenure: '20 Years',
    emi: '₹64,500',
    interest: '8.40% - 8.65%',
    reason: 'Customer has searched for properties and has high rent outflow (₹25k) which can be converted to EMI.',
    recommended: true
  },
  {
    product: 'Personal Loan',
    icon: <Wallet className="h-6 w-6 text-primary" />,
    probability: 98,
    amount: '₹12,00,000',
    tenure: '5 Years',
    emi: '₹26,000',
    interest: '10.50% - 11.25%',
    reason: 'Excellent credit score and FOIR allows for instant pre-approved personal loan disbursement.',
    recommended: false
  },
  {
    product: 'Vehicle Loan',
    icon: <Car className="h-6 w-6 text-primary" />,
    probability: 95,
    amount: '₹15,00,000',
    tenure: '7 Years',
    emi: '₹24,000',
    interest: '8.80% - 9.10%',
    reason: 'Current auto loan is completing next month, prime time for vehicle upgrade pitch.',
    recommended: false
  }
];

export function LoanRecommendations() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Smart Product Recommendations</h3>
          <p className="text-sm text-muted-foreground">AI-matched banking products based on intent and capacity.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((rec, i) => (
          <Card key={i} className={`relative flex flex-col ${rec.recommended ? 'border-primary shadow-md' : ''}`}>
            {rec.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="h-3 w-3" /> Top Match
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-primary/10 rounded-xl">
                  {rec.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{rec.probability}%</span>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Approval Prob.</span>
                </div>
              </div>
              <CardTitle className="text-xl">{rec.product}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Suggested Amount</p>
                  <p className="font-semibold">{rec.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Suggested Tenure</p>
                  <p className="font-semibold">{rec.tenure}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Estimated EMI</p>
                  <p className="font-semibold">{rec.emi}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Interest Range</p>
                  <p className="font-semibold text-primary">{rec.interest}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" /> AI Reasoning
                </p>
                <p className="text-sm leading-snug">{rec.reason}</p>
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-6">
              <Button className="w-full" variant={rec.recommended ? 'default' : 'outline'}>
                Initiate Application
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* AI Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            AI Cross-Sell Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              The primary recommendation is a <strong>Home Loan</strong> due to the high probability of conversion driven by behavioral intent signals (property site visits, EMI calculator usage). 
            </p>
            <p>
              <strong>Next Best Action:</strong> Once the Home Loan is sanctioned, automatically pitch a bundled <em>Home Insurance</em> and a <em>Credit Card</em> with a waiver on the first-year fee. The customer's strong repayment capacity supports an additional ₹1.5L unsecured limit.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
