'use client';

import * as React from 'react';
import { useChat } from 'ai/react';
import { Bot, X, Maximize2, Minimize2, Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useBusinessStore } from '@/store/business-store';
import { intelligenceData as healthData } from '@/data/intelligence-data';
import { creditData, insightsData } from '@/data/credit-insights-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AICopilot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);

  // Aggregate current context to send to the AI
  const currentContext = React.useMemo(() => ({
    currentBusiness,
    financialData: healthData[currentBusiness.id] || healthData['default'],
    creditInsightsData: {
      credit: creditData[currentBusiness.id] || creditData['default'],
      insights: insightsData[currentBusiness.id] || insightsData['default']
    }
  }), [currentBusiness]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    body: {
      data: currentContext
    }
  });

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-transform hover:scale-105 z-50 flex items-center justify-center p-0"
      >
        <Sparkles className="h-6 w-6 text-primary-foreground" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 flex flex-col shadow-2xl transition-all duration-300 ${isExpanded ? 'w-[800px] h-[80vh]' : 'w-[400px] h-[600px]'} border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80`}>
      <CardHeader className="p-4 border-b bg-muted/30 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold">NEXUS AI Copilot</CardTitle>
            <p className="text-[10px] text-muted-foreground">Enterprise Financial Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 mt-8 opacity-80">
              <div className="bg-primary/10 p-4 rounded-full">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">How can I assist you?</h3>
                <p className="text-xs text-muted-foreground max-w-[250px]">
                  I am analyzing {currentContext.currentBusiness.name}&apos;s financial health, credit readiness, and risk profile.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Button variant="outline" className="text-xs justify-start h-auto py-2 px-3 whitespace-normal text-left" onClick={() => handleInputChange({ target: { value: "Why is the Financial Health Score at its current level?" } } as any)}>
                  &quot;Why is the Financial Health Score at its current level?&quot;
                </Button>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Button variant="outline" className="text-xs justify-start h-auto py-2 px-3 whitespace-normal text-left" onClick={() => handleInputChange({ target: { value: "What are the primary operational risks?" } } as any)}>
                  &quot;What are the primary operational risks?&quot;
                </Button>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Button variant="outline" className="text-xs justify-start h-auto py-2 px-3 whitespace-normal text-left" onClick={() => handleInputChange({ target: { value: "Generate a Business Overview summary." } } as any)}>
                  &quot;Generate a Business Overview summary.&quot;
                </Button>
              </div>
            </div>
          )}
          
          {messages.map(m => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                {m.role === 'user' ? <span className="text-xs font-bold">U</span> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 border shadow-sm'}`}>
                {m.role === 'user' ? (
                  m.content
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-a:text-primary">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center bg-muted text-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted/50 border rounded-lg p-3 text-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-muted-foreground text-xs">Analyzing financial data...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span>Connection error. Please check your API key.</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-muted border-0 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask NEXUS AI..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="text-[10px] text-center text-muted-foreground mt-2">
          AI may hallucinate. Verify critical insights with actual dashboard data.
        </div>
      </div>
    </Card>
  );
}
