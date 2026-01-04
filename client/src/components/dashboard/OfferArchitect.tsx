import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, ArrowRight, Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function OfferArchitect({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | { headline: string; bullets: string[] }>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        headline: "I help B2B SaaS Founders add $1M ARR in 12 months without ads or cold outreach.",
        bullets: [
          "The 'Sovereign Scale' Methodology",
          "Guaranteed 30 Qualified Leads/Month",
          "Done-For-You Sales Asset Creation"
        ]
      });
      setStep(3);
    }, 2000);
  };

  const reset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wider">AI Offer Architect</span>
              </div>
              <DialogTitle className="text-2xl font-display">Define Your Core Skills</DialogTitle>
              <DialogDescription>
                Tell the AI what you're good at, and we'll construct a high-ticket "Grand Slam Offer" for you.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="niche">Who do you want to help?</Label>
                <Input id="niche" placeholder="e.g. Dentists, SaaS Founders, E-com Brands" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="skill">What is your primary hard skill?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid-ads">Paid Advertising</SelectItem>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="design">UI/UX Design</SelectItem>
                    <SelectItem value="sales">Sales Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pain">What is their biggest pain point?</Label>
                <Textarea id="pain" placeholder="e.g. They can't get consistent leads..." />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setStep(2)}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
             <DialogHeader>
              <DialogTitle className="text-2xl font-display">Analyzing Market Data...</DialogTitle>
              <DialogDescription>
                We are scanning 10,000+ proven offers to find the perfect angle for your niche.
              </DialogDescription>
            </DialogHeader>
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
               {isGenerating ? (
                 <>
                   <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                   <p className="text-slate-500 animate-pulse">Constructing "Transformation Statement"...</p>
                 </>
               ) : (
                 <div className="w-full space-y-4">
                    <Button onClick={handleGenerate} size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                      <Sparkles className="mr-2 h-5 w-5" /> Generate Grand Slam Offer
                    </Button>
                 </div>
               )}
            </div>
          </>
        )}

        {step === 3 && result && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <Check className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Offer Generated</span>
              </div>
              <DialogTitle className="text-2xl font-display">Your New High-Ticket Offer</DialogTitle>
              <DialogDescription>
                This transformation statement is designed to validate your "Founding 50" campaign.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              <Card className="bg-slate-50 border-blue-100 shadow-inner">
                <div className="p-6 text-center">
                   <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-4">Transformation Statement</p>
                   <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
                     "{result.headline}"
                   </h3>
                </div>
              </Card>

              <div className="space-y-3">
                <Label>Core Deliverables</Label>
                {result.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="font-medium text-slate-700">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={reset}>Try Again</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Save & Launch Campaign
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}