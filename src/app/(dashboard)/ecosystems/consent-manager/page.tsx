'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CONSENTS = [
  { id: 'CON-98A7-4B2C', source: 'HDFC Bank (AA)', purpose: 'Loan Assessment', status: 'Active', expiry: '2023-12-31', date: '2023-11-01' },
  { id: 'CON-12F5-9B1A', source: 'GSTN', purpose: 'Income Verification', status: 'Active', expiry: '2024-05-15', date: '2023-05-15' },
  { id: 'CON-88C2-3D4F', source: 'EPFO', purpose: 'Employment Check', status: 'Expired', expiry: '2023-10-01', date: '2023-09-01' },
  { id: 'CON-55D4-7A9C', source: 'ICICI Bank (AA)', purpose: 'Working Capital', status: 'Revoked', expiry: '2023-12-01', date: '2023-11-10' },
];

export default function ConsentManagerPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="Consent Manager"
        description="Enterprise dashboard for managing all DPI data source consents."
        actions={<Button>New Consent Request</Button>}
      />

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Consent Audit Trail
          </CardTitle>
          <CardDescription>View granted, pending, expired, and revoked consents.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Consent ID</th>
                  <th className="px-4 py-3">Data Source</th>
                  <th className="px-4 py-3">Purpose</th>
                  <th className="px-4 py-3">Granted On</th>
                  <th className="px-4 py-3">Valid Till</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {CONSENTS.map((consent, i) => (
                  <tr key={consent.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs">{consent.id}</td>
                    <td className="px-4 py-4 font-medium">{consent.source}</td>
                    <td className="px-4 py-4 text-muted-foreground">{consent.purpose}</td>
                    <td className="px-4 py-4">{consent.date}</td>
                    <td className="px-4 py-4">{consent.expiry}</td>
                    <td className="px-4 py-4">
                      {consent.status === 'Active' && <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</Badge>}
                      {consent.status === 'Expired' && <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20"><Clock className="w-3 h-3 mr-1" /> Expired</Badge>}
                      {consent.status === 'Revoked' && <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20"><XCircle className="w-3 h-3 mr-1" /> Revoked</Badge>}
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                      {consent.status === 'Active' && <Button variant="ghost" size="sm" className="h-8 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">Revoke</Button>}
                      {consent.status === 'Expired' && <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10">Renew</Button>}
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
