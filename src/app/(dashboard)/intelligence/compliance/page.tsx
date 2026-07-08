'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { intelligenceData } from '@/data/intelligence-data';
import { Download, AlertCircle, FileCheck, Calendar, Info } from 'lucide-react';

export default function ComplianceMonitorPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = intelligenceData[currentBusiness.id]?.compliance || intelligenceData['default'].compliance;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance Monitor"
        description="Track GST return filings, corporate ITR timeline status, and statutory compliance scores."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Compliance Report
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary mb-2">{data.complianceScore}/100</div>
            <p className="text-xs text-muted-foreground">
              {data.complianceScore >= 90 ? "Excellent standing. Low risk of statutory penalties." : "Requires attention to clear delayed filings."}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-3xl font-bold ${data.activeViolations > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {data.activeViolations}
              </div>
              {data.activeViolations > 0 && <AlertCircle className="h-5 w-5 text-red-500" />}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Unresolved notices or missed deadlines.</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Corporate Tax (ITR) Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-foreground">{data.itrStatus}</div>
              <p className="text-xs text-muted-foreground mt-1">Assessment Year 2024-2025</p>
            </div>
            <div className="p-3 bg-muted rounded-full">
              <FileCheck className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            GST Filing Calendar (GSTR-1 & GSTR-3B)
          </CardTitle>
          <CardDescription>Recent 6-month historical filing timeline extracted from GSTN portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-3 bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
              <div>Return Period</div>
              <div>Filing Status</div>
              <div className="text-right">Delay / Penalty Risk</div>
            </div>
            <div className="divide-y">
              {data.gstFilings.map((filing: any, i: number) => (
                <div key={i} className="grid grid-cols-3 items-center p-3 text-sm">
                  <div className="font-medium">{filing.period}</div>
                  <div>
                    <Badge variant={filing.status === 'Filed On Time' ? 'default' : filing.status === 'Pending' ? 'outline' : 'secondary'} 
                           className={filing.status === 'Filed On Time' ? 'bg-emerald-500 hover:bg-emerald-600' : filing.status === 'Delayed' ? 'text-amber-500 bg-amber-500/10' : ''}>
                      {filing.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    {filing.delayDays > 0 ? (
                      <span className="text-amber-500 font-semibold">{filing.delayDays} days late</span>
                    ) : filing.status === 'Pending' ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <span className="text-emerald-500 font-semibold text-xs">Nil</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10 flex gap-3 items-start">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Risk Assessment:</strong> Frequent delays in GST filings can negatively impact the overall Financial Health Score and may trigger automated limits on working capital credit lines. {data.activeViolations > 0 ? "Immediate action required for active violations." : "Current filing behavior is stable."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
