import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600', '700'],
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    default: 'NEXUS — Financial Health Intelligence',
    template: '%s | NEXUS',
  },
  description:
    'AI-powered MSME Financial Health Intelligence Platform. Transform fragmented financial data into an explainable Financial Health Card and Digital Financial Passport.',
  keywords: ['MSME', 'Financial Health', 'AI', 'Credit Score', 'Banking', 'Financial Passport'],
};

import { QueryProvider } from '@/lib/query-provider';
import { ThemeProvider } from '@/components/theme-provider';

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
