'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { Download, Users, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';
import { intelligenceData } from '@/data/intelligence-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function WorkforceAnalysisPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = intelligenceData[currentBusiness.id]?.workforce || intelligenceData['default'].workforce;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workforce Analysis"
        description="Employee trends, payroll stability, and EPFO (provident fund) compliance tracking."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Payroll Report
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Workforce</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{data.totalEmployees}</div>
              <div className="p-3 bg-primary/10 text-primary rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active employees linked to corporate PAN.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">EPFO Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-500">{data.epfoCompliance}%</div>
              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0">High</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Provident fund deposit consistency.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Est. Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">₹{(data.averageSalary / 1000).toFixed(1)}k</div>
              <div className="p-3 bg-muted rounded-full">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Derived from EPFO contribution data.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workforce Net Additions (3 Months)</CardTitle>
          <CardDescription>Monthly hires vs. attrition based on active provident fund accounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyAdditions} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="added" name="New Hires" fill="hsl(var(--emerald-500))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="left" name="Attrition" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
