import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, UserPlus, Mail, MessageSquare, ArrowRight } from "lucide-react";

import { OfferArchitect } from "@/components/dashboard/OfferArchitect";

export default function Founding50() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">The Founding 50 Launchpad</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Validate your high-ticket offer by securing 50 founding members.</p>
        </div>
        <div className="flex gap-2">
          <OfferArchitect>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
               Launch Offer Architect
            </Button>
          </OfferArchitect>
          <Button className="bg-slate-900 text-white shadow-lg shadow-slate-900/20">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Manual Member
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Campaign Progress</h2>
              <p className="text-slate-500">Goal: 50 Founding Members</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-display font-bold text-blue-600">32</span>
              <span className="text-xl text-slate-400 font-medium">/50</span>
            </div>
          </div>
          <Progress value={64} className="h-3 bg-slate-100 dark:bg-slate-800" />
          <div className="grid grid-cols-3 gap-8 mt-8">
             <div>
               <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
               <p className="text-2xl font-bold text-slate-900 dark:text-white">$160,000</p>
             </div>
             <div>
               <p className="text-sm font-medium text-slate-500 mb-1">Conversion Rate</p>
               <p className="text-2xl font-bold text-emerald-600">24.5%</p>
             </div>
             <div>
               <p className="text-sm font-medium text-slate-500 mb-1">Waitlist Size</p>
               <p className="text-2xl font-bold text-slate-900 dark:text-white">418</p>
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-900">
          <CardHeader>
            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
              <Check className="h-4 w-4" />
            </div>
            <CardTitle>Phase 1: Offer Design</CardTitle>
            <CardDescription>Structure your "Grand Slam Offer"</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-400">
                <Check className="h-4 w-4" /> Transformation Statement
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-400">
                <Check className="h-4 w-4" /> Methodology Map
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-400">
                <Check className="h-4 w-4" /> Pricing Architecture
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800">
              Completed
            </Button>
          </CardFooter>
        </Card>

        {/* Step 2 */}
        <Card className="border-blue-200 bg-white shadow-lg ring-1 ring-blue-500/20 dark:bg-slate-900 dark:border-blue-900">
          <CardHeader>
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-2">
              2
            </div>
            <CardTitle className="text-blue-700 dark:text-blue-400">Phase 2: Validation</CardTitle>
            <CardDescription>Secure your first 10 members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Check className="h-4 w-4 text-emerald-500" /> Launch Waitlist Page
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" /> 
                Outreach Campaign (Active)
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="h-4 w-4 rounded-full border border-slate-300" /> 
                Conduct Sales Calls
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Manage Campaign
            </Button>
          </CardFooter>
        </Card>

        {/* Step 3 */}
        <Card className="border-slate-200 dark:border-slate-800 opacity-60">
          <CardHeader>
            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold mb-2">
              3
            </div>
            <CardTitle>Phase 3: Scaling</CardTitle>
            <CardDescription>Automate fulfillment & cap out</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-2 text-sm text-slate-400">
               <div>Waitlist Activation</div>
               <div>Referral Loop Setup</div>
               <div>Community Launch</div>
             </div>
          </CardContent>
          <CardFooter>
            <Button disabled variant="secondary" className="w-full">
              Locked
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Waitlist Table */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Waitlist & Applicants</CardTitle>
          <CardDescription>Prioritize high-value prospects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                   { name: "Sarah Connor", company: "SkyNet Systems", rev: "$5M+", score: 98, status: "High Priority" },
                   { name: "John Wick", company: "Continental Services", rev: "$2M - $5M", score: 85, status: "Qualified" },
                   { name: "Bruce Wayne", company: "Wayne Ent", rev: "$10M+", score: 92, status: "High Priority" },
                   { name: "Tony Stark", company: "Stark Ind", rev: "$50M+", score: 99, status: "VIP" },
                   { name: "Peter Parker", company: "Freelance Photo", rev: "<$100k", score: 45, status: "Nurture" },
                ].map((row, i) => (
                  <tr key={i} className="bg-white border-b dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.name}</td>
                    <td className="px-6 py-4 text-slate-500">{row.company}</td>
                    <td className="px-6 py-4 text-slate-500">{row.rev}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full ${row.score > 90 ? 'bg-emerald-500' : row.score > 70 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${row.score}%` }}></div>
                        </div>
                        <span className="text-xs font-medium">{row.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={row.status === "VIP" || row.status === "High Priority" ? "default" : "secondary"}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Review <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}