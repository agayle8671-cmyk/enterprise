import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
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
  User,
  CreditCard,
  Users,
  Command,
  Sparkles,
  HelpCircle,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WaveText } from "@/components/WaveText";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CommandCenter, CommandCenterTrigger } from "@/components/CommandCenter";
import { TierSelector } from "@/components/ui/ProLock";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Agents", href: "/dashboard/agents", icon: Sparkles },
    { name: "Time Audit", href: "/dashboard/time-audit", icon: Clock },
    { name: "Proposals", href: "/dashboard/proposals", icon: CreditCard },
    { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Cmd+K to open command palette
  const { theme, setTheme } = useTheme();

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
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-slate-950 flex">
      {/* Command Palette Mock */}
      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-slate-200/60 rounded-2xl shadow-[0_25px_50px_-20px_rgba(0,0,0,0.25)]">
          <div className="flex items-center px-4 border-b border-slate-100/60">
            <Search className="h-5 w-5 text-slate-400 mr-2" />
            <input
              className="flex-1 py-4 bg-transparent outline-none text-[15px] text-slate-900 placeholder:text-slate-400"
              placeholder="Type a command or search..."
            />
            <div className="text-[10px] text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50">ESC</div>
          </div>
          <div className="p-2">
            <div className="px-2 py-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">Suggestions</div>
            <div className="space-y-0.5">
              <div className="flex items-center px-3 py-2.5 text-[14px] text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <Rocket className="h-4 w-4 mr-2.5 text-slate-400" /> Launch New Campaign
              </div>
              <div className="flex items-center px-3 py-2.5 text-[14px] text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <Users className="h-4 w-4 mr-2.5 text-slate-400" /> Invite Team Member
              </div>
              <div className="flex items-center px-3 py-2.5 text-[14px] text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <CreditCard className="h-4 w-4 mr-2.5 text-slate-400" /> View Billing
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar - Apple-style Desktop */}
      <aside className="hidden md:flex flex-col w-60 border-r border-slate-200/50 dark:border-slate-800 bg-white/90 backdrop-blur-xl dark:bg-slate-900 fixed h-full z-10 shadow-[12px_0_40px_-20px_rgba(0,0,0,0.08)]">
        <div className="p-5 border-b border-slate-100/60 dark:border-slate-800 flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-900 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-medium text-[17px] text-slate-900 dark:text-white tracking-[-0.01em]">
            <WaveText text="Sovereign OS" />
          </span>
        </div>

        <div className="px-3 pt-4">
          <Button
            variant="outline"
            className="w-full justify-start text-[13px] text-slate-400 border-slate-200/60 bg-slate-50/50 hover:bg-slate-100 hover:text-slate-600 rounded-xl h-9"
            onClick={() => setIsCommandOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-300 group cursor-pointer ${isActive
                    ? "bg-slate-900 text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2)]"
                    : "text-slate-500 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${isActive ? "text-white/70" : "text-slate-400 group-hover:text-slate-500"
                      }`}
                  />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100/60 dark:border-slate-800">
          <Link href="/dashboard/buyback">
            <div className="bg-slate-50/80 dark:bg-slate-800 rounded-xl p-4 border border-slate-100/60 dark:border-slate-700 cursor-pointer hover:border-slate-200 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <Sparkles className="h-10 w-10" />
              </div>
              <h4 className="text-[11px] font-medium text-slate-500 dark:text-white mb-2.5 flex justify-between relative z-10 uppercase tracking-wider">
                Buyback Status
                <span className="text-slate-400 group-hover:text-slate-600 transition-colors normal-case tracking-normal">View</span>
              </h4>
              <div className="w-full bg-slate-200/80 dark:bg-slate-700 h-1 rounded-full overflow-hidden mb-2 relative z-10">
                <div className="bg-slate-900 h-full w-[65%] rounded-full" />
              </div>
              <p className="text-[12px] text-slate-400 dark:text-slate-400 relative z-10">
                65% of manual tasks automated
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content - Apple-style */}
      <main className="flex-1 md:ml-60 flex flex-col min-h-screen bg-[#F5F7FA]">
        {/* Header */}
        <header className="h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800 sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden md:inline">Dashboard</span>
              {location !== '/dashboard' && (
                <>
                  <span className="mx-1 text-border">/</span>
                  <span className="text-foreground font-medium capitalize">
                    {location.split('/').pop()?.replace('-', ' ')}
                  </span>
                </>
              )}
            </div>
            {/* Tier Selector for Demo */}
            <TierSelector />
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                  <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-display font-bold text-xl text-slate-900">
                    <WaveText text="Sovereign OS" />
                  </span>
                </div>
                <nav className="p-4 space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${location === item.href
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                          }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Live Users (Enterprise Feature) */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 h-8">
              <div className="flex -space-x-2 overflow-hidden">
                <Avatar className="inline-block h-6 w-6 ring-2 ring-white">
                  <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-6 w-6 ring-2 ring-white">
                  <AvatarImage src="https://i.pravatar.cc/150?u=2" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-6 w-6 ring-2 ring-white">
                  <AvatarImage src="https://i.pravatar.cc/150?u=3" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-slate-500 font-medium">3 others online</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors outline-none cursor-pointer">
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left mr-1">
                    <p className="text-sm font-medium text-slate-900 leading-none">James Doe</p>
                    <p className="text-xs text-slate-500">Sovereign Operator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4 text-slate-400" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4 text-slate-400" />
                    Billing
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="cursor-pointer">
                    <Users className="mr-2 h-4 w-4 text-slate-400" />
                    Team
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/auth">
                  <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content - Apple-style generous padding */}
        <div className="flex-1 px-8 md:px-10 py-8 md:py-10 pb-24 md:pb-10 overflow-y-auto">
          <div className="max-w-[1180px] mx-auto space-y-10 animate-in fade-in duration-300">
            {children}
          </div>
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
      <CommandCenterTrigger onClick={() => setIsAIChatOpen(true)} className="md:hidden" /> {/* Mobile trigger */}
      <CommandCenterTrigger onClick={() => setIsAIChatOpen(true)} className="hidden md:flex" /> {/* Desktop trigger */}
      <CommandCenter isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
}