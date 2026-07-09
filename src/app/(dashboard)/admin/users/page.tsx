'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { adminData } from '@/data/credit-insights-data';
import { UserPlus, Shield, MoreVertical } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage workspace members and their access."
        actions={
          <Button size="sm">
            <UserPlus className="mr-1.5 h-3.5 w-3.5" />
            Invite User
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
              <div className="col-span-2">Name</div>
              <div>Role</div>
              <div className="text-right">Last Login</div>
            </div>
            <div className="divide-y">
              {adminData.users.map((u) => (
                <div key={u.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center p-3 text-sm">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-medium">{u.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className={`text-[10px] ${u.status === 'Active' ? 'text-emerald-500 border-emerald-500/30' : 'text-muted-foreground'}`}>{u.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span>{u.role}</span>
                  </div>
                  <div className="text-right text-muted-foreground text-xs flex justify-end items-center gap-3">
                    {u.lastLogin}
                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4" /></Button>
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
