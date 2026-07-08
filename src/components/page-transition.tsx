'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.995 }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 35,
          mass: 0.8,
        }}
        className="flex h-full w-full flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
