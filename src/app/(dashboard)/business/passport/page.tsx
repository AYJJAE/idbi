'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ShieldCheck, 
  CheckCircle2,
  Fingerprint,
  FileDigit,
  Lock,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  Play,
  RotateCcw,
  Database,
  Activity,
  Award,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useBusinessStore } from '@/store/business-store';
import { extendedPassportData, RelationshipNode } from '@/data/passport-extended-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  AreaChart, 
  Area 
} from 'recharts';

export default function FinancialPassportPage() {
  const currentBusiness = useBusinessStore((state) => state.currentBusiness);
  const passport = React.useMemo(() => {
    return extendedPassportData[currentBusiness.id] || extendedPassportData['mfg_pinnacle'];
  }, [currentBusiness.id]);

  // UI State
  const [downloading, setDownloading] = React.useState<string | null>(null);
  const [downloadComplete, setDownloadComplete] = React.useState<string | null>(null);
  const [selectedNode, setSelectedNode] = React.useState<RelationshipNode | null>(null);
  const [timelineFilter, setTimelineFilter] = React.useState<number | 'ALL'>('ALL');
  const [evolutionTab, setEvolutionTab] = React.useState<'30D' | '90D' | '1Y' | '3Y'>('90D');
  const [presentationMode, setPresentationMode] = React.useState(false);
  const [presentationStep, setPresentationStep] = React.useState(0);
  const [explainMetric, setExplainMetric] = React.useState<string | null>(null);

  // Graph Pan / Zoom State
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  // Refs for Presentation Walkthrough
  const headerRef = React.useRef<HTMLDivElement>(null);
  const identityRef = React.useRef<HTMLDivElement>(null);
  const dnaRef = React.useRef<HTMLDivElement>(null);
  const explainabilityRef = React.useRef<HTMLDivElement>(null);
  const relationshipRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const risksRef = React.useRef<HTMLDivElement>(null);
  const benchmarksRef = React.useRef<HTMLDivElement>(null);
  const evolutionRef = React.useRef<HTMLDivElement>(null);
  const documentsRef = React.useRef<HTMLDivElement>(null);
  const summaryRef = React.useRef<HTMLDivElement>(null);

  const sectionRefs = React.useMemo(() => ({
    header: headerRef,
    identity: identityRef,
    dna: dnaRef,
    explainability: explainabilityRef,
    relationship: relationshipRef,
    timeline: timelineRef,
    risks: risksRef,
    benchmarks: benchmarksRef,
    evolution: evolutionRef,
    documents: documentsRef,
    summary: summaryRef,
  }), []);

  const steps = [
    { target: 'header', title: 'Financial Health Header', desc: 'Real-time corporate credit ranking, national percentile ranking and custom recommended credit limits.' },
    { target: 'identity', title: 'Business Identity', desc: 'Secure statutory data verified against MCA, GSTN and PAN registry databases.' },
    { target: 'dna', title: 'Financial DNA Strands', desc: 'Vibrant, dynamic strands representing core pillars of operation: Liquidity, Revenue, Trust, and Stability.' },
    { target: 'relationship', title: 'Relationship Intelligence', desc: 'Visual network map illustrating how transactions flow between owners, directors, suppliers, and customer entities.' },
    { target: 'risks', title: 'Risk Intelligence Matrix', desc: 'Multi-dimensional risk radar monitoring operational, liquidity, compliance and supply-chain metrics.' },
    { target: 'explainability', title: 'Explainability Engine', desc: 'Full transparency breakdown. Audit formulas, weights, evidence codes, and digital source registries.' }
  ];

  const handleNextStep = () => {
    if (presentationStep < steps.length - 1) {
      const nextStep = presentationStep + 1;
      setPresentationStep(nextStep);
      const targetRef = sectionRefs[steps[nextStep].target as keyof typeof sectionRefs];
      targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setPresentationMode(false);
      setPresentationStep(0);
    }
  };

  const handlePrevStep = () => {
    if (presentationStep > 0) {
      const prevStep = presentationStep - 1;
      setPresentationStep(prevStep);
      const targetRef = sectionRefs[steps[prevStep].target as keyof typeof sectionRefs];
      targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDownload = (docType: string) => {
    setDownloading(docType);
    setDownloadComplete(null);
    setTimeout(() => {
      setDownloading(null);
      setDownloadComplete(docType);
      setTimeout(() => setDownloadComplete(null), 3000);
    }, 2000);
  };

  // Timeline Filtering
  const uniqueTimelineYears = React.useMemo(() => {
    const years = passport.timeline.map(e => e.year);
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [passport.timeline]);

  const filteredTimeline = React.useMemo(() => {
    if (timelineFilter === 'ALL') return passport.timeline;
    return passport.timeline.filter(e => e.year === timelineFilter);
  }, [passport.timeline, timelineFilter]);

  // Recharts Evolution Formatting
  const evolutionData = React.useMemo(() => {
    let scores = passport.evolution.days90;
    let labels = passport.evolution.labels90;
    if (evolutionTab === '30D') {
      scores = passport.evolution.days30;
      labels = passport.evolution.labels30;
    } else if (evolutionTab === '1Y') {
      scores = passport.evolution.year1;
      labels = passport.evolution.labels1Y;
    } else if (evolutionTab === '3Y') {
      scores = passport.evolution.year3;
      labels = passport.evolution.labels3Y;
    }
    return labels.map((label, i) => ({
      name: label,
      Score: scores[i] || 700
    }));
  }, [passport, evolutionTab]);

  // Graph interaction helpers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.min(Math.max(zoom - e.deltaY * 0.001, 0.4), 2);
    setZoom(newZoom);
  };

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 text-foreground transition-all ${presentationMode ? 'bg-[#0b0f19] p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl ring-4 ring-primary/20' : ''}`}>
      
      {/* PRESENTATION OVERLAY CONTROLLER */}
      {presentationMode && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161f38] border border-primary/40 rounded-xl p-5 shadow-2xl max-w-sm animate-bounce-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
              <Play className="h-3 w-3 fill-primary" /> Pitch Mode (Guided Walkthrough)
            </span>
            <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-white" onClick={() => setPresentationMode(false)}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">{steps[presentationStep].title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">{steps[presentationStep].desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Step {presentationStep + 1} of {steps.length}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 hover:bg-slate-800 text-white" onClick={handlePrevStep} disabled={presentationStep === 0}>
                Back
              </Button>
              <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-white" onClick={handleNextStep}>
                {presentationStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold text-[10px] tracking-widest px-2 py-0.5 bg-primary/5">
              Flagship Intelligence Portal
            </Badge>
            {passport.identity.verificationStatus === 'Fully Verified' && (
              <span className="flex items-center gap-1 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3" /> MCA Verified
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
            Digital Financial Passport
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Institutional-grade corporate profile backed by live bank consent API pipelines and MCA cryptographic records.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button 
            onClick={() => {
              setPresentationMode(true);
              setPresentationStep(0);
              sectionRefs.header.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 transition-all font-semibold"
          >
            <Maximize2 className="mr-1.5 h-4 w-4" />
            Presentation Mode
          </Button>
          <Button 
            onClick={() => handleDownload('Passport PDF')} 
            disabled={!!downloading} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
          >
            {downloading === 'Passport PDF' ? (
              <div className="h-4 w-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="mr-1.5 h-4 w-4" />
            )}
            Download Passport PDF
          </Button>
        </div>
      </div>

      {downloadComplete && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-500 text-sm font-medium flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          NEXUS Cryptographically Signed {downloadComplete} generated and downloaded successfully.
        </motion.div>
      )}

      {/* BLOOMBERG TERMINAL HERO SCORE BANNER */}
      <div 
        ref={headerRef} 
        className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 bg-slate-950/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Big score gauge */}
        <div className="md:col-span-2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">FINANCIAL HEALTH SCORE</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-6xl font-black tracking-tight text-white">{passport.header.healthScore}</span>
              <span className="text-lg text-slate-500 font-medium">/ 900</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="h-3.5 w-3.5" /> Rank: {passport.header.industryRank}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Credit Readiness</span>
              <p className="text-lg font-black text-white mt-0.5">{passport.header.creditReadiness}%</p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Confidence Score</span>
              <p className="text-lg font-black text-white mt-0.5">{passport.header.confidenceScore}%</p>
            </div>
          </div>
        </div>

        {/* Market standing & limits */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RISK CLASSIFICATION</span>
            <p className="text-lg font-bold text-white">{passport.header.riskClassification}</p>
            <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/5 text-[9px]">Stable Outflow</Badge>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RECOMMENDED LIMIT</span>
            <p className="text-lg font-bold text-primary">{passport.header.recommendedCreditLimit}</p>
            <span className="text-[10px] text-slate-500">Based on cashflow</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">LOAN CATEGORY</span>
            <p className="text-sm font-semibold text-white leading-tight">{passport.header.loanCategory}</p>
          </div>
          <div className="space-y-1 border-t border-slate-800 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">NATIONAL PERCENTILE</span>
            <p className="text-lg font-bold text-white">{passport.header.nationalPercentile}th Percentile</p>
          </div>
          <div className="space-y-1 border-t border-slate-800 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">REGIONAL STANDING</span>
            <p className="text-sm font-semibold text-white">{passport.header.regionalRank}</p>
          </div>
          <div className="space-y-1 border-t border-slate-800 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GROWTH RATING</span>
            <p className="text-lg font-black text-emerald-400">{passport.header.growthRating}</p>
          </div>
        </div>
      </div>

      {/* CORE IDENTITY & EXECUTIVE SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* BUSINESS IDENTITY CARD */}
        <div ref={identityRef} className="lg:col-span-1">
          <Card className="h-full border-border/60 shadow-sm relative overflow-hidden bg-card">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {currentBusiness.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-base">{currentBusiness.name}</CardTitle>
                  <CardDescription className="text-xs">{currentBusiness.sector} • {currentBusiness.subSector}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">GSTIN</span>
                  <span className="font-mono font-bold text-foreground block mt-0.5">{currentBusiness.gstin}</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">PAN</span>
                  <span className="font-mono font-bold text-foreground block mt-0.5">{currentBusiness.pan}</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">UDYAM REGISTRATION</span>
                  <span className="font-mono text-foreground block mt-0.5">{currentBusiness.udyamNumber}</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">CIN</span>
                  <span className="font-mono text-foreground block mt-0.5">{passport.identity.cin}</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">BUSINESS AGE</span>
                  <span className="font-semibold text-foreground block mt-0.5">{passport.identity.age} Years</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">BUSINESS TYPE</span>
                  <span className="font-semibold text-foreground block mt-0.5">{passport.identity.businessType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">EMPLOYEES</span>
                  <span className="font-semibold text-foreground block mt-0.5">{currentBusiness.employeeCount} Members</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">ANNUAL REVENUE</span>
                  <span className="font-semibold text-foreground block mt-0.5">₹{(currentBusiness.annualTurnover / 10000000).toFixed(2)} Cr</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">OPERATIONAL STATUS</span>
                  <span className="font-semibold text-emerald-500 block mt-0.5">{passport.identity.operationalStatus}</span>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[9px] tracking-wider block">VERIFICATION STATUS</span>
                  <span className="font-semibold text-primary block mt-0.5">{passport.identity.verificationStatus}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t py-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Blockchain Verified Identity</span>
              <span className="font-mono text-[9px]">0x3a4b9c...8f2d</span>
            </CardFooter>
          </Card>
        </div>

        {/* EXECUTIVE SUMMARY & BOARD SUMMARY */}
        <div ref={summaryRef} className="lg:col-span-2">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Boardroom Executive Summary
              </CardTitle>
              <CardDescription>Verified institutional creditworthiness report summarizing operations & risks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/35 p-3 rounded-lg border border-border/30">
                  <h4 className="font-bold text-foreground mb-1">Company Overview & Standing</h4>
                  <p className="text-muted-foreground leading-relaxed">{passport.executiveSummary.overview}</p>
                </div>
                <div className="bg-muted/35 p-3 rounded-lg border border-border/30">
                  <h4 className="font-bold text-foreground mb-1">Financial Position Analysis</h4>
                  <p className="text-muted-foreground leading-relaxed">{passport.executiveSummary.financialPosition}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <h5 className="font-bold text-emerald-600 dark:text-emerald-400">Core Strengths</h5>
                  <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                    {passport.executiveSummary.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h5 className="font-bold text-amber-600 dark:text-amber-400">Key Risks & Limitations</h5>
                  <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                    {passport.executiveSummary.risks.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h5 className="font-bold text-primary">Strategic Opportunities</h5>
                  <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                    {passport.executiveSummary.opportunities.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 py-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Recommendation: {passport.executiveSummary.recommendation}</span>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* FINANCIAL DNA & EXPLAINABILITY ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* FINANCIAL DNA */}
        <div ref={dnaRef} className="lg:col-span-1">
          <Card className="h-full border-border/60 shadow-sm bg-slate-950 text-white">
            <CardHeader className="pb-2 border-b border-slate-800">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Financial DNA Analysis</span>
                <Badge className="bg-primary/20 text-primary border-primary/40 text-[9px] uppercase font-bold">Dynamic Strands</Badge>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Visualizing organizational health. Amplitude reflects relative dimension stability.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {Object.entries(passport.dna).map(([key, val], idx) => {
                // Sine wave path generation representing DNA strand
                const pathWidth = 240;
                const amplitude = val / 7;
                const points = 30;
                const pathData = Array.from({ length: points }).map((_, i) => {
                  const x = (i / (points - 1)) * pathWidth;
                  const y = 20 + Math.sin(i * 0.6 + idx * 0.8) * amplitude;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ');

                const complementPathData = Array.from({ length: points }).map((_, i) => {
                  const x = (i / (points - 1)) * pathWidth;
                  const y = 20 - Math.sin(i * 0.6 + idx * 0.8) * amplitude;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ');

                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="capitalize font-bold text-slate-300">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono text-primary font-bold">{val}%</span>
                    </div>

                    <div className="relative h-10 w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center px-4">
                      <svg width="100%" height="40" viewBox="0 0 240 40" className="opacity-95">
                        <defs>
                          <linearGradient id={`grad-${key}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                        {/* Strand A */}
                        <motion.path
                          d={pathData}
                          fill="none"
                          stroke={`url(#grad-${key})`}
                          strokeWidth="2.5"
                          animate={{
                            strokeDasharray: ['10 10', '15 15', '10 10'],
                            strokeDashoffset: [0, 40, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                        {/* Strand B */}
                        <motion.path
                          d={complementPathData}
                          fill="none"
                          stroke={`url(#grad-${key})`}
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          animate={{
                            strokeDashoffset: [40, 0, 40]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                        {/* Crossbars connecting strands */}
                        {Array.from({ length: 6 }).map((_, i) => {
                          const x = (i + 1) * 35;
                          const t = ((i + 1) * 35 / pathWidth) * (points - 1);
                          const y1 = 20 + Math.sin(t * 0.6 + idx * 0.8) * amplitude;
                          const y2 = 20 - Math.sin(t * 0.6 + idx * 0.8) * amplitude;
                          return (
                            <line
                              key={i}
                              x1={x}
                              y1={y1}
                              x2={x}
                              y2={y2}
                              stroke="#64748b"
                              strokeWidth="1"
                              opacity="0.3"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* EXPLAINABILITY ENGINE */}
        <div ref={explainabilityRef} className="lg:col-span-2">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-primary" /> Explainability Engine
              </CardTitle>
              <CardDescription>
                Full mathematical transparency. Expand any core metric to review positive signals, penalties, and audit equations.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {Object.entries(passport.explainability).map(([key, exp]) => {
                const isOpen = explainMetric === key;
                return (
                  <div key={key} className="border border-border/50 rounded-lg overflow-hidden transition-all bg-muted/20">
                    <button 
                      onClick={() => setExplainMetric(isOpen ? null : key)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/40 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-bold text-foreground flex items-center gap-2">
                          {exp.title}
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">{exp.score} pts</Badge>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-mono">{exp.formula.substring(0, 70)}...</p>
                      </div>
                      {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0 }} 
                          animate={{ height: 'auto' }} 
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-border/40 bg-card text-xs"
                        >
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">CALCULATION MODEL</span>
                                <p className="font-mono bg-muted p-2 rounded text-foreground font-semibold leading-relaxed border border-border/30">
                                  {exp.formula}
                                </p>
                              </div>
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">EVIDENCE LOG</span>
                                <p className="text-muted-foreground italic bg-muted/40 p-2 rounded border border-border/20">
                                  &quot;{exp.evidence}&quot;
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">POSITIVE SIGNALS</span>
                                <ul className="space-y-1">
                                  {exp.factors.positive.map((fact, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                      <span>{fact}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">RISK FACTORS / PENALTIES</span>
                                <ul className="space-y-1">
                                  {exp.factors.negative.map((fact, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                                      <span>{fact}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/40 pt-4 text-center">
                              <div>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase block">WEIGHT</span>
                                <span className="text-sm font-bold text-foreground block mt-0.5">{exp.weight}% Contribution</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase block">AUDIT SOURCE</span>
                                <span className="text-xs font-semibold text-primary block mt-0.5 truncate">{exp.sources[0]}</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase block">API CONFIDENCE</span>
                                <span className="text-sm font-bold text-foreground block mt-0.5">{exp.confidence}% Confidence</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase block">HISTORICAL SHIFT</span>
                                <span className="text-xs font-semibold text-foreground block mt-0.5">{exp.history}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RELATIONSHIP INTELLIGENCE NETWORK GRAPH */}
      <div ref={relationshipRef} className="w-full">
        <Card className="border-border/60 shadow-sm relative overflow-hidden bg-card">
          <CardHeader className="pb-2 border-b border-border/40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Database className="h-4.5 w-4.5 text-primary" /> Relationship Intelligence Network
                </CardTitle>
                <CardDescription>
                  Interactive transaction graph. Click nodes to inspect linked entity transactions. Drag or scroll to zoom/pan.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); }}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Graph View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 relative">
            
            {/* SVG Interactive Canvas */}
            <div 
              className="w-full h-[400px] overflow-hidden bg-slate-950/90 relative cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              {/* Floating instructions */}
              <div className="absolute top-4 left-4 z-10 bg-slate-900/80 border border-slate-800 rounded p-2 text-[10px] text-slate-400">
                • Drag canvas to pan<br />
                • Scroll mouse wheel to zoom<br />
                • Click nodes to view transactions
              </div>

              <svg width="100%" height="100%" className="absolute inset-0">
                <g transform={`translate(${200 + pan.x}, ${150 + pan.y}) scale(${zoom})`}>
                  
                  {/* Link connections */}
                  {passport.relationshipGraph.links.map((link, idx) => {
                    // Predefined coordinates mapping for custom SVG nodes layout
                    const coords: Record<string, { x: number, y: number }> = {
                      biz: { x: 200, y: 150 },
                      owner: { x: 0, y: 40 },
                      director1: { x: 80, y: -40 },
                      bank1: { x: 200, y: 0 },
                      bank2: { x: 240, y: -50 },
                      gst: { x: 380, y: 150 },
                      upi: { x: 340, y: 60 },
                      epfo: { x: 360, y: 240 },
                      cust1: { x: 50, y: 260 },
                      cust2: { x: 120, y: 310 },
                      sup1: { x: 180, y: 330 },
                      sup2: { x: 270, y: 300 },
                      loan1: { x: 200, y: -90 },
                      asset1: { x: -30, y: 150 }
                    };

                    const from = coords[link.source] || { x: 50, y: 50 };
                    const to = coords[link.target] || { x: 200, y: 150 };

                    return (
                      <g key={idx}>
                        <motion.line
                          x1={from.x}
                          y1={from.y}
                          x2={to.x}
                          y2={to.y}
                          stroke={link.animated ? '#4f46e5' : '#475569'}
                          strokeWidth={link.animated ? 2 : 1.2}
                          strokeDasharray={link.animated ? '4,4' : '0'}
                          animate={link.animated ? { strokeDashoffset: [0, -20] } : {}}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          opacity="0.6"
                        />
                        <text 
                          x={(from.x + to.x) / 2} 
                          y={(from.y + to.y) / 2 - 4} 
                          fill="#94a3b8" 
                          fontSize="8" 
                          textAnchor="middle" 
                          className="font-semibold bg-slate-950"
                        >
                          {link.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Render Nodes */}
                  {passport.relationshipGraph.nodes.map((node) => {
                    const coords: Record<string, { x: number, y: number }> = {
                      biz: { x: 200, y: 150 },
                      owner: { x: 0, y: 40 },
                      director1: { x: 80, y: -40 },
                      bank1: { x: 200, y: 0 },
                      bank2: { x: 240, y: -50 },
                      gst: { x: 380, y: 150 },
                      upi: { x: 340, y: 60 },
                      epfo: { x: 360, y: 240 },
                      cust1: { x: 50, y: 260 },
                      cust2: { x: 120, y: 310 },
                      sup1: { x: 180, y: 330 },
                      sup2: { x: 270, y: 300 },
                      loan1: { x: 200, y: -90 },
                      asset1: { x: -30, y: 150 }
                    };

                    const pos = coords[node.id] || { x: 100, y: 100 };
                    const isCore = node.type === 'business';

                    let color = 'fill-slate-800 stroke-slate-600';
                    if (node.type === 'business') color = 'fill-primary stroke-primary-foreground';
                    else if (node.type === 'owner' || node.type === 'director') color = 'fill-emerald-600 stroke-emerald-400';
                    else if (node.type === 'bank' || node.type === 'loan') color = 'fill-blue-600 stroke-blue-400';
                    else if (node.type === 'gst' || node.type === 'upi' || node.type === 'epfo') color = 'fill-indigo-600 stroke-indigo-400';

                    return (
                      <g 
                        key={node.id} 
                        transform={`translate(${pos.x}, ${pos.y})`}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(node);
                        }}
                      >
                        <circle 
                          r={isCore ? 20 : 12} 
                          className={`${color} stroke-2 transition-all hover:scale-125`}
                        />
                        <text
                          y={isCore ? 32 : 24}
                          fill="#ffffff"
                          fontSize="9"
                          textAnchor="middle"
                          className="font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Sidebar Inspector Info Details */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div 
                  initial={{ opacity: 0, x: 80 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 80 }}
                  className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-slate-800 p-4 text-white z-20 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                    <h4 className="text-sm font-bold flex items-center gap-1.5 capitalize">
                      <Fingerprint className="h-4 w-4 text-primary" /> {selectedNode.type} Node
                    </h4>
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:text-white" onClick={() => setSelectedNode(null)}>
                      ×
                    </Button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">NAME / LABEL</span>
                      <span className="text-sm font-semibold block mt-0.5">{selectedNode.label}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">REGISTRY SPECIFICATION</span>
                      <p className="bg-slate-950 p-2 rounded mt-1 leading-relaxed text-slate-300 font-mono">
                        {selectedNode.details}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">STATUS LEVEL</span>
                      <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/5 mt-1">
                        Active & Audited
                      </Badge>
                    </div>

                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block font-bold mb-1">Live Feed Log</span>
                      <div className="space-y-1.5 text-[10px] text-slate-400">
                        <p className="flex justify-between border-b border-slate-800/80 pb-1">
                          <span>API Connected</span>
                          <span className="text-emerald-500 font-bold">YES</span>
                        </p>
                        <p className="flex justify-between border-b border-slate-800/80 pb-1">
                          <span>Delay Index</span>
                          <span className="text-white">0.02s</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Verified At</span>
                          <span className="text-white">Today 12:40</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* RISK RADAR & BENCHMARK COMPARISONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* RISK RADAR LIST */}
        <div ref={risksRef} className="lg:col-span-1">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 text-primary" /> Risk Intelligence Monitor
              </CardTitle>
              <CardDescription>
                Multi-dimensional rating of risks. Lower rating means elevated exposure.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {passport.risks.map((risk) => (
                <div key={risk.id} className="p-3 bg-muted/30 border border-border/40 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">{risk.label}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={risk.score > 75 ? 'bg-emerald-500' : risk.score > 60 ? 'bg-amber-500' : 'bg-destructive'}>
                        {risk.score}/100 Safe
                      </Badge>
                      {risk.trend === 'improving' ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      ) : risk.trend === 'deteriorating' ? (
                        <TrendingDown className="h-4 w-4 text-amber-500" />
                      ) : (
                        <span className="h-4 w-4 block bg-slate-400 rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {risk.explanation}
                  </p>
                  <div className="bg-card p-2 rounded text-[10px] border border-border/20 text-primary">
                    <span className="font-bold">Recommendation:</span> {risk.action}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* BENCHMARK PLOTS */}
        <div ref={benchmarksRef} className="lg:col-span-2">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-primary" /> Peer Benchmarking Index
              </CardTitle>
              <CardDescription>Comparing key operations against regional, national and same revenue bracket averages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={passport.benchmarks}>
                    <XAxis dataKey="metric" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                    <Bar dataKey="business" name="Our Score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="industryAvg" name="Industry Avg" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="top10" name="Top 10% Peers" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-muted-foreground block text-[9px] font-bold">REGIONAL AVG MARGIN</span>
                  <span className="text-sm font-bold text-foreground block mt-0.5">{passport.benchmarks[0].regionalAvg}%</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-muted-foreground block text-[9px] font-bold">NATIONAL AVERAGE</span>
                  <span className="text-sm font-bold text-foreground block mt-0.5">{passport.benchmarks[0].nationalAvg}%</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-muted-foreground block text-[9px] font-bold">SIMILAR REVENUE AVG</span>
                  <span className="text-sm font-bold text-foreground block mt-0.5">{passport.benchmarks[0].revenueBracket}%</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-muted-foreground block text-[9px] font-bold">SIMILAR SIZE (EMPLOYEE)</span>
                  <span className="text-sm font-bold text-foreground block mt-0.5">{passport.benchmarks[0].similarSize}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* HEALTH EVOLUTION & BUSINESS TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* HEALTH EVOLUTION CHART */}
        <div ref={evolutionRef} className="lg:col-span-1">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4.5 w-4.5 text-primary" /> Health Evolution
                </CardTitle>
                <div className="flex gap-1.5 bg-muted/65 p-1 rounded-lg">
                  {['30D', '90D', '1Y', '3Y'].map((tab) => (
                    <button 
                      key={tab}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => setEvolutionTab(tab as any)}
                      className={`text-[9px] font-bold px-2 py-1 rounded transition-all ${evolutionTab === tab ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionData}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" fontSize={9} tickLine={false} />
                    <YAxis domain={['dataMin - 20', 'dataMax + 20']} fontSize={9} tickLine={false} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="Score" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#scoreColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-muted-foreground text-center mt-3">
                Tracking calculated corporate rating metrics across selected time span.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* BUSINESS TIMELINE */}
        <div ref={timelineRef} className="lg:col-span-2">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4.5 w-4.5 text-primary" /> Interactive Milestone Timeline
                  </CardTitle>
                  <CardDescription>Filing compliance, milestones, funding rounds and corporate adjustments.</CardDescription>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button 
                    size="sm" 
                    variant={timelineFilter === 'ALL' ? 'default' : 'outline'} 
                    className="h-7 text-[10px] font-bold" 
                    onClick={() => setTimelineFilter('ALL')}
                  >
                    All Years
                  </Button>
                  {uniqueTimelineYears.map((year) => (
                    <Button 
                      key={year}
                      size="sm" 
                      variant={timelineFilter === year ? 'default' : 'outline'} 
                      className="h-7 text-[10px] font-bold" 
                      onClick={() => setTimelineFilter(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 relative max-h-[300px] overflow-y-auto nexus-scrollbar">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border/80" />

              <div className="space-y-6 pl-10 relative">
                {filteredTimeline.map((evt, idx) => {
                  let badgeColor = 'bg-slate-500';
                  if (evt.type === 'registration') badgeColor = 'bg-blue-500';
                  else if (evt.type === 'funding' || evt.type === 'revenue') badgeColor = 'bg-emerald-500';
                  else if (evt.type === 'compliance') badgeColor = 'bg-indigo-500';
                  else if (evt.type === 'insight') badgeColor = 'bg-primary';

                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <span className={`absolute -left-[39px] top-1 h-3.5 w-3.5 rounded-full border-2 border-background ${badgeColor} transition-transform group-hover:scale-125`} />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{evt.title}</span>
                          <Badge className={`${badgeColor} text-[8px] uppercase tracking-wider h-4 px-1.5`}>
                            {evt.date}
                          </Badge>
                          {evt.metric && (
                            <Badge variant="outline" className="border-primary/30 text-primary text-[8px] h-4">
                              {evt.metric}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DOCUMENT INTELLIGENCE & DOWNLOAD CENTER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* DOCUMENT INTELLIGENCE LIST */}
        <div ref={documentsRef} className="lg:col-span-2">
          <Card className="h-full border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <FileDigit className="h-4.5 w-4.5 text-primary" /> Integrated Document Registry
              </CardTitle>
              <CardDescription>
                Live verification audit logs for GSTIN, connected bank Statements, EPFO and corporate filings.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {passport.documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-muted/20 border border-border/30 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-foreground">{doc.name}</span>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-bold">{doc.type}</Badge>
                      <Badge className={doc.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[8px] uppercase font-bold' : 'bg-amber-500/10 text-amber-500 border-amber-500/20 text-[8px]'}>
                        {doc.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                      Summary: {doc.aiSummary}
                    </p>
                  </div>
                  
                  <div className="text-left sm:text-right text-xs shrink-0">
                    <p className="text-muted-foreground text-[10px] font-semibold">SOURCE: {doc.source}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">Updated: {doc.lastUpdated} | Confidence: {doc.confidence}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* DOWNLOAD CENTER */}
        <div className="lg:col-span-1">
          <Card className="h-full border-border/60 shadow-sm bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-base flex items-center gap-2">
                <Download className="h-4.5 w-4.5 text-primary" /> Download Center
              </CardTitle>
              <CardDescription className="text-slate-400">Export official certified financial reports.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { title: 'Financial Passport PDF', desc: 'MCA stamped verified corporate credential.' },
                { title: 'Financial Health Card', desc: 'Consolidated overview score & KPIs.' },
                { title: 'Risk Assessment Report', desc: 'Regulatory compliance & operational audit.' },
                { title: 'Credit Summary Report', desc: 'Working capital & bank statement insights.' },
                { title: 'Business Intelligence Report', desc: 'Boardroom dashboard analytics & graphs.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-850 hover:bg-slate-850 transition-colors">
                  <div className="text-xs">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-primary hover:text-white shrink-0"
                    onClick={() => handleDownload(item.title)}
                    disabled={downloading === item.title}
                  >
                    {downloading === item.title ? (
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
