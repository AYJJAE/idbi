'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBusinessStore } from '@/store/business-store';
import { CheckCircle2, Circle, Loader2, ArrowRight, RotateCcw } from 'lucide-react';

export default function OnboardingPage() {
  const { currentBusiness, onboardingSteps, updateOnboardingStep, resetOnboarding } = useBusinessStore();

  const handleSimulate = (stepId: string) => {
    updateOnboardingStep(stepId, 'in_progress');
    setTimeout(() => {
      updateOnboardingStep(stepId, 'completed');
    }, 2000);
  };

  const allCompleted = onboardingSteps.every(s => s.status === 'completed');
  const progressPercent = Math.round((onboardingSteps.filter(s => s.status === 'completed').length / onboardingSteps.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Onboarding"
        description="Connect financial data sources to build your comprehensive MSME profile."
        actions={
          <Button variant="outline" size="sm" onClick={resetOnboarding}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Simulation
          </Button>
        }
      />

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {/* PROGRESS OVERVIEW */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Progress</CardTitle>
              <CardDescription>Overall completion of {currentBusiness.name}'s data connections.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-muted">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="stroke-primary transition-all duration-1000 ease-in-out"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">{progressPercent}%</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-center text-muted-foreground">
                {allCompleted 
                  ? "All systems connected. Profile is fully analyzed." 
                  : "Connect remaining systems to unlock accurate credit matching."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* STEPPER WIZARD */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Connection Wizard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {onboardingSteps.map((step, index) => {
                const isLast = index === onboardingSteps.length - 1;
                return (
                  <div key={step.id} className="relative flex gap-4">
                    {/* Vertical Line */}
                    {!isLast && (
                      <div className="absolute left-4 top-8 bottom-[-2rem] w-[2px] bg-border" />
                    )}
                    
                    {/* Icon Indicator */}
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background border-2">
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="h-full w-full text-emerald-500 bg-background" />
                      ) : step.status === 'in_progress' ? (
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                      <div>
                        <h4 className={`text-sm font-semibold ${step.status === 'completed' ? 'text-foreground' : 'text-foreground'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                      </div>
                      
                      <div className="shrink-0">
                        {step.status === 'completed' ? (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                            Connected
                          </Badge>
                        ) : step.status === 'in_progress' ? (
                          <Badge variant="secondary" className="animate-pulse">
                            Connecting...
                          </Badge>
                        ) : (
                          <Button size="sm" variant="secondary" onClick={() => handleSimulate(step.id)}>
                            Connect <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
