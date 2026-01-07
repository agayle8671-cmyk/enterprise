/**
 * Sovereign Aesthetic Showcase
 * 
 * Demonstrates the complete "Electric Concrete" design system:
 * - Live Bento Grid with high data density
 * - Antigravity physics and magnetic interactions
 * - Animated gradient borders
 * - Bloomberg-style tickers
 * - Typewriter effects throughout
 */

import { motion } from "framer-motion";
import { 
  Zap, Bot, Clock, TrendingUp, DollarSign, Activity, 
  Target, Users, Cpu, HardDrive, Network, AlertCircle 
} from "lucide-react";
import { 
  GravityCard, 
  AnimatedBorder, 
  LiveBentoGrid, 
  BentoItem, 
  BentoCell,
  BentoSection,
  SystemTicker,
  SystemVitals 
} from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { 
  generateRealtimeMetrics, 
  generateAgentMetrics,
  generateWeeklyPerformance 
} from "@/lib/mockData";

export default function SovereignShowcase() {
  const metrics = generateRealtimeMetrics();
  const agentMetrics = generateAgentMetrics();
  const weeklyPerf = generateWeeklyPerformance();

  const tickerItems = [
    { id: "agents", label: "ACTIVE AGENTS", value: "6/6", trend: "neutral" as const, color: "var(--color-acid)" },
    { id: "tasks", label: "TASKS TODAY", value: "124", trend: "up" as const, color: "var(--color-acid)" },
    { id: "saved", label: "TIME SAVED", value: "17.8hrs", trend: "up" as const, color: "var(--color-aurora-cyan)" },
    { id: "pipeline", label: "PIPELINE", value: "$2.4M", trend: "up" as const, color: "var(--color-acid)" },
    { id: "efficiency", label: "EFFICIENCY", value: "94.2%", trend: "up" as const, color: "var(--color-aurora-cyan)" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      
      {/* System Ticker - Bloomberg Style */}
      <SystemVitals className="sticky top-0 z-50" />

      {/* Main Content */}
      <div className="p-4 space-y-4">
        
        {/* Hero Section with Typewriter */}
        <AnimatedBorder
          borderWidth={2}
          borderRadius={16}
          gradientColors={["var(--color-aurora-cyan)", "var(--color-aurora-purple)", "var(--color-aurora-cyan)"]}
          animationDuration={4}
          glowIntensity="high"
        >
          <div className="bg-[var(--color-structure)] p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[var(--color-acid)] to-[var(--color-aurora-cyan)] flex items-center justify-center">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-mono tracking-tight">SOVEREIGN OS</h1>
                <p className="text-sm text-[var(--color-text-muted)] font-mono">ELECTRIC CONCRETE v1.0</p>
              </div>
            </div>
            
            <div className="text-xl font-mono text-[var(--color-acid)]">
              <TypewriterText 
                phrases={[
                  "// BRUTALLY EFFICIENT. ETHEREALLY SMOOTH.",
                  "// HIGH-DENSITY DATA. PHYSICS-BASED INTERACTION.",
                  "// BLOOMBERG STRUCTURE. RAYCAST MATERIALITY.",
                  "// COMMANDING YOUR DIGITAL SOVEREIGNTY.",
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pauseTime={2500}
              />
            </div>
          </div>
        </AnimatedBorder>

        {/* Live Bento Grid - High Density Dashboard */}
        <LiveBentoGrid columns={12} gap={8}>
          
          {/* Quick Stats - 4 cells */}
          {metrics.slice(0, 4).map((metric, i) => (
            <BentoItem key={i} colSpan={3} glowOnHover animated>
              <GravityCard magneticRange={100} magneticStrength={12}>
                <BentoCell
                  title={metric.label}
                  value={metric.value}
                  trend={metric.change >= 0 ? "up" : "down"}
                  trendValue={`${Math.abs(metric.change)}%`}
                  subtitle={metric.changeLabel}
                  icon={
                    i === 0 ? <Clock className="h-4 w-4" /> :
                    i === 1 ? <Bot className="h-4 w-4" /> :
                    i === 2 ? <TrendingUp className="h-4 w-4" /> :
                    <Zap className="h-4 w-4" />
                  }
                />
              </GravityCard>
            </BentoItem>
          ))}

          {/* Agent Performance Table - Large cell */}
          <BentoItem colSpan={8} rowSpan={2} glowOnHover>
            <div className="p-4 h-full overflow-auto">
              <h3 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-4">
                AGENT PERFORMANCE MATRIX
              </h3>
              <table className="w-full text-xs font-mono">
                <thead className="text-[var(--color-text-muted)] border-b border-white/10">
                  <tr>
                    <th className="text-left pb-2">AGENT</th>
                    <th className="text-right pb-2">TODAY</th>
                    <th className="text-right pb-2">WEEK</th>
                    <th className="text-right pb-2">EFFICIENCY</th>
                    <th className="text-right pb-2">SAVED</th>
                    <th className="text-right pb-2">ERROR</th>
                    <th className="text-right pb-2">UPTIME</th>
                  </tr>
                </thead>
                <tbody>
                  {agentMetrics.map((agent, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 font-medium">{agent.name}</td>
                      <td className="py-3 text-right">{agent.tasksToday}</td>
                      <td className="py-3 text-right text-[var(--color-text-muted)]">{agent.tasksWeek}</td>
                      <td className="py-3 text-right" style={{ 
                        color: agent.efficiency >= 95 ? "var(--color-acid)" : "var(--color-aurora-cyan)" 
                      }}>
                        {agent.efficiency}%
                      </td>
                      <td className="py-3 text-right text-[var(--color-aurora-cyan)]">{agent.timeSaved}h</td>
                      <td className="py-3 text-right" style={{ 
                        color: agent.errorRate <= 1 ? "var(--color-acid)" : "var(--color-alarm)" 
                      }}>
                        {agent.errorRate}%
                      </td>
                      <td className="py-3 text-right text-[var(--color-acid)]">{agent.uptime}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BentoItem>

          {/* System Status - Side panel */}
          <BentoItem colSpan={4} rowSpan={2} glowOnHover>
            <div className="p-4 h-full flex flex-col">
              <h3 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-4">
                SYSTEM VITALS
              </h3>
              <div className="space-y-4 flex-1">
                {[
                  { label: "CPU LOAD", value: "32%", icon: Cpu, color: "var(--color-acid)" },
                  { label: "MEMORY", value: "8.2GB", icon: HardDrive, color: "var(--color-aurora-cyan)" },
                  { label: "NETWORK", value: "12ms", icon: Network, color: "var(--color-acid)" },
                  { label: "ACTIVE TASKS", value: "23", icon: Activity, color: "var(--color-aurora-cyan)" },
                ].map((item, i) => (
                  <GravityCard key={i} magneticRange={80}>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" style={{ color: item.color }} />
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold font-mono" style={{ color: item.color }}>
                        {item.value}
                      </span>
                    </div>
                  </GravityCard>
                ))}
              </div>

              {/* Live Indicator */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-acid)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-acid)]" />
                  </span>
                  <span className="text-xs font-mono text-[var(--color-acid)]">SYSTEM OPERATIONAL</span>
                </div>
              </div>
            </div>
          </BentoItem>

          {/* Weekly Performance Chart */}
          <BentoItem colSpan={6} glowOnHover>
            <div className="p-4">
              <h3 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-4">
                WEEKLY PERFORMANCE
              </h3>
              <div className="flex items-end gap-2 h-32">
                {weeklyPerf.map((day, i) => (
                  <GravityCard key={i} className="flex-1" magneticRange={60}>
                    <div className="h-full flex flex-col justify-end">
                      <div 
                        className="w-full bg-gradient-to-t from-[var(--color-acid)] to-[var(--color-aurora-cyan)] rounded-t"
                        style={{ height: `${(day.timeSaved / 10) * 100}%` }}
                      />
                      <div className="text-[9px] text-center text-[var(--color-text-muted)] mt-2 font-mono">
                        {day.day}
                      </div>
                    </div>
                  </GravityCard>
                ))}
              </div>
            </div>
          </BentoItem>

          {/* Pipeline Value */}
          <BentoItem colSpan={3} glowOnHover animated>
            <AnimatedBorder borderWidth={1} borderRadius={8} animationDuration={3}>
              <GravityCard>
                <BentoCell
                  title="PIPELINE VALUE"
                  value="$2.4M"
                  trend="up"
                  trendValue="15%"
                  subtitle="vs last month"
                  icon={<DollarSign className="h-4 w-4" />}
                />
              </GravityCard>
            </AnimatedBorder>
          </BentoItem>

          {/* Conversion Rate */}
          <BentoItem colSpan={3} glowOnHover animated>
            <GravityCard>
              <BentoCell
                title="CONVERSION"
                value="12.3%"
                trend="up"
                trendValue="5%"
                subtitle="this quarter"
                icon={<Target className="h-4 w-4" />}
              />
            </GravityCard>
          </BentoItem>

          {/* Billboard Section - Typewriter Updates */}
          <BentoItem colSpan={12} glowOnHover>
            <SystemTicker 
              items={tickerItems}
              variant="typewriter"
              className="text-lg"
            />
          </BentoItem>

        </LiveBentoGrid>

        {/* Footer Info */}
        <div className="text-center py-8">
          <div className="text-xs font-mono text-[var(--color-text-muted)] space-y-2">
            <p>SOVEREIGN OS v1.0 • ELECTRIC CONCRETE DESIGN SYSTEM</p>
            <p>CORPORATE BRUTALISM × LUMINESCENT PRODUCTIVITY</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-12 bg-[var(--color-acid)]" />
              <span className="text-[var(--color-acid)]">BRUTALLY EFFICIENT. ETHEREALLY SMOOTH.</span>
              <div className="h-px w-12 bg-[var(--color-acid)]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
