'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArchitectureDiagram } from '@/features/ecosystems/components/architecture-diagram';
import { ConnectedEcosystemsCard } from '@/features/ecosystems/components/connected-ecosystems-card';
import { Network, Activity, Clock, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const kpis = [
  { label: 'Connected Systems', value: '8', icon: Network, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'System Availability', value: '99.9%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Average Latency', value: '124ms', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Successful Syncs', value: '2.4M', icon: Server, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function EcosystemsOverviewPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <PageHeader
        title="Financial Ecosystem Hub"
        description="NEXUS integrates seamlessly with India's Digital Public Infrastructure to power the Financial Intelligence Engine."
      />

      {/* Demo Mode Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Production Architecture Ready
            </h3>
            <p className="text-sm text-muted-foreground">This module demonstrates enterprise-grade integration patterns using realistic mock APIs.</p>
          </div>
        </CardContent>
      </Card>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-4 md:p-6 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                    <h4 className="text-2xl font-bold">{kpi.value}</h4>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Architecture Diagram */}
        <Card className="xl:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Integration Architecture</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center bg-black/5 rounded-lg mx-6 mb-6 p-4 md:p-6 border border-border/50">
            <ArchitectureDiagram />
          </CardContent>
        </Card>

        {/* Connected Ecosystems */}
        <div className="xl:col-span-1">
          <ConnectedEcosystemsCard />
        </div>
      </div>
    </div>
  );
}
