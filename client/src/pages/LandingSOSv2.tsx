/**
 * Landing Page - ALTOS (The Architecture of Focus)
 * 
 * Cognitive Luxury aesthetic with:
 * - Ceramic White background (#F4F4F0)
 * - International Orange CTAs (#FF4F00)
 * - Neo-Tactile claymorphic depth
 * - Magnetic interactions
 * - Transparent agent reasoning
 */

import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  SOSNoiseOverlay,
  MagneticCursor,
  TactileButton,
  AgentThought,
} from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { Bot, Zap, Shield, Sparkles, ArrowRight, CheckCircle, Clock, TrendingUp, Brain, Target, Star, Users } from "lucide-react";

export default function LandingSOSv2() {
  const [, setLocation] = useLocation();

  const problems = [
    {
      icon: "🔔",
      title: "notification hell",
      description: "your tools behave like paparazzi, fracturing focus to drive engagement metrics"
    },
    {
      icon: "🗂️",
      title: "feature bloat",
      description: "cluttered menus and unpredictable behaviors waste mental energy understanding the interface"
    },
    {
      icon: "☁️",
      title: "cloud dependency",
      description: "you're a tenant in your own business, relying on rented infrastructure that can be revoked"
    },
    {
      icon: "⏰",
      title: "time fragmentation",
      description: "context switching between tools kills deep work and creative flow states"
    }
  ];

  const solutions = [
    {
      icon: <Shield size={28} />,
      title: "cognitive luxury",
      tagline: "silence is the new luxury",
      description: "we drive extraneous cognitive load to near zero. no dopamine loops. no feature bloat. only what matters: your work.",
      stat: "94% reduction in cognitive load"
    },
    {
      icon: <Bot size={28} />,
      title: "transparent ai agents",
      tagline: "trust through visibility",
      description: "autonomous agents handle repetitive work while showing their reasoning in real-time. you direct, they execute.",
      stat: "20+ hours saved weekly"
    },
    {
      icon: <Zap size={28} />,
      title: "neo-tactile interface",
      tagline: "digital matter",
      description: "magnetic cursors, haptic feedback, and mechanical sounds create tangible interactions. your OS feels solid, not ethereal.",
      stat: "3x faster task completion"
    },
    {
      icon: <Sparkles size={28} />,
      title: "local-first sovereignty",
      tagline: "you own everything",
      description: "your data, your agents, your tools. no cloud dependency. no surveillance. true digital autonomy.",
      stat: "100% data ownership"
    }
  ];

  const benefits = [
    { text: "reclaim 20+ hours per week", icon: <Clock size={18} /> },
    { text: "eliminate 80% of busywork", icon: <Zap size={18} /> },
    { text: "scale without hiring", icon: <TrendingUp size={18} /> },
    { text: "work in uninterrupted flow", icon: <Brain size={18} /> },
    { text: "maintain full creative control", icon: <Target size={18} /> },
    { text: "protect your data sovereignty", icon: <Shield size={18} /> }
  ];

  const testimonials = [
    {
      quote: "ALTOS eliminated 80% of my agency workload. I've scaled to 7 figures with the same team size.",
      author: "Sarah Chen",
      role: "Creative Director, Chen Studios",
      metric: "$1.2M Revenue"
    },
    {
      quote: "The cognitive luxury concept is real. I can finally think clearly instead of fighting my tools.",
      author: "Marcus Rodriguez",
      role: "Freelance Developer",
      metric: "30 hrs/week saved"
    },
    {
      quote: "My clients get better work because I'm not drowning in busywork. ALTOS is my competitive advantage.",
      author: "Emma Thompson",
      role: "Brand Strategist",
      metric: "3x client capacity"
    }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'var(--color-sos-base)',
        color: 'var(--color-sos-text)'
      }}
    >
      <SOSNoiseOverlay />
      <MagneticCursor />

      {/* Quick Access Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-8 right-8 z-50"
      >
        <TactileButton
          variant="secondary"
          size="md"
          onClick={() => setLocation("/dashboard")}
        >
          skip to dashboard
          <ArrowRight size={16} className="ml-2" />
        </TactileButton>
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Logo/Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-3 rounded-full border border-white/40"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-sm)'
            }}
          >
            <span className="text-sm font-mono uppercase tracking-wider" style={{ color: 'var(--color-sos-soul)' }}>
              ALTOS
            </span>
          </motion.div>

          {/* Headline */}
          <h1 
            className="text-8xl md:text-9xl font-bold uppercase leading-none tracking-tighter mb-4"
            style={{ color: 'var(--color-sos-text)', letterSpacing: '-0.05em' }}
          >
            ALTOS
          </h1>
          <p 
            className="text-3xl md:text-4xl font-light lowercase tracking-wide"
            style={{ color: 'var(--color-sos-soul)' }}
          >
            the architecture of focus
          </p>

          {/* Manifesto Subheadline */}
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto lowercase leading-relaxed"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            the first operating system designed for elite freelancers who refuse to let their tools steal their focus.
          </p>
          
          {/* Value Props with Typewriter */}
          <div 
            className="text-lg md:text-xl max-w-2xl mx-auto lowercase pt-4"
            style={{ color: 'var(--color-sos-text)' }}
          >
            <TypewriterText
              phrases={[
                "reclaim 20+ hours per week with ai agents that think",
                "eliminate cognitive load with calm technology",
                "own your data, own your tools, own your mind",
                "scale your practice without sacrificing quality",
                "experience the luxury of uninterrupted focus"
              ]}
              typingSpeed={50}
              deletingSpeed={25}
              pauseTime={2800}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center pt-8">
            <TactileButton 
              variant="primary" 
              size="lg"
              onClick={() => setLocation("/auth")}
            >
              get started
              <ArrowRight size={20} className="ml-2" />
            </TactileButton>
            
            <TactileButton 
              variant="secondary" 
              size="lg"
              onClick={() => setLocation("/dashboard/sovereign-os")}
            >
              view design system
            </TactileButton>
          </div>

          {/* Agent Thought Demo with Live Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-12 relative"
          >
            <div className="mx-auto max-w-2xl p-6 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
                    style={{ backgroundColor: 'var(--color-sos-soul)' }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" 
                    style={{ backgroundColor: 'var(--color-sos-soul)' }} />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider" 
                  style={{ color: 'var(--color-sos-soul)' }}>
                  Agent Reasoning Live
                </span>
              </div>
              <div className="text-lg lowercase" style={{ color: 'var(--color-sos-text)' }}>
                <TypewriterText
                  phrases={[
                    "analyzing your workflow patterns to optimize productivity...",
                    "identifying high-value tasks that require human creativity...",
                    "delegating repetitive work to autonomous agents...",
                    "creating space for deep, focused thinking...",
                    "building your cognitive luxury environment..."
                  ]}
                  typingSpeed={50}
                  deletingSpeed={25}
                  pauseTime={2500}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* The Problem Section - AGITATE */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-5xl md:text-6xl font-bold lowercase mb-6"
            style={{ color: 'var(--color-sos-text)' }}
          >
            your tools are <span style={{ color: 'var(--color-sos-soul)' }}>stealing</span> your focus
          </h2>
          <p 
            className="text-xl lowercase max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            they call it "engagement." we call it theft. the modern freelancer's workspace has become a carnival of distraction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-red-900/20"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.03) 0%, rgba(0,0,0,0.01) 100%)',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.08)'
              }}
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold lowercase mb-3" style={{ color: 'var(--color-sos-text)' }}>
                {problem.title}
              </h3>
              <p className="lowercase leading-relaxed" style={{ color: 'var(--color-sos-muted)' }}>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Solution Section - MAIN VALUE PROP */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 
            className="text-5xl md:text-7xl font-bold lowercase mb-6"
            style={{ color: 'var(--color-sos-text)' }}
          >
            introducing <span style={{ color: 'var(--color-sos-soul)' }}>cognitive luxury</span>
          </h2>
          <p 
            className="text-2xl lowercase max-w-4xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            true luxury is not what you add—it's what you take away. silence between the notes. the clean desk. the unfragmented mind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-10 rounded-3xl border border-white/40 group hover:border-white/60 transition-all duration-300"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-lg)'
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  background: 'var(--color-sos-soul)',
                  boxShadow: 'var(--shadow-agent-glow)'
                }}
              >
                {solution.icon}
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                  {solution.title}
                </h3>
                <p className="text-sm uppercase tracking-wider font-mono" style={{ color: 'var(--color-sos-soul)' }}>
                  {solution.tagline}
                </p>
              </div>
              <p className="lowercase leading-relaxed mb-6" style={{ color: 'var(--color-sos-muted)' }}>
                {solution.description}
              </p>
              <div 
                className="inline-block px-4 py-2 rounded-lg text-sm font-mono"
                style={{
                  background: 'var(--color-sos-base)',
                  color: 'var(--color-sos-soul)',
                  border: '1px solid rgba(255, 79, 0, 0.2)'
                }}
              >
                {solution.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 
            className="text-5xl md:text-6xl font-bold lowercase mb-6"
            style={{ color: 'var(--color-sos-text)' }}
          >
            trusted by elite <span style={{ color: 'var(--color-sos-soul)' }}>freelancers</span>
          </h2>
          <p 
            className="text-xl lowercase max-w-2xl mx-auto"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            join the freelancers who've reclaimed their time and scaled their practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-8 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-sos-soul)" color="var(--color-sos-soul)" />
                ))}
              </div>
              <p className="text-base lowercase leading-relaxed mb-6 italic" style={{ color: 'var(--color-sos-text)' }}>
                "{testimonial.quote}"
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="font-semibold lowercase" style={{ color: 'var(--color-sos-text)' }}>
                  {testimonial.author}
                </p>
                <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                  {testimonial.role}
                </p>
                <div 
                  className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono"
                  style={{
                    background: 'var(--color-sos-soul)',
                    color: 'white'
                  }}
                >
                  {testimonial.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-5xl md:text-6xl font-bold lowercase mb-6"
            style={{ color: 'var(--color-sos-text)' }}
          >
            what you'll <span style={{ color: 'var(--color-sos-soul)' }}>achieve</span>
          </h2>
          <p 
            className="text-xl lowercase max-w-2xl mx-auto"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            real results from real freelancers using ALTOS
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-4 p-6 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-sm)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'var(--color-sos-soul)',
                  boxShadow: 'var(--shadow-agent-glow)'
                }}
              >
                {benefit.icon}
              </div>
              <span className="text-base lowercase font-medium" style={{ color: 'var(--color-sos-text)' }}>
                {benefit.text}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Color Palette Showcase */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold lowercase mb-4"
            style={{ color: 'var(--color-sos-text)' }}
          >
            field palette
          </h2>
          <p 
            className="text-lg lowercase"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            ceramic white base • international orange agent
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'ceramic white', bg: 'var(--color-sos-base)' },
            { name: 'engineering grey', bg: 'var(--color-sos-panel)' },
            { name: 'international orange', bg: 'var(--color-sos-soul)' },
            { name: 'attack blue', bg: 'var(--color-sos-blue)' },
          ].map((color) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-2xl border border-white/40 p-6 flex items-end"
              style={{
                background: color.bg,
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <span 
                className="text-sm font-mono lowercase"
                style={{ 
                  color: color.name === 'ceramic white' ? 'var(--color-sos-text)' : 
                         color.name === 'engineering grey' ? 'var(--color-sos-text)' : 
                         'white'
                }}
              >
                {color.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA - STRONG CONVERSION */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-10 p-16 md:p-20 rounded-3xl border border-white/60"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-lg)'
          }}
        >
          <h2 
            className="text-6xl md:text-7xl font-bold lowercase leading-tight"
            style={{ color: 'var(--color-sos-text)' }}
          >
            own your data.<br />
            own your tools.<br />
            <span style={{ color: 'var(--color-sos-soul)' }}>own your mind.</span>
          </h2>
          
          <p 
            className="text-2xl lowercase max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            stop renting your digital workspace. stop being the product. stop sacrificing focus for features.
          </p>

          <p 
            className="text-xl lowercase max-w-2xl mx-auto font-medium"
            style={{ color: 'var(--color-sos-text)' }}
          >
            ALTOS is the first freelancing operating system designed for cognitive luxury. join the elite who've chosen sovereignty over convenience.
          </p>

          <div className="flex flex-wrap gap-6 justify-center pt-6">
            <TactileButton 
              variant="primary" 
              size="lg"
              onClick={() => setLocation("/auth")}
            >
              start free trial
              <ArrowRight size={22} className="ml-2" />
            </TactileButton>
            
            <TactileButton 
              variant="secondary" 
              size="lg"
              onClick={() => setLocation("/dashboard")}
            >
              explore demo
            </TactileButton>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} style={{ color: 'var(--color-sos-green)' }} />
              <span>no credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} style={{ color: 'var(--color-sos-green)' }} />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} style={{ color: 'var(--color-sos-green)' }} />
              <span>cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 mt-24">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
              © 2026 altos • the architecture of focus
            </p>
            <p className="text-xs lowercase mt-2" style={{ color: 'var(--color-sos-muted)' }}>
              neo-tactile paradigm • neumorphism 2.0 • react pattern visualization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
