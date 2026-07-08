'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { History, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SYNC_LOGS = [
  { id: 'SYNC-1102', source: 'GSTN', time: '2023-11-20 10:45 AM', duration: '1.2s', records: 74, status: 'Success' },
  { id: 'SYNC-1101', source: 'Account Aggregator', time: '2023-11-20 10:30 AM', duration: '4.5s', records: 145, status: 'Success' },
  { id: 'SYNC-1100', source: 'EPFO', time: '2023-11-20 09:15 AM', duration: '0.8s', records: 1, status: 'Success' },
  { id: 'SYNC-1099', source: 'MCA', time: '2023-11-19 14:20 PM', duration: '3.1s', records: 0, status: 'Error' },
  { id: 'SYNC-1098', source: 'UPI', time: '2023-11-19 01:00 AM', duration: '2.4s', records: 890, status: 'Success' },
];

export default function SyncHistoryPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="Synchronization History"
        description="Audit logs for data imports from connected DPI ecosystems."
        actions={<Button variant="outline"><RefreshCcw className="mr-2 h-4 w-4" /> Refresh</Button>}
      />

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Recent Syncs
          </CardTitle>
          <CardDescription>Timeline of all data synchronization events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Sync ID</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3 text-right">Records Imported</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {SYNC_LOGS.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{log.id}</td>
                    <td className="px-4 py-4 font-medium">{log.source}</td>
                    <td className="px-4 py-4">{log.time}</td>
                    <td className="px-4 py-4 font-mono text-xs">{log.duration}</td>
                    <td className="px-4 py-4 text-right font-medium">{log.records}</td>
                    <td className="px-4 py-4 text-right">
                      {log.status === 'Success' ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Success</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
