'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { creditData } from '@/data/credit-insights-data';
import { Calculator, Play, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))'];

export default function ScenarioSimulatorPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = creditData[currentBusiness.id] || creditData['default'];

  const [amount, setAmount] = React.useState(data.simulatorDefaults.amount);
  const [tenure, setTenure] = React.useState(data.simulatorDefaults.tenureMonths);
  const [rate, setRate] = React.useState(data.simulatorDefaults.interestRate);

  // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = rate / 12 / 100;
  const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - amount;

  const chartData = [
    { name: 'Principal', value: amount },
    { name: 'Total Interest', value: totalInterest }
  ];

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Scenario Simulator"
        description="Interactive tool to model EMIs, interest payouts, and debt-service capacity."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Loan Parameters</CardTitle>
            <CardDescription>Adjust sliders to simulate scenarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Loan Amount</label>
                <span className="text-sm font-bold text-primary">{formatCurrency(amount)}</span>
              </div>
              <input 
                type="range" 
                min={100000} 
                max={data.maxEligibleAmount * 1.5} 
                step={100000} 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Tenure (Months)</label>
                <span className="text-sm font-bold">{tenure} Mos</span>
              </div>
              <input 
                type="range" 
                min={6} 
                max={60} 
                step={6} 
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Interest Rate (%)</label>
                <span className="text-sm font-bold">{rate.toFixed(1)}%</span>
              </div>
              <input 
                type="range" 
                min={7.0} 
                max={24.0} 
                step={0.5} 
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="pt-4 border-t flex gap-2">
              <Button className="w-full" size="sm">
                <Play className="mr-2 h-4 w-4" /> Simulate Cash Flow
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Repayment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-48 w-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatCurrency(Math.round(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                <p className="text-xs text-muted-foreground uppercase">Estimated Monthly EMI</p>
                <p className="text-3xl font-bold text-primary mt-1">{formatCurrency(Math.round(emi))}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase">Principal</p>
                  <p className="text-lg font-bold">{formatCurrency(Math.round(amount))}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase">Total Interest</p>
                  <p className="text-lg font-bold text-muted-foreground">{formatCurrency(Math.round(totalInterest))}</p>
                </div>
              </div>
              <div className="p-3 border rounded-lg bg-muted/30">
                <p className="text-[10px] text-muted-foreground uppercase">Total Amount Payable</p>
                <p className="text-lg font-bold">{formatCurrency(Math.round(totalPayment))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
