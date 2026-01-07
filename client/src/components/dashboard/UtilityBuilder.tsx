/**
 * Utility Builder - Sovereign Aesthetic
 * 
 * Create lead magnet tools
 */

import { Hammer, Calculator, Search, FileText, ArrowRight, Code } from "lucide-react";
import { GlassCard, GlowButton, SpotlightCard } from "@/components/GlassCard";
import { ParticleField } from "@/components/Physics";

export function UtilityBuilder() {
  return (
    <GlassCard intensity="medium" className="col-span-1 lg:col-span-2 overflow-hidden relative min-h-[400px]">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Hammer className="w-32 h-32 text-[var(--text-sovereign-primary)]" />
      </div>
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--color-aurora-cyan)] text-[var(--color-aurora-cyan)] bg-[rgba(0,240,255,0.1)]">
            ENGINEERING AS MARKETING
          </span>
        </div>
        <h3 className="text-xl font-bold text-[var(--text-sovereign-primary)]">LEAD MAGNET UTILITY BUILDER</h3>
        <p className="text-sm text-[var(--text-sovereign-muted)] mb-6">
          Deploy interactive tools to your domain to generate high-quality leads.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              { icon: Calculator, color: 'var(--color-acid)', title: 'ROI CALCULATOR', desc: 'Calculate problem cost' },
              { icon: Search, color: 'var(--color-aurora-purple)', title: 'SEO/AUDIT GRADER', desc: 'Get a free readiness score' },
              { icon: FileText, color: 'var(--color-aurora-cyan)', title: 'SOP GENERATOR', desc: 'Generate custom processes' },
            ].map((item, i) => (
              <SpotlightCard key={i} className="p-4 flex items-center gap-4 border-transparent hover:border-[var(--glass-sovereign-border)] cursor-pointer">
                <div className="p-2 rounded bg-[var(--color-void)] border border-[var(--glass-sovereign-border)]" style={{ color: item.color }}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-sovereign-primary)]">{item.title}</h4>
                  <p className="text-[10px] text-[var(--text-sovereign-muted)]">{item.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          <div className="relative rounded-lg overflow-hidden border border-[var(--glass-sovereign-border)] bg-[var(--color-void)] hidden md:flex items-center justify-center group">
            <div className="absolute inset-0 opacity-20">
              <ParticleField density={15} color="var(--text-sovereign-primary)" speed={0.2} />
            </div>
            <div className="text-center z-10 p-6">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full border border-[var(--glass-sovereign-border)] flex items-center justify-center bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <Code className="h-6 w-6 text-[var(--text-sovereign-primary)]" />
              </div>
              <p className="text-sm font-bold text-[var(--text-sovereign-primary)]">PREVIEW TEMPLATE</p>
              <p className="text-xs text-[var(--text-sovereign-muted)]">Select a tool type to visualize</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--glass-sovereign-border)] flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-[var(--text-sovereign-muted)]">
            <Code className="h-4 w-4" /> NO-CODE BUILDER
          </div>
          <GlowButton variant="basic" size="sm">
            START BUILDING <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
        </div>
      </div>
    </GlassCard>
  );
}