import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronDown, Play } from "lucide-react";
import { useState } from "react";
import { WaveText } from "@/components/WaveText";
import { MusicalType } from "@/components/TypewriterText";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FBFBFD] font-sans antialiased">
      {/* Navigation - Apple-style minimal */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-200/50">
        <div className="max-w-[1200px] mx-auto px-8 md:px-10 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm font-medium">S</div>
            <span className="font-medium text-[15px] text-slate-900"><WaveText text="Sovereign" /></span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-slate-500">
            <a href="#how" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#customers" className="hover:text-slate-900 transition-colors">Customers</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-[13px] text-slate-500 hover:text-slate-900 hover:bg-transparent" data-testid="button-login">
                Sign in
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="text-[13px] bg-slate-900 hover:bg-slate-800 rounded-full px-4 h-8" data-testid="button-get-started">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Apple-style generous spacing */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-8 md:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[13px] text-slate-400 mb-5 tracking-wide uppercase">For consultants & agency owners</p>
              <h1 className="text-[42px] md:text-[56px] font-medium text-slate-900 leading-[1.08] tracking-[-0.02em] mb-6">
                <WaveText text="Stop trading hours for dollars." />
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #0f172a' }}>
                  <WaveText text="Start building a machine." />
                </span>
              </h1>
              <p className="text-[17px] text-slate-500 leading-[1.65] mb-10 max-w-md">
                Sovereign helps you identify what to automate, what to delegate, 
                and what deserves your attention. Most users reclaim 10+ hours 
                in their first month.
              </p>
              <div className="flex items-center gap-5 mb-6">
                <Link href="/auth">
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 h-12 px-7 rounded-full text-[15px] font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300" data-testid="button-hero-cta">
                    Start free trial
                  </Button>
                </Link>
                <button className="flex items-center gap-2.5 text-[14px] text-slate-500 hover:text-slate-900 transition-colors" data-testid="button-watch-demo">
                  <div className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm">
                    <Play className="h-3.5 w-3.5 ml-0.5 text-slate-600" />
                  </div>
                  Watch demo
                </button>
              </div>
              <p className="text-[12px] text-slate-400 tracking-wide">
                No credit card required · 14-day trial · Cancel anytime
              </p>
            </div>
            
            {/* Product visual - Apple-style card */}
            <div className="relative hidden lg:block animate-subtle-float">
              <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-white/60 p-7 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-slate-900 rounded-xl"></div>
                    <div>
                      <div className="text-[14px] font-medium text-slate-900">This week</div>
                      <div className="text-[12px] text-slate-400">Jan 1 – Jan 7, 2026</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[28px] font-semibold text-slate-900 tracking-tight">12.5 hrs</div>
                    <div className="text-[12px] text-emerald-500 font-medium">reclaimed</div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { task: "Email triage", time: "4.2 hrs", status: "Automated" },
                    { task: "Lead research", time: "3.8 hrs", status: "Automated" },
                    { task: "Invoice follow-ups", time: "2.1 hrs", status: "Automated" },
                    { task: "Content repurposing", time: "2.4 hrs", status: "Automated" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 bg-slate-50/80 rounded-xl">
                      <span className="text-[14px] text-slate-700">{item.task}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] text-slate-400">{item.time}</span>
                        <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof - Minimal */}
      <section className="py-10 border-y border-slate-100/80">
        <div className="max-w-[1200px] mx-auto px-8 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[13px] text-slate-400">Trusted by 200+ operators running $50K–$5M agencies</p>
            <div className="flex items-center gap-10 text-slate-200">
              <span className="text-[15px] font-medium tracking-wide">Acme</span>
              <span className="text-[15px] font-medium tracking-wide">Vertex</span>
              <span className="text-[15px] font-medium tracking-wide">Nexus</span>
              <span className="text-[15px] font-medium tracking-wide">Scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution - Apple-style generous spacing */}
      <section className="py-28" id="how">
        <div className="max-w-[1200px] mx-auto px-8 md:px-10">
          <div className="max-w-xl mb-20">
            <h2 className="text-[32px] md:text-[40px] font-medium text-slate-900 leading-[1.15] tracking-[-0.02em] mb-5">
              You're probably spending 60% of your time on work that doesn't grow your business.
            </h2>
            <p className="text-[17px] text-slate-500 leading-[1.7]">
              Email, scheduling, research, follow-ups, content, invoicing—it all adds up. 
              Sovereign helps you see exactly where your time goes, then systematically 
              eliminates or automates the tasks that drain you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 group">
              <div className="text-[56px] font-light text-slate-100 leading-none">01</div>
              <h3 className="text-[17px] font-medium text-slate-900 h-7">
                <MusicalType 
                  words={["Audit your week", "Map your time", "Find the waste"]} 
                  baseDelay={0}
                />
              </h3>
              <p className="text-[15px] text-slate-500 leading-[1.7]">
                We map every task to our DRIP framework: Delegate, Replace, Invest, or Produce. 
                You'll see exactly what's stealing your time.
              </p>
            </div>
            <div className="space-y-4 group">
              <div className="text-[56px] font-light text-slate-100 leading-none">02</div>
              <h3 className="text-[17px] font-medium text-slate-900 h-7">
                <MusicalType 
                  words={["Deploy agents", "Automate tasks", "Work smarter"]} 
                  baseDelay={800}
                />
              </h3>
              <p className="text-[15px] text-slate-500 leading-[1.7]">
                For tasks in the "Replace" quadrant, we spin up AI agents that handle them 24/7. 
                They only ping you when they need a decision.
              </p>
            </div>
            <div className="space-y-4 group">
              <div className="text-[56px] font-light text-slate-100 leading-none">03</div>
              <h3 className="text-[17px] font-medium text-slate-900 h-7">
                <MusicalType 
                  words={["Focus on what matters", "Do meaningful work", "Grow your business"]} 
                  baseDelay={1600}
                />
              </h3>
              <p className="text-[15px] text-slate-500 leading-[1.7]">
                Strategy. Relationships. Creative work. The stuff that actually grows 
                your business. That's where you should be spending your time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlight - Apple-style */}
      <section className="py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 md:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[12px] text-slate-400 mb-4 uppercase tracking-widest">The DRIP Matrix</p>
              <h2 className="text-[32px] md:text-[36px] font-medium text-slate-900 leading-[1.15] tracking-[-0.02em] mb-6">
                A framework for deciding what deserves your attention
              </h2>
              <p className="text-[16px] text-slate-500 leading-[1.7] mb-8">
                Every task falls into one of four categories based on two factors: 
                how much energy it costs you, and how much value it creates. 
                The matrix makes the right choice obvious.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Delegate", desc: "Low value, but someone else can do it" },
                  { label: "Replace", desc: "Low value, and AI can handle it entirely" },
                  { label: "Invest", desc: "High value, but draining—find leverage" },
                  { label: "Produce", desc: "High value, high energy—this is your zone" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-lg bg-slate-900 text-white text-[11px] flex items-center justify-center font-medium">
                      {item.label[0]}
                    </div>
                    <div className="pt-0.5">
                      <span className="font-medium text-[15px] text-slate-900">{item.label}</span>
                      <span className="text-[15px] text-slate-400"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#FBFBFD] rounded-[20px] border border-slate-200/60 p-8 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.1)]">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-rose-50/80 border border-rose-100/60 rounded-2xl p-6 glow-hover transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default">
                  <div className="text-[10px] text-rose-500 font-medium mb-2 uppercase tracking-wider">Replace</div>
                  <div className="text-[18px] font-medium text-slate-900">AI Agents</div>
                  <div className="text-[13px] text-slate-400 mt-1">Admin, email, research</div>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-100/60 rounded-2xl p-6 glow-hover transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default">
                  <div className="text-[10px] text-emerald-500 font-medium mb-2 uppercase tracking-wider">Produce</div>
                  <div className="text-[18px] font-medium text-slate-900">You</div>
                  <div className="text-[13px] text-slate-400 mt-1">Strategy, sales, creative</div>
                </div>
                <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-6 glow-hover transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default">
                  <div className="text-[10px] text-slate-400 font-medium mb-2 uppercase tracking-wider">Delegate</div>
                  <div className="text-[17px] font-medium text-slate-600">Team / VA</div>
                  <div className="text-[13px] text-slate-400 mt-1">Support, operations</div>
                </div>
                <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-6 glow-hover transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default">
                  <div className="text-[10px] text-slate-400 font-medium mb-2 uppercase tracking-wider">Invest</div>
                  <div className="text-[17px] font-medium text-slate-600">Systems</div>
                  <div className="text-[13px] text-slate-400 mt-1">Training, tools, processes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Apple-style centered */}
      <section className="py-28 bg-[#FBFBFD]" id="customers">
        <div className="max-w-3xl mx-auto px-8 md:px-10 text-center">
          <p className="text-[24px] md:text-[28px] text-slate-600 leading-[1.5] font-light mb-10">
            "I was working 60-hour weeks and burning out. Within two months of using Sovereign, 
            I'd automated 15 hours of weekly busywork and doubled my close rate because I 
            finally had time to focus on sales calls."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-slate-200 to-slate-300"></div>
            <div className="text-left">
              <div className="font-medium text-[15px] text-slate-900">Marcus Johnson</div>
              <div className="text-[13px] text-slate-400">Founder, Scale Studio · $1.2M ARR</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Apple-style clean */}
      <section className="py-28 bg-white" id="pricing">
        <div className="max-w-[1000px] mx-auto px-8 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-medium text-slate-900 tracking-[-0.02em] mb-4">Simple pricing</h2>
            <p className="text-[17px] text-slate-400">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="border-slate-200/70 rounded-[20px] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 glow-hover" data-testid="card-pricing-starter">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-[17px] font-medium text-slate-900 mb-1">Starter</h3>
                  <p className="text-[13px] text-slate-400">For solo operators getting started</p>
                </div>
                <div className="mb-6">
                  <span className="text-[40px] font-medium text-slate-900 tracking-tight">$197</span>
                  <span className="text-[15px] text-slate-400">/month</span>
                </div>
                <Link href="/auth">
                  <Button variant="outline" className="w-full mb-6 rounded-full h-11 text-[14px] border-slate-200" data-testid="button-pricing-starter">
                    Start free trial
                  </Button>
                </Link>
                <ul className="space-y-3 text-[14px] text-slate-500">
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-300" /> Time audit dashboard</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-300" /> 3 AI agents</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-300" /> DRIP Matrix analysis</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-300" /> Email support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-900 bg-slate-900 text-white rounded-[20px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]" data-testid="card-pricing-pro">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-[17px] font-medium mb-1">Pro</h3>
                  <p className="text-[13px] text-slate-400">For agencies scaling beyond the founder</p>
                </div>
                <div className="mb-6">
                  <span className="text-[40px] font-medium tracking-tight">$497</span>
                  <span className="text-[15px] text-slate-400">/month</span>
                </div>
                <Link href="/auth">
                  <Button className="w-full mb-6 bg-white text-slate-900 hover:bg-slate-100 rounded-full h-11 text-[14px]" data-testid="button-pricing-pro">
                    Start free trial
                  </Button>
                </Link>
                <ul className="space-y-3 text-[14px] text-slate-300">
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-500" /> Everything in Starter</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-500" /> Unlimited AI agents</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-500" /> Team seats (up to 5)</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-500" /> Client portal</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-slate-500" /> Priority support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ - Apple-style minimal */}
      <section className="py-28 bg-[#FBFBFD]">
        <div className="max-w-2xl mx-auto px-8 md:px-10">
          <h2 className="text-[28px] font-medium text-slate-900 mb-12 text-center tracking-[-0.02em]">Questions</h2>
          <div className="space-y-0 border-t border-slate-200/60">
            {[
              { q: "What exactly are AI agents?", a: "They're automated workflows that handle specific tasks—email triage, lead research, content repurposing, etc. They run in the background and only notify you when they need a decision." },
              { q: "How long does setup take?", a: "Most users complete their time audit and deploy their first agent within an hour. We guide you through the whole process." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts, no commitments. Cancel with one click and you won't be charged again." },
              { q: "Do you integrate with my existing tools?", a: "We integrate with most CRMs, calendars, and communication tools. If something's missing, let us know—we ship new integrations weekly." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-200/60" data-testid={`faq-${i}`}>
                <button 
                  className="w-full py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-[15px] text-slate-900">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-[15px] text-slate-500 leading-[1.7]">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Apple-style */}
      <section className="py-28 bg-slate-900">
        <div className="max-w-2xl mx-auto px-8 md:px-10 text-center">
          <h2 className="text-[32px] md:text-[40px] font-medium text-white tracking-[-0.02em] mb-5">
            Ready to see where your time actually goes?
          </h2>
          <p className="text-[17px] text-slate-400 mb-10">
            Start with a free time audit. Takes 10 minutes. No credit card required.
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 rounded-full text-[15px] font-medium shadow-[0_4px_14px_0_rgba(255,255,255,0.2)]" data-testid="button-final-cta">
              Start free trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Apple-style minimal */}
      <footer className="py-10 bg-slate-950 text-slate-400">
        <div className="max-w-[1200px] mx-auto px-8 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 bg-slate-800 rounded-lg flex items-center justify-center text-white text-[10px] font-medium">S</div>
              <span className="text-[13px] text-slate-500">© 2026 Sovereign</span>
            </div>
            <div className="flex items-center gap-8 text-[13px]">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
