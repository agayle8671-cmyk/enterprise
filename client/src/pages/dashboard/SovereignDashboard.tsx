/**
 * Sovereign Dashboard
 * 
 * Sovereign Aesthetic Phase 1 + 2 + 3: Bloomberg + Raycast + Antigravity Layers
 * Dense, data-first dashboard with glassmorphism, aurora effects,
 * physics-based interactions, typewriter animations, and gravity cards.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoItem, BentoDataCard, BentoTicker } from '@/components/BentoGrid';
import {
    GlassCard,
    AuroraBackground,
    GlowButton,
    SpotlightCard
} from '@/components/GlassCard';
import {
    TypewriterText,
    GravityCard,
    StreamingNumber,
    PulseRing,
    ParticleField,
    FloatingElement,
    SpringCounter
} from '@/components/Physics';
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
    ArrowDownRight,
    Terminal,
    Sparkles,
    Atom,
    Orbit,
    Play,
    RefreshCw
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

            {/* ================================================================
                PHASE 2: RAYCAST LAYER - Glass, Aurora, Spotlight
                ================================================================ */}

            <div className="mt-8 mb-20">
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    RAYCAST LAYER
                </h2>

                {/* Aurora Background Section */}
                <AuroraBackground intensity="medium" className="rounded-2xl mb-6">
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="h-6 w-6 text-[var(--color-aurora-cyan)]" />
                            <h3 className="text-xl font-bold text-[var(--text-sovereign-primary)]">
                                Aurora Background
                            </h3>
                        </div>
                        <p className="text-[var(--text-sovereign-muted)] max-w-2xl mb-6">
                            Animated aurora gradients create depth and energy. The pulsing cyan, purple,
                            and acid accents bring the interface to life without overwhelming the data.
                        </p>
                        <div className="flex gap-3">
                            <GlowButton variant="acid" size="md">
                                <Terminal className="h-4 w-4 mr-2 inline" />
                                EXECUTE
                            </GlowButton>
                            <GlowButton variant="aurora" size="md">
                                DEPLOY
                            </GlowButton>
                            <GlowButton variant="alarm" size="md">
                                ABORT
                            </GlowButton>
                        </div>
                    </div>
                </AuroraBackground>

                {/* Glass Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Glass Card - Default */}
                    <GlassCard intensity="medium" variant="default" magnetic>
                        <div className="p-6">
                            <h4 className="text-terminal text-sm text-[var(--text-sovereign-muted)] mb-2">
                                DEFAULT GLASS
                            </h4>
                            <p className="text-[var(--text-sovereign-primary)] text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                MAGNETIC
                            </p>
                            <p className="text-xs text-[var(--text-sovereign-muted)]">
                                Hover to feel the magnetic pull effect
                            </p>
                        </div>
                    </GlassCard>

                    {/* Glass Card - Acid */}
                    <GlassCard intensity="medium" variant="acid" glowing>
                        <div className="p-6">
                            <h4 className="text-terminal text-sm text-[var(--color-acid)] mb-2">
                                ACID VARIANT
                            </h4>
                            <p className="text-[var(--color-acid)] text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                GLOWING
                            </p>
                            <p className="text-xs text-[var(--text-sovereign-muted)]">
                                Bloomberg Terminal Green with aurora border
                            </p>
                        </div>
                    </GlassCard>

                    {/* Glass Card - Aurora */}
                    <GlassCard intensity="heavy" variant="aurora" glowing>
                        <div className="p-6">
                            <h4 className="text-terminal text-sm text-[var(--color-aurora-cyan)] mb-2">
                                AURORA VARIANT
                            </h4>
                            <p className="text-[var(--color-aurora-cyan)] text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                ETHEREAL
                            </p>
                            <p className="text-xs text-[var(--text-sovereign-muted)]">
                                Cyan-purple gradient with heavy blur
                            </p>
                        </div>
                    </GlassCard>
                </div>

                {/* Spotlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SpotlightCard>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-lg bg-[var(--color-acid)]/20 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-[var(--color-acid)]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[var(--text-sovereign-primary)]">Spotlight Effect</h4>
                                    <p className="text-xs text-[var(--text-sovereign-muted)]">Move cursor to see</p>
                                </div>
                            </div>
                            <p className="text-sm text-[var(--text-sovereign-muted)]">
                                A subtle radial gradient follows your cursor, creating a spotlight
                                effect that highlights content as you explore.
                            </p>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-lg bg-[var(--color-aurora-purple)]/20 flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-[var(--color-aurora-purple)]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[var(--text-sovereign-primary)]">Physics-Based</h4>
                                    <p className="text-xs text-[var(--text-sovereign-muted)]">Spring animations</p>
                                </div>
                            </div>
                            <p className="text-sm text-[var(--text-sovereign-muted)]">
                                All interactions use spring physics (stiffness: 400, damping: 30)
                                for natural, responsive motion.
                            </p>
                        </div>
                    </SpotlightCard>
                </div>
            </div>

            {/* ================================================================
                PHASE 3: ANTIGRAVITY LAYER - Physics & Motion
                ================================================================ */}

            <div className="mt-8 mb-20">
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    ANTIGRAVITY LAYER
                </h2>

                {/* Typewriter Text Demo */}
                <div className="glass-panel rounded-2xl p-8 mb-6 relative overflow-hidden">
                    <ParticleField count={20} color="var(--color-acid)" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Atom className="h-6 w-6 text-[var(--color-acid)]" />
                            <h3 className="text-xl font-bold text-[var(--text-sovereign-primary)]">
                                Typewriter Effect
                            </h3>
                        </div>
                        <div className="text-2xl text-[var(--color-acid)] mb-4">
                            <TypewriterText
                                text="SYSTEM ONLINE. ALL MODULES OPERATIONAL. READY FOR COMMANDS..."
                                speed={30}
                                loop
                                pauseDuration={3000}
                            />
                        </div>
                        <p className="text-[var(--text-sovereign-muted)] text-sm">
                            Text streams in character by character using useMotionValue and useTransform.
                            The blinking cursor uses a stepped animation for authentic terminal feel.
                        </p>
                    </div>
                </div>

                {/* Gravity Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <GravityCard strength={8} range={200}>
                        <div className="glass-panel rounded-xl p-6 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                    GRAVITY CARD
                                </span>
                                <Orbit className="h-4 w-4 text-[var(--color-aurora-cyan)]" />
                            </div>
                            <p className="text-[var(--text-sovereign-primary)] text-lg font-bold mb-2"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                MAGNETIC PULL
                            </p>
                            <p className="text-sm text-[var(--text-sovereign-muted)]">
                                Move your cursor near this card to see it follow with spring physics.
                            </p>
                        </div>
                    </GravityCard>

                    <FloatingElement amplitude={8} duration={3}>
                        <div className="glass-panel rounded-xl p-6 h-full border-[var(--color-aurora-purple)]/30">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-terminal text-xs text-[var(--color-aurora-purple)]">
                                    FLOATING ELEMENT
                                </span>
                                <RefreshCw className="h-4 w-4 text-[var(--color-aurora-purple)]" />
                            </div>
                            <p className="text-[var(--color-aurora-purple)] text-lg font-bold mb-2"
                                style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                ZERO GRAVITY
                            </p>
                            <p className="text-sm text-[var(--text-sovereign-muted)]">
                                Continuous floating animation with customizable amplitude.
                            </p>
                        </div>
                    </FloatingElement>

                    <div className="glass-panel rounded-xl p-6 relative">
                        <div className="absolute top-4 right-4">
                            <PulseRing color="var(--color-acid)" size={40} duration={2} />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                                STREAMING DATA
                            </span>
                            <Play className="h-4 w-4 text-[var(--color-acid)]" />
                        </div>
                        <div className="text-3xl font-bold text-[var(--color-acid)] mb-2">
                            <StreamingNumber
                                value={liveData.requests}
                                duration={0.5}
                                prefix=""
                                suffix=" req"
                            />
                        </div>
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            Numbers animate smoothly between values with spring physics.
                        </p>
                    </div>
                </div>

                {/* Spring Counters Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-panel rounded-xl p-4 text-center">
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                            ACTIVE USERS
                        </span>
                        <SpringCounter
                            value={liveData.activeUsers}
                            className="text-2xl font-bold text-[var(--color-acid)]"
                        />
                    </div>
                    <div className="glass-panel rounded-xl p-4 text-center">
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                            CPU LOAD
                        </span>
                        <SpringCounter
                            value={Math.round(liveData.cpuUsage)}
                            suffix="%"
                            className="text-2xl font-bold text-[var(--color-aurora-cyan)]"
                        />
                    </div>
                    <div className="glass-panel rounded-xl p-4 text-center">
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                            MEMORY
                        </span>
                        <SpringCounter
                            value={Math.round(liveData.memoryUsage)}
                            suffix="%"
                            className="text-2xl font-bold text-[var(--color-aurora-purple)]"
                        />
                    </div>
                    <div className="glass-panel rounded-xl p-4 text-center">
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                            LATENCY
                        </span>
                        <SpringCounter
                            value={Math.round(liveData.networkLatency)}
                            suffix="ms"
                            className={`text-2xl font-bold ${liveData.networkLatency > 100 ? 'text-[var(--color-alarm)]' : 'text-[var(--color-acid)]'}`}
                        />
                    </div>
                </div>
            </div>

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
