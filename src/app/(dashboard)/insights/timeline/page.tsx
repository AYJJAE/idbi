'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusinessStore } from '@/store/business-store';
import { insightsData } from '@/data/credit-insights-data';
import { Clock, Calendar, Briefcase, Award } from 'lucide-react';

export default function BusinessTimelinePage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = insightsData[currentBusiness.id] || insightsData['default'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Timeline"
        description="Chronological view of major corporate milestones, credit events, and growth phases."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Corporate History
          </CardTitle>
          <CardDescription>Major milestones detected from public records, MCA, and credit bureaus.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {data.timeline.map((item: any, idx: number) => {
              const isLatest = idx === data.timeline.length - 1;
              return (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${isLatest ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                    {isLatest ? <Award className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border bg-card shadow-sm hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-bold text-sm ${isLatest ? 'text-emerald-500' : 'text-foreground'}`}>{item.event}</h4>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-mono text-muted-foreground">{item.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
