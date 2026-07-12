'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MockConsentWorkflow } from '@/features/ecosystems/components/mock-consent-workflow';
import { Database, ShieldCheck, Banknote } from 'lucide-react';

export default function AccountAggregatorPage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      <PageHeader
        title="Account Aggregator"
        description="Consent-driven financial data sharing architecture."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 col-span-2">
          <CardHeader>
            <CardTitle>Interactive Demo</CardTitle>
            <CardDescription>Simulate a data pull from a Financial Information Provider (FIP)</CardDescription>
          </CardHeader>
          <CardContent>
            <MockConsentWorkflow />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Ecosystem Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">FIP (Provider)</h4>
                  <p className="text-xs text-muted-foreground">Banks, Mutual Funds, Tax platforms providing the data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Banknote className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">FIU (User)</h4>
                  <p className="text-xs text-muted-foreground">NEXUS Platform consuming data to assess financial health.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">AA (Aggregator)</h4>
                  <p className="text-xs text-muted-foreground">The consent manager passing encrypted data blind.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-emerald-500 font-medium">Demo Ready</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Version</span>
                  <span className="font-medium">Rebit 2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supported FIPs</span>
                  <span className="font-medium">114+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
