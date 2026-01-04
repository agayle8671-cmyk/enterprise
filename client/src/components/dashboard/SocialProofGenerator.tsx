import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Star, RefreshCw, Copy, CheckCircle } from "lucide-react";
import generatedImage from "@assets/generated_images/glassmorphic_testimonial_card_profile_picture_of_a_professional_5_stars_quote_bubbles_clean_typography_blurred_background_premium_design.png";

export function SocialProofGenerator() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 col-span-1 lg:col-span-1 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
           <div>
            <CardTitle className="text-xl">Synthetic Social Proof</CardTitle>
            <CardDescription>
              AI-curated testimonials from your communication channels.
            </CardDescription>
           </div>
           <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
             <Star className="w-3 h-3 mr-1 fill-purple-700" /> Beta
           </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        
        {/* Source Selector */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
           <Button variant="ghost" size="sm" className="flex-1 bg-white shadow-sm text-slate-900">
             <MessageSquare className="w-4 h-4 mr-2" /> Slack
           </Button>
           <Button variant="ghost" size="sm" className="flex-1 text-slate-500 hover:text-slate-900">
             <MessageSquare className="w-4 h-4 mr-2" /> Email
           </Button>
        </div>

        {/* Generated Card Preview */}
        <div className="relative group perspective-1000">
           <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                 <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                   <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                   <AvatarFallback>MC</AvatarFallback>
                 </Avatar>
                 <div>
                   <h4 className="font-bold text-slate-900">Michael Chen</h4>
                   <p className="text-xs text-slate-500">CTO @ NexusFlow</p>
                 </div>
                 <div className="ml-auto flex text-yellow-400">
                   {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                 </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed text-sm">
                "Honestly, the <span className="bg-yellow-100 text-yellow-800 px-1 font-semibold">Inbox Sentinel agent</span> saved me about 12 hours this week alone. I was skeptical about AI, but this is actual magic."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center"><ThumbsUp className="w-3 h-3 mr-1" /> Slack #general</span>
                <span>Verified by Sovereign OS</span>
              </div>
           </div>
           
           {/* Floating Action Overlay (Hover) */}
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
                 <Copy className="w-4 h-4 mr-2" /> Copy Asset
              </Button>
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white border-none">
                 <CheckCircle className="w-4 h-4 mr-2" /> Approve
              </Button>
           </div>
        </div>

        <div className="text-center">
          <Button variant="outline" size="sm" className="text-slate-500 hover:text-slate-900">
            <RefreshCw className="w-3 h-3 mr-2" /> Scan for new positive sentiment
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}