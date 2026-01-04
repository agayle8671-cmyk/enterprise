import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Globe, Lock, Mail, User, Zap, Bell, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your account, billing, and system preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 h-auto">
          <TabsTrigger value="general" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">General</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Billing & Plans</TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Team Members</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800">Integrations</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
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

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive alerts and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium text-slate-900 dark:text-white">Buyback Alerts</div>
                  <div className="text-sm text-slate-500">Receive notifications when "Time Assassin" tasks are detected.</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium text-slate-900 dark:text-white">Weekly Report</div>
                  <div className="text-sm text-slate-500">Get a summary of automated hours and revenue every Monday.</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium text-slate-900 dark:text-white">New Agent Availability</div>
                  <div className="text-sm text-slate-500">Notify me when new AI agent capabilities are released.</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
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
        <TabsContent value="integrations" className="space-y-6">
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