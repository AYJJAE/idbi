'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Landmark, ShieldCheck, Map, Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function UliPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="Unified Lending Interface (ULI)"
        description="Frictionless credit via standard API-based integrations for lenders."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-500 flex items-center gap-2">
                <Landmark className="h-5 w-5" />
                ULI Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">Production Ready</div>
              <div className="text-xs text-muted-foreground mt-1">Mock responses enabled</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Connection Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Latency</span>
                <span className="text-emerald-500 font-medium">45ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="text-emerald-500 font-medium">99.8%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Supported Services</CardTitle>
              <CardDescription>Data sources available through the Unified Lending Interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Land Records', icon: Map, status: 'Active', desc: 'Verify land ownership and encumbrance.' },
                  { title: 'Income Verification', icon: Calculator, status: 'Active', desc: 'Fetch verified ITR and GST data.' },
                  { title: 'Property Valuation', icon: ShieldCheck, status: 'Active', desc: 'Standardized valuation certificates.' },
                  { title: 'Business Financials', icon: Landmark, status: 'Active', desc: 'MCA and EPFO integration.' }
                ].map((svc, i) => {
                  const Icon = svc.icon;
                  return (
                    <motion.div key={svc.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <div className="p-4 rounded-lg border border-border/50 bg-background flex items-start gap-4">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            {svc.title}
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500">
                              {svc.status}
                            </span>
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{svc.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Workflow Diagram */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Lending Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-black/10 rounded-lg border border-border/50 overflow-x-auto">
                <div className="text-center min-w-[100px]">
                  <div className="h-12 w-12 mx-auto bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center border border-blue-500/20 mb-2">
                    <span className="font-bold">1</span>
                  </div>
                  <span className="text-sm font-medium">Business Consent</span>
                </div>
                <ArrowRight className="text-muted-foreground h-5 w-5 hidden md:block" />
                <div className="text-center min-w-[100px]">
                  <div className="h-12 w-12 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center border border-amber-500/20 mb-2">
                    <span className="font-bold">2</span>
                  </div>
                  <span className="text-sm font-medium">ULI Gateway</span>
                </div>
                <ArrowRight className="text-muted-foreground h-5 w-5 hidden md:block" />
                <div className="text-center min-w-[100px]">
                  <div className="h-12 w-12 mx-auto bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center border border-purple-500/20 mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <span className="text-sm font-medium">Verified Data</span>
                </div>
                <ArrowRight className="text-muted-foreground h-5 w-5 hidden md:block" />
                <div className="text-center min-w-[100px]">
                  <div className="h-12 w-12 mx-auto bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20 mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <span className="text-sm font-medium">FIE Engine</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button>Simulate ULI Request</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
