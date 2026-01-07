/**
 * Landing Page - Bloomberg News Feed Style
 * Long-form scrolling with news sections
 */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Command, ArrowRight, Zap, TrendingUp, Shield, Users, Clock, Bot } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { NewsCard, NewsGrid, NewsFeed } from "@/components/Sovereign/NewsCard";
import { ThemeToggle } from "@/components/Sovereign/ThemeToggle";
import { generateNewsItems, generateTrendingNews } from "@/lib/mockNews";
import { GravityCard } from "@/components/Sovereign";

export default function LandingBloomberg() {
  const allNews = generateNewsItems(30);
  const trendingNews = generateTrendingNews(3);
  const recentNews = allNews.slice(0, 12);

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      
      {/* Navigation - Fixed */}
      <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[var(--color-void)]/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--color-acid)] to-[var(--color-aurora-cyan)] flex items-center justify-center">
                <Command className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold font-mono">SOVEREIGN</span>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/dashboard">
                <button className="px-4 py-2 text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  DASHBOARD
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 py-2 text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  SIGN IN
                </button>
              </Link>
              <Link href="/auth">
                <button className="px-4 py-2 text-sm font-mono font-medium rounded bg-[var(--color-acid)] text-black hover:opacity-80 transition-all">
                  GET STARTED
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Above the fold */}
      <section className="relative pt-20 pb-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Headlines */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--color-acid)]/30 bg-[var(--color-acid)]/10 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Zap className="h-4 w-4 text-[var(--color-acid)]" />
                <span className="text-sm font-mono text-[var(--color-acid)]">LIVE SYSTEM UPDATES</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold font-mono mb-6 leading-tight tracking-tighter">
                BUILD YOUR
                <br />
                BUSINESS ON
                <br />
                <span className="text-[var(--color-acid)]">
                  <TypewriterText 
                    phrases={["AUTOPILOT", "AI AGENTS", "AUTOMATION", "INTELLIGENCE"]}
                    typingSpeed={100}
                    deletingSpeed={60}
                    pauseTime={2000}
                  />
                </span>
              </h1>

              <p className="text-xl text-[var(--color-text-muted)] mb-8 font-mono leading-relaxed">
                Stop trading hours for dollars. Deploy AI agents that work 24/7. 
                Automate everything. Reclaim your time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <button className="px-8 py-4 rounded bg-[var(--color-acid)] text-black font-mono font-bold hover:opacity-80 transition-all flex items-center gap-2 justify-center">
                    VIEW DASHBOARD
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/auth">
                  <button className="px-8 py-4 rounded border border-[var(--color-acid)]/30 text-[var(--color-acid)] font-mono font-bold hover:bg-[var(--color-acid)]/10 transition-all">
                    START FREE TRIAL
                  </button>
                </Link>
              </div>

              <p className="text-sm text-[var(--color-text-muted)] font-mono mt-6">
                NO CREDIT CARD • 14-DAY TRIAL • SOC 2 CERTIFIED
              </p>
            </div>

            {/* Right - Featured Story */}
            <div>
              <GravityCard magneticRange={150}>
                <NewsCard
                  title={trendingNews[0]?.title || "AI Agent Successfully Processes 1,000+ Emails"}
                  category={trendingNews[0]?.category || "Agents"}
                  timestamp={trendingNews[0]?.timestamp || "2h ago"}
                  thumbnail={trendingNews[0]?.thumbnail}
                  excerpt={trendingNews[0]?.excerpt || "Latest automation breakthrough shows significant efficiency gains."}
                  trend="up"
                  size="large"
                />
              </GravityCard>
            </div>
          </div>
        </div>
      </section>

      {/* Top Stories Section */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-mono">TOP STORIES</h2>
            <span className="text-sm font-mono text-[var(--color-text-muted)]">UPDATED 2 MINUTES AGO</span>
          </div>

          <NewsGrid columns={3}>
            {recentNews.slice(0, 6).map((news, i) => (
              <GravityCard key={i} magneticRange={100}>
                <NewsCard {...news} size="medium" />
              </GravityCard>
            ))}
          </NewsGrid>
        </div>
      </section>

      {/* Features Grid - Data Rich */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-mono mb-12 text-center">
            EVERYTHING YOU NEED TO
            <br />
            <span className="text-[var(--color-acid)]">RECLAIM YOUR TIME</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "AI AGENTS",
                description: "Deploy specialized agents for email, research, proposals, and more. They learn your style and work autonomously 24/7.",
                stats: ["156 tasks/day", "96% accuracy", "4.2hrs saved"],
              },
              {
                icon: Clock,
                title: "TIME AUDIT",
                description: "See exactly where hours go. DRIP framework identifies what to automate, delegate, or eliminate completely.",
                stats: ["68% auto rate", "23.5hrs saved/wk", "$4,700 value"],
              },
              {
                icon: TrendingUp,
                title: "ROI TRACKING",
                description: "Watch time savings compound. Most users reclaim 10+ hours in first month. Full analytics dashboard included.",
                stats: ["340% ROI", "+45% monthly", "Real-time data"],
              },
              {
                icon: Shield,
                title: "ENTERPRISE SECURITY",
                description: "Bank-level encryption, SOC 2 compliance, granular access controls. Your data stays yours. Zero compromise.",
                stats: ["99.9% uptime", "SOC 2 Type II", "AES-256"],
              },
              {
                icon: Users,
                title: "TEAM COLLABORATION",
                description: "Share agents, delegate tasks, track team productivity in one unified workspace with real-time updates.",
                stats: ["Unlimited users", "Role-based access", "Activity logs"],
              },
              {
                icon: Zap,
                title: "INSTANT DEPLOYMENT",
                description: "No complex setup. Connect tools, define workflow, launch agents in minutes. Full onboarding support included.",
                stats: ["<5min setup", "50+ integrations", "24/7 support"],
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GravityCard magneticRange={120}>
                  <div className="p-6 h-full border border-white/10 rounded-lg bg-[var(--color-structure)] hover:border-[var(--color-acid)]/30 transition-all">
                    <div className="h-12 w-12 rounded-lg bg-[var(--color-acid)]/20 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-[var(--color-acid)]" />
                    </div>
                    <h3 className="text-xl font-bold font-mono mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.stats.map((stat, j) => (
                        <span 
                          key={j}
                          className="px-2 py-1 text-[10px] font-mono rounded bg-[var(--color-acid)]/10 text-[var(--color-acid)] border border-[var(--color-acid)]/20"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </GravityCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates - News Feed */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-mono mb-8">LATEST UPDATES</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main feed - 2 columns */}
            <div className="lg:col-span-2">
              <NewsGrid columns={2}>
                {allNews.slice(6, 14).map((news, i) => (
                  <GravityCard key={i} magneticRange={100}>
                    <NewsCard {...news} size="medium" />
                  </GravityCard>
                ))}
              </NewsGrid>
            </div>

            {/* Sidebar - Trending */}
            <div>
              <div className="sticky top-20">
                <h3 className="text-sm font-mono font-bold mb-4 text-[var(--color-text-muted)]">TRENDING NOW</h3>
                <div className="space-y-3">
                  {allNews.slice(14, 20).map((news, i) => (
                    <NewsCard key={i} {...news} size="compact" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-mono mb-12 text-center">
            TRUSTED BY 200+ OPERATORS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sovereign gave me back 15 hours a week. Now I actually have time to work ON my business.",
                author: "Sarah Chen",
                role: "Founder, Scale Digital",
                metric: "15hrs/week saved",
              },
              {
                quote: "The time audit was eye-opening. I was spending 40% of my week on tasks an AI could handle better.",
                author: "Marcus Rodriguez",
                role: "CEO, Vertex Agency",
                metric: "40% time reclaimed",
              },
              {
                quote: "ROI was instant. By month 3, I'd automated enough to hire a strategist instead of more operators.",
                author: "Emily Park",
                role: "Managing Director",
                metric: "$50K saved annually",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-6 border border-white/10 rounded-lg bg-[var(--color-structure)] h-full">
                  <div className="text-3xl font-bold text-[var(--color-acid)] mb-4">"</div>
                  <p className="text-[var(--color-text-primary)] mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-[var(--color-text-muted)] mb-2">{testimonial.role}</div>
                    <div className="text-sm font-mono text-[var(--color-acid)]">{testimonial.metric}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More News */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-mono mb-8">MORE STORIES</h2>
          <NewsGrid columns={4}>
            {allNews.slice(20, 28).map((news, i) => (
              <NewsCard key={i} {...news} size="compact" />
            ))}
          </NewsGrid>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 tracking-tight">
            READY TO RECLAIM
            <br />
            YOUR <span className="text-[var(--color-acid)]">TIME?</span>
          </h2>
          <p className="text-xl text-[var(--color-text-muted)] mb-10 font-mono">
            JOIN 200+ OPERATORS WHO AUTOMATED THEIR WAY TO FREEDOM
          </p>
          <Link href="/auth">
            <button className="px-10 py-5 text-lg font-mono font-bold rounded bg-[var(--color-acid)] text-black hover:opacity-80 transition-all inline-flex items-center gap-2">
              START FREE TRIAL
              <ArrowRight className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--color-acid)] to-[var(--color-aurora-cyan)] flex items-center justify-center">
                  <Command className="h-5 w-5 text-black" />
                </div>
                <span className="text-lg font-bold font-mono">SOVEREIGN</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] font-mono">
                AI-powered automation platform for modern operators
              </p>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-4">PRODUCT</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Features</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Pricing</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Security</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">About</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Blog</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Careers</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-4">LEGAL</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Privacy</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Terms</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Security</a></li>
                <li><a href="#" className="hover:text-[var(--color-text-primary)]">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-[var(--color-text-muted)] font-mono">
            © 2026 SOVEREIGN OS • ELECTRIC CONCRETE v1.0 • ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}
