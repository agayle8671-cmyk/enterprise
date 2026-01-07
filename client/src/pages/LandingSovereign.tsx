/**
 * Landing Page - SOVEREIGN AESTHETIC
 * Electric Concrete Design System
 */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Command, ArrowRight, Zap, Bot, Clock, Shield, ChevronRight } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { GravityCard, AnimatedBorder } from "@/components/Sovereign";

export default function LandingSovereign() {
  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-acid)]/20 backdrop-blur-xl bg-[var(--color-void)]/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--color-acid)] to-[var(--color-aurora-cyan)] flex items-center justify-center">
                <Command className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold font-mono">SOVEREIGN</span>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <button className="px-4 py-2 text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  DASHBOARD
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 py-2 text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  SIGN IN
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 py-2 text-sm font-mono font-medium rounded bg-[var(--color-acid)] text-black hover:bg-[var(--color-aurora-cyan)] transition-all">
                  GET STARTED
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--color-acid)]/30 bg-[var(--color-acid)]/10 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="h-4 w-4 text-[var(--color-acid)]" />
              <span className="text-sm font-mono text-[var(--color-acid)]">ELECTRIC CONCRETE v1.0</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6 leading-tight tracking-tighter">
              BUILD ON
              <br />
              <span className="text-[var(--color-acid)]">
                <TypewriterText 
                  phrases={["AUTOPILOT", "AI AGENTS", "AUTOMATION", "SOVEREIGNTY"]}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseTime={2000}
                />
              </span>
            </h1>

            <p className="text-xl text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto font-mono">
              // BRUTALLY EFFICIENT. ETHEREALLY SMOOTH.
              <br />
              Stop trading hours for dollars. Automate everything.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/dashboard">
                <button className="w-full sm:w-auto px-8 py-4 rounded bg-[var(--color-acid)] text-black font-mono font-bold hover:bg-[var(--color-aurora-cyan)] transition-all flex items-center gap-2 justify-center">
                  VIEW DASHBOARD
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link href="/auth">
                <button className="w-full sm:w-auto px-8 py-4 rounded border border-[var(--color-acid)]/30 text-[var(--color-acid)] font-mono font-bold hover:bg-[var(--color-acid)]/10 transition-all">
                  START FREE TRIAL
                </button>
              </Link>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] font-mono">
              NO CREDIT CARD • 14-DAY TRIAL • SOC 2 CERTIFIED
            </p>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="mt-20 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedBorder
              borderWidth={2}
              borderRadius={16}
              gradientColors={["var(--color-aurora-cyan)", "var(--color-aurora-purple)", "var(--color-aurora-cyan)"]}
              animationDuration={4}
              glowIntensity="high"
            >
              <div className="bg-[var(--color-structure)] p-8 rounded-2xl">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "HOURS SAVED", value: "23.5", color: "var(--color-acid)" },
                    { label: "TASKS AUTO", value: "156", color: "var(--color-aurora-cyan)" },
                    { label: "ROI", value: "340%", color: "var(--color-acid)" },
                    { label: "AGENTS", value: "12", color: "var(--color-aurora-cyan)" },
                  ].map((stat, i) => (
                    <GravityCard key={i} magneticRange={100}>
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[9px] text-[var(--color-text-muted)] font-mono mb-2">{stat.label}</div>
                        <div className="text-3xl font-bold font-mono" style={{ color: stat.color }}>
                          {stat.value}
                        </div>
                      </div>
                    </GravityCard>
                  ))}
                </div>

                {/* Live Indicator */}
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-acid)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-acid)]" />
                  </span>
                  <span className="text-xs font-mono text-[var(--color-acid)]">SYSTEM OPERATIONAL</span>
                </div>
              </div>
            </AnimatedBorder>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-6 border-t border-[var(--color-acid)]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 tracking-tight">
              RECLAIM YOUR
              <br />
              <span className="text-[var(--color-acid)]">SOVEREIGNTY</span>
            </h2>
            <p className="text-xl text-[var(--color-text-muted)] font-mono">
              AI AGENTS THAT WORK 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "AI AGENTS",
                description: "Deploy specialized agents for email, research, proposals, and more. They learn your style.",
              },
              {
                icon: Clock,
                title: "TIME AUDIT",
                description: "See exactly where hours go. DRIP framework identifies what to automate or eliminate.",
              },
              {
                icon: Shield,
                title: "SECURE",
                description: "Bank-level encryption, SOC 2 compliance. Your data stays yours. Zero compromise.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GravityCard magneticRange={150} magneticStrength={15}>
                  <div className="p-6 h-full border border-[var(--color-acid)]/20 rounded-lg bg-[var(--color-structure)] hover:border-[var(--color-acid)]/40 transition-all">
                    <div className="h-12 w-12 rounded-lg bg-[var(--color-acid)]/20 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-[var(--color-acid)]" />
                    </div>
                    <h3 className="text-xl font-bold font-mono mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] font-mono text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GravityCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 border-t border-[var(--color-acid)]/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 tracking-tight">
              READY TO RECLAIM
              <br />
              YOUR <span className="text-[var(--color-acid)]">TIME?</span>
            </h2>
            <p className="text-xl text-[var(--color-text-muted)] mb-10 font-mono">
              // JOIN 200+ OPERATORS WHO AUTOMATED THEIR WAY TO FREEDOM
            </p>
            <Link href="/auth">
              <button className="px-10 py-5 text-lg font-mono font-bold rounded bg-[var(--color-acid)] text-black hover:bg-[var(--color-aurora-cyan)] transition-all inline-flex items-center gap-2">
                START FREE TRIAL
                <ArrowRight className="h-6 w-6" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--color-acid)]/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--color-acid)] to-[var(--color-aurora-cyan)] flex items-center justify-center">
                <Command className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold font-mono">SOVEREIGN</span>
            </div>
            <div className="text-sm text-[var(--color-text-muted)] font-mono">
              © 2026 SOVEREIGN OS • ELECTRIC CONCRETE v1.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
