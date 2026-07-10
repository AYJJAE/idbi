'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NexusScoreRing } from '@/components/nexus-score-ring';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Sparkles, MousePointerClick, Smartphone, Globe, Activity, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const intentTrendData = [
  { name: 'Mon', score: 45 },
  { name: 'Tue', score: 52 },
  { name: 'Wed', score: 48 },
  { name: 'Thu', score: 65 },
  { name: 'Fri', score: 78 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 92 },
];

const behaviorTimeline = [
  { time: '2 hours ago', action: 'Calculated Home Loan EMI on website', impact: 'High Intent' },
  { time: '5 hours ago', action: 'Read article: "Interest rates dropping in 2024"', impact: 'Medium Intent' },
  { time: '1 day ago', action: 'Logged into mobile app 3 times in 1 hour', impact: 'Medium Intent' },
  { time: '2 days ago', action: 'Salary credited (₹1,45,000)', impact: 'Trigger Event' },
];

export function CustomerIntent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Score Card */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-card to-muted/50 border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-emerald-500/30 text-emerald-600">
              High Probability
            </Badge>
          </div>
          <NexusScoreRing score={92} maxScore={100} size="lg" />
          <h3 className="mt-6 text-xl font-semibold tracking-tight">Customer Intent Score</h3>
          <p className="text-sm text-muted-foreground text-center mt-2 px-4">
            Customer exhibits strong behavioral signals indicating readiness for a credit product.
          </p>
        </Card>

        {/* Trend Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Intent Trend (7 Days)</CardTitle>
            <CardDescription>Real-time tracking of digital engagement and financial triggers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={intentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="intentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#intentGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Behavior Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Behavior Timeline</CardTitle>
            <CardDescription>Recent actions contributing to the high intent score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {behaviorTimeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    {i !== behaviorTimeline.length - 1 && <div className="h-full w-px bg-border mt-2"></div>}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium">{item.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{item.impact}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Digital Engagement Stats */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Digital Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">App Logins (Week)</span>
              </div>
              <span className="font-bold">14</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Web Pageviews</span>
              </div>
              <span className="font-bold">28</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <div className="flex items-center gap-3">
                <MousePointerClick className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Email Open Rate</span>
              </div>
              <span className="font-bold">85%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            AI Prospect Summary & Next Best Action
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Based on the sudden spike in EMI calculator usage and recent salary credit, this prospect is <strong>highly likely to apply for a Home Loan within the next 48 hours</strong>. The intent score has jumped by 42 points in the last 3 days.
            </p>
            <div className="p-4 rounded-lg bg-background border border-border shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10 mt-0.5">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Recommended RM Action</h4>
                <p className="text-muted-foreground mt-1">Trigger personalized push notification for "Pre-approved Home Loan up to ₹75L at 8.4% p.a." Do not cold call immediately; wait for click-through.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
