/**
 * Client Portal - Sovereign OS (S.O.S.) Design
 * 
 * Manage client relationships and deliverables
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { Users, FileText, MessageSquare } from "lucide-react";

export default function ClientPortalSOS() {
  const clients = [
    { name: "acme corp", projects: 3, status: "active", value: "$45k" },
    { name: "techstart inc", projects: 1, status: "active", value: "$120k" },
    { name: "innovation labs", projects: 2, status: "completed", value: "$85k" },
  ];

  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-5xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
            client portal
          </h1>
          <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
            manage client relationships
          </p>
        </div>
        
        {/* Live Client Intelligence */}
        <div className="p-4 rounded-xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-sm)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} style={{ color: 'var(--color-sos-green)' }} />
            <span className="text-xs font-mono uppercase tracking-wider" 
              style={{ color: 'var(--color-sos-green)' }}>
              Client Intelligence
            </span>
          </div>
          <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
            <TypewriterText
              phrases={[
                "acme corp: 3 active projects, all on schedule",
                "techstart inc: high-value client, 98% satisfaction rating",
                "2 clients ready for upsell opportunities this week",
                "all deliverables on track, zero overdue items",
                "client retention rate: 94% this quarter"
              ]}
              typingSpeed={40}
              deletingSpeed={20}
              pauseTime={2800}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-white/40"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)'
            }}
          >
            <Users size={24} style={{ color: 'var(--color-sos-green)' }} className="mb-4" />
            <h3 className="text-xl font-semibold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
              {client.name}
            </h3>
            <p className="text-sm lowercase mb-4" style={{ color: 'var(--color-sos-muted)' }}>
              {client.projects} projects • {client.status} • {client.value}
            </p>
            <div className="flex gap-2">
              <TactileButton variant="secondary" className="flex-1" size="sm">
                <FileText size={14} className="mr-1" />
                files
              </TactileButton>
              <TactileButton variant="secondary" className="flex-1" size="sm">
                <MessageSquare size={14} className="mr-1" />
                chat
              </TactileButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
