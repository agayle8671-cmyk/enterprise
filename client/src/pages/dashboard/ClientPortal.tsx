import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { useAIChat } from '@/hooks/useAIChat';
import {
    Users,
    FileText,
    Clock,
    CheckCircle,
    BookOpen,
    MessageSquare,
    ExternalLink,
    Lock,
    Play,
    Download,
    ChevronDown,
    ChevronRight,
    Send,
    Bot,
    Calendar,
    Activity,
    TrendingUp,
    Video,
    Loader2,
    X
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
    reports: [
        { id: 1, name: "Monthly Progress Report - January", date: "Jan 31, 2026", type: "PDF", size: "2.4 MB" },
        { id: 2, name: "KPI Dashboard Export", date: "Jan 28, 2026", type: "Excel", size: "1.1 MB" },
        { id: 3, name: "Automation Impact Analysis", date: "Jan 20, 2026", type: "PDF", size: "856 KB" },
    ],
    trainingLibrary: [
        {
            id: 1,
            category: "Getting Started",
            videos: [
                { id: 1, title: "Platform Overview", duration: "5:32", completed: true },
                { id: 2, title: "Navigating Your Dashboard", duration: "3:45", completed: true },
                { id: 3, title: "Setting Up Your Profile", duration: "2:18", completed: false },
            ]
        },
        {
            id: 2,
            category: "Automation Basics",
            videos: [
                { id: 4, title: "Creating Your First Workflow", duration: "8:22", completed: false },
                { id: 5, title: "Triggers and Actions", duration: "6:15", completed: false },
                { id: 6, title: "Testing Automations", duration: "4:50", completed: false },
            ]
        },
        {
            id: 3,
            category: "Advanced Features",
            videos: [
                { id: 7, title: "Custom Integrations", duration: "12:30", completed: false },
                { id: 8, title: "AI-Powered Decisions", duration: "9:45", completed: false },
            ]
        },
    ],
    activityTimeline: [
        { id: 1, event: "Milestone completed: System Setup", date: "Jan 15, 2026", type: "milestone" },
        { id: 2, event: "New report available: Monthly Progress", date: "Jan 31, 2026", type: "report" },
        { id: 3, event: "3 new training videos added", date: "Jan 25, 2026", type: "training" },
        { id: 4, event: "Project kickoff call", date: "Jan 2, 2026", type: "meeting" },
    ],
};

// Embedded Agent Chat Component
function AgentChat() {
    const { messages, isLoading, sendMessage } = useAIChat();
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="raycast-panel overflow-hidden">
            {/* Chat Header */}
            <button
                className="w-full p-4 flex items-center justify-between hover:bg-card/30 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-medium text-foreground">Support Agent</h4>
                        <p className="text-xs text-muted-foreground">Ask questions about your project</p>
                    </div>
                </div>
                {isOpen ? (
                    <X className="h-5 w-5 text-muted-foreground" />
                ) : (
                    <MessageSquare className="h-5 w-5 text-primary" />
                )}
            </button>

            {/* Chat Body */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={PHYSICS.interaction}
                    >
                        <div className="border-t border-border/30">
                            {/* Messages */}
                            <div className="h-64 overflow-y-auto p-4 space-y-3">
                                {messages.length === 0 && (
                                    <div className="text-center text-muted-foreground text-sm py-8">
                                        <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        <p>Hi! I'm your project support agent.</p>
                                        <p className="text-xs mt-1">Ask me anything about your project.</p>
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-card text-foreground'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-card rounded-xl px-3 py-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-3 border-t border-border/30">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        className="flex-1 bg-card/50 border border-border/30 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        disabled={isLoading}
                                    />
                                    <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Training Library Component
function TrainingLibrary() {
    const [expandedCategory, setExpandedCategory] = useState<number | null>(1);

    return (
        <div className="raycast-panel p-5">
            <div className="flex items-center gap-2 mb-4">
                <Video className="h-4 w-4 text-warning" />
                <h4 className="font-medium text-foreground">Training Library</h4>
            </div>
            <div className="space-y-2">
                {MOCK_CLIENT_DATA.trainingLibrary.map((category) => (
                    <div key={category.id} className="border border-border/20 rounded-lg overflow-hidden">
                        <button
                            className="w-full flex items-center justify-between p-3 bg-card/30 hover:bg-card/50 transition-colors"
                            onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                        >
                            <span className="text-sm font-medium text-foreground">{category.category}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                    {category.videos.filter(v => v.completed).length}/{category.videos.length}
                                </span>
                                {expandedCategory === category.id ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                            </div>
                        </button>
                        <AnimatePresence>
                            {expandedCategory === category.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={PHYSICS.interaction}
                                >
                                    <div className="p-2 space-y-1">
                                        {category.videos.map((video) => (
                                            <motion.button
                                                key={video.id}
                                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors"
                                                whileHover={{ x: 4 }}
                                                transition={PHYSICS.interaction}
                                            >
                                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${video.completed ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
                                                    }`}>
                                                    {video.completed ? (
                                                        <CheckCircle className="h-4 w-4" />
                                                    ) : (
                                                        <Play className="h-4 w-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm text-foreground">{video.title}</p>
                                                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Reports Section Component
function ReportsSection() {
    return (
        <div className="raycast-panel p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-foreground">Reports & Documents</h4>
                </div>
            </div>
            <div className="space-y-2">
                {MOCK_CLIENT_DATA.reports.map((report) => (
                    <motion.div
                        key={report.id}
                        className="flex items-center justify-between p-3 bg-card/30 rounded-lg hover:bg-card/50 transition-colors cursor-pointer"
                        whileHover={{ x: 4 }}
                        transition={PHYSICS.interaction}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{report.name}</p>
                                <p className="text-xs text-muted-foreground">{report.date} · {report.size}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disablePhysics>
                            <Download className="h-4 w-4" />
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Activity Timeline Component
function ActivityTimeline() {
    const getIcon = (type: string) => {
        switch (type) {
            case 'milestone': return <CheckCircle className="h-4 w-4" />;
            case 'report': return <FileText className="h-4 w-4" />;
            case 'training': return <Video className="h-4 w-4" />;
            case 'meeting': return <Calendar className="h-4 w-4" />;
            default: return <Activity className="h-4 w-4" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'milestone': return 'bg-success/20 text-success';
            case 'report': return 'bg-primary/20 text-primary';
            case 'training': return 'bg-warning/20 text-warning';
            case 'meeting': return 'bg-info/20 text-info';
            default: return 'bg-muted/20 text-muted-foreground';
        }
    };

    return (
        <div className="raycast-panel p-5">
            <div className="flex items-center gap-2 mb-4">
                <Activity className="h-4 w-4 text-info" />
                <h4 className="font-medium text-foreground">Activity Timeline</h4>
            </div>
            <div className="space-y-3">
                {MOCK_CLIENT_DATA.activityTimeline.map((activity, index) => (
                    <div key={activity.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${getColor(activity.type)}`}>
                                {getIcon(activity.type)}
                            </div>
                            {index < MOCK_CLIENT_DATA.activityTimeline.length - 1 && (
                                <div className="w-px h-full bg-border/30 my-1" />
                            )}
                        </div>
                        <div className="flex-1 pb-4">
                            <p className="text-sm text-foreground">{activity.event}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ClientPortal() {
    const [activeTab, setActiveTab] = useState<'overview' | 'training' | 'reports'>('overview');

    return (
        <div className="space-y-6">
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
            <div className="raycast-panel p-4 border-l-4 border-primary flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-medium text-foreground">Client Portal Preview</h4>
                    <p className="text-sm text-muted-foreground">
                        This is how your clients will see their project status. Customize branding in Settings → White Label.
                    </p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-border/30 pb-2">
                {[
                    { id: 'overview', label: 'Overview', icon: TrendingUp },
                    { id: 'training', label: 'Training', icon: Video },
                    { id: 'reports', label: 'Reports', icon: FileText },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-card/30'
                            }`}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={PHYSICS.interaction}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Project Status */}
                            <div className="lg:col-span-2 raycast-panel p-6">
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
                                {/* Embedded Agent Chat */}
                                <AgentChat />

                                {/* Activity Timeline */}
                                <ActivityTimeline />

                                {/* Deliverables */}
                                <div className="raycast-panel p-5">
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
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'training' && (
                    <motion.div
                        key="training"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={PHYSICS.interaction}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <TrainingLibrary />
                            </div>
                            <div className="space-y-6">
                                <AgentChat />
                                <div className="raycast-panel p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BookOpen className="h-4 w-4 text-warning" />
                                        <h4 className="font-medium text-foreground">Learning Progress</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Videos Completed</span>
                                                <span className="text-foreground font-medium">2/8</span>
                                            </div>
                                            <div className="h-2 bg-card rounded-full overflow-hidden">
                                                <div className="h-full bg-success w-1/4 rounded-full" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Complete all training videos to unlock advanced features.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'reports' && (
                    <motion.div
                        key="reports"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={PHYSICS.interaction}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <ReportsSection />
                            </div>
                            <div className="space-y-6">
                                <AgentChat />
                                <div className="raycast-panel p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <TrendingUp className="h-4 w-4 text-success" />
                                        <h4 className="font-medium text-foreground">Quick Stats</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-card/30 rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold text-foreground">65%</p>
                                            <p className="text-xs text-muted-foreground">Progress</p>
                                        </div>
                                        <div className="bg-card/30 rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold text-foreground">2/4</p>
                                            <p className="text-xs text-muted-foreground">Milestones</p>
                                        </div>
                                        <div className="bg-card/30 rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold text-foreground">3</p>
                                            <p className="text-xs text-muted-foreground">Reports</p>
                                        </div>
                                        <div className="bg-card/30 rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold text-foreground">8</p>
                                            <p className="text-xs text-muted-foreground">Videos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
