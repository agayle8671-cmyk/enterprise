import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Clock, DollarSign, Users, Activity, MoreHorizontal, ArrowRight, Zap, TrendingUp, Calendar, Target, Award, Sparkles, FileText, Check } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useDashboardStats, useAgents, useDecisions, useContracts } from "@/lib/api";

const revenueData = [
  { name: 'Mon', value: 4200, prev: 3800 },
  { name: 'Tue', value: 3800, prev: 3900 },
  { name: 'Wed', value: 5500, prev: 4200 },
  { name: 'Thu', value: 4800, prev: 4100 },
  { name: 'Fri', value: 7200, prev: 5800 },
  { name: 'Sat', value: 9100, prev: 7400 },
  { name: 'Sun', value: 11200, prev: 8900 },
];

const buybackData = [
  { name: 'Wk 1', hours: 12, manual: 48 },
  { name: 'Wk 2', hours: 19, manual: 41 },
  { name: 'Wk 3', hours: 25, manual: 35 },
  { name: 'Wk 4', hours: 42, manual: 18 },
];

const pieData = [
  { name: 'Admin', value: 35, color: '#3b82f6' },
  { name: 'Delivery', value: 40, color: '#8b5cf6' },
  { name: 'Sales', value: 15, color: '#10b981' },
  { name: 'Marketing', value: 10, color: '#f59e0b' },
];

const performanceData = [
  { name: '00:00', load: 24, latency: 12 },
  { name: '04:00', load: 18, latency: 10 },
  { name: '08:00', load: 45, latency: 18 },
  { name: '12:00', load: 88, latency: 45 },
  { name: '16:00', load: 72, latency: 30 },
  { name: '20:00', load: 45, latency: 22 },
  { name: '23:59', load: 30, latency: 15 },
];

export default function Home() {
  const { toast } = useToast();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: agents, isLoading: agentsLoading } = useAgents();
  const { data: decisions, isLoading: decisionsLoading } = useDecisions();
  const { data: contracts, isLoading: contractsLoading } = useContracts();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "January 2026 performance report has been sent to your email.",
      duration: 3000,
    });
  };

  // Loading state
  if (statsLoading || agentsLoading || decisionsLoading || contractsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const campaign = stats?.campaigns?.[0];
  const totalRevenue = (campaign?.totalRevenue || 0) / 100;
  const activeLeadsCount = stats?.totalCampaigns || 0;
  const totalTimeSaved = stats?.totalTimeSaved || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back, James. Here's your agency's performance at a glance.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="hidden md:flex">
             <Calendar className="mr-2 h-4 w-4" /> Jan 2026
           </Button>
           <Button 
             className="bg-slate-900 text-white shadow-lg shadow-slate-900/20"
             onClick={handleGenerateReport}
           >
             <ArrowUpRight className="mr-2 h-4 w-4" /> Generate Report
           </Button>
        </div>
      </div>

      {/* AI Smart Insight Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex items-start gap-4 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="h-24 w-24 text-blue-600" />
        </div>
        <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-700 text-blue-600 z-10">
          <Zap className="h-5 w-5 fill-blue-600" />
        </div>
        <div className="flex-1 z-10">
          <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            AI Insight: Optimization Opportunity
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">New</Badge>
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-3xl">
            Based on recent "Buyback Loop" data, your <strong>Lead Qualification</strong> agent is handling 80% of volume but has a 12% drop-off rate. Deploying the new "Contextual Follow-up" module could recover ~$4,200 in monthly pipeline value.
          </p>
          <div className="mt-3 flex gap-3">
             <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs">Deploy Module</Button>
             <Button size="sm" variant="ghost" className="h-8 text-xs text-slate-500 hover:text-slate-700">Dismiss</Button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Monthly Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12.5%", trend: "up", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50", testId: "monthly-revenue", link: "/dashboard/founding-50" },
          { title: "Buyback Hours", value: `${totalTimeSaved} hrs`, change: "+8.2%", trend: "up", icon: Clock, color: "text-purple-600", bg: "bg-purple-50", testId: "buyback-hours", link: "/dashboard/buyback" },
          { title: "Active Leads", value: `${campaign?.currentMembers || 0}`, change: "+24.5%", trend: "up", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", testId: "active-leads", link: "/dashboard/founding-50" },
          { title: "Avg. Deal Value", value: `$${totalRevenue > 0 && campaign?.currentMembers ? Math.round(totalRevenue / campaign.currentMembers).toLocaleString() : '0'}`, change: "+4.1%", trend: "up", icon: Award, color: "text-orange-600", bg: "bg-orange-50", testId: "avg-deal-value", link: "/dashboard/founding-50" },
        ].map((stat, i) => (
          <Link key={i} href={stat.link}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-testid={`card-stat-${stat.testId}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  {stat.trend === "up" ? (
                    <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full" data-testid={`badge-change-${stat.testId}`}>
                      <TrendingUp className="h-3 w-3 mr-1" /> {stat.change}
                    </div>
                  ) : (
                    <div className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full" data-testid={`badge-change-${stat.testId}`}>
                      <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> {stat.change}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.title}</h3>
                  <div className="text-3xl font-display font-bold text-slate-900 dark:text-white" data-testid={`text-value-${stat.testId}`}>{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Revenue Velocity - Enhanced */}
        <Card className="col-span-1 lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl">Revenue Velocity</CardTitle>
              <CardDescription>Income generated vs. projected based on pipeline.</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
               <div className="flex items-center gap-1.5">
                 <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                 <span className="text-slate-600">Current</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <span className="h-3 w-3 rounded-full bg-slate-200"></span>
                 <span className="text-slate-600">Previous</span>
               </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                  />
                  <Area type="monotone" dataKey="prev" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Chart - Agent Distribution - New */}
        <Card className="col-span-1 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Workload Distribution</CardTitle>
            <CardDescription>Task volume by department.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 <span className="text-3xl font-bold text-slate-900">3,420</span>
                 <span className="text-xs text-slate-500 uppercase font-medium">Tasks</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Buyback - Stacked Bar */}
        <Card className="col-span-1 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Time Buyback Trend</CardTitle>
            <CardDescription>Automated vs. Manual Hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buybackData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <Tooltip 
                     cursor={{fill: 'transparent'}}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="manual" stackId="a" fill="#e2e8f0" radius={[0, 0, 4, 4]} barSize={32} name="Manual Work" />
                  <Bar dataKey="hours" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={32} name="Automated (Buyback)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Live Agent Performance - Line Chart */}
        <Card className="col-span-1 lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-xl">Agent Swarm Activity</CardTitle>
                  <CardDescription>Real-time system load and response latency.</CardDescription>
               </div>
               <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 gap-1.5 pl-1.5 pr-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live System
               </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Decision Feed & Active Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Decision Feed (Editor Mode) */}
        <Card className="col-span-1 lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
             <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Decision Feed
                  </CardTitle>
                  <CardDescription>Approve agent actions. You are the Editor, not the Worker.</CardDescription>
               </div>
               <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                 3 Pending
               </Badge>
             </div>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-100 dark:divide-slate-800">
               {[
                 { 
                   title: "Outreach Campaign Draft", 
                   agent: "Sales Bot", 
                   desc: "Drafted 50 personalized LinkedIn messages for the 'SaaS Founders' list. Ready for review.",
                   time: "10m ago",
                   type: "Review"
                 },
                 { 
                   title: "Client Reply: Scope Creep", 
                   agent: "Inbox Sentinel", 
                   desc: "Client X asked for extra revisions. I drafted a polite refusal citing the MSA. Approve to send?",
                   time: "32m ago",
                   type: "Decision"
                 },
                 { 
                   title: "Weekly Report Generation", 
                   agent: "Analytics Agent", 
                   desc: "Compiled Jan 2026 performance report. PDF ready for distribution.",
                   time: "1h ago",
                   type: "Review"
                 }
               ].map((item, i) => (
                 <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                   <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'Decision' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                        {item.type === 'Decision' ? <Zap className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{item.title}</h4>
                          <span className="text-xs text-slate-400">• {item.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 max-w-xl">{item.desc}</p>
                        <p className="text-xs text-slate-500">Proposed by <span className="font-medium text-slate-700">{item.agent}</span></p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 w-full md:w-auto pl-14 md:pl-0">
                     <Button variant="outline" size="sm" className="text-slate-500 hover:text-slate-700">Reject</Button>
                     <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                       <Check className="h-4 w-4 mr-1.5" /> Approve
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 justify-center">
             <Link href="/dashboard/buyback">
               <Button variant="ghost" className="text-sm text-slate-500" data-testid="button-view-all-decisions">
                 View All Decisions <ArrowRight className="h-4 w-4 ml-1" />
               </Button>
             </Link>
          </CardFooter>
        </Card>

        {/* Active Contracts (Fintech) */}
        <Card className="col-span-1 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
           <CardHeader>
             <div className="flex items-center justify-between">
               <div>
                 <CardTitle className="text-xl">Active Contracts</CardTitle>
                 <CardDescription>Embedded payments status.</CardDescription>
               </div>
               <Link href="/dashboard/founding-50">
                 <Button variant="ghost" size="sm" className="text-slate-500" data-testid="button-view-contracts">
                   View All <ArrowRight className="h-3 w-3 ml-1" />
                 </Button>
               </Link>
             </div>
           </CardHeader>
           <CardContent className="flex-1 space-y-4">
             {(contracts || []).length > 0 ? (contracts || []).slice(0, 2).map((contract: any, i: number) => (
               i === 0 ? (
                 <div key={contract.id} className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow" data-testid={`card-contract-${contract.id}`}>
                   <div className="absolute top-0 right-0 p-3 opacity-10">
                     <DollarSign className="h-24 w-24" />
                   </div>
                   <div className="relative z-10">
                     <div className="flex justify-between items-start mb-4">
                       <Badge className={`${contract.status === 'pending' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'} hover:opacity-80 border-none`}>
                         {contract.status === 'pending' ? 'Ready to Sign' : contract.status === 'paid' ? 'Paid' : contract.status}
                       </Badge>
                       <span className="text-slate-400 text-xs">Active</span>
                     </div>
                     <h3 className="font-bold text-lg mb-1" data-testid={`text-contract-name-${contract.id}`}>{contract.clientName}</h3>
                     <p className="text-3xl font-display font-bold text-white mb-4" data-testid={`text-contract-amount-${contract.id}`}>
                       ${((contract.amount || 0) / 100).toLocaleString()}
                     </p>
                     {contract.status === 'pending' && (
                       <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
                         <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                         Awaiting signature...
                       </div>
                     )}
                     <Button size="sm" variant="secondary" className="w-full" data-testid={`button-contract-action-${contract.id}`}>
                       {contract.status === 'pending' ? 'Resend Link' : 'View Details'}
                     </Button>
                   </div>
                 </div>
               ) : (
                 <div key={contract.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 transition-colors cursor-pointer" data-testid={`card-contract-${contract.id}`}>
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-semibold text-slate-900" data-testid={`text-contract-name-${contract.id}`}>{contract.clientName}</h4>
                       <span className="font-mono text-slate-900 font-bold" data-testid={`text-contract-amount-${contract.id}`}>
                         ${((contract.amount || 0) / 100).toLocaleString()}
                       </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{contract.status === 'paid' ? 'Deposit Paid' : contract.status}</span>
                      <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100">
                        {contract.status === 'paid' ? 'Active' : contract.status}
                      </Badge>
                    </div>
                 </div>
               )
             )) : (
               <div className="text-center text-slate-500 py-8">
                 No active contracts
               </div>
             )}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}