"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoItem, BentoStat, BentoCard } from "@/components/ui/BentoGrid";
import { ArrowUpRight, Clock, DollarSign, Users, Activity, ArrowRight, Zap, TrendingUp, Calendar, Award, Sparkles, FileText, Check, LayoutDashboard, Rocket, Mail, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useDashboardStats, useAgents, useDecisions, useContracts } from "@/lib/api";
import { TypewriterHero } from "@/components/dashboard/TypewriterHero";
import { motion } from "framer-motion";
import { PHYSICS, TRANSITIONS, VARIANTS } from "@/lib/animation-constants";

// Chart data
const revenueData = [
  { name: 'Mon', value: 4200, prev: 3800 },
  { name: 'Tue', value: 3800, prev: 3900 },
  { name: 'Wed', value: 5500, prev: 4200 },
  { name: 'Thu', value: 4800, prev: 4100 },
  { name: 'Fri', value: 7200, prev: 5800 },
  { name: 'Sat', value: 9100, prev: 7400 },
  { name: 'Sun', value: 11200, prev: 8900 },
];

const buybackData = [
  { name: 'Wk 1', hours: 12, manual: 48 },
  { name: 'Wk 2', hours: 19, manual: 41 },
  { name: 'Wk 3', hours: 25, manual: 35 },
  { name: 'Wk 4', hours: 42, manual: 18 },
];

const pieData = [
  { name: 'Admin', value: 35, color: 'oklch(0.60 0.20 260)' },
  { name: 'Delivery', value: 40, color: 'oklch(0.65 0.20 300)' },
  { name: 'Sales', value: 15, color: 'oklch(0.72 0.18 145)' },
  { name: 'Marketing', value: 10, color: 'oklch(0.80 0.16 85)' },
];

const performanceData = [
  { name: '00:00', load: 24, latency: 12 },
  { name: '04:00', load: 18, latency: 10 },
  { name: '08:00', load: 45, latency: 18 },
  { name: '12:00', load: 88, latency: 45 },
  { name: '16:00', load: 72, latency: 30 },
  { name: '20:00', load: 45, latency: 22 },
  { name: '23:59', load: 30, latency: 15 },
];

export default function Home() {
  const { toast } = useToast();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: agents, isLoading: agentsLoading } = useAgents();
  const { data: decisions, isLoading: decisionsLoading } = useDecisions();
  const { data: contracts, isLoading: contractsLoading } = useContracts();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "January 2026 performance report has been sent to your email.",
      duration: 3000,
    });
  };

  // Loading state
  if (statsLoading || agentsLoading || decisionsLoading || contractsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const campaign = stats?.campaigns?.[0];
  const totalRevenue = (campaign?.totalRevenue || 0) / 100;
  const totalTimeSaved = stats?.totalTimeSaved || 0;

  return (
    <div className="space-y-6">
      {/* Header - Raycast V2 Style */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: '#EDEDED', letterSpacing: '-0.025em' }}>
            Welcome back, James
          </h1>
          <p style={{ color: '#989898' }} className="mt-1">
            Your agents saved you <span style={{ color: '#FF6363', fontWeight: 600 }}>12.5 hours</span> this week.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleGenerateReport}
            className="flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF6363 0%, #8B5CF6 100%)',
              color: '#FFFFFF',
              border: 'none'
            }}
          >
            <Zap className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* TypewriterHero - Primary Hero */}
      <TypewriterHero
        phrases={[
          "Search contracts...",
          "Analyze Q4 metrics...",
          "Draft follow-up email...",
          "Find optimization opportunities...",
        ]}
        statValue={`${totalTimeSaved} hrs`}
        statLabel="saved today"
      />

      {/* Stats Grid - Using BentoStat */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/founding-50">
          <BentoStat
            label="Monthly Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change={{ value: 12.5, trend: "up" }}
            icon={<DollarSign className="h-5 w-5" />}
          />
        </Link>
        <Link href="/dashboard/buyback">
          <BentoStat
            label="Buyback Hours"
            value={`${totalTimeSaved} hrs`}
            change={{ value: 8.2, trend: "up" }}
            icon={<Clock className="h-5 w-5" />}
          />
        </Link>
        <Link href="/dashboard/founding-50">
          <BentoStat
            label="Active Leads"
            value={campaign?.currentMembers || 0}
            change={{ value: 24.5, trend: "up" }}
            icon={<Users className="h-5 w-5" />}
          />
        </Link>
        <Link href="/dashboard/founding-50">
          <BentoStat
            label="Avg. Deal Value"
            value={`$${totalRevenue > 0 && campaign?.currentMembers ? Math.round(totalRevenue / campaign.currentMembers).toLocaleString() : '0'}`}
            change={{ value: 4.1, trend: "up" }}
            icon={<Award className="h-5 w-5" />}
          />
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart - Spans 2 columns */}
        <BentoItem colSpan={2} className="p-0 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue Velocity</h3>
                <p className="text-sm text-muted-foreground">Income generated vs. projected</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-muted" />
                  <span className="text-muted-foreground">Previous</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.90 0.005 260)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.55 0.02 260)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.55 0.02 260)' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px oklch(0.2 0.02 260 / 0.15)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="prev" stroke="oklch(0.80 0.005 260)" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                <Area type="monotone" dataKey="value" stroke="oklch(0.55 0.22 260)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoItem>

        {/* Workload Distribution */}
        <BentoItem className="p-0 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">Workload Distribution</h3>
            <p className="text-sm text-muted-foreground">Task volume by department</p>
          </div>
          <div className="p-6">
            <div className="h-[160px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-2xl font-bold text-foreground">3,420</span>
                <span className="text-xs text-muted-foreground uppercase">Tasks</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </BentoItem>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Time Buyback Trend */}
        <BentoItem className="p-0 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">Time Buyback Trend</h3>
            <p className="text-sm text-muted-foreground">Automated vs. Manual Hours</p>
          </div>
          <div className="p-6 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buybackData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.90 0.005 260)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.55 0.02 260)' }} dy={10} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="manual" stackId="a" fill="oklch(0.90 0.005 260)" radius={[0, 0, 4, 4]} barSize={28} name="Manual Work" />
                <Bar dataKey="hours" stackId="a" fill="oklch(0.65 0.20 300)" radius={[4, 4, 0, 0]} barSize={28} name="Automated" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BentoItem>

        {/* Agent Swarm Activity */}
        <BentoItem colSpan={2} className="p-0 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Agent Swarm Activity</h3>
                <p className="text-sm text-muted-foreground">Real-time system load and latency</p>
              </div>
              <Badge variant="outline" className="border-success/30 bg-success/10 text-success gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                Live System
              </Badge>
            </div>
          </div>
          <div className="p-6 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.90 0.005 260)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.55 0.02 260)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.55 0.02 260)' }} />
                <Tooltip />
                <Line type="monotone" dataKey="load" stroke="oklch(0.55 0.22 260)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="latency" stroke="oklch(0.72 0.18 145)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BentoItem>
      </div>

      {/* Decision Feed & Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Decision Feed */}
        <BentoItem colSpan={2} className="p-0 overflow-hidden" interactive={false}>
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Decision Feed
              </h3>
              <p className="text-sm text-muted-foreground">Approve agent actions. You are the Editor.</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              3 Pending
            </Badge>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { title: "Outreach Campaign Draft", agent: "Sales Bot", desc: "Drafted 50 personalized LinkedIn messages for the 'SaaS Founders' list.", time: "10m ago", type: "Review" },
              { title: "Client Reply: Scope Creep", agent: "Inbox Sentinel", desc: "Client asked for extra revisions. Drafted a polite refusal citing MSA.", time: "32m ago", type: "Decision" },
              { title: "Weekly Report Generation", agent: "Analytics Agent", desc: "Compiled Jan 2026 performance report. PDF ready.", time: "1h ago", type: "Review" }
            ].map((item, i) => (
              <motion.div
                key={i}
                onClick={() => window.location.href = '/dashboard/buyback'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/dashboard/buyback')}
                className="w-full text-left p-6 hover:bg-accent/5 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center justify-between cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...PHYSICS.screenTransition, delay: i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'Decision' ? 'bg-accent/20 text-accent-foreground' : 'bg-primary/10 text-primary'}`}>
                    {item.type === 'Decision' ? <Zap className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <span className="text-xs text-muted-foreground">• {item.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xl">{item.desc}</p>
                    <p className="text-xs text-muted-foreground">Proposed by <span className="font-medium text-foreground">{item.agent}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto pl-14 md:pl-0" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button size="sm" variant="default">
                    <Check className="h-4 w-4 mr-1.5" /> Approve
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t border-border/50 flex justify-center">
            <Link href="/dashboard/buyback">
              <Button variant="ghost" className="text-muted-foreground">
                View All Decisions <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </BentoItem>

        {/* Active Contracts */}
        <BentoItem className="p-0 overflow-hidden flex flex-col" interactive={false}>
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Active Contracts</h3>
              <p className="text-sm text-muted-foreground">Embedded payments status</p>
            </div>
            <Link href="/dashboard/founding-50">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {(contracts || []).length > 0 ? (contracts || []).slice(0, 2).map((contract: any, i: number) => (
              <motion.div
                key={contract.id}
                onClick={() => window.location.href = '/dashboard/proposals'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/dashboard/proposals')}
                className={`w-full text-left p-4 rounded-xl ${i === 0 ? 'bg-gradient-primary text-white' : 'border border-border bg-card'} relative overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...PHYSICS.screenTransition, delay: i * 0.15 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <DollarSign className="h-16 w-16" />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={i === 0 ? 'bg-white/20 text-white border-none' : ''}>
                      {contract.status === 'pending' ? 'Ready to Sign' : contract.status}
                    </Badge>
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${i === 0 ? 'text-white' : 'text-foreground'}`}>
                    {contract.clientName}
                  </h3>
                  <p className={`text-2xl font-bold mb-3 ${i === 0 ? 'text-white' : 'text-foreground'}`}>
                    ${((contract.amount || 0) / 100).toLocaleString()}
                  </p>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant={i === 0 ? 'secondary' : 'outline'} className="w-full">
                      {contract.status === 'pending' ? 'Resend Link' : 'View Details'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center text-muted-foreground py-8">
                <div className="h-12 w-12 rounded-xl bg-card/50 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <p className="text-sm">No active contracts</p>
                <Link href="/dashboard/proposals">
                  <Button variant="link" size="sm" className="mt-2">Create your first proposal</Button>
                </Link>
              </div>
            )}
          </div>
        </BentoItem>
      </div>
    </div>
  );
}