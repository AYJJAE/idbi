'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, FileSpreadsheet, Smartphone, ShieldAlert, Landmark, Banknote, Building, UserCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ecosystems = [
  { id: 'gst', name: 'GST', status: 'Connected', icon: FileSpreadsheet, href: '/ecosystems/gst', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'upi', name: 'UPI', status: 'Connected', icon: Smartphone, href: '/ecosystems/upi', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'epfo', name: 'EPFO', status: 'Connected', icon: ShieldAlert, href: '/ecosystems/epfo', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'aa', name: 'Account Aggregator', status: 'Demo Connected', icon: Network, href: '/ecosystems/account-aggregator', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 'uli', name: 'ULI', status: 'Production Ready', icon: Landmark, href: '/ecosystems/uli', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'ocen', name: 'OCEN', status: 'Production Ready', icon: Banknote, href: '/ecosystems/ocen', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 'mca', name: 'MCA', status: 'Connected', icon: Building, href: '/ecosystems/mca', color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 'ckyc', name: 'CKYC', status: 'Ready', icon: UserCheck, href: '/ecosystems/ckyc', color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export function ConnectedEcosystemsCard() {
  return (
    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Connected Ecosystems</CardTitle>
          <p className="text-xs text-muted-foreground">Digital Public Infrastructure</p>
        </div>
        <Link href="/ecosystems" className="text-xs text-primary hover:underline flex items-center gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ecosystems.map((eco, index) => {
          const Icon = eco.icon;
          return (
            <motion.div
              key={eco.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={eco.href}
                className="group flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3 transition-all hover:bg-accent hover:border-accent"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${eco.bg} ${eco.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{eco.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                      {eco.status}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
