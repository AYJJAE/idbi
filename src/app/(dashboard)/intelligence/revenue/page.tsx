'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { intelligenceData } from '@/data/intelligence-data';
import { Download, TrendingUp, BarChart4, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--emerald-500))', 'hsl(var(--blue-500))', 'hsl(var(--amber-500))'];

export default function RevenueAnalysisPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = intelligenceData[currentBusiness.id]?.revenue || intelligenceData['default'].revenue;

  const formatCurrencyLabel = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Analysis"
        description="Analyze revenue trends, seasonality patterns, product concentration, and YOY growth."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Revenue Report
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Year-Over-Year Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-emerald-500">+{data.yoyGrowth}%</div>
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Annualized growth against last fiscal.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Seasonality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{data.seasonalityScore}/100</div>
            <p className="text-xs text-muted-foreground mt-2">
              {data.seasonalityScore > 60 ? 'Highly seasonal revenue patterns.' : 'Stable month-to-month revenue.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Concentration Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.revenueByProduct[0]?.value}%</div>
            <p className="text-xs text-muted-foreground mt-2">Revenue from top product ({data.revenueByProduct[0]?.name}).</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-primary" />
              6-Month Revenue Trend (GST GSTR-1 Sales)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatCurrencyLabel} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${(value / 100000).toFixed(2)} Lakhs`, 'Revenue']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Product Split
            </CardTitle>
            <CardDescription>Revenue by major categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={data.revenueByProduct}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.revenueByProduct.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, 'Share']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
