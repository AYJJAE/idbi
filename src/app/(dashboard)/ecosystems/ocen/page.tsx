'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Banknote, Users, Activity, CheckCircle2, Building, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_OFFERS = [
  { id: 'OFR-001', lender: 'HDFC Bank', amount: '₹15,00,000', interest: '9.5% p.a.', processing: '2 Days', prob: '94%' },
  { id: 'OFR-002', lender: 'ICICI Bank', amount: '₹12,00,000', interest: '10.2% p.a.', processing: '1 Day', prob: '98%' },
  { id: 'OFR-003', lender: 'Bajaj Finserv', amount: '₹20,00,000', interest: '11.5% p.a.', processing: '4 Hours', prob: '85%' },
  { id: 'OFR-004', lender: 'LendingKart', amount: '₹10,00,000', interest: '12.0% p.a.', processing: 'Instant', prob: '99%' }
];

export default function OcenPage() {
  const [loading, setLoading] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const generateOffers = () => {
    setLoading(true);
    setShowOffers(false);
    setTimeout(() => {
      setLoading(false);
      setShowOffers(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="Open Credit Enablement Network (OCEN)"
        description="Decentralized loan marketplace for MSME credit."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-cyan-500/10 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-cyan-500 flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                OCEN Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">Production Ready</div>
              <div className="text-xs text-muted-foreground mt-1">Lender Gateway Active</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Network Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">LSPs</span>
                <span className="font-medium">45+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lenders</span>
                <span className="font-medium">120+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Underwriting Models</span>
                <span className="font-medium">Standardized</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Request Generator */}
        <div className="md:col-span-3 space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Loan Request Generator</CardTitle>
                <CardDescription>Simulate broadcasting a loan request to the OCEN network based on NEXUS Financial Passport.</CardDescription>
              </div>
              <Button onClick={generateOffers} disabled={loading} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                {loading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
                Generate Mock Request
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-muted-foreground"
                  >
                    <RefreshCcw className="h-10 w-10 animate-spin mb-4 text-cyan-500" />
                    <p>Broadcasting request to lender network...</p>
                  </motion.div>
                ) : showOffers ? (
                  <motion.div 
                    key="offers"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 text-emerald-500 font-medium mb-4">
                      <CheckCircle2 className="h-5 w-5" />
                      Received 4 loan offers
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_OFFERS.map((offer, i) => (
                        <motion.div key={offer.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                          <Card className="bg-background border-border/50 hover:border-cyan-500/50 transition-colors">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Building className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{offer.lender}</p>
                                    <p className="text-xs text-muted-foreground">{offer.id}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-emerald-500">{offer.prob} Match</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm pt-4 border-t border-border/50">
                                <div>
                                  <p className="text-xs text-muted-foreground">Amount</p>
                                  <p className="font-medium">{offer.amount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Interest</p>
                                  <p className="font-medium">{offer.interest}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">SLA</p>
                                  <p className="font-medium">{offer.processing}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                    <Users className="h-10 w-10 mb-4 opacity-50" />
                    <p>Click "Generate Mock Request" to simulate OCEN offers.</p>
                  </div>
                )}
              </AnimatePresence>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
