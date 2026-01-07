/**
 * Founding 50 Page - Sovereign Aesthetic
 * 
 * Launchpad management with:
 * - Glass progress tracking
 * - Terminal data table
 * - Campaign metrics
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Check, UserPlus, Mail, MessageSquare, ArrowRight, Filter,
  Download, Trash2, MoreHorizontal, ChevronLeft, ChevronRight,
  Search, SlidersHorizontal, ArrowUpDown, Rocket
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OfferArchitect } from "@/components/dashboard/OfferArchitect";
import { UtilityBuilder } from "@/components/dashboard/UtilityBuilder";
import { SocialProofGenerator } from "@/components/dashboard/SocialProofGenerator";
import { useCampaigns, useLeads, useDeleteLead } from "@/lib/api";
import { GlowButton, GlassCard, SpotlightCard } from "@/components/GlassCard";
import { BentoGrid, BentoItem, BentoDataCard } from "@/components/BentoGrid";
import { PulseRing, TypewriterText } from "@/components/Physics";
import { motion } from "framer-motion";

export default function Founding50() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();
  const campaign = campaigns?.[0];
  const { data: leads, isLoading: leadsLoading } = useLeads(campaign?.id);
  const deleteLead = useDeleteLead();

  // Export leads as CSV
  const handleExportCSV = () => {
    const csvData = leads || [];
    if (csvData.length === 0) {
      toast({ title: "NO DATA", description: "No leads to export", variant: "destructive" });
      return;
    }
    const headers = ['Name', 'Email', 'Company', 'Revenue', 'Score', 'Status'];
    const rows = csvData.map((row: any) => [row.name, row.email, row.company, row.revenue, row.score, row.status].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `founding50-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "EXPORTED", description: `${csvData.length} leads exported to CSV` });
  };

  // Navigate to campaign management
  const handleManageCampaign = () => {
    toast({ title: "OPENING CAMPAIGN", description: "Loading campaign manager..." });
    setLocation('/dashboard/campaigns');
  };

  // Add new member
  const handleAddMember = () => {
    toast({ title: "ADD MEMBER", description: "Opening member form..." });
    // Could open a modal here, for now show toast
  };

  const toggleAll = () => {
    if (!leads) return;
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
    } else {
      setSelectedRows(leads.map((lead: any) => lead.id));
      setIsAllSelected(true);
    }
  };

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(i => i !== id));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedRows) {
      await deleteLead.mutateAsync(id);
    }
    setSelectedRows([]);
    setIsAllSelected(false);
  };

  if (campaignsLoading || leadsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <PulseRing color="var(--color-acid)" size={60} duration={1.5} />
      </div>
    );
  }

  const waitlistData = leads || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
            FOUNDING 50 LAUNCHPAD
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Rocket className="h-4 w-4 text-[var(--color-acid)]" />
            <p className="text-sm text-[var(--text-sovereign-muted)]">
              Validate high-ticket offer by securing 50 founding members
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <OfferArchitect>
            <GlowButton variant="aurora" className="border-[var(--color-aurora-cyan)] text-[var(--color-aurora-cyan)] bg-transparent hover:bg-[rgba(0,240,255,0.1)]">
              OFFER ARCHITECT
            </GlowButton>
          </OfferArchitect>
          <GlowButton variant="acid" onClick={handleAddMember}>
            <UserPlus className="mr-2 h-4 w-4" />
            ADD MEMBER
          </GlowButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* We wrap these in generic divs for now as they are imported components, assuming they will render their own cards */}
        {/* If they were internal code, we'd update them too. For now, we update the layout around them */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <UtilityBuilder />
          <SocialProofGenerator />
        </div>
      </div>

      {/* Progress Section */}
      <SpotlightCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg text-[var(--text-sovereign-primary)] mb-1">CAMPAIGN VELOCITY</h2>
            <p className="text-terminal text-xs text-[var(--text-sovereign-muted)]">GOAL: {campaign?.goalMembers || 50} FOUNDING MEMBERS</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
              {campaign?.currentMembers || 0}
            </span>
            <span className="text-xl text-[var(--text-sovereign-muted)] ml-2 opacity-50">/{campaign?.goalMembers || 50}</span>
          </div>
        </div>

        <div className="h-2 w-full bg-[var(--color-void)] rounded-full overflow-hidden border border-[var(--glass-sovereign-border)]">
          <motion.div
            className="h-full bg-[var(--color-acid)] shadow-[0_0_10px_var(--color-acid)]"
            initial={{ width: 0 }}
            animate={{ width: `${((campaign?.currentMembers || 0) / (campaign?.goalMembers || 50)) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="glass-panel p-4 rounded-lg bg-[var(--color-void)]">
            <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mb-1">TOTAL REVENUE</p>
            <p className="text-2xl font-bold text-[var(--text-sovereign-primary)]">
              ${((campaign?.totalRevenue || 0) / 100).toLocaleString()}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-lg bg-[var(--color-void)]">
            <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mb-1">CONVERSION RATE</p>
            <p className="text-2xl font-bold text-[var(--color-aurora-cyan)]">{campaign?.conversionRate || '0'}%</p>
          </div>
          <div className="glass-panel p-4 rounded-lg bg-[var(--color-void)]">
            <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mb-1">WAITLIST SIZE</p>
            <p className="text-2xl font-bold text-[var(--color-aurora-purple)]">{campaign?.waitlistSize || 0}</p>
          </div>
        </div>
      </SpotlightCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard intensity="medium" className="p-4 border-[var(--color-acid)]">
          <div className="h-8 w-8 rounded bg-[var(--color-acid)] text-black flex items-center justify-center font-bold mb-3">
            <Check className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-sovereign-primary)]">PHASE 1: OFFER DESIGN</h3>
          <p className="text-xs text-[var(--text-sovereign-muted)] mb-4">Structure "Grand Slam Offer"</p>
          <div className="space-y-2 mb-4">
            {['Transformation Statement', 'Methodology Map', 'Pricing Architecture'].map(item => (
              <div key={item} className="flex items-center gap-2 text-xs text-[var(--color-acid)]">
                <Check className="h-3 w-3" /> {item}
              </div>
            ))}
          </div>
          <button className="w-full py-2 text-xs border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-muted)] rounded hover:bg-white/5 disabled:opacity-50">
            COMPLETED
          </button>
        </GlassCard>

        <GlassCard intensity="medium" className="p-4 border-[var(--color-aurora-cyan)]">
          <div className="h-8 w-8 rounded bg-[var(--color-aurora-cyan)] text-black flex items-center justify-center font-bold mb-3">
            2
          </div>
          <h3 className="text-sm font-bold text-[var(--text-sovereign-primary)]">PHASE 2: VALIDATION</h3>
          <p className="text-xs text-[var(--text-sovereign-muted)] mb-4">Secure first 10 members</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-[var(--color-acid)]"><Check className="h-3 w-3" /> Launch Waitlist</div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-sovereign-primary)]"><PulseRing size={8} color="var(--color-aurora-cyan)" /> Outreach Active</div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-sovereign-muted)]"><div className="h-2 w-2 rounded-full bg-[var(--text-sovereign-muted)]" /> Sales Calls</div>
          </div>
          <GlowButton variant="aurora" size="sm" className="w-full" onClick={handleManageCampaign}>
            MANAGE CAMPAIGN
          </GlowButton>
        </GlassCard>

        <GlassCard intensity="medium" className="p-4 opacity-50">
          <div className="h-8 w-8 rounded bg-[var(--glass-sovereign-border)] text-[var(--text-sovereign-muted)] flex items-center justify-center font-bold mb-3">
            3
          </div>
          <h3 className="text-sm font-bold text-[var(--text-sovereign-muted)]">PHASE 3: SCALING</h3>
          <p className="text-xs text-[var(--text-sovereign-muted)] mb-4">Automate fulfillment</p>
          <div className="space-y-2 mb-4 text-xs text-[var(--text-sovereign-muted)]">
            <div>Waitlist Activation</div>
            <div>Referral Referral Loop</div>
            <div>Community Launch</div>
          </div>
          <button disabled className="w-full py-2 text-xs border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-muted)] rounded cursor-not-allowed">
            LOCKED
          </button>
        </GlassCard>
      </div>

      {/* Enterprise Waitlist Table */}
      <GlassCard intensity="medium" className="overflow-hidden">
        <div className="p-4 border-b border-[var(--glass-sovereign-border)] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg text-[var(--text-sovereign-primary)]">WAITLIST MANAGEMENT</h3>
            <p className="text-xs text-[var(--text-sovereign-muted)]">Prioritize high-value prospects</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3 w-3 text-[var(--text-sovereign-muted)]" />
              <input
                placeholder="Search leads..."
                className="pl-8 h-8 rounded bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-xs text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
              />
            </div>
            <button className="h-8 px-3 rounded border border-[var(--glass-sovereign-border)] hover:bg-white/5 flex items-center">
              <Filter className="h-3 w-3 text-[var(--text-sovereign-muted)]" />
            </button>
            <button
              className="h-8 px-3 rounded border border-[var(--glass-sovereign-border)] hover:bg-white/5 flex items-center"
              onClick={handleExportCSV}
              title="Export to CSV"
            >
              <Download className="h-3 w-3 text-[var(--text-sovereign-muted)]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-[var(--text-sovereign-muted)] uppercase bg-[var(--color-void)] border-b border-[var(--glass-sovereign-border)]">
              <tr>
                <th className="px-6 py-3 w-4">
                  <input type="checkbox" checked={isAllSelected} onChange={toggleAll} className="accent-[var(--color-acid)]" />
                </th>
                <th className="px-6 py-3 font-normal">NAME</th>
                <th className="px-6 py-3 font-normal">COMPANY</th>
                <th className="px-6 py-3 font-normal">REVENUE</th>
                <th className="px-6 py-3 font-normal">SCORE</th>
                <th className="px-6 py-3 font-normal">STATUS</th>
                <th className="px-6 py-3 text-right font-normal">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-sovereign-border)]">
              {waitlistData.map((row: any) => (
                <tr key={row.id} className={`group hover:bg-white/5 transition-colors ${selectedRows.includes(row.id) ? "bg-[rgba(187,255,0,0.05)]" : ""}`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="accent-[var(--color-acid)]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-[var(--text-sovereign-primary)]">{row.name}</span>
                      <span className="text-xs text-[var(--text-sovereign-muted)]">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-[var(--text-sovereign-muted)]">{row.company}</td>
                  <td className="px-6 py-4 text-xs font-mono text-[var(--text-sovereign-primary)]">{row.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-[var(--color-void)] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${row.score > 90 ? 'bg-[var(--color-acid)]' : row.score > 70 ? 'bg-[var(--color-aurora-cyan)]' : 'bg-[var(--color-alarm)]'}`}
                          style={{ width: `${row.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-[var(--text-sovereign-muted)]">{row.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.status === "VIP" ? "border-[var(--color-aurora-purple)] text-[var(--color-aurora-purple)] bg-[rgba(112,0,255,0.1)]" :
                      row.status === "High Priority" ? "border-[var(--color-acid)] text-[var(--color-acid)] bg-[rgba(187,255,0,0.1)]" :
                        "border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-muted)]"
                      }`}>
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--text-sovereign-muted)] hover:text-white transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}