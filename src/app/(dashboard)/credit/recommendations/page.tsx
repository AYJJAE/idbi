'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { creditData } from '@/data/credit-insights-data';
import { Sparkles, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';

export default function AIRecommendationsPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const data = creditData[currentBusiness.id] || creditData['default'];

  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Product Recommendations"
        description="Machine learning driven loan product matches based on cash flow topology and collateral."
      />

      <Card className="border-secondary/20 bg-secondary/5">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">Matched {data.recommendedProducts.length} Institutional Products</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Based on the Readiness Score of {data.readinessScore}/100 and a DSCR of {data.dscr}x, NEXUS AI has matched these lending products from partner banks with high approval probability.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.recommendedProducts.map((product: any) => (
          <Card key={product.id} className="flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors">
            {product.likelihood === 'High' && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
                HIGH PROBABILITY
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-muted rounded-md text-foreground">
                  <DollarSign className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="text-[10px]">{currentBusiness.sector}</Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-semibold">Pre-Approved Limit</p>
                <p className="text-2xl font-black text-foreground mt-0.5">{formatCurrency(product.amount)}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="p-2 bg-muted/50 rounded border text-center">
                  <p className="text-[10px] text-muted-foreground">Est. Rate</p>
                  <p className="font-bold text-sm">{product.rate}% p.a.</p>
                </div>
                <div className="p-2 bg-muted/50 rounded border text-center">
                  <p className="text-[10px] text-muted-foreground">Turnaround</p>
                  <p className="font-bold text-sm">48 Hrs</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>No collateral required up to ₹2Cr</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Digital end-to-end sanction</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full group-hover:bg-primary/90">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
