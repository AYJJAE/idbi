'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSpreadsheet, Download, RefreshCcw, CheckCircle2, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GstPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="GST Integration"
        description="Goods and Services Tax network connectivity."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh GST
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Summary
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle>GST Profile</CardTitle>
            <CardDescription>Verified business information from GSTN.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">GSTIN</span>
                <p className="font-mono text-sm font-medium">29ABCDE1234F1Z5</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Legal Name</span>
                <p className="text-sm font-medium">ACME TECHNOLOGIES PVT LTD</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Registration Status</span>
                <p className="text-sm font-medium text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Active
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Monthly Turnover (Avg)</span>
                <p className="text-sm font-medium">₹45.2L</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Returns Filed</span>
                <p className="text-sm font-medium">72 / 72</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Last Filing</span>
                <p className="text-sm font-medium">20-Nov-2023</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>GST Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center pb-6">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle className="text-border" strokeWidth="12" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                <circle className="text-emerald-500" strokeWidth="12" strokeDasharray="364" strokeDashoffset="0" strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
              </svg>
              <div className="absolute text-2xl font-bold">100%</div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Excellent filing record with no delayed tax payments.</p>
            <Button variant="link" className="text-primary mt-2">
              <History className="h-4 w-4 mr-2" /> View GST Timeline
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
