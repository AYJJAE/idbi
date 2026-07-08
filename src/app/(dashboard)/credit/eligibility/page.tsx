'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { creditData } from '@/data/credit-insights-data';
import { Download, Banknote, Percent, Calculator, Activity } from 'lucide-react';

export default function LoanEligibilityPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = creditData[currentBusiness.id] || creditData['default'];

  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Eligibility Limit"
        description="Dynamic calculation of maximum borrowing capacity based on cash flow and collateral."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Generate Sanction Letter
          </Button>
        }
      />

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Maximum Eligible Limit</p>
            <div className="text-5xl font-black text-foreground">
              ₹{(data.maxEligibleAmount / 10000000).toFixed(2)} Cr
            </div>
            <p className="text-sm text-muted-foreground mt-2">Indicative limit across all working capital and term facilities.</p>
          </div>
          <div className="flex gap-4">
            <div className="p-4 bg-background border rounded-lg text-center min-w-[120px]">
              <p className="text-xs text-muted-foreground uppercase mb-1">Current Debt</p>
              <p className="text-xl font-bold">{formatCurrency(data.currentDebt)}</p>
            </div>
            <div className="p-4 bg-background border rounded-lg text-center min-w-[120px]">
              <p className="text-xs text-muted-foreground uppercase mb-1">Available Limit</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(data.maxEligibleAmount - data.currentDebt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Debt Service Coverage Ratio (DSCR)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{data.dscr}x</div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Target &gt; 1.25x</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Credit Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{data.creditUtilization}%</div>
              <Percent className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className={`h-1.5 rounded-full ${data.creditUtilization > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${data.creditUtilization}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Turnover Multiple Assessed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">20%</div>
              <Calculator className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Based on GST returns (MPBF Method)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
