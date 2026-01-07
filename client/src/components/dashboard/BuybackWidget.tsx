/**
 * BuybackWidget - Real-time Buyback Rate Calculator
 * 
 * Displays Revenue ÷ Hours Worked with color-coded alerts.
 * Core metric from "Buy Back Your Time" methodology.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, TrendingUp, TrendingDown, AlertTriangle, Zap } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SpringCounter } from '@/components/Physics';

interface BuybackWidgetProps {
    /** Weekly revenue in dollars */
    weeklyRevenue?: number;
    /** Hours worked this week */
    hoursWorked?: number;
    /** Target buyback rate */
    targetRate?: number;
    /** Historical rates for sparkline */
    history?: number[];
}

export function BuybackWidget({
    weeklyRevenue = 0,
    hoursWorked = 40,
    targetRate = 500,
    history = []
}: BuybackWidgetProps) {
    const buybackRate = useMemo(() => {
        if (hoursWorked <= 0) return 0;
        return weeklyRevenue / hoursWorked;
    }, [weeklyRevenue, hoursWorked]);

    const status = useMemo(() => {
        if (buybackRate >= targetRate) return 'optimal';
        if (buybackRate >= targetRate * 0.7) return 'warning';
        return 'critical';
    }, [buybackRate, targetRate]);

    const statusColors = {
        optimal: 'var(--color-acid)',
        warning: 'var(--color-aurora-purple)',
        critical: 'var(--color-alarm)',
    };

    const statusIcons = {
        optimal: TrendingUp,
        warning: AlertTriangle,
        critical: TrendingDown,
    };

    const StatusIcon = statusIcons[status];

    return (
        <GlassCard intensity="medium" className="p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-sovereign-muted)]">
                    BUYBACK RATE
                </h3>
                <StatusIcon
                    className="w-4 h-4"
                    style={{ color: statusColors[status] }}
                />
            </div>

            {/* Main Rate Display */}
            <div className="flex items-baseline gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-[var(--text-sovereign-muted)]" />
                <SpringCounter
                    value={buybackRate}
                    className="text-3xl font-mono font-bold"
                    style={{ color: statusColors[status] }}
                />
                <span className="text-sm text-[var(--text-sovereign-muted)]">/hr</span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--glass-surface)]">
                    <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="w-3 h-3 text-[var(--color-acid)]" />
                        <span className="text-[10px] text-[var(--text-sovereign-muted)]">REVENUE</span>
                    </div>
                    <div className="text-sm font-mono text-[var(--text-sovereign-primary)]">
                        ${weeklyRevenue.toLocaleString()}
                    </div>
                </div>
                <div className="p-2 rounded-lg bg-[var(--glass-surface)]">
                    <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-[var(--color-aurora-blue)]" />
                        <span className="text-[10px] text-[var(--text-sovereign-muted)]">HOURS</span>
                    </div>
                    <div className="text-sm font-mono text-[var(--text-sovereign-primary)]">
                        {hoursWorked}h
                    </div>
                </div>
            </div>

            {/* Target Progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-sovereign-muted)]">Target: ${targetRate}/hr</span>
                    <span style={{ color: statusColors[status] }}>
                        {Math.round((buybackRate / targetRate) * 100)}%
                    </span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--glass-surface)] overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((buybackRate / targetRate) * 100, 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: statusColors[status] }}
                    />
                </div>
            </div>

            {/* Status Message */}
            {status === 'critical' && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2 rounded-lg bg-[var(--color-alarm)]/10 border border-[var(--color-alarm)]/30"
                >
                    <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-[var(--color-alarm)]" />
                        <span className="text-xs text-[var(--color-alarm)]">
                            Deploy agents to increase your rate
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Sparkline (if history provided) */}
            {history.length > 1 && (
                <div className="mt-3 pt-3 border-t border-[var(--glass-border)]">
                    <MiniSparkline data={history} color={statusColors[status]} />
                </div>
            )}
        </GlassCard>
    );
}

/**
 * Mini sparkline for historical trend
 */
function MiniSparkline({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((value, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 30" className="w-full h-6">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

/**
 * useBuybackCalculator - Hook for integrating with TimeAudit data
 */
export function useBuybackCalculator() {
    const [weeklyRevenue, setWeeklyRevenue] = useState(0);
    const [hoursWorked, setHoursWorked] = useState(40);
    const [targetRate, setTargetRate] = useState(500);
    const [history, setHistory] = useState<number[]>([]);

    const buybackRate = useMemo(() => {
        if (hoursWorked <= 0) return 0;
        return weeklyRevenue / hoursWorked;
    }, [weeklyRevenue, hoursWorked]);

    const recordWeek = () => {
        setHistory(prev => [...prev.slice(-11), buybackRate]);
    };

    return {
        weeklyRevenue,
        setWeeklyRevenue,
        hoursWorked,
        setHoursWorked,
        targetRate,
        setTargetRate,
        buybackRate,
        history,
        recordWeek,
    };
}
