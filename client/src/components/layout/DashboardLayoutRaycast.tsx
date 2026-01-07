/**
 * DashboardLayout - Raycast-Inspired Design
 * 
 * Clean layout with:
 * - Minimal sidebar with icon navigation
 * - Command palette (⌘K)
 * - Smooth transitions
 * - Refined spacing and typography
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Bot,
  Clock,
  Settings,
  LogOut,
  Menu,
  Search,
  Command,
  Sparkles,
  HelpCircle,
  Zap,
  FileText,
  Users,
  BarChart3,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayoutRaycast({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Agents", href: "/dashboard/agents", icon: Bot },
    { name: "Time Audit", href: "/dashboard/time-audit", icon: Clock },
    { name: "Proposals", href: "/dashboard/proposals", icon: FileText },
    { name: "Analytics", href: "/dashboard/sovereign", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const commands = [
    { icon: Bot, label: "Deploy New Agent", kbd: "⌘N", action: () => console.log("Deploy agent") },
    { icon: Clock, label: "Run Time Audit", kbd: "⌘T", action: () => console.log("Time audit") },
    { icon: Sparkles, label: "View Analytics", kbd: "⌘A", action: () => console.log("Analytics") },
    { icon: Users, label: "Invite Team Member", kbd: "⌘I", action: () => console.log("Invite") },
    { icon: HelpCircle, label: "Help & Support", kbd: "⌘?", action: () => console.log("Help") },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(commandSearch.toLowerCase())
  );

  // Cmd+K for Command Palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED]">
      
      {/* Command Palette */}
      <AnimatePresence>
        {isCommandOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandOpen(false)}
            />
            
            {/* Command Dialog */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
              <motion.div
                className="w-full max-w-2xl raycast-panel overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                  <Search className="h-5 w-5 text-[#989898]" />
                  <input
                    type="text"
                    value={commandSearch}
                    onChange={(e) => setCommandSearch(e.target.value)}
                    placeholder="Search commands..."
                    className="flex-1 bg-transparent outline-none text-[#EDEDED] placeholder:text-[#989898]"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-[#989898]">
                    ESC
                  </kbd>
                </div>

                {/* Commands List */}
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {filteredCommands.length > 0 ? (
                    <div className="space-y-1">
                      {filteredCommands.map((cmd, idx) => (
                        <motion.button
                          key={idx}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                          whileHover={{ x: 2 }}
                          onClick={() => {
                            cmd.action();
                            setIsCommandOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <cmd.icon className="h-5 w-5 text-[#989898] group-hover:text-[#FF6363] transition-colors" />
                            <span className="text-sm">{cmd.label}</span>
                          </div>
                          <kbd className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-[#989898]">
                            {cmd.kbd}
                          </kbd>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-[#989898]">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No commands found</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#080808]/80 backdrop-blur-xl border-b border-white/10 z-40">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center">
                <Command className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold" style={{ letterSpacing: '-0.02em' }}>
                Sovereign
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCommandOpen(true)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-16 left-0 bottom-0 w-64 bg-[#0d0d0d] border-r border-white/10 z-40 md:hidden"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <MobileSidebarContent navigation={navigation} location={location} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-[#0d0d0d] border-r border-white/10 z-30">
        
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#FF6363]/20">
            <Command className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <motion.a
                  className={`
                    relative flex flex-col items-center justify-center gap-1 p-3 rounded-lg cursor-pointer transition-all group
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#FF6363]/20 to-[#8B5CF6]/20 text-[#EDEDED]' 
                      : 'text-[#989898] hover:bg-white/5 hover:text-[#EDEDED]'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#FF6363] to-[#8B5CF6] rounded-r-full"
                      layoutId="activeIndicator"
                    />
                  )}
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </motion.a>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 space-y-2 border-t border-white/10">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex flex-col items-center justify-center gap-1 p-3 rounded-lg text-[#989898] hover:bg-white/5 hover:text-[#EDEDED] transition-all group"
          >
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium">Search</span>
          </button>
          
          <Link href="/dashboard/help">
            <a className="w-full flex flex-col items-center justify-center gap-1 p-3 rounded-lg text-[#989898] hover:bg-white/5 hover:text-[#EDEDED] transition-all">
              <HelpCircle className="h-5 w-5" />
              <span className="text-[10px] font-medium">Help</span>
            </a>
          </Link>

          {/* User Avatar */}
          <div className="pt-2 border-t border-white/10">
            <button className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-all">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-[#FF6363] to-[#8B5CF6] text-white text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-20 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}

// Mobile Sidebar Content Component
function MobileSidebarContent({ navigation, location }: { navigation: any[], location: string }) {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#FF6363]/20 to-[#8B5CF6]/20 text-[#EDEDED]' 
                    : 'text-[#989898] hover:bg-white/5 hover:text-[#EDEDED]'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link href="/dashboard/help">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#989898] hover:bg-white/5 hover:text-[#EDEDED] transition-all">
            <HelpCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Help & Support</span>
          </a>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#989898] hover:bg-white/5 hover:text-[#EDEDED] transition-all">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
