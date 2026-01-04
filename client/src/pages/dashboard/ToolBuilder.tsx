import { useState } from 'react';
import { motion } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
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
    ExternalLink
} from 'lucide-react';

const TOOL_TEMPLATES = [
    {
        id: 'roi-calculator',
        name: 'ROI Calculator',
        icon: Calculator,
        description: 'Help prospects calculate their potential return on investment',
        fields: ['Current Revenue', 'Current Costs', 'Time Investment'],
        color: 'bg-emerald-500',
    },
    {
        id: 'grader',
        name: 'Assessment Grader',
        icon: Award,
        description: 'Score and grade prospects on key metrics with personalized feedback',
        fields: ['Question 1', 'Question 2', 'Question 3'],
        color: 'bg-amber-500',
    },
    {
        id: 'quiz',
        name: 'Quiz / Diagnostic',
        icon: CircleHelp,
        description: 'Capture leads with an interactive quiz that segments by result',
        fields: ['Multiple Choice Questions', 'Result Categories'],
        color: 'bg-purple-500',
    },
    {
        id: 'audit',
        name: 'Self-Audit Checklist',
        icon: FileText,
        description: 'Let prospects audit themselves against your framework',
        fields: ['Checklist Items', 'Scoring Criteria'],
        color: 'bg-blue-500',
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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-headline text-foreground">Tool Builder</h1>
                    <p className="text-muted-foreground mt-1">
                        Create lead magnets that demonstrate value before the call
                    </p>
                </div>
                <Button
                    onClick={() => setShowCreate(true)}
                    className="bg-gradient-primary shadow-lg shadow-primary/30"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Tool
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Active Tools" value={MOCK_TOOLS.length} color="text-primary" />
                <StatCard label="Total Leads" value={MOCK_TOOLS.reduce((s, t) => s + t.leads, 0)} color="text-success" />
                <StatCard label="Total Views" value={MOCK_TOOLS.reduce((s, t) => s + t.views, 0).toLocaleString()} color="text-warning" />
            </div>

            {/* Existing Tools */}
            <div>
                <h2 className="text-title text-foreground mb-4">Your Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_TOOLS.map((tool) => {
                        const template = TOOL_TEMPLATES.find(t => t.id === tool.type);

                        return (
                            <motion.div
                                key={tool.id}
                                className="glass-card p-5"
                                whileHover={{ scale: 1.01 }}
                                transition={PHYSICS.interaction}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-xl ${template?.color} flex items-center justify-center text-white`}>
                                            {template && <template.icon className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{tool.name}</h3>
                                            <p className="text-xs text-muted-foreground">{template?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" disablePhysics>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" disablePhysics>
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <div className="bg-card/50 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground">Leads</p>
                                        <p className="text-lg font-bold text-success">{tool.leads}</p>
                                    </div>
                                    <div className="bg-card/50 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground">Views</p>
                                        <p className="text-lg font-bold text-foreground">{tool.views}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
                                    <Button variant="outline" size="sm" className="flex-1" disablePhysics>
                                        <Copy className="h-3 w-3 mr-1" />
                                        Copy Link
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1" disablePhysics>
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        Preview
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Create Modal */}
            {showCreate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => { setShowCreate(false); setSelectedTemplate(null); }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={PHYSICS.interaction}
                        className="liquid-glass-heavy w-full max-w-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-title text-foreground mb-6">Choose a Template</h2>

                        <div className="grid grid-cols-2 gap-4">
                            {TOOL_TEMPLATES.map((template) => (
                                <motion.button
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    className={`text-left p-4 rounded-xl border transition-all ${selectedTemplate === template.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border/30 bg-card/30 hover:bg-card/50'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`h-10 w-10 rounded-xl ${template.color} flex items-center justify-center text-white`}>
                                            <template.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground">{template.name}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="ghost" onClick={() => { setShowCreate(false); setSelectedTemplate(null); }} disablePhysics>
                                Cancel
                            </Button>
                            <Button
                                className="bg-gradient-primary"
                                disabled={!selectedTemplate}
                                onClick={() => {
                                    // TODO: Navigate to builder
                                    setShowCreate(false);
                                }}
                            >
                                Create Tool
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
    return (
        <motion.div
            className="glass-card p-4"
            whileHover={{ scale: 1.02 }}
            transition={PHYSICS.interaction}
        >
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </motion.div>
    );
}
