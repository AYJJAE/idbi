'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusinessStore } from '@/store/business-store';
import { insightsData } from '@/data/credit-insights-data';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { EmbeddedAIPanel } from '@/components/embedded-ai-panel';
import { PROMPTS } from '@/services/ai/providers';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function RiskRadarPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = insightsData[currentBusiness.id] || insightsData['default'];

  // Higher value = higher risk (0-100)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const averageRisk = data.riskRadar.reduce((acc: number, val: any) => acc + val.A, 0) / data.riskRadar.length;
  const highestRiskNode = [...data.riskRadar].sort((a, b) => b.A - a.A)[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Risk Radar"
        description="Multidimensional early warning system and enterprise risk modeling."
      />

      <EmbeddedAIPanel 
        title="Risk Profile Explanation" 
        prompt={PROMPTS.RISK_ANALYSIS} 
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Overall Risk Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black mb-2 flex items-center gap-3">
              {averageRisk.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">/ 100</span>
            </div>
            <Badge variant="outline" className={averageRisk > 60 ? 'text-red-500 border-red-500/30 bg-red-500/10' : averageRisk > 40 ? 'text-amber-500 border-amber-500/30 bg-amber-500/10' : 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'}>
              {averageRisk > 60 ? 'High Risk' : averageRisk > 40 ? 'Moderate Risk' : 'Low Risk'}
            </Badge>

            <div className="mt-8 space-y-4">
              <div className="p-3 border rounded-lg bg-red-500/5 border-red-500/20">
                <p className="text-[10px] uppercase text-red-500 font-bold mb-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Highest Vulnerability
                </p>
                <p className="font-semibold text-sm">{highestRiskNode.subject}</p>
                <p className="text-xs text-muted-foreground mt-1">Severity: {highestRiskNode.A}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Risk Surface Map
            </CardTitle>
            <CardDescription>Vector analysis of 5 core risk categories.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.riskRadar}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <Radar
                  name="Risk Level"
                  dataKey="A"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.4}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
