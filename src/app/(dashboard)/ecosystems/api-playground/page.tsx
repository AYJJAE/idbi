'use client';

import { PageHeader } from '@/components/page-header';
import { ApiExplorer } from '@/features/ecosystems/components/api-explorer';

export default function ApiPlaygroundPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="API Playground"
        description="Developer console to interact with the mock financial ecosystem integrations."
      />

      <ApiExplorer />
    </div>
  );
}
