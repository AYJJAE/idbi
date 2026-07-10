'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, Clock, Activity, ArrowDownRight, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const riskTrendData = [
  { month: 'Jan', riskScore: 25 },
  { month: 'Feb', riskScore: 28 },
  { month: 'Mar', riskScore: 30 },
  { month: 'Apr', riskScore: 45 }, // Event
  { month: 'May', riskScore: 55 },
  { month: 'Jun', riskScore: 68 },
  { month: 'Jul', riskScore: 78 }, // Current
  { month: 'Aug', riskScore: 85 }, // Projected
  { month: 'Sep', riskScore: 92 }, // Projected Default Zone
];

const alertTimeline = [
  { time: '2 weeks ago', alert: 'Cash flow dropped by 35% compared to 6-month average.', severity: 'High' },
  { time: '1 month ago', alert: 'Delayed utility payments detected via AA.', severity: 'Medium' },
  { time: '3 months ago', alert: 'Credit card utilization exceeded 80%.', severity: 'Medium' },
  { time: '5 months ago', alert: 'Missed SIP investment for 2 consecutive months.', severity: 'Low' },
];

export function EarlyWarningSystem() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Score Card */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20 relative overflow-hidden">
          <div className="absolute top-4 left-4">
            <Badge variant="destructive" className="bg-red-500 text-white border-none shadow-sm">
              Critical Alert
            </Badge>
          </div>
          {/* EWS Score using NexusScoreRing but red styled via maxScore/score ratio */}
          <NexusScoreRing score={220} maxScore={900} size="lg" />
          <h3 className="mt-6 text-xl font-semibold tracking-tight text-center">Early Warning Score</h3>
          <p className="text-sm text-red-600 dark:text-red-400 text-center mt-2 px-4 font-medium flex items-center justify-center gap-1.5">
            <Clock className="h-4 w-4" /> Estimated 4 months until default
          </p>
        </Card>

        {/* Risk Trend Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Predictive Risk Trend (12 Months)</CardTitle>
            <CardDescription>Historical deterioration and projected trajectory into the default zone.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="riskScore" stroke="hsl(var(--destructive))" strokeWidth={3} fillOpacity={1} fill="url(#riskGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Alert Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Deterioration Timeline</CardTitle>
            <CardDescription>Chronological breakdown of financial stress indicators.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {alertTimeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1.5 ${
                      item.severity === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
                      item.severity === 'Medium' ? 'bg-amber-500' : 'bg-muted-foreground'
                    }`}></div>
                    {i !== alertTimeline.length - 1 && <div className="h-full w-px bg-border mt-2"></div>}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium">{item.alert}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${
                        item.severity === 'High' ? 'text-red-600 border-red-200 bg-red-50' : 
                        item.severity === 'Medium' ? 'text-amber-600 border-amber-200 bg-amber-50' : ''
                      }`}>{item.severity} Impact</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Variance */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Behavioral Variances</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Income Stability</span>
              </div>
              <span className="font-bold text-red-600">-28%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Cash Flow Variance</span>
              </div>
              <span className="font-bold text-red-600">-42%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Payment Delays</span>
              </div>
              <span className="font-bold text-amber-600">+12 Days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-red-600 text-base">
            <Sparkles className="h-4 w-4" />
            AI Intervention Strategy & Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-foreground/90">
              Based on the continuous deterioration in cash flow over the last 90 days and the recent surge in credit card utilization, the AI model predicts a <strong>high probability of EMI default within the next 4 months</strong>. The customer is currently servicing the EMI using their emergency savings, which are rapidly depleting.
            </p>
            <div className="p-4 rounded-lg bg-background border border-red-500/20 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-500/10 mt-0.5">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Suggested RM Action: Proactive Restructuring</h4>
                <p className="text-muted-foreground mt-1">Initiate contact immediately. Offer to restructure the existing Personal Loan tenure from 36 months to 60 months to reduce the monthly EMI burden by 40%, aligning it with their new reduced cash flow reality before a formal default occurs.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
