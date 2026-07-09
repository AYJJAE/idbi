'use client';

import { motion } from 'framer-motion';
import { FileText, Database, AlertTriangle, PieChart, Users } from 'lucide-react';

const CHALLENGES = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: 'Lack of Traditional Documents',
    description: 'Many NTC & NTB enterprises lack complete financial documents.',
    alert: false,
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: 'Fragmented Data',
    description: 'Data exists in silos with no unified assessment framework.',
    alert: false,
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-red-400" />,
    title: 'High Rejection Rates',
    description: 'Good businesses get rejected due to inability to assess true potential.',
    alert: true,
  },
  {
    icon: <PieChart className="h-6 w-6 text-primary" />,
    title: 'Limited Portfolio Diversification',
    description: 'Over-reliance on a small set of traditional borrowers.',
    alert: false,
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Slower Financial Inclusion',
    description: 'Viable MSMEs remain unbanked or underserved.',
    alert: false,
  }
];

export function ChallengeSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-foreground text-center mb-12 tracking-tight"
        >
          The Challenge Banks Face Today
        </motion.h2>

        {/* 
          The design shows 5 cards in a specific layout.
          Top row: 3 cards (Documents, Data, Rejection)
          Bottom row: 2 cards (Diversification, Inclusion) 
          Wait, looking closely at the image, it's 5 cards total. 
          Let's use a flex wrap layout centered, or a responsive grid.
        */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {CHALLENGES.map((challenge, idx) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex-1 min-w-[280px] max-w-[380px] rounded-2xl border p-4 md:p-6 bg-card/40 backdrop-blur-sm transition-colors ${
                challenge.alert 
                  ? 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]' 
                  : 'border-border hover:border-primary/50 hover:bg-card/60'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-2 rounded-lg ${challenge.alert ? 'bg-red-500/10' : 'bg-secondary'}`}>
                  {challenge.icon}
                </div>
                <h3 className={`text-[15px] font-medium ${challenge.alert ? 'text-red-400' : 'text-foreground'}`}>
                  {challenge.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
