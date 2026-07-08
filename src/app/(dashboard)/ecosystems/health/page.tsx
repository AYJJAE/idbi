'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HEALTH_DATA = [
  { id: 'GST', name: 'Goods & Services Tax', status: 'Operational', latency: '350ms', uptime: '99.9%', lastCheck: '2 mins ago' },
  { id: 'UPI', name: 'Unified Payments Interface', status: 'Operational', latency: '210ms', uptime: '99.99%', lastCheck: 'Just now' },
  { id: 'AA', name: 'Account Aggregator', status: 'Operational', latency: '850ms', uptime: '98.5%', lastCheck: '5 mins ago' },
  { id: 'ULI', name: 'Unified Lending Interface', status: 'Operational', latency: '600ms', uptime: '99.9%', lastCheck: '1 min ago' },
  { id: 'OCEN', name: 'Open Credit Enablement Network', status: 'Operational', latency: '1200ms', uptime: '99.0%', lastCheck: '10 mins ago' },
  { id: 'EPFO', name: 'Employees Provident Fund', status: 'Operational', latency: '420ms', uptime: '99.5%', lastCheck: '1 hour ago' },
  { id: 'MCA', name: 'Ministry of Corporate Affairs', status: 'Degraded', latency: '3500ms', uptime: '95.2%', lastCheck: '15 mins ago' },
  { id: 'CKYC', name: 'Central KYC Registry', status: 'Operational', latency: '540ms', uptime: '99.8%', lastCheck: '5 mins ago' },
];

export default function IntegrationHealthPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="Integration Health"
        description="Real-time monitoring of all external API endpoints and connectors."
        actions={<Button variant="outline"><Activity className="mr-2 h-4 w-4" /> Run Diagnostics</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {HEALTH_DATA.map((sys) => (
          <Card key={sys.id} className={`bg-card/50 backdrop-blur-sm border-border/50 transition-colors ${sys.status === 'Degraded' ? 'border-amber-500/50' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm">{sys.name}</CardTitle>
                {sys.status === 'Operational' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <CardDescription className="text-xs">{sys.id} Connector</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium ${sys.status === 'Operational' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {sys.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Latency</span>
                <span className="font-mono text-xs">{sys.latency}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-medium">{sys.uptime}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border/50">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last Checked</span>
                <span>{sys.lastCheck}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
