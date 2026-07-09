'use client';

import { motion } from 'framer-motion';
import { Landmark, Users, PieChart, ShieldCheck, TrendingUp } from 'lucide-react';

const STATS = [
  {
    icon: <Landmark className="h-6 w-6 text-primary" />,
    value: '63Mn+',
    label: 'MSMEs in India',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: '45%+',
    label: 'Are New-to-Credit (NTC)',
  },
  {
    icon: <PieChart className="h-6 w-6 text-primary" />,
    value: '80%',
    label: 'Lack Adequate Financial Records',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    value: 'High',
    label: 'Untapped Credit Potential',
  },
];

export function StatsFooter() {
  return (
    <section className="py-12 pb-24 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-4 md:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 lg:gap-8">
            
            {/* Stats items */}
            {STATS.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 flex-1 min-w-[200px]"
              >
                <div className="p-3 rounded-xl bg-secondary border border-border/50">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Mission Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 flex-1 min-w-[250px] border-l border-border pl-8 ml-4 hidden lg:flex"
            >
              <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <div className="text-sm font-semibold text-primary mb-1">Our Mission</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Data-Driven. Fairer. Inclusive.<br/>
                  For a stronger Bharat.
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
