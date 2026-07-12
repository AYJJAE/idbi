'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { simulateApiRequest, MOCK_API_RESPONSES } from '@/data/mock-api';
import { Loader2, Play, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type EndpointKey = keyof typeof MOCK_API_RESPONSES;

export function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointKey>('/api/gst/profile');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [latency, setLatency] = useState<number | null>(null);

  const endpoints = Object.keys(MOCK_API_RESPONSES) as EndpointKey[];

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    setLatency(null);
    
    const start = Date.now();
    const result = await simulateApiRequest(selectedEndpoint);
    const end = Date.now();
    
    setResponse(result.response);
    setLatency(end - start);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Sidebar / Configuration */}
      <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            API Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {endpoints.map((ep) => {
            const isSelected = selectedEndpoint === ep;
            const method = ep.includes('aa/connect') || ep.includes('ocen/loan') ? 'POST' : 'GET';
            
            return (
              <button
                key={ep}
                onClick={() => {
                  setSelectedEndpoint(ep);
                  setResponse(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono transition-colors flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-background hover:bg-accent border border-border/50 text-muted-foreground'
                }`}
              >
                <Badge variant={method === 'GET' ? 'default' : 'secondary'} className="text-[10px] px-1 h-4">
                  {method}
                </Badge>
                <span className="truncate">{ep}</span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Explorer / Playground */}
      <Card className="lg:col-span-2 bg-[#0d1117] text-gray-300 border-border/50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3 font-mono text-sm">
            <span className={selectedEndpoint.includes('connect') || selectedEndpoint.includes('loan') ? 'text-purple-400' : 'text-blue-400'}>
              {selectedEndpoint.includes('connect') || selectedEndpoint.includes('loan') ? 'POST' : 'GET'}
            </span>
            <span className="text-gray-100">https://api.nexus.demo{selectedEndpoint}</span>
          </div>
          <Button 
            onClick={handleExecute} 
            disabled={loading}
            size="sm"
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-3 w-3 mr-2" />}
            Execute Request
          </Button>
        </div>
        
        <div className="flex-1 p-4 overflow-auto min-h-[300px] font-mono text-sm relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-gray-500"
              >
                <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                <p>Waiting for DPI response...</p>
              </motion.div>
            ) : response ? (
              <motion.div 
                key="response"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 text-xs pb-2 border-b border-white/10">
                  <span className="flex items-center gap-1">
                    Status: <span className="text-emerald-400">200 OK</span>
                  </span>
                  <span className="flex items-center gap-1">
                    Time: <span className="text-amber-400">{latency}ms</span>
                  </span>
                </div>
                <pre className="text-green-300 overflow-x-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center text-gray-600"
              >
                Click &quot;Execute Request&quot; to simulate API call
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
