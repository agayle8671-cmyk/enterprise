/**
 * Settings - Sovereign OS (S.O.S.) Design
 * 
 * Configure application preferences and account settings
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { Settings, User, Bell, Shield, Palette, Zap } from "lucide-react";

export default function SettingsSOS() {
  const [notifications, setNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const settingsSections = [
    {
      title: "profile",
      icon: User,
      settings: [
        { label: "name", value: "user@example.com" },
        { label: "email", value: "user@example.com" },
        { label: "plan", value: "pro" },
      ]
    },
    {
      title: "notifications",
      icon: Bell,
      settings: [
        { label: "email notifications", toggle: true, value: notifications },
        { label: "agent activity alerts", toggle: true, value: true },
      ]
    },
    {
      title: "interface",
      icon: Palette,
      settings: [
        { label: "haptic feedback", toggle: true, value: hapticFeedback },
        { label: "sound effects", toggle: true, value: soundEffects },
        { label: "magnetic cursor", toggle: true, value: true },
      ]
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 
          className="text-5xl font-bold lowercase mb-2"
          style={{ color: 'var(--color-sos-text)' }}
        >
          settings
        </h1>
        <p 
          className="text-lg lowercase"
          style={{ color: 'var(--color-sos-muted)' }}
        >
          configure your sovereign os experience
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6 max-w-4xl">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="p-6 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--color-sos-soul)',
                    boxShadow: 'var(--shadow-tactile-sm)'
                  }}
                >
                  <Icon size={20} color="white" />
                </div>
                <h2 
                  className="text-2xl font-semibold lowercase"
                  style={{ color: 'var(--color-sos-text)' }}
                >
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{
                      background: 'var(--color-sos-base)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span 
                      className="text-sm lowercase font-medium"
                      style={{ color: 'var(--color-sos-text)' }}
                    >
                      {setting.label}
                    </span>
                    {setting.toggle ? (
                      <button
                        className="relative w-12 h-6 rounded-full transition-colors"
                        style={{
                          background: setting.value 
                            ? 'var(--color-sos-green)' 
                            : 'var(--color-sos-muted)'
                        }}
                        onClick={() => {
                          if (setting.label === "haptic feedback") setHapticFeedback(!hapticFeedback);
                          if (setting.label === "sound effects") setSoundEffects(!soundEffects);
                          if (setting.label === "email notifications") setNotifications(!notifications);
                        }}
                      >
                        <div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
                          style={{
                            left: setting.value ? 'calc(100% - 20px)' : '4px'
                          }}
                        />
                      </button>
                    ) : (
                      <span 
                        className="text-sm font-mono"
                        style={{ color: 'var(--color-sos-muted)' }}
                      >
                        {setting.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl border max-w-4xl"
        style={{
          background: 'var(--color-sos-panel)',
          borderColor: 'var(--color-sos-red)',
          boxShadow: 'var(--shadow-tactile-md)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} style={{ color: 'var(--color-sos-red)' }} />
          <h2 
            className="text-xl font-semibold lowercase"
            style={{ color: 'var(--color-sos-red)' }}
          >
            danger zone
          </h2>
        </div>
        <p 
          className="text-sm lowercase mb-4"
          style={{ color: 'var(--color-sos-muted)' }}
        >
          irreversible actions that affect your account
        </p>
        <div className="flex gap-3">
          <TactileButton variant="ghost" size="sm">
            export data
          </TactileButton>
          <TactileButton 
            variant="ghost" 
            size="sm"
            style={{
              borderColor: 'var(--color-sos-red)',
              color: 'var(--color-sos-red)'
            }}
          >
            delete account
          </TactileButton>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end max-w-4xl">
        <TactileButton variant="primary" size="lg">
          save changes
        </TactileButton>
      </div>
    </div>
  );
}
