import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
import {
    Clock,
    TrendingUp,
    DollarSign,
    Zap,
    Users,
    Bot,
    LineChart,
    Plus,
    Calendar,
    Target,
    AlertTriangle
} from 'lucide-react';

// DRIP Categories
const DRIP_CATEGORIES = {
    delegate: {
        label: 'Delegate',
        icon: Users,
        color: 'bg-muted/50',
        textColor: 'text-muted-foreground',
        description: 'Low value, low energy drain → Assign to team/VA'
    },
    replace: {
        label: 'Replace',
        icon: Bot,
        color: 'bg-destructive/20',
        textColor: 'text-destructive',
        description: 'Low value, high energy drain → Automate with AI'
    },
    invest: {
        label: 'Invest',
        icon: LineChart,
        color: 'bg-warning/20',
        textColor: 'text-warning',
        description: 'High value, passive → Build systems/templates'
    },
    produce: {
        label: 'Produce',
        icon: Zap,
        color: 'bg-success/20',
        textColor: 'text-success',
        description: 'High value, high energy → Your sweet spot'
    },
};

// Mock data for demonstration (will connect to real API)
// Types
interface TimeEntry {
    id: number;
    task: string;
    category: 'delegate' | 'replace' | 'invest' | 'produce';
    duration: number;
    createdAt: string;
}

export default function TimeAudit() {
    const queryClient = useQueryClient();
    const [showAddEntry, setShowAddEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ task: '', category: 'produce', duration: 30 });

    // Fetch Time Entries
    const { data: entries = [], isLoading } = useQuery<TimeEntry[]>({
        queryKey: ['/api/time-entries'],
    });

    // Create Entry Mutation
    const createMutation = useMutation({
        mutationFn: async (entry: { task: string; category: string; duration: number }) => {
            const res = await fetch('/api/time-entries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
            });
            if (!res.ok) throw new Error('Failed to create entry');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/time-entries'] });
            setShowAddEntry(false);
            setNewEntry({ task: '', category: 'produce', duration: 30 });
        },
    });

    // Calculate Stats
    const weeklyHours = {
        delegate: 0,
        replace: 0,
        invest: 0,
        produce: 0
    };

    entries.forEach(entry => {
        // Simple conversion to hours, assuming all entries are from "this week" for the MVP
        // In a real app, we'd filter by date
        const hours = entry.duration / 60;
        if (weeklyHours[entry.category as keyof typeof weeklyHours] !== undefined) {
            weeklyHours[entry.category as keyof typeof weeklyHours] += hours;
        }
    });

    const weeklyTotal = Object.values(weeklyHours).reduce((a, b) => a + b, 0);
    // Avoid division by zero
    const replacePercent = weeklyTotal > 0
        ? ((weeklyHours.replace / weeklyTotal) * 100).toFixed(0)
        : "0";

    // Derived stats
    const buybackRate = 250; // hardcoded for now until settings exist
    const hoursReclaimed = 12.5; // placeholder until we track "saved" time
    const valueGenerated = (weeklyHours.produce * buybackRate).toFixed(0);

    // Dynamic Data Object for UI compatibility
    const TIME_DATA = {
        weeklyHours,
        buybackRate,
        hoursReclaimed,
        valueGenerated,
        recentEntries: entries.slice(0, 5) // Show top 5
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-headline text-foreground">Time Audit</h1>
                    <p className="text-muted-foreground mt-1">
                        Track and optimize your time using the DRIP Matrix
                    </p>
                </div>
                <Button
                    onClick={() => setShowAddEntry(!showAddEntry)}
                    className="bg-gradient-primary shadow-lg shadow-primary/30"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Log Time
                </Button>
            </div>

            {/* Alert Banner */}
            {parseFloat(replacePercent) > 20 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 border-l-4 border-destructive flex items-start gap-3"
                >
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-foreground">Time Assassins Detected</h4>
                        <p className="text-sm text-muted-foreground">
                            <span className="text-destructive font-semibold">{replacePercent}%</span> of your week is spent on "Replace" tasks.
                            These are draining your energy and should be automated.
                            <a href="/dashboard/agents" className="text-primary hover:underline ml-1 font-medium">Deploy an agent →</a>
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Buyback Rate"
                    value={`$${TIME_DATA.buybackRate}/hr`}
                    icon={DollarSign}
                    color="text-primary"
                    subtext="Your effective hourly value"
                />
                <StatCard
                    label="Hours This Week"
                    value={weeklyTotal.toFixed(1)}
                    icon={Clock}
                    color="text-foreground"
                />
                <StatCard
                    label="Hours Reclaimed"
                    value={Number(TIME_DATA.hoursReclaimed).toFixed(1)}
                    icon={TrendingUp}
                    color="text-success"
                    subtext="via AI agents"
                />
                <StatCard
                    label="Value Generated"
                    value={`$${Number(TIME_DATA.valueGenerated).toLocaleString()}`}
                    icon={Target}
                    color="text-warning"
                    subtext="from automation"
                />
            </div>

            {/* DRIP Matrix Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Matrix Grid */}
                <div className="glass-card p-6 md:p-8">
                    <h3 className="text-title text-foreground mb-6">DRIP Matrix - Weekly Breakdown</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(DRIP_CATEGORIES).map(([key, cat]) => {
                            const hours = TIME_DATA.weeklyHours[key as keyof typeof TIME_DATA.weeklyHours].toFixed(1);
                            const val = TIME_DATA.weeklyHours[key as keyof typeof TIME_DATA.weeklyHours];
                            const percent = weeklyTotal > 0 ? ((val / weeklyTotal) * 100).toFixed(0) : "0";

                            return (
                                <motion.div
                                    key={key}
                                    className={`${cat.color} rounded-xl p-4 relative overflow-hidden`}
                                    whileHover={{ scale: 1.02 }}
                                    transition={PHYSICS.interaction}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <cat.icon className={`h-4 w-4 ${cat.textColor}`} />
                                        <span className={`text-sm font-medium ${cat.textColor}`}>{cat.label}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-foreground">{hours}h</span>
                                        <span className="text-sm text-muted-foreground">({percent}%)</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">{cat.description}</p>

                                    {/* Progress indicator */}
                                    <div className="mt-3 h-1.5 bg-card/50 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${key === 'produce' ? 'bg-success' : key === 'replace' ? 'bg-destructive' : 'bg-muted-foreground'}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Entries */}
                <div className="glass-card p-6">
                    <h3 className="text-title text-foreground mb-4">Recent Time Entries</h3>
                    <div className="space-y-3">
                        {TIME_DATA.recentEntries.length === 0 ? (
                            <p className="text-muted-foreground text-sm py-4">No entries yet. Log your time above!</p>
                        ) : TIME_DATA.recentEntries.map((entry) => {
                            const cat = DRIP_CATEGORIES[entry.category as keyof typeof DRIP_CATEGORIES];
                            return (
                                <motion.div
                                    key={entry.id}
                                    className="flex items-center gap-3 p-3 bg-card/30 rounded-lg"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ x: 4 }}
                                    transition={PHYSICS.interaction}
                                >
                                    <div className={`h-8 w-8 rounded-lg ${cat.color} flex items-center justify-center`}>
                                        <cat.icon className={`h-4 w-4 ${cat.textColor}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">{entry.task}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-medium text-foreground">{entry.duration}m</p>
                                        <span className={`text-xs ${cat.textColor}`}>{cat.label}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Add Entry Form */}
            {showAddEntry && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6"
                >
                    <h3 className="text-title text-foreground mb-4">Log New Time Entry</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Task</label>
                            <input
                                type="text"
                                value={newEntry.task}
                                onChange={(e) => setNewEntry({ ...newEntry, task: e.target.value })}
                                placeholder="What did you work on?"
                                className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Category (DRIP)</label>
                            <select
                                value={newEntry.category}
                                onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                                className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground"
                            >
                                {Object.entries(DRIP_CATEGORIES).map(([key, cat]) => (
                                    <option key={key} value={key}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                value={newEntry.duration}
                                onChange={(e) => setNewEntry({ ...newEntry, duration: parseInt(e.target.value) || 0 })}
                                min="5"
                                step="5"
                                className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="ghost" onClick={() => setShowAddEntry(false)} disablePhysics>Cancel</Button>
                        <Button
                            className="bg-gradient-primary"
                            onClick={() => createMutation.mutate(newEntry)}
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending ? 'Saving...' : 'Save Entry'}
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Recommendations */}
            <div className="glass-card p-6">
                <h3 className="text-title text-foreground mb-4">🎯 Optimization Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RecommendationCard
                        title="Deploy Inbox Sentinel"
                        description="You spend 8.2 hrs/week on email. An AI agent could handle 80% of that."
                        impact="+6.5 hrs/week reclaimed"
                        category="replace"
                        href="/dashboard/agents"
                    />
                    <RecommendationCard
                        title="Create SOP Templates"
                        description="Document your onboarding process to make future training faster."
                        impact="2x faster team scaling"
                        category="invest"
                        href="/dashboard/help"
                    />
                </div>
            </div>
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

function RecommendationCard({
    title,
    description,
    impact,
    category,
    href
}: {
    title: string;
    description: string;
    impact: string;
    category: string;
    href?: string;
}) {
    const cat = DRIP_CATEGORIES[category as keyof typeof DRIP_CATEGORIES];

    const handleClick = () => {
        if (href) {
            window.location.href = href;
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className={`p-4 rounded-xl border border-border/30 ${cat.color} text-left w-full hover:border-primary/30 transition-all`}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={PHYSICS.interaction}
        >
            <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-lg bg-card flex items-center justify-center`}>
                    <cat.icon className={`h-4 w-4 ${cat.textColor}`} />
                </div>
                <div className="flex-1">
                    <h4 className="font-medium text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                    <p className={`text-sm font-medium ${cat.textColor} mt-2`}>→ {impact}</p>
                </div>
            </div>
        </motion.button>
    );
}
