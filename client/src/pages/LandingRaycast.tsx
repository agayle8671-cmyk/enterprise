/**
 * Landing Page - Raycast-Inspired Design
 * 
 * Clean, minimal interface with:
 * - Smooth typewriter effects
 * - Subtle gradients and shadows
 * - Command-center aesthetic
 * - Polished micro-interactions
 */

import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Command,
  Zap,
  Bot,
  Clock,
  TrendingUp,
  Sparkles,
  Shield,
  Users,
  PlayCircle,
  ChevronRight,
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";

export default function LandingRaycast() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans antialiased">
      {/* Subtle gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 50%)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#080808]/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#FF6363]/20">
                <Command className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold" style={{ letterSpacing: '-0.02em' }}>
                Sovereign
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-[#989898]">
              <a href="#features" className="hover:text-[#EDEDED] transition-colors">
                Features
              </a>
              <a href="#pricing" className="hover:text-[#EDEDED] transition-colors">
                Pricing
              </a>
              <a href="#about" className="hover:text-[#EDEDED] transition-colors">
                About
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <button className="px-4 py-2 text-sm text-[#989898] hover:text-[#EDEDED] transition-colors">
                  Dashboard
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 py-2 text-sm text-[#989898] hover:text-[#EDEDED] transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href="/auth">
                <button 
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white shadow-lg shadow-[#FF6363]/20 hover:shadow-xl hover:shadow-[#FF6363]/30 transition-all"
                >
                  Get Started
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-[#FF6363]" />
              <span className="text-sm text-[#989898]">AI-Powered Automation Platform</span>
            </motion.div>

            {/* Headline with Typewriter */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Build your business on
              <br />
              <span className="bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] bg-clip-text text-transparent">
                <TypewriterText 
                  phrases={["autopilot", "AI agents", "automation", "intelligence"]}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseTime={2000}
                />
              </span>
            </h1>

            <p className="text-xl text-[#989898] mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop trading hours for dollars. Sovereign helps you automate repetitive work, 
              delegate strategically, and focus on what actually grows your business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/dashboard">
                <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white font-medium shadow-xl shadow-[#FF6363]/30 hover:shadow-2xl hover:shadow-[#FF6363]/40 transition-all flex items-center gap-2 justify-center">
                  View Dashboard
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link href="/auth">
                <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-[#EDEDED] font-medium hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
                  Start Free Trial
                </button>
              </Link>
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-[#EDEDED] font-medium hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </button>
            </div>

            <p className="text-sm text-[#989898]">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </motion.div>

          {/* Hero Visual - Command Panel Mockup */}
          <motion.div
            className="mt-20 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-20 bg-gradient-to-r from-[#FF6363]/20 via-[#8B5CF6]/20 to-[#FF6363]/20 blur-3xl opacity-50" />
              
              {/* Panel */}
              <div className="relative raycast-panel p-8 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Your Dashboard</div>
                      <div className="text-xs text-[#989898]">Last 7 days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                    </span>
                    <span className="text-xs text-[#22c55e] font-medium">Live</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Hours Saved", value: "23.5", icon: Clock, color: "#22c55e" },
                    { label: "Tasks Automated", value: "156", icon: Bot, color: "#FF6363" },
                    { label: "ROI", value: "340%", icon: TrendingUp, color: "#8B5CF6" },
                    { label: "Active Agents", value: "12", icon: Zap, color: "#ffc940" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                        <span className="text-xs text-[#989898]">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold" style={{ letterSpacing: '-0.02em' }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity List */}
                <div className="space-y-2">
                  {[
                    { task: "Processed 47 emails", agent: "Inbox Agent", time: "2m ago" },
                    { task: "Generated 3 proposals", agent: "Sales Agent", time: "12m ago" },
                    { task: "Researched 8 leads", agent: "Research Agent", time: "34m ago" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF6363]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-[#22c55e]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{item.task}</div>
                          <div className="text-xs text-[#989898]">{item.agent}</div>
                        </div>
                      </div>
                      <div className="text-xs text-[#989898]">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-6 border-t border-white/10" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.03em' }}>
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] bg-clip-text text-transparent">
                reclaim your time
              </span>
            </h2>
            <p className="text-xl text-[#989898] max-w-2xl mx-auto">
              Powerful AI agents that work 24/7, integrated into your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "AI Agents",
                description: "Deploy specialized agents for email, research, proposals, and more. They learn your style and work autonomously.",
                gradient: "from-[#FF6363] to-[#ff9f40]",
              },
              {
                icon: Clock,
                title: "Time Audit",
                description: "See exactly where your hours go. Our DRIP framework identifies what to automate, delegate, or eliminate.",
                gradient: "from-[#8B5CF6] to-[#ec4899]",
              },
              {
                icon: TrendingUp,
                title: "ROI Tracking",
                description: "Watch your time savings compound. Most users reclaim 10+ hours in their first month.",
                gradient: "from-[#22c55e] to-[#10b981]",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption, SOC 2 compliance, and granular access controls. Your data stays yours.",
                gradient: "from-[#3b82f6] to-[#06b6d4]",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share agents, delegate tasks, and track team productivity in one unified workspace.",
                gradient: "from-[#f59e0b] to-[#fbbf24]",
              },
              {
                icon: Zap,
                title: "Instant Deployment",
                description: "No complex setup. Connect your tools, define your workflow, and launch agents in minutes.",
                gradient: "from-[#ec4899] to-[#f43f5e]",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="raycast-panel p-6 h-full transition-all duration-300">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    style={{
                      boxShadow: hoveredFeature === i ? `0 8px 24px rgba(255, 99, 99, 0.4)` : undefined,
                    }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#989898] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-[#989898] uppercase tracking-wider">
              Trusted by 200+ operators running $50K–$5M businesses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sovereign gave me back 15 hours a week. Now I actually have time to work ON my business instead of IN it.",
                author: "Sarah Chen",
                role: "Founder, Scale Digital",
                savings: "15 hrs/week",
              },
              {
                quote: "The time audit was eye-opening. I was spending 40% of my week on tasks an AI could handle better.",
                author: "Marcus Rodriguez",
                role: "CEO, Vertex Agency",
                savings: "12 hrs/week",
              },
              {
                quote: "ROI was instant. By month 3, I'd automated enough to hire a full-time strategist instead of more operators.",
                author: "Emily Park",
                role: "Managing Director, Nexus",
                savings: "18 hrs/week",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="raycast-panel p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-[#ffc940]" />
                  ))}
                </div>
                <p className="text-[#EDEDED] mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-[#989898]">{testimonial.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#22c55e]">{testimonial.savings}</div>
                    <div className="text-xs text-[#989898]">saved</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.03em' }}>
              Ready to reclaim your time?
            </h2>
            <p className="text-xl text-[#989898] mb-10 max-w-2xl mx-auto">
              Join 200+ operators who've automated their way to freedom
            </p>
            <Link href="/auth">
              <button className="px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white shadow-2xl shadow-[#FF6363]/40 hover:shadow-3xl hover:shadow-[#FF6363]/50 transition-all inline-flex items-center gap-2">
                Start Your Free Trial
                <ArrowRight className="h-6 w-6" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center">
                <Command className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Sovereign</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-[#989898]">
              <a href="#" className="hover:text-[#EDEDED] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#EDEDED] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#EDEDED] transition-colors">Contact</a>
            </div>
            <div className="text-sm text-[#989898]">
              © 2026 Sovereign. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
