'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function McaPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="MCA Integration"
        description="Ministry of Corporate Affairs company registry data."
        actions={<Button variant="outline" size="sm">Fetch ROC Details</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-rose-500" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">CIN</span>
              <span className="font-medium text-sm">U72200KA2017PTC123456</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">Company Name</span>
              <span className="font-medium text-sm">ACME TECHNOLOGIES PVT LTD</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="font-medium text-emerald-500 text-sm flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Active
              </span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground text-sm">Class</span>
              <span className="font-medium text-sm">Private</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-rose-500" />
              ROC Filings & Directors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">Last AGM Date</span>
              <span className="font-medium text-sm">30-Sep-2023</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">Last Balance Sheet Date</span>
              <span className="font-medium text-sm">31-Mar-2023</span>
            </div>
            <div className="space-y-2 pt-2">
              <span className="text-muted-foreground text-sm">Active Directors</span>
              <div className="space-y-2">
                <div className="bg-background border border-border/50 p-2 rounded-md text-sm flex justify-between">
                  <span>Rahul Sharma</span>
                  <span className="text-muted-foreground">DIN: 01234567</span>
                </div>
                <div className="bg-background border border-border/50 p-2 rounded-md text-sm flex justify-between">
                  <span>Priya Patel</span>
                  <span className="text-muted-foreground">DIN: 07654321</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
