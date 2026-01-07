/**
 * Help Center Page - Sovereign Aesthetic
 * 
 * Documentation hub with:
 * - Module navigation
 * - Glass readout panels
 * - Quick workflow actions
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import {
    Search,
    BookOpen,
    Rocket,
    Bot,
    DollarSign,
    Users,
    Sparkles,
    ChevronDown,
    ChevronRight,
    ArrowRight,
    Zap,
    Target,
    HelpCircle
} from 'lucide-react';
import { GlowButton, GlassCard, SpotlightCard } from '@/components/GlassCard';
import { TypewriterText, PulseRing } from '@/components/Physics';

// --- DOCUMENTATION CONTENT ---
const MODULES = [
    {
        id: 'getting-started',
        title: 'GETTING STARTED',
        icon: Rocket,
        color: 'var(--color-acid)',
        bg: 'rgba(187,255,0,0.1)',
        description: 'Core concepts and first workflow setup',
        sections: [
            {
                title: 'Core Philosophy: The Buyback Loop',
                content: `Sovereign OS is built on the **Buyback Loop** - a proven system to reclaim your time:
## 1. AUDIT
Identify tasks draining your energy

## 2. TRANSFER
Delegate to AI agents

## 3. FILL
Reinvest time in high-value work

Your goal: Increase your **Buyback Rate** (Revenue ÷ Hours Worked) by eliminating low-value tasks.`
            },
            {
                title: 'The DRIP Matrix',
                content: `Every task falls into one of four quadrants:

**DELEGATE** (Low Value, Low Energy) -> Assign to team/VA
**REPLACE** (Low Value, High Energy) -> **Automate with AI** ⚡
**INVEST** (High Value, Passive) -> Build systems
**PRODUCE** (High Value, High Energy) -> Your sweet spot

**Time Assassins** = "Replace" tasks. Sovereign OS hunts them.`
            },
            {
                title: 'Your First 5 Minutes',
                content: `
1. **Deploy an Agent** → Go to AI Agents, click "Deploy Agent"
2. **Open Command Center** → Click the ✨ button (bottom-right)
3. **Ask for help** → "What should I automate first?"
4. **Approve Decisions** → Check the Decision Feed on your dashboard`
            }
        ]
    },
    {
        id: 'founding-50',
        title: 'FOUNDING 50 LAUNCHPAD',
        icon: Target,
        color: 'var(--color-alarm)',
        bg: 'rgba(255,51,102,0.1)',
        description: 'Launch and validate high-ticket offers',
        sections: [
            {
                title: 'Offer Architect Workflow',
                content: `Build a "Grand Slam Offer" in 4 steps:

**Step 1: Your Expertise**
Core skills and years of experience. Key achievements that prove results.

**Step 2: Ideal Client**
Who you serve best. Their biggest pain points. What they've tried that failed.

**Step 3: Transformation**
The "Before" state (pain). The "After" state (dream outcome). What they DON'T have to do.

**Step 4: Generate**
AI creates your Transformation Statement, Methodology Map, and Pricing.`
            },
            {
                title: 'The Founding 50 Method',
                content: `Pre-sell to 50 members before building:

1. **Create your offer** with Offer Architect
2. **Deploy a lead tool** with Tool Builder
3. **Launch waitlist** with scarcity (50 spots max)
4. **Track signups** in the Founding 50 dashboard
5. **Close founding members** with personalized outreach
6. **Use their payments** to fund your build`
            }
        ]
    },
    {
        id: 'buyback-autopilot',
        title: 'BUYBACK AUTOPILOT',
        icon: Bot,
        color: 'var(--color-aurora-cyan)',
        bg: 'rgba(0,240,255,0.1)',
        description: 'Deploy AI agents to eliminate Time Assassins',
        sections: [
            {
                title: 'The Agent Workforce',
                content: `Deploy specialized AI agents:

**🛡️ Inbox Sentinel** (Administrative) - Filters spam, drafts replies
**📋 The Dossier** (Sales) - Researches prospects
**🎨 Content Alchemist** (Marketing) - Repurposes content
**🎯 The Closer** (Sales) - Analyzes calls
**💰 Invoice Chaser** (Finance) - Tracks invoices

Each agent runs autonomously and presents decisions for your approval.`
            },
            {
                title: 'The 1:3:1 Decision Pattern',
                content: `Agents don't just notify you—they present structured decisions:

**1 Problem** — Clear description
**3 Options** — Viable solutions
**1 Recommendation** — Best choice highlighted

Your role: Review and approve with one click.`
            }
        ]
    },
    {
        id: 'financial',
        title: 'FINANCIAL ARCHITECTURE',
        icon: DollarSign,
        color: 'var(--color-aurora-purple)',
        bg: 'rgba(112,0,255,0.1)',
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

This enforces **Payment Before Work**.`
            }
        ]
    },
    {
        id: 'client-portal',
        title: 'CLIENT PORTAL',
        icon: Users,
        color: 'var(--text-sovereign-primary)',
        bg: 'rgba(255,255,255,0.1)',
        description: 'White-label experience that increases retention',
        sections: [
            {
                title: 'The "Golden Handcuffs" Strategy',
                content: `Make your agency indispensable. 
The more data clients access through your portal, the harder it is to leave.
They're invested in your system—not just your service.`
            }
        ]
    }
];

const QUICK_WORKFLOWS = [
    {
        title: 'LAUNCH NEW OFFER',
        time: '1-2 HOURS',
        steps: ['Offer Architect', 'Complete Wizard', 'Create Tool', 'Track Signups']
    },
    {
        title: 'AUTOMATE INBOX',
        time: '5 MINS',
        steps: ['Command Center', 'Deploy Sentinel', 'Approve Decisions']
    },
    {
        title: 'PREPARE SALES CALL',
        time: '2 MINS',
        steps: ['Command Center', 'Request Brief', 'Review Dossier']
    },
    {
        title: 'SEND PROPOSAL',
        time: '10 MINS',
        steps: ['New Proposal', 'Enter Amount', 'Client Signs + Pays']
    }
];

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedModule, setExpandedModule] = useState<string | null>('getting-started');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">HELP CENTER</h1>
                <div className="flex items-center gap-2 mt-2">
                    <BookOpen className="h-4 w-4 text-[var(--color-acid)]" />
                    <p className="text-sm text-[var(--text-sovereign-muted)]">
                        Master the Sovereign Operating System
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-sovereign-muted)]" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documentation..."
                    className="w-full bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg pl-10 pr-4 py-3 text-sm text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)] transition-all"
                />
            </div>

            {/* Quick Workflows */}
            <SpotlightCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-4 w-4 text-[var(--color-acid)]" />
                    <h2 className="text-terminal text-sm text-[var(--text-sovereign-primary)]">QUICK START WORKFLOWS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {QUICK_WORKFLOWS.map((workflow, i) => (
                        <motion.button
                            key={workflow.title}
                            className="text-left bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg p-4 hover:border-[var(--color-acid)] transition-all group"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-terminal text-xs text-[var(--text-sovereign-primary)]">{workflow.title}</h4>
                                <span className="text-[10px] text-[var(--text-sovereign-muted)] px-1.5 py-0.5 bg-white/5 rounded">{workflow.time}</span>
                            </div>
                            <div className="space-y-1">
                                {workflow.steps.slice(0, 3).map((step, j) => (
                                    <div key={j} className="flex items-center gap-2 text-[10px] text-[var(--text-sovereign-muted)] group-hover:text-[var(--text-sovereign-primary)] transition-colors">
                                        <div className="h-3 w-3 rounded-full bg-[var(--color-acid)] flex items-center justify-center text-black font-bold text-[8px] opacity-70 group-hover:opacity-100">
                                            {j + 1}
                                        </div>
                                        <span className="truncate">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </SpotlightCard>

            {/* Documentation Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Module Navigation */}
                <div className="lg:col-span-4 space-y-2">
                    {filteredModules.map((module) => {
                        const Icon = module.icon;
                        const isExpanded = expandedModule === module.id;

                        return (
                            <motion.button
                                key={module.id}
                                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                                className={`w-full text-left p-3 rounded-lg transition-all border ${isExpanded
                                    ? 'bg-[var(--color-void)] border-[var(--color-acid)]'
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-8 w-8 rounded-lg flex items-center justify-center text-black shrink-0"
                                        style={{ background: isExpanded ? module.color : 'var(--text-sovereign-muted)' }}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-terminal text-xs ${isExpanded ? 'text-[var(--text-sovereign-primary)]' : 'text-[var(--text-sovereign-muted)]'}`}>
                                            {module.title}
                                        </h3>
                                        {isExpanded && <p className="text-[10px] text-[var(--text-sovereign-muted)] truncate mt-1">{module.description}</p>}
                                    </div>
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4 text-[var(--color-acid)] shrink-0" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-[var(--text-sovereign-muted)] shrink-0" />
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {expandedModule ? (
                            <GlassCard intensity="medium" className="p-6">
                                <motion.div
                                    key={expandedModule}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={PHYSICS.interaction}
                                >
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--glass-sovereign-border)]">
                                        {(() => {
                                            const mod = filteredModules.find(m => m.id === expandedModule);
                                            const Ico = mod?.icon || BookOpen;
                                            return (
                                                <>
                                                    <Ico className="h-6 w-6" style={{ color: mod?.color }} />
                                                    <h2 className="text-xl text-[var(--text-sovereign-primary)]">{mod?.title} DOCUMENTATION</h2>
                                                </>
                                            )
                                        })()}
                                    </div>

                                    {filteredModules.find(m => m.id === expandedModule)?.sections.map((section, i) => (
                                        <div key={section.title} className={i > 0 ? 'mt-4 pt-4 border-t border-[var(--glass-sovereign-border)]' : ''}>
                                            <button
                                                onClick={() => setExpandedSection(
                                                    expandedSection === section.title ? null : section.title
                                                )}
                                                className="w-full flex items-center justify-between text-left hover:bg-white/5 p-2 rounded transition-colors"
                                            >
                                                <h4 className="text-sm font-bold text-[var(--text-sovereign-primary)]">{section.title}</h4>
                                                {expandedSection === section.title ? (
                                                    <ChevronDown className="h-4 w-4 text-[var(--color-acid)]" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4 text-[var(--text-sovereign-muted)]" />
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {(expandedSection === section.title || (!expandedSection && i === 0)) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-3 p-2 text-sm text-[var(--text-sovereign-muted)] whitespace-pre-line leading-relaxed">
                                                            {section.content}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </motion.div>
                            </GlassCard>
                        ) : (
                            <div className="h-full flex items-center justify-center p-12 text-center opacity-50">
                                <div>
                                    <HelpCircle className="h-12 w-12 text-[var(--text-sovereign-muted)] mx-auto mb-4" />
                                    <p className="text-sm text-[var(--text-sovereign-muted)]">Select a module to view documentation</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Command Center CTA */}
                    <div className="mt-6">
                        <SpotlightCard className="p-4 flex items-center justify-between border-[var(--color-acid)]">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-[var(--color-acid)] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(187,255,0,0.3)]">
                                    <Sparkles className="h-5 w-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[var(--text-sovereign-primary)]">NEED PERSONALIZED HELP?</h3>
                                    <p className="text-[10px] text-[var(--text-sovereign-muted)]">
                                        Ask the Command Center regarding your specific data
                                    </p>
                                </div>
                            </div>
                            <GlowButton variant="acid" size="sm">
                                OPEN COMMAND CENTER
                            </GlowButton>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
