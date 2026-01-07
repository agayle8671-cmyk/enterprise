/**
 * Client Portal - Sovereign OS (S.O.S.) Design
 * 
 * Manage client relationships and deliverables
 */

import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
            client portal
          </h1>
          <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
            manage client relationships
          </p>
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
