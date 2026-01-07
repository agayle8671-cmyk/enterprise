/**
 * Dashboard Home - SOVEREIGN AESTHETIC
 * Electric Concrete Design System
 * 
 * Features:
 * - LiveBentoGrid with container queries
 * - GravityCards with magnetic cursor interaction
 * - AnimatedBorders with conic gradients
 * - SystemTicker with live updates
 * - Space Mono typography
 * - #BBFF00 acid green accents
 */

import { motion } from "framer-motion";
import { 
  Zap, Bot, Clock, TrendingUp, DollarSign, Activity, 
  Target, ArrowUpRight, CheckCircle2, AlertCircle,
  Mail, Users, Cpu, HardDrive, Network, ChevronRight
} from "lucide-react";
import { 
  GravityCard, 
  AnimatedBorder,
  LiveBentoGrid, 
  BentoItem, 
  BentoCell,
  SystemTicker,
  SystemVitals 
} from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { 
  generateRealtimeMetrics, 
  generateAgentActivities,
  generateAgentMetrics,
  formatTimeAgo 
} from "@/lib/mockData";

export default function HomeSovereign() {
  const metrics = generateRealtimeMetrics();
  const activities = generateAgentActivities(50);
  const agentMetrics = generateAgentMetrics();

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      
      {/* SYSTEM TICKER - Always visible at top */}
      <SystemVitals className="sticky top-0 z-50" />

      <div className="p-4 space-y-4">
        
        {/* COMMAND HEADER with Animated Border */}
        <AnimatedBorder
          borderWidth={2}
          borderRadius={12}
          gradientColors={["var(--color-aurora-cyan)", "var(--color-aurora-purple)", "var(--color-aurora-cyan)"]}
          animationDuration={4}
          glowIntensity="high"
        >
          <div className="bg-[var(--color-structure)] p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-mono tracking-tight mb-1">
                  COMMAND CENTER
                </h1>
                <div className="text-sm font-mono text-[var(--color-acid)]">
                  <TypewriterText 
                    phrases={[
                      "// SYSTEM OPERATIONAL - ALL AGENTS ACTIVE",
                      "// 124 TASKS PROCESSED TODAY - 17.8 HOURS SAVED",
                      "// EFFICIENCY: 94.2% - PIPELINE: $2.4M",
                      "// BRUTALLY EFFICIENT. ETHEREALLY SMOOTH.",
                    ]}
                    typingSpeed={50}
                    deletingSpeed={30}
                    pauseTime={2500}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-acid)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-acid)]" />
                </span>
                <span className="text-xs font-mono text-[var(--color-acid)]">LIVE</span>
              </div>
            </div>
          </div>
        </AnimatedBorder>

        {/* MAIN BENTO GRID */}
        <LiveBentoGrid columns={12} gap={8}>
          
          {/* PRIMARY METRICS - Top Row with Magnetic Cards */}
          {[
            { label: "HOURS SAVED", value: "23.5", change: +12, icon: Clock, color: "var(--color-acid)" },
            { label: "TASKS AUTO", value: "156", change: +28, icon: Bot, color: "var(--color-aurora-cyan)" },
            { label: "ROI", value: "340%", change: +45, icon: TrendingUp, color: "var(--color-acid)" },
            { label: "ACTIVE AGENTS", value: "12", change: +2, icon: Zap, color: "var(--color-aurora-cyan)" },
          ].map((metric, i) => (
            <BentoItem key={i} colSpan={3} animated glowOnHover>
              <GravityCard magneticRange={120} magneticStrength={15}>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <metric.icon className="h-4 w-4" style={{ color: metric.color }} />
                    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-mono tracking-tight mb-1">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: metric.color }}>
                    <ArrowUpRight className="h-3 w-3" />
                    {metric.change}% vs last week
                  </div>
                </div>
              </GravityCard>
            </BentoItem>
          ))}

          {/* AGENT PERFORMANCE TABLE - Large Cell */}
          <BentoItem colSpan={8} rowSpan={3} glowOnHover>
            <div className="p-4 h-full overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                  AGENT PERFORMANCE MATRIX
                </h2>
                <div className="text-[9px] text-[var(--color-text-muted)] font-mono">
                  UPDATED: REAL-TIME
                </div>
              </div>
              
              <table className="w-full text-xs font-mono">
                <thead className="text-[var(--color-text-muted)] border-b border-[var(--color-acid)]/20">
                  <tr>
                    <th className="text-left pb-2 font-medium">AGENT</th>
                    <th className="text-right pb-2 font-medium">TODAY</th>
                    <th className="text-right pb-2 font-medium">WEEK</th>
                    <th className="text-right pb-2 font-medium">EFF</th>
                    <th className="text-right pb-2 font-medium">SAVED</th>
                    <th className="text-right pb-2 font-medium">ERR</th>
                    <th className="text-right pb-2 font-medium">UPTIME</th>
                  </tr>
                </thead>
                <tbody>
                  {agentMetrics.map((agent, i) => (
                    <motion.tr 
                      key={i}
                      className="border-t border-white/5 hover:bg-[var(--color-acid)]/5 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
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
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BentoItem>

          {/* SYSTEM STATUS PANEL - Right Side */}
          <BentoItem colSpan={4} rowSpan={3} glowOnHover>
            <div className="p-4 h-full flex flex-col">
              <h2 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-4">
                SYSTEM VITALS
              </h2>
              
              <div className="space-y-3 flex-1">
                {[
                  { label: "CPU LOAD", value: "32%", max: 100, icon: Cpu },
                  { label: "MEMORY", value: "8.2GB", max: 16, icon: HardDrive },
                  { label: "NETWORK", value: "12ms", max: 100, icon: Network },
                  { label: "QUEUE", value: "23", max: 50, icon: Activity },
                ].map((item, i) => (
                  <GravityCard key={i} magneticRange={80} magneticStrength={10}>
                    <div className="p-3 bg-white/5 rounded border border-white/10 hover:border-[var(--color-acid)]/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-3 w-3 text-[var(--color-acid)]" />
                          <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-sm font-bold font-mono text-[var(--color-acid)]">
                          {item.value}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--color-acid)] to-[var(--color-aurora-cyan)] rounded-full transition-all"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                    </div>
                  </GravityCard>
                ))}
              </div>

              {/* Live Status */}
              <div className="mt-4 pt-4 border-t border-[var(--color-acid)]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-acid)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-acid)]" />
                    </span>
                    <span className="text-[9px] font-mono text-[var(--color-acid)]">OPERATIONAL</span>
                  </div>
                  <div className="text-[9px] font-mono text-[var(--color-text-muted)]">
                    99.9% UPTIME
                  </div>
                </div>
              </div>
            </div>
          </BentoItem>

          {/* LIVE ACTIVITY FEED */}
          <BentoItem colSpan={12} rowSpan={2} glowOnHover>
            <div className="p-4 h-full overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                  LIVE ACTIVITY STREAM
                </h2>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-acid)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-acid)]" />
                  </span>
                  <span className="text-[9px] font-mono text-[var(--color-acid)]">STREAMING</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {activities.slice(0, 9).map((activity, i) => (
                  <GravityCard key={i} magneticRange={60}>
                    <motion.div
                      className="p-3 bg-white/5 rounded border border-white/10 hover:border-[var(--color-acid)]/30 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
                          {activity.agentName}
                        </span>
                        <span className="text-[8px] font-mono text-[var(--color-text-muted)]">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      <div className="text-xs mb-2">{activity.task}</div>
                      <div className="flex items-center gap-2">
                        {activity.status === 'completed' && (
                          <CheckCircle2 className="h-3 w-3 text-[var(--color-acid)]" />
                        )}
                        {activity.status === 'in_progress' && (
                          <Activity className="h-3 w-3 text-[var(--color-aurora-cyan)] animate-pulse" />
                        )}
                        {activity.status === 'failed' && (
                          <AlertCircle className="h-3 w-3 text-[var(--color-alarm)]" />
                        )}
                        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
                          {activity.duration}s
                        </span>
                      </div>
                    </motion.div>
                  </GravityCard>
                ))}
              </div>
            </div>
          </BentoItem>

          {/* BOTTOM METRICS ROW */}
          {[
            { label: "PIPELINE", value: "$2.4M", icon: DollarSign },
            { label: "EMAILS", value: "156", icon: Mail },
            { label: "MEETINGS", value: "8", icon: Users },
            { label: "COMPLETION", value: "94%", icon: Target },
          ].map((item, i) => (
            <BentoItem key={i} colSpan={3} animated glowOnHover>
              <AnimatedBorder borderWidth={1} borderRadius={8} animationDuration={3}>
                <GravityCard magneticRange={100}>
                  <div className="p-4 bg-[var(--color-structure)]">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-3 w-3 text-[var(--color-acid)]" />
                      <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold font-mono tracking-tight text-[var(--color-acid)]">
                      {item.value}
                    </div>
                  </div>
                </GravityCard>
              </AnimatedBorder>
            </BentoItem>
          ))}

        </LiveBentoGrid>

      </div>
    </div>
  );
}
