/**
 * Home Dashboard - ALTOS Design
 * 
 * Main dashboard with Cognitive Luxury aesthetic
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  TactileButton,
  AgentThought,
  AgentThoughtStream,
  type AgentStage,
} from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import {
  Bot,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Activity,
  DollarSign,
} from "lucide-react";

export default function HomeSOS() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [agentActive, setAgentActive] = useState(false);
  const [thoughts, setThoughts] = useState<Array<{
    id: string;
    thought: string;
    stage: AgentStage;
    timestamp: number;
  }>>([]);

  const stats = [
    {
      label: "active agents",
      value: "12",
      change: "+3 this week",
      icon: Bot,
      color: 'var(--color-sos-soul)'
    },
    {
      label: "revenue this month",
      value: "$47,234",
      change: "+12.5% vs last month",
      icon: DollarSign,
      color: 'var(--color-sos-green)'
    },
    {
      label: "time saved",
      value: "156h",
      change: "across all projects",
      icon: Clock,
      color: 'var(--color-sos-blue)'
    },
    {
      label: "tasks completed",
      value: "2,847",
      change: "94% automation rate",
      icon: CheckCircle,
      color: 'var(--color-sos-green)'
    },
  ];

  const recentActivity = [
    {
      type: "agent",
      title: "content alchemist generated 5 blog posts",
      time: "2 minutes ago",
      status: "completed"
    },
    {
      type: "proposal",
      title: "new proposal sent to acme corp",
      time: "1 hour ago",
      status: "pending"
    },
    {
      type: "agent",
      title: "inbox sentinel processed 47 emails",
      time: "3 hours ago",
      status: "completed"
    },
    {
      type: "system",
      title: "time audit analysis complete",
      time: "5 hours ago",
      status: "completed"
    },
  ];

  const simulateAgentTask = () => {
    setAgentActive(true);
    const taskThoughts = [
      { stage: 'perception' as AgentStage, thought: 'Analyzing incoming client request...' },
      { stage: 'reasoning' as AgentStage, thought: 'Checking availability and resource allocation' },
      { stage: 'action' as AgentStage, thought: 'Drafting proposal and scheduling follow-up' },
      { stage: 'observation' as AgentStage, thought: 'Proposal sent, meeting scheduled for tomorrow' },
    ];

    taskThoughts.forEach((t, index) => {
      setTimeout(() => {
        setThoughts(prev => [...prev, {
          id: `thought-${Date.now()}-${index}`,
          ...t,
          timestamp: Date.now()
        }]);

        if (index === taskThoughts.length - 1) {
          setTimeout(() => setAgentActive(false), 1000);
        }
      }, index * 2000);
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header with Live Typewriter Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-end justify-between">
          <div>
            <h1
              className="text-5xl font-bold lowercase"
              style={{ color: 'var(--color-sos-text)' }}
            >
              welcome back
            </h1>
            <p
              className="text-lg lowercase mt-2"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).toLowerCase()}
            </p>
          </div>

          {/* Live System Status with Typewriter */}
          <div className="p-4 rounded-xl border border-white/40 min-w-[320px]"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-sm)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: 'var(--color-sos-green)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: 'var(--color-sos-green)' }} />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-sos-green)' }}>
                System Active
              </span>
            </div>
            <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
              <TypewriterText
                phrases={[
                  "processing inbox: 12 new messages analyzed",
                  "content alchemist drafting blog post #3",
                  "monitoring 5 active proposals for responses",
                  "time audit: you've saved 8.5 hours today",
                  "all agents operating at peak efficiency"
                ]}
                typingSpeed={40}
                deletingSpeed={20}
                pauseTime={3000}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--color-sos-base)',
                    color: stat.color,
                    boxShadow: 'var(--shadow-tactile-sm)'
                  }}
                >
                  <Icon size={24} />
                </div>
              </div>
              <p
                className="text-xs uppercase tracking-wider font-mono mb-2"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                {stat.label}
              </p>
              <p
                className="text-3xl font-bold font-mono mb-1"
                style={{ color: 'var(--color-sos-text)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs lowercase"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-6 rounded-2xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-md)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-2xl font-semibold lowercase mb-1"
                style={{ color: 'var(--color-sos-text)' }}
              >
                agent workspace
              </h2>
              <p
                className="text-sm lowercase"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                watch your agents think and act
              </p>
            </div>
            <TactileButton
              variant="primary"
              onClick={simulateAgentTask}
              disabled={agentActive}
            >
              <Bot size={18} className="mr-2" />
              simulate task
            </TactileButton>
          </div>

          {/* Agent Thoughts */}
          <div className="min-h-[300px]">
            {thoughts.length === 0 ? (
              <div
                className="h-[300px] flex items-center justify-center rounded-xl border-2 border-dashed"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <div className="text-center">
                  <Bot size={48} style={{ color: 'var(--color-sos-muted)', margin: '0 auto 16px' }} />
                  <p className="lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                    no active agent tasks
                  </p>
                  <p className="text-sm lowercase mt-2" style={{ color: 'var(--color-sos-muted)' }}>
                    click "simulate task" to see agents in action
                  </p>
                </div>
              </div>
            ) : (
              <AgentThoughtStream thoughts={thoughts} />
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-md)'
          }}
        >
          <h2
            className="text-2xl font-semibold lowercase mb-6"
            style={{ color: 'var(--color-sos-text)' }}
          >
            recent activity
          </h2>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border"
                style={{
                  background: 'var(--color-sos-base)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: activity.status === 'completed'
                        ? 'var(--color-sos-green)'
                        : 'var(--color-sos-soul)'
                    }}
                  >
                    {activity.status === 'completed' ? (
                      <CheckCircle size={16} color="white" />
                    ) : (
                      <AlertCircle size={16} color="white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm lowercase font-medium mb-1"
                      style={{ color: 'var(--color-sos-text)' }}
                    >
                      {activity.title}
                    </p>
                    <p
                      className="text-xs lowercase"
                      style={{ color: 'var(--color-sos-muted)' }}
                    >
                      {activity.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
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
          className="text-2xl font-semibold lowercase mb-6"
          style={{ color: 'var(--color-sos-text)' }}
        >
          quick actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TactileButton variant="secondary" className="justify-start" onClick={() => {
            toast({ title: "LAUNCHING AGENT", description: "Opening agent deployment..." });
            setLocation('/dashboard/agents');
          }}>
            <Bot size={18} className="mr-2" />
            launch agent
          </TactileButton>
          <TactileButton variant="secondary" className="justify-start" onClick={() => {
            toast({ title: "TIME AUDIT", description: "Opening time analysis..." });
            setLocation('/dashboard/time-audit');
          }}>
            <Activity size={18} className="mr-2" />
            time audit
          </TactileButton>
          <TactileButton variant="secondary" className="justify-start" onClick={() => {
            toast({ title: "NEW PROPOSAL", description: "Opening proposal builder..." });
            setLocation('/dashboard/proposals');
          }}>
            <TrendingUp size={18} className="mr-2" />
            new proposal
          </TactileButton>
          <TactileButton variant="secondary" className="justify-start" onClick={() => {
            toast({ title: "BUILD TOOL", description: "Opening tool builder..." });
            setLocation('/dashboard/tool-builder');
          }}>
            <Zap size={18} className="mr-2" />
            build tool
          </TactileButton>
        </div>
      </motion.div>
    </div>
  );
}
