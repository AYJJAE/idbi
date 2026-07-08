'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-4 py-1.5 mb-8 backdrop-blur-md"
            >
              <span className="text-xs font-semibold tracking-wide text-[#a78bfa] uppercase">
                AI-Powered MSME Credit Evaluation
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Beyond Traditional.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]">
                Towards Inclusion.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
              Empowering banks to assess MSMEs beyond paperwork using alternate data, intelligent insights, and fairer decisions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#4338ca] hover:to-[#6d28d9] text-white border-0 h-14 px-8 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] hover:-translate-y-1"
                >
                  Explore Solution
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white bg-transparent hover:bg-white/5 h-14 px-8 rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Right Content - 3D Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 10 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[2000px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6366f1]/20 to-[#a855f7]/20 blur-[100px] rounded-full" />
            
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotateZ: [0, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
              className="relative w-full max-w-[800px] rounded-2xl border border-white/10 bg-[#0f141f]/80 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden transform-gpu"
              style={{
                transform: 'rotateY(-15deg) rotateX(10deg) rotateZ(2deg)',
              }}
            >
              <Image 
                src="/images/dashboard-mockup.png"
                alt="NEXUS Dashboard Mockup"
                width={1200}
                height={800}
                className="w-full h-auto object-cover opacity-90 mix-blend-screen"
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
