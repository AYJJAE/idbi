'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sparkles, MapPin, Building2, Users, PieChart as PieChartIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const industryRiskData = [
  { name: 'Manufacturing', low: 65, medium: 25, high: 10 },
  { name: 'Retail', low: 45, medium: 35, high: 20 },
  { name: 'Healthcare', low: 80, medium: 15, high: 5 },
  { name: 'Agriculture', low: 40, medium: 40, high: 20 },
  { name: 'IT Services', low: 85, medium: 10, high: 5 },
  { name: 'Logistics', low: 55, medium: 30, high: 15 },
  { name: 'Hospitality', low: 35, medium: 45, high: 20 },
];

const segmentData = [
  { name: 'Low Risk', value: 68 },
  { name: 'Medium Risk', value: 24 },
  { name: 'High Risk', value: 8 },
];

const COLORS = ['hsl(var(--emerald-500))', 'hsl(var(--amber-500))', 'hsl(var(--destructive))'];

export function PortfolioRiskHeatmap() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-primary" /> Executive Risk Distribution
          </h3>
          <p className="text-sm text-muted-foreground">Macro-level portfolio exposure across sectors and geographies.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Filter by Region</Button>
          <Button variant="outline" size="sm">Filter by Loan Type</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Risk Distribution Pie */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`${value}%`, 'Portfolio']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl font-bold">100%</span>
              </div>
            </div>
            <div className="w-full mt-2 space-y-2 text-sm">
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>Low Risk</span> <span className="font-medium">68%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500"></span>Medium Risk</span> <span className="font-medium">24%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500"></span>High Risk</span> <span className="font-medium text-red-500">8%</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Risk Bar Chart */}
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Risk by Industry (Heatmap View)</CardTitle>
            <CardDescription>Stacked vulnerability distribution across major sectors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryRiskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="low" name="Low Risk" stackId="a" fill="hsl(var(--emerald-500))" />
                  <Bar dataKey="medium" name="Medium Risk" stackId="a" fill="hsl(var(--amber-500))" />
                  <Bar dataKey="high" name="High Risk" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Regional Risk Map (Top 3)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-sm font-medium">Maharashtra</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">12.5% Exposure</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Med Risk</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-sm font-medium">Gujarat</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">18.2% Exposure</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Low Risk</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-sm font-medium">Karnataka</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">8.4% Exposure</span>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" /> High-Risk Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-sm font-medium">SME / Micro-Retailers</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-red-500">22% PD</span>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-sm font-medium">Unsecured Personal (Self-Employed)</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-500">14% PD</span>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-sm font-medium">Commercial Vehicle Loans</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-500">11% PD</span>
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
            AI Portfolio Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              The overall Portfolio Health Index is stable at <strong>84.2</strong>. However, there is a systemic vulnerability concentration in the <strong>Retail and Hospitality sectors</strong>, which account for 45% of the total High-Risk bucket.
            </p>
            <p className="text-muted-foreground">
              <strong>Recommended Action:</strong> Temporarily tighten LTV (Loan-to-Value) ratios for new unsecured disbursements in the Hospitality sector in Maharashtra, Launch retention campaigns for SME retailers showing &gt;15% cash flow variance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
