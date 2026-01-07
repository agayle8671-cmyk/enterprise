/**
 * Time Audit Page - Bloomberg-Style Data Dense
 * Comprehensive time tracking with detailed breakdowns
 */

import { motion } from "framer-motion";
import { Clock, TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { generateTimeBreakdown } from "@/lib/mockData";

export default function TimeAuditBloomberg() {
  const timeBreakdown = generateTimeBreakdown();
  
  const weeklyData = [
    { week: 'Week 1', manual: 40, automated: 15, saved: 25 },
    { week: 'Week 2', manual: 35, automated: 20, saved: 30 },
    { week: 'Week 3', manual: 30, automated: 25, saved: 35 },
    { week: 'Week 4', manual: 25, automated: 30, saved: 40 },
  ];

  const dailyBreakdown = [
    { day: 'Monday', hours: [
      { task: 'Email Processing', hours: 3.2, automated: 2.8, color: '#FF6363' },
      { task: 'Meetings', hours: 2.5, automated: 0.5, color: '#8B5CF6' },
      { task: 'Proposals', hours: 2.1, automated: 1.8, color: '#22c55e' },
      { task: 'Research', hours: 1.8, automated: 1.6, color: '#ffc940' },
      { task: 'Admin', hours: 1.4, automated: 1.2, color: '#3b82f6' },
    ]},
    { day: 'Tuesday', hours: [
      { task: 'Email Processing', hours: 2.8, automated: 2.5, color: '#FF6363' },
      { task: 'Meetings', hours: 3.1, automated: 0.8, color: '#8B5CF6' },
      { task: 'Proposals', hours: 1.9, automated: 1.7, color: '#22c55e' },
      { task: 'Research', hours: 1.5, automated: 1.4, color: '#ffc940' },
      { task: 'Admin', hours: 1.2, automated: 1.1, color: '#3b82f6' },
    ]},
    { day: 'Wednesday', hours: [
      { task: 'Email Processing', hours: 2.9, automated: 2.6, color: '#FF6363' },
      { task: 'Meetings', hours: 2.7, automated: 0.6, color: '#8B5CF6' },
      { task: 'Proposals', hours: 2.3, automated: 2.0, color: '#22c55e' },
      { task: 'Research', hours: 1.6, automated: 1.5, color: '#ffc940' },
      { task: 'Admin', hours: 1.0, automated: 0.9, color: '#3b82f6' },
    ]},
    { day: 'Thursday', hours: [
      { task: 'Email Processing', hours: 3.1, automated: 2.9, color: '#FF6363' },
      { task: 'Meetings', hours: 2.2, automated: 0.4, color: '#8B5CF6' },
      { task: 'Proposals', hours: 2.0, automated: 1.8, color: '#22c55e' },
      { task: 'Research', hours: 1.7, automated: 1.6, color: '#ffc940' },
      { task: 'Admin', hours: 1.3, automated: 1.2, color: '#3b82f6' },
    ]},
    { day: 'Friday', hours: [
      { task: 'Email Processing', hours: 2.5, automated: 2.3, color: '#FF6363' },
      { task: 'Meetings', hours: 2.8, automated: 0.7, color: '#8B5CF6' },
      { task: 'Proposals', hours: 1.8, automated: 1.6, color: '#22c55e' },
      { task: 'Research', hours: 1.4, automated: 1.3, color: '#ffc940' },
      { task: 'Admin', hours: 0.9, automated: 0.8, color: '#3b82f6' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED]">
      
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-[#FF6363]/20">
        <div className="px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#FF6363]" />
              <span className="font-semibold">TIME AUDIT & OPTIMIZATION</span>
            </div>
            <div className="flex-1 max-w-3xl">
              <TypewriterText 
                phrases={[
                  "Saved 23.5 hours this week - 68% automation rate",
                  "Email management: 87% automated (12.5hrs → 1.6hrs)",
                  "Proposal writing: 88% automated (6.8hrs → 0.8hrs)",
                  "Admin tasks: 90% automated (4.1hrs → 0.4hrs)",
                  "On track to save 100+ hours this month",
                ]}
                typingSpeed={50}
                deletingSpeed={30}
                pauseTime={3000}
                className="text-[#989898]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* KEY METRICS */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Total Hours This Week', value: '40.0', change: 0, icon: Clock, subtitle: 'Standard workweek' },
            { label: 'Manual Work', value: '16.5', change: -35, icon: TrendingDown, subtitle: '41% of time' },
            { label: 'Automated Work', value: '23.5', change: +68, icon: CheckCircle2, subtitle: '59% of time' },
            { label: 'Time Saved vs Last Month', value: '18.2hrs', change: +45, icon: TrendingUp, subtitle: '$3,640 value' },
            { label: 'Automation Rate', value: '68%', change: +12, icon: Target, subtitle: 'Target: 75%' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              className="bg-[#0d0d0d] border border-white/10 p-3 hover:border-[#FF6363]/30 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`h-3 w-3 ${i === 1 ? 'text-[#FF6363]' : i === 2 ? 'text-[#22c55e]' : 'text-[#989898]'}`} />
                <div className="text-[10px] text-[#989898] uppercase tracking-wider">{metric.label}</div>
              </div>
              <div className="text-2xl font-bold tracking-tight mb-1">{metric.value}</div>
              <div className="flex items-center justify-between">
                <div className="text-[9px] text-[#989898]">{metric.subtitle}</div>
                {metric.change !== 0 && (
                  <div className={`flex items-center gap-1 text-xs ${metric.change >= 0 ? 'text-[#22c55e]' : 'text-[#FF6363]'}`}>
                    {metric.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(metric.change)}%
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* TIME BREAKDOWN TABLE */}
        <div className="bg-[#0d0d0d] border border-white/10">
          <div className="px-4 py-2 border-b border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Weekly Time Breakdown by Category</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#0a0a0a] text-[#989898]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Category</th>
                  <th className="text-right px-4 py-2 font-medium">Hours</th>
                  <th className="text-right px-4 py-2 font-medium">% of Time</th>
                  <th className="text-right px-4 py-2 font-medium">Change vs Last Week</th>
                  <th className="text-right px-4 py-2 font-medium">Tasks Completed</th>
                  <th className="text-right px-4 py-2 font-medium">Automation Rate</th>
                  <th className="text-right px-4 py-2 font-medium">Time Saved</th>
                  <th className="text-right px-4 py-2 font-medium">$ Value Saved</th>
                </tr>
              </thead>
              <tbody>
                {timeBreakdown.map((item, i) => {
                  const automationRate = Math.floor(Math.random() * 30) + 60;
                  const timeSaved = (item.hours * automationRate) / 100;
                  const valueSaved = timeSaved * 200; // $200/hour rate
                  
                  return (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded" style={{ background: item.color }} />
                          <span className="font-medium">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{item.hours}</td>
                      <td className="px-4 py-3 text-right text-[#989898]">{item.percentage}%</td>
                      <td className="px-4 py-3 text-right">
                        <span className={item.change <= 0 ? 'text-[#22c55e]' : 'text-[#FF6363]'}>
                          {item.change > 0 ? '+' : ''}{item.change}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-[#989898]">{item.tasks}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#FF6363] to-[#22c55e] rounded-full"
                              style={{ width: `${automationRate}%` }}
                            />
                          </div>
                          <span className={automationRate >= 80 ? 'text-[#22c55e]' : automationRate >= 60 ? 'text-[#ffc940]' : 'text-[#FF6363]'}>
                            {automationRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-[#8B5CF6] font-medium">{timeSaved.toFixed(1)}h</td>
                      <td className="px-4 py-3 text-right text-[#22c55e] font-medium">
                        ${valueSaved.toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-[#0a0a0a] border-t border-white/10">
                <tr>
                  <td className="px-4 py-3 font-bold">TOTAL</td>
                  <td className="px-4 py-3 text-right font-bold">40.0</td>
                  <td className="px-4 py-3 text-right font-bold">100%</td>
                  <td className="px-4 py-3 text-right font-bold text-[#22c55e]">-18%</td>
                  <td className="px-4 py-3 text-right font-bold">534</td>
                  <td className="px-4 py-3 text-right font-bold text-[#22c55e]">68%</td>
                  <td className="px-4 py-3 text-right font-bold text-[#8B5CF6]">23.5h</td>
                  <td className="px-4 py-3 text-right font-bold text-[#22c55e]">$4,700</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* DAILY BREAKDOWN */}
          <div className="bg-[#0d0d0d] border border-white/10">
            <div className="px-4 py-2 border-b border-white/10">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Daily Time Allocation</h2>
            </div>
            <div className="p-4 space-y-4">
              {dailyBreakdown.map((day, i) => (
                <div key={i}>
                  <div className="text-xs font-semibold mb-2 text-[#989898]">{day.day}</div>
                  <div className="space-y-2">
                    {day.hours.map((item, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-32 text-[10px] text-[#989898]">{item.task}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-6 bg-white/5 rounded overflow-hidden relative">
                              <div 
                                className="h-full absolute left-0 top-0"
                                style={{ 
                                  background: `${item.color}40`,
                                  width: `${(item.hours / 4) * 100}%`
                                }}
                              />
                              <div 
                                className="h-full absolute left-0 top-0"
                                style={{ 
                                  background: item.color,
                                  width: `${(item.automated / 4) * 100}%`
                                }}
                              />
                            </div>
                            <div className="w-12 text-[10px] text-right">
                              <span className="text-[#EDEDED] font-medium">{item.automated}h</span>
                              <span className="text-[#989898]">/{item.hours}h</span>
                            </div>
                            <div className="w-12 text-[10px] text-right text-[#22c55e]">
                              {Math.floor((item.automated / item.hours) * 100)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WEEKLY TREND */}
          <div className="bg-[#0d0d0d] border border-white/10">
            <div className="px-4 py-2 border-b border-white/10">
              <h2 className="text-sm font-semibold uppercase tracking-wide">4-Week Automation Trend</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {weeklyData.map((week, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium">{week.week}</div>
                      <div className="text-xs text-[#989898]">
                        {week.saved}hrs saved ({Math.floor((week.automated / 40) * 100)}% automated)
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div 
                        className="h-8 bg-[#FF6363] rounded-l flex items-center justify-center text-[10px] font-medium"
                        style={{ width: `${(week.manual / 40) * 100}%` }}
                      >
                        {week.manual}h
                      </div>
                      <div 
                        className="h-8 bg-[#22c55e] rounded-r flex items-center justify-center text-[10px] font-medium"
                        style={{ width: `${(week.automated / 40) * 100}%` }}
                      >
                        {week.automated}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF6363] mb-1">-37.5%</div>
                    <div className="text-[10px] text-[#989898]">Manual work reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#22c55e] mb-1">+100%</div>
                    <div className="text-[10px] text-[#989898]">Automated work increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RECOMMENDATIONS */}
        <div className="bg-[#0d0d0d] border border-white/10">
          <div className="px-4 py-2 border-b border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Optimization Recommendations</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: 'Automate Client Meetings',
                  description: 'Deploy Calendar Agent with automated scheduling and reminders',
                  impact: 'Save 1.5hrs/week',
                  priority: 'High',
                  value: '$300/week',
                },
                {
                  title: 'Optimize Email Filters',
                  description: 'Enhance Inbox Sentinel with advanced categorization rules',
                  impact: 'Save 0.8hrs/week',
                  priority: 'Medium',
                  value: '$160/week',
                },
                {
                  title: 'Batch Social Media',
                  description: 'Use Content Alchemist to pre-generate weekly social content',
                  impact: 'Save 1.2hrs/week',
                  priority: 'High',
                  value: '$240/week',
                },
              ].map((rec, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/10 p-4 hover:border-[#FF6363]/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold">{rec.title}</h3>
                    <span className={`text-[9px] px-2 py-1 rounded ${
                      rec.priority === 'High' ? 'bg-[#FF6363]/20 text-[#FF6363]' : 'bg-[#ffc940]/20 text-[#ffc940]'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#989898] mb-4">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-[#22c55e]">{rec.impact}</div>
                      <div className="text-[9px] text-[#989898]">{rec.value}</div>
                    </div>
                    <button className="px-3 py-1.5 text-[10px] rounded bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white hover:shadow-lg transition-all">
                      Deploy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
