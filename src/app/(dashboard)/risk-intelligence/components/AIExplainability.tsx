'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sparkles, ArrowRight, ArrowDownRight, ArrowUpRight, BrainCircuit, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const featureImportanceData = [
  { feature: 'Recent late payments (30+ days)', importance: 85, type: 'negative' },
  { feature: 'High credit utilization (>75%)', importance: 72, type: 'negative' },
  { feature: 'Declining monthly cash buffer', importance: 64, type: 'negative' },
  { feature: 'Long relationship with bank', importance: -45, type: 'positive' },
  { feature: 'Secured collateral value', importance: -35, type: 'positive' },
];

export function AIExplainability() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" /> Transparent AI Decisioning
          </h3>
          <p className="text-sm text-muted-foreground">Understand exactly why the model generated this prediction.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-background">Model Confidence: 94%</Badge>
          <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">85% Default Prob.</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Feature Importance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Importance Breakdown</CardTitle>
            <CardDescription>Top factors driving the probability score up (risk) or down (safety).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" hide domain={[-100, 100]} />
                  <YAxis dataKey="feature" type="category" fontSize={11} width={150} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: any, name: any, props: any) => [
                      `${Math.abs(value)}% Impact`, 
                      props.payload.type === 'negative' ? 'Increases Risk' : 'Reduces Risk'
                    ]}
                  />
                  <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                    {featureImportanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'negative' ? 'hsl(var(--destructive))' : 'hsl(var(--emerald-500))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Explainability Text */}
        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle>Natural Language Explanation</CardTitle>
            <CardDescription>Plain-text interpretation of model outputs.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm leading-relaxed text-foreground/90 h-full">
              <p className="mb-4">
                The NEXUS AI model predicts an <strong className="text-red-500">85% probability of default</strong> within the next 12 months for this borrower.
              </p>
              <p className="mb-4">
                This high risk score is heavily influenced by a severe drop in <strong>Cash Flow Analysis</strong> metrics, specifically a 42% variance observed over the last quarter. This liquidity crunch directly triggered the <strong>Behaviour Analysis</strong> module to flag two consecutive delayed payments (weighted at 85% importance).
              </p>
              <p>
                However, the model confidence is stabilized by the <strong>Financial Stability</strong> node, which notes that the borrower's <strong>Income Analysis</strong> remains technically stable, and they possess a high-value secured collateral, acting as strong positive buffers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-red-500/20 bg-red-500/5 dark:bg-red-950/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4" /> Top Negative Factors (Risk Drivers)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mt-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start">
                <ArrowDownRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> 
                <span><strong>Liquidity Crunch:</strong> Monthly cash buffer has fallen below EMI amount.</span>
              </li>
              <li className="flex gap-2 items-start">
                <ArrowDownRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> 
                <span><strong>External Debt:</strong> AA data reveals new active loans from NBFCs.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Top Positive Factors (Risk Mitigants)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mt-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start">
                <ArrowUpRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> 
                <span><strong>Asset Backing:</strong> Loan is 140% collateralized with commercial property.</span>
              </li>
              <li className="flex gap-2 items-start">
                <ArrowUpRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> 
                <span><strong>Vintage:</strong> 7-year relationship history with zero prior NPA incidents.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
