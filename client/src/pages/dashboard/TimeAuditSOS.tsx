/**
 * Time Audit Page - Sovereign OS (S.O.S.) Design
 * 
 * Track time investment and identify optimization opportunities
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { Clock, TrendingDown, TrendingUp, AlertCircle, Download, Calendar } from "lucide-react";

export default function TimeAuditSOS() {
  const timeCategories = [
    { name: "client work", hours: 32, percentage: 40, trend: "up", color: 'var(--color-sos-green)' },
    { name: "meetings", hours: 16, percentage: 20, trend: "down", color: 'var(--color-sos-soul)' },
    { name: "email", hours: 12, percentage: 15, trend: "down", color: 'var(--color-sos-blue)' },
    { name: "admin", hours: 8, percentage: 10, trend: "neutral", color: 'var(--color-sos-muted)' },
    { name: "content creation", hours: 12, percentage: 15, trend: "up", color: 'var(--color-sos-green)' },
  ];

  const insights = [
    {
      type: "opportunity",
      title: "automate email responses",
      description: "save 8 hours/week by deploying inbox sentinel agent",
      impact: "high",
      icon: TrendingUp
    },
    {
      type: "warning",
      title: "meeting overload detected",
      description: "16 hours in meetings this week, 25% above optimal",
      impact: "medium",
      icon: AlertCircle
    },
    {
      type: "success",
      title: "client work efficiency up 12%",
      description: "content alchemist automation working well",
      impact: "high",
      icon: TrendingUp
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header with Live Time Insights */}
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
              time audit
            </h1>
            <p 
              className="text-lg lowercase"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              understand where your time goes
            </p>
          </div>
          <div className="flex gap-2">
            <TactileButton variant="secondary">
              <Calendar size={18} className="mr-2" />
              this week
            </TactileButton>
            <TactileButton variant="ghost">
              <Download size={18} className="mr-2" />
              export
            </TactileButton>
          </div>
        </div>
        
        {/* Live Time Analysis */}
        <div className="p-4 rounded-xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-sm)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} style={{ color: 'var(--color-sos-soul)' }} />
            <span className="text-xs font-mono uppercase tracking-wider" 
              style={{ color: 'var(--color-sos-soul)' }}>
              Time Intelligence
            </span>
          </div>
          <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
            <TypewriterText
              phrases={[
                "you could save 18 hours this week with automation",
                "meeting time down 22% - excellent progress this month",
                "peak productivity hours: 9am-11am daily",
                "inbox sentinel could eliminate 8 hours of email work",
                "client work efficiency up 12% with agent assistance"
              ]}
              typingSpeed={38}
              deletingSpeed={18}
              pauseTime={3400}
            />
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "total hours", value: "80h", subtitle: "this week" },
          { label: "billable", value: "52h", subtitle: "65% of total" },
          { label: "wasted", value: "12h", subtitle: "15% of total" },
          { label: "saveable", value: "18h", subtitle: "with automation" },
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
              className="text-3xl font-bold font-mono mb-1"
              style={{ color: 'var(--color-sos-text)' }}
            >
              {stat.value}
            </p>
            <p 
              className="text-xs lowercase"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              {stat.subtitle}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Time Breakdown */}
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
          time breakdown
        </h2>

        <div className="space-y-4">
          {timeCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span 
                    className="text-sm font-medium lowercase"
                    style={{ color: 'var(--color-sos-text)' }}
                  >
                    {category.name}
                  </span>
                  {category.trend === 'up' && (
                    <TrendingUp size={16} style={{ color: 'var(--color-sos-green)' }} />
                  )}
                  {category.trend === 'down' && (
                    <TrendingDown size={16} style={{ color: 'var(--color-sos-soul)' }} />
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span 
                    className="text-sm font-mono"
                    style={{ color: 'var(--color-sos-muted)' }}
                  >
                    {category.hours}h
                  </span>
                  <span 
                    className="text-sm font-mono font-bold"
                    style={{ color: 'var(--color-sos-text)' }}
                  >
                    {category.percentage}%
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--color-sos-base)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: category.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
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
          ai insights
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border"
                style={{
                  background: 'var(--color-sos-base)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: insight.type === 'success' 
                        ? 'var(--color-sos-green)' 
                        : insight.type === 'warning'
                        ? 'var(--color-sos-soul)'
                        : 'var(--color-sos-blue)'
                    }}
                  >
                    <Icon size={16} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-sm font-semibold lowercase mb-1"
                      style={{ color: 'var(--color-sos-text)' }}
                    >
                      {insight.title}
                    </h3>
                    <p 
                      className="text-xs lowercase leading-relaxed"
                      style={{ color: 'var(--color-sos-muted)' }}
                    >
                      {insight.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs uppercase tracking-wider font-mono"
                    style={{ color: 'var(--color-sos-muted)' }}
                  >
                    {insight.impact} impact
                  </span>
                  <TactileButton variant="ghost" size="sm">
                    act now
                  </TactileButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
