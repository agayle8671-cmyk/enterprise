/**
 * Agents Page - Sovereign OS (S.O.S.) Design
 * 
 * Manage and deploy AI agents with Cognitive Luxury aesthetic
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { TactileButton, AgentThought, type AgentStage } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { Bot, Play, Pause, Settings, TrendingUp, Activity, Zap, Plus } from "lucide-react";

export default function AgentsSOS() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    {
      id: "content-alchemist",
      name: "content alchemist",
      description: "transforms ideas into polished blog posts, articles, and social media content",
      status: "active",
      tasksCompleted: 1247,
      efficiency: 98,
      icon: Zap,
      color: 'var(--color-sos-soul)'
    },
    {
      id: "inbox-sentinel",
      name: "inbox sentinel",
      description: "filters, prioritizes, and responds to emails automatically",
      status: "active",
      tasksCompleted: 3892,
      efficiency: 94,
      icon: Activity,
      color: 'var(--color-sos-blue)'
    },
    {
      id: "dossier",
      name: "dossier",
      description: "researches prospects and compiles comprehensive intelligence reports",
      status: "idle",
      tasksCompleted: 567,
      efficiency: 96,
      icon: TrendingUp,
      color: 'var(--color-sos-green)'
    },
    {
      id: "closer",
      name: "closer",
      description: "handles objections, negotiates terms, and closes deals autonomously",
      status: "active",
      tasksCompleted: 234,
      efficiency: 99,
      icon: Bot,
      color: 'var(--color-sos-soul)'
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header with Typewriter Insight */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 
              className="text-5xl font-bold lowercase mb-2"
              style={{ color: 'var(--color-sos-text)' }}
            >
              agents
            </h1>
            <p 
              className="text-lg lowercase"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              autonomous ai working on your behalf
            </p>
          </div>
          <TactileButton variant="primary">
            <Plus size={18} className="mr-2" />
            deploy new agent
          </TactileButton>
        </div>
        
        {/* Live Agent Activity Feed */}
        <div className="p-4 rounded-xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-sm)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Bot size={16} style={{ color: 'var(--color-sos-soul)' }} />
            <span className="text-xs font-mono uppercase tracking-wider" 
              style={{ color: 'var(--color-sos-soul)' }}>
              Live Agent Feed
            </span>
          </div>
          <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
            <TypewriterText
              phrases={[
                "content alchemist: generating social media campaign...",
                "inbox sentinel: triaged 23 emails, flagged 3 urgent",
                "dossier: researching competitor analysis for acme corp",
                "closer: negotiating terms with 2 high-value prospects",
                "all agents coordinating seamlessly across your workflow"
              ]}
              typingSpeed={45}
              deletingSpeed={22}
              pauseTime={2800}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "active agents", value: "3", color: 'var(--color-sos-soul)' },
          { label: "tasks today", value: "127", color: 'var(--color-sos-blue)' },
          { label: "avg efficiency", value: "96.8%", color: 'var(--color-sos-green)' },
          { label: "time saved", value: "24h", color: 'var(--color-sos-soul)' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl border border-white/40"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-sm)'
            }}
          >
            <p 
              className="text-xs uppercase tracking-wider font-mono mb-2"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              {stat.label}
            </p>
            <p 
              className="text-3xl font-bold font-mono"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/40 cursor-pointer"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: selectedAgent === agent.id 
                  ? 'var(--shadow-tactile-lg)' 
                  : 'var(--shadow-tactile-md)'
              }}
              onClick={() => setSelectedAgent(agent.id)}
              data-magnetic="true"
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: agent.color,
                      boxShadow: agent.status === 'active' ? 'var(--shadow-agent-glow)' : 'none'
                    }}
                  >
                    <Icon size={24} color="white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold lowercase"
                      style={{ color: 'var(--color-sos-text)' }}
                    >
                      {agent.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: agent.status === 'active' 
                            ? 'var(--color-sos-green)' 
                            : 'var(--color-sos-muted)'
                        }}
                      />
                      <span 
                        className="text-xs lowercase font-mono"
                        style={{ color: 'var(--color-sos-muted)' }}
                      >
                        {agent.status}
                      </span>
                    </div>
                  </div>
                </div>
                <TactileButton 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Settings size={16} />
                </TactileButton>
              </div>

              {/* Description */}
              <p 
                className="text-sm lowercase mb-4 leading-relaxed"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                {agent.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: 'var(--color-sos-base)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <p 
                    className="text-xs uppercase tracking-wider font-mono mb-1"
                    style={{ color: 'var(--color-sos-muted)' }}
                  >
                    completed
                  </p>
                  <p 
                    className="text-xl font-bold font-mono"
                    style={{ color: 'var(--color-sos-text)' }}
                  >
                    {agent.tasksCompleted.toLocaleString()}
                  </p>
                </div>
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: 'var(--color-sos-base)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <p 
                    className="text-xs uppercase tracking-wider font-mono mb-1"
                    style={{ color: 'var(--color-sos-muted)' }}
                  >
                    efficiency
                  </p>
                  <p 
                    className="text-xl font-bold font-mono"
                    style={{ color: 'var(--color-sos-green)' }}
                  >
                    {agent.efficiency}%
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <TactileButton 
                  variant={agent.status === 'active' ? 'secondary' : 'primary'}
                  className="flex-1"
                  size="sm"
                >
                  {agent.status === 'active' ? (
                    <>
                      <Pause size={16} className="mr-2" />
                      pause
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-2" />
                      activate
                    </>
                  )}
                </TactileButton>
                <TactileButton variant="ghost" size="sm">
                  view logs
                </TactileButton>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Agent Activity */}
      {selectedAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-md)'
          }}
        >
          <h2 
            className="text-2xl font-semibold lowercase mb-4"
            style={{ color: 'var(--color-sos-text)' }}
          >
            recent activity • {agents.find(a => a.id === selectedAgent)?.name}
          </h2>
          <AgentThought
            thought="analyzing client communications for sentiment and priority scoring..."
            stage="reasoning"
          />
        </motion.div>
      )}
    </div>
  );
}
