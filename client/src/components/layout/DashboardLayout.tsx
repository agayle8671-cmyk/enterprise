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
  Sparkles
} from "lucide-react";
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Founding 50", href: "/dashboard/founding-50", icon: Rocket },
    { name: "Buyback Autopilot", href: "/dashboard/buyback", icon: Clock },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Cmd+K to open command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Command Palette Mock */}
      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-slate-200">
          <div className="flex items-center px-4 border-b border-slate-100">
            <Search className="h-5 w-5 text-slate-400 mr-2" />
            <input 
              className="flex-1 py-4 bg-transparent outline-none text-lg text-slate-900 placeholder:text-slate-400"
              placeholder="Type a command or search..."
            />
            <div className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50">ESC</div>
          </div>
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggestions</div>
            <div className="space-y-1">
               <div className="flex items-center px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer">
                 <Rocket className="h-4 w-4 mr-2 text-blue-500" /> Launch New Campaign
               </div>
               <div className="flex items-center px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer">
                 <Users className="h-4 w-4 mr-2 text-purple-500" /> Invite Team Member
               </div>
               <div className="flex items-center px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer">
                 <CreditCard className="h-4 w-4 mr-2 text-emerald-500" /> View Billing
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 fixed h-full z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group shadow-lg shadow-blue-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white relative z-10">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">
            <WaveText text="Sovereign OS" />
          </span>
        </div>

        <div className="px-4 pt-4">
           <Button 
             variant="outline" 
             className="w-full justify-start text-slate-500 border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:text-slate-900"
             onClick={() => setIsCommandOpen(true)}
           >
             <Search className="h-4 w-4 mr-2" /> 
             <span className="flex-1 text-left">Search...</span>
             <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
               <span className="text-xs">⌘</span>K
             </kbd>
           </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 translate-x-1"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${
                      isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                    }`}
                  />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Link href="/dashboard/buyback">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-blue-200 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <Sparkles className="h-12 w-12" />
              </div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white mb-2 flex justify-between relative z-10">
                Buyback Status
                <span className="text-blue-600 group-hover:underline">View</span>
              </h4>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2 relative z-10">
                <div className="bg-emerald-500 h-full w-[65%]" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 relative z-10">
                65% of manual tasks automated
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-slate-50/50">
        {/* Header */}
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          location === item.href
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

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}