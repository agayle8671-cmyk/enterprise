/**
 * Time Audit Page - Sovereign Aesthetic
 * 
 * DRIP Framework time tracking with:
 * - Terminal-style displays
 * - Glass panels with aurora effects
 * - Physics-based animations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
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
    AlertTriangle,
    X,
    Play,
    Trash2
} from 'lucide-react';
import { BentoGrid, BentoItem, BentoDataCard } from '@/components/BentoGrid';
import { GlassCard, GlowButton, SpotlightCard } from '@/components/GlassCard';
import { TypewriterText, PulseRing, SpringCounter } from '@/components/Physics';

// DRIP Categories - Sovereign Colors
const DRIP_CATEGORIES = {
    delegate: {
        label: 'DELEGATE',
        icon: Users,
        color: 'rgba(255, 255, 255, 0.1)',
        accent: 'var(--text-sovereign-muted)',
        description: 'Low value, low energy → Assign to team/VA'
    },
    replace: {
        label: 'REPLACE',
        icon: Bot,
        color: 'rgba(255, 51, 102, 0.15)',
        accent: 'var(--color-alarm)',
        description: 'Low value, high drain → Automate with AI'
    },
    invest: {
        label: 'INVEST',
        icon: LineChart,
        color: 'rgba(112, 0, 255, 0.15)',
        accent: 'var(--color-aurora-purple)',
        description: 'High value, passive → Build systems'
    },
    produce: {
        label: 'PRODUCE',
        icon: Zap,
        color: 'rgba(187, 255, 0, 0.15)',
        accent: 'var(--color-acid)',
        description: 'High value, high energy → Your zone'
    },
};

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
    const [newEntry, setNewEntry] = useState({ task: '', category: 'produce' as keyof typeof DRIP_CATEGORIES, duration: 30 });

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
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/time-entries'] });
            setShowAddEntry(false);
            setNewEntry({ task: '', category: 'produce', duration: 30 });
        },
    });

    // Delete Entry Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await fetch(`/api/time-entries/${id}`, { method: 'DELETE' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/time-entries'] });
        },
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <PulseRing color="var(--color-acid)" size={60} duration={1.5} />
                    <p className="text-terminal text-sm text-[var(--color-acid)] mt-6">
                        LOADING TIME DATA...
                    </p>
                </div>
            </div>
        );
    }

    // Calculate stats
    const totalMinutes = entries.reduce((acc, e) => acc + e.duration, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    const categoryBreakdown = entries.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.duration;
        return acc;
    }, {} as Record<string, number>);
    const produceMinutes = categoryBreakdown.produce || 0;
    const replaceMinutes = categoryBreakdown.replace || 0;
    const buybackPotential = Math.round(replaceMinutes * 12); // $12/min saved through automation

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
                        TIME AUDIT
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-[var(--color-acid)]" />
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            DRIP Framework Analysis •{' '}
                            <span className="text-[var(--color-acid)] font-mono">{entries.length}</span>
                            {' '}entries tracked
                        </p>
                    </div>
                </div>
                <GlowButton variant="acid" onClick={() => setShowAddEntry(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    LOG TIME
                </GlowButton>
            </div>

            {/* Command Line Status */}
            <SpotlightCard className="p-6">
                <div className="flex items-center gap-4">
                    <Target className="h-6 w-6 text-[var(--color-aurora-cyan)]" />
                    <div className="flex-1">
                        <TypewriterText
                            text="Analyzing time allocation patterns... Identifying automation opportunities..."
                            speed={25}
                            loop
                            pauseDuration={3000}
                            className="text-lg text-[var(--color-aurora-cyan)]"
                        />
                    </div>
                </div>
            </SpotlightCard>

            {/* Stats Grid */}
            <BentoGrid columns={12} gap="normal">
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="TOTAL TRACKED"
                        value={`${totalHours}h`}
                        trend="neutral"
                        icon={<Clock className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="PRODUCE TIME"
                        value={`${Math.round(produceMinutes / 60)}h`}
                        delta={produceMinutes > 0 ? 15 : 0}
                        trend="up"
                        icon={<Zap className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="REPLACE QUEUE"
                        value={`${Math.round(replaceMinutes / 60)}h`}
                        delta={replaceMinutes > 0 ? -8 : 0}
                        trend="down"
                        icon={<Bot className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={3}>
                    <BentoDataCard
                        label="BUYBACK VALUE"
                        value={`$${buybackPotential}`}
                        delta={12.4}
                        trend="up"
                        icon={<DollarSign className="h-4 w-4" />}
                    />
                </BentoItem>
            </BentoGrid>

            {/* DRIP Categories */}
            <div>
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    DRIP FRAMEWORK
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(DRIP_CATEGORIES).map(([key, cat]) => {
                        const minutes = categoryBreakdown[key] || 0;
                        const hours = (minutes / 60).toFixed(1);
                        const percentage = totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;

                        return (
                            <GlassCard
                                key={key}
                                intensity="medium"
                                variant={key === 'produce' ? 'acid' : key === 'replace' ? 'aurora' : 'default'}
                            >
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div
                                            className="h-8 w-8 rounded-lg flex items-center justify-center"
                                            style={{ background: cat.color }}
                                        >
                                            <cat.icon className="h-4 w-4" style={{ color: cat.accent }} />
                                        </div>
                                        <span className="text-terminal text-xs" style={{ color: cat.accent }}>
                                            {cat.label}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-[var(--text-sovereign-primary)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                        {hours}h
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] text-[var(--text-sovereign-muted)]">
                                            {percentage}% of total
                                        </span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-1 bg-[var(--color-structure)] rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: cat.accent }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>

            {/* Recent Entries */}
            <div>
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    RECENT ENTRIES
                </h2>
                <div className="space-y-2">
                    {entries.length === 0 ? (
                        <GlassCard intensity="light">
                            <div className="p-8 text-center">
                                <Clock className="h-12 w-12 text-[var(--text-sovereign-muted)] mx-auto mb-4" />
                                <p className="text-[var(--text-sovereign-muted)]">No time entries yet</p>
                                <p className="text-sm text-[var(--text-sovereign-muted)] mt-1">
                                    Start tracking to see your DRIP analysis
                                </p>
                            </div>
                        </GlassCard>
                    ) : (
                        entries.slice(0, 10).map((entry) => {
                            const cat = DRIP_CATEGORIES[entry.category];
                            return (
                                <motion.div
                                    key={entry.id}
                                    className="glass-panel rounded-lg p-4 flex items-center justify-between"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-10 w-10 rounded-lg flex items-center justify-center"
                                            style={{ background: cat.color }}
                                        >
                                            <cat.icon className="h-5 w-5" style={{ color: cat.accent }} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[var(--text-sovereign-primary)]">{entry.task}</p>
                                            <span className="text-terminal text-[10px]" style={{ color: cat.accent }}>
                                                {cat.label}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-terminal text-sm text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                            {entry.duration}m
                                        </span>
                                        <motion.button
                                            className="p-2 rounded-lg text-[var(--text-sovereign-muted)] hover:text-[var(--color-alarm)] hover:bg-[rgba(255,51,102,0.1)]"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => deleteMutation.mutate(entry.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Add Entry Modal */}
            <AnimatePresence>
                {showAddEntry && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddEntry(false)} />
                        <motion.div
                            className="relative glass-panel rounded-2xl p-6 w-full max-w-md border border-[var(--glass-sovereign-border)]"
                            style={{ background: 'var(--color-structure)' }}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">LOG TIME</h3>
                                <button onClick={() => setShowAddEntry(false)} className="text-[var(--text-sovereign-muted)]">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Task Input */}
                                <div>
                                    <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                                        TASK DESCRIPTION
                                    </label>
                                    <input
                                        type="text"
                                        value={newEntry.task}
                                        onChange={(e) => setNewEntry({ ...newEntry, task: e.target.value })}
                                        className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                                        placeholder="What did you work on?"
                                        style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                                    />
                                </div>

                                {/* Duration Input */}
                                <div>
                                    <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                                        DURATION (MINUTES)
                                    </label>
                                    <input
                                        type="number"
                                        value={newEntry.duration}
                                        onChange={(e) => setNewEntry({ ...newEntry, duration: parseInt(e.target.value) || 0 })}
                                        className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                                        style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                                    />
                                </div>

                                {/* Category Select */}
                                <div>
                                    <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                                        DRIP CATEGORY
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(DRIP_CATEGORIES).map(([key, cat]) => (
                                            <motion.button
                                                key={key}
                                                onClick={() => setNewEntry({ ...newEntry, category: key as keyof typeof DRIP_CATEGORIES })}
                                                className={`p-3 rounded-lg flex items-center gap-2 text-left border transition-colors ${newEntry.category === key
                                                        ? 'border-[var(--color-acid)]'
                                                        : 'border-[var(--glass-sovereign-border)]'
                                                    }`}
                                                style={{ background: newEntry.category === key ? cat.color : 'var(--color-void)' }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <cat.icon className="h-4 w-4" style={{ color: cat.accent }} />
                                                <span className="text-terminal text-xs" style={{ color: cat.accent }}>
                                                    {cat.label}
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <GlowButton
                                    variant="acid"
                                    className="w-full mt-4"
                                    onClick={() => createMutation.mutate(newEntry)}
                                    disabled={!newEntry.task || createMutation.isPending}
                                >
                                    {createMutation.isPending ? 'SAVING...' : 'LOG ENTRY'}
                                </GlowButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
