import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hammer, Calculator, Search, FileText, ArrowRight, Code } from "lucide-react";
import generatedImage from "@assets/generated_images/interface_mockup_of_an_roi_calculator_tool_clean_white_and_blue_theme_sliders_for_input_area_chart_showing_growth_data_grid_minimalist_saas_aesthetic_high_resolution.png";

export function UtilityBuilder() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 col-span-1 lg:col-span-2 overflow-hidden relative">
       <div className="absolute top-0 right-0 p-4 opacity-10">
         <Hammer className="w-32 h-32 text-slate-900" />
       </div>
       <CardHeader>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Engineering as Marketing</Badge>
        </div>
        <CardTitle className="text-xl mt-2">Lead Magnet Utility Builder</CardTitle>
        <CardDescription>
          Deploy interactive tools to your domain (tools.youragency.com) to generate high-quality leads.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-4">
           <div className="p-4 border border-slate-200 rounded-lg bg-white hover:border-blue-400 cursor-pointer transition-all group">
             <div className="flex items-start gap-3">
               <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <Calculator className="h-5 w-5" />
               </div>
               <div>
                 <h4 className="font-semibold text-slate-900">ROI Calculator</h4>
                 <p className="text-sm text-slate-500 mt-1">"Calculate how much [Problem] is costing you."</p>
               </div>
             </div>
           </div>

           <div className="p-4 border border-slate-200 rounded-lg bg-white hover:border-purple-400 cursor-pointer transition-all group">
             <div className="flex items-start gap-3">
               <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <Search className="h-5 w-5" />
               </div>
               <div>
                 <h4 className="font-semibold text-slate-900">SEO/Audit Grader</h4>
                 <p className="text-sm text-slate-500 mt-1">"Get a free [Niche] Readiness Score."</p>
               </div>
             </div>
           </div>

           <div className="p-4 border border-slate-200 rounded-lg bg-white hover:border-emerald-400 cursor-pointer transition-all group">
             <div className="flex items-start gap-3">
               <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                 <FileText className="h-5 w-5" />
               </div>
               <div>
                 <h4 className="font-semibold text-slate-900">SOP Generator</h4>
                 <p className="text-sm text-slate-500 mt-1">"Generate a custom [Process] for your team."</p>
               </div>
             </div>
           </div>
        </div>

        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 hidden md:block group">
           <img 
             src={generatedImage} 
             alt="Tool Preview" 
             className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-sm font-medium opacity-80 mb-1">Preview Template</p>
                <p className="font-bold text-lg">SaaS Pricing Calculator</p>
              </div>
           </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Code className="h-4 w-4" /> No-Code Builder
        </div>
        <Button size="sm" className="bg-slate-900 text-white">
          Start Building <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}