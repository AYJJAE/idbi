'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBusinessStore } from '@/store/business-store';
import { extendedBusinessProfiles } from '@/data/business-data';
import { formatCurrency } from '@/lib/utils';
import { MapPin, FileText, Download, Building2, ShieldCheck, Briefcase } from 'lucide-react';
import { EmbeddedAIPanel } from '@/components/embedded-ai-panel';
import { PROMPTS } from '@/services/ai/providers';

export default function BusinessProfilePage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const extendedData = extendedBusinessProfiles[currentBusiness.id] || extendedBusinessProfiles['mfg_pinnacle'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Profile"
        description="Comprehensive overview of corporate identity, ownership, and operational footprint."
        actions={
          <Button size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Company Master Data
          </Button>
        }
      />

      <EmbeddedAIPanel 
        title="AI Business Summary Generator" 
        prompt={PROMPTS.BUSINESS_SUMMARY} 
      />

      {/* Hero Overview */}
      <Card className="border-t-4 border-t-primary overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {currentBusiness.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="secondary" className="font-medium">
                  {extendedData.legalEntity}
                </Badge>
                <Badge variant="outline" className="border-primary/20 text-primary">
                  {currentBusiness.sector}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
                  <MapPin className="mr-1 h-3 w-3" /> {currentBusiness.city}, {currentBusiness.state}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:flex md:gap-8">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">MSME Class</p>
              <p className="text-sm font-semibold">{currentBusiness.msmeCategory}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Annual Turnover</p>
              <p className="text-sm font-semibold">{formatCurrency(currentBusiness.annualTurnover)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Employees</p>
              <p className="text-sm font-semibold">{currentBusiness.employeeCount}</p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ownership">Ownership</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>
        
        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Registrations & Identifiers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CIN</p>
                    <p className="text-sm font-mono font-medium">{extendedData.cin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">GSTIN</p>
                    <p className="text-sm font-mono font-medium">{currentBusiness.gstin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">PAN</p>
                    <p className="text-sm font-mono font-medium">{currentBusiness.pan}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Udyam No.</p>
                    <p className="text-sm font-mono font-medium">{currentBusiness.udyamNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">IEC</p>
                    <p className="text-sm font-mono font-medium">{extendedData.iec}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Incorporated</p>
                    <p className="text-sm font-medium">{new Date(extendedData.dateOfIncorporation).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Compliance & Audit Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${extendedData.auditStatus === 'Audited' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Statutory Audit</p>
                      <p className="text-xs text-muted-foreground">Latest: {new Date(extendedData.latestAuditDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <Badge variant={extendedData.auditStatus === 'Audited' ? 'default' : 'secondary'} className={extendedData.auditStatus === 'Audited' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                    {extendedData.auditStatus}
                  </Badge>
                </div>
                
                <div className="space-y-3 pt-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Key Products / Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {extendedData.keyProducts.map(product => (
                      <Badge key={product} variant="secondary" className="font-normal text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* OWNERSHIP TAB */}
        <TabsContent value="ownership" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle>Shareholding Pattern</CardTitle>
              <CardDescription>Directors, partners, and major shareholders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
                  <div className="col-span-2">Name / Entity</div>
                  <div>Role</div>
                  <div>DIN / Reg. No</div>
                  <div className="text-right">Ownership Share</div>
                </div>
                <div className="divide-y">
                  {extendedData.ownership.map((owner, i) => (
                    <div key={i} className="grid grid-cols-5 items-center p-3 text-sm">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                          {owner.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{owner.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">PAN: {owner.pan}</p>
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline">{owner.role}</Badge>
                      </div>
                      <div className="font-mono text-xs">{owner.din || 'N/A'}</div>
                      <div className="text-right flex items-center justify-end gap-2">
                        <div className="h-2 w-16 bg-secondary/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${owner.share}%` }} />
                        </div>
                        <span className="font-semibold w-8">{owner.share}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOCATIONS TAB */}
        <TabsContent value="locations" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid gap-4 md:grid-cols-2">
            {extendedData.locations.map((loc, i) => (
              <Card key={i} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={loc.type === 'Headquarters' ? 'default' : 'secondary'} className="mb-2">
                        {loc.type}
                      </Badge>
                      <CardTitle className="text-base">{loc.address}</CardTitle>
                    </div>
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium mb-3">{loc.state}</p>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Facilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.facilities.map(fac => (
                        <Badge key={fac} variant="outline" className="text-[10px]">
                          {fac}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Needed for Lucide icon
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
