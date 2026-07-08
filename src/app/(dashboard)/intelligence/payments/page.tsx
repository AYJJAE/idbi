'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { intelligenceData } from '@/data/intelligence-data';
import { Download, CreditCard, Clock, AlertTriangle, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PaymentBehaviourPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = intelligenceData[currentBusiness.id]?.payments || intelligenceData['default'].payments;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment Behaviour"
        description="Analysis of trade credit lines, creditor ageing, and average debtor days."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Report
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Debtor Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{data.debtorDays} <span className="text-sm font-normal text-muted-foreground">days</span></div>
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                <TrendingDown className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Time taken to collect payments from customers.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Creditor Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{data.creditorDays} <span className="text-sm font-normal text-muted-foreground">days</span></div>
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Time taken to pay suppliers and vendors.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Payment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">{data.onTimePaymentRate}%</div>
              <div className={`p-3 rounded-full ${data.onTimePaymentRate >= 80 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Percentage of vendor invoices paid on or before due date.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Payment Delays</CardTitle>
            <CardDescription>Average days delayed beyond credit period by top vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.supplierPaymentHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="supplier" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="averageDelay" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Delay (Days)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Working Capital Cycle Analysis</CardTitle>
            <CardDescription>AI insight on payment behavior and liquidity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Working Capital Gap
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentBusiness.name} has a debtor collection period of {data.debtorDays} days against a creditor payment period of {data.creditorDays} days. 
                {data.debtorDays > data.creditorDays 
                  ? " This creates a negative cash conversion cycle gap, meaning the business pays suppliers before receiving cash from customers, requiring external working capital financing."
                  : " This indicates strong liquidity management, as the business collects from customers faster than it pays suppliers."}
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Trade Receivables Risk</span>
                <Badge variant={data.debtorDays > 45 ? 'secondary' : 'outline'} className={data.debtorDays <= 45 ? 'text-emerald-500 border-emerald-500/30' : 'text-amber-500'}>
                  {data.debtorDays > 45 ? 'Elevated' : 'Low'}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Supplier Default Risk</span>
                <Badge variant={data.onTimePaymentRate >= 85 ? 'outline' : 'secondary'} className={data.onTimePaymentRate >= 85 ? 'text-emerald-500 border-emerald-500/30' : 'text-red-500'}>
                  {data.onTimePaymentRate >= 85 ? 'Minimal' : 'High'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
