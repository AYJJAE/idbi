'use client';

import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export function DeviceSimulator({ children }: { children: React.ReactNode }) {
  const { simulatorMode, setSimulatorMode } = useDashboardStore();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsIframe(window !== window.parent);
  }, []);

  if (!mounted) return <>{children}</>;

  // If we are already inside the iframe, just render the app normally
  if (isIframe) {
    return <>{children}</>;
  }

  // If desktop mode, render normally
  if (simulatorMode === 'desktop') {
    return <>{children}</>;
  }

  const isPhone = simulatorMode === 'phone';
  
  // Construct the iframe URL (we no longer need a query param, but we can pass the pathname)
  const currentUrl = new URL(window.location.href);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0B1114] p-4 lg:p-8 fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "relative overflow-hidden bg-background flex flex-col transition-all duration-500 rounded-[3rem] border-[14px] border-zinc-900 shadow-2xl",
          isPhone ? "w-[390px] h-[844px]" : "w-[820px] h-[1180px] max-h-[90vh]"
        )}
      >
        {/* Dynamic Island / Notch Simulation */}
        {isPhone && (
          <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-[110] pointer-events-none">
            <div className="w-[120px] h-[30px] bg-zinc-900 rounded-b-3xl"></div>
          </div>
        )}
        
        {/* App Content inside Iframe */}
        <iframe 
          src={currentUrl.toString()} 
          className="w-full h-full border-0 bg-background"
          title="Device Simulator"
        />
      </motion.div>

      {/* Back to Desktop Button */}
      <div className="absolute top-6">
        <button
          onClick={() => setSimulatorMode('desktop')}
          className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <Monitor className="h-4 w-4" />
          Back to Desktop
        </button>
      </div>
    </div>
  );
}
