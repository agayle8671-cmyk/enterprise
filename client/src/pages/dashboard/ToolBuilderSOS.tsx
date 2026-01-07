/**
 * Tool Builder - Sovereign OS (S.O.S.) Design
 * 
 * Create custom tools and automations
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { Wrench, Plus, Code, Zap } from "lucide-react";

export default function ToolBuilderSOS() {
  const tools = [
    { name: "lead qualifier", type: "automation", status: "active", uses: 234 },
    { name: "proposal generator", type: "template", status: "active", uses: 89 },
    { name: "roi calculator", type: "interactive", status: "draft", uses: 0 },
  ];

  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
            tool builder
          </h1>
          <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
            create custom tools and automations
          </p>
        </div>
        <TactileButton variant="primary">
          <Plus size={18} className="mr-2" />
          new tool
        </TactileButton>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-white/40"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)'
            }}
          >
            <Wrench size={24} style={{ color: 'var(--color-sos-blue)' }} className="mb-4" />
            <h3 className="text-xl font-semibold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
              {tool.name}
            </h3>
            <p className="text-sm lowercase mb-4" style={{ color: 'var(--color-sos-muted)' }}>
              {tool.type} • {tool.status} • {tool.uses} uses
            </p>
            <TactileButton variant="secondary" className="w-full" size="sm">
              configure
            </TactileButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
