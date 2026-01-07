/**
 * Settings Page - Sovereign Aesthetic
 * 
 * Configuration center with:
 * - Terminal typography
 * - Glass panels
 * - Tab navigation
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { PHYSICS } from "@/lib/animation-constants";
import {
  CreditCard, Globe, Lock, Mail, User, Zap, Bell, Shield,
  Users, Key, Activity, FileText, Download, Cpu, HardDrive, Settings as SettingsIcon, Terminal
} from "lucide-react";
import { GlassCard, GlowButton, SpotlightCard } from "@/components/GlassCard";
import { BentoGrid, BentoItem, BentoDataCard } from "@/components/BentoGrid";
import { TypewriterText, PulseRing } from "@/components/Physics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const tabs = [
  { id: 'general', label: 'GENERAL', icon: User },
  { id: 'security', label: 'SECURITY', icon: Shield },
  { id: 'team', label: 'TEAM', icon: Users },
  { id: 'integrations', label: 'INTEGRATIONS', icon: Globe },
  { id: 'system', label: 'SYSTEM', icon: Cpu },
];

const teamMembers = [
  { name: 'James Doe', email: 'james@sovereign.os', role: 'Owner', status: 'active' },
  { name: 'Sarah Chen', email: 'sarah@sovereign.os', role: 'Admin', status: 'active' },
  { name: 'Mike Ross', email: 'mike@sovereign.os', role: 'Member', status: 'pending' },
];

const integrations = [
  { name: 'Slack', connected: true, icon: '💬' },
  { name: 'Google Calendar', connected: true, icon: '📅' },
  { name: 'Stripe', connected: true, icon: '💳' },
  { name: 'HubSpot', connected: false, icon: '🎯' },
  { name: 'Notion', connected: false, icon: '📝' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
            SYSTEM CONFIGURATION
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <SettingsIcon className="h-4 w-4 text-[var(--color-acid)]" />
            <p className="text-sm text-[var(--text-sovereign-muted)]">
              Manage organization, security, and preferences
            </p>
          </div>
        </div>
        <GlowButton variant="aurora" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          EXPORT LOGS
        </GlowButton>
      </div>

      {/* Command Line */}
      <SpotlightCard className="p-6">
        <div className="flex items-center gap-4">
          <Terminal className="h-6 w-6 text-[var(--color-aurora-cyan)]" />
          <div className="flex-1">
            <TypewriterText
              text="System configuration loaded... All services operational..."
              speed={25}
              loop
              pauseDuration={3000}
              className="text-lg text-[var(--color-aurora-cyan)]"
            />
          </div>
        </div>
      </SpotlightCard>

      {/* Tab Navigation */}
      <div className="glass-panel rounded-lg p-1 flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-terminal text-xs transition-colors ${activeTab === tab.id
                ? 'bg-[rgba(187,255,0,0.15)] text-[var(--color-acid)]'
                : 'text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)]'
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={PHYSICS.interaction}
      >
        {activeTab === 'general' && (
          <div className="space-y-6">
            <GlassCard intensity="medium" className="p-6">
              <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-6">
                PROFILE INFORMATION
              </h3>

              <div className="flex items-center gap-6 mb-8">
                <Avatar className="h-20 w-20 border-2 border-[var(--glass-sovereign-border)]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-[var(--color-structure)] text-[var(--color-acid)]">JD</AvatarFallback>
                </Avatar>
                <div>
                  <GlowButton variant="aurora" size="sm">CHANGE AVATAR</GlowButton>
                  <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mt-2">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    defaultValue="James"
                    className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                    style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                  />
                </div>
                <div>
                  <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                    style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                  />
                </div>
                <div>
                  <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    defaultValue="james@sovereign.os"
                    className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                    style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                  />
                </div>
                <div>
                  <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                    ROLE
                  </label>
                  <input
                    type="text"
                    defaultValue="Sovereign Operator"
                    disabled
                    className="w-full p-3 rounded-lg bg-[var(--color-structure)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-muted)] cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <GlowButton variant="acid">SAVE CHANGES</GlowButton>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <BentoGrid columns={12} gap="normal">
              <BentoItem colSpan={4}>
                <BentoDataCard
                  label="2FA STATUS"
                  value="ENABLED"
                  trend="up"
                  icon={<Shield className="h-4 w-4" />}
                />
              </BentoItem>
              <BentoItem colSpan={4}>
                <BentoDataCard
                  label="LAST LOGIN"
                  value="2min ago"
                  trend="neutral"
                  icon={<Activity className="h-4 w-4" />}
                />
              </BentoItem>
              <BentoItem colSpan={4}>
                <BentoDataCard
                  label="SESSIONS"
                  value="3"
                  trend="neutral"
                  icon={<Key className="h-4 w-4" />}
                />
              </BentoItem>
            </BentoGrid>

            <GlassCard intensity="medium" className="p-6">
              <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-6">
                SECURITY SETTINGS
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all logins', enabled: true },
                  { label: 'Login Notifications', desc: 'Get notified of new sign-ins', enabled: true },
                  { label: 'Session Timeout', desc: 'Auto-logout after 30min inactivity', enabled: false },
                ].map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)]">
                    <div>
                      <p className="text-sm text-[var(--text-sovereign-primary)]">{setting.label}</p>
                      <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">{setting.desc}</p>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-[rgba(255,51,102,0.1)] border border-[var(--color-alarm)]">
                <h4 className="text-terminal text-sm text-[var(--color-alarm)] mb-2">DANGER ZONE</h4>
                <p className="text-xs text-[var(--text-sovereign-muted)] mb-4">
                  Permanently delete your account and all associated data
                </p>
                <button className="text-terminal text-xs text-[var(--color-alarm)] hover:underline">
                  DELETE ACCOUNT
                </button>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">
                TEAM MEMBERS
              </h3>
              <GlowButton variant="acid" size="sm">
                <Users className="h-4 w-4 mr-2" />
                INVITE MEMBER
              </GlowButton>
            </div>

            <div className="space-y-2">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-lg p-4 flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-[var(--glass-sovereign-border)]">
                      <AvatarFallback className="bg-[var(--color-structure)] text-[var(--color-acid)] text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-[var(--text-sovereign-primary)]">{member.name}</p>
                      <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-terminal text-xs px-2 py-1 rounded ${member.status === 'active'
                        ? 'bg-[rgba(187,255,0,0.15)] text-[var(--color-acid)]'
                        : 'bg-[rgba(255,255,255,0.1)] text-[var(--text-sovereign-muted)]'
                      }`}>
                      {member.status.toUpperCase()}
                    </span>
                    <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                      {member.role.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">
              CONNECTED SERVICES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration, idx) => (
                <GlassCard key={idx} intensity="medium" variant={integration.connected ? 'acid' : 'default'}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{integration.icon}</span>
                      <span className={`h-2 w-2 rounded-full ${integration.connected ? 'bg-[var(--color-acid)]' : 'bg-[var(--text-sovereign-muted)]'
                        }`} />
                    </div>
                    <h4 className="text-sm text-[var(--text-sovereign-primary)]">{integration.name}</h4>
                    <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mt-1">
                      {integration.connected ? 'CONNECTED' : 'NOT CONNECTED'}
                    </p>
                    <motion.button
                      className="w-full mt-4 py-2 rounded-lg text-terminal text-xs"
                      style={{
                        background: integration.connected ? 'var(--color-structure)' : 'var(--color-acid)',
                        color: integration.connected ? 'var(--text-sovereign-muted)' : '#000',
                        border: integration.connected ? '1px solid var(--glass-sovereign-border)' : 'none'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {integration.connected ? 'DISCONNECT' : 'CONNECT'}
                    </motion.button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <BentoGrid columns={12} gap="normal">
              <BentoItem colSpan={3}>
                <div className="p-4 h-full relative">
                  <div className="absolute top-4 right-4">
                    <PulseRing color="var(--color-acid)" size={24} duration={2} />
                  </div>
                  <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                    CPU USAGE
                  </span>
                  <p className="text-2xl font-bold text-[var(--color-acid)] mt-2" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                    67%
                  </p>
                </div>
              </BentoItem>
              <BentoItem colSpan={3}>
                <div className="p-4 h-full">
                  <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                    MEMORY
                  </span>
                  <p className="text-2xl font-bold text-[var(--color-aurora-cyan)] mt-2" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                    4.2GB
                  </p>
                </div>
              </BentoItem>
              <BentoItem colSpan={3}>
                <div className="p-4 h-full">
                  <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                    STORAGE
                  </span>
                  <p className="text-2xl font-bold text-[var(--color-aurora-purple)] mt-2" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                    128GB
                  </p>
                </div>
              </BentoItem>
              <BentoItem colSpan={3}>
                <div className="p-4 h-full">
                  <span className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                    UPTIME
                  </span>
                  <p className="text-2xl font-bold text-[var(--text-sovereign-primary)] mt-2" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                    99.97%
                  </p>
                </div>
              </BentoItem>
            </BentoGrid>

            <GlassCard intensity="medium" className="p-6">
              <h3 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                SYSTEM INFORMATION
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'VERSION', value: 'v1.0.0' },
                  { label: 'ENVIRONMENT', value: 'PRODUCTION' },
                  { label: 'REGION', value: 'US-EAST-1' },
                  { label: 'LAST DEPLOY', value: '2h ago' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)]">
                    <span className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">{item.label}</span>
                    <p className="text-sm text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </motion.div>
    </div>
  );
}