'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, IndianRupee, Wallet, CreditCard, Scale } from 'lucide-react';

const cashFlowData = [
  { month: 'Jan', inflow: 145000, outflow: 85000, emi: 25000 },
  { month: 'Feb', inflow: 145000, outflow: 92000, emi: 25000 },
  { month: 'Mar', inflow: 185000, outflow: 88000, emi: 25000 }, // Bonus month
  { month: 'Apr', inflow: 145000, outflow: 95000, emi: 25000 },
  { month: 'May', inflow: 145000, outflow: 89000, emi: 25000 },
  { month: 'Jun', inflow: 145000, outflow: 91000, emi: 25000 },
];

export function RepaymentCapacity() {
  const formatCurrency = (val: number) => `₹${(val / 1000).toFixed(0)}k`;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Avg Monthly Income</p>
              <IndianRupee className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold">₹1,51,666</div>
            <p className="text-xs text-muted-foreground mt-1">+12% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Fixed Obligations</p>
              <CreditCard className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">₹25,000</div>
            <p className="text-xs text-muted-foreground mt-1">Existing Personal Loan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Debt-to-Income (FOIR)</p>
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">16.5%</div>
            <p className="text-xs text-emerald-500 mt-1">Excellent (Max 50%)</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-primary">Estimated Capacity</p>
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">₹50,833 /mo</div>
            <p className="text-xs text-primary/80 mt-1">Safe new EMI buffer</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Cashflow Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Obligations vs Expenses</CardTitle>
            <CardDescription>6-month historical view from combined bank statements and AA data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatCurrency} fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="inflow" name="Total Income" fill="hsl(var(--emerald-500))" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="outflow" name="Living Expenses" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="emi" name="Existing EMI" fill="hsl(var(--amber-500))" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Average monthly (₹90,000)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">UPI Payments (Utilities/Groceries)</span>
                <span className="font-medium">₹35,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Rent / Housing</span>
                <span className="font-medium">₹25,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary/70 h-2 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Investments (SIPs)</span>
                <span className="font-medium">₹15,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Discretionary / Others</span>
                <span className="font-medium">₹15,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-muted-foreground h-2 rounded-full" style={{ width: '16%' }}></div>
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
            AI Repayment Capacity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Customer has a highly stable cash flow with a low Debt-to-Income ratio (FOIR) of 16.5%. The consistent SIP investments of ₹15,000/month indicate strong financial discipline.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>True Disposable Income:</strong> ₹50,833 per month (calculated post living expenses and existing EMI).</li>
              <li><strong>Stress Test:</strong> Can withstand a 20% income shock and still service a new EMI of ₹40,000 comfortably.</li>
              <li><strong>Recommendation:</strong> Safe to extend a Home Loan up to ₹55L for 15 years.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
