'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useBusinessStore } from '@/store/business-store';
import { insightsData } from '@/data/credit-insights-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

export default function IndustryBenchmarksPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = insightsData[currentBusiness.id] || insightsData['default'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Industry Benchmarking"
        description={`Comparative performance analysis against the ${currentBusiness.sector} sector.`}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Performance vs. Industry Averages
          </CardTitle>
          <CardDescription>KPI comparison based on aggregated MSME data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.benchmarks} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="metric" type="category" width={120} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="business" name={`${currentBusiness.name}`} fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="industryAvg" name="Industry Average" fill="hsl(var(--muted-foreground))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.benchmarks.map((bm: any, idx: number) => {
          // Assume for margin/turnover higher is better, for debtor days/debt lower is better
          const isHigherBetter = bm.metric.includes('Margin') || bm.metric.includes('Turnover');
          const isOutperforming = isHigherBetter ? bm.business > bm.industryAvg : bm.business < bm.industryAvg;
          
          return (
            <Card key={idx}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{bm.metric}</p>
                  <p className="text-xs text-muted-foreground mt-1">Industry: {bm.industryAvg}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold">{bm.business}</div>
                  <div className={`p-2 rounded-full ${isOutperforming ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {isOutperforming ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
