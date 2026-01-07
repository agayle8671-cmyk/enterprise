/**
 * Agents Page - Bloomberg-Style Data Dense
 * Comprehensive agent monitoring with detailed metrics
 */

import { motion } from "framer-motion";
import { 
  Bot, Activity, TrendingUp, TrendingDown, AlertCircle, 
  CheckCircle2, Clock, Zap, Settings, PlayCircle, PauseCircle,
  ArrowUpRight, ArrowDownRight, Target, DollarSign, Users
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { generateAgentActivities, formatTimeAgo } from "@/lib/mockData";
import { useState } from "react";

export default function AgentsBloomberg() {
  const activities = generateAgentActivities(200);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    {
      id: 'inbox-sentinel',
      name: 'Inbox Sentinel',
      status: 'active',
      tasksToday: 47,
      tasksWeek: 312,
      tasksMonth: 1247,
      efficiency: 96.3,
      timeSavedToday: 4.2,
      timeSavedWeek: 28.5,
      timeSavedMonth: 118.3,
      errorRate: 0.8,
      uptime: 99.9,
      avgResponseTime: 2.3,
      lastActive: new Date(Date.now() - 2 * 60 * 1000),
      category: 'Email',
      costSavings: 8450,
      tasksInQueue: 12,
      peakHours: '9AM-11AM',
      successRate: 98.2,
    },
    {
      id: 'sales-agent',
      name: 'Sales Agent',
      status: 'active',
      tasksToday: 12,
      tasksWeek: 89,
      tasksMonth: 367,
      efficiency: 94.1,
      timeSavedToday: 2.8,
      timeSavedWeek: 19.2,
      timeSavedMonth: 79.8,
      errorRate: 1.2,
      uptime: 99.7,
      avgResponseTime: 4.7,
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
      category: 'Sales',
      costSavings: 12350,
      tasksInQueue: 8,
      peakHours: '2PM-5PM',
      successRate: 92.8,
    },
    {
      id: 'research-agent',
      name: 'Research Agent',
      status: 'active',
      tasksToday: 23,
      tasksWeek: 167,
      tasksMonth: 689,
      efficiency: 92.5,
      timeSavedToday: 3.5,
      timeSavedWeek: 24.1,
      timeSavedMonth: 99.7,
      errorRate: 2.1,
      uptime: 99.5,
      avgResponseTime: 8.2,
      lastActive: new Date(Date.now() - 1 * 60 * 1000),
      category: 'Research',
      costSavings: 6890,
      tasksInQueue: 15,
      peakHours: '10AM-12PM',
      successRate: 95.4,
    },
    {
      id: 'content-alchemist',
      name: 'Content Alchemist',
      status: 'active',
      tasksToday: 8,
      tasksWeek: 54,
      tasksMonth: 223,
      efficiency: 91.2,
      timeSavedToday: 1.9,
      timeSavedWeek: 13.4,
      timeSavedMonth: 55.2,
      errorRate: 1.8,
      uptime: 99.8,
      avgResponseTime: 12.5,
      lastActive: new Date(Date.now() - 8 * 60 * 1000),
      category: 'Content',
      costSavings: 9230,
      tasksInQueue: 5,
      peakHours: '1PM-3PM',
      successRate: 93.7,
    },
    {
      id: 'closer-agent',
      name: 'Closer Agent',
      status: 'active',
      tasksToday: 15,
      tasksWeek: 98,
      tasksMonth: 412,
      efficiency: 93.8,
      timeSavedToday: 2.3,
      timeSavedWeek: 16.7,
      timeSavedMonth: 69.1,
      errorRate: 1.5,
      uptime: 99.6,
      avgResponseTime: 5.8,
      lastActive: new Date(Date.now() - 3 * 60 * 1000),
      category: 'Sales',
      costSavings: 15670,
      tasksInQueue: 11,
      peakHours: '3PM-6PM',
      successRate: 91.2,
    },
    {
      id: 'calendar-agent',
      name: 'Calendar Agent',
      status: 'active',
      tasksToday: 19,
      tasksWeek: 134,
      tasksMonth: 556,
      efficiency: 97.1,
      timeSavedToday: 3.1,
      timeSavedWeek: 21.8,
      timeSavedMonth: 90.3,
      errorRate: 0.5,
      uptime: 100,
      avgResponseTime: 1.8,
      lastActive: new Date(Date.now() - 30 * 1000),
      category: 'Calendar',
      costSavings: 7120,
      tasksInQueue: 6,
      peakHours: '8AM-10AM',
      successRate: 99.1,
    },
  ];

  const agentActivities = selectedAgent 
    ? activities.filter(a => a.agentName === agents.find(ag => ag.id === selectedAgent)?.name)
    : activities;

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED]">
      
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-[#FF6363]/20">
        <div className="px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#FF6363]" />
              <span className="font-semibold">AGENT MONITORING SYSTEM</span>
            </div>
            <div className="flex-1 max-w-3xl">
              <TypewriterText 
                phrases={[
                  "All agents operational - 6/6 active",
                  "Processing 124 tasks in parallel",
                  "Average efficiency: 94.2%",
                  "Total time saved today: 17.8 hours",
                  "Zero critical errors in last 24h",
                ]}
                typingSpeed={50}
                deletingSpeed={30}
                pauseTime={3000}
                className="text-[#989898]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#22c55e]">6 Active</span>
            <span className="text-[#989898]">0 Paused</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* SUMMARY METRICS */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'Total Tasks Today', value: '124', change: +15, icon: Activity },
            { label: 'Time Saved Today', value: '17.8h', change: +22, icon: Clock },
            { label: 'Avg Efficiency', value: '94.2%', change: +3, icon: Target },
            { label: 'Total Cost Savings', value: '$59.7K', change: +18, icon: DollarSign },
            { label: 'Tasks In Queue', value: '57', change: -8, icon: Zap },
            { label: 'Avg Response Time', value: '5.9s', change: -12, icon: TrendingDown },
          ].map((metric, i) => (
            <motion.div
              key={i}
              className="bg-[#0d0d0d] border border-white/10 p-3 hover:border-[#FF6363]/30 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className="h-3 w-3 text-[#989898]" />
                <div className="text-[10px] text-[#989898] uppercase tracking-wider">{metric.label}</div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold tracking-tight">{metric.value}</div>
                <div className={`flex items-center gap-1 text-xs ${metric.change >= 0 ? 'text-[#22c55e]' : 'text-[#FF6363]'}`}>
                  {metric.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AGENTS DETAILED TABLE */}
        <div className="bg-[#0d0d0d] border border-white/10">
          <div className="px-4 py-2 border-b border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Agent Performance Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#0a0a0a] text-[#989898]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Agent</th>
                  <th className="text-center px-4 py-2 font-medium">Status</th>
                  <th className="text-right px-4 py-2 font-medium">Today</th>
                  <th className="text-right px-4 py-2 font-medium">Week</th>
                  <th className="text-right px-4 py-2 font-medium">Month</th>
                  <th className="text-right px-4 py-2 font-medium">Efficiency</th>
                  <th className="text-right px-4 py-2 font-medium">Time Saved (Day)</th>
                  <th className="text-right px-4 py-2 font-medium">Time Saved (Month)</th>
                  <th className="text-right px-4 py-2 font-medium">Error Rate</th>
                  <th className="text-right px-4 py-2 font-medium">Uptime</th>
                  <th className="text-right px-4 py-2 font-medium">Avg Response</th>
                  <th className="text-right px-4 py-2 font-medium">Queue</th>
                  <th className="text-right px-4 py-2 font-medium">Cost Savings</th>
                  <th className="text-center px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, i) => (
                  <tr 
                    key={i} 
                    className={`border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${selectedAgent === agent.id ? 'bg-[#FF6363]/10' : ''}`}
                    onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-[#8B5CF6]" />
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-[9px] text-[#989898]">{agent.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#22c55e]/20 text-[#22c55e]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                        </span>
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{agent.tasksToday}</td>
                    <td className="px-4 py-3 text-right text-[#989898]">{agent.tasksWeek}</td>
                    <td className="px-4 py-3 text-right text-[#989898]">{agent.tasksMonth}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={agent.efficiency >= 95 ? 'text-[#22c55e]' : agent.efficiency >= 90 ? 'text-[#ffc940]' : 'text-[#FF6363]'}>
                        {agent.efficiency}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#8B5CF6] font-medium">{agent.timeSavedToday}h</td>
                    <td className="px-4 py-3 text-right text-[#8B5CF6]">{agent.timeSavedMonth}h</td>
                    <td className="px-4 py-3 text-right">
                      <span className={agent.errorRate <= 1 ? 'text-[#22c55e]' : agent.errorRate <= 2 ? 'text-[#ffc940]' : 'text-[#FF6363]'}>
                        {agent.errorRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#22c55e]">{agent.uptime}%</td>
                    <td className="px-4 py-3 text-right">{agent.avgResponseTime}s</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-1 rounded bg-[#ffc940]/20 text-[#ffc940]">
                        {agent.tasksInQueue}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#22c55e] font-medium">
                      ${agent.costSavings.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <PauseCircle className="h-4 w-4 text-[#989898]" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <Settings className="h-4 w-4 text-[#989898]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT - DETAILS */}
        <div className="grid grid-cols-3 gap-4">
          
          {/* AGENT DETAILS - 2/3 */}
          <div className="col-span-2 space-y-4">
            
            {/* HOURLY PERFORMANCE */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10">
                <h2 className="text-sm font-semibold uppercase tracking-wide">Hourly Task Distribution - Last 24 Hours</h2>
              </div>
              <div className="p-4">
                <div className="flex items-end gap-1 h-40">
                  {Array.from({ length: 24 }, (_, i) => {
                    const tasks = Math.floor(Math.random() * 30) + 5;
                    return (
                      <div key={i} className="flex-1 flex flex-col justify-end relative group">
                        <div 
                          className="w-full bg-gradient-to-t from-[#FF6363] to-[#8B5CF6] hover:opacity-80 transition-all cursor-pointer"
                          style={{ height: `${(tasks / 35) * 100}%` }}
                        />
                        <div className="text-[8px] text-center text-[#989898] mt-1">
                          {i % 3 === 0 ? `${i.toString().padStart(2, '0')}:00` : ''}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/20 px-2 py-1 rounded text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <div>{i.toString().padStart(2, '0')}:00 - {tasks} tasks</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TASK BREAKDOWN BY CATEGORY */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10">
                <h2 className="text-sm font-semibold uppercase tracking-wide">Task Distribution by Category</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { category: 'Email', count: 312, percent: 35, color: '#FF6363' },
                    { category: 'Sales', count: 187, percent: 21, color: '#8B5CF6' },
                    { category: 'Research', count: 167, percent: 19, color: '#22c55e' },
                    { category: 'Content', count: 134, percent: 15, color: '#ffc940' },
                    { category: 'Calendar', count: 134, percent: 15, color: '#3b82f6' },
                    { category: 'CRM', count: 89, percent: 10, color: '#ec4899' },
                    { category: 'Analytics', count: 67, percent: 8, color: '#10b981' },
                    { category: 'Social', count: 45, percent: 5, color: '#f59e0b' },
                  ].map((cat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/10 p-3 hover:border-[#FF6363]/30 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-3 w-3 rounded" style={{ background: cat.color }} />
                        <div className="text-[10px] text-[#989898] uppercase">{cat.category}</div>
                      </div>
                      <div className="text-2xl font-bold mb-1">{cat.count}</div>
                      <div className="text-[9px] text-[#989898]">{cat.percent}% of total</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ACTIVITY FEED - 1/3 */}
          <div className="space-y-4">
            
            {/* RECENT ACTIVITY */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10">
                <h2 className="text-sm font-semibold uppercase tracking-wide">
                  {selectedAgent ? `${agents.find(a => a.id === selectedAgent)?.name} Activity` : 'All Activity'}
                </h2>
                {selectedAgent && (
                  <button 
                    onClick={() => setSelectedAgent(null)}
                    className="text-[9px] text-[#FF6363] hover:underline mt-1"
                  >
                    Clear filter
                  </button>
                )}
              </div>
              <div className="h-[800px] overflow-y-auto">
                <div className="divide-y divide-white/5">
                  {agentActivities.slice(0, 100).map((activity, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-white/5 transition-colors text-xs">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium text-[10px] text-[#989898]">{activity.agentName}</span>
                        <span className="text-[9px] text-[#989898] whitespace-nowrap">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                      <div className="mb-1 text-[11px]">{activity.task}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {activity.status === 'completed' && (
                          <span className="flex items-center gap-1 text-[9px] text-[#22c55e]">
                            <CheckCircle2 className="h-3 w-3" />
                            Completed
                          </span>
                        )}
                        {activity.status === 'in_progress' && (
                          <span className="flex items-center gap-1 text-[9px] text-[#ffc940]">
                            <Clock className="h-3 w-3" />
                            In Progress
                          </span>
                        )}
                        {activity.status === 'failed' && (
                          <span className="flex items-center gap-1 text-[9px] text-[#FF6363]">
                            <AlertCircle className="h-3 w-3" />
                            Failed
                          </span>
                        )}
                        <span className="text-[9px] text-[#989898]">{activity.duration}s</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                          activity.impact === 'High' ? 'bg-[#FF6363]/20 text-[#FF6363]' :
                          activity.impact === 'Medium' ? 'bg-[#ffc940]/20 text-[#ffc940]' :
                          'bg-[#989898]/20 text-[#989898]'
                        }`}>
                          {activity.impact}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#989898]">
                          {activity.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
