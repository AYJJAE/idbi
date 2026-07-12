'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { aggregatorData } from '@/data/datasource-data';
import { Download, Network, Building2, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function AccountAggregatorPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = aggregatorData[currentBusiness.id] || aggregatorData['default'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Account Aggregator (Sahamati)"
        description="FIP/FIU consent management and unified financial data streaming."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Request Refresh
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Consent Artefact ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold font-mono mb-2 truncate">{data.consentId}</div>
            <Badge variant={data.status === 'Active' ? 'default' : 'secondary'} className={data.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
              {data.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">FIPs Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{data.fipCount}</div>
            <div className="flex flex-wrap gap-1">
              {data.fips.map((fip: string) => (
                <Badge key={fip} variant="outline" className="text-[10px]">{fip}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sync Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{data.frequency}</div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last fetch: {new Date(data.lastFetch).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Linked Bank Accounts
            </CardTitle>
            <CardDescription>Accounts actively streaming data under current consent.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.accountsLinked.length > 0 ? data.accountsLinked.map((acc: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-full">
                      <Network className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{acc.bank}</p>
                      <p className="text-xs text-muted-foreground">{acc.type} • {acc.mask}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Linked
                  </Badge>
                </div>
              )) : (
                <div className="p-4 md:p-6 text-center text-muted-foreground text-sm border rounded-lg border-dashed">
                  No accounts linked via Account Aggregator.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Consent Audit Log
            </CardTitle>
            <CardDescription>Cryptographically signed consent actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-emerald-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm">Consent Active</h4>
                    <span className="text-[10px] text-muted-foreground">{new Date(data.lastFetch).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Data block received successfully.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm">Consent Approved</h4>
                    <span className="text-[10px] text-muted-foreground">01/01/2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground">User authenticated via OTP on Sahamati.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
