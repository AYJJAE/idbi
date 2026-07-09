'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { adminData } from '@/data/credit-insights-data';
import { Activity, Webhook, CheckCircle2, AlertCircle } from 'lucide-react';

export default function APIIntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="API Integrations"
        description="Monitor connectivity with external data providers and registries."
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {adminData.apiIntegrations.map((api, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-primary" />
                  {api.provider}
                </CardTitle>
                <Badge variant="outline" className={api.status === 'Connected' ? 'text-emerald-500 border-emerald-500/30' : 'text-amber-500 border-amber-500/30'}>
                  {api.status === 'Connected' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  {api.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="p-3 border rounded-lg bg-muted/30">
                  <p className="text-[10px] uppercase text-muted-foreground">Uptime (30d)</p>
                  <p className="text-lg font-bold">{api.uptime}</p>
                </div>
                <div className="p-3 border rounded-lg bg-muted/30">
                  <p className="text-[10px] uppercase text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" /> Avg Latency
                  </p>
                  <p className="text-lg font-bold">{api.latency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
