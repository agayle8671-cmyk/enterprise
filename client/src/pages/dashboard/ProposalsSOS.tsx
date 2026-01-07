/**
 * Proposals Page - Sovereign OS (S.O.S.) Design
 * 
 * Active Contracts with:
 * - Proposal workflow: Draft → Sent → Signed → Paid
 * - Embedded Stripe payment links
 * - Payment Before Work enforcement
 * - Contract value tracking
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import {
  FileText, Plus, Send, Clock, CheckCircle, XCircle, DollarSign,
  CreditCard, Link, AlertCircle, ExternalLink, PenTool, Eye
} from "lucide-react";

type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'signed' | 'paid' | 'won' | 'lost';

interface Proposal {
  id: number;
  client: string;
  title: string;
  value: string;
  valueNum: number;
  status: ProposalStatus;
  date: string;
  probability: number;
  paymentLink?: string;
  signedAt?: string;
  paidAt?: string;
}

export default function ProposalsSOS() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const proposals: Proposal[] = [
    {
      id: 1,
      client: "acme corporation",
      title: "website redesign & brand refresh",
      value: "$45,000",
      valueNum: 45000,
      status: "signed",
      date: "2 days ago",
      probability: 95,
      signedAt: "Jan 5, 2026",
      paymentLink: "https://pay.stripe.com/acme-45k"
    },
    {
      id: 2,
      client: "techstart inc",
      title: "full-stack development project",
      value: "$120,000",
      valueNum: 120000,
      status: "sent",
      date: "1 week ago",
      probability: 60
    },
    {
      id: 3,
      client: "global solutions ltd",
      title: "marketing automation setup",
      value: "$28,000",
      valueNum: 28000,
      status: "paid",
      date: "3 weeks ago",
      probability: 100,
      signedAt: "Dec 20, 2025",
      paidAt: "Dec 21, 2025"
    },
    {
      id: 4,
      client: "innovation labs",
      title: "ai integration consulting",
      value: "$85,000",
      valueNum: 85000,
      status: "viewed",
      date: "1 day ago",
      probability: 80
    },
    {
      id: 5,
      client: "startup ventures",
      title: "mvp development sprint",
      value: "$35,000",
      valueNum: 35000,
      status: "draft",
      date: "today",
      probability: 0
    },
  ];

  const stats = [
    { label: "active contracts", value: "4", icon: FileText, color: 'var(--color-sos-blue)' },
    { label: "awaiting payment", value: "1", icon: CreditCard, color: 'var(--color-sos-soul)' },
    { label: "paid this month", value: "$28k", icon: CheckCircle, color: 'var(--color-sos-green)' },
    { label: "pipeline value", value: "$285k", icon: DollarSign, color: 'var(--color-sos-text)' },
  ];

  const getStatusColor = (status: ProposalStatus) => {
    const colors: Record<ProposalStatus, string> = {
      draft: 'var(--color-sos-muted)',
      sent: 'var(--color-sos-blue)',
      viewed: 'var(--color-sos-soul)',
      signed: 'var(--color-sos-green)',
      paid: 'var(--color-sos-green)',
      won: 'var(--color-sos-green)',
      lost: 'var(--color-sos-red)',
    };
    return colors[status];
  };

  const getStatusIcon = (status: ProposalStatus) => {
    const icons: Record<ProposalStatus, typeof FileText> = {
      draft: Clock,
      sent: Send,
      viewed: Eye,
      signed: PenTool,
      paid: CheckCircle,
      won: CheckCircle,
      lost: XCircle,
    };
    return icons[status];
  };

  // Workflow stages for Active Contracts
  const workflowStages: ProposalStatus[] = ['draft', 'sent', 'viewed', 'signed', 'paid'];

  const getWorkflowProgress = (status: ProposalStatus) => {
    const index = workflowStages.indexOf(status);
    return index === -1 ? 0 : ((index + 1) / workflowStages.length) * 100;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header with Live Proposal Insights */}
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
              active contracts
            </h1>
            <p
              className="text-lg lowercase"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              proposal → sign → pay → deliver
            </p>
          </div>
          <TactileButton variant="primary">
            <Plus size={18} className="mr-2" />
            new contract
          </TactileButton>
        </div>

        {/* Live Contract Intelligence */}
        <div className="p-4 rounded-xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-sm)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={16} style={{ color: 'var(--color-sos-green)' }} />
            <span className="text-xs font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-sos-green)' }}>
              Contract Intelligence
            </span>
          </div>
          <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
            <TypewriterText
              phrases={[
                "acme corp signed! awaiting payment - send reminder?",
                "innovation labs viewed proposal 3x - high intent signal",
                "$28k received from global solutions - contract complete",
                "techstart inc hasn't opened yet - follow up recommended",
                "pipeline health: 82% - strong conversion trajectory"
              ]}
              typingSpeed={42}
              deletingSpeed={20}
              pauseTime={3200}
            />
          </div>
        </div>
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
                <Icon size={20} style={{ color: stat.color }} />
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

      {/* Contracts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-white/40"
        style={{
          background: 'var(--color-sos-panel)',
          boxShadow: 'var(--shadow-tactile-md)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-semibold lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            contracts pipeline
          </h2>
          <div className="flex gap-2">
            {workflowStages.map((stage) => (
              <span
                key={stage}
                className="text-xs uppercase tracking-wider px-2 py-1 rounded"
                style={{
                  background: getStatusColor(stage),
                  color: 'white',
                  opacity: 0.8
                }}
              >
                {stage}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal, index) => {
            const StatusIcon = getStatusIcon(proposal.status);
            const progress = getWorkflowProgress(proposal.status);
            const needsPayment = proposal.status === 'signed' && !proposal.paidAt;

            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border cursor-pointer hover:scale-[1.01] transition-transform"
                style={{
                  background: 'var(--color-sos-base)',
                  borderColor: needsPayment ? 'var(--color-sos-soul)' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: needsPayment ? '0 0 20px rgba(255, 79, 0, 0.1)' : 'none'
                }}
                data-magnetic="true"
                onClick={() => setSelectedProposal(proposal)}
              >
                {/* Workflow Progress Bar */}
                <div className="mb-3">
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: 'var(--color-sos-shadow)' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: getStatusColor(proposal.status) }}
                    />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: getStatusColor(proposal.status),
                        opacity: proposal.status === 'paid' ? 1 : 0.2
                      }}
                    >
                      <StatusIcon size={20} style={{
                        color: proposal.status === 'paid' ? 'white' : getStatusColor(proposal.status)
                      }} />
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
                            className="text-xs uppercase tracking-wider font-mono px-2 py-1 rounded inline-flex items-center gap-1"
                            style={{
                              background: getStatusColor(proposal.status),
                              color: 'white'
                            }}
                          >
                            {needsPayment && <AlertCircle size={12} />}
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
                          {proposal.signedAt && (
                            <span
                              className="text-xs lowercase"
                              style={{ color: 'var(--color-sos-green)' }}
                            >
                              signed: {proposal.signedAt}
                            </span>
                          )}
                          {proposal.paidAt && (
                            <span
                              className="text-xs lowercase"
                              style={{ color: 'var(--color-sos-green)' }}
                            >
                              paid: {proposal.paidAt}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {proposal.status === 'draft' && (
                            <>
                              <TactileButton variant="ghost" size="sm">
                                edit
                              </TactileButton>
                              <TactileButton variant="primary" size="sm">
                                <Send size={14} className="mr-1" />
                                send
                              </TactileButton>
                            </>
                          )}
                          {proposal.status === 'sent' && (
                            <TactileButton variant="ghost" size="sm">
                              resend
                            </TactileButton>
                          )}
                          {needsPayment && (
                            <TactileButton
                              variant="primary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowPaymentModal(true);
                                setSelectedProposal(proposal);
                              }}
                            >
                              <CreditCard size={14} className="mr-1" />
                              request payment
                            </TactileButton>
                          )}
                          {proposal.status === 'paid' && (
                            <span
                              className="text-xs px-3 py-1.5 rounded flex items-center gap-1"
                              style={{ background: 'var(--color-sos-green)', color: 'white' }}
                            >
                              <CheckCircle size={14} />
                              complete
                            </span>
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

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedProposal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-lg)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--color-sos-soul)' }}
                >
                  <CreditCard size={32} color="white" />
                </div>
                <h3 className="text-2xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                  request payment
                </h3>
                <p className="lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                  {selectedProposal.client} • {selectedProposal.value}
                </p>
              </div>

              <div
                className="p-4 rounded-xl mb-6"
                style={{ background: 'var(--color-sos-base)' }}
              >
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                  stripe payment link
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedProposal.paymentLink || 'https://pay.stripe.com/...'}
                    className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm"
                    style={{ color: 'var(--color-sos-text)' }}
                  />
                  <TactileButton variant="secondary" size="sm">
                    <Link size={14} />
                  </TactileButton>
                </div>
              </div>

              <div className="space-y-3">
                <TactileButton variant="primary" className="w-full">
                  <Send size={16} className="mr-2" />
                  send payment request email
                </TactileButton>
                <TactileButton variant="secondary" className="w-full">
                  <ExternalLink size={16} className="mr-2" />
                  open stripe dashboard
                </TactileButton>
              </div>

              <p className="text-xs text-center mt-4 lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                payment before work • deliver after confirmation
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
