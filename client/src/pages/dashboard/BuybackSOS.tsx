/**
 * Buyback - Sovereign OS (S.O.S.) Design
 * 
 * Revenue share and equity buyback program
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";

export default function BuybackSOS() {
  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 
          className="text-5xl font-bold lowercase mb-2"
          style={{ color: 'var(--color-sos-text)' }}
        >
          buyback program
        </h1>
        <p 
          className="text-lg lowercase"
          style={{ color: 'var(--color-sos-muted)' }}
        >
          revenue sharing and equity participation
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "your equity", value: "2.5%", icon: DollarSign },
          { label: "total payout", value: "$12,450", icon: TrendingUp },
          { label: "next payment", value: "14 days", icon: Calendar },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-sm)'
              }}
            >
              <Icon size={24} style={{ color: 'var(--color-sos-green)' }} className="mb-3" />
              <p 
                className="text-xs uppercase tracking-wider font-mono mb-2"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                {stat.label}
              </p>
              <p 
                className="text-3xl font-bold font-mono"
                style={{ color: 'var(--color-sos-text)' }}
              >
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
