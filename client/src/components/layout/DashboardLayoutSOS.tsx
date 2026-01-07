/**
 * Dashboard Layout - Sovereign OS (S.O.S.) Design
 * 
 * Cognitive Luxury layout with:
 * - Ceramic White background
 * - Neumorphic sidebar
 * - Lowercase naive headers
 * - Magnetic interactions
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  SOSNoiseOverlay,
  MagneticCursor,
  TactileButton,
  TactileIconButton,
} from "@/components/Sovereign";
import {
  Home,
  Bot,
  Clock,
  FileText,
  Wrench,
  Settings,
  Menu,
  X,
  Sparkles,
  Users,
  DollarSign,
  HelpCircle,
  Package,
} from "lucide-react";

interface DashboardLayoutSOSProps {
  children: React.ReactNode;
}

export default function DashboardLayoutSOS({ children }: DashboardLayoutSOSProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "home", icon: Home, path: "/dashboard" },
    { name: "agents", icon: Bot, path: "/dashboard/agents" },
    { name: "time audit", icon: Clock, path: "/dashboard/time-audit" },
    { name: "proposals", icon: FileText, path: "/dashboard/proposals" },
    { name: "offer architect", icon: Wrench, path: "/dashboard/offer-architect" },
    { name: "tool builder", icon: Package, path: "/dashboard/tool-builder" },
    { name: "client portal", icon: Users, path: "/dashboard/client-portal" },
    { name: "founding 50", icon: Sparkles, path: "/dashboard/founding-50" },
    { name: "buyback", icon: DollarSign, path: "/dashboard/buyback" },
    { name: "help", icon: HelpCircle, path: "/dashboard/help" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: 'var(--color-sos-base)',
        color: 'var(--color-sos-text)'
      }}
    >
      <SOSNoiseOverlay />
      <MagneticCursor />

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <TactileIconButton
          icon={sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="secondary"
        />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen w-72 p-6 border-r border-white/20 overflow-y-auto z-40 lg:relative"
            style={{
              background: 'var(--color-sos-panel)',
              boxShadow: 'var(--shadow-tactile-md)'
            }}
          >
            {/* Logo */}
            <div className="mb-8">
              <div 
                className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer"
                data-magnetic="true"
                onClick={() => setLocation("/dashboard")}
                style={{
                  background: 'var(--color-sos-base)',
                  boxShadow: 'var(--shadow-tactile-sm)'
                }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--color-sos-soul)',
                    boxShadow: 'var(--shadow-agent-glow)'
                  }}
                >
                  <Sparkles size={20} color="white" />
                </div>
                <div>
                  <h1 
                    className="text-lg font-bold lowercase"
                    style={{ color: 'var(--color-sos-text)' }}
                  >
                    sovereign os
                  </h1>
                  <p 
                    className="text-xs lowercase"
                    style={{ color: 'var(--color-sos-muted)' }}
                  >
                    cognitive luxury
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <p 
                className="text-xs uppercase tracking-wider font-mono mb-4 px-3"
                style={{ color: 'var(--color-sos-muted)' }}
              >
                navigation
              </p>
              
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.button
                    key={item.path}
                    data-magnetic="true"
                    onClick={() => setLocation(item.path)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                    style={{
                      background: active ? 'var(--color-sos-soul)' : 'transparent',
                      color: active ? 'white' : 'var(--color-sos-text)',
                      boxShadow: active ? 'var(--shadow-agent-glow)' : 'none',
                    }}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium lowercase">{item.name}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Settings */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <motion.button
                data-magnetic="true"
                onClick={() => setLocation("/dashboard/settings")}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                style={{
                  background: isActive("/dashboard/settings") ? 'var(--color-sos-soul)' : 'transparent',
                  color: isActive("/dashboard/settings") ? 'white' : 'var(--color-sos-text)',
                  boxShadow: isActive("/dashboard/settings") ? 'var(--shadow-agent-glow)' : 'none',
                }}
              >
                <Settings size={18} />
                <span className="text-sm font-medium lowercase">settings</span>
              </motion.button>
            </div>

            {/* User Info */}
            <div 
              className="mt-8 p-4 rounded-xl border border-white/20"
              style={{
                background: 'var(--color-sos-base)',
                boxShadow: 'var(--shadow-tactile-sm)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: 'var(--color-sos-blue)' }}
                >
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p 
                    className="text-sm font-medium lowercase truncate"
                    style={{ color: 'var(--color-sos-text)' }}
                  >
                    user@example.com
                  </p>
                  <p 
                    className="text-xs lowercase"
                    style={{ color: 'var(--color-sos-muted)' }}
                  >
                    pro plan
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-0 min-h-screen">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
