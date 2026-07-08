'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Users, TrendingUp, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EpfoPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="EPFO Integration"
        description="Employees' Provident Fund Organisation data connectivity."
        actions={
          <Button variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Sync Payroll Data
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">142</div>
              <div className="flex items-center text-emerald-500 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +12 this year
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Monthly Payroll (Avg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">₹45.6L</div>
              <div className="flex items-center text-emerald-500 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +8% YoY
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">CLEAN</div>
            <p className="text-xs text-muted-foreground mt-1">No pending dues.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" /> Employment Growth & Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground border-t border-border/50 mt-4">
           <div className="flex flex-col items-center gap-2 opacity-50">
              <ShieldAlert className="h-8 w-8 text-emerald-500" />
              <p>Mock EPFO Salary & Contribution Chart</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
