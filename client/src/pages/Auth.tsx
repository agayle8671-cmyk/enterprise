/**
 * Auth Page - Sovereign Aesthetic
 * 
 * Login screen with:
 * - Void background
 * - Glass panel form
 * - Aurora accents
 * - Physics animations
 */

import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Terminal, Sparkles, ArrowRight } from "lucide-react";
import { GlowButton, GlassCard, AuroraBackground } from "@/components/GlassCard";
import { TypewriterText, ParticleField, PulseRing } from "@/components/Physics";
import { PHYSICS } from "@/lib/animation-constants";
import generatedImage from "@assets/generated_images/abstract_enterprise_technology_background_with_dark_slate_and_purple_gradients.png";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2" style={{ background: 'var(--color-void, #050505)' }}>
      {/* Left Panel - Visual */}
      <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={generatedImage}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-void), transparent)' }} />
        </div>

        {/* Particle field */}
        <ParticleField count={30} color="var(--color-acid)" />

        {/* Aurora glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] pointer-events-none opacity-30 blur-[80px]"
          style={{ background: 'radial-gradient(circle, var(--color-aurora-cyan) 0%, var(--color-aurora-purple) 50%, transparent 70%)' }}
        />

        {/* Logo */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={PHYSICS.screenTransition}
        >
          <div className="h-12 w-12 bg-[var(--color-acid)] rounded-xl flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-black" />
          </div>
          <h2 className="text-terminal text-2xl text-[var(--color-acid)]">SOVEREIGN</h2>
          <p className="text-terminal text-xs text-[var(--text-sovereign-muted)] mt-1">OPERATING SYSTEM v1.0</p>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="relative z-10 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...PHYSICS.screenTransition, delay: 0.3 }}
        >
          <GlassCard intensity="light" className="p-6">
            <blockquote className="text-lg text-[var(--text-sovereign-primary)] leading-relaxed mb-6">
              "Sovereign OS didn't just organize my agency, it eliminated 80% of my workload. I've scaled to
              <span className="text-[var(--color-acid)] font-bold"> $2M ARR </span>
              while working 20 hours a week."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-aurora-cyan)] flex items-center justify-center">
                <span className="text-black font-bold text-sm">AS</span>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-sovereign-primary)]">Alex Smith</div>
                <div className="text-terminal text-xs text-[var(--text-sovereign-muted)]">FOUNDER, SCALE SYSTEMS</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 relative">
        {/* Mobile particles */}
        <div className="md:hidden absolute inset-0">
          <ParticleField count={20} color="var(--color-acid)" />
        </div>

        <motion.div
          className="w-full max-w-sm mx-auto space-y-8 relative z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={PHYSICS.screenTransition}
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-terminal text-3xl text-[var(--text-sovereign-primary)]">
              SYSTEM ACCESS
            </h1>
            <p className="text-[var(--text-sovereign-muted)]">
              Enter credentials to access your workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="operator@company.com"
                className="w-full h-12 px-4 rounded-lg bg-[var(--color-structure)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] placeholder:text-[var(--text-sovereign-muted)] outline-none focus:border-[var(--color-acid)] transition-colors"
                style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                  PASSWORD
                </label>
                <a href="#" className="text-terminal text-xs text-[var(--color-acid)] hover:underline">
                  FORGOT?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-12 px-4 rounded-lg bg-[var(--color-structure)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] placeholder:text-[var(--text-sovereign-muted)] outline-none focus:border-[var(--color-acid)] transition-colors"
                style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-[var(--glass-sovereign-border)] bg-[var(--color-structure)] text-[var(--color-acid)] focus:ring-[var(--color-acid)]"
              />
              <label htmlFor="remember" className="text-sm text-[var(--text-sovereign-muted)]">
                Remember for 30 days
              </label>
            </div>

            <GlowButton
              type="submit"
              variant="acid"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  AUTHENTICATING...
                </div>
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </GlowButton>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full" style={{ borderTop: '1px solid var(--glass-sovereign-border)' }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-terminal text-xs text-[var(--text-sovereign-muted)]" style={{ background: 'var(--color-void)' }}>
                OR
              </span>
            </div>
          </div>

          {/* Fast Track */}
          <motion.button
            type="button"
            className="w-full h-12 rounded-lg text-terminal text-sm flex items-center justify-center gap-2 transition-colors"
            style={{
              border: '1px solid var(--glass-sovereign-border)',
              color: 'var(--text-sovereign-muted)'
            }}
            whileHover={{
              borderColor: 'var(--color-aurora-cyan)',
              color: 'var(--color-aurora-cyan)'
            }}
            onClick={() => setLocation("/dashboard")}
          >
            <Terminal className="h-4 w-4" />
            ADMIN FAST TRACK
          </motion.button>

          <p className="text-center text-sm text-[var(--text-sovereign-muted)]">
            Don't have an account?{" "}
            <Link href="/" className="text-[var(--color-acid)] hover:underline">
              APPLY FOR ACCESS
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}