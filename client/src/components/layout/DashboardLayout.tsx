/**
 * DashboardLayout - Sovereign Aesthetic
 * 
 * The core layout wrapper using:
 * - Void background (#050505)
 * - Acid green accents (#BBFF00)
 * - Space Mono typography for terminal elements
 * - Glass panels with aurora effects
 * - Physics-based interactions
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Rocket,
  Clock,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  User,
  CreditCard,
  Users,
  Command,
  Sparkles,
  HelpCircle,
  Zap,
  Activity,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CommandCenter, CommandCenterTrigger } from "@/components/CommandCenter";
import { TierSelector } from "@/components/ui/ProLock";
import { BentoTicker } from "@/components/BentoGrid";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const navigation = [
    { name: "Command", href: "/dashboard", icon: LayoutDashboard },
    { name: "Agents", href: "/dashboard/agents", icon: Sparkles },
    { name: "Time Audit", href: "/dashboard/time-audit", icon: Clock },
    { name: "Proposals", href: "/dashboard/proposals", icon: CreditCard },
    { name: "Sovereign", href: "/dashboard/sovereign", icon: Terminal },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Live system ticker data
  const [tickerData] = useState([
    { label: 'SYS', value: 'ONLINE', trend: 'up' as const },
    { label: 'CPU', value: '67%', trend: 'neutral' as const },
    { label: 'MEM', value: '4.2GB', trend: 'neutral' as const },
    { label: 'AGENTS', value: '5 ACTIVE', trend: 'up' as const },
    { label: 'LATENCY', value: '23ms', trend: 'up' as const },
  ]);

  // Cmd+K for Palette, Cmd+J for AI Chat
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsAIChatOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-void, #050505)' }}>
      {/* Command Palette - Sovereign Glass */}
      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden glass-panel border-[var(--color-acid)]/30">
          <div className="flex items-center px-4 border-b border-[var(--glass-sovereign-border)]">
            <Command className="h-4 w-4 text-[var(--color-acid)] mr-3" />
            <input
              className="flex-1 py-4 bg-transparent outline-none text-sm text-[var(--text-sovereign-primary)] placeholder:text-[var(--text-sovereign-muted)]"
              placeholder="Type a command or search..."
              style={{ fontFamily: 'var(--font-sovereign-mono)' }}
              autoFocus
            />
            <kbd className="text-terminal text-xs px-2 py-1 rounded bg-[var(--color-structure)] text-[var(--text-sovereign-muted)]">
              ESC
            </kbd>
          </div>
          <div className="p-2">
            <div className="px-2 py-1.5 text-terminal text-[10px] text-[var(--text-sovereign-muted)]">
              COMMANDS
            </div>
            <div className="space-y-0.5">
              {[
                { icon: Rocket, label: 'Launch New Campaign', kbd: '⌘N' },
                { icon: Users, label: 'Invite Team Member', kbd: '⌘I' },
                { icon: Sparkles, label: 'Activate Agent', kbd: '⌘A' },
                { icon: Activity, label: 'View Analytics', kbd: '⌘D' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer"
                  style={{ color: 'var(--text-sovereign-primary)' }}
                  whileHover={{ backgroundColor: 'rgba(187, 255, 0, 0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <kbd className="text-terminal text-xs text-[var(--text-sovereign-muted)]">{item.kbd}</kbd>
                </motion.div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar - Sovereign Glass Panel */}
      <aside
        className="hidden md:flex flex-col w-64 fixed h-full z-10 glass-panel"
        style={{
          background: 'var(--color-void, #050505)',
          borderRight: '1px solid var(--glass-sovereign-border, rgba(255,255,255,0.1))'
        }}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center gap-3"
          style={{ borderBottom: '1px solid var(--glass-sovereign-border)' }}
        >
          <motion.div
            className="h-9 w-9 rounded-xl flex items-center justify-center sovereign-border"
            style={{ background: 'var(--color-structure)' }}
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-5 w-5 text-[var(--color-acid)]" />
          </motion.div>
          <div>
            <span
              className="font-semibold text-[17px] text-[var(--text-sovereign-primary)]"
              style={{ letterSpacing: '-0.025em' }}
            >
              SOVEREIGN
            </span>
            <span className="block text-[10px] text-terminal text-[var(--color-acid)]">
              OS v1.0.0
            </span>
          </div>
        </div>

        {/* Search with ⌘K */}
        <div className="px-3 pt-4">
          <motion.button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3 h-10 rounded-lg text-sm sovereign-border"
            style={{
              background: 'var(--color-structure)',
              color: 'var(--text-sovereign-muted)'
            }}
            whileHover={{ borderColor: 'var(--color-acid)' }}
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="text-terminal text-xs">SEARCH...</span>
            </div>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px]"
              style={{ background: 'var(--color-void)', color: 'var(--text-sovereign-muted)' }}>
              <span>⌘</span>K
            </kbd>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(187, 255, 0, 0.1)' : 'transparent',
                    color: isActive ? 'var(--color-acid)' : 'var(--text-sovereign-muted)',
                    borderLeft: isActive ? '2px solid var(--color-acid)' : '2px solid transparent',
                  }}
                  whileHover={{
                    backgroundColor: isActive ? 'rgba(187, 255, 0, 0.15)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'var(--color-acid)' : 'var(--text-sovereign-primary)'
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-terminal text-xs">{item.name.toUpperCase()}</span>
                  {isActive && <ChevronRight className="h-3 w-3 ml-auto" />}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* System Status Card */}
        <div className="p-3" style={{ borderTop: '1px solid var(--glass-sovereign-border)' }}>
          <motion.div
            className="rounded-lg p-4 relative overflow-hidden"
            style={{
              background: 'var(--color-structure)',
              border: '1px solid var(--glass-sovereign-border)'
            }}
            whileHover={{ borderColor: 'var(--color-acid)' }}
          >
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <Activity className="h-10 w-10 text-[var(--color-acid)]" />
            </div>
            <h4 className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mb-2 flex justify-between">
              SYSTEM STATUS
              <span className="text-[var(--color-acid)]">● LIVE</span>
            </h4>
            <div className="flex gap-4 text-terminal text-xs">
              <div>
                <span className="text-[var(--text-sovereign-muted)]">CPU</span>
                <span className="block text-[var(--color-acid)]">67%</span>
              </div>
              <div>
                <span className="text-[var(--text-sovereign-muted)]">MEM</span>
                <span className="block text-[var(--color-acid)]">4.2GB</span>
              </div>
              <div>
                <span className="text-[var(--text-sovereign-muted)]">NET</span>
                <span className="block text-[var(--color-acid)]">23ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header - Sovereign Glass */}
        <header
          className="sticky top-0 z-30 flex h-14 items-center justify-between px-6 glass-panel"
          style={{
            borderBottom: '1px solid var(--glass-sovereign-border)',
            background: 'rgba(5, 5, 5, 0.9)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className="flex items-center gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-terminal text-xs">
              <span className="text-[var(--text-sovereign-muted)]">DASHBOARD</span>
              {location !== '/dashboard' && (
                <>
                  <ChevronRight className="h-3 w-3 text-[var(--glass-sovereign-border)]" />
                  <span className="text-[var(--color-acid)]">
                    {location.split('/').pop()?.replace('-', ' ').toUpperCase()}
                  </span>
                </>
              )}
            </div>

            <TierSelector />

            {/* Mobile menu */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-[var(--text-sovereign-muted)]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 glass-panel" style={{ background: 'var(--color-void)' }}>
                <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid var(--glass-sovereign-border)' }}>
                  <div className="h-8 w-8 rounded-lg bg-[var(--color-structure)] flex items-center justify-center">
                    <Zap className="h-4 w-4 text-[var(--color-acid)]" />
                  </div>
                  <span className="text-terminal text-lg text-[var(--color-acid)]">SOVEREIGN</span>
                </div>
                <nav className="p-4 space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-terminal text-xs cursor-pointer ${location === item.href
                            ? "bg-[rgba(187,255,0,0.1)] text-[var(--color-acid)]"
                            : "text-[var(--text-sovereign-muted)]"
                          }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name.toUpperCase()}
                      </div>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <motion.button
              className="relative p-2 rounded-lg"
              style={{ color: 'var(--text-sovereign-muted)' }}
              whileHover={{ backgroundColor: 'rgba(187, 255, 0, 0.1)', color: 'var(--color-acid)' }}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-[var(--color-acid)] rounded-full" />
            </motion.button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex items-center gap-2 p-1.5 rounded-lg outline-none cursor-pointer"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <Avatar className="h-7 w-7 border border-[var(--glass-sovereign-border)]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-[var(--color-structure)] text-[var(--color-acid)] text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-medium text-[var(--text-sovereign-primary)]">OPERATOR</p>
                    <p className="text-[10px] text-terminal text-[var(--color-acid)]">SOVEREIGN</p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-[var(--text-sovereign-muted)] hidden md:block" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass-panel border-[var(--glass-sovereign-border)]" style={{ background: 'var(--color-structure)' }}>
                <DropdownMenuLabel className="text-terminal text-xs text-[var(--text-sovereign-muted)]">ACCOUNT</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[var(--glass-sovereign-border)]" />
                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="cursor-pointer text-[var(--text-sovereign-primary)] focus:bg-[rgba(187,255,0,0.1)] focus:text-[var(--color-acid)]">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="cursor-pointer text-[var(--text-sovereign-primary)] focus:bg-[rgba(187,255,0,0.1)] focus:text-[var(--color-acid)]">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-[var(--glass-sovereign-border)]" />
                <Link href="/auth">
                  <DropdownMenuItem className="text-[var(--color-alarm)] focus:text-[var(--color-alarm)] focus:bg-[rgba(255,51,102,0.1)] cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* System Ticker */}
        <BentoTicker items={tickerData} className="border-b border-[var(--glass-sovereign-border)]" />

        {/* Page Content */}
        <div
          className="flex-1 px-6 py-6 pb-24 md:pb-6 overflow-y-auto"
          style={{ background: 'var(--color-void)' }}
        >
          <motion.div
            className="max-w-[1400px] mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Floating Dock - Mobile Only */}
      <div className="md:hidden">
        <FloatingDock
          items={navigation.map(item => ({
            id: item.href,
            icon: <item.icon className="h-5 w-5" />,
            label: item.name,
            href: item.href,
            isActive: location === item.href,
          }))}
          showLabels={true}
        />
      </div>

      {/* Command Center AI Chat */}
      <CommandCenterTrigger onClick={() => setIsAIChatOpen(true)} className="md:hidden" />
      <CommandCenterTrigger onClick={() => setIsAIChatOpen(true)} className="hidden md:flex" />
      <CommandCenter isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
}