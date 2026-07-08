'use client';

import { motion } from 'framer-motion';

const DATA_SOURCES = [
  { name: 'GST', color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'UPI', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Account Aggregator', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'EPFO', color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'E-Way Bill', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'Bank Statement', color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

export function ScrollingMarquee() {
  return (
    <section className="relative z-20 py-8 border-y border-white/5 bg-[#0A0F16]/80 backdrop-blur-md overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center px-6 lg:px-8">
        
        {/* Label */}
        <div className="flex-shrink-0 pr-8 mr-8 border-r border-white/10 hidden md:block">
          <p className="text-sm font-medium text-white/70">Leverage Rich Alternate Data</p>
        </div>

        {/* Marquee Container */}
        <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: [0, -1035] }} // Adjust based on content width
            transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
            className="flex flex-none items-center gap-12"
          >
            {/* Double the array for seamless looping */}
            {[...DATA_SOURCES, ...DATA_SOURCES, ...DATA_SOURCES].map((source, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${source.bg}`}>
                  {/* Generic icon shape for mockup purposes */}
                  <div className={`h-4 w-4 rounded-sm border-2 ${source.color} border-current opacity-80`} />
                </div>
                <span className="text-sm font-semibold text-white/80 whitespace-nowrap">
                  {source.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex-shrink-0 pl-8 ml-8 border-l border-white/10 hidden md:block">
           <div className="flex items-center gap-2 text-white/50">
             <div className="flex gap-0.5">
               <span className="h-1 w-1 rounded-full bg-white/50" />
               <span className="h-1 w-1 rounded-full bg-white/50" />
               <span className="h-1 w-1 rounded-full bg-white/50" />
             </div>
             <span className="text-xs font-medium uppercase tracking-wider">& More</span>
           </div>
        </div>

      </div>
    </section>
  );
}
