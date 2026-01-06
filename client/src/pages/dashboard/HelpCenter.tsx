import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
import {
    Search,
    BookOpen,
    Rocket,
    Bot,
    Clock,
    DollarSign,
    Users,
    Sparkles,
    ChevronDown,
    ChevronRight,
    Play,
    CheckCircle,
    ArrowRight,
    Zap,
    Target,
    Shield,
    FileText,
    Calculator,
    Mail,
    TrendingUp,
    HelpCircle
} from 'lucide-react';

// --- DOCUMENTATION CONTENT ---
const MODULES = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: Rocket,
        color: 'bg-gradient-to-br from-primary to-purple-500',
        description: 'Learn the core concepts and set up your first workflow',
        sections: [
            {
                title: 'Core Philosophy: The Buyback Loop',
                content: `Sovereign OS is built on the **Buyback Loop** - a proven system to reclaim your time:

**1. AUDIT** — Identify tasks draining your energy
**2. TRANSFER** — Delegate to AI agents  
**3. FILL** — Reinvest time in high-value work

Your goal: Increase your **Buyback Rate** (Revenue ÷ Hours Worked) by eliminating low-value tasks.`
            },
            {
                title: 'The DRIP Matrix',
                content: `Every task falls into one of four quadrants:

| Quadrant | Value | Energy | Action |
|----------|-------|--------|--------|
| **D**elegate | Low | Low | Assign to team/VA |
| **R**eplace | Low | High | **Automate with AI** ⚡ |
| **I**nvest | High | Passive | Build systems |
| **P**roduce | High | High | Your sweet spot |

**Time Assassins** = "Replace" tasks. Sovereign OS hunts them.`
            },
            {
                title: 'Your First 5 Minutes',
                content: `1. **Deploy an Agent** → Go to AI Agents, click "Deploy Agent"
2. **Open Command Center** → Click the ✨ button (bottom-right)
3. **Ask for help** → "What should I automate first?"
4. **Approve Decisions** → Check the Decision Feed on your dashboard`
            }
        ]
    },
    {
        id: 'founding-50',
        title: 'Founding 50 Launchpad',
        icon: Target,
        color: 'bg-gradient-to-br from-amber-500 to-orange-500',
        description: 'Launch and validate high-ticket offers',
        sections: [
            {
                title: 'Offer Architect Workflow',
                content: `Build a "Grand Slam Offer" in 4 steps:

**Step 1: Your Expertise**
- Core skills and years of experience
- Key achievements that prove results

**Step 2: Ideal Client**
- Who you serve best
- Their biggest pain points
- What they've tried that failed

**Step 3: Transformation**
- The "Before" state (pain)
- The "After" state (dream outcome)
- What they DON'T have to do

**Step 4: Generate**
- AI creates your Transformation Statement
- Generates your Methodology Map
- Suggests pricing and guarantee`
            },
            {
                title: 'Tool Builder Templates',
                content: `Create lead magnets that work automatically:

**📊 ROI Calculator** — Show cost of their problem
*"How much is inbox chaos costing you?"*

**🏆 Assessment Grader** — Score them on key metrics
*"What's your AI Readiness Score?"*

**❓ Quiz / Diagnostic** — Segment by result type
*"What's your Founder Archetype?"*

**✅ Self-Audit Checklist** — Let them grade themselves
*"Are you ready to scale?"*

All tools gate results behind email capture → Leads flow directly to your Decision Feed.`
            },
            {
                title: 'The Founding 50 Method',
                content: `Pre-sell to 50 members before building:

1. **Create your offer** with Offer Architect
2. **Deploy a lead tool** with Tool Builder
3. **Launch waitlist** with scarcity (50 spots max)
4. **Track signups** in the Founding 50 dashboard
5. **Close founding members** with personalized outreach
6. **Use their payments** to fund your build

This validates demand before you invest in infrastructure.`
            }
        ]
    },
    {
        id: 'buyback-autopilot',
        title: 'Buyback Autopilot',
        icon: Bot,
        color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
        description: 'Deploy AI agents to eliminate Time Assassins',
        sections: [
            {
                title: 'The Agent Workforce',
                content: `Deploy specialized AI agents:

**🛡️ Inbox Sentinel** (Administrative)
Filters spam, drafts replies, detects Time Assassins

**📋 The Dossier** (Sales)
Researches prospects, compiles pre-call briefs

**🎨 Content Alchemist** (Marketing)
Repurposes videos/podcasts into posts & newsletters

**🎯 The Closer** (Sales)
Analyzes call transcripts, drafts follow-ups

**💰 Invoice Chaser** (Finance)
Tracks overdue invoices, sends reminders

Each agent runs autonomously and presents decisions for your approval.`
            },
            {
                title: 'The 1:3:1 Decision Pattern',
                content: `Agents don't just notify you—they present structured decisions:

**1 Problem** — Clear description
**3 Options** — Viable solutions
**1 Recommendation** — Best choice highlighted

Example:
> **Agent:** Inbox Sentinel
> **Problem:** Client X requested scope changes outside MSA
> **Options:**
> 1. Politely decline, offer separate proposal ⭐
> 2. Accept as one-time exception
> 3. Schedule call to discuss
>
> *Recommended: Option 1*

**Your role:** Review and approve with one click.`
            },
            {
                title: 'Time Audit & DRIP Tracking',
                content: `Track your time and identify automation opportunities:

1. **Log entries** by DRIP category throughout the day
2. **Review your matrix** to see time allocation
3. **Get alerts** when >20% is "Replace" work
4. **Deploy agents** based on recommendations
5. **Watch your Buyback Rate rise**

The dashboard shows:
- Weekly hours by DRIP category
- Time Assassin warnings
- Value generated by agents
- Optimization recommendations`
            }
        ]
    },
    {
        id: 'financial',
        title: 'Financial Architecture',
        icon: DollarSign,
        color: 'bg-gradient-to-br from-emerald-500 to-green-500',
        description: 'High-ticket proposals with embedded payments',
        sections: [
            {
                title: 'Active Contracts',
                content: `Traditional invoicing = friction + risk.

**Active Contracts** solve this:
1. Client receives proposal
2. Signs digitally
3. **Immediately prompted to pay**
4. Payment triggers onboarding
5. Contract isn't "executed" until payment clears

This enforces **Payment Before Work** and improves cash flow.`
            },
            {
                title: 'Creating a Proposal',
                content: `1. Go to **Proposals** in the sidebar
2. Click **New Proposal**
3. Enter client name and amount
4. Click **Send Proposal**
5. Track status: Pending → Signed → Paid

**Pipeline Stats:**
- Total Pipeline value
- Pending Payments
- Collected revenue

All visible at a glance.`
            },
            {
                title: 'Value-Based Pricing',
                content: `Stop selling hours. Sell outcomes.

**Before:** "10 hours of consulting"
**After:** "A strategy that increases close rate by 15%"

Sovereign OS helps by:
- Using Dossier research to customize proposals
- Anchoring price to projected ROI
- Focusing on transformation, not deliverables`
            }
        ]
    },
    {
        id: 'client-portal',
        title: 'Client Portal',
        icon: Users,
        color: 'bg-gradient-to-br from-pink-500 to-rose-500',
        description: 'White-label experience that increases retention',
        sections: [
            {
                title: 'The "Golden Handcuffs" Strategy',
                content: `Make your agency indispensable:

**What clients see:**
- Project status with progress bar
- Milestones (completed, in-progress, pending)
- Deliverables with download access
- Training videos and docs
- "Schedule a Call" button

**Why it works:**
The more data clients access through your portal, the harder it is to leave.
They're invested in your system—not just your service.`
            },
            {
                title: 'Customization Options',
                content: `White-label your portal:
- Custom branding and colors
- Your logo
- Custom domain (portal.youragency.com)
- Branded email notifications

Configure in **Settings → White Label**`
            }
        ]
    },
    {
        id: 'command-center',
        title: 'Command Center',
        icon: Sparkles,
        color: 'bg-gradient-to-br from-violet-500 to-purple-500',
        description: 'Your AI chief of staff',
        sections: [
            {
                title: 'How to Use',
                content: `Click the **✨ sparkle button** (bottom-right of any page)

**Example commands:**
- "What should I automate?"
- "Deploy an email agent"
- "Prepare for my call with Acme Corp"
- "What's draining my time?"
- "Create a decision for this"

The Command Center understands context and can control your entire operation.`
            },
            {
                title: 'Integration with Decision Feed',
                content: `Command Center can:
- Create 1:3:1 decisions for your review
- Summarize pending decisions
- Help you process the queue faster
- Explain agent recommendations

Think of it as a direct line to your AI workforce.`
            }
        ]
    }
];

const QUICK_WORKFLOWS = [
    {
        title: 'Launch a New Offer',
        time: '1-2 hours',
        link: '/dashboard/offer-architect',
        steps: [
            { text: 'Go to Offer Architect', link: '/dashboard/offer-architect' },
            { text: 'Complete the 4-step wizard', link: null },
            { text: 'Copy your Transformation Statement', link: null },
            { text: 'Create a lead tool in Tool Builder', link: '/dashboard/tool-builder' },
            { text: 'Track signups in Founding 50', link: '/dashboard/founding-50' }
        ]
    },
    {
        title: 'Automate Your Inbox',
        time: '5 minutes',
        link: '/dashboard/agents',
        steps: [
            { text: 'Open Command Center (✨)', link: null },
            { text: 'Say: "Help me automate email"', link: null },
            { text: 'Go to AI Agents', link: '/dashboard/agents' },
            { text: 'Deploy Inbox Sentinel', link: '/dashboard/agents' },
            { text: 'Approve decisions as they appear', link: '/dashboard' }
        ]
    },
    {
        title: 'Prepare for a Sales Call',
        time: '2 minutes',
        link: '/dashboard/agents',
        steps: [
            { text: 'Open Command Center', link: null },
            { text: 'Say: "Prepare brief for [Company]"', link: null },
            { text: 'Dossier agent compiles research', link: null },
            { text: 'Review the pre-call brief', link: null },
            { text: 'Approve and you\'re ready', link: '/dashboard' }
        ]
    },
    {
        title: 'Send a High-Ticket Proposal',
        time: '10 minutes',
        link: '/dashboard/proposals',
        steps: [
            { text: 'Go to Proposals', link: '/dashboard/proposals' },
            { text: 'Click "New Proposal"', link: '/dashboard/proposals' },
            { text: 'Enter client name and amount', link: null },
            { text: 'Send Proposal', link: null },
            { text: 'Client signs + pays in one flow', link: null }
        ]
    }
];

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedModule, setExpandedModule] = useState<string | null>('getting-started');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [selectedWorkflow, setSelectedWorkflow] = useState<typeof QUICK_WORKFLOWS[0] | null>(null);

    // Search filtering
    const filteredModules = useMemo(() => {
        if (!searchQuery.trim()) return MODULES;

        const query = searchQuery.toLowerCase();
        return MODULES.map(module => ({
            ...module,
            sections: module.sections.filter(section =>
                section.title.toLowerCase().includes(query) ||
                section.content.toLowerCase().includes(query)
            )
        })).filter(module =>
            module.title.toLowerCase().includes(query) ||
            module.description.toLowerCase().includes(query) ||
            module.sections.length > 0
        );
    }, [searchQuery]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-headline text-foreground flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-primary" />
                    Help Center
                </h1>
                <p className="text-muted-foreground mt-1">
                    Everything you need to master Sovereign OS
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documentation..."
                    className="w-full bg-card/50 border border-border/30 rounded-2xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
            </div>

            {/* Quick Workflows */}
            <div className="raycast-panel p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-warning" />
                    <h2 className="text-title text-foreground">Quick Start Workflows</h2>
                    <span className="text-xs text-muted-foreground ml-2">Click any workflow to see full steps</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {QUICK_WORKFLOWS.map((workflow, i) => (
                        <motion.button
                            key={workflow.title}
                            onClick={() => setSelectedWorkflow(workflow)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...PHYSICS.interaction, delay: i * 0.05 }}
                            className="text-left bg-card/30 rounded-xl p-4 hover:bg-card/50 hover:border-primary/30 border border-transparent transition-all cursor-pointer group"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-foreground text-sm">{workflow.title}</h4>
                                <span className="text-xs text-muted-foreground">{workflow.time}</span>
                            </div>
                            <div className="space-y-1">
                                {workflow.steps.slice(0, 3).map((step, j) => (
                                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                                            {j + 1}
                                        </div>
                                        <span className="truncate">{step.text}</span>
                                    </div>
                                ))}
                                {workflow.steps.length > 3 && (
                                    <div className="flex items-center gap-1 text-xs text-primary group-hover:underline mt-1">
                                        <ArrowRight className="h-3 w-3" />
                                        +{workflow.steps.length - 3} more steps
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Workflow Detail Modal */}
            <AnimatePresence>
                {selectedWorkflow && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedWorkflow(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={PHYSICS.interaction}
                            className="raycast-panel-elevated w-full max-w-lg p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-title text-foreground">{selectedWorkflow.title}</h2>
                                    <p className="text-sm text-muted-foreground">Estimated time: {selectedWorkflow.time}</p>
                                </div>
                                <a
                                    href={selectedWorkflow.link}
                                    className="px-4 py-2 bg-gradient-primary text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
                                >
                                    Start Now
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="space-y-3">
                                {selectedWorkflow.steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`flex items-start gap-3 p-3 rounded-lg ${step.link ? 'bg-card/50 hover:bg-card cursor-pointer' : 'bg-card/30'} transition-colors`}
                                        onClick={() => step.link && (window.location.href = step.link)}
                                    >
                                        <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center text-sm text-primary font-bold shrink-0">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <span className={`text-sm ${step.link ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {step.text}
                                            </span>
                                            {step.link && (
                                                <span className="text-xs text-primary ml-2">→ Click to go</span>
                                            )}
                                        </div>
                                        {step.link && <ArrowRight className="h-4 w-4 text-primary shrink-0" />}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-6 pt-4 border-t border-border/30">
                                <Button variant="ghost" onClick={() => setSelectedWorkflow(null)} disablePhysics>
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Documentation Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Module Navigation */}
                <div className="space-y-2">
                    {filteredModules.map((module) => {
                        const Icon = module.icon;
                        const isExpanded = expandedModule === module.id;

                        return (
                            <motion.button
                                key={module.id}
                                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all ${isExpanded
                                    ? 'bg-primary/15 border border-primary/30'
                                    : 'bg-card/30 border border-transparent hover:bg-card/50'
                                    }`}
                                whileHover={{ x: 4 }}
                                transition={PHYSICS.interaction}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl ${module.color} flex items-center justify-center text-white shadow-lg`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground">{module.title}</h3>
                                        <p className="text-xs text-muted-foreground truncate">{module.description}</p>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4 text-primary shrink-0" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {expandedModule && (
                            <motion.div
                                key={expandedModule}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={PHYSICS.interaction}
                                className="raycast-panel p-6"
                            >
                                {filteredModules.find(m => m.id === expandedModule)?.sections.map((section, i) => (
                                    <div key={section.title} className={i > 0 ? 'mt-6 pt-6 border-t border-border/30' : ''}>
                                        <button
                                            onClick={() => setExpandedSection(
                                                expandedSection === section.title ? null : section.title
                                            )}
                                            className="w-full flex items-center justify-between text-left"
                                        >
                                            <h4 className="font-semibold text-foreground">{section.title}</h4>
                                            {expandedSection === section.title ? (
                                                <ChevronDown className="h-4 w-4 text-primary" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {(expandedSection === section.title || !expandedSection) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={PHYSICS.interaction}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-3 text-sm text-muted-foreground prose prose-invert prose-sm max-w-none">
                                                        {section.content.split('\n').map((line, j) => {
                                                            // Handle bold text
                                                            const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>');

                                                            // Check for table rows
                                                            if (line.startsWith('|')) {
                                                                return null; // Skip table rendering for now
                                                            }

                                                            return (
                                                                <p
                                                                    key={j}
                                                                    className="mb-2 leading-relaxed"
                                                                    dangerouslySetInnerHTML={{ __html: boldParsed }}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {!expandedModule && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="raycast-panel p-12 text-center"
                            >
                                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-title text-foreground mb-2">Select a Topic</h3>
                                <p className="text-muted-foreground">
                                    Choose a module from the left to view documentation
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Command Center CTA */}
            <motion.div
                className="raycast-panel p-6 border-l-4 border-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Need Personalized Help?</h3>
                            <p className="text-sm text-muted-foreground">
                                Ask the Command Center for guidance specific to your situation
                            </p>
                        </div>
                    </div>
                    <Button className="bg-gradient-primary shadow-lg shadow-primary/30">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Open Command Center
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
