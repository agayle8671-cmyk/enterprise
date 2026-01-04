import { useState } from "react";
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
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Founding 50", href: "/dashboard/founding-50", icon: Rocket },
    { name: "Buyback Autopilot", href: "/dashboard/buyback", icon: Clock },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">
            Sovereign OS
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
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
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Buyback Status</h4>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-emerald-500 h-full w-[65%]" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              65% of manual tasks automated
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
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
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <span className="font-display font-bold text-xl text-slate-900">
                    Sovereign OS
                  </span>
                </div>
                <nav className="p-4 space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
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
            
            <div className="hidden md:flex relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search clients, agents, or workflows..." 
                className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors outline-none">
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/auth">
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
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