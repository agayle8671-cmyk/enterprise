import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronDown, Play, Bot, Zap, Users, LineChart, Sparkles, Timer, Shield, Cpu } from "lucide-react";
import { useState } from "react";
import { WaveText } from "@/components/WaveText";
import { MusicalType } from "@/components/TypewriterText";
import { motion } from "framer-motion";
import { PHYSICS } from "@/lib/animation-constants";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-60" />

      {/* Navigation - Floating Glass */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <motion.div
          className="liquid-glass-subtle px-6 py-3 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={PHYSICS.screenTransition}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
              S
            </div>
            <span className="font-semibold text-lg text-foreground">Sovereign</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#customers" className="hover:text-foreground transition-colors">Customers</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" disablePhysics>
                Sign in
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-gradient-primary text-white rounded-full px-5 shadow-lg shadow-primary/25">
                Get started
              </Button>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero - Dramatic Dark */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        {/* Hero glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-40 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PHYSICS.screenTransition, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...PHYSICS.interaction, delay: 0.3 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Automation</span>
              </motion.div>

              <h1 className="text-display text-foreground mb-6">
                Stop trading
                <br />
                <span className="text-gradient-hero">hours for dollars.</span>
              </h1>

              <p className="text-body-large mb-10 max-w-lg">
                Sovereign helps you identify what to automate, what to delegate,
                and what deserves your attention. Most users reclaim
                <span className="text-foreground font-semibold"> 10+ hours </span>
                in their first month.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Link href="/auth">
                  <Button size="lg" className="bg-gradient-primary text-white h-14 px-8 rounded-full text-base font-medium shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all">
                    Start free trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <button className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="h-12 w-12 rounded-full liquid-glass-subtle flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="h-4 w-4 ml-0.5" />
                  </div>
                  <span className="text-sm font-medium">Watch demo</span>
                </button>
              </div>

              <p className="text-caption">
                No credit card required · 14-day trial · Cancel anytime
              </p>
            </motion.div>

            {/* Hero Card - Floating Glass */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ ...PHYSICS.screenTransition, delay: 0.4 }}
            >
              <div className="liquid-glass-heavy p-8 float-glow">
                {/* Glow accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />

                <div className="flex items-center justify-between mb-8 relative">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-primary rounded-2xl shadow-lg shadow-primary/30" />
                    <div>
                      <div className="text-base font-semibold text-foreground">This week</div>
                      <div className="text-sm text-muted-foreground">Jan 1 – Jan 7, 2026</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-foreground tracking-tight">12.5 hrs</div>
                    <div className="text-sm font-medium text-success">reclaimed</div>
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
                      className="flex items-center justify-between py-4 px-5 glass-card"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...PHYSICS.interaction, delay: 0.6 + i * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{item.task}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{item.time}</span>
                        <span className="text-xs font-medium text-success bg-success/15 px-3 py-1.5 rounded-full">
                          Automated
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - Glowing logos */}
      <section className="py-16 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-sm text-muted-foreground">Trusted by 200+ operators running $50K–$5M agencies</p>
            <div className="flex items-center gap-12">
              {["Acme", "Vertex", "Nexus", "Scale"].map((name, i) => (
                <motion.span
                  key={name}
                  className="text-lg font-semibold text-muted/50 hover:text-muted-foreground transition-colors cursor-default"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution - 3 Steps */}
      <section className="py-28" id="how">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            className="max-w-2xl mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-foreground mb-6">
              You're probably spending 60% of your time on work that
              <span className="text-gradient-hero"> doesn't grow your business.</span>
            </h2>
            <p className="text-body-large">
              Email, scheduling, research, follow-ups—it all adds up.
              Sovereign helps you see exactly where your time goes, then systematically
              eliminates the tasks that drain you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Audit your week", desc: "We map every task to our DRIP framework. You'll see exactly what's stealing your time." },
              { num: "02", title: "Deploy AI agents", desc: "For tasks in the \"Replace\" quadrant, we spin up AI agents that handle them 24/7." },
              { num: "03", title: "Focus on what matters", desc: "Strategy. Relationships. Creative work. The stuff that actually grows your business." },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="glass-card p-8 relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...PHYSICS.screenTransition, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-4 -left-4 text-7xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-title text-foreground mb-3 relative">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIP Matrix - Dramatic Feature Section */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={PHYSICS.screenTransition}
              viewport={{ once: true }}
            >
              <p className="text-caption text-primary mb-4">The DRIP Matrix</p>
              <h2 className="text-headline text-foreground mb-6">
                A framework for deciding what deserves your attention
              </h2>
              <p className="text-body-large mb-10">
                Every task falls into one of four categories.
                The matrix makes the right choice obvious.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Delegate", desc: "Low value, but someone else can do it", icon: Users, color: "text-muted-foreground" },
                  { label: "Replace", desc: "Low value, and AI can handle it", icon: Bot, color: "text-destructive" },
                  { label: "Invest", desc: "High value, but draining—find leverage", icon: LineChart, color: "text-warning" },
                  { label: "Produce", desc: "High value, high energy—your zone", icon: Zap, color: "text-success" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ ...PHYSICS.interaction, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`h-10 w-10 rounded-xl bg-card flex items-center justify-center ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{item.label}</span>
                      <span className="text-muted-foreground"> — {item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DRIP Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { quadrant: "Replace", icon: Bot, gradient: "from-destructive/20 to-destructive/5", text: "text-destructive", titles: ["AI Agents", "Automation"], sub: "Email, admin, research" },
                { quadrant: "Produce", icon: Zap, gradient: "from-success/20 to-success/5", text: "text-success", titles: ["You", "Your genius"], sub: "Strategy, sales, creative" },
                { quadrant: "Delegate", icon: Users, gradient: "from-muted/20 to-muted/5", text: "text-muted-foreground", titles: ["Team / VA", "Contractors"], sub: "Support, operations" },
                { quadrant: "Invest", icon: LineChart, gradient: "from-warning/20 to-warning/5", text: "text-warning", titles: ["Systems", "Templates"], sub: "Training, tools" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className={`glass-card p-6 bg-gradient-to-br ${item.gradient} glow-border`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={PHYSICS.interaction}
                  viewport={{ once: true }}
                >
                  <div className={`flex items-center gap-2 mb-3 ${item.text}`}>
                    <item.icon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{item.quadrant}</span>
                  </div>
                  <div className="text-xl font-bold text-foreground mb-1">
                    <MusicalType words={item.titles} baseDelay={i * 500} />
                  </div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Centered Quote */}
      <section className="py-28" id="customers">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl text-foreground leading-relaxed font-light mb-10">
              "I was working 60-hour weeks and burning out. Within two months of using Sovereign,
              I'd automated <span className="text-primary font-medium">15 hours of weekly busywork</span> and doubled my close rate."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-primary shadow-lg shadow-primary/30" />
              <div className="text-left">
                <div className="font-semibold text-foreground">Marcus Johnson</div>
                <div className="text-sm text-muted-foreground">Founder, Scale Studio · $1.2M ARR</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing - Glass Cards */}
      <section className="py-28" id="pricing">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-headline text-foreground mb-4">Simple pricing</h2>
            <p className="text-body-large">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Starter */}
            <motion.div
              className="glass-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={PHYSICS.screenTransition}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">Starter</h3>
                <p className="text-sm text-muted-foreground">For solo operators</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">$197</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Link href="/auth">
                <Button variant="outline" className="w-full mb-6 h-12 rounded-full border-border/50">
                  Start free trial
                </Button>
              </Link>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Time audit dashboard", "3 AI agents", "DRIP Matrix analysis", "Email support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-muted" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pro - Highlighted */}
            <motion.div
              className="liquid-glass-heavy p-8 relative glow-border animate-glow-pulse"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...PHYSICS.screenTransition, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-xs font-semibold bg-gradient-primary text-white px-4 py-1.5 rounded-full shadow-lg shadow-primary/30">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">Pro</h3>
                <p className="text-sm text-muted-foreground">For agencies scaling up</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">$497</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Link href="/auth">
                <Button className="w-full mb-6 h-12 rounded-full bg-gradient-primary text-white shadow-lg shadow-primary/30">
                  Start free trial
                </Button>
              </Link>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Everything in Starter", "Unlimited AI agents", "Team seats (up to 5)", "Client portal", "Priority support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <h2 className="text-2xl font-semibold text-foreground mb-12 text-center">Questions?</h2>
          <div className="space-y-0 border-t border-border/30">
            {[
              { q: "What exactly are AI agents?", a: "They're automated workflows that handle specific tasks—email triage, lead research, content repurposing. They run 24/7 and only notify you when they need a decision." },
              { q: "How long does setup take?", a: "Most users complete their time audit and deploy their first agent within an hour. We guide you through the whole process." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts, no commitments. Cancel with one click." },
              { q: "Do you integrate with my existing tools?", a: "We integrate with most CRMs, calendars, and communication tools. We ship new integrations weekly." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="border-b border-border/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full py-5 flex items-center justify-between text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.p
                    className="pb-5 text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={PHYSICS.interaction}
                  >
                    {faq.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Gradient Background */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />

        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-foreground mb-6">
              Ready to reclaim your time?
            </h2>
            <p className="text-body-large mb-10">
              Start with a free time audit. Takes 10 minutes. No credit card required.
            </p>
            <Link href="/auth">
              <Button size="lg" className="bg-gradient-primary text-white h-14 px-10 rounded-full text-base font-medium shadow-xl shadow-primary/30">
                Start free trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-gradient-primary rounded-lg" />
              <span className="text-sm text-muted-foreground">© 2026 Sovereign</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
