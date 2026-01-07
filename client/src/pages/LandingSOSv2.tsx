/**
 * Landing Page - Sovereign OS (S.O.S.) Design
 * 
 * Cognitive Luxury aesthetic with:
 * - Ceramic White background
 * - International Orange CTAs
 * - Neumorphic depth
 * - Tactile interactions
 * - Agent presence visualization
 */

import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  SOSNoiseOverlay,
  MagneticCursor,
  TactileButton,
  AgentThought,
} from "@/components/Sovereign";
import { Bot, Zap, Shield, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

export default function LandingSOSv2() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: <Bot size={24} />,
      title: "agentic ai",
      description: "autonomous agents that think, reason, and act on your behalf with full transparency"
    },
    {
      icon: <Zap size={24} />,
      title: "neo-tactile interface",
      description: "spring physics, magnetic cursors, and haptic feedback create substance in digital space"
    },
    {
      icon: <Shield size={24} />,
      title: "cognitive luxury",
      description: "absence of noise, presence of meaning. designed to maximize learning, minimize distraction"
    },
    {
      icon: <Sparkles size={24} />,
      title: "react visualization",
      description: "see your agent's reasoning process in real-time with international orange clarity"
    }
  ];

  const benefits = [
    "neumorphic depth with architectural lighting",
    "ceramic white aesthetic reduces eye strain",
    "haptic and acoustic feedback for every interaction",
    "transparent agent reasoning builds trust",
    "progressive disclosure minimizes cognitive load",
    "spatial memory through infinite canvas"
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
              sovereign os
            </span>
          </motion.div>

          {/* Headline */}
          <h1 
            className="text-7xl md:text-8xl font-bold lowercase leading-tight"
            style={{ color: 'var(--color-sos-text)' }}
          >
            cognitive luxury
            <br />
            <span style={{ color: 'var(--color-sos-soul)' }}>for agentic ai</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto lowercase"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            the first operating system designed for humans directing autonomous agents.
            neo-tactile interactions meet transparent reasoning.
          </p>

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

          {/* Agent Thought Demo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-12 relative"
          >
            <AgentThought
              thought="analyzing your workflow patterns to optimize productivity..."
              stage="reasoning"
              className="mx-auto max-w-xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold lowercase mb-4"
            style={{ color: 'var(--color-sos-text)' }}
          >
            designed for sovereignty
          </h2>
          <p 
            className="text-lg lowercase max-w-2xl mx-auto"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            every element serves the executive directing an autonomous system
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: 'var(--color-sos-base)',
                  color: 'var(--color-sos-soul)',
                  boxShadow: 'var(--shadow-tactile-sm)'
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold lowercase mb-3" style={{ color: 'var(--color-sos-text)' }}>
                {feature.title}
              </h3>
              <p className="lowercase leading-relaxed" style={{ color: 'var(--color-sos-muted)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
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
            why cognitive luxury?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'var(--color-sos-base)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CheckCircle size={20} style={{ color: 'var(--color-sos-green)', flexShrink: 0, marginTop: 2 }} />
              <span className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
                {benefit}
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

      {/* Final CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 p-16 rounded-3xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-lg)'
          }}
        >
          <h2 
            className="text-5xl md:text-6xl font-bold lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            ready to experience
            <br />
            <span style={{ color: 'var(--color-sos-soul)' }}>cognitive luxury?</span>
          </h2>
          
          <p 
            className="text-xl lowercase max-w-2xl mx-auto"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            join the first operating system designed for the age of autonomous agents
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <TactileButton 
              variant="primary" 
              size="lg"
              onClick={() => setLocation("/auth")}
            >
              get started free
              <ArrowRight size={20} className="ml-2" />
            </TactileButton>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 mt-24">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
              © 2026 sovereign os • cognitive luxury design system
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
