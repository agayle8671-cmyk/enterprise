import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Check, UserPlus, Mail, MessageSquare, ArrowRight, Filter, 
  Download, Trash2, MoreHorizontal, ChevronLeft, ChevronRight,
  Search, SlidersHorizontal, ArrowUpDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { OfferArchitect } from "@/components/dashboard/OfferArchitect";
import { UtilityBuilder } from "@/components/dashboard/UtilityBuilder";
import { SocialProofGenerator } from "@/components/dashboard/SocialProofGenerator";

export default function Founding50() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
    } else {
      setSelectedRows([0, 1, 2, 3, 4]);
      setIsAllSelected(true);
    }
  };

  const toggleRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
      setIsAllSelected(false);
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const waitlistData = [
     { name: "Sarah Connor", email: "sarah@skynet.com", company: "SkyNet Systems", rev: "$5M+", score: 98, status: "High Priority", date: "Jan 04, 2026" },
     { name: "John Wick", email: "j.wick@continental.com", company: "Continental Services", rev: "$2M - $5M", score: 85, status: "Qualified", date: "Jan 03, 2026" },
     { name: "Bruce Wayne", email: "bruce@wayne.ent", company: "Wayne Enterprises", rev: "$10M+", score: 92, status: "High Priority", date: "Jan 02, 2026" },
     { name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", rev: "$50M+", score: 99, status: "VIP", date: "Jan 01, 2026" },
     { name: "Peter Parker", email: "peter@dailybugle.com", company: "Freelance Photo", rev: "<$100k", score: 45, status: "Nurture", date: "Dec 31, 2025" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <UtilityBuilder />
        <SocialProofGenerator />
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

      {/* Enterprise Waitlist Table */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Waitlist Management</CardTitle>
              <CardDescription>Prioritize and qualify high-value prospects.</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedRows.length > 0 && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 mr-2">
                  <span className="text-sm text-slate-500">{selectedRows.length} selected</span>
                  <Button size="sm" variant="outline" className="h-8"><Mail className="h-3.5 w-3.5 mr-2" /> Email</Button>
                  <Button size="sm" variant="outline" className="h-8 text-red-600 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /></Button>
                  <div className="h-4 w-px bg-slate-200 mx-2" />
                </div>
              )}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <Input placeholder="Search leads..." className="pl-8 h-9 w-40 md:w-64" />
              </div>
              <Button variant="outline" size="sm" className="h-9"><SlidersHorizontal className="h-3.5 w-3.5 mr-2" /> Filter</Button>
              <Button variant="outline" size="sm" className="h-9"><Download className="h-3.5 w-3.5 mr-2" /> Export</Button>
            </div>
          </div>
        </CardHeader>
        <div className="border-t border-slate-100 dark:border-slate-800">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3 w-4">
                    <Checkbox 
                      checked={isAllSelected}
                      onCheckedChange={toggleAll}
                    />
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-1">Name <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group">
                     <div className="flex items-center gap-1">Company <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group">
                     <div className="flex items-center gap-1">Revenue <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group">
                     <div className="flex items-center gap-1">Score <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {waitlistData.map((row, i) => (
                  <tr key={i} className={`bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${selectedRows.includes(i) ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
                    <td className="px-6 py-4">
                      <Checkbox 
                        checked={selectedRows.includes(i)}
                        onCheckedChange={() => toggleRow(i)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">{row.name}</span>
                        <span className="text-xs text-slate-500">{row.email}</span>
                      </div>
                    </td>
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
                      <Badge variant="outline" className={`
                        ${row.status === "VIP" ? "border-purple-200 text-purple-700 bg-purple-50" : 
                          row.status === "High Priority" ? "border-emerald-200 text-emerald-700 bg-emerald-50" :
                          row.status === "Qualified" ? "border-blue-200 text-blue-700 bg-blue-50" :
                          "border-slate-200 text-slate-600 bg-slate-50"}
                      `}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Review Application</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Reject Lead</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium">1-5</span> of <span className="font-medium">418</span> leads
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}