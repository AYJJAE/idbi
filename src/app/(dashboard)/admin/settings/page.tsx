'use client';

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Settings2, Save, Key, Bell, CreditCard, Building2, Server } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings"
        description="Configure global application preferences, security, and integrations."
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[600px]">
          <TabsTrigger value="general"><Building2 className="h-4 w-4 mr-2" /> General</TabsTrigger>
          <TabsTrigger value="security"><Key className="h-4 w-4 mr-2" /> Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" /> Alerts</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-4 w-4 mr-2" /> Billing</TabsTrigger>
        </TabsList>
        
        <div className="mt-6 max-w-4xl">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Organization Configuration
                </CardTitle>
                <CardDescription>Update fundamental organization details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Organization Name</Label>
                    <Input defaultValue="NEXUS Global Financial" />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input defaultValue="support@nexus.finance" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Corporate Address</Label>
                  <Input defaultValue="123 Financial District, Mumbai, MH 400001" />
                </div>
                <Button className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" /> Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  Security & API Configuration
                </CardTitle>
                <CardDescription>Manage webhook secrets and access policies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sm">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Require 2FA for all administrative accounts.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sm">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">Automatically log out idle users after 15 minutes.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" />
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <Label>Primary Webhook Secret</Label>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="nexus-sec-1234567890" />
                    <Button variant="outline">Rotate Key</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Alert Preferences
                </CardTitle>
                <CardDescription>Determine what events trigger system notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm">Compliance Alerts</h4>
                    <p className="text-sm text-muted-foreground">Notify when a business misses a GST or EPFO filing.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm">Credit Score Drops</h4>
                    <p className="text-sm text-muted-foreground">Notify when a connected business experiences a CIBIL drop.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm">System Maintenance</h4>
                    <p className="text-sm text-muted-foreground">Alerts regarding NEXUS platform downtime.</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-primary rounded cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Subscription & Billing
                </CardTitle>
                <CardDescription>Manage your Enterprise tier limits.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 border-primary/20 border rounded-lg">
                  <h4 className="font-semibold text-primary">Enterprise Plan Active</h4>
                  <p className="text-sm mt-1">Unlimited MSME profiles. Next billing cycle: August 1, 2026.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
