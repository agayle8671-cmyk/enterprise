import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronDown, Play } from "lucide-react";
import { useState } from "react";
import { WaveText } from "@/components/WaveText";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navigation - Clean, minimal */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-slate-900 rounded-md flex items-center justify-center text-white text-sm font-semibold">S</div>
            <span className="font-semibold text-slate-900"><WaveText text="Sovereign" /></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[13px] text-slate-600">
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#customers" className="hover:text-slate-900">Customers</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-[13px] text-slate-600 hover:text-slate-900" data-testid="button-login">
                Log in
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="text-[13px] bg-slate-900 hover:bg-slate-800" data-testid="button-get-started">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Asymmetrical, left-aligned, conversational */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm text-slate-500 mb-6">For consultants & agency owners</p>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-[1.15] tracking-tight mb-6">
                <WaveText text="Stop trading hours for dollars." />
                <br />
                <span className="text-slate-400">
                  <WaveText text="Start building a machine." />
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Sovereign helps you identify what to automate, what to delegate, 
                and what deserves your attention. Most of our users buy back 
                10+ hours in their first month.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/auth">
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 h-11 px-6" data-testid="button-hero-cta">
                    Start free trial
                  </Button>
                </Link>
                <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900" data-testid="button-watch-demo">
                  <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center">
                    <Play className="h-3 w-3 ml-0.5" />
                  </div>
                  Watch demo
                </button>
              </div>
              <p className="text-xs text-slate-400">
                No credit card required · 14-day trial · Cancel anytime
              </p>
            </div>
            
            {/* Product visual - simplified representation */}
            <div className="relative hidden lg:block">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-900 rounded-lg"></div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">This week</div>
                      <div className="text-xs text-slate-500">Jan 1 – Jan 7, 2026</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-slate-900">12.5 hrs</div>
                    <div className="text-xs text-emerald-600">reclaimed</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { task: "Email triage", time: "4.2 hrs", status: "Automated" },
                    { task: "Lead research", time: "3.8 hrs", status: "Automated" },
                    { task: "Invoice follow-ups", time: "2.1 hrs", status: "Automated" },
                    { task: "Content repurposing", time: "2.4 hrs", status: "Automated" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-slate-100">
                      <span className="text-sm text-slate-700">{item.task}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">{item.time}</span>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof - Simple, understated */}
      <section className="py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-sm text-slate-500">Trusted by 200+ operators running $50K–$5M agencies</p>
            <div className="flex items-center gap-8 text-slate-300">
              <span className="text-lg font-semibold">Acme</span>
              <span className="text-lg font-semibold">Vertex</span>
              <span className="text-lg font-semibold">Nexus</span>
              <span className="text-lg font-semibold">Scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution - Editorial style */}
      <section className="py-24" id="how">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              You're probably spending 60% of your time on work that doesn't grow your business.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Email, scheduling, research, follow-ups, content, invoicing—it all adds up. 
              Sovereign helps you see exactly where your time goes, then systematically 
              eliminates or automates the tasks that drain you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-5xl font-light text-slate-200">01</div>
              <h3 className="text-lg font-medium text-slate-900">Audit your week</h3>
              <p className="text-slate-600 leading-relaxed">
                We map every task to our DRIP framework: Delegate, Replace, Invest, or Produce. 
                You'll see exactly what's stealing your time.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-light text-slate-200">02</div>
              <h3 className="text-lg font-medium text-slate-900">Deploy agents</h3>
              <p className="text-slate-600 leading-relaxed">
                For tasks in the "Replace" quadrant, we spin up AI agents that handle them 24/7. 
                They only ping you when they need a decision.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-light text-slate-200">03</div>
              <h3 className="text-lg font-medium text-slate-900">Focus on what matters</h3>
              <p className="text-slate-600 leading-relaxed">
                Strategy. Relationships. Creative work. The stuff that actually grows 
                your business. That's where you should be spending your time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlight - Full width, editorial */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm text-slate-500 mb-4">The DRIP Matrix</p>
              <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                A framework for deciding what deserves your attention
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
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
                    <div className="h-6 w-6 rounded bg-slate-900 text-white text-xs flex items-center justify-center font-medium mt-0.5">
                      {item.label[0]}
                    </div>
                    <div>
                      <span className="font-medium text-slate-900">{item.label}</span>
                      <span className="text-slate-500"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-red-50 border border-red-100 rounded-lg p-6">
                  <div className="text-xs text-red-600 font-medium mb-2">REPLACE</div>
                  <div className="text-xl font-semibold text-slate-900">AI Agents</div>
                  <div className="text-sm text-slate-500 mt-1">Admin, email, research</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6">
                  <div className="text-xs text-emerald-600 font-medium mb-2">PRODUCE</div>
                  <div className="text-xl font-semibold text-slate-900">You</div>
                  <div className="text-sm text-slate-500 mt-1">Strategy, sales, creative</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <div className="text-xs text-slate-500 font-medium mb-2">DELEGATE</div>
                  <div className="text-lg font-semibold text-slate-700">Team / VA</div>
                  <div className="text-sm text-slate-500 mt-1">Support, operations</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <div className="text-xs text-slate-500 font-medium mb-2">INVEST</div>
                  <div className="text-lg font-semibold text-slate-700">Systems</div>
                  <div className="text-sm text-slate-500 mt-1">Training, tools, processes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Single, impactful */}
      <section className="py-24" id="customers">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl text-slate-700 leading-relaxed mb-8">
            "I was working 60-hour weeks and burning out. Within two months of using Sovereign, 
            I'd automated 15 hours of weekly busywork and doubled my close rate because I 
            finally had time to focus on sales calls."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-200"></div>
            <div className="text-left">
              <div className="font-medium text-slate-900">Marcus Johnson</div>
              <div className="text-sm text-slate-500">Founder, Scale Studio · $1.2M ARR</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Clean, no gimmicks */}
      <section className="py-24 bg-slate-50" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Simple pricing</h2>
            <p className="text-slate-600">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="border-slate-200" data-testid="card-pricing-starter">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-1">Starter</h3>
                  <p className="text-sm text-slate-500">For solo operators getting started</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-semibold text-slate-900">$197</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <Link href="/auth">
                  <Button variant="outline" className="w-full mb-6" data-testid="button-pricing-starter">
                    Start free trial
                  </Button>
                </Link>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> Time audit dashboard</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> 3 AI agents</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> DRIP Matrix analysis</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> Email support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-900 bg-slate-900 text-white" data-testid="card-pricing-pro">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-1">Pro</h3>
                  <p className="text-sm text-slate-400">For agencies scaling beyond the founder</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-semibold">$497</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <Link href="/auth">
                  <Button className="w-full mb-6 bg-white text-slate-900 hover:bg-slate-100" data-testid="button-pricing-pro">
                    Start free trial
                  </Button>
                </Link>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-500" /> Everything in Starter</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-500" /> Unlimited AI agents</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-500" /> Team seats (up to 5)</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-500" /> Client portal</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-500" /> Priority support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ - Minimal */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-12 text-center">Questions</h2>
          <div className="space-y-0 border-t border-slate-200">
            {[
              { q: "What exactly are AI agents?", a: "They're automated workflows that handle specific tasks—email triage, lead research, content repurposing, etc. They run in the background and only notify you when they need a decision." },
              { q: "How long does setup take?", a: "Most users complete their time audit and deploy their first agent within an hour. We guide you through the whole process." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts, no commitments. Cancel with one click and you won't be charged again." },
              { q: "Do you integrate with my existing tools?", a: "We integrate with most CRMs, calendars, and communication tools. If something's missing, let us know—we ship new integrations weekly." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-200" data-testid={`faq-${i}`}>
                <button 
                  className="w-full py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-slate-900">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-slate-600 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Simple, direct */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to see where your time actually goes?
          </h2>
          <p className="text-slate-400 mb-8">
            Start with a free time audit. Takes 10 minutes. No credit card required.
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-11 px-8" data-testid="button-final-cta">
              Start free trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-semibold">S</div>
              <span className="text-sm text-slate-500">© 2026 Sovereign</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
