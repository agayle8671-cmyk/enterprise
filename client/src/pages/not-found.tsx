/**
 * 404 Not Found - Sovereign Aesthetic
 * 
 * "Signal Lost" error screen with:
 * - Glitch text effect
 * - Void background
 * - Navigation recovery options
 */

import { Link } from "wouter";
import { AlertTriangle, ArrowLeft, Home, Terminal } from "lucide-react";
import { GlowButton, GlassCard } from "@/components/GlassCard";
import { TypewriterText, ParticleField, PulseRing } from "@/components/Physics";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-void)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleField density={30} color="var(--color-alarm)" speed={0.5} />
      </div>

      {/* Main Content */}
      <GlassCard intensity="high" className="w-[500px] z-10 p-12 text-center border-[var(--color-alarm)] shadow-[0_0_50px_rgba(255,51,102,0.1)]">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-alarm)] blur-xl opacity-20 animate-pulse" />
            <AlertTriangle className="h-16 w-16 text-[var(--color-alarm)] relative z-10" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[var(--text-sovereign-primary)] mb-2 tracking-tighter">
          404
        </h1>

        <div className="h-8 mb-6 flex justify-center">
          <TypewriterText
            text="SIGNAL_LOST // COORDINATES_UNKNOWN"
            speed={30}
            cursor
            className="text-terminal text-[var(--color-alarm)]"
          />
        </div>

        <p className="text-[var(--text-sovereign-muted)] mb-8 font-light">
          The requested vector does not exist in this sector. The resource may have been relocated or decommissioned.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <GlowButton variant="acid" className="w-full justify-center">
              <Home className="h-4 w-4 mr-2" />
              RETURN TO BASE
            </GlowButton>
          </Link>

          <Link href="/dashboard">
            <button className="w-full py-3 rounded-lg border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] hover:bg-white/5 transition-colors flex items-center justify-center text-xs tracking-wider font-bold">
              <ArrowLeft className="h-3 w-3 mr-2" />
              DASHBOARD
            </button>
          </Link>
        </div>

        {/* Terminal Decorations */}
        <div className="mt-8 pt-6 border-t border-[var(--glass-sovereign-border)] flex justify-between text-[10px] text-[var(--text-sovereign-muted)] font-mono opacity-50">
          <span>SYS_ERR: 0x404</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-alarm)] animate-pulse" />
            OFFSET: NULL
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
