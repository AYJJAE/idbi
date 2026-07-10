'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Mic, Send, Bot, User, Sparkles, TrendingUp, AlertTriangle, Target, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CHAT = [
  { role: 'assistant', text: 'Hello! I am your NEXUS Wealth Avatar. Based on your recent salary credit and existing market portfolio, I notice you have ₹45,000 in surplus cash this month. Would you like to allocate this towards your "Buy a House" goal or invest in the new NIFTY 50 Index Fund?', time: '09:00 AM' },
  { role: 'user', text: 'How is my portfolio performing this week?', time: '09:05 AM' },
  { role: 'assistant', text: 'Your portfolio is up by 1.2% this week, outperforming the benchmark by 0.4%. The major contributor was your holding in HDFC Bank. However, your debt allocation is slightly below the recommended 30% for your risk profile. Should we rebalance?', time: '09:05 AM', confidence: '98%' },
];

const SUGGESTED_QUESTIONS = [
  "How can I optimize my taxes?",
  "Am I on track for retirement?",
  "Analyze my monthly spending.",
];

export function AIWealthAvatar() {
  const [chat, setChat] = useState(MOCK_CHAT);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChat([...chat, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setChat(prev => [...prev, {
        role: 'assistant',
        text: 'This is a simulated AI response. In a production environment, this would analyze your exact portfolio composition and real-time market data to provide actionable advice.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: '95%'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3 h-[calc(100vh-250px)] min-h-[600px]">
      {/* Main Chat Area */}
      <Card className="md:col-span-2 flex flex-col overflow-hidden border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background"></span>
              </div>
              <div>
                <CardTitle className="text-lg">NEXUS Wealth Avatar</CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active & Listening
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background"><Sparkles className="h-3 w-3 mr-1 text-amber-500" /> Premium Tier</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden relative">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {chat.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      {msg.confidence && (
                        <Badge variant="outline" className="text-[9px] px-1 h-3.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          {msg.confidence} Confidence
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-muted rounded-tl-sm flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 bg-background border-t border-border/50 flex-col gap-3">
          <div className="flex gap-2 w-full overflow-x-auto nexus-scrollbar pb-1">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-primary/10 hover:text-primary whitespace-nowrap py-1.5 transition-colors" onClick={() => setInput(q)}>
                {q}
              </Badge>
            ))}
          </div>
          <div className="flex w-full gap-2 items-center">
            <Button variant="outline" size="icon" className="shrink-0 h-10 w-10 rounded-full">
              <Mic className="h-4 w-4" />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your Wealth Avatar anything..." 
              className="flex-1 rounded-full h-10 bg-muted/50 border-transparent focus-visible:ring-primary/20"
            />
            <Button size="icon" className="shrink-0 h-10 w-10 rounded-full" onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Right Sidebar */}
      <div className="space-y-4 overflow-y-auto nexus-scrollbar pr-1">
        {/* Daily Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Daily Wealth Briefing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">Markets are trading in the green. Your tech-heavy mutual funds are expected to yield higher today.</p>
            <div className="bg-primary/10 p-3 rounded-lg flex items-start gap-3">
              <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary">Portfolio +₹12,450</p>
                <p className="text-xs text-primary/80">Expected movement today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Life Insurance Premium</p>
                <p className="text-xs text-muted-foreground mt-0.5">Due in 5 days (₹12,000). Autopay is set up.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-400">High Discretionary Spend</p>
                <p className="text-xs text-amber-700/80 dark:text-amber-500/80 mt-0.5">Dining expenses exceeded monthly budget by 15%.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" /> Goal Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>House Downpayment</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">On track for Q3 2026 completion.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
