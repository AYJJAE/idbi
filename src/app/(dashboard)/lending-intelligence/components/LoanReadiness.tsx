'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { Sparkles, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const readinessMetrics = [
  { name: 'Credit Stability', score: 92, status: 'Excellent', color: 'bg-emerald-500' },
  { name: 'Income Stability', score: 88, status: 'Strong', color: 'bg-emerald-500' },
  { name: 'Employment Stability', score: 95, status: 'Excellent', color: 'bg-emerald-500' },
  { name: 'Financial Discipline', score: 82, status: 'Good', color: 'bg-emerald-400' },
  { name: 'Cash Flow Health', score: 75, status: 'Fair', color: 'bg-amber-500' },
];

const improvements = [
  { text: 'Increase average monthly bank balance by ₹15,000 to improve Cash Flow Health.', impact: 'High' },
  { text: 'Wait 2 months before applying to avoid multiple hard inquiries recently detected.', impact: 'Medium' },
];

export function LoanReadiness() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Readiness Gauge */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 border-primary/20 bg-primary/5 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
              Pre-Approved Tier
            </Badge>
          </div>
          <NexusScoreRing score={840} maxScore={900} size="xl" />
          <h3 className="mt-6 text-xl font-semibold tracking-tight text-center">Comprehensive Loan Readiness</h3>
          <p className="text-sm text-muted-foreground text-center mt-2 px-4">
            Customer is highly eligible for prime lending rates.
          </p>
        </Card>

        {/* Stability Metrics */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assessment Dimensions</CardTitle>
            <CardDescription>Breakdown of factors contributing to the readiness score.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {readinessMetrics.map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-foreground">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{metric.score}/100</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{metric.status}</Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`${metric.color} h-2 rounded-full`} style={{ width: `${metric.score}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recommended Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Recommended Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvements.map((imp, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-lg border border-border bg-card">
                  <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm">{imp.text}</p>
                    <Badge variant="outline" className="mt-2 text-xs text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900">
                      {imp.impact} Impact
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Approval Confidence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Approval Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">98%</span>
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300 mt-1">Personal Loan</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">92%</span>
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300 mt-1">Home Loan</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">95%</span>
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300 mt-1">Vehicle Loan</span>
              </div>
              <div className="p-4 rounded-xl bg-muted flex flex-col items-center justify-center text-center opacity-70">
                <span className="text-3xl font-bold text-muted-foreground">65%</span>
                <span className="text-xs font-medium text-muted-foreground mt-1">Business Loan</span>
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
            AI Underwriting Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              This profile meets all criteria for "Straight-Through Processing" (STP) for retail unsecured lending up to ₹15L.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <strong className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Strengths</strong>
                <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                  <li>Zero EMI bounces in last 36 months</li>
                  <li>Same employer for 4.5 years</li>
                  <li>Credit utilization below 15%</li>
                </ul>
              </div>
              <div>
                <strong className="text-amber-600 dark:text-amber-400 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Weaknesses</strong>
                <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                  <li>Slightly lower end-of-month bank balance</li>
                  <li>Recent surge in credit card limit inquiries</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
