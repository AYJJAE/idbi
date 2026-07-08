'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, QrCode, Smartphone, Wifi, ShieldAlert } from 'lucide-react';
import { useBusinessStore } from '@/store/business-store';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function DigitalBankingScorePage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);

  // Generate deterministic digital data
  const seed = currentBusiness.id.length;
  const digitalScore = Math.min(100, 60 + seed * 3);
  const upiAdoption = Math.min(100, 40 + seed * 5);
  const onlineBanking = Math.min(100, 70 + seed * 2);
  const qrVolume = Math.round((currentBusiness.annualTurnover * (upiAdoption/100) * 0.3) / 100000);

  const chartData = [
    { name: 'UPI Adoption', value: upiAdoption, fill: 'hsl(var(--primary))' },
    { name: 'Online Banking', value: onlineBanking, fill: 'hsl(var(--emerald-500))' },
    { name: 'Overall Digital', value: digitalScore, fill: 'hsl(var(--amber-500))' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital Banking Score"
        description="Evaluate digital footprint, UPI adoption, and QR-based collection metrics."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Digital Audit
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Digital Maturity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary mb-2">{digitalScore}/100</div>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
              {digitalScore > 80 ? 'Advanced' : 'Developing'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">UPI Penetration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{upiAdoption}%</div>
              <Smartphone className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Percentage of B2C collections via UPI.</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">QR Volume (Annualized)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">₹{qrVolume} Lakhs</div>
              <p className="text-[10px] text-muted-foreground mt-1">Processed through mapped merchant QRs.</p>
            </div>
            <div className="p-3 bg-muted rounded-full">
              <QrCode className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Digital Channels Usage</CardTitle>
            <CardDescription>Comparison of digital collection vectors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="30%" 
                  outerRadius="100%" 
                  barSize={15} 
                  data={chartData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0 }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              Connectivity Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-muted-foreground">Account Aggregator Consent</span>
                <span className="font-semibold text-emerald-500">Active</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-muted-foreground">Netbanking API Linked</span>
                <span className="font-semibold text-emerald-500">Active</span>
              </div>
              <div className="flex justify-between text-sm pb-2">
                <span className="text-muted-foreground">E-Mandate Setup</span>
                <span className="font-semibold text-amber-500">Pending Authorization</span>
              </div>
            </div>
            
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3 items-start mt-4">
              <ShieldAlert className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700/80 dark:text-amber-500/80">
                Action required: Setup NACH/E-Mandates to improve the Digital Banking Score and unlock faster credit line approvals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
