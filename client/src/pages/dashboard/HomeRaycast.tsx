/**
 * Dashboard Home - Raycast-Inspired Command Center
 * 
 * Clean, focused interface with:
 * - Live typewriter status updates
 * - Command-style quick actions
 * - Minimalist stat cards
 * - Smooth animations
 */

import { motion } from "framer-motion";
import { 
  Zap, 
  Bot, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Command,
  Search,
  Plus,
  Activity,
  CheckCircle2,
  AlertCircle,
  Timer,
  Sparkles,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { TypewriterHero } from "@/components/dashboard/TypewriterHero";
import { Link } from "wouter";

export default function HomeRaycast() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>
              Welcome back
            </h1>
            <p className="text-[#989898]">Here's what's happening with your automation</p>
          </div>
          
          {/* Search Bar - Raycast Style */}
          <div className="w-full lg:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#989898]" />
              <input
                type="text"
                placeholder="Search commands..."
                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-colors placeholder:text-[#989898]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded">⌘</kbd>
                <kbd className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded">K</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Live Typewriter Hero */}
        <TypewriterHero
          phrases={[
            "Processing 47 emails automatically",
            "Researching 12 new leads",
            "Generated 3 proposals this morning",
            "Saved you 4.5 hours today",
            "Scheduled 8 follow-up meetings",
          ]}
          label="Live System"
          statValue="23.5hrs"
          statLabel="saved this week"
          showLiveIndicator={true}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              label: "Hours Saved", 
              value: "23.5", 
              change: "+12%", 
              icon: Clock, 
              color: "#22c55e",
              trend: "up" 
            },
            { 
              label: "Tasks Automated", 
              value: "156", 
              change: "+28", 
              icon: Bot, 
              color: "#FF6363",
              trend: "up" 
            },
            { 
              label: "ROI This Month", 
              value: "340%", 
              change: "+45%", 
              icon: TrendingUp, 
              color: "#8B5CF6",
              trend: "up" 
            },
            { 
              label: "Active Agents", 
              value: "12", 
              change: "2 new", 
              icon: Zap, 
              color: "#ffc940",
              trend: "neutral" 
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="raycast-panel p-5 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="h-10 w-10 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `${stat.color}20`,
                  }}
                >
                  <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <div className="text-right">
                  <div 
                    className="text-xs font-medium flex items-center gap-1"
                    style={{ color: stat.trend === 'up' ? '#22c55e' : '#989898' }}
                  >
                    {stat.trend === 'up' && '↗'}
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#989898] mb-1">{stat.label}</div>
              <div className="text-3xl font-bold" style={{ letterSpacing: '-0.02em' }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Recent Activity - 2 columns */}
          <div className="lg:col-span-2">
            <div className="raycast-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
                  Recent Activity
                </h2>
                <button className="text-sm text-[#989898] hover:text-[#EDEDED] transition-colors flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { 
                    task: "Processed 47 emails and flagged 3 urgent items", 
                    agent: "Inbox Sentinel", 
                    time: "2 minutes ago",
                    status: "completed",
                    icon: CheckCircle2,
                    color: "#22c55e",
                  },
                  { 
                    task: "Generated proposal for Acme Corp ($45K project)", 
                    agent: "Sales Agent", 
                    time: "12 minutes ago",
                    status: "completed",
                    icon: CheckCircle2,
                    color: "#22c55e",
                  },
                  { 
                    task: "Researched 8 leads and added to CRM", 
                    agent: "Research Agent", 
                    time: "34 minutes ago",
                    status: "completed",
                    icon: CheckCircle2,
                    color: "#22c55e",
                  },
                  { 
                    task: "Following up with 5 prospects", 
                    agent: "Closer Agent", 
                    time: "1 hour ago",
                    status: "in_progress",
                    icon: Activity,
                    color: "#FF6363",
                  },
                  { 
                    task: "Scheduled 3 client meetings for next week", 
                    agent: "Calendar Agent", 
                    time: "2 hours ago",
                    status: "completed",
                    icon: CheckCircle2,
                    color: "#22c55e",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1">{item.task}</div>
                      <div className="flex items-center gap-2 text-xs text-[#989898]">
                        <span>{item.agent}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#989898] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="raycast-panel p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Quick Actions
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Deploy New Agent", icon: Plus, shortcut: "⌘N" },
                  { label: "Run Time Audit", icon: Timer, shortcut: "⌘T" },
                  { label: "View Analytics", icon: Activity, shortcut: "⌘A" },
                  { label: "Agent Settings", icon: Bot, shortcut: "⌘S" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF6363]/50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="h-4 w-4 text-[#989898] group-hover:text-[#FF6363] transition-colors" />
                      <span className="text-sm">{action.label}</span>
                    </div>
                    <kbd className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-[#989898]">
                      {action.shortcut}
                    </kbd>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance This Week */}
            <div className="raycast-panel p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                This Week's Impact
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#989898]">Time Saved</span>
                    <span className="text-sm font-medium">23.5 / 40 hrs</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#22c55e] to-[#10b981] rounded-full"
                      style={{ width: '59%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#989898]">Automation Rate</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] rounded-full"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#989898]">Agent Efficiency</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ffc940] to-[#ff9f40] rounded-full"
                      style={{ width: '94%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#22c55e] to-[#10b981] bg-clip-text text-transparent mb-1">
                    $3,450
                  </div>
                  <div className="text-xs text-[#989898]">Value created this week</div>
                </div>
              </div>
            </div>

            {/* Upgrade Prompt */}
            <div className="raycast-panel p-6 bg-gradient-to-br from-[#FF6363]/10 to-[#8B5CF6]/10 border-[#FF6363]/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Unlock More Agents</h3>
                  <p className="text-sm text-[#989898]">
                    Get unlimited agents and advanced analytics
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="raycast-panel p-8 bg-gradient-to-r from-[#FF6363]/5 to-[#8B5CF6]/5 border-[#FF6363]/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
                Want to automate even more?
              </h3>
              <p className="text-[#989898]">
                Schedule a strategy call to identify your biggest time drains
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Watch Tutorial
              </button>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                Book Strategy Call
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
