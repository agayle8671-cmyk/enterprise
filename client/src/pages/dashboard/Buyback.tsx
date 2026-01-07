/**
 * Buyback Page - Sovereign Aesthetic
 * 
 * Visualization of time bought back with:
 * - Glass DRIP Matrix
 * - Terminal stats
 * - Agent management
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, PauseCircle, Settings, Activity, Clock, ArrowRight, Plus, Pause, Play, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAgents, useUpdateAgent } from "@/lib/api";
import { GlowButton, GlassCard, SpotlightCard } from "@/components/GlassCard";
import { BentoGrid, BentoItem, BentoDataCard } from "@/components/BentoGrid";
import { TypewriterText, PulseRing } from "@/components/Physics";
import { motion } from "framer-motion";
import { PHYSICS } from "@/lib/animation-constants";

export default function Buyback() {
  const { toast } = useToast();
  const { data: agents, isLoading } = useAgents();
  const updateAgent = useUpdateAgent();

  const handleDeployAgent = () => {
    toast({
      title: "Agent Deployment Initiated",
      description: "Allocating server resources for new autonomous agent...",
      duration: 3000,
    });
  };

  const toggleAgentStatus = async (agentId: number, currentStatus: string) => {
    const newStatus = currentStatus === "Running" ? "Paused" : "Running";
    await updateAgent.mutateAsync({ id: agentId, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <PulseRing color="var(--color-acid)" size={60} duration={1.5} />
      </div>
    );
  }

  const totalTimeSaved = agents?.reduce((sum: number, agent: any) => sum + (agent.timeSaved || 0), 0) || 0;
  const hours = Math.floor(totalTimeSaved / 60);
  const minutes = totalTimeSaved % 60;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
            BUYBACK AUTOPILOT
          </h1>
          <p className="text-sm text-[var(--text-sovereign-muted)] mt-1">
            Manage your fleet of autonomous agents
          </p>
        </div>
        <div className="text-right">
          <div className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mb-1">TOTAL TIME SAVED</div>
          <div className="text-3xl font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:00
          </div>
        </div>
      </div>

      {/* DRIP Matrix Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard intensity="medium" className="p-6">
          <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
            DRIP MATRIX ALLOCATION
          </h3>
          <div className="relative h-[300px] grid grid-cols-2 gap-4">
            {/* Quadrants */}
            <div className="glass-panel p-4 rounded-lg border border-[var(--color-alarm)] bg-[rgba(255,51,102,0.05)] hover:bg-[rgba(255,51,102,0.1)] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className="text-terminal text-xs text-[var(--color-alarm)]">REPLACE</span>
                <span className="text-[10px] bg-[var(--color-alarm)] text-black px-2 py-0.5 rounded">HIGH PRIORITY</span>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-[var(--text-sovereign-primary)]">3 AGENTS</p>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Handling Admin & Email</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-lg border border-[var(--color-acid)] bg-[rgba(187,255,0,0.05)] hover:bg-[rgba(187,255,0,0.1)] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className="text-terminal text-xs text-[var(--color-acid)]">PRODUCE</span>
                <span className="text-[10px] bg-[var(--color-acid)] text-black px-2 py-0.5 rounded">FOCUS HERE</span>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-[var(--text-sovereign-primary)]">YOU</p>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Strategy & Closing</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-lg border border-[var(--glass-sovereign-border)] opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-start">
                <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">DELEGATE</span>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-[var(--text-sovereign-primary)]">1 ASSISTANT</p>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Research Tasks</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-lg border border-[var(--glass-sovereign-border)] opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-start">
                <span className="text-terminal text-xs text-[var(--color-aurora-purple)]">INVEST</span>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-[var(--text-sovereign-primary)]">2 TOOLS</p>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Market Intelligence</p>
              </div>
            </div>

            {/* Axes Labels */}
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-[10px] text-[var(--text-sovereign-muted)]">FINANCIAL VALUE →</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-[var(--text-sovereign-muted)]">ENERGY COST →</div>
          </div>
        </GlassCard>

        {/* Active Agents List */}
        <GlassCard intensity="medium" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">ACTIVE AGENTS</h3>
              <p className="text-sm text-[var(--text-sovereign-muted)]">Manage your digital workforce</p>
            </div>
            <GlowButton variant="acid" size="sm" onClick={handleDeployAgent} className="h-8">
              <Plus className="h-4 w-4 mr-1" /> DEPLOY
            </GlowButton>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {(agents || []).map((agent: any) => (
              <motion.div
                key={agent.id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--glass-sovereign-border)] bg-[var(--color-void)] hover:border-[var(--color-acid)] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-black font-bold text-xs`} style={{ background: agent.status === 'Running' ? 'var(--color-acid)' : 'var(--text-sovereign-muted)' }}>
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-sovereign-primary)]">{agent.name}</p>
                    <p className="text-[10px] text-[var(--text-sovereign-muted)]">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${agent.status === 'Running'
                      ? 'bg-[rgba(187,255,0,0.15)] text-[var(--color-acid)]'
                      : 'bg-white/5 text-[var(--text-sovereign-muted)]'
                    }`}>
                    {agent.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => toggleAgentStatus(agent.id, agent.status)}
                    className="text-[var(--text-sovereign-muted)] hover:text-[var(--color-acid)] transition-colors"
                  >
                    {agent.status === "Running" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <Link href="/dashboard/settings">
                    <button className="text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)]">
                      <Settings className="h-3 w-3" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Time Assassin Detector */}
      <SpotlightCard className="p-8 border-l-4 border-l-[var(--color-alarm)]">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="animate-pulse h-2 w-2 rounded-full bg-[var(--color-alarm)]"></span>
              <span className="text-terminal text-xs text-[var(--color-alarm)]">NEW TIME ASSASSIN DETECTED</span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-sovereign-primary)] mb-2">MANUAL CALENDAR SCHEDULING</h3>
            <p className="text-[var(--text-sovereign-muted)] max-w-xl">
              You spent <span className="text-[var(--color-acid)] font-bold">4.5 hours</span> this week coordinating meetings. Deploy the "Schedule Bot" to reclaim this time immediately.
            </p>
          </div>
          <GlowButton variant="alarm" size="lg">
            DEPLOY FIX <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
        </div>
      </SpotlightCard>

    </div>
  );
}