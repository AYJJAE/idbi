'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Copy & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8 backdrop-blur-md"
            >
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                AI-Powered MSME Credit Evaluation
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
              Beyond Traditional.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008C5A] via-[#2DBE7F] to-[#008C5A]">
                Towards Inclusion.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Empowering banks to assess MSMEs beyond paperwork using alternate data, intelligent insights, and fairer decisions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#008C5A] to-[#2DBE7F] hover:from-[#006C45] hover:to-[#008C5A] text-white border-0 h-14 px-8 rounded-xl shadow-[0_0_30px_rgba(0,140,90,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,140,90,0.6)] hover:-translate-y-1"
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
                className="border-border text-foreground bg-transparent hover:bg-accent h-14 px-8 rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
