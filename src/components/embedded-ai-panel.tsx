'use client';

import * as React from 'react';
import { useChat } from 'ai/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useBusinessStore } from '@/store/business-store';
import { intelligenceData as healthData } from '@/data/intelligence-data';
import { creditData, insightsData } from '@/data/credit-insights-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmbeddedAIPanelProps {
  title: string;
  prompt: string;
}

export function EmbeddedAIPanel({ title, prompt }: EmbeddedAIPanelProps) {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);

  const currentContext = React.useMemo(() => ({
    currentBusiness,
    financialData: healthData[currentBusiness.id] || healthData['default'],
    creditInsightsData: {
      credit: creditData[currentBusiness.id] || creditData['default'],
      insights: insightsData[currentBusiness.id] || insightsData['default']
    }
  }), [currentBusiness]);

  const { messages, append, isLoading, reload } = useChat({
    api: '/api/chat',
    body: { data: currentContext },
    initialMessages: []
  });

  React.useEffect(() => {
    if (messages.length === 0) {
      append({
        id: 'embed-' + Date.now().toString(),
        role: 'user',
        content: prompt
      });
    }
  }, [currentBusiness, prompt, append, messages.length]);

  const aiMessage = messages.findLast(m => m.role === 'assistant');

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Sparkles className="h-4 w-4" />
            {title}
          </CardTitle>
          <CardDescription className="text-xs">AI-generated contextual insight</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => reload()} disabled={isLoading} className="h-8 text-xs text-primary">
          Regenerate
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && !aiMessage && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="h-4 w-4 animate-spin text-primary" /> Analyzing context...
          </div>
        )}

        {aiMessage && (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiMessage.content}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
