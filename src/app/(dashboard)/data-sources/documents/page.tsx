'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBusinessStore } from '@/store/business-store';
import { Download, FileText, UploadCloud, Folder, Search, MoreVertical, FileArchive, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function DocumentVaultPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);

  const documents = [
    { id: 'doc-1', name: 'Certificate of Incorporation.pdf', category: 'Legal', date: '2025-01-15', status: 'Verified', size: '1.2 MB' },
    { id: 'doc-2', name: 'Board Resolution - Bank Auth.pdf', category: 'Governance', date: '2025-01-10', status: 'Verified', size: '0.8 MB' },
    { id: 'doc-3', name: 'Audited Financials FY24.pdf', category: 'Financial', date: '2024-11-20', status: 'Verified', size: '4.5 MB' },
    { id: 'doc-4', name: 'MSME Udyam Certificate.pdf', category: 'Statutory', date: '2024-06-15', status: 'Verified', size: '0.5 MB' },
    { id: 'doc-5', name: 'Directors KYC (Aadhaar/PAN).zip', category: 'KYC', date: '2025-01-20', status: 'Pending Review', size: '5.2 MB' },
    { id: 'doc-6', name: 'GST Registration Certificate.pdf', category: 'Statutory', date: '2024-05-10', status: 'Verified', size: '0.7 MB' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Secure Document Vault"
        description="Encrypted repository for corporate governance, legal, and statutory documents."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Folder className="mr-1.5 h-3.5 w-3.5" />
              New Folder
            </Button>
            <Button size="sm">
              <UploadCloud className="mr-1.5 h-3.5 w-3.5" />
              Upload Files
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono mb-2">12.9 MB</div>
            <div className="w-full bg-primary/20 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">15% of 100 MB Allocation</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">24</div>
              <FileArchive className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Across 5 categories</p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Verified & Digitally Signed</span>
              </div>
              <span className="font-bold">22</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <ShieldAlert className="h-4 w-4 text-amber-500" />
                <span>Pending Review</span>
              </div>
              <span className="font-bold">2</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Corporate Documents</CardTitle>
            <CardDescription>File repository for {currentBusiness.name}</CardDescription>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm text-muted-foreground bg-muted/50">
            <Search className="h-4 w-4" />
            <span className="w-40">Search files...</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
              <div className="col-span-5">Filename</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Upload Date</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Size</div>
            </div>
            <div className="divide-y">
              {documents.map((doc) => (
                <div key={doc.id} className="grid grid-cols-12 items-center p-3 text-sm hover:bg-muted/30 transition-colors">
                  <div className="col-span-5 flex items-center gap-3 pr-4">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium truncate">{doc.name}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="text-[10px] font-normal">{doc.category}</Badge>
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">
                    {doc.date}
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5">
                    {doc.status === 'Verified' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    <span className="text-xs">{doc.status}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                    {doc.size}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
