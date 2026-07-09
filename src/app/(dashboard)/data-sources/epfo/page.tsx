'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { epfoData } from '@/data/datasource-data';
import { Download, Users, FileCheck, AlertCircle, Building, CheckCircle2 } from 'lucide-react';

export default function EPFODataSourcePage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = epfoData[currentBusiness.id] || epfoData['default'];

  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="EPFO Registry Integration"
        description="Provident Fund contribution logs and establishment compliance status."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download ECR
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Establishment Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold font-mono mb-2 truncate">{data.establishmentId}</div>
            <Badge variant={data.status === 'Compliant' ? 'default' : 'secondary'} className={data.status === 'Compliant' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
              {data.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{data.activeMembers}</div>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Active contributing employees</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Challan Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(data.lastChallanAmount / 100000).toFixed(2)}L</div>
            <p className="text-[10px] text-muted-foreground mt-2">On {new Date(data.lastChallanDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">KYC Seeding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              {data.totalUANs > 0 ? Math.round((data.aadhaarSeeded / data.totalUANs) * 100) : 0}%
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full" 
                style={{ width: `${data.totalUANs > 0 ? (data.aadhaarSeeded / data.totalUANs) * 100 : 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              Recent Challan Remittances
            </CardTitle>
            <CardDescription>Last 3 months of Electronic Challan cum Return (ECR) logs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentChallans.map((challan: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{challan.month}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">TRRN: {challan.trrn}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">₹{(challan.amount / 100000).toFixed(2)}L</p>
                    <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 mt-1">Paid</Badge>
                  </div>
                </div>
              ))}
              {data.recentChallans.length === 0 && (
                 <div className="p-4 md:p-6 text-center text-muted-foreground text-sm border rounded-lg border-dashed">
                 No recent challans found.
               </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Corporate Identity Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <p className="text-[10px] uppercase text-muted-foreground font-semibold">Registered Entity</p>
                <p className="text-sm font-bold mt-1 truncate">{currentBusiness.name}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-[10px] uppercase text-muted-foreground font-semibold">PAN Linkage</p>
                <p className="text-sm font-bold mt-1 font-mono">{currentBusiness.pan}</p>
              </div>
            </div>

            <div className={`p-4 border rounded-lg flex items-start gap-3 ${data.status === 'Compliant' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
              {data.status === 'Compliant' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-semibold ${data.status === 'Compliant' ? 'text-emerald-700 dark:text-emerald-500' : 'text-amber-700 dark:text-amber-500'}`}>
                  {data.status === 'Compliant' ? 'EPFO Compliant' : 'Requires Attention'}
                </p>
                <p className="text-xs mt-1 opacity-80 leading-relaxed">
                  {data.status === 'Compliant' 
                    ? "The establishment is regularly filing ECRs and remitting dues. Workforce strength validated via UAN linkage." 
                    : "Irregular remittances detected. Please ensure all monthly challans are cleared."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
