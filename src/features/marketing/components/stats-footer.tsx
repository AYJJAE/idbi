'use client';

import { motion } from 'framer-motion';
import { Landmark, Users, PieChart, ShieldCheck, TrendingUp } from 'lucide-react';

const STATS = [
  {
    icon: <Landmark className="h-6 w-6 text-blue-500" />,
    value: '63Mn+',
    label: 'MSMEs in India',
  },
  {
    icon: <Users className="h-6 w-6 text-purple-500" />,
    value: '45%+',
    label: 'Are New-to-Credit (NTC)',
  },
  {
    icon: <PieChart className="h-6 w-6 text-indigo-500" />,
    value: '80%',
    label: 'Lack Adequate Financial Records',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
    value: 'High',
    label: 'Untapped Credit Potential',
  },
];

export function StatsFooter() {
  return (
    <section className="py-12 pb-24 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="rounded-2xl border border-white/10 bg-[#0A0F16]/60 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-8">
            
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
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Mission Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 flex-1 min-w-[250px] border-l border-white/10 pl-8 ml-4 hidden lg:flex"
            >
              <TrendingUp className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <div className="text-sm font-semibold text-emerald-400 mb-1">Our Mission</div>
                <div className="text-xs text-white/60 leading-relaxed">
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
