'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Waves, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useBusinessStore } from '@/store/business-store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

export default function CashFlowPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);

  // Generate deterministic pseudo-random cashflow data based on business ID length
  const generateCashflow = () => {
    const base = currentBusiness.annualTurnover / 12;
    const seed = currentBusiness.id.length;
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
      const inflow = base * (0.8 + (Math.sin(seed + i) * 0.2));
      const outflow = base * (0.85 + (Math.cos(seed + i) * 0.25));
      return {
        month,
        inflow: Math.round(inflow),
        outflow: Math.round(outflow),
        net: Math.round(inflow - outflow)
      };
    });
  };

  const data = generateCashflow();
  const latestNet = data[data.length - 1].net;

  const formatCurrencyLabel = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cash Flow Analysis"
        description="Monitor liquidity, operating cash flow, and surplus/deficit patterns."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Cash Flow
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Net Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-3xl font-bold ${latestNet >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {latestNet >= 0 ? '+' : ''}₹{(latestNet / 100000).toFixed(2)}L
              </div>
              <Waves className={`h-6 w-6 ${latestNet >= 0 ? 'text-emerald-500' : 'text-amber-500'}`} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Net surplus/deficit for the latest month.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Monthly Inflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-foreground">
                ₹{(data.reduce((a, b) => a + b.inflow, 0) / 6 / 100000).toFixed(2)}L
              </div>
              <ArrowDownToLine className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Driven by sales receipts and collections.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Monthly Outflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-foreground">
                ₹{(data.reduce((a, b) => a + b.outflow, 0) / 6 / 100000).toFixed(2)}L
              </div>
              <ArrowUpFromLine className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Driven by operational expenses and vendor payouts.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Net Cash Flow Trajectory</CardTitle>
          <CardDescription>Monthly surplus vs deficit analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={formatCurrencyLabel} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`₹${(value / 100000).toFixed(2)} Lakhs`, 'Amount']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <ReferenceLine y={0} stroke="hsl(var(--foreground))" strokeOpacity={0.5} />
                <Bar 
                  dataKey="net" 
                  name="Net Cashflow" 
                  radius={[4, 4, 4, 4]}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.net >= 0 ? 'hsl(var(--emerald-500))' : 'hsl(var(--amber-500))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
