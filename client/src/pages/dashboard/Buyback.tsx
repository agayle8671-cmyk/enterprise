import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, PauseCircle, Settings, Activity, Clock, ArrowRight, Plus } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Buyback() {
  const { toast } = useToast();

  const handleDeployAgent = () => {
    toast({
      title: "Agent Deployment Initiated",
      description: "Allocating server resources for new autonomous agent...",
      duration: 3000,
    });
  };

  const handleDeployFix = () => {
    toast({
      title: "Workflow Fix Applied",
      description: "Schedule Bot has been activated for your calendar.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Buyback Autopilot</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your fleet of autonomous agents and reclaim your time.</p>
        </div>
        <div className="flex gap-4">
           <Card className="bg-slate-900 text-white border-none shadow-lg px-4 py-2 flex items-center gap-3">
             <div className="text-right">
               <p className="text-xs text-slate-400 uppercase font-semibold">Time Saved Today</p>
               <p className="text-xl font-bold font-mono">04:12:35</p>
             </div>
             <Activity className="h-8 w-8 text-emerald-400" />
           </Card>
        </div>
      </div>

      {/* DRIP Matrix Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 dark:border-slate-800">
           <CardHeader>
             <CardTitle>DRIP Matrix Allocation</CardTitle>
             <CardDescription>Your time investment vs. automation coverage.</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="relative h-[300px] border border-slate-200 rounded-lg bg-slate-50 p-4 grid grid-cols-2 gap-4">
                {/* Quadrants */}
                <div className="bg-white p-4 rounded border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Replace</span>
                    <Badge variant="destructive">High Priority</Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">3 Agents</p>
                    <p className="text-sm text-slate-500">Handling Admin & Email</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-purple-200 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Produce</span>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">Focus Here</Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">You</p>
                    <p className="text-sm text-slate-500">Strategy & Closing</p>
                  </div>
                </div>

                <div className="bg-slate-100 p-4 rounded border border-slate-200 flex flex-col justify-between opacity-70">
                   <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delegate</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-700">1 Assistant</p>
                    <p className="text-sm text-slate-500">Research Tasks</p>
                  </div>
                </div>

                <div className="bg-slate-100 p-4 rounded border border-slate-200 flex flex-col justify-between opacity-70">
                   <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invest</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-700">2 Tools</p>
                    <p className="text-sm text-slate-500">Market Intelligence</p>
                  </div>
                </div>

                {/* Axes Labels */}
                <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-xs font-semibold text-slate-400">Financial Value →</div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold text-slate-400">Energy Cost →</div>
             </div>
           </CardContent>
        </Card>

        {/* Active Agents List */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
            <CardDescription>Manage your digital workforce.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {[
               { name: "Inbox Zero Agent", role: "Administrative", status: "Running", uptime: "99.8%", color: "bg-blue-500" },
               { name: "Content Repurposer", role: "Marketing", status: "Running", uptime: "98.2%", color: "bg-purple-500" },
               { name: "Lead Enricher", role: "Sales", status: "Paused", uptime: "0%", color: "bg-slate-400" },
               { name: "Invoice Chaser", role: "Finance", status: "Running", uptime: "100%", color: "bg-emerald-500" },
             ].map((agent, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-white hover:border-slate-200 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={`h-10 w-10 rounded-lg ${agent.color} flex items-center justify-center text-white font-bold shadow-md`}>
                     {agent.name.charAt(0)}
                   </div>
                   <div>
                     <p className="font-semibold text-slate-900">{agent.name}</p>
                     <p className="text-sm text-slate-500">{agent.role}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <Badge variant={agent.status === "Running" ? "default" : "secondary"} className={agent.status === "Running" ? "bg-emerald-50 hover:bg-emerald-600" : ""}>
                     {agent.status}
                   </Badge>
                   <Link href="/dashboard/settings">
                     <Button variant="ghost" size="icon">
                       <Settings className="h-4 w-4 text-slate-400" />
                     </Button>
                   </Link>
                 </div>
               </div>
             ))}
             
             <Button 
               className="w-full mt-4 border-dashed border-2 border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
               onClick={handleDeployAgent}
             >
               <Plus className="mr-2 h-4 w-4" /> Deploy New Agent
             </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Time Assassin Detector */}
       <Card className="bg-slate-900 text-white border-none relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
        <CardContent className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div>
             <div className="flex items-center gap-2 mb-2">
               <Badge variant="destructive" className="animate-pulse">Alert</Badge>
               <span className="text-sm text-slate-300">New Time Assassin Detected</span>
             </div>
             <h3 className="text-2xl font-bold mb-2">Manual Calendar Scheduling</h3>
             <p className="text-slate-300 max-w-xl">
               You spent <span className="text-white font-bold">4.5 hours</span> this week coordinating meetings. Deploy the "Schedule Bot" to reclaim this time immediately.
             </p>
           </div>
           <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 whitespace-nowrap" onClick={handleDeployFix}>
             Deploy Fix <ArrowRight className="ml-2 h-4 w-4" />
           </Button>
        </CardContent>
       </Card>

    </div>
  );
}