'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Network, Database, ShieldCheck, HeartPulse, Gauge, ArrowDown, FileText, Bot, Building } from 'lucide-react';

const flowSteps = [
  { id: 'msme', label: 'MSME Business', icon: Building, color: 'text-primary' },
  { id: 'consent', label: 'Consent Manager', icon: ShieldCheck, color: 'text-amber-500' },
  { id: 'dpi', label: 'Digital Public Infrastructure (GST, UPI, AA, ULI)', icon: Network, color: 'text-blue-500' },
  { id: 'normalization', label: 'Data Normalization Layer', icon: Database, color: 'text-indigo-500' },
  { id: 'fie', label: 'Financial Intelligence Engine', icon: Bot, color: 'text-purple-500' },
  { id: 'passport', label: 'Financial Passport', icon: FileText, color: 'text-cyan-500' },
  { id: 'health', label: 'Financial Health Card', icon: HeartPulse, color: 'text-emerald-500' },
  { id: 'cre', label: 'Credit Readiness Engine', icon: Gauge, color: 'text-rose-500' },
];

export function ArchitectureDiagram() {
  return (
    <div className="relative py-8 px-4 flex flex-col items-center justify-center space-y-2">
      {flowSteps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === flowSteps.length - 1;
        
        return (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="w-64 p-4 flex items-center gap-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
                <div className={`p-2 rounded-lg bg-background/50 border border-border/50 ${step.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-medium text-sm text-foreground">
                  {step.label}
                </div>
              </Card>
            </motion.div>
            
            {!isLast && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 32, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index * 0.15) + 0.1, duration: 0.3 }}
                className="w-px bg-border flex items-end justify-center overflow-hidden"
                style={{ height: '32px' }}
              >
                <motion.div
                  initial={{ y: -32 }}
                  animate={{ y: 32 }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                >
                  <ArrowDown className="h-4 w-4 text-primary opacity-50" />
                </motion.div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
