import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, Globe, Lock, Mail, User, Zap, Bell, Shield, 
  Users, Key, Activity, Search, FileText, Download, Filter 
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Settings & Administration</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your organization, team permissions, and security compliance.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" /> Export Audit Log
        </Button>
      </div>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 h-auto w-full md:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="general" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">General</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Billing</TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Team & Roles</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Security & Audit</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Integrations</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your public profile and personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-slate-100 dark:border-slate-800">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="James" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input id="email" className="pl-9" defaultValue="james@sovereign.os" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Sovereign Operator" disabled className="bg-slate-50 text-slate-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Team & Roles Tab (RBAC) */}
        <TabsContent value="team" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members & Permissions</CardTitle>
                <CardDescription>Manage access control and role assignments.</CardDescription>
              </div>
              <Button className="bg-slate-900 text-white gap-2">
                <Users className="h-4 w-4" /> Invite Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Permissions</th>
                      <th className="px-4 py-3">Last Active</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: "James Doe", email: "james@sovereign.os", role: "Owner", roleColor: "bg-purple-100 text-purple-700", perms: "Full Access", active: "Now" },
                      { name: "Sarah Connor", email: "sarah@sovereign.os", role: "Admin", roleColor: "bg-blue-100 text-blue-700", perms: "Manage Agents, Billing", active: "2h ago" },
                      { name: "Mike Ross", email: "mike@sovereign.os", role: "Editor", roleColor: "bg-slate-100 text-slate-700", perms: "Content, Launchpad", active: "1d ago" },
                      { name: "AI Support", email: "support@agent.bot", role: "Service Account", roleColor: "bg-emerald-100 text-emerald-700", perms: "Read-Only", active: "5m ago" },
                    ].map((user, i) => (
                      <tr key={i} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-slate-900">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className={`${user.roleColor} border-none`}>{user.role}</Badge>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{user.perms}</td>
                        <td className="px-4 py-3 text-slate-500">{user.active}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Audit Tab */}
        <TabsContent value="security" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="border-slate-200">
               <CardHeader>
                 <CardTitle className="text-base">MFA Status</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-emerald-600 font-medium">
                     <Shield className="h-5 w-5" /> Enabled
                   </div>
                   <Switch checked />
                 </div>
               </CardContent>
             </Card>
             <Card className="border-slate-200">
               <CardHeader>
                 <CardTitle className="text-base">SSO Configuration</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-slate-500 font-medium">
                     <Key className="h-5 w-5" /> Disabled
                   </div>
                   <Switch />
                 </div>
               </CardContent>
             </Card>
             <Card className="border-slate-200">
               <CardHeader>
                 <CardTitle className="text-base">Session Timeout</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-900 font-medium">30 Minutes</span>
                   <Button variant="ghost" size="sm">Edit</Button>
                 </div>
               </CardContent>
             </Card>
           </div>

           <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>Track all system activity and sensitive actions.</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input placeholder="Filter logs..." className="pl-9 w-64" />
                </div>
                <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                <Button variant="outline"><Download className="h-4 w-4 mr-2" /> CSV</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">IP Address</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { event: "Agent Deployed: Invoice Chaser", user: "James Doe", ip: "192.168.1.1", date: "Jan 04, 14:30", status: "Success" },
                      { event: "Billing Method Updated", user: "Sarah Connor", ip: "10.0.0.42", date: "Jan 04, 11:15", status: "Success" },
                      { event: "Failed Login Attempt", user: "Unknown", ip: "45.22.19.11", date: "Jan 03, 23:40", status: "Failed" },
                      { event: "Exported Client List", user: "Mike Ross", ip: "192.168.1.5", date: "Jan 03, 09:20", status: "Warning" },
                      { event: "API Key Generated", user: "James Doe", ip: "192.168.1.1", date: "Jan 02, 16:45", status: "Success" },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900">{log.event}</td>
                        <td className="px-4 py-3 text-slate-500">{log.user}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.ip}</td>
                        <td className="px-4 py-3 text-slate-500">{log.date}</td>
                        <td className="px-4 py-3 text-right">
                          <Badge variant="outline" className={
                            log.status === "Success" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                            log.status === "Failed" ? "text-red-600 border-red-200 bg-red-50" :
                            "text-orange-600 border-orange-200 bg-orange-50"
                          }>
                            {log.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-slate-200 dark:border-slate-800 bg-slate-900 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">Sovereign Pro Plan</CardTitle>
                  <CardDescription className="text-slate-400">Everything you need to scale to $1M ARR.</CardDescription>
                </div>
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-display font-bold">$299<span className="text-lg text-slate-400 font-normal">/month</span></div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Agent Usage</span>
                  <span className="font-medium">14,250 / 50,000 tokens</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[28%] bg-blue-500 rounded-full" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-400" /> 10 Active Agents
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" /> Enterprise Security
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-400" /> Custom Domain
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-400" /> Priority Support
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button variant="secondary" className="w-full sm:w-auto">Manage Subscription</Button>
            </CardFooter>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your credit cards and billing details.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                 <div className="h-10 w-14 bg-slate-100 rounded flex items-center justify-center">
                   <CreditCard className="h-6 w-6 text-slate-600" />
                 </div>
                 <div className="flex-1">
                   <p className="font-medium text-slate-900">Visa ending in 4242</p>
                   <p className="text-sm text-slate-500">Expiry 12/2028</p>
                 </div>
                 <Button variant="ghost" size="sm">Edit</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { name: "Stripe", desc: "Sync revenue data for Profit Analytics.", status: "Connected", color: "bg-[#635BFF]" },
               { name: "Slack", desc: "Receive agent alerts in your team channel.", status: "Connected", color: "bg-[#4A154B]" },
               { name: "Gmail", desc: "Allow 'Inbox Zero' agent to read/write emails.", status: "Connected", color: "bg-[#EA4335]" },
               { name: "HubSpot", desc: "Sync leads from Founding 50 waitlist.", status: "Disconnected", color: "bg-[#FF7A59]" },
               { name: "Notion", desc: "Export SOPs generated by the system.", status: "Disconnected", color: "bg-[#000000]" },
               { name: "OpenAI", desc: "Bring your own API key for custom agents.", status: "Disconnected", color: "bg-[#10A37F]" },
             ].map((integration, i) => (
               <Card key={i} className="border-slate-200 dark:border-slate-800 hover:border-slate-300 transition-colors">
                 <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                   <div className={`h-12 w-12 rounded-lg ${integration.color} flex items-center justify-center text-white font-bold text-xl`}>
                     {integration.name[0]}
                   </div>
                   <div className="flex-1">
                     <CardTitle className="text-base">{integration.name}</CardTitle>
                     <CardDescription className="mt-1">{integration.desc}</CardDescription>
                   </div>
                 </CardHeader>
                 <CardFooter>
                   {integration.status === "Connected" ? (
                     <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">Connected</Button>
                   ) : (
                     <Button variant="outline" className="w-full">Connect</Button>
                   )}
                 </CardFooter>
               </Card>
             ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}