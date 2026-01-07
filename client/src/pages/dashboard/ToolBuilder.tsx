/**
 * Tool Builder Page - Sovereign Aesthetic
 * 
 * Lead magnet creation with:
 * - Glass card templates
 * - Terminal stats
 * - Bento grid layout
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import {
    Calculator,
    Award,
    CircleHelp,
    FileText,
    Plus,
    Settings,
    Copy,
    Eye,
    Trash2,
    ExternalLink,
    Wand2,
    X,
    Filter
} from 'lucide-react';
import { GlassCard, GlowButton, SpotlightCard } from '@/components/GlassCard';
import { BentoGrid, BentoItem, BentoDataCard } from '@/components/BentoGrid';
import { TypewriterText, PulseRing } from '@/components/Physics';

const TOOL_TEMPLATES = [
    {
        id: 'roi-calculator',
        name: 'ROI CALCULATOR',
        icon: Calculator,
        description: 'Help prospects calculate their potential return on investment',
        fields: ['Current Revenue', 'Current Costs', 'Time Investment'],
        color: 'var(--color-acid)',
        bg: 'rgba(187, 255, 0, 0.15)'
    },
    {
        id: 'grader',
        name: 'ASSESSMENT GRADER',
        icon: Award,
        description: 'Score and grade prospects on key metrics with personalized feedback',
        fields: ['Question 1', 'Question 2', 'Question 3'],
        color: 'var(--color-aurora-purple)',
        bg: 'rgba(112, 0, 255, 0.15)'
    },
    {
        id: 'quiz',
        name: 'QUIZ / DIAGNOSTIC',
        icon: CircleHelp,
        description: 'Capture leads with an interactive quiz that segments by result',
        fields: ['Multiple Choice Questions', 'Result Categories'],
        color: 'var(--color-aurora-cyan)',
        bg: 'rgba(0, 240, 255, 0.15)'
    },
    {
        id: 'audit',
        name: 'SELF-AUDIT CHECKLIST',
        icon: FileText,
        description: 'Let prospects audit themselves against your framework',
        fields: ['Checklist Items', 'Scoring Criteria'],
        color: 'var(--text-sovereign-primary)',
        bg: 'rgba(255, 255, 255, 0.1)'
    },
];

const MOCK_TOOLS = [
    { id: 1, name: 'Agency Profit Calculator', type: 'roi-calculator', leads: 142, views: 1847 },
    { id: 2, name: 'Automation Readiness Quiz', type: 'quiz', leads: 89, views: 923 },
];

export default function ToolBuilder() {
    const [showCreate, setShowCreate] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
                        TOOL BUILDER
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Wand2 className="h-4 w-4 text-[var(--color-acid)]" />
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            Construct lead magnets using the Sovereign framework
                        </p>
                    </div>
                </div>
                <GlowButton variant="acid" onClick={() => setShowCreate(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    CREATE TOOL
                </GlowButton>
            </div>

            {/* Stats */}
            <BentoGrid columns={12} gap="normal">
                <BentoItem colSpan={4}>
                    <BentoDataCard
                        label="ACTIVE TOOLS"
                        value={MOCK_TOOLS.length}
                        trend="neutral"
                        icon={<Settings className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={4}>
                    <BentoDataCard
                        label="TOTAL LEADS"
                        value={MOCK_TOOLS.reduce((s, t) => s + t.leads, 0)}
                        delta={12}
                        trend="up"
                        icon={<Filter className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={4}>
                    <BentoDataCard
                        label="TOTAL VIEWS"
                        value={MOCK_TOOLS.reduce((s, t) => s + t.views, 0).toLocaleString()}
                        delta={24}
                        trend="up"
                        icon={<Eye className="h-4 w-4" />}
                    />
                </BentoItem>
            </BentoGrid>

            {/* Existing Tools */}
            <div>
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    DEPLOYED TOOLS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_TOOLS.map((tool) => {
                        const template = TOOL_TEMPLATES.find(t => t.id === tool.type);

                        return (
                            <GlassCard
                                key={tool.id}
                                intensity="medium"
                                className="p-5"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-12 w-12 rounded-lg flex items-center justify-center"
                                            style={{ background: template?.bg }}
                                        >
                                            {template && <template.icon className="h-6 w-6" style={{ color: template.color }} />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-[var(--text-sovereign-primary)]">{tool.name}</h3>
                                            <p className="text-terminal text-xs text-[var(--text-sovereign-muted)]" style={{ color: template?.color }}>
                                                {template?.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-sovereign-muted)] transition-colors">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-sovereign-muted)] transition-colors">
                                            <Settings className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <div className="glass-panel rounded-lg p-3 bg-[var(--color-void)]">
                                        <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">LEADS CAPTURED</p>
                                        <p className="text-xl font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                            {tool.leads}
                                        </p>
                                    </div>
                                    <div className="glass-panel rounded-lg p-3 bg-[var(--color-void)]">
                                        <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">TOTAL VIEWS</p>
                                        <p className="text-xl font-bold text-[var(--text-sovereign-primary)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                                            {tool.views}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--glass-sovereign-border)' }}>
                                    <button className="flex-1 py-2 text-terminal text-xs text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)] flex items-center justify-center gap-2">
                                        <Copy className="h-3 w-3" />
                                        COPY LINK
                                    </button>
                                    <button className="flex-1 py-2 text-terminal text-xs text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)] flex items-center justify-center gap-2">
                                        <ExternalLink className="h-3 w-3" />
                                        PREVIEW
                                    </button>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => { setShowCreate(false); setSelectedTemplate(null); }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={PHYSICS.interaction}
                            className="relative glass-panel w-full max-w-2xl p-6 border border-[var(--glass-sovereign-border)]"
                            style={{ background: 'var(--color-structure)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">
                                    SELECT TOOL TEMPLATE
                                </h2>
                                <button
                                    onClick={() => { setShowCreate(false); setSelectedTemplate(null); }}
                                    className="text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)]"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {TOOL_TEMPLATES.map((template) => (
                                    <motion.button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`text-left p-4 rounded-xl border transition-all ${selectedTemplate === template.id
                                            ? 'border-[var(--color-acid)] bg-[rgba(187,255,0,0.05)]'
                                            : 'border-[var(--glass-sovereign-border)] bg-[var(--color-void)] hover:bg-white/5'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                                                style={{ background: template.bg }}
                                            >
                                                <template.icon className="h-5 w-5" style={{ color: template.color }} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[var(--text-sovereign-primary)] text-sm mb-1">{template.name}</h4>
                                                <p className="text-[10px] text-[var(--text-sovereign-muted)] leading-relaxed">{template.description}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => { setShowCreate(false); setSelectedTemplate(null); }}
                                    className="px-4 py-2 text-terminal text-xs text-[var(--text-sovereign-muted)]"
                                >
                                    CANCEL
                                </button>
                                <GlowButton
                                    variant="acid"
                                    disabled={!selectedTemplate}
                                    onClick={() => {
                                        // TODO: Navigate to builder
                                        setShowCreate(false);
                                    }}
                                >
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    INITIALIZE BUILDER
                                </GlowButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
