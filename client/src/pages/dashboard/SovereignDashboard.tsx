/**
 * Sovereign Dashboard
 * 
 * Sovereign Aesthetic Phase 1: The Bloomberg Layer
 * A dense, data-first dashboard showcasing the Bento Grid system
 * with live data streams and terminal-style typography.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoItem, BentoDataCard, BentoTicker } from '@/components/BentoGrid';
import {
    Activity,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Zap,
    Clock,
    Server,
    Cpu,
    HardDrive,
    Wifi,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

// ============================================================================
// MOCK DATA GENERATORS (Simulating live data streams)
// ============================================================================

const generateRandomDelta = () => (Math.random() * 20 - 10).toFixed(2);
const generateRandomValue = (base: number, variance: number) =>
    (base + (Math.random() * variance - variance / 2)).toFixed(2);

// ============================================================================
// SOVEREIGN DASHBOARD
// ============================================================================

export default function SovereignDashboard() {
    // Simulated live data that updates every second
    const [liveData, setLiveData] = useState({
        revenue: 847293,
        mrr: 142850,
        arr: 1714200,
        customers: 2847,
        activeUsers: 1293,
        cpuUsage: 67,
        memoryUsage: 54,
        networkLatency: 23,
        uptime: 99.97,
        requests: 142857,
    });

    // Ticker data
    const [tickerItems, setTickerItems] = useState([
        { label: 'MRR', value: '$142.8K', trend: 'up' as const },
        { label: 'CHURN', value: '1.2%', trend: 'down' as const },
        { label: 'NPS', value: '72', trend: 'up' as const },
        { label: 'CAC', value: '$247', trend: 'neutral' as const },
        { label: 'LTV', value: '$4,820', trend: 'up' as const },
        { label: 'CPU', value: '67%', trend: 'neutral' as const },
        { label: 'LATENCY', value: '23ms', trend: 'up' as const },
    ]);

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveData(prev => ({
                ...prev,
                cpuUsage: Math.min(100, Math.max(0, prev.cpuUsage + (Math.random() * 10 - 5))),
                memoryUsage: Math.min(100, Math.max(0, prev.memoryUsage + (Math.random() * 6 - 3))),
                networkLatency: Math.max(1, prev.networkLatency + (Math.random() * 10 - 5)),
                requests: prev.requests + Math.floor(Math.random() * 100),
                activeUsers: Math.max(0, prev.activeUsers + Math.floor(Math.random() * 20 - 10)),
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--color-void)] p-4">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
                    SOVEREIGN COMMAND
                </h1>
                <p className="text-sovereign-muted text-sm mt-1">
                    Real-time system metrics • {new Date().toLocaleTimeString()}
                </p>
            </header>

            {/* Live Ticker */}
            <BentoTicker items={tickerItems} className="mb-6 -mx-4" />

            {/* Main Bento Grid */}
            <BentoGrid columns={12} gap="normal" className="mb-6">

                {/* Revenue - Large Card */}
                <BentoItem colSpan={4} rowSpan={2} glowing>
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                TOTAL REVENUE
                            </span>
                            <DollarSign className="h-4 w-4 text-[var(--color-acid)]" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <span
                                className="text-5xl font-bold text-[var(--color-acid)]"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                            >
                                ${(liveData.revenue / 1000).toFixed(1)}K
                            </span>
                            <div className="flex items-center gap-2 mt-2">
                                <ArrowUpRight className="h-4 w-4 text-[var(--color-acid)]" />
                                <span className="text-terminal text-sm text-[var(--color-acid)]">
                                    +12.4% MTD
                                </span>
                            </div>
                        </div>
                        {/* Sparkline placeholder */}
                        <div className="h-16 mt-4 flex items-end gap-1">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-[var(--color-acid)] opacity-30 rounded-t"
                                    style={{
                                        height: `${20 + Math.random() * 80}%`,
                                        opacity: i === 23 ? 1 : 0.3,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </BentoItem>

                {/* MRR */}
                <BentoItem colSpan={2}>
                    <BentoDataCard
                        label="MRR"
                        value={`$${(liveData.mrr / 1000).toFixed(1)}K`}
                        delta={8.2}
                        trend="up"
                        icon={<TrendingUp className="h-4 w-4" />}
                    />
                </BentoItem>

                {/* ARR */}
                <BentoItem colSpan={2}>
                    <BentoDataCard
                        label="ARR"
                        value={`$${(liveData.arr / 1000000).toFixed(2)}M`}
                        delta={15.7}
                        trend="up"
                        icon={<BarChart3 className="h-4 w-4" />}
                    />
                </BentoItem>

                {/* Active Users */}
                <BentoItem colSpan={2}>
                    <BentoDataCard
                        label="ACTIVE NOW"
                        value={liveData.activeUsers.toLocaleString()}
                        delta={-2.3}
                        trend="down"
                        icon={<Users className="h-4 w-4" />}
                    />
                </BentoItem>

                {/* Total Customers */}
                <BentoItem colSpan={2}>
                    <BentoDataCard
                        label="CUSTOMERS"
                        value={liveData.customers.toLocaleString()}
                        delta={4.1}
                        trend="up"
                        icon={<Users className="h-4 w-4" />}
                    />
                </BentoItem>

                {/* CPU Usage - System Metrics */}
                <BentoItem colSpan={2}>
                    <div className="p-4 h-full">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                CPU
                            </span>
                            <Cpu className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                        </div>
                        <span
                            className={`text-2xl font-bold ${liveData.cpuUsage > 80 ? 'text-[var(--color-alarm)]' : 'text-[var(--color-acid)]'}`}
                            style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                        >
                            {liveData.cpuUsage.toFixed(0)}%
                        </span>
                        {/* Progress bar */}
                        <div className="h-1 bg-[var(--color-structure)] rounded-full mt-2 overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${liveData.cpuUsage > 80 ? 'bg-[var(--color-alarm)]' : 'bg-[var(--color-acid)]'}`}
                                animate={{ width: `${liveData.cpuUsage}%` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>
                </BentoItem>

                {/* Memory Usage */}
                <BentoItem colSpan={2}>
                    <div className="p-4 h-full">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                MEMORY
                            </span>
                            <HardDrive className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                        </div>
                        <span
                            className="text-2xl font-bold text-[var(--color-acid)]"
                            style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                        >
                            {liveData.memoryUsage.toFixed(0)}%
                        </span>
                        <div className="h-1 bg-[var(--color-structure)] rounded-full mt-2 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-[var(--color-acid)]"
                                animate={{ width: `${liveData.memoryUsage}%` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>
                </BentoItem>

                {/* Network Latency */}
                <BentoItem colSpan={2}>
                    <div className="p-4 h-full">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                LATENCY
                            </span>
                            <Wifi className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                        </div>
                        <span
                            className={`text-2xl font-bold ${liveData.networkLatency > 100 ? 'text-[var(--color-alarm)]' : 'text-[var(--color-acid)]'}`}
                            style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                        >
                            {liveData.networkLatency.toFixed(0)}ms
                        </span>
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mt-1">
                            P99: 47ms
                        </span>
                    </div>
                </BentoItem>

                {/* Uptime */}
                <BentoItem colSpan={2}>
                    <div className="p-4 h-full">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                UPTIME
                            </span>
                            <Server className="h-4 w-4 text-[var(--color-acid)]" />
                        </div>
                        <span
                            className="text-2xl font-bold text-[var(--color-acid)]"
                            style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                        >
                            {liveData.uptime}%
                        </span>
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mt-1">
                            30 DAYS
                        </span>
                    </div>
                </BentoItem>

                {/* Request Count */}
                <BentoItem colSpan={4}>
                    <div className="p-4 h-full">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                API REQUESTS (24H)
                            </span>
                            <Activity className="h-4 w-4 text-[var(--color-acid)]" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span
                                className="text-3xl font-bold text-[var(--color-acid)]"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                            >
                                {(liveData.requests / 1000).toFixed(1)}K
                            </span>
                            <span className="text-terminal text-sm text-[var(--color-acid)]">
                                +2,847/min
                            </span>
                        </div>
                        {/* Mini chart */}
                        <div className="flex items-end gap-0.5 mt-3 h-8">
                            {Array.from({ length: 48 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-[var(--color-acid)] rounded-t"
                                    style={{
                                        height: `${10 + Math.random() * 90}%`,
                                        opacity: 0.3 + (i / 48) * 0.7,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </BentoItem>

            </BentoGrid>

            {/* Footer Status Bar */}
            <footer className="fixed bottom-0 left-0 right-0 bg-[var(--color-void)] border-t border-[var(--glass-sovereign-border)] px-4 py-2">
                <div className="flex items-center justify-between text-terminal text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[var(--color-acid)]">● LIVE</span>
                        <span className="text-[var(--text-sovereign-muted)]">
                            SOVEREIGN OS v1.0.0
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[var(--text-sovereign-muted)]">
                        <span>CPU: {liveData.cpuUsage.toFixed(0)}%</span>
                        <span>MEM: {liveData.memoryUsage.toFixed(0)}%</span>
                        <span>NET: {liveData.networkLatency.toFixed(0)}ms</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
