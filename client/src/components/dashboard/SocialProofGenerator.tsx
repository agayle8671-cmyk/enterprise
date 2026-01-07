/**
 * Social Proof Generator - Sovereign Aesthetic
 * 
 * Synthetic testimonial curator
 */

import { MessageSquare, ThumbsUp, Star, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { GlassCard, GlowButton, SpotlightCard } from "@/components/GlassCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SocialProofGenerator() {
  return (
    <GlassCard intensity="medium" className="col-span-1 lg:col-span-1 h-full flex flex-col min-h-[400px]">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-sovereign-primary)]">SYNTHETIC SOCIAL PROOF</h3>
            <p className="text-xs text-[var(--text-sovereign-muted)]">
              AI-curated testimonials from channels.
            </p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--color-aurora-purple)] text-[var(--color-aurora-purple)] bg-[rgba(112,0,255,0.1)] flex items-center gap-1">
            <Star className="w-2 h-2 fill-current" /> BETA
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 pt-2 space-y-6">

        {/* Source Selector */}
        <div className="flex gap-2 p-1 bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg">
          <button className="flex-1 py-1.5 text-xs font-medium rounded bg-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] flex items-center justify-center gap-2">
            <MessageSquare className="w-3 h-3" /> SLACK
          </button>
          <button className="flex-1 py-1.5 text-xs font-medium rounded text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)] flex items-center justify-center gap-2">
            <MessageSquare className="w-3 h-3" /> EMAIL
          </button>
        </div>

        {/* Generated Card Preview */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-aurora-cyan)] to-[var(--color-aurora-purple)] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <SpotlightCard className="relative p-6 bg-black border border-[var(--glass-sovereign-border)]">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-10 w-10 border border-[var(--glass-sovereign-border)]">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-[var(--text-sovereign-primary)] text-sm">Michael Chen</h4>
                <p className="text-[10px] text-[var(--text-sovereign-muted)]">CTO @ NexusFlow</p>
              </div>
              <div className="ml-auto flex text-[var(--color-acid)]">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2 h-2 fill-current" />)}
              </div>
            </div>
            <p className="text-[var(--text-sovereign-secondary)] italic text-xs leading-relaxed">
              "Honestly, the <span className="bg-[rgba(187,255,0,0.1)] text-[var(--color-acid)] px-1">Inbox Sentinel agent</span> saved me about 12 hours this week alone. I was skeptical about AI, but this is actual magic."
            </p>
            <div className="mt-4 pt-4 border-t border-[var(--glass-sovereign-border)] flex items-center justify-between text-[10px] text-[var(--text-sovereign-muted)]">
              <span className="flex items-center"><ThumbsUp className="w-3 h-3 mr-1" /> Slack #general</span>
              <span>Verified by Sovereign OS</span>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
              <button className="px-3 py-1.5 text-xs bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] rounded hover:bg-white/10 flex items-center">
                <Copy className="w-3 h-3 mr-2" /> COPY
              </button>
              <button className="px-3 py-1.5 text-xs bg-[var(--color-acid)] text-black rounded font-bold hover:brightness-110 flex items-center">
                <CheckCircle className="w-3 h-3 mr-2" /> APPROVE
              </button>
            </div>
          </SpotlightCard>
        </div>

        <div className="text-center">
          <button className="text-xs text-[var(--text-sovereign-muted)] hover:text-[var(--color-acid)] flex items-center justify-center mx-auto transition-colors">
            <RefreshCw className="w-3 h-3 mr-2" /> SCAN NEW SENTIMENT
          </button>
        </div>

      </div>
    </GlassCard>
  );
}