/**
 * Home Dashboard - Sovereign Aesthetic
 * 
 * Command center overview with:
 * - Void background, acid green accents
 * - Space Mono terminal typography
 * - Bento grid layout with glass panels
 * - Live data with physics animations
 */

"use client";

import { motion } from "framer-motion";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useDashboardStats, useAgents, useDecisions, useContracts } from "@/lib/api";
import {
  ArrowUpRight,
  Clock,
  DollarSign,
  Users,
  Activity,
  Zap,
  TrendingUp,
  Sparkles,
  Terminal,
  BarChart3,
  ArrowDownRight,
  Cpu,
  Server,
  Shield
} from "lucide-react";
import { BentoGrid, BentoItem, BentoDataCard } from '@/components/BentoGrid';
import { GlassCard, GlowButton, SpotlightCard, AuroraBackground } from '@/components/GlassCard';
import { TypewriterText, StreamingNumber, SpringCounter, PulseRing } from '@/components/Physics';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Chart data with Sovereign colors
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
  { name: 'W1', automated: 12, manual: 48 },
  { name: 'W2', automated: 19, manual: 41 },
  { name: 'W3', automated: 25, manual: 35 },
  { name: 'W4', automated: 42, manual: 18 },
];

const agentPerformance = [
  { name: 'Inbox Sentinel', tasks: 847, efficiency: 94 },
  { name: 'The Dossier', tasks: 234, efficiency: 89 },
  { name: 'Content Alchemist', tasks: 156, efficiency: 92 },
  { name: 'The Closer', tasks: 89, efficiency: 96 },
  { name: 'Offer Architect', tasks: 45, efficiency: 91 },
];

export default function Home() {
  const { toast } = useToast();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: agents, isLoading: agentsLoading } = useAgents();
  const { data: decisions, isLoading: decisionsLoading } = useDecisions();
  const { data: contracts, isLoading: contractsLoading } = useContracts();

  const handleGenerateReport = () => {
    toast({
      title: "REPORT GENERATED",
      description: "Performance report transmitted to your terminal.",
      duration: 3000,
    });
  };

  // Loading state - Sovereign style
  if (statsLoading || agentsLoading || decisionsLoading || contractsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <PulseRing color="var(--color-acid)" size={60} duration={1.5} />
          <p className="text-terminal text-sm text-[var(--color-acid)] mt-6">
            INITIALIZING SYSTEMS...
          </p>
        </div>
      </div>
    );
  }

  const campaign = stats?.campaigns?.[0];
  const totalRevenue = (campaign?.totalRevenue || 0) / 100;
  const totalTimeSaved = stats?.totalTimeSaved || 0;

  return (
    <div className="space-y-6">
      {/* Header - Sovereign Terminal Style */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
            COMMAND CENTER
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2 w-2 bg-[var(--color-acid)] rounded-full animate-pulse" />
            <p className="text-sm text-[var(--text-sovereign-muted)]">
              Agents saved{' '}
              <span className="text-[var(--color-acid)] font-mono font-bold">
                {totalTimeSaved} HRS
              </span>
              {' '}this week
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <GlowButton variant="acid" onClick={handleGenerateReport}>
            <Zap className="h-4 w-4 mr-2" />
            GENERATE REPORT
          </GlowButton>
        </div>
      </div>

      {/* Typewriter Command Input */}
      <SpotlightCard className="p-6">
        <div className="flex items-center gap-4">
          <Terminal className="h-6 w-6 text-[var(--color-acid)]" />
          <div className="flex-1">
            <TypewriterText
              text="Analyzing Q4 performance metrics... Optimizing agent workflows..."
              speed={25}
              loop
              pauseDuration={2000}
              className="text-lg text-[var(--color-acid)]"
            />
          </div>
        </div>
      </SpotlightCard>

      {/* Primary Stats - Bento Grid */}
      <BentoGrid columns={12} gap="normal">
        {/* Revenue - Large */}
        <BentoItem colSpan={4} rowSpan={2} glowing>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                TOTAL REVENUE
              </span>
              <DollarSign className="h-4 w-4 text-[var(--color-acid)]" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-4xl font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                <StreamingNumber value={totalRevenue} duration={1.5} prefix="$" decimals={0} format={(v) => v.toLocaleString()} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <ArrowUpRight className="h-4 w-4 text-[var(--color-acid)]" />
                <span className="text-terminal text-sm text-[var(--color-acid)]">
                  +12.4% MTD
                </span>
              </div>
            </div>
            {/* Mini sparkline */}
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BBFF00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#BBFF00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#BBFF00" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BentoItem>

        {/* Time Saved */}
        <BentoItem colSpan={2}>
          <Link href="/dashboard/buyback">
            <BentoDataCard
              label="BUYBACK HOURS"
              value={`${totalTimeSaved}h`}
              delta={8.2}
              trend="up"
              icon={<Clock className="h-4 w-4" />}
            />
          </Link>
        </BentoItem>

        {/* Active Leads */}
        <BentoItem colSpan={2}>
          <Link href="/dashboard/founding-50">
            <BentoDataCard
              label="ACTIVE LEADS"
              value={campaign?.currentMembers || 0}
              delta={24.5}
              trend="up"
              icon={<Users className="h-4 w-4" />}
            />
          </Link>
        </BentoItem>

        {/* Agents Active */}
        <BentoItem colSpan={2}>
          <Link href="/dashboard/agents">
            <BentoDataCard
              label="AGENTS ONLINE"
              value="5"
              delta={0}
              trend="neutral"
              icon={<Sparkles className="h-4 w-4" />}
            />
          </Link>
        </BentoItem>

        {/* System Status */}
        <BentoItem colSpan={2}>
          <div className="p-4 h-full relative">
            <div className="absolute top-4 right-4">
              <PulseRing color="var(--color-acid)" size={24} duration={2} />
            </div>
            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
              SYSTEM STATUS
            </span>
            <p className="text-xl font-bold text-[var(--color-acid)] mt-2" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
              OPTIMAL
            </p>
            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
              99.97% UPTIME
            </span>
          </div>
        </BentoItem>

        {/* Buyback Progress Chart */}
        <BentoItem colSpan={4}>
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                TIME BUYBACK PROGRESS
              </span>
              <Activity className="h-4 w-4 text-[var(--color-aurora-cyan)]" />
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buybackData} barGap={4}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#0A0A0A',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: 'Space Mono, monospace'
                    }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                  />
                  <Bar dataKey="automated" stackId="a" fill="#BBFF00" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="manual" stackId="a" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-2 text-terminal text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[var(--color-acid)] rounded" />
                AUTOMATED
              </span>
              <span className="flex items-center gap-2 text-[var(--text-sovereign-muted)]">
                <span className="h-2 w-2 bg-white/20 rounded" />
                MANUAL
              </span>
            </div>
          </div>
        </BentoItem>

        {/* Revenue Chart */}
        <BentoItem colSpan={4}>
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                REVENUE VELOCITY
              </span>
              <BarChart3 className="h-4 w-4 text-[var(--color-acid)]" />
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7000FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#0A0A0A',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00F0FF"
                    strokeWidth={2}
                    fill="url(#revenueGrad2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BentoItem>
      </BentoGrid>

      {/* Agent Performance */}
      <div>
        <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
          AGENT PERFORMANCE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {agentPerformance.map((agent, idx) => (
            <GlassCard key={idx} intensity="medium" variant={idx === 0 ? 'acid' : 'default'} glowing={idx === 0}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Sparkles className="h-4 w-4 text-[var(--color-acid)]" />
                  <span className={`text-xs px-2 py-0.5 rounded ${agent.efficiency >= 95 ? 'bg-[var(--color-acid)]/20 text-[var(--color-acid)]' : 'bg-white/10 text-[var(--text-sovereign-muted)]'}`}>
                    {agent.efficiency}%
                  </span>
                </div>
                <p className="text-terminal text-xs text-[var(--text-sovereign-muted)] mb-1">
                  {agent.name.toUpperCase()}
                </p>
                <p className="text-xl font-bold text-[var(--text-sovereign-primary)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                  <SpringCounter value={agent.tasks} />
                </p>
                <span className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">
                  TASKS COMPLETED
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <AuroraBackground intensity="subtle" className="rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-sovereign-primary)]">
              Quick Actions
            </h3>
            <p className="text-sm text-[var(--text-sovereign-muted)]">
              Execute common commands with one click
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/agents">
              <GlowButton variant="aurora" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AGENTS
              </GlowButton>
            </Link>
            <Link href="/dashboard/proposals">
              <GlowButton variant="acid" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                PROPOSALS
              </GlowButton>
            </Link>
            <Link href="/dashboard/time-audit">
              <GlowButton variant="aurora" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                TIME AUDIT
              </GlowButton>
            </Link>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}