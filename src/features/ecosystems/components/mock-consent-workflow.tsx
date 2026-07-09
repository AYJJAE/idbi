'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Landmark, Smartphone, ArrowRight, ShieldCheck, CheckCircle2, Loader2, Key, Network } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const steps = [
  { id: 1, title: 'Connect Bank Account', desc: 'Initiate Account Aggregator flow' },
  { id: 2, title: 'Select Bank', desc: 'Choose your financial institution' },
  { id: 3, title: 'Grant Consent', desc: 'Authorize data sharing' },
  { id: 4, title: 'Verification', desc: 'Secure OTP validation' },
  { id: 5, title: 'Data Imported', desc: 'Financial data successfully synced' }
];

export function MockConsentWorkflow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep === steps.length) {
      setCurrentStep(1); // Reset
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(s => s + 1);
    }, 800);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          Account Aggregator Consent Flow
        </CardTitle>
        <CardDescription>
          Simulating a production FIU (Financial Information User) data request via Sahamati AA framework.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Progress Bar */}
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 z-0 rounded-full" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full" 
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                currentStep >= step.id 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'bg-secondary text-muted-foreground border border-border'
              }`}>
                {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground absolute -bottom-6 whitespace-nowrap hidden md:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[200px] flex items-center justify-center pt-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center text-muted-foreground"
              >
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                <p>Processing with DPI network...</p>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md text-center space-y-6"
              >
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Network className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Initiate Data Fetch</h3>
                    <p className="text-sm text-muted-foreground">We need your consent to fetch your financial data (Bank Statements, GST, etc.) directly from your institutions.</p>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Select Data Source</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI'].map(bank => (
                        <div key={bank} className="p-3 border border-border rounded-lg bg-background hover:border-primary/50 cursor-pointer flex flex-col items-center gap-2">
                          <Landmark className="h-6 w-6 text-muted-foreground" />
                          <span className="text-sm font-medium">{bank}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4 text-left">
                    <h3 className="text-lg font-semibold text-foreground text-center">Consent Request</h3>
                    <Card className="bg-background/50">
                      <CardContent className="pt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Purpose:</span>
                          <span className="font-medium text-right">Loan Assessment (Working Capital)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data Requested:</span>
                          <span className="font-medium text-right">Profile, Summary, Transactions</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium text-right">Last 12 Months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Consent Expiry:</span>
                          <span className="font-medium text-right">30 Days</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                      <Smartphone className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Verify Identity</h3>
                    <p className="text-sm text-muted-foreground">An OTP has been sent to your Aadhaar-linked mobile number.</p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="w-10 h-12 border-2 border-border rounded-md bg-background flex items-center justify-center text-lg font-mono">
                          •
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-500">Success!</h3>
                    <p className="text-sm text-muted-foreground">Your financial data has been successfully imported and securely stored via the Account Aggregator network.</p>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      145 Records Synced
                    </Badge>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t border-border/50 pt-4 bg-muted/20">
        <Button onClick={handleNext} disabled={loading} className="gap-2">
          {currentStep === steps.length ? 'Restart Demo' : (
            <>
              {currentStep === 4 ? 'Verify & Fetch' : 'Proceed'}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
