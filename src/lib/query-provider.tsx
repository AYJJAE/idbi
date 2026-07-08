// =============================================================================
// NEXUS — Query Provider (TanStack Query React Wrapper)
// =============================================================================

'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute stale threshold
            refetchOnWindowFocus: false, // Prevent distracting refetches on refocus
            retry: false, // Controlled by Axios retry logic instead
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
