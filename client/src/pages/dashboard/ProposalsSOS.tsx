/**
 * Proposals Page - Sovereign OS (S.O.S.) Design
 * 
 * Manage client proposals and track conversion rates
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { FileText, Plus, Send, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

export default function ProposalsSOS() {
  const proposals = [
    {
      id: 1,
      client: "acme corporation",
      title: "website redesign & brand refresh",
      value: "$45,000",
      status: "sent",
      date: "2 days ago",
      probability: 75
    },
    {
      id: 2,
      client: "techstart inc",
      title: "full-stack development project",
      value: "$120,000",
      status: "draft",
      date: "1 week ago",
      probability: 60
    },
    {
      id: 3,
      client: "global solutions ltd",
      title: "marketing automation setup",
      value: "$28,000",
      status: "won",
      date: "3 weeks ago",
      probability: 100
    },
    {
      id: 4,
      client: "innovation labs",
      title: "ai integration consulting",
      value: "$85,000",
      status: "sent",
      date: "1 day ago",
      probability: 80
    },
  ];

  const stats = [
    { label: "total proposals", value: "24", icon: FileText },
    { label: "pending", value: "8", icon: Clock },
    { label: "won", value: "12", icon: CheckCircle },
    { label: "revenue", value: "$580k", icon: DollarSign },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'var(--color-sos-green)';
      case 'sent': return 'var(--color-sos-blue)';
      case 'draft': return 'var(--color-sos-muted)';
      case 'lost': return 'var(--color-sos-red)';
      default: return 'var(--color-sos-muted)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won': return CheckCircle;
      case 'sent': return Send;
      case 'draft': return Clock;
      case 'lost': return XCircle;
      default: return FileText;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 
            className="text-5xl font-bold lowercase mb-2"
            style={{ color: 'var(--color-sos-text)' }}
          >
            proposals
          </h1>
          <p 
            className="text-lg lowercase"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            track and manage client proposals
          </p>
        </div>
        <TactileButton variant="primary">
          <Plus size={18} className="mr-2" />
          new proposal
        </TactileButton>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
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
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} style={{ color: 'var(--color-sos-soul)' }} />
              </div>
              <p 
                className="text-xs uppercase tracking-wider font-mono mb-2"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                {stat.label}
              </p>
              <p 
                className="text-3xl font-bold font-mono"
                style={{ color: 'var(--color-sos-text)' }}
              >
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Proposals List */}
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
          recent proposals
        </h2>

        <div className="space-y-4">
          {proposals.map((proposal, index) => {
            const StatusIcon = getStatusIcon(proposal.status);
            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border cursor-pointer hover:scale-[1.01] transition-transform"
                style={{
                  background: 'var(--color-sos-base)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                data-magnetic="true"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: getStatusColor(proposal.status),
                        opacity: 0.2
                      }}
                    >
                      <StatusIcon size={20} style={{ color: getStatusColor(proposal.status) }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="text-lg font-semibold lowercase mb-1 truncate"
                            style={{ color: 'var(--color-sos-text)' }}
                          >
                            {proposal.title}
                          </h3>
                          <p 
                            className="text-sm lowercase"
                            style={{ color: 'var(--color-sos-muted)' }}
                          >
                            {proposal.client}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p 
                            className="text-xl font-bold font-mono mb-1"
                            style={{ color: 'var(--color-sos-text)' }}
                          >
                            {proposal.value}
                          </p>
                          <span 
                            className="text-xs uppercase tracking-wider font-mono px-2 py-1 rounded"
                            style={{
                              background: getStatusColor(proposal.status),
                              color: 'white'
                            }}
                          >
                            {proposal.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span 
                            className="text-xs lowercase"
                            style={{ color: 'var(--color-sos-muted)' }}
                          >
                            {proposal.date}
                          </span>
                          {proposal.status !== 'won' && proposal.status !== 'lost' && (
                            <div className="flex items-center gap-2">
                              <span 
                                className="text-xs lowercase"
                                style={{ color: 'var(--color-sos-muted)' }}
                              >
                                win probability:
                              </span>
                              <span 
                                className="text-xs font-mono font-bold"
                                style={{ color: 'var(--color-sos-green)' }}
                              >
                                {proposal.probability}%
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <TactileButton variant="ghost" size="sm">
                            edit
                          </TactileButton>
                          {proposal.status === 'draft' && (
                            <TactileButton variant="primary" size="sm">
                              <Send size={14} className="mr-1" />
                              send
                            </TactileButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
