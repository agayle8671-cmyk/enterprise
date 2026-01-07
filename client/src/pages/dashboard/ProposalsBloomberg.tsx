/**
 * Proposals Page - Bloomberg-Style Data Dense
 * Comprehensive proposal pipeline with detailed metrics
 */

import { motion } from "framer-motion";
import { 
  FileText, DollarSign, TrendingUp, Clock, Target, 
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle,
  Edit, Eye, Send, Download
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { generateProposals, formatCurrency, formatTimeAgo } from "@/lib/mockData";
import { useState } from "react";

export default function ProposalsBloomberg() {
  const proposals = generateProposals(50);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const statusCounts = {
    all: proposals.length,
    draft: proposals.filter(p => p.status === 'draft').length,
    sent: proposals.filter(p => p.status === 'sent').length,
    reviewing: proposals.filter(p => p.status === 'reviewing').length,
    negotiating: proposals.filter(p => p.status === 'negotiating').length,
    won: proposals.filter(p => p.status === 'won').length,
    lost: proposals.filter(p => p.status === 'lost').length,
  };

  const filteredProposals = filterStatus === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === filterStatus);

  const totalValue = proposals.reduce((sum, p) => sum + p.value, 0);
  const wonValue = proposals.filter(p => p.status === 'won').reduce((sum, p) => sum + p.value, 0);
  const activeValue = proposals.filter(p => ['sent', 'reviewing', 'negotiating'].includes(p.status)).reduce((sum, p) => sum + p.value, 0);
  const weightedValue = proposals.filter(p => ['sent', 'reviewing', 'negotiating'].includes(p.status)).reduce((sum, p) => sum + (p.value * p.probability / 100), 0);

  const conversionRate = (proposals.filter(p => p.status === 'won').length / proposals.filter(p => ['won', 'lost'].includes(p.status)).length) * 100;
  const avgDealSize = wonValue / proposals.filter(p => p.status === 'won').length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'draft': return '#989898';
      case 'sent': return '#3b82f6';
      case 'reviewing': return '#ffc940';
      case 'negotiating': return '#8B5CF6';
      case 'won': return '#22c55e';
      case 'lost': return '#FF6363';
      default: return '#989898';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED]">
      
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-[#FF6363]/20">
        <div className="px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#FF6363]" />
              <span className="font-semibold">PROPOSAL PIPELINE DASHBOARD</span>
            </div>
            <div className="flex-1 max-w-3xl">
              <TypewriterText 
                phrases={[
                  `${statusCounts.all} total proposals worth ${formatCurrency(totalValue)}`,
                  `${statusCounts.won} won deals - ${formatCurrency(wonValue)} in revenue`,
                  `${statusCounts.sent + statusCounts.reviewing + statusCounts.negotiating} active proposals in pipeline`,
                  `Weighted pipeline value: ${formatCurrency(weightedValue)}`,
                  `Conversion rate: ${conversionRate.toFixed(1)}% - Avg deal: ${formatCurrency(avgDealSize)}`,
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
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'Total Pipeline', value: formatCurrency(totalValue), change: +23, icon: DollarSign },
            { label: 'Active Pipeline', value: formatCurrency(activeValue), change: +18, icon: Target },
            { label: 'Weighted Value', value: formatCurrency(weightedValue), change: +15, icon: TrendingUp },
            { label: 'Won This Month', value: formatCurrency(wonValue), change: +45, icon: CheckCircle2 },
            { label: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%`, change: +8, icon: Target },
            { label: 'Avg Deal Size', value: formatCurrency(avgDealSize), change: +12, icon: DollarSign },
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

        {/* STATUS FILTER TABS */}
        <div className="bg-[#0d0d0d] border border-white/10 p-2 flex items-center gap-2 overflow-x-auto">
          {[
            { key: 'all', label: 'All Proposals', count: statusCounts.all },
            { key: 'draft', label: 'Draft', count: statusCounts.draft },
            { key: 'sent', label: 'Sent', count: statusCounts.sent },
            { key: 'reviewing', label: 'Reviewing', count: statusCounts.reviewing },
            { key: 'negotiating', label: 'Negotiating', count: statusCounts.negotiating },
            { key: 'won', label: 'Won', count: statusCounts.won },
            { key: 'lost', label: 'Lost', count: statusCounts.lost },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 rounded text-xs font-medium whitespace-nowrap transition-all ${
                filterStatus === tab.key
                  ? 'bg-gradient-to-r from-[#FF6363]/20 to-[#8B5CF6]/20 text-[#EDEDED] border border-[#FF6363]/30'
                  : 'bg-white/5 text-[#989898] hover:bg-white/10 border border-transparent'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* PIPELINE STAGES VISUALIZATION */}
        <div className="bg-[#0d0d0d] border border-white/10">
          <div className="px-4 py-2 border-b border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Pipeline Funnel - Active Proposals</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {[
                { stage: 'Sent', count: statusCounts.sent, value: proposals.filter(p => p.status === 'sent').reduce((s, p) => s + p.value, 0), color: '#3b82f6' },
                { stage: 'Reviewing', count: statusCounts.reviewing, value: proposals.filter(p => p.status === 'reviewing').reduce((s, p) => s + p.value, 0), color: '#ffc940' },
                { stage: 'Negotiating', count: statusCounts.negotiating, value: proposals.filter(p => p.status === 'negotiating').reduce((s, p) => s + p.value, 0), color: '#8B5CF6' },
                { stage: 'Won', count: statusCounts.won, value: wonValue, color: '#22c55e' },
              ].map((stage, i) => {
                const maxWidth = Math.max(statusCounts.sent, statusCounts.reviewing, statusCounts.negotiating, statusCounts.won);
                const width = (stage.count / maxWidth) * 100;
                
                return (
                  <div key={i} className="relative">
                    <div className="flex items-center gap-4 mb-1">
                      <div className="w-24 text-xs font-medium">{stage.stage}</div>
                      <div className="flex-1">
                        <div 
                          className="h-12 rounded transition-all hover:opacity-80 cursor-pointer flex items-center justify-between px-4"
                          style={{ 
                            background: `${stage.color}40`,
                            width: `${width}%`,
                            minWidth: '200px'
                          }}
                        >
                          <span className="text-sm font-bold">{stage.count} proposals</span>
                          <span className="text-sm font-bold">{formatCurrency(stage.value)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PROPOSALS TABLE */}
        <div className="bg-[#0d0d0d] border border-white/10">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              {filterStatus === 'all' ? 'All Proposals' : `${getStatusLabel(filterStatus)} Proposals`}
            </h2>
            <div className="text-xs text-[#989898]">
              {filteredProposals.length} proposals • {formatCurrency(filteredProposals.reduce((s, p) => s + p.value, 0))} total value
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#0a0a0a] text-[#989898]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Client</th>
                  <th className="text-left px-4 py-2 font-medium">Project</th>
                  <th className="text-right px-4 py-2 font-medium">Value</th>
                  <th className="text-center px-4 py-2 font-medium">Status</th>
                  <th className="text-right px-4 py-2 font-medium">Probability</th>
                  <th className="text-right px-4 py-2 font-medium">Weighted Value</th>
                  <th className="text-right px-4 py-2 font-medium">Created</th>
                  <th className="text-right px-4 py-2 font-medium">Updated</th>
                  <th className="text-right px-4 py-2 font-medium">Days in Pipeline</th>
                  <th className="text-center px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProposals.map((proposal, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium">{proposal.clientName}</td>
                    <td className="px-4 py-3 text-[#989898]">{proposal.projectTitle}</td>
                    <td className="px-4 py-3 text-right font-medium text-[#EDEDED]">
                      {formatCurrency(proposal.value)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span 
                        className="inline-block px-2 py-1 rounded text-[10px] font-medium"
                        style={{ 
                          background: `${getStatusColor(proposal.status)}30`,
                          color: getStatusColor(proposal.status)
                        }}
                      >
                        {getStatusLabel(proposal.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              background: proposal.probability >= 70 ? '#22c55e' : proposal.probability >= 40 ? '#ffc940' : '#FF6363',
                              width: `${proposal.probability}%`
                            }}
                          />
                        </div>
                        <span className={
                          proposal.probability >= 70 ? 'text-[#22c55e]' : 
                          proposal.probability >= 40 ? 'text-[#ffc940]' : 
                          'text-[#FF6363]'
                        }>
                          {proposal.probability}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-[#8B5CF6]">
                      {formatCurrency((proposal.value * proposal.probability) / 100)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#989898] text-[10px]">
                      {formatTimeAgo(proposal.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#989898] text-[10px]">
                      {formatTimeAgo(proposal.updatedAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={
                        proposal.daysInPipeline > 30 ? 'text-[#FF6363]' :
                        proposal.daysInPipeline > 14 ? 'text-[#ffc940]' :
                        'text-[#22c55e]'
                      }>
                        {proposal.daysInPipeline}d
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 hover:bg-white/10 rounded transition-colors" title="View">
                          <Eye className="h-3 w-3 text-[#989898]" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Edit">
                          <Edit className="h-3 w-3 text-[#989898]" />
                        </button>
                        {proposal.status === 'draft' && (
                          <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Send">
                            <Send className="h-3 w-3 text-[#22c55e]" />
                          </button>
                        )}
                        <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Download">
                          <Download className="h-3 w-3 text-[#989898]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM STATS */}
        <div className="grid grid-cols-4 gap-4">
          
          {/* WIN RATE BY VALUE RANGE */}
          <div className="bg-[#0d0d0d] border border-white/10 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-[#989898]">Win Rate by Deal Size</h3>
            <div className="space-y-3">
              {[
                { range: '$0-25K', won: 12, lost: 3, rate: 80 },
                { range: '$25K-50K', won: 8, lost: 4, rate: 67 },
                { range: '$50K-75K', won: 5, lost: 3, rate: 63 },
                { range: '$75K+', won: 3, lost: 2, rate: 60 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">{item.range}</span>
                    <span className={`text-xs font-medium ${
                      item.rate >= 70 ? 'text-[#22c55e]' : item.rate >= 50 ? 'text-[#ffc940]' : 'text-[#FF6363]'
                    }`}>
                      {item.rate}%
                    </span>
                  </div>
                  <div className="flex gap-1 text-[9px] text-[#989898]">
                    <span>{item.won} won</span>
                    <span>•</span>
                    <span>{item.lost} lost</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AVG TIME IN STAGE */}
          <div className="bg-[#0d0d0d] border border-white/10 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-[#989898]">Avg Days per Stage</h3>
            <div className="space-y-3">
              {[
                { stage: 'Draft', days: 2.3, color: '#989898' },
                { stage: 'Sent', days: 5.7, color: '#3b82f6' },
                { stage: 'Reviewing', days: 8.2, color: '#ffc940' },
                { stage: 'Negotiating', days: 12.4, color: '#8B5CF6' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded" style={{ background: item.color }} />
                    <span className="text-xs">{item.stage}</span>
                  </div>
                  <span className="text-xs font-medium">{item.days} days</span>
                </div>
              ))}
            </div>
          </div>

          {/* TOP PERFORMERS */}
          <div className="bg-[#0d0d0d] border border-white/10 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-[#989898]">Top Clients by Value</h3>
            <div className="space-y-3">
              {[
                { client: 'Acme Corp', value: 185000, deals: 3 },
                { client: 'TechStart Inc', value: 142000, deals: 2 },
                { client: 'Global Dynamics', value: 128000, deals: 4 },
                { client: 'Innovate Ltd', value: 95000, deals: 2 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{item.client}</span>
                    <span className="text-xs text-[#22c55e]">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="text-[9px] text-[#989898]">{item.deals} deals</div>
                </div>
              ))}
            </div>
          </div>

          {/* MONTHLY TREND */}
          <div className="bg-[#0d0d0d] border border-white/10 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-[#989898]">Monthly Performance</h3>
            <div className="space-y-3">
              {[
                { month: 'This Month', value: 450000, deals: 8, trend: '+23%' },
                { month: 'Last Month', value: 365000, deals: 6, trend: '+18%' },
                { month: '2 Months Ago', value: 310000, deals: 5, trend: '+12%' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">{item.month}</span>
                    <span className="text-xs text-[#22c55e]">{item.trend}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#989898]">{item.deals} deals</span>
                    <span className="text-xs font-medium">{formatCurrency(item.value)}</span>
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
