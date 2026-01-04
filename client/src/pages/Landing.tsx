import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, BarChart3, Users, Zap, ShieldCheck } from "lucide-react";
import generatedImage from "@assets/generated_images/abstract_enterprise_technology_background_with_dark_slate_and_purple_gradients.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">Sovereign OS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
            <a href="#methodology" className="hover:text-slate-900 transition-colors">Methodology</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="font-medium">Log in</Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={generatedImage} 
            alt="Abstract Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-8 animate-in fade-in zoom-in duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting Founding 50 Members
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            The Operating System for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Autonomous Enterprise</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Operationalize the "Buyback Loop." Replace low-value tasks with autonomous AI agents. Scale your high-ticket offer without scaling headcount.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/auth">
              <Button size="lg" className="h-12 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 rounded-full">
                Start Your Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-slate-300 hover:bg-white hover:text-slate-900 rounded-full">
              View Methodology
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white border-t border-slate-100" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "The Founding 50",
                desc: "Launch mechanics designed to validate high-ticket offers by securing 50 founding members before building infrastructure."
              },
              {
                icon: Zap,
                title: "Buyback Autopilot",
                desc: "Identify 'Time Assassin' tasks and transfer them to autonomous AI agents or white-label partners instantly."
              },
              {
                icon: BarChart3,
                title: "Profit Analytics",
                desc: "Real-time dashboard tracking your 'Buyback Rate'—the true measure of profitability per hour invested."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                <div className="h-12 w-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-display text-3xl font-bold mb-16">Trusted by High-Ticket Founders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
            {/* Logos would go here, using text for now */}
            <div className="font-display text-2xl font-bold">Acme Corp</div>
            <div className="font-display text-2xl font-bold">Global Scale</div>
            <div className="font-display text-2xl font-bold">Nexus AI</div>
            <div className="font-display text-2xl font-bold">Vertex Ventures</div>
          </div>
        </div>
      </section>
    </div>
  );
}