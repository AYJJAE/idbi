'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCheck, ShieldCheck, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CkycPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <PageHeader
        title="CKYC Integration"
        description="Central KYC Registry identity verification."
        actions={<Button variant="outline" size="sm">Initiate KYC Sync</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-orange-500" />
              KYC Status
            </CardTitle>
            <CardDescription>Verified Director/Promoter Identities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border border-border/50 rounded-lg p-4 bg-background">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/10 p-2 rounded-full text-orange-500">
                    <Fingerprint className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Rahul Sharma</h4>
                    <p className="text-xs text-muted-foreground">CKYC ID: 10002938475628</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Verified</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">PAN Status</span>
                  <span className="font-medium flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> Valid</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Aadhaar Status</span>
                  <span className="font-medium flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> Linked</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
