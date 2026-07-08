'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { aggregatorData } from '@/data/datasource-data';
import { Download, Landmark, FileSpreadsheet, ArrowRightLeft, UploadCloud } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BankStatementsPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  // Reusing aggregator linked accounts for context
  const data = aggregatorData[currentBusiness.id] || aggregatorData['default'];

  // Mock deterministic transaction data for the statement viewer
  const seed = currentBusiness.id.length;
  const recentTransactions = [
    { id: 'tx-1', date: '2025-01-22', description: 'NEFT-TATA STEEL LTD', type: 'debit', amount: 150000, balance: 450000 },
    { id: 'tx-2', date: '2025-01-21', description: 'IMPS-LOCAL VENDOR', type: 'debit', amount: 25000, balance: 600000 },
    { id: 'tx-3', date: '2025-01-20', description: 'RTGS-ABC CLIENT PAY', type: 'credit', amount: 350000, balance: 625000 },
    { id: 'tx-4', date: '2025-01-18', description: 'ACH-EPFO CONTRIBUTION', type: 'debit', amount: 125000, balance: 275000 },
    { id: 'tx-5', date: '2025-01-15', description: 'INB-MONTHLY RENT', type: 'debit', amount: 80000, balance: 400000 },
  ];

  const dailyBalanceData = [
    { day: '15 Jan', balance: 400 },
    { day: '16 Jan', balance: 395 },
    { day: '17 Jan', balance: 380 },
    { day: '18 Jan', balance: 275 },
    { day: '19 Jan', balance: 275 },
    { day: '20 Jan', balance: 625 },
    { day: '21 Jan', balance: 600 },
    { day: '22 Jan', balance: 450 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bank Statements"
        description="Parsed and categorized ledger entries from linked Current and CC/OD accounts."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <UploadCloud className="mr-1.5 h-3.5 w-3.5" />
              Upload PDF
            </Button>
            <Button size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export Parsed CSV
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accounts Parsed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{data.accountsLinked.length}</div>
            <div className="flex flex-wrap gap-1">
              {data.accountsLinked.map((acc: any, i: number) => (
                <Badge key={i} variant="secondary" className="text-[10px] font-mono">{acc.bank} {acc.mask}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">₹4.50L</div>
              <Landmark className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Aggregate across linked accounts</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transaction Categorization</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">B2B Payments</p>
              <p className="text-xl font-bold text-emerald-500">68%</p>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Statutory</p>
              <p className="text-xl font-bold text-blue-500">12%</p>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Uncategorized</p>
              <p className="text-xl font-bold text-amber-500">20%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Recent Transactions Ledger
            </CardTitle>
            <CardDescription>AI-categorized narration entries.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
                <div>Date</div>
                <div className="col-span-2">Narration</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="divide-y">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-4 items-center p-3 text-sm">
                    <div className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString('en-GB')}</div>
                    <div className="col-span-2 font-mono text-xs truncate pr-4">{tx.description}</div>
                    <div className={`text-right font-bold font-mono ${tx.type === 'credit' ? 'text-emerald-500' : 'text-foreground'}`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{(tx.amount / 1000).toFixed(1)}k
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Daily Balance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyBalanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value}k`, 'Balance']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="balance" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
