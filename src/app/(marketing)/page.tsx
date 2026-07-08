import { HeroSection } from '@/features/marketing/components/hero-section';
import { ScrollingMarquee } from '@/features/marketing/components/scrolling-marquee';
import { ChallengeSection } from '@/features/marketing/components/challenge-section';
import { StatsFooter } from '@/features/marketing/components/stats-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEXUS | AI-Powered MSME Financial Intelligence',
  description: 'Empowering banks to assess MSMEs beyond paperwork using alternate data, intelligent insights, and fairer decisions.',
};

export default function MarketingPage() {
  return (
    <>
      <HeroSection />
      <ScrollingMarquee />
      <ChallengeSection />
      <StatsFooter />
    </>
  );
}
