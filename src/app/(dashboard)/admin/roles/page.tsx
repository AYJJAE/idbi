'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck, Users as UsersIcon } from 'lucide-react';
import { adminData } from '@/data/credit-insights-data';

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Based Access Control (RBAC)"
        description="Configure permissions for different organizational roles."
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Super Admin
            </CardTitle>
            <CardDescription>Full platform access including settings and API keys.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline" className="mr-2">All Read</Badge>
            <Badge variant="outline" className="mr-2">All Write</Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">System Config</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Credit Analyst
            </CardTitle>
            <CardDescription>Read-only access to intelligence and reports.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline" className="mr-2">View Passports</Badge>
            <Badge variant="outline" className="mr-2">View Reports</Badge>
            <Badge variant="outline" className="mr-2">Export Data</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-primary" />
            User Assignments
          </CardTitle>
          <CardDescription>Currently provisioned users and their active roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 font-medium">User Name</th>
                  <th className="px-4 py-3 font-medium">Assigned Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {adminData.users.map((user) => (
                  <tr key={user.id} className="bg-card hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={user.role === 'Super Admin' ? 'border-primary text-primary' : ''}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.lastLogin}</td>
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
