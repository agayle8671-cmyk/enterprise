/**
 * Settings Page - Raycast-Inspired Design
 */

import { motion } from "framer-motion";
import { User, Bell, Lock, CreditCard, Palette, Zap, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsRaycast() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>
            Settings
          </h1>
          <p className="text-[#989898]">Manage your account and preferences</p>
        </div>

        {/* Tabs & Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="raycast-panel p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#FF6363]/20 to-[#8B5CF6]/20 text-[#EDEDED]'
                      : 'text-[#989898] hover:bg-white/5 hover:text-[#EDEDED]'
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="raycast-panel p-6"
            >
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "billing" && <BillingSettings />}
              {activeTab === "appearance" && <AppearanceSettings />}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
          Profile Settings
        </h2>
        <p className="text-sm text-[#989898]">Update your personal information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#989898]">Full Name</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#989898]">Email</label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#989898]">Bio</label>
          <textarea
            rows={4}
            defaultValue="AI automation enthusiast"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const settings = [
    { label: "Email notifications", description: "Receive email updates about your agents", enabled: true },
    { label: "Task completions", description: "Get notified when agents complete tasks", enabled: true },
    { label: "Weekly reports", description: "Receive weekly performance summaries", enabled: false },
    { label: "Marketing emails", description: "Receive product updates and tips", enabled: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
          Notification Preferences
        </h2>
        <p className="text-sm text-[#989898]">Choose how you want to be notified</p>
      </div>

      <div className="space-y-3">
        {settings.map((setting, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
            <div>
              <div className="text-sm font-medium mb-1">{setting.label}</div>
              <div className="text-xs text-[#989898]">{setting.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#FF6363] peer-checked:to-[#8B5CF6]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
          Security Settings
        </h2>
        <p className="text-sm text-[#989898]">Manage your account security</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#989898]">Current Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#989898]">New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#989898]">Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#FF6363] transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6363] to-[#8B5CF6] text-white font-medium shadow-lg hover:shadow-xl transition-all">
          Update Password
        </button>
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
          Billing & Subscription
        </h2>
        <p className="text-sm text-[#989898]">Manage your subscription and payment methods</p>
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-r from-[#FF6363]/10 to-[#8B5CF6]/10 border border-[#FF6363]/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-lg font-semibold mb-1">Pro Plan</div>
            <div className="text-sm text-[#989898]">Unlimited agents and advanced features</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">$99</div>
            <div className="text-xs text-[#989898]">per month</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#22c55e]">
          <Zap className="h-4 w-4" />
          <span>Next billing date: Feb 1, 2026</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Payment Method</h3>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-[#989898]" />
            <div>
              <div className="text-sm font-medium">•••• •••• •••• 4242</div>
              <div className="text-xs text-[#989898]">Expires 12/2026</div>
            </div>
          </div>
          <button className="text-sm text-[#FF6363] hover:text-[#FF6363]/80 transition-colors">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
          Appearance
        </h2>
        <p className="text-sm text-[#989898]">Customize how Sovereign looks</p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {["Dark", "Light", "System"].map((theme) => (
            <button
              key={theme}
              className={`p-4 rounded-lg border transition-all ${
                theme === "Dark"
                  ? "bg-gradient-to-r from-[#FF6363]/20 to-[#8B5CF6]/20 border-[#FF6363]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="text-sm font-medium">{theme}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Accent Color</h3>
        <div className="flex gap-3">
          {["#FF6363", "#8B5CF6", "#22c55e", "#ffc940", "#3b82f6"].map((color) => (
            <button
              key={color}
              className="h-12 w-12 rounded-lg border-2 border-white/10 hover:border-white/30 transition-all"
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
