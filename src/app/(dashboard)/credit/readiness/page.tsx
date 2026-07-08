'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { creditData } from '@/data/credit-insights-data';
import { Download, CheckCircle2, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function CreditReadinessPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = creditData[currentBusiness.id] || creditData['default'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Credit Readiness"
        description="Comprehensive evaluation of the MSME's preparedness for institutional credit."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Readiness Report
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>NEXUS Readiness Score</CardTitle>
            <CardDescription>AI-computed institutional credit fitment</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-40 w-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" 
                  barSize={10} data={[{ value: data.readinessScore, fill: 'hsl(var(--primary))' }]}
                  startAngle={90} endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{data.readinessScore}</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Badge variant="outline" className={data.readinessScore > 75 ? 'text-emerald-500 border-emerald-500/30' : 'text-amber-500 border-amber-500/30'}>
                {data.readinessScore > 75 ? 'Highly Ready' : 'Needs Improvement'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Core Evaluation Factors</CardTitle>
            <CardDescription>Key pillars influencing the readiness score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.eligibilityFactors.map((factor: any, i: number) => (
                <div key={i} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/30">
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {factor.status === 'Strong' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : factor.status === 'Moderate' ? (
                        <ShieldCheck className="h-5 w-5 text-amber-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{factor.factor}</p>
                      <p className="text-xs text-muted-foreground">{factor.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={
                    factor.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-500' : 
                    factor.status === 'Moderate' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                  }>
                    {factor.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
