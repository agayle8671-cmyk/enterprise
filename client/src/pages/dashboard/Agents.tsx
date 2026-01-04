import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
import { BentoGrid, BentoItem } from '@/components/ui/BentoGrid';
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
    HelpCircle
} from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
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

const roleIcons: Record<string, any> = {
    Administrative: Mail,
    Marketing: FileText,
    Sales: Users,
    Finance: DollarSign,
};

const agentTemplates = [
    {
        name: "Inbox Sentinel",
        role: "Administrative",
        description: "Email triage, drafts responses, identifies Time Assassins",
        icon: Mail,
        color: "bg-blue-500",
    },
    {
        name: "The Dossier",
        role: "Sales",
        description: "Prospect research, pre-call briefings, company intel",
        icon: Users,
        color: "bg-purple-500",
    },
    {
        name: "Content Alchemist",
        role: "Marketing",
        description: "Repurposes videos/podcasts into blog posts, tweets, newsletters",
        icon: FileText,
        color: "bg-emerald-500",
    },
    {
        name: "The Closer",
        role: "Sales",
        description: "Analyzes call transcripts, drafts follow-ups, updates CRM",
        icon: TrendingUp,
        color: "bg-amber-500",
    },
    {
        name: "Invoice Chaser",
        role: "Finance",
        description: "Tracks overdue invoices, sends reminders, escalates when needed",
        icon: DollarSign,
        color: "bg-pink-500",
    },
];

export default function Agents() {
    const queryClient = useQueryClient();
    const [showNewAgent, setShowNewAgent] = useState(false);
    const { isPro } = useSubscription();

    const { data: agents = [], isLoading } = useQuery<Agent[]>({
        queryKey: ['/api/agents'],
    });

    const createMutation = useMutation({
        mutationFn: async (template: typeof agentTemplates[0]) => {
            const res = await fetch('/api/agents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: template.name,
                    role: template.role,
                    status: 'Running',
                    uptime: '0%',
                    color: template.color,
                    timeSaved: 0,
                }),
            });
            if (!res.ok) throw new Error('Failed to create agent');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
            setShowNewAgent(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            const res = await fetch(`/api/agents/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error('Failed to update agent');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete agent');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
        },
    });

    const totalTimeSaved = agents.reduce((sum, a) => sum + (a.timeSaved || 0), 0);
    const runningAgents = agents.filter(a => a.status === 'Running').length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-headline text-foreground">AI Agent Workforce</h1>
                    <p className="text-muted-foreground mt-1">
                        Your autonomous team handling the "Replace" quadrant of the DRIP Matrix
                    </p>
                </div>
                <Button
                    onClick={() => setShowNewAgent(true)}
                    className="bg-gradient-primary shadow-lg shadow-primary/30"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy Agent
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Active Agents"
                    value={runningAgents}
                    icon={Bot}
                    color="text-primary"
                />
                <StatCard
                    label="Time Saved (hrs)"
                    value={(totalTimeSaved / 60).toFixed(1)}
                    icon={Clock}
                    color="text-success"
                />
                <StatCard
                    label="Value Generated"
                    value={`$${Math.round(totalTimeSaved * 4.16).toLocaleString()}`}
                    icon={TrendingUp}
                    color="text-warning"
                    subtext="@ $250/hr buyback rate"
                />
                <StatCard
                    label="Decisions Pending"
                    value="4"
                    icon={Activity}
                    color="text-destructive"
                />
            </div>

            {/* Agent Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="glass-card p-6 h-[200px] flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                            <Skeleton className="h-2 w-full mt-4" />
                            <div className="flex justify-between mt-auto">
                                <Skeleton className="h-8 w-20 rounded-lg" />
                                <Skeleton className="h-8 w-8 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : agents.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full glass-card p-12 text-center"
                >
                    <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-title text-foreground mb-2">No agents deployed</h3>
                    <p className="text-muted-foreground mb-6">
                        Deploy your first AI agent to start buying back your time.
                    </p>
                    <Button onClick={() => setShowNewAgent(true)} className="bg-gradient-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Deploy Your First Agent
                    </Button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {agents.map((agent, i) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                index={i}
                                onToggle={() => updateMutation.mutate({
                                    id: agent.id,
                                    status: agent.status === 'Running' ? 'Paused' : 'Running'
                                })}
                                onDelete={() => deleteMutation.mutate(agent.id)}
                                isUpdating={updateMutation.isPending || deleteMutation.isPending}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* New Agent Modal */}
            <AnimatePresence>
                {showNewAgent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowNewAgent(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={PHYSICS.interaction}
                            className="liquid-glass-heavy w-full max-w-2xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-title text-foreground mb-6">Deploy a New Agent</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {agentTemplates.map((template) => {
                                    const requiredTier = AGENT_TIERS[template.name] || 'free';
                                    const isLocked = requiredTier === 'pro' && !isPro;
                                    const isDeployed = agents.some(a => a.name === template.name);

                                    return (
                                        <motion.button
                                            key={template.name}
                                            onClick={() => !isLocked && createMutation.mutate(template)}
                                            disabled={createMutation.isPending || isDeployed || isLocked}
                                            className={`text-left p-4 rounded-xl border transition-all ${isLocked
                                                ? 'border-amber-500/30 bg-amber-500/5 cursor-not-allowed'
                                                : 'border-border/30 bg-card/30 hover:bg-card/50'
                                                } ${isDeployed ? 'opacity-50' : ''}`}
                                            whileHover={!isLocked ? { scale: 1.02 } : {}}
                                            whileTap={!isLocked ? { scale: 0.98 } : {}}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`h-10 w-10 rounded-xl ${template.color} flex items-center justify-center text-white ${isLocked ? 'opacity-50' : ''}`}>
                                                    <template.icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className={`font-medium ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>{template.name}</h4>
                                                        {requiredTier === 'pro' && <UpgradeBadge small />}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                                                    {isDeployed && (
                                                        <span className="text-xs text-primary mt-2 inline-block">Already deployed</span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end mt-6">
                                <Button variant="ghost" onClick={() => setShowNewAgent(false)} disablePhysics>
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({
    label,
    value,
    icon: Icon,
    color,
    subtext
}: {
    label: string;
    value: string | number;
    icon: any;
    color: string;
    subtext?: string;
}) {
    return (
        <motion.div
            className="glass-card p-4"
            whileHover={{ scale: 1.02 }}
            transition={PHYSICS.interaction}
        >
            <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-card flex items-center justify-center ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {subtext && <p className="text-[10px] text-muted-foreground/70">{subtext}</p>}
                </div>
            </div>
        </motion.div>
    );
}

function AgentCard({
    agent,
    index,
    onToggle,
    onDelete,
    isUpdating
}: {
    agent: Agent;
    index: number;
    onToggle: () => void;
    onDelete: () => void;
    isUpdating: boolean;
}) {
    const Icon = roleIcons[agent.role] || Bot;
    const isRunning = agent.status === 'Running';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ ...PHYSICS.interaction, delay: index * 0.05 }}
            className="glass-card p-5"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl ${agent.color || 'bg-primary'} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">{agent.name}</h3>
                        <p className="text-xs text-muted-foreground">{agent.role}</p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disablePhysics>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="liquid-glass-subtle">
                        <DropdownMenuItem onClick={onToggle} disabled={isUpdating}>
                            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                            {isRunning ? 'Pause' : 'Resume'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onDelete}
                            disabled={isUpdating}
                            className="text-destructive focus:text-destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-card/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${isRunning ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                        <span className="text-xs text-muted-foreground">Status</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">{agent.status}</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <Activity className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Uptime</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">{agent.uptime}</p>
                </div>
            </div>

            {/* Time Saved */}
            <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Time Saved</span>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-success" />
                        <span className="text-sm font-bold text-success">
                            {agent.timeSaved ? `${(agent.timeSaved / 60).toFixed(1)} hrs` : '0 hrs'}
                        </span>
                    </div>
                </div>
                {agent.timeSaved > 0 && (
                    <div className="mt-2 h-1.5 bg-card rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-success to-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((agent.timeSaved / 480) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
