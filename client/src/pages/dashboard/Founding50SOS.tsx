/**
 * Founding 50 - Sovereign OS (S.O.S.) Design
 * 
 * Exclusive founding member program
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { Sparkles, Crown, Users, TrendingUp } from "lucide-react";

export default function Founding50SOS() {
  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <Crown size={48} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 16px' }} />
        <h1 
          className="text-5xl font-bold lowercase mb-4"
          style={{ color: 'var(--color-sos-text)' }}
        >
          founding 50
        </h1>
        <p 
          className="text-xl lowercase"
          style={{ color: 'var(--color-sos-muted)' }}
        >
          join an exclusive community of 50 founding members
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border border-white/40 max-w-3xl mx-auto text-center"
        style={{
          background: 'var(--color-sos-panel)',
          boxShadow: 'var(--shadow-tactile-lg)'
        }}
      >
        <Sparkles size={64} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 24px' }} />
        <h2 className="text-3xl font-bold lowercase mb-4" style={{ color: 'var(--color-sos-text)' }}>
          lifetime access
        </h2>
        <p className="text-lg lowercase mb-8" style={{ color: 'var(--color-sos-muted)' }}>
          one-time payment • unlimited everything • founding member status
        </p>
        <TactileButton variant="primary" size="lg">
          claim your spot
        </TactileButton>
      </motion.div>
    </div>
  );
}
