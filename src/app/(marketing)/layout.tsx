import { PageTransition } from '@/components/page-transition';
import { MarketingHeader } from '@/features/marketing/components/marketing-header';
import { tokens } from '@/design/tokens';
import { cn } from '@/lib/utils';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Deep ambient background */}
      <div
        className={cn("pointer-events-none fixed inset-0 z-0 dark:opacity-40 opacity-10 dark:mix-blend-screen", tokens.gradients.classes.meshDark)}
      />

      {/* Stars/Dust overlay for that dark space premium feel */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

      <MarketingHeader />

      <main className="relative z-10 flex-1 w-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
