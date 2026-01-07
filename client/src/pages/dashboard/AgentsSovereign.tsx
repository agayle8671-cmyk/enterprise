/**
 * Agents Page - SOVEREIGN AESTHETIC
 * Electric Concrete Design System
 */

import { motion } from "framer-motion";
import { Bot, Zap, Target, CheckCircle2, AlertCircle, Activity, Clock, Settings, PlayCircle, PauseCircle } from "lucide-react";
import { 
  GravityCard, 
  AnimatedBorder,
  LiveBentoGrid, 
  BentoItem,
  SystemTicker 
} from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { generateAgentActivities, formatTimeAgo } from "@/lib/mockData";
import { useState } from "react";

export default function AgentsSovereign() {
  const activities = generateAgentActivities(100);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    {
      id: 'inbox-sentinel',
      name: 'Inbox Sentinel',
      status: 'active',
      tasksToday: 47,
      tasksWeek: 312,
      efficiency: 96.3,
      timeSaved: 4.2,
      errorRate: 0.8,
      uptime: 99.9,
      avgResponse: 2.3,
      queue: 12,
      costSavings: 8450,
    },
    {
      id: 'sales-agent',
      name: 'Sales Agent',
      status: 'active',
      tasksToday: 12,
      tasksWeek: 89,
      efficiency: 94.1,
      timeSaved: 2.8,
      errorRate: 1.2,
      uptime: 99.7,
      avgResponse: 4.7,
      queue: 8,
      costSavings: 12350,
    },
    {
      id: 'research-agent',
      name: 'Research Agent',
      status: 'active',
      tasksToday: 23,
      tasksWeek: 167,
      efficiency: 92.5,
      timeSaved: 3.5,
      errorRate: 2.1,
      uptime: 99.5,
      avgResponse: 8.2,
      queue: 15,
      costSavings: 6890,
    },
    {
      id: 'content-alchemist',
      name: 'Content Alchemist',
      status: 'active',
      tasksToday: 8,
      tasksWeek: 54,
      efficiency: 91.2,
      timeSaved: 1.9,
      errorRate: 1.8,
      uptime: 99.8,
      avgResponse: 12.5,
      queue: 5,
      costSavings: 9230,
    },
    {
      id: 'closer-agent',
      name: 'Closer Agent',
      status: 'active',
      tasksToday: 15,
      tasksWeek: 98,
      efficiency: 93.8,
      timeSaved: 2.3,
      errorRate: 1.5,
      uptime: 99.6,
      avgResponse: 5.8,
      queue: 11,
      costSavings: 15670,
    },
    {
      id: 'calendar-agent',
      name: 'Calendar Agent',
      status: 'active',
      tasksToday: 19,
      tasksWeek: 134,
      efficiency: 97.1,
      timeSaved: 3.1,
      errorRate: 0.5,
      uptime: 100,
      avgResponse: 1.8,
      queue: 6,
      costSavings: 7120,
    },
  ];

  const tickerItems = [
    { id: "1", label: "AGENTS ACTIVE", value: "6/6", trend: "neutral" as const, color: "var(--color-acid)" },
    { id: "2", label: "TASKS TODAY", value: "124", trend: "up" as const, color: "var(--color-acid)" },
    { id: "3", label: "AVG EFFICIENCY", value: "94.2%", trend: "up" as const, color: "var(--color-aurora-cyan)" },
    { id: "4", label: "TOTAL SAVED", value: "17.8hrs", trend: "up" as const, color: "var(--color-acid)" },
  ];

  const filteredActivities = selectedAgent
    ? activities.filter(a => a.agentName === agents.find(ag => ag.id === selectedAgent)?.name)
    : activities;

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      
      {/* TOP TICKER */}
      <SystemTicker items={tickerItems} variant="typewriter" className="sticky top-0 z-50" />

      <div className="p-4 space-y-4">
        
        {/* HEADER */}
        <AnimatedBorder borderWidth={2} borderRadius={12} animationDuration={4} glowIntensity="high">
          <div className="bg-[var(--color-structure)] p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-mono tracking-tight mb-1">
                  AGENT CONTROL MATRIX
                </h1>
                <div className="text-sm font-mono text-[var(--color-acid)]">
                  <TypewriterText 
                    phrases={[
                      "// ALL AGENTS OPERATIONAL - ZERO CRITICAL ERRORS",
                      "// 124 TASKS IN PARALLEL - 17.8 HOURS SAVED TODAY",
                      "// AVERAGE EFFICIENCY: 94.2% - UPTIME: 99.7%",
                    ]}
                    typingSpeed={50}
                    deletingSpeed={30}
                    pauseTime={2500}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-acid)] text-2xl font-bold font-mono">6</span>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">ACTIVE</span>
              </div>
            </div>
          </div>
        </AnimatedBorder>

        {/* MAIN GRID */}
        <LiveBentoGrid columns={12} gap={8}>
          
          {/* SUMMARY METRICS */}
          {[
            { label: "TOTAL TASKS", value: "124", icon: Activity },
            { label: "TIME SAVED", value: "17.8h", icon: Clock },
            { label: "AVG EFFICIENCY", value: "94.2%", icon: Target },
            { label: "COST SAVINGS", value: "$59.7K", icon: Zap },
          ].map((metric, i) => (
            <BentoItem key={i} colSpan={3} animated glowOnHover>
              <GravityCard magneticRange={120}>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <metric.icon className="h-4 w-4 text-[var(--color-acid)]" />
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                      {metric.label}
                    </span>
                  </div>
                  <div className="text-3xl font-bold font-mono tracking-tight text-[var(--color-acid)]">
                    {metric.value}
                  </div>
                </div>
              </GravityCard>
            </BentoItem>
          ))}

          {/* AGENT CARDS GRID */}
          {agents.map((agent, i) => (
            <BentoItem key={i} colSpan={4} rowSpan={2} glowOnHover>
              <GravityCard magneticRange={150} magneticStrength={12}>
                <motion.div
                  className={`p-4 h-full cursor-pointer transition-all ${
                    selectedAgent === agent.id ? 'bg-[var(--color-acid)]/10' : ''
                  }`}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[var(--color-acid)]/20 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-[var(--color-acid)]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold font-mono">{agent.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-acid)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-acid)]" />
                          </span>
                          <span className="text-[9px] font-mono text-[var(--color-acid)]">ACTIVE</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded transition-colors">
                      <Settings className="h-4 w-4 text-[var(--color-text-muted)]" />
                    </button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                      <div className="text-[9px] text-[var(--color-text-muted)] font-mono mb-1">TODAY</div>
                      <div className="text-xl font-bold font-mono">{agent.tasksToday}</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                      <div className="text-[9px] text-[var(--color-text-muted)] font-mono mb-1">WEEK</div>
                      <div className="text-xl font-bold font-mono">{agent.tasksWeek}</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                      <div className="text-[9px] text-[var(--color-text-muted)] font-mono mb-1">EFFICIENCY</div>
                      <div className="text-xl font-bold font-mono text-[var(--color-acid)]">{agent.efficiency}%</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                      <div className="text-[9px] text-[var(--color-text-muted)] font-mono mb-1">SAVED</div>
                      <div className="text-xl font-bold font-mono text-[var(--color-aurora-cyan)]">{agent.timeSaved}h</div>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="space-y-2 text-[9px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">ERROR RATE</span>
                      <span style={{ color: agent.errorRate <= 1 ? "var(--color-acid)" : "var(--color-alarm)" }}>
                        {agent.errorRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">UPTIME</span>
                      <span className="text-[var(--color-acid)]">{agent.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">AVG RESPONSE</span>
                      <span className="text-[var(--color-aurora-cyan)]">{agent.avgResponse}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">QUEUE</span>
                      <span className="text-[var(--color-text-primary)]">{agent.queue}</span>
                    </div>
                  </div>

                  {/* Cost Savings */}
                  <div className="mt-4 pt-4 border-t border-[var(--color-acid)]/20">
                    <div className="text-[9px] text-[var(--color-text-muted)] font-mono mb-1">COST SAVINGS</div>
                    <div className="text-2xl font-bold font-mono text-[var(--color-acid)]">
                      ${agent.costSavings.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              </GravityCard>
            </BentoItem>
          ))}

          {/* ACTIVITY STREAM */}
          <BentoItem colSpan={12} rowSpan={3} glowOnHover>
            <div className="p-4 h-full overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                  {selectedAgent ? `ACTIVITY: ${agents.find(a => a.id === selectedAgent)?.name.toUpperCase()}` : 'ALL ACTIVITY'}
                </h2>
                {selectedAgent && (
                  <button 
                    onClick={() => setSelectedAgent(null)}
                    className="text-[9px] font-mono text-[var(--color-alarm)] hover:underline"
                  >
                    CLEAR FILTER
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {filteredActivities.slice(0, 32).map((activity, i) => (
                  <GravityCard key={i} magneticRange={50}>
                    <motion.div
                      className="p-3 bg-white/5 rounded border border-white/10 hover:border-[var(--color-acid)]/30 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
                          {activity.agentName}
                        </span>
                        <span className="text-[8px] font-mono text-[var(--color-text-muted)]">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      <div className="text-[10px] mb-2">{activity.task}</div>
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

        </LiveBentoGrid>

      </div>
    </div>
  );
}
