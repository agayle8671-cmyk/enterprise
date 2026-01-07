/**
 * Agents Page - Sovereign Aesthetic
 * 
 * AI Agent command center with:
 * - Terminal-style displays
 * - Glass panels with aurora effects
 * - Live status indicators
 * - Physics-based animations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
import {
    Bot,
    Mail,
    FileText,
    Users,
    DollarSign,
    Play,
    Pause,
    Settings,
    Clock,
    Zap,
    TrendingUp,
    Plus,
    MoreVertical,
    Activity,
    Sparkles,
    Terminal,
    Shield,
    Brain
} from 'lucide-react';
import { BentoGrid, BentoItem, BentoDataCard } from '@/components/BentoGrid';
import { GlassCard, GlowButton, SpotlightCard, AuroraBackground } from '@/components/GlassCard';
import { TypewriterText, PulseRing, SpringCounter } from '@/components/Physics';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSubscription, AGENT_TIERS } from '@/lib/subscription';
import { UpgradeBadge } from '@/components/ui/ProLock';

interface Agent {
    id: number;
    name: string;
    role: string;
    status: string;
    uptime: string;
    color: string;
    timeSaved: number;
    createdAt: string;
}

const agentTemplates = [
    {
        name: "Inbox Sentinel",
        role: "Administrative",
        description: "Email triage, drafts responses, identifies Time Assassins",
        icon: Mail,
        color: "#00F0FF",
        tasks: 847,
        efficiency: 94,
    },
    {
        name: "The Dossier",
        role: "Research",
        description: "Prospect research, pre-call briefings, company intel",
        icon: Users,
        color: "#7000FF",
        tasks: 234,
        efficiency: 89,
    },
    {
        name: "Content Alchemist",
        role: "Marketing",
        description: "Repurposes videos/podcasts into blog posts, tweets, newsletters",
        icon: FileText,
        color: "#BBFF00",
        tasks: 156,
        efficiency: 92,
    },
    {
        name: "The Closer",
        role: "Sales",
        description: "Analyzes call transcripts, drafts follow-ups, updates CRM",
        icon: TrendingUp,
        color: "#FF3366",
        tasks: 89,
        efficiency: 96,
    },
    {
        name: "Offer Architect",
        role: "Strategy",
        description: "Designs pricing, packages, and proposal frameworks",
        icon: DollarSign,
        color: "#00F0FF",
        tasks: 45,
        efficiency: 91,
    },
];

export default function Agents() {
    const queryClient = useQueryClient();
    const { tier, canAccessAgent } = useSubscription();
    const [activeAgentId, setActiveAgentId] = useState<number | null>(null);

    // Default agent templates (seeded on first load if DB is empty)
    const DEFAULT_AGENTS: Omit<Agent, 'id' | 'createdAt'>[] = [
        { name: "Inbox Sentinel", role: "Administrative", status: "active", uptime: "99.9%", color: "#00F0FF", timeSaved: 124 },
        { name: "The Dossier", role: "Research", status: "active", uptime: "98.5%", color: "#7000FF", timeSaved: 45 },
        { name: "Content Alchemist", role: "Marketing", status: "active", uptime: "97.0%", color: "#BBFF00", timeSaved: 89 },
        { name: "The Closer", role: "Sales", status: "paused", uptime: "99.1%", color: "#FF3366", timeSaved: 12 },
        { name: "Offer Architect", role: "Strategy", status: "active", uptime: "99.9%", color: "#00F0FF", timeSaved: 67 },
    ];

    // Fetch agents from real API with fallback
    const { data: agents, isLoading, error } = useQuery<Agent[]>({
        queryKey: ['agents'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/agents');
                if (!res.ok) throw new Error('Failed to fetch agents');
                const data = await res.json();
                // If no agents in DB yet, return defaults for display
                if (!data || data.length === 0) {
                    return DEFAULT_AGENTS.map((a, i) => ({ ...a, id: i + 1, createdAt: new Date().toISOString() }));
                }
                return data;
            } catch (e) {
                console.warn('Using fallback agent data:', e);
                return DEFAULT_AGENTS.map((a, i) => ({ ...a, id: i + 1, createdAt: new Date().toISOString() }));
            }
        }
    });

    // Toggle agent status via real API
    const toggleAgent = useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            const newStatus = status === 'active' ? 'paused' : 'active';
            const res = await fetch(`/api/agents/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error('Failed to toggle agent');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <PulseRing color="var(--color-acid)" size={60} duration={1.5} />
                    <p className="text-terminal text-sm text-[var(--color-acid)] mt-6">
                        LOADING AGENT MATRIX...
                    </p>
                </div>
            </div>
        );
    }

    const totalTimeSaved = agents?.reduce((acc, a) => acc + a.timeSaved, 0) || 0;
    const activeCount = agents?.filter(a => a.status === 'active').length || 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
                        AGENT MATRIX
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="h-2 w-2 bg-[var(--color-acid)] rounded-full animate-pulse" />
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            <span className="text-[var(--color-acid)] font-mono font-bold">{activeCount}</span>
                            {' '}agents online •{' '}
                            <span className="text-[var(--color-acid)] font-mono font-bold">{totalTimeSaved}h</span>
                            {' '}saved this month
                        </p>
                    </div>
                </div>
                <GlowButton variant="acid">
                    <Plus className="h-4 w-4 mr-2" />
                    DEPLOY AGENT
                </GlowButton>
            </div>

            {/* Status Command Line */}
            <SpotlightCard className="p-6">
                <div className="flex items-center gap-4">
                    <Brain className="h-6 w-6 text-[var(--color-aurora-purple)]" />
                    <div className="flex-1">
                        <TypewriterText
                            text="All agents operational. Processing 47 tasks in queue. Estimated completion: 23 minutes..."
                            speed={30}
                            loop
                            pauseDuration={3000}
                            className="text-lg text-[var(--color-aurora-cyan)]"
                        />
                    </div>
                </div>
            </SpotlightCard>

            {/* Stats Row */}
            <BentoGrid columns={12} gap="normal">
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="TOTAL AGENTS"
                        value={agentTemplates.length}
                        trend="neutral"
                        icon={<Bot className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="ACTIVE NOW"
                        value={activeCount}
                        delta={activeCount > 0 ? 100 : 0}
                        trend="up"
                        icon={<Activity className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="TASKS TODAY"
                        value={1371}
                        delta={12.4}
                        trend="up"
                        icon={<Zap className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="HOURS SAVED"
                        value={`${totalTimeSaved}h`}
                        delta={8.2}
                        trend="up"
                        icon={<Clock className="h-4 w-4" />}
                    />
                </BentoItem>
            </BentoGrid>

            {/* Agent Grid */}
            <div>
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    DEPLOYED AGENTS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agentTemplates.map((agent, idx) => {
                        const isLocked = !canAccessAgent(agent.name as keyof typeof AGENT_TIERS);
                        const dbAgent = agents?.find(a => a.name === agent.name);
                        const isActive = dbAgent?.status === 'active';

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, ...PHYSICS.interaction }}
                            >
                                <GlassCard
                                    intensity="medium"
                                    variant={isActive ? 'acid' : 'default'}
                                    glowing={isActive}
                                    className={isLocked ? 'opacity-60' : ''}
                                >
                                    <div className="p-5">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="h-10 w-10 rounded-lg flex items-center justify-center"
                                                    style={{
                                                        background: `${agent.color}20`,
                                                        border: `1px solid ${agent.color}40`
                                                    }}
                                                >
                                                    <agent.icon className="h-5 w-5" style={{ color: agent.color }} />
                                                </div>
                                                <div>
                                                    <h3 className="text-terminal text-sm text-[var(--text-sovereign-primary)]">
                                                        {agent.name.toUpperCase()}
                                                    </h3>
                                                    <span className="text-[10px] text-[var(--text-sovereign-muted)]">
                                                        {agent.role.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            {isLocked ? (
                                                <UpgradeBadge small />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-[var(--color-acid)] animate-pulse' : 'bg-[var(--text-sovereign-muted)]'}`} />
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button className="p-1 rounded hover:bg-white/10">
                                                                <MoreVertical className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="glass-panel border-[var(--glass-sovereign-border)]" style={{ background: 'var(--color-structure)' }}>
                                                            <DropdownMenuItem
                                                                className="text-[var(--text-sovereign-primary)] focus:bg-[rgba(187,255,0,0.1)] focus:text-[var(--color-acid)]"
                                                                onClick={() => dbAgent && toggleAgent.mutate({ id: dbAgent.id, status: dbAgent.status })}
                                                            >
                                                                {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                                                {isActive ? 'Pause' : 'Activate'}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-[var(--text-sovereign-primary)] focus:bg-[rgba(187,255,0,0.1)] focus:text-[var(--color-acid)]">
                                                                <Settings className="h-4 w-4 mr-2" />
                                                                Configure
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs text-[var(--text-sovereign-muted)] mb-4 line-clamp-2">
                                            {agent.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--glass-sovereign-border)]">
                                            <div>
                                                <span className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">
                                                    TASKS
                                                </span>
                                                <p className="text-lg font-bold text-[var(--text-sovereign-primary)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                                    <SpringCounter value={agent.tasks} />
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">
                                                    EFFICIENCY
                                                </span>
                                                <p
                                                    className={`text-lg font-bold ${agent.efficiency >= 95 ? 'text-[var(--color-acid)]' : 'text-[var(--text-sovereign-primary)]'}`}
                                                    style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                                                >
                                                    {agent.efficiency}%
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        {!isLocked && (
                                            <motion.button
                                                className="w-full mt-4 py-2 rounded-lg text-terminal text-xs flex items-center justify-center gap-2"
                                                style={{
                                                    background: isActive ? 'var(--color-acid)' : 'var(--color-structure)',
                                                    color: isActive ? '#000' : 'var(--text-sovereign-muted)',
                                                    border: isActive ? 'none' : '1px solid var(--glass-sovereign-border)'
                                                }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => dbAgent && toggleAgent.mutate({ id: dbAgent.id, status: dbAgent.status })}
                                            >
                                                {isActive ? (
                                                    <>
                                                        <Pause className="h-3 w-3" />
                                                        PAUSE AGENT
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="h-3 w-3" />
                                                        ACTIVATE
                                                    </>
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Deploy New Agent CTA */}
            <AuroraBackground intensity="subtle" className="rounded-2xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-sovereign-primary)]">
                            Need a Custom Agent?
                        </h3>
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            Design and deploy agents tailored to your specific workflows
                        </p>
                    </div>
                    <GlowButton variant="aurora">
                        <Terminal className="h-4 w-4 mr-2" />
                        AGENT BUILDER
                    </GlowButton>
                </div>
            </AuroraBackground>
        </div>
    );
}
