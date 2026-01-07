/**
 * Sovereign OS (S.O.S.) - Cognitive Luxury Design System Showcase
 * 
 * Demonstrates the complete Neo-Tactile paradigm:
 * - Ceramic White color palette with Engineering Grey panels
 * - International Orange agent presence
 * - Neumorphic 2.0 depth and shadows
 * - Magnetic cursor with spring physics
 * - Haptic and acoustic feedback
 * - ReAct pattern visualization
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SOSNoiseOverlay,
  MagneticCursor,
  TactileButton,
  TactileIconButton,
  AgentThought,
  AgentThoughtStream,
  GhostAction,
  type AgentStage,
} from "@/components/Sovereign";
import { Play, Pause, Zap, Bot, Settings } from "lucide-react";

export default function SovereignOS() {
  const [agentActive, setAgentActive] = useState(false);
  const [thoughtHistory, setThoughtHistory] = useState<Array<{
    id: string;
    thought: string;
    stage: AgentStage;
    timestamp: number;
  }>>([]);

  const simulateAgentThinking = () => {
    setAgentActive(true);
    
    const thoughts = [
      { stage: 'perception' as AgentStage, thought: 'Analyzing user request...' },
      { stage: 'reasoning' as AgentStage, thought: 'Checking available resources and permissions' },
      { stage: 'action' as AgentStage, thought: 'Executing workflow automation' },
      { stage: 'observation' as AgentStage, thought: 'Task completed successfully' },
    ];

    thoughts.forEach((t, index) => {
      setTimeout(() => {
        setThoughtHistory(prev => [...prev, {
          id: `thought-${Date.now()}-${index}`,
          ...t,
          timestamp: Date.now()
        }]);
        
        if (index === thoughts.length - 1) {
          setTimeout(() => setAgentActive(false), 1000);
        }
      }, index * 2000);
    });
  };

  const clearThoughts = () => {
    setThoughtHistory([]);
  };

  return (
    <div 
      className="min-h-screen relative overflow-auto"
      style={{ 
        background: 'var(--color-sos-base)',
        color: 'var(--color-sos-text)'
      }}
    >
      {/* Matte Plastic Texture Overlay */}
      <SOSNoiseOverlay />
      
      {/* Magnetic Cursor */}
      <MagneticCursor agentActive={agentActive} />

      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 
            className="text-5xl font-bold lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            sovereign os
          </h1>
          <p 
            className="text-lg font-sans lowercase"
            style={{ color: 'var(--color-sos-muted)' }}
          >
            cognitive luxury design system • neo-tactile paradigm
          </p>
        </motion.header>

        {/* Color Palette Showcase */}
        <section className="space-y-6">
          <h2 
            className="text-2xl font-medium lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            field palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'ceramic white', var: '--color-sos-base', desc: 'main canvas' },
              { name: 'engineering grey', var: '--color-sos-panel', desc: 'sidebars' },
              { name: 'international orange', var: '--color-sos-soul', desc: 'agent soul' },
              { name: 'attack blue', var: '--color-sos-blue', desc: 'parameters' },
              { name: 'decay green', var: '--color-sos-green', desc: 'confirmations' },
              { name: 'soft charcoal', var: '--color-sos-text', desc: 'primary text' },
              { name: 'graphite', var: '--color-sos-muted', desc: 'metadata' },
              { name: 'deep anodize', var: '--color-sos-shadow', desc: 'shadows' },
            ].map((color) => (
              <div
                key={color.name}
                className="p-6 rounded-2xl border border-white/40 space-y-2"
                style={{
                  background: `var(${color.var})`,
                  boxShadow: 'var(--shadow-tactile-sm)',
                }}
              >
                <div className="h-16" />
                <p className="text-sm font-mono lowercase font-medium">{color.name}</p>
                <p className="text-xs lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                  {color.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Neumorphic Buttons */}
        <section className="space-y-6">
          <h2 
            className="text-2xl font-medium lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            tactile controls
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <TactileButton variant="default">
              default button
            </TactileButton>
            <TactileButton variant="primary">
              primary action
            </TactileButton>
            <TactileButton variant="secondary">
              secondary
            </TactileButton>
            <TactileButton variant="ghost">
              ghost button
            </TactileButton>
            
            <div className="flex gap-2">
              <TactileIconButton 
                icon={<Play size={18} />} 
                variant="primary"
              />
              <TactileIconButton 
                icon={<Pause size={18} />} 
                variant="secondary"
              />
              <TactileIconButton 
                icon={<Settings size={18} />} 
                variant="ghost"
              />
            </div>
          </div>
          <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
            hover for magnetic attraction • click for haptic feedback • subtle acoustic confirmation
          </p>
        </section>

        {/* Agent Visualization */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 
              className="text-2xl font-medium lowercase"
              style={{ color: 'var(--color-sos-text)' }}
            >
              agent visualization
            </h2>
            <div className="flex gap-2">
              <TactileButton
                variant="primary"
                onClick={simulateAgentThinking}
                disabled={agentActive}
              >
                <Bot size={18} className="mr-2" />
                simulate agent
              </TactileButton>
              <TactileButton
                variant="secondary"
                onClick={clearThoughts}
              >
                clear
              </TactileButton>
            </div>
          </div>

          {/* ReAct Pattern Visualization */}
          <div 
            className="p-8 rounded-2xl border border-white/40 min-h-[300px]"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)',
            }}
          >
            {thoughtHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-center lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                  click "simulate agent" to see the react pattern in action
                </p>
              </div>
            ) : (
              <AgentThoughtStream thoughts={thoughtHistory} />
            )}
          </div>
        </section>

        {/* Ghost Action Demo */}
        <section className="space-y-6">
          <h2 
            className="text-2xl font-medium lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            ghost actions
          </h2>
          <div 
            className="p-8 rounded-2xl border border-white/40"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)',
            }}
          >
            <GhostAction
              onConfirm={() => alert('Action confirmed!')}
              onReject={() => alert('Action rejected!')}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Example Document</h3>
                <p>This is a preview of what the agent will create...</p>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-lg bg-white/20" />
                  ))}
                </div>
              </div>
            </GhostAction>
          </div>
          <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
            preview agent actions before execution • transparent intent builds trust
          </p>
        </section>

        {/* Typography Showcase */}
        <section className="space-y-6">
          <h2 
            className="text-2xl font-medium lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            typography
          </h2>
          <div 
            className="p-8 rounded-2xl border border-white/40 space-y-6"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)',
            }}
          >
            <div>
              <p className="text-xs lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                naive headers (lowercase)
              </p>
              <h1 className="text-4xl font-bold lowercase">system settings</h1>
              <h2 className="text-2xl font-medium lowercase">agent memory</h2>
              <h3 className="text-xl font-medium lowercase">file browser</h3>
            </div>
            <div>
              <p className="text-xs lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                monospace data (precision)
              </p>
              <p className="font-mono text-lg">$1,234,567.89</p>
              <p className="font-mono text-sm">2026-01-07 05:32:58 UTC</p>
              <p className="font-mono text-sm">0xA3B9F...</p>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="space-y-6 pb-12">
          <h2 
            className="text-2xl font-medium lowercase"
            style={{ color: 'var(--color-sos-text)' }}
          >
            design principles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'cognitive luxury',
                desc: 'the ultimate luxury is absence of unnecessary information and presence of coherent meaning'
              },
              {
                title: 'neo-tactile',
                desc: 'digital objects should abide by coherent physics that mimics the real world'
              },
              {
                title: 'germane load',
                desc: 'maximize effort dedicated to learning and mastery, minimize extraneous visual noise'
              },
              {
                title: 'agent transparency',
                desc: 'international orange signals agent activity, visible reasoning builds trust'
              },
            ].map((principle) => (
              <div
                key={principle.title}
                className="p-6 rounded-2xl border border-white/40"
                style={{
                  background: 'var(--color-sos-base)',
                  boxShadow: 'var(--shadow-tactile-sm)',
                }}
              >
                <h3 className="text-lg font-medium lowercase mb-2">{principle.title}</h3>
                <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
