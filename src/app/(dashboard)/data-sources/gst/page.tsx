'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { gstData } from '@/data/datasource-data';
import { Download, FileText, AlertTriangle, RefreshCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function GSTDataSourcePage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = gstData[currentBusiness.id] || gstData['default'];

  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="GST Network (GSTN)"
        description="Live data synchronized directly from the Goods and Services Tax Network."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-1.5 h-3.5 w-3.5" />
              Sync Now
            </Button>
            <Button size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export GSTR-3B
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GSTIN Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold font-mono mb-2">{data.gstin}</div>
            <Badge variant={data.status === 'Active' ? 'default' : 'secondary'} className={data.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
              {data.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Filings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">GSTR-1</span>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">{data.latestGstr1}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">GSTR-3B</span>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">{data.latestGstr3b}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ITC vs Liability (Latest Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Input Tax Credit (ITC)</p>
                <p className="text-2xl font-bold text-emerald-500">{formatCurrency(data.totalInputTaxCredit)}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Tax Liability</p>
                <p className="text-2xl font-bold text-amber-500">{formatCurrency(data.totalTaxLiability)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Outward vs Inward Supplies (GSTR-1 vs GSTR-2B)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyTrend} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatCurrency} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value as number), 'Amount']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="outward" name="Outward (Sales)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="inward" name="Inward (Purchases)" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Invoice Matching</CardTitle>
            <CardDescription>GSTR-2A/2B Reconciliation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center p-4 md:p-6 border rounded-lg bg-muted/30">
              <div className="relative flex items-center justify-center h-24 w-24 rounded-full border-4 border-emerald-500 mb-4">
                <span className="text-2xl font-bold">{data.invoicesMatched}%</span>
              </div>
              <p className="text-sm font-medium">Successfully Matched</p>
              <p className="text-xs text-muted-foreground text-center mt-1">Vendors filed their GSTR-1 correctly.</p>
            </div>

            <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-700 dark:text-amber-500">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div className="text-xs">
                <strong>{data.discrepancies} Discrepancies found.</strong>
                <p className="mt-1 opacity-80">Some invoices claimed in GSTR-3B are missing in GSTR-2B. This may limit ITC claims.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
