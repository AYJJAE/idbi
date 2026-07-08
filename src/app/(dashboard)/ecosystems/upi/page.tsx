'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone, RefreshCcw, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function UpiPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="UPI Integration"
        description="Unified Payments Interface merchant transaction data."
        actions={
          <Button variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Collections (MTD)', value: '₹14.5L', trend: '+12%', up: true },
          { title: 'Transaction Count', value: '1,245', trend: '+5%', up: true },
          { title: 'Average Ticket Size', value: '₹1,164', trend: '-2%', up: false },
          { title: 'Success Rate', value: '98.4%', trend: '+0.4%', up: true },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-purple-500" /> Merchant QR & Digital Payments
          </CardTitle>
          <CardDescription>Daily Volume Trends</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground border-t border-border/50 mt-4">
          <div className="flex flex-col items-center gap-2 opacity-50">
            <Activity className="h-8 w-8 text-purple-500" />
            <p>Mock UPI Trend Chart</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
