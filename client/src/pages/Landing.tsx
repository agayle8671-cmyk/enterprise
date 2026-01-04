import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowRight, CheckCircle2, BarChart3, Users, Zap, ShieldCheck, 
  Clock, Target, TrendingUp, Play, Star, ChevronRight, Sparkles,
  Bot, Workflow, FileText, DollarSign, Calendar, ArrowUpRight,
  Check, X, Menu
} from "lucide-react";
import { useState } from "react";

const stats = [
  { value: "540+", label: "Hours Saved Monthly" },
  { value: "32%", label: "Revenue Increase" },
  { value: "$160K", label: "Validated Pre-Sales" },
  { value: "50", label: "Founding Members" },
];

const features = [
  {
    icon: Target,
    title: "The Founding 50 Launchpad",
    desc: "Validate your high-ticket offer by securing 50 founding members before building infrastructure. Pre-sell with confidence.",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    icon: Bot,
    title: "Buyback Autopilot",
    desc: "Identify 'Time Assassin' tasks and transfer them to autonomous AI agents. Reclaim 10+ hours weekly.",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    icon: Workflow,
    title: "DRIP Matrix Framework",
    desc: "Delegate, Replace, Invest, or Produce. Our proprietary matrix helps you allocate every task to its highest-value destination.",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    icon: FileText,
    title: "Offer Architect",
    desc: "Craft irresistible 'Grand Slam' offers using our guided methodology map. Never guess your positioning again.",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600"
  },
  {
    icon: BarChart3,
    title: "Profit Analytics",
    desc: "Real-time dashboard tracking your 'Buyback Rate'—the true measure of profitability per hour invested.",
    color: "bg-rose-500",
    lightColor: "bg-rose-50",
    textColor: "text-rose-600"
  },
  {
    icon: DollarSign,
    title: "Embedded Payments",
    desc: "Send contracts, collect deposits, and manage recurring revenue with integrated payment processing.",
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50",
    textColor: "text-cyan-600"
  },
];

const testimonials = [
  {
    quote: "Sovereign OS helped me validate a $10K offer before writing a single line of code. The Founding 50 methodology is pure gold.",
    author: "Sarah Chen",
    role: "Founder, RevOps Academy",
    avatar: "SC",
    revenue: "$320K ARR"
  },
  {
    quote: "I went from 60-hour weeks to 30 hours while doubling revenue. The Buyback Autopilot changed everything about how I run my agency.",
    author: "Marcus Johnson",
    role: "CEO, Scale Studio",
    avatar: "MJ",
    revenue: "$1.2M ARR"
  },
  {
    quote: "The DRIP Matrix gave me clarity I never had. I finally know what to delegate, what to automate, and what deserves my personal attention.",
    author: "Elena Rodriguez",
    role: "Principal Consultant",
    avatar: "ER",
    revenue: "$480K ARR"
  },
];

const pricingPlans = [
  {
    name: "Operator",
    price: "$297",
    period: "/month",
    description: "For solo consultants ready to systematize",
    features: [
      "Founding 50 Launchpad",
      "3 AI Agents",
      "DRIP Matrix Dashboard",
      "Offer Architect (Basic)",
      "Email Support",
    ],
    notIncluded: [
      "Unlimited Agents",
      "White-label Client Portal",
      "Custom Integrations",
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Enterprise",
    price: "$997",
    period: "/month",
    description: "For agencies scaling beyond the founder",
    features: [
      "Everything in Operator",
      "Unlimited AI Agents",
      "White-label Client Portal",
      "Team Seats (Up to 5)",
      "Custom Integrations",
      "Priority Support",
      "Quarterly Strategy Call",
    ],
    notIncluded: [],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Sovereign",
    price: "Custom",
    period: "",
    description: "For organizations requiring bespoke solutions",
    features: [
      "Everything in Enterprise",
      "Unlimited Team Seats",
      "Dedicated Success Manager",
      "Custom Agent Development",
      "SLA Guarantee",
      "On-premise Option",
      "Executive Briefings",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false
  },
];

const faqs = [
  {
    q: "What is the Founding 50 methodology?",
    a: "The Founding 50 is a pre-sale validation framework. Instead of building first, you secure 50 founding members who pay upfront for your offer, validating market demand before investing in infrastructure."
  },
  {
    q: "How do the AI agents work?",
    a: "Our agents are specialized autonomous workflows that handle specific tasks—email triage, content repurposing, lead enrichment, and more. They operate 24/7 and only escalate decisions that require your judgment."
  },
  {
    q: "Can I integrate with my existing tools?",
    a: "Yes. Sovereign OS integrates with major CRMs, calendars, payment processors, and communication tools. Enterprise plans include custom integration development."
  },
  {
    q: "Is there a free trial?",
    a: "Yes, all plans include a 14-day free trial with full access. No credit card required to start."
  },
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-slate-900/20">S</div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">Sovereign OS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors" data-testid="link-features">Platform</a>
            <a href="#methodology" className="hover:text-slate-900 transition-colors" data-testid="link-methodology">Methodology</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors" data-testid="link-pricing">Pricing</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors" data-testid="link-testimonials">Results</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth">
              <Button variant="ghost" className="font-medium" data-testid="button-login">Log in</Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10" data-testid="button-get-started">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4">
            <a href="#features" className="block text-slate-600 hover:text-slate-900">Platform</a>
            <a href="#methodology" className="block text-slate-600 hover:text-slate-900">Methodology</a>
            <a href="#pricing" className="block text-slate-600 hover:text-slate-900">Pricing</a>
            <Link href="/auth">
              <Button className="w-full bg-slate-900 text-white">Get Started</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f910_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f910_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-sm font-medium mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-700">Accepting Founding 50 Members</span>
              <ChevronRight className="h-4 w-4 text-blue-400" />
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              The Operating System for{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[size:200%_auto] animate-gradient">
                  Autonomous Enterprise
                </span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Operationalize the "Buyback Loop." Replace low-value tasks with autonomous AI agents. 
              Scale your high-ticket offer without scaling headcount.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <Link href="/auth">
                <Button size="lg" className="h-14 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 rounded-full group" data-testid="button-hero-cta">
                  Start Your Free Audit
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-slate-200 hover:bg-slate-50 rounded-full group" data-testid="button-watch-demo">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-slate-500 mt-6 animate-in fade-in duration-700 delay-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            {stats.map((stat, i) => (
              <div key={i} className="text-center" data-testid={`stat-${i}`}>
                <div className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 mb-8">Trusted by high-ticket founders and operators worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {["Acme Corp", "Global Scale", "Nexus AI", "Vertex Ventures", "Atlas Labs", "Quantum Agency"].map((logo, i) => (
              <div key={i} className="font-display text-xl font-bold text-slate-400">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">Platform</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything you need to scale
            </h2>
            <p className="text-lg text-slate-600">
              A complete operating system for consultants, agency owners, and independent operators 
              ready to systematize their business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer" data-testid={`card-feature-${i}`}>
                <CardContent className="p-8">
                  <div className={`h-14 w-14 ${feature.lightColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.textColor}`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="methodology">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 text-blue-400 border-blue-800 bg-blue-900/30">Methodology</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Buy Back Your Time with the DRIP Matrix
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Every task falls into one of four categories. Our AI-powered system helps you 
                categorize, automate, and optimize every hour of your work week.
              </p>
              
              <div className="space-y-6">
                {[
                  { letter: "D", title: "Delegate", desc: "Tasks that can be handled by team or assistants" },
                  { letter: "R", title: "Replace", desc: "Tasks that AI agents can fully automate" },
                  { letter: "I", title: "Invest", desc: "High-leverage activities for future returns" },
                  { letter: "P", title: "Produce", desc: "Your genius zone — where you create maximum value" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center font-display font-bold text-xl text-white shrink-0">
                      {item.letter}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20">
                  <div className="text-red-400 text-sm font-semibold mb-2">REPLACE</div>
                  <div className="text-2xl font-bold text-white mb-1">3 Agents</div>
                  <div className="text-slate-400 text-sm">Admin & Email</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20">
                  <div className="text-emerald-400 text-sm font-semibold mb-2">PRODUCE</div>
                  <div className="text-2xl font-bold text-white mb-1">You</div>
                  <div className="text-slate-400 text-sm">Strategy & Closing</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-sm font-semibold mb-2">DELEGATE</div>
                  <div className="text-xl font-bold text-white mb-1">1 Assistant</div>
                  <div className="text-slate-500 text-sm">Research</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-sm font-semibold mb-2">INVEST</div>
                  <div className="text-xl font-bold text-white mb-1">2 Tools</div>
                  <div className="text-slate-500 text-sm">Market Intel</div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-500">Financial Value →</div>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 -rotate-90 text-xs text-slate-500">Energy Cost →</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200 bg-emerald-50">Results</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Operators are winning back their time
            </h2>
            <p className="text-lg text-slate-600">
              See how founders like you have transformed their businesses with Sovereign OS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-slate-200 hover:shadow-lg transition-shadow" data-testid={`card-testimonial-${i}`}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{t.author}</div>
                        <div className="text-sm text-slate-500">{t.role}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                      {t.revenue}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-200 bg-purple-50">Pricing</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-600">
              Start free. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card 
                key={i} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10 scale-105' : 'border-slate-200'}`}
                data-testid={`card-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-slate-500">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-display font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>

                  <Link href="/auth">
                    <Button 
                      className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                      data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm">
                        <X className="h-4 w-4 text-slate-300 shrink-0" />
                        <span className="text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-slate-600 border-slate-200 bg-slate-50">FAQ</Badge>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
                data-testid={`faq-${i}`}
              >
                <button 
                  className="w-full px-6 py-5 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Limited to 50 founding members</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to buy back your time?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join the founding cohort and lock in lifetime pricing. 
            Start your free audit today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" className="h-14 px-10 text-base bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-xl" data-testid="button-final-cta">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 text-base border-white/20 text-white hover:bg-white/10 rounded-full">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                <span className="font-display font-bold text-lg text-white">Sovereign OS</span>
              </div>
              <p className="text-sm leading-relaxed">
                The operating system for autonomous enterprise. 
                Built for operators who value their time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Methodology Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2026 Sovereign OS. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
