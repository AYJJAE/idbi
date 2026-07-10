'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, ChevronRight, User, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

const leadsData = [
  { id: 'LD-8492', name: 'Rohan Sharma', score: 94, intent: 98, capacity: '₹85,000/mo', product: 'Home Loan', value: '₹75L', conversion: '92%', priority: 'High', rm: 'Amit Desai', status: 'Hot' },
  { id: 'LD-8493', name: 'Priya Patel', score: 88, intent: 91, capacity: '₹42,000/mo', product: 'Personal Loan', value: '₹12L', conversion: '85%', priority: 'High', rm: 'Neha Singh', status: 'In Progress' },
  { id: 'LD-8494', name: 'Vikram Singh', score: 76, intent: 82, capacity: '₹25,000/mo', product: 'Vehicle Loan', value: '₹15L', conversion: '75%', priority: 'Medium', rm: 'Amit Desai', status: 'New' },
  { id: 'LD-8495', name: 'Anjali Verma', score: 92, intent: 75, capacity: '₹1.2L/mo', product: 'Mortgage', value: '₹1.5Cr', conversion: '68%', priority: 'Medium', rm: 'Rajesh K', status: 'Follow Up' },
  { id: 'LD-8496', name: 'Sanjay Kumar', score: 65, intent: 60, capacity: '₹18,000/mo', product: 'Personal Loan', value: '₹3L', conversion: '45%', priority: 'Low', rm: 'Neha Singh', status: 'Cold' },
];

const conversionFunnel = [
  { stage: 'Total Prospects Identified', count: 1250 },
  { stage: 'High Intent Detected', count: 850 },
  { stage: 'Pre-Approved Eligibility', count: 420 },
  { stage: 'RM Assigned (Active Leads)', count: 185 },
  { stage: 'Application Initiated', count: 64 },
];

const regionalData = [
  { region: 'Mumbai', leads: 450 },
  { region: 'Delhi NCR', leads: 380 },
  { region: 'Bengaluru', leads: 320 },
  { region: 'Pune', leads: 210 },
  { region: 'Hyderabad', leads: 180 },
];

export function LeadDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Metrics / Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Enterprise prospect to lead conversion pipeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.stage}</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: `${(item.count / 1250) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
            <CardDescription>Active high-intent leads across major hubs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="region" type="category" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="leads" name="Leads" radius={[0, 4, 4, 0]} barSize={20}>
                    {regionalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.6)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <CardTitle>High-Conversion Priority Queue</CardTitle>
              <CardDescription>Actionable leads ranked by AI conversion probability.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search leads, RM, product..." className="pl-9 h-9" />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>AI Score</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Conversion Prob.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsData.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.score > 90 ? 'default' : lead.score > 75 ? 'secondary' : 'outline'} className="font-mono">
                      {lead.score}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                      {lead.intent}/100
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{lead.capacity}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {lead.product}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{lead.value}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-1.5 hidden sm:block">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: lead.conversion }}></div>
                      </div>
                      <span className="text-xs font-semibold">{lead.conversion}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.status === 'Hot' ? 'destructive' : lead.status === 'In Progress' ? 'default' : 'secondary'} className={lead.status === 'Hot' ? 'bg-red-500' : ''}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
