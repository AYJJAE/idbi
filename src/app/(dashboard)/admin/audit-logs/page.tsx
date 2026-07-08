'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminData } from '@/data/credit-insights-data';
import { FileText, Clock, User } from 'lucide-react';

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Immutable record of system actions and data access events."
      />

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
              <div className="col-span-2">Action</div>
              <div>User</div>
              <div className="text-right">Timestamp</div>
            </div>
            <div className="divide-y">
              {adminData.auditLogs.map((log) => (
                <div key={log.id} className="grid grid-cols-4 items-center p-3 text-sm hover:bg-muted/30">
                  <div className="col-span-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{log.user}</span>
                  </div>
                  <div className="text-right text-xs text-muted-foreground flex items-center justify-end gap-1 font-mono">
                    <Clock className="h-3 w-3" />
                    {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
