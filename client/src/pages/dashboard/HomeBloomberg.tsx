/**
 * Bloomberg-Style Data-Dense Dashboard
 * Information-rich with minimal whitespace, packed with real-time data
 */

import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Activity, Clock, DollarSign, 
  Mail, Users, Target, Zap, AlertCircle, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Minus
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { 
  generateRealtimeMetrics, 
  generateAgentActivities, 
  generateEmailMetrics,
  generateWeeklyPerformance,
  generateAgentMetrics,
  formatTimeAgo,
  formatCurrency
} from "@/lib/mockData";
import { useState, useEffect } from "react";

export default function HomeBloomberg() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const metrics = generateRealtimeMetrics();
  const activities = generateAgentActivities(100);
  const emailMetrics = generateEmailMetrics();
  const weeklyPerf = generateWeeklyPerformance();
  const agentMetrics = generateAgentMetrics();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveUpdates = [
    "Processing 23 emails in real-time",
    "Inbox Sentinel flagged 3 urgent items",
    "Sales Agent drafted proposal for $45K project",
    "Research Agent enriched 12 CRM records",
    "Calendar Agent scheduled 4 meetings",
    "Content Alchemist generated 2 blog posts",
    "Closer Agent following up with 8 prospects",
    "Analytics Agent compiled weekly report",
    "Saved 4.5 hours of work today",
    "Pipeline value increased to $2.4M",
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED]">
      
      {/* TOP BAR - Bloomberg style ticker */}
      <div className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-[#FF6363]/20">
        <div className="px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
              </span>
              <span className="text-[#22c55e] font-medium">LIVE</span>
            </div>
            <div className="text-[#989898]">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="flex-1 max-w-3xl">
              <TypewriterText 
                phrases={liveUpdates}
                typingSpeed={50}
                deletingSpeed={30}
                pauseTime={3000}
                className="text-[#EDEDED]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#989898]">
            <span>System Status: <span className="text-[#22c55e]">Operational</span></span>
            <span>Agents: <span className="text-[#EDEDED]">6/6</span></span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* MAIN METRICS GRID - 4 columns, very compact */}
        <div className="grid grid-cols-4 gap-3">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="bg-[#0d0d0d] border border-white/10 p-3 hover:border-[#FF6363]/30 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <div className="text-[10px] text-[#989898] uppercase tracking-wider mb-1">{metric.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
                <div className={`flex items-center gap-1 text-xs ${metric.change >= 0 ? 'text-[#22c55e]' : 'text-[#FF6363]'}`}>
                  {metric.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="text-[9px] text-[#989898] mt-1">{metric.changeLabel}</div>
            </motion.div>
          ))}
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-3 gap-4">
          
          {/* LEFT COLUMN - 2/3 width */}
          <div className="col-span-2 space-y-4">
            
            {/* AGENT PERFORMANCE TABLE */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide">Agent Performance - Real-Time</h2>
                <div className="text-xs text-[#989898]">Updated {currentTime.toLocaleTimeString()}</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#0a0a0a] text-[#989898]">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium">Agent</th>
                      <th className="text-right px-4 py-2 font-medium">Today</th>
                      <th className="text-right px-4 py-2 font-medium">Week</th>
                      <th className="text-right px-4 py-2 font-medium">Efficiency</th>
                      <th className="text-right px-4 py-2 font-medium">Time Saved</th>
                      <th className="text-right px-4 py-2 font-medium">Error Rate</th>
                      <th className="text-right px-4 py-2 font-medium">Uptime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentMetrics.map((agent, i) => (
                      <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-medium">{agent.name}</td>
                        <td className="px-4 py-3 text-right">{agent.tasksToday}</td>
                        <td className="px-4 py-3 text-right text-[#989898]">{agent.tasksWeek}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={agent.efficiency >= 95 ? 'text-[#22c55e]' : agent.efficiency >= 90 ? 'text-[#ffc940]' : 'text-[#FF6363]'}>
                            {agent.efficiency}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-[#8B5CF6]">{agent.timeSaved}h</td>
                        <td className="px-4 py-3 text-right">
                          <span className={agent.errorRate <= 1 ? 'text-[#22c55e]' : 'text-[#ffc940]'}>
                            {agent.errorRate}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-[#22c55e]">{agent.uptime}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* WEEKLY PERFORMANCE CHART */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10">
                <h2 className="text-sm font-semibold uppercase tracking-wide">Weekly Performance Overview</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {weeklyPerf.map((day, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[10px] text-[#989898] mb-2">{day.day}</div>
                      <div className="space-y-2">
                        <div>
                          <div 
                            className="w-full bg-[#FF6363]/20 rounded"
                            style={{ height: `${(day.timeSaved / 10) * 60}px` }}
                          >
                            <div 
                              className="w-full bg-[#FF6363] rounded transition-all"
                              style={{ height: '100%' }}
                            />
                          </div>
                          <div className="text-[9px] mt-1 font-medium">{day.timeSaved}h</div>
                        </div>
                        <div className="text-[9px] text-[#989898]">{day.tasksCompleted} tasks</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EMAIL ACTIVITY CHART */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10">
                <h2 className="text-sm font-semibold uppercase tracking-wide">Email Processing - Last 24 Hours</h2>
              </div>
              <div className="p-4">
                <div className="flex items-end gap-1 h-32">
                  {emailMetrics.slice(0, 24).map((metric, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 relative group">
                      <div 
                        className="w-full bg-[#8B5CF6]/30 hover:bg-[#8B5CF6]/50 transition-all cursor-pointer"
                        style={{ height: `${(metric.processed / 30) * 100}%` }}
                      />
                      <div className="text-[8px] text-center text-[#989898] mt-1">
                        {i % 4 === 0 ? metric.hour : ''}
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/20 px-2 py-1 rounded text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div>Received: {metric.received}</div>
                        <div>Processed: {metric.processed}</div>
                        <div className="text-[#FF6363]">Flagged: {metric.flagged}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-[#989898] mt-2 px-2">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - 1/3 width */}
          <div className="space-y-4">
            
            {/* LIVE ACTIVITY FEED */}
            <div className="bg-[#0d0d0d] border border-white/10">
              <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#FF6363]" />
                <h2 className="text-sm font-semibold uppercase tracking-wide">Live Activity Feed</h2>
              </div>
              <div className="h-[600px] overflow-y-auto">
                <div className="divide-y divide-white/5">
                  {activities.slice(0, 50).map((activity, i) => (
                    <div 
                      key={i} 
                      className="px-4 py-3 hover:bg-white/5 transition-colors text-xs"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium text-[10px] text-[#989898]">{activity.agentName}</span>
                        <span className="text-[9px] text-[#989898] whitespace-nowrap">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                      <div className="mb-1">{activity.task}</div>
                      <div className="flex items-center gap-2">
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
