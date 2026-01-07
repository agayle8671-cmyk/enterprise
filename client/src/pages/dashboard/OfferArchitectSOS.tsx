/**
 * Offer Architect - Sovereign OS (S.O.S.) Design
 * 
 * Design and structure high-value offers
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { Package, Plus, DollarSign, Zap, Star } from "lucide-react";

export default function OfferArchitectSOS() {
  const offers = [
    {
      name: "premium consulting package",
      price: "$15,000",
      tier: "high-ticket",
      components: 5,
      conversion: "23%"
    },
    {
      name: "done-for-you automation",
      price: "$8,500",
      tier: "mid-ticket",
      components: 4,
      conversion: "31%"
    },
    {
      name: "strategy intensive",
      price: "$3,000",
      tier: "entry",
      components: 3,
      conversion: "45%"
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
              offer architect
            </h1>
            <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
              design irresistible high-value offers
            </p>
          </div>
          <TactileButton variant="primary">
            <Plus size={18} className="mr-2" />
            new offer
          </TactileButton>
        </div>
        
        {/* Live Offer Performance */}
        <div className="p-4 rounded-xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-sm)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} style={{ color: 'var(--color-sos-green)' }} />
            <span className="text-xs font-mono uppercase tracking-wider" 
              style={{ color: 'var(--color-sos-green)' }}>
              Offer Intelligence
            </span>
          </div>
          <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
            <TypewriterText
              phrases={[
                "premium package: 23% conversion rate, $15k average",
                "mid-ticket automation: highest velocity at 31% conversion",
                "entry intensive converting 45% - excellent lead magnet",
                "total offer portfolio value: $26,500 average deal size",
                "optimal pricing: test $12k tier for premium segment"
              ]}
              typingSpeed={38}
              deletingSpeed={19}
              pauseTime={3200}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-white/40"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <Package size={24} style={{ color: 'var(--color-sos-soul)' }} />
              <span 
                className="text-xs uppercase tracking-wider font-mono px-2 py-1 rounded"
                style={{ background: 'var(--color-sos-soul)', color: 'white' }}
              >
                {offer.tier}
              </span>
            </div>
            <h3 className="text-xl font-semibold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
              {offer.name}
            </h3>
            <p className="text-3xl font-bold font-mono mb-4" style={{ color: 'var(--color-sos-soul)' }}>
              {offer.price}
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--color-sos-muted)' }}>components:</span>
                <span className="font-mono" style={{ color: 'var(--color-sos-text)' }}>{offer.components}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--color-sos-muted)' }}>conversion:</span>
                <span className="font-mono" style={{ color: 'var(--color-sos-green)' }}>{offer.conversion}</span>
              </div>
            </div>
            <TactileButton variant="secondary" className="w-full" size="sm">
              edit offer
            </TactileButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
