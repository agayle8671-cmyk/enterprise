import { motion } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import {
    Users,
    FileText,
    Clock,
    CheckCircle,
    BookOpen,
    MessageSquare,
    ExternalLink,
    Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock client portal data
const MOCK_CLIENT_DATA = {
    client: {
        name: "Acme Corp",
        contactName: "Sarah Johnson",
        email: "sarah@acmecorp.com",
    },
    project: {
        name: "Operations Automation",
        status: "In Progress",
        progress: 65,
        startDate: "2026-01-01",
        endDate: "2026-03-31",
    },
    milestones: [
        { id: 1, name: "Discovery & Strategy", status: "completed", date: "Week 1-2" },
        { id: 2, name: "System Setup", status: "completed", date: "Week 3-4" },
        { id: 3, name: "Implementation", status: "in_progress", date: "Week 5-8" },
        { id: 4, name: "Optimization", status: "pending", date: "Week 9-12" },
    ],
    deliverables: [
        { id: 1, name: "Discovery Document", status: "delivered", date: "Jan 8, 2026" },
        { id: 2, name: "System Architecture", status: "delivered", date: "Jan 15, 2026" },
        { id: 3, name: "Training Videos", status: "pending", date: "TBD" },
    ],
    assets: [
        { id: 1, name: "Automation Playbook", type: "PDF" },
        { id: 2, name: "SOP Templates", type: "Folder" },
        { id: 3, name: "Training Library", type: "Video" },
    ],
};

export default function ClientPortal() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-headline text-foreground">Client Portal</h1>
                    <p className="text-muted-foreground mt-1">
                        White-label client experience with project visibility
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground bg-card px-3 py-1 rounded-full">
                        Demo Mode
                    </span>
                    <Button variant="outline" disablePhysics>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview as Client
                    </Button>
                </div>
            </div>

            {/* Info Banner */}
            <div className="glass-card p-4 border-l-4 border-primary flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-medium text-foreground">Client Portal Preview</h4>
                    <p className="text-sm text-muted-foreground">
                        This is how your clients will see their project status. Customize branding in Settings → White Label.
                    </p>
                </div>
            </div>

            {/* Client Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project Status */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-title text-foreground">{MOCK_CLIENT_DATA.project.name}</h3>
                            <p className="text-sm text-muted-foreground">for {MOCK_CLIENT_DATA.client.name}</p>
                        </div>
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                            {MOCK_CLIENT_DATA.project.status}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Overall Progress</span>
                            <span className="text-sm font-medium text-foreground">{MOCK_CLIENT_DATA.project.progress}%</span>
                        </div>
                        <div className="h-3 bg-card rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${MOCK_CLIENT_DATA.project.progress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </div>
                    </div>

                    {/* Milestones */}
                    <h4 className="font-medium text-foreground mb-4">Milestones</h4>
                    <div className="space-y-3">
                        {MOCK_CLIENT_DATA.milestones.map((milestone) => (
                            <motion.div
                                key={milestone.id}
                                className="flex items-center gap-3 p-3 bg-card/30 rounded-lg"
                                whileHover={{ x: 4 }}
                                transition={PHYSICS.interaction}
                            >
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${milestone.status === 'completed'
                                        ? 'bg-success/20 text-success'
                                        : milestone.status === 'in_progress'
                                            ? 'bg-primary/20 text-primary'
                                            : 'bg-muted/30 text-muted-foreground'
                                    }`}>
                                    {milestone.status === 'completed' ? (
                                        <CheckCircle className="h-4 w-4" />
                                    ) : milestone.status === 'in_progress' ? (
                                        <Clock className="h-4 w-4" />
                                    ) : (
                                        <span className="text-xs font-bold">{milestone.id}</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-foreground text-sm">{milestone.name}</p>
                                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                                </div>
                                {milestone.status === 'completed' && (
                                    <span className="text-xs text-success font-medium">Complete</span>
                                )}
                                {milestone.status === 'in_progress' && (
                                    <span className="text-xs text-primary font-medium">Active</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Deliverables */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="h-4 w-4 text-primary" />
                            <h4 className="font-medium text-foreground">Deliverables</h4>
                        </div>
                        <div className="space-y-2">
                            {MOCK_CLIENT_DATA.deliverables.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-2 bg-card/30 rounded-lg text-sm"
                                >
                                    <span className="text-foreground">{item.name}</span>
                                    <span className={`text-xs ${item.status === 'delivered' ? 'text-success' : 'text-muted-foreground'
                                        }`}>
                                        {item.status === 'delivered' ? item.date : 'Pending'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Methodology Assets */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="h-4 w-4 text-warning" />
                            <h4 className="font-medium text-foreground">Your Assets</h4>
                        </div>
                        <div className="space-y-2">
                            {MOCK_CLIENT_DATA.assets.map((asset) => (
                                <motion.button
                                    key={asset.id}
                                    className="w-full flex items-center justify-between p-2 bg-card/30 rounded-lg text-sm hover:bg-card/50 transition-colors"
                                    whileHover={{ x: 4 }}
                                    transition={PHYSICS.interaction}
                                >
                                    <span className="text-foreground">{asset.name}</span>
                                    <span className="text-xs text-muted-foreground">{asset.type}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <h4 className="font-medium text-foreground">Need Help?</h4>
                        </div>
                        <Button className="w-full bg-gradient-primary" size="sm">
                            Schedule a Call
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
