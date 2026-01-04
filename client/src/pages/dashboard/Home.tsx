import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, DollarSign, Users, Activity, MoreHorizontal, ArrowRight, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 8390 },
  { name: 'Sun', value: 10490 },
];

const buybackData = [
  { name: 'Wk 1', hours: 12 },
  { name: 'Wk 2', hours: 19 },
  { name: 'Wk 3', hours: 25 },
  { name: 'Wk 4', hours: 42 },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back, James. Here's your agency's performance at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Monthly Revenue", value: "$42,593", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-blue-600" },
          { title: "Buyback Hours", value: "142 hrs", change: "+8.2%", trend: "up", icon: Clock, color: "text-purple-600" },
          { title: "Active Leads", value: "64", change: "-2.4%", trend: "down", icon: Users, color: "text-emerald-600" },
          { title: "Avg. Deal Value", value: "$8,500", change: "+4.1%", trend: "up", icon: Activity, color: "text-orange-600" },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-emerald-600" : "text-red-500"} flex items-center`}>
                {stat.change}
                <span className="text-slate-400 ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="col-span-1 lg:col-span-2 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Revenue Velocity</CardTitle>
            <CardDescription>Income generated vs. projected based on current pipeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Chart */}
        <Card className="col-span-1 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Time Buyback</CardTitle>
            <CardDescription>Hours reclaimed via automation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buybackData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <Tooltip 
                     cursor={{fill: 'transparent'}}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Task Automations</CardTitle>
            <CardDescription>Live feed of the "Buyback Loop" in action.</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { task: "Client Onboarding Sequence", agent: "Onboarding Bot", time: "2 mins ago", status: "Completed", saved: "45 mins" },
              { task: "Weekly Report Generation", agent: "Analytics Agent", time: "1 hour ago", status: "Completed", saved: "1.5 hours" },
              { task: "Lead Qualification", agent: "Sales Bot", time: "3 hours ago", status: "Processing", saved: "Pending" },
              { task: "Invoice Reconciliation", agent: "Finance Bot", time: "5 hours ago", status: "Completed", saved: "2 hours" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{item.task}</p>
                    <p className="text-sm text-slate-500">via {item.agent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">Saved {item.saved}</p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}