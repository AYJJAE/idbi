'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { upiData } from '@/data/datasource-data';
import { Download, QrCode, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function UPIDataSourcePage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = upiData[currentBusiness.id] || upiData['default'];



  return (
    <div className="space-y-6">
      <PageHeader
        title="UPI Collections"
        description="Real-time transaction data from linked Merchant UPI IDs and QR Codes."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Statement
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-4">
        <Card className="md:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Merchant VPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold font-mono mb-2 truncate">{data.vpa}</div>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
              {data.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(data.totalVolume30d / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-2">Across {data.totalTransactions30d} txns</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Ticket Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{data.averageTicketSize}</div>
            <p className="text-xs text-muted-foreground mt-2">Typical customer spend</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{data.successRate}%</div>
            <div className="flex items-center gap-1 mt-2">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              <p className="text-[10px] text-muted-foreground">Low failure rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              7-Day Transaction Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.dailyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="count" name="Transactions" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Merchant Health</CardTitle>
            <CardDescription>Risk and dispute metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QrCode className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Active QR Codes</p>
                  <p className="text-xs text-muted-foreground">Mapped to {data.merchantId}</p>
                </div>
              </div>
              <div className="text-xl font-bold">3</div>
            </div>

            <div className={`p-4 border rounded-lg flex items-start gap-3 ${data.disputes > 0 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
              {data.disputes > 0 ? (
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-semibold ${data.disputes > 0 ? 'text-amber-700 dark:text-amber-500' : 'text-emerald-700 dark:text-emerald-500'}`}>
                  {data.disputes} Active Disputes
                </p>
                <p className="text-xs mt-1 opacity-80">
                  {data.disputes > 0 
                    ? "Customer chargebacks or failed transaction disputes pending resolution." 
                    : "No active chargebacks or disputes. Merchant health is excellent."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
