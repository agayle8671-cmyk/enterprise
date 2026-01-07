/**
 * Agents Page - Raycast-Inspired Design
 */

import { motion } from "framer-motion";
import { Bot, Plus, Zap, CheckCircle2, Pause, Settings, TrendingUp, Clock, Activity } from "lucide-react";

export default function AgentsRaycast() {
  const agents = [
    {
      name: "Inbox Sentinel",
      description: "Processes emails, flags urgent items, drafts replies",
      status: "active",
      tasksCompleted: 47,
      timeSaved: "4.2 hrs",
      icon: Bot,
      color: "#22c55e",
    },
    {
      name: "Sales Agent",
      description: "Generates proposals, follows up with leads",
      status: "active",
      tasksCompleted: 12,
      timeSaved: "2.8 hrs",
      icon: TrendingUp,
      color: "#FF6363",
    },
    {
      name: "Research Agent",
      description: "Researches leads, enriches CRM data",
      status: "active",
      tasksCompleted: 23,
      timeSaved: "3.5 hrs",
      icon: Activity,
      color: "#8B5CF6",
    },
    {
      name: "Calendar Agent",
      description: "Schedules meetings, manages availability",
      status: "paused",
      tasksCompleted: 8,
      timeSaved: "1.2 hrs",
      icon: Clock,
      color: "#ffc940",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>
              AI Agents
            </h1>
            <p className="text-[#989898]">Deploy and manage your autonomous workforce</p>
          </div>
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Deploy New Agent
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Agents", value: "3", icon: Bot, color: "#22c55e" },
            { label: "Tasks Today", value: "90", icon: CheckCircle2, color: "#FF6363" },
            { label: "Hours Saved", value: "11.7", icon: Clock, color: "#8B5CF6" },
            { label: "Efficiency", value: "94%", icon: Zap, color: "#ffc940" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="raycast-panel p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="h-10 w-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}
                >
                  <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-sm text-[#989898] mb-1">{stat.label}</div>
              <div className="text-3xl font-bold" style={{ letterSpacing: '-0.02em' }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              className="raycast-panel p-6 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${agent.color}20` }}
                  >
                    <agent.icon className="h-7 w-7" style={{ color: agent.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
                      {agent.name}
                    </h3>
                    <p className="text-sm text-[#989898]">{agent.description}</p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/5">
                  <Settings className="h-5 w-5 text-[#989898]" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-[#989898] mb-1">Tasks Completed</div>
                  <div className="text-xl font-bold">{agent.tasksCompleted}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-[#989898] mb-1">Time Saved</div>
                  <div className="text-xl font-bold">{agent.timeSaved}</div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {agent.status === "active" ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                      </span>
                      <span className="text-xs font-medium text-[#22c55e]">Active</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3 text-[#989898]" />
                      <span className="text-xs font-medium text-[#989898]">Paused</span>
                    </>
                  )}
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    agent.status === "active"
                      ? "bg-white/5 border border-white/10 hover:bg-white/10"
                      : "bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white"
                  }`}
                >
                  {agent.status === "active" ? "Pause" : "Resume"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deploy New Agent CTA */}
        <div className="raycast-panel p-8 bg-gradient-to-r from-[#FF6363]/5 to-[#8B5CF6]/5 border-[#FF6363]/20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#FF6363]/30">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>
              Need a custom agent?
            </h3>
            <p className="text-[#989898] mb-6">
              Tell us what tasks you want to automate and we'll build a specialized agent for you
            </p>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white font-medium shadow-lg hover:shadow-xl transition-all">
              Request Custom Agent
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
