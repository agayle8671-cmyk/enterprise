/**
 * Proposals - SOVEREIGN AESTHETIC
 */

import { FileText, DollarSign, Target, Eye, Edit, Send } from "lucide-react";
import { GravityCard, AnimatedBorder, LiveBentoGrid, BentoItem, SystemTicker } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { generateProposals, formatCurrency, formatTimeAgo } from "@/lib/mockData";
import { useState } from "react";

export default function ProposalsSovereign() {
  const proposals = generateProposals(30);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const totalValue = proposals.reduce((s, p) => s + p.value, 0);
  const wonValue = proposals.filter(p => p.status === 'won').reduce((s, p) => s + p.value, 0);
  const activeValue = proposals.filter(p => ['sent', 'reviewing', 'negotiating'].includes(p.status)).reduce((s, p) => s + p.value, 0);

  const filtered = filterStatus === 'all' ? proposals : proposals.filter(p => p.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'won': return 'var(--color-acid)';
      case 'sent': return 'var(--color-aurora-cyan)';
      case 'reviewing': return 'var(--color-aurora-purple)';
      case 'negotiating': return 'var(--color-aurora-cyan)';
      case 'lost': return 'var(--color-alarm)';
      default: return 'var(--color-text-muted)';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      <SystemTicker 
        items={[
          { id: "1", label: "PIPELINE", value: formatCurrency(totalValue), trend: "up" as const, color: "var(--color-acid)" },
          { id: "2", label: "ACTIVE", value: formatCurrency(activeValue), trend: "up" as const, color: "var(--color-aurora-cyan)" },
          { id: "3", label: "WON", value: formatCurrency(wonValue), trend: "up" as const, color: "var(--color-acid)" },
        ]}
        variant="typewriter"
        className="sticky top-0 z-50"
      />

      <div className="p-4 space-y-4">
        <AnimatedBorder borderWidth={2} borderRadius={12} animationDuration={4} glowIntensity="high">
          <div className="bg-[var(--color-structure)] p-6 rounded-xl">
            <h1 className="text-2xl font-bold font-mono tracking-tight mb-1">PROPOSAL PIPELINE</h1>
            <div className="text-sm font-mono text-[var(--color-acid)]">
              <TypewriterText 
                phrases={[
                  `// ${proposals.length} PROPOSALS - ${formatCurrency(totalValue)} TOTAL VALUE`,
                  `// ${proposals.filter(p => p.status === 'won').length} WON - ${formatCurrency(wonValue)} REVENUE`,
                  `// ACTIVE PIPELINE: ${formatCurrency(activeValue)}`,
                ]}
                typingSpeed={50}
                deletingSpeed={30}
                pauseTime={2500}
              />
            </div>
          </div>
        </AnimatedBorder>

        <LiveBentoGrid columns={12} gap={8}>
          {[
            { label: "TOTAL PIPELINE", value: formatCurrency(totalValue), icon: DollarSign },
            { label: "ACTIVE", value: formatCurrency(activeValue), icon: Target },
            { label: "WON", value: formatCurrency(wonValue), icon: FileText },
            { label: "PROPOSALS", value: proposals.length.toString(), icon: FileText },
          ].map((m, i) => (
            <BentoItem key={i} colSpan={3} glowOnHover>
              <GravityCard magneticRange={120}>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <m.icon className="h-4 w-4 text-[var(--color-acid)]" />
                    <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">{m.label}</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-[var(--color-acid)]">{m.value}</div>
                </div>
              </GravityCard>
            </BentoItem>
          ))}

          <BentoItem colSpan={12} glowOnHover>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                {['all', 'sent', 'reviewing', 'negotiating', 'won', 'lost'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase rounded transition-all ${
                      filterStatus === status
                        ? 'bg-[var(--color-acid)]/20 text-[var(--color-acid)] border border-[var(--color-acid)]/30'
                        : 'bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <table className="w-full text-xs font-mono">
                <thead className="text-[var(--color-text-muted)] border-b border-[var(--color-acid)]/20">
                  <tr>
                    <th className="text-left pb-2">CLIENT</th>
                    <th className="text-left pb-2">PROJECT</th>
                    <th className="text-right pb-2">VALUE</th>
                    <th className="text-center pb-2">STATUS</th>
                    <th className="text-right pb-2">PROBABILITY</th>
                    <th className="text-right pb-2">CREATED</th>
                    <th className="text-right pb-2">DAYS</th>
                    <th className="text-center pb-2">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 20).map((p, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-[var(--color-acid)]/5 transition-colors">
                      <td className="py-3 font-medium">{p.clientName}</td>
                      <td className="py-3 text-[var(--color-text-muted)]">{p.projectTitle}</td>
                      <td className="py-3 text-right text-[var(--color-acid)]">{formatCurrency(p.value)}</td>
                      <td className="py-3 text-center">
                        <span 
                          className="px-2 py-1 rounded text-[9px] font-mono"
                          style={{ 
                            background: `${getStatusColor(p.status)}20`,
                            color: getStatusColor(p.status)
                          }}
                        >
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 text-right" style={{ 
                        color: p.probability >= 70 ? "var(--color-acid)" : "var(--color-aurora-cyan)" 
                      }}>
                        {p.probability}%
                      </td>
                      <td className="py-3 text-right text-[var(--color-text-muted)]">{formatTimeAgo(p.createdAt)}</td>
                      <td className="py-3 text-right">{p.daysInPipeline}d</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1 hover:bg-white/10 rounded"><Eye className="h-3 w-3" /></button>
                          <button className="p-1 hover:bg-white/10 rounded"><Edit className="h-3 w-3" /></button>
                          {p.status === 'draft' && <button className="p-1 hover:bg-white/10 rounded"><Send className="h-3 w-3 text-[var(--color-acid)]" /></button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BentoItem>
        </LiveBentoGrid>
      </div>
    </div>
  );
}
