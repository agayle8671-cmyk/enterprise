/**
 * Landing Page - Sovereign Aesthetic
 * 
 * First impression with:
 * - Void background with aurora accents
 * - Terminal typography
 * - Glass navigation and cards
 * - Physics animations
 */

import { Link } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHYSICS } from "@/lib/animation-constants";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Play,
  Bot,
  Zap,
  Users,
  LineChart,
  Sparkles,
  Timer,
  Shield,
  Cpu,
  Terminal,
  Activity
} from "lucide-react";
import { GlowButton, GlassCard, AuroraBackground } from "@/components/GlassCard";
import { TypewriterText, ParticleField, PulseRing } from "@/components/Physics";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden" style={{ background: 'var(--color-void, #050505)' }}>
      {/* Particle Background */}
      <ParticleField count={40} color="var(--color-acid)" />

      {/* Navigation - Sovereign Glass */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <motion.div
          className="glass-panel px-6 py-3 flex items-center justify-between border border-[var(--glass-sovereign-border)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={PHYSICS.screenTransition}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[var(--color-acid)] flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="text-terminal text-lg text-[var(--color-acid)]">SOVEREIGN</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-terminal text-xs text-[var(--text-sovereign-muted)]">
            <a href="#how" className="hover:text-[var(--color-acid)] transition-colors">HOW IT WORKS</a>
            <a href="#pricing" className="hover:text-[var(--color-acid)] transition-colors">PRICING</a>
            <a href="#customers" className="hover:text-[var(--color-acid)] transition-colors">CUSTOMERS</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <button className="text-terminal text-xs text-[var(--text-sovereign-muted)] hover:text-[var(--color-acid)] px-4 py-2">
                SIGN IN
              </button>
            </Link>
            <Link href="/auth">
              <GlowButton variant="acid" size="sm">
                GET STARTED
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        {/* Aurora glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-40 blur-[100px]"
          style={{ background: 'radial-gradient(circle, var(--color-aurora-cyan) 0%, var(--color-aurora-purple) 50%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PHYSICS.screenTransition, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{
                  background: 'rgba(187, 255, 0, 0.1)',
                  border: '1px solid rgba(187, 255, 0, 0.3)'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Sparkles className="h-4 w-4 text-[var(--color-acid)]" />
                <span className="text-terminal text-xs text-[var(--color-acid)]">AI-POWERED AUTOMATION</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-sovereign-primary)] mb-6 leading-tight" style={{ letterSpacing: '-0.03em' }}>
                Stop trading
                <br />
                <span className="text-[var(--color-acid)]">hours for dollars.</span>
              </h1>

              <p className="text-lg text-[var(--text-sovereign-muted)] mb-10 max-w-lg leading-relaxed">
                Sovereign identifies what to automate, what to delegate,
                and what deserves your attention. Most operators reclaim
                <span className="text-[var(--color-acid)] font-bold"> 10+ hours </span>
                in their first month.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Link href="/auth">
                  <GlowButton variant="acid" size="lg">
                    START FREE TRIAL
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </Link>
                <button className="flex items-center gap-3 text-[var(--text-sovereign-muted)] hover:text-[var(--color-acid)] transition-colors group">
                  <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center">
                    <Play className="h-4 w-4 ml-0.5" />
                  </div>
                  <span className="text-terminal text-xs">WATCH DEMO</span>
                </button>
              </div>

              <p className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                No credit card • 14-day trial • Cancel anytime
              </p>
            </motion.div>

            {/* Hero Card */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...PHYSICS.screenTransition, delay: 0.4 }}
            >
              <GlassCard intensity="heavy" variant="aurora" glowing className="p-8">
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-aurora-purple)] rounded-full blur-3xl opacity-30" />

                <div className="flex items-center justify-between mb-8 relative">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[var(--color-acid)] flex items-center justify-center">
                      <Activity className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-terminal text-sm text-[var(--text-sovereign-primary)]">THIS WEEK</div>
                      <div className="text-xs text-[var(--text-sovereign-muted)]">Jan 1 – Jan 7, 2026</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>12.5 hrs</div>
                    <div className="text-terminal text-xs text-[var(--color-acid)]">RECLAIMED</div>
                  </div>
                </div>

                <div className="space-y-3 relative">
                  {[
                    { task: "Email triage", time: "4.2 hrs", icon: Bot },
                    { task: "Lead research", time: "3.8 hrs", icon: Cpu },
                    { task: "Invoice follow-ups", time: "2.1 hrs", icon: Timer },
                    { task: "Content repurposing", time: "2.4 hrs", icon: Sparkles },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between py-3 px-4 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-sovereign-border)' }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...PHYSICS.interaction, delay: 0.6 + i * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[rgba(187,255,0,0.15)] flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-[var(--color-acid)]" />
                        </div>
                        <span className="text-sm text-[var(--text-sovereign-primary)]">{item.task}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-terminal text-sm text-[var(--text-sovereign-muted)]">{item.time}</span>
                        <span className="text-terminal text-[10px] text-[var(--color-acid)] bg-[rgba(187,255,0,0.15)] px-2 py-1 rounded">
                          AUTOMATED
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16" style={{ borderTop: '1px solid var(--glass-sovereign-border)', borderBottom: '1px solid var(--glass-sovereign-border)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
              TRUSTED BY 200+ OPERATORS RUNNING $50K–$5M AGENCIES
            </p>
            <div className="flex items-center gap-12">
              {["ACME", "VERTEX", "NEXUS", "SCALE"].map((name, i) => (
                <span
                  key={name}
                  className="text-terminal text-lg text-[var(--text-sovereign-muted)] opacity-50 hover:opacity-100 hover:text-[var(--color-acid)] transition-all cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28" id="how">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            className="max-w-2xl mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-sovereign-primary)] mb-6">
              You're probably spending 60% of your time on work that
              <span className="text-[var(--color-acid)]"> doesn't grow your business.</span>
            </h2>
            <p className="text-lg text-[var(--text-sovereign-muted)]">
              Email, scheduling, research, follow-ups—it all adds up.
              Sovereign helps you see exactly where your time goes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "AUDIT YOUR WEEK", desc: "We map every task to our DRIP framework. You'll see exactly what's stealing your time." },
              { num: "02", title: "DEPLOY AI AGENTS", desc: "For tasks in the 'Replace' quadrant, we spin up AI agents that handle them 24/7." },
              { num: "03", title: "FOCUS ON WHAT MATTERS", desc: "Strategy. Relationships. Creative work. The stuff that actually grows your business." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...PHYSICS.screenTransition, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <GlassCard intensity="medium" className="p-8 h-full relative overflow-hidden">
                  <div className="absolute -top-4 -left-4 text-7xl font-bold text-[var(--color-acid)] opacity-10">
                    {step.num}
                  </div>
                  <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-3 relative">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-sovereign-muted)] leading-relaxed relative">
                    {step.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* DRIP Matrix */}
      < section className="py-28 relative" >
        <AuroraBackground intensity="subtle" className="absolute inset-0" />

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={PHYSICS.screenTransition}
              viewport={{ once: true }}
            >
              <p className="text-terminal text-xs text-[var(--color-acid)] mb-4">THE DRIP MATRIX</p>
              <h2 className="text-3xl font-bold text-[var(--text-sovereign-primary)] mb-6">
                A framework for deciding what deserves your attention
              </h2>
              <p className="text-lg text-[var(--text-sovereign-muted)] mb-10">
                Every task falls into one of four categories.
                The matrix makes the right choice obvious.
              </p>

              <div className="space-y-4">
                {[
                  { label: "DELEGATE", desc: "Low value, but someone else can do it", icon: Users, color: "var(--text-sovereign-muted)" },
                  { label: "REPLACE", desc: "Low value, and AI can handle it", icon: Bot, color: "var(--color-alarm)" },
                  { label: "INVEST", desc: "High value, but draining—find leverage", icon: LineChart, color: "var(--color-aurora-purple)" },
                  { label: "PRODUCE", desc: "High value, high energy—your zone", icon: Zap, color: "var(--color-acid)" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <span className="text-terminal text-sm" style={{ color: item.color }}>
                        {item.label}
                      </span>
                      <span className="text-[var(--text-sovereign-muted)]"> — {item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DRIP Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { q: "REPLACE", icon: Bot, color: "var(--color-alarm)", sub: "Email, admin, research" },
                { q: "PRODUCE", icon: Zap, color: "var(--color-acid)", sub: "Strategy, sales, creative" },
                { q: "DELEGATE", icon: Users, color: "var(--text-sovereign-muted)", sub: "Support, operations" },
                { q: "INVEST", icon: LineChart, color: "var(--color-aurora-purple)", sub: "Training, tools" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={PHYSICS.interaction}
                  viewport={{ once: true }}
                >
                  <GlassCard intensity="medium" className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <item.icon className="h-4 w-4" style={{ color: item.color }} />
                      <span className="text-terminal text-xs" style={{ color: item.color }}>
                        {item.q}
                      </span>
                    </div>
                    <div className="text-sm text-[var(--text-sovereign-muted)]">{item.sub}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Testimonial */}
      < section className="py-28" id="customers" >
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-[var(--text-sovereign-primary)] leading-relaxed mb-10">
              "I was working 60-hour weeks and burning out. Within two months of using Sovereign,
              I'd automated <span className="text-[var(--color-acid)] font-bold">15 hours of weekly busywork</span> and doubled my close rate."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[var(--color-acid)]" />
              <div className="text-left">
                <div className="text-sm font-medium text-[var(--text-sovereign-primary)]">Marcus Johnson</div>
                <div className="text-terminal text-xs text-[var(--text-sovereign-muted)]">FOUNDER, SCALE STUDIO • $1.2M ARR</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Pricing */}
      < section className="py-28" id="pricing" >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-sovereign-primary)] mb-4">Simple pricing</h2>
            <p className="text-lg text-[var(--text-sovereign-muted)]">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Starter */}
            <GlassCard intensity="medium" className="p-8">
              <div className="mb-6">
                <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-1">STARTER</h3>
                <p className="text-sm text-[var(--text-sovereign-muted)]">For solo operators</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[var(--text-sovereign-primary)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>$197</span>
                <span className="text-[var(--text-sovereign-muted)]">/month</span>
              </div>
              <Link href="/auth">
                <button className="w-full mb-6 h-12 rounded-lg text-terminal text-sm transition-colors"
                  style={{ border: '1px solid var(--glass-sovereign-border)', color: 'var(--text-sovereign-muted)' }}>
                  START FREE TRIAL
                </button>
              </Link>
              <ul className="space-y-3 text-sm text-[var(--text-sovereign-muted)]">
                {["Time audit dashboard", "3 AI agents", "DRIP Matrix analysis", "Email support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Pro */}
            <GlassCard intensity="heavy" variant="acid" glowing className="p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-terminal text-xs bg-[var(--color-acid)] text-black px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-terminal text-lg text-[var(--color-acid)] mb-1">PRO</h3>
                <p className="text-sm text-[var(--text-sovereign-muted)]">For agencies scaling up</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>$497</span>
                <span className="text-[var(--text-sovereign-muted)]">/month</span>
              </div>
              <Link href="/auth">
                <GlowButton variant="acid" className="w-full mb-6">
                  START FREE TRIAL
                </GlowButton>
              </Link>
              <ul className="space-y-3 text-sm text-[var(--text-sovereign-muted)]">
                {["Everything in Starter", "Unlimited AI agents", "Team seats (up to 5)", "Client portal", "Priority support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[var(--color-acid)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section >

      {/* FAQ */}
      < section className="py-28" >
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <h2 className="text-2xl font-bold text-[var(--text-sovereign-primary)] mb-12 text-center">Questions?</h2>
          <div className="space-y-0" style={{ borderTop: '1px solid var(--glass-sovereign-border)' }}>
            {[
              { q: "What exactly are AI agents?", a: "They're automated workflows that handle specific tasks—email triage, lead research, content repurposing. They run 24/7 and only notify you when they need a decision." },
              { q: "How long does setup take?", a: "Most users complete their time audit and deploy their first agent within an hour." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts, no commitments. Cancel with one click." },
              { q: "Do you integrate with my existing tools?", a: "We integrate with most CRMs, calendars, and communication tools." },
            ].map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: '1px solid var(--glass-sovereign-border)' }}
              >
                <button
                  className="w-full py-5 flex items-center justify-between text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-[var(--text-sovereign-primary)] group-hover:text-[var(--color-acid)] transition-colors">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-[var(--text-sovereign-muted)] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p
                      className="pb-5 text-[var(--text-sovereign-muted)] leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="py-28 relative overflow-hidden" >
        <AuroraBackground intensity="medium" className="absolute inset-0" />

        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-sovereign-primary)] mb-6">
              Ready to reclaim your time?
            </h2>
            <p className="text-lg text-[var(--text-sovereign-muted)] mb-10">
              Start with a free time audit. Takes 10 minutes. No credit card required.
            </p>
            <Link href="/auth">
              <GlowButton variant="acid" size="lg">
                START FREE TRIAL <ArrowRight className="ml-2 h-5 w-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      < footer className="py-10" style={{ borderTop: '1px solid var(--glass-sovereign-border)' }
      }>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-[var(--color-acid)] rounded-lg flex items-center justify-center">
                <Zap className="h-3 w-3 text-black" />
              </div>
              <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">© 2026 SOVEREIGN</span>
            </div>
            <div className="flex items-center gap-8 text-terminal text-xs text-[var(--text-sovereign-muted)]">
              <a href="#" className="hover:text-[var(--color-acid)] transition-colors">PRIVACY</a>
              <a href="#" className="hover:text-[var(--color-acid)] transition-colors">TERMS</a>
              <a href="#" className="hover:text-[var(--color-acid)] transition-colors">TWITTER</a>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
}
