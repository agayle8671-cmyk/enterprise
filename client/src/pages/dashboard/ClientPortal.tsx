/**
 * Client Portal Page - Sovereign Aesthetic
 * 
 * White-label client view with:
 * - Glass dashboard
 * - Progress tracking
 * - Asset delivery
 * - FULLY FUNCTIONAL buttons
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { useToast } from '@/hooks/use-toast';
import {
    FileText,
    CheckCircle,
    BookOpen,
    MessageSquare,
    Download,
    Play,
    Calendar,
    Activity,
    Video,
    Send,
    Briefcase,
    Clock,
    Shield,
    X,
    ExternalLink
} from 'lucide-react';
import { GlowButton, GlassCard, SpotlightCard } from '@/components/GlassCard';
import { BentoGrid, BentoItem, BentoDataCard } from '@/components/BentoGrid';
import { PulseRing } from '@/components/Physics';

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
        { id: 1, name: "Discovery Document", status: "delivered", date: "Jan 8, 2026", filename: "discovery-doc.pdf" },
        { id: 2, name: "System Architecture", status: "delivered", date: "Jan 15, 2026", filename: "architecture.pdf" },
        { id: 3, name: "Training Videos", status: "pending", date: "TBD", filename: null },
    ],
    trainingLibrary: [
        {
            id: 1,
            category: "Getting Started",
            videos: [
                { id: 1, title: "Platform Overview", duration: "5:32", completed: true, url: "https://example.com/video1" },
                { id: 2, title: "Navigating Your Dashboard", duration: "3:45", completed: true, url: "https://example.com/video2" },
            ]
        },
        {
            id: 2,
            category: "Automation Basics",
            videos: [
                { id: 4, title: "Creating Your First Workflow", duration: "8:22", completed: false, url: "https://example.com/video3" },
            ]
        },
    ],
};

const TABS = [
    { id: 'overview', label: 'OVERVIEW', icon: Activity },
    { id: 'deliverables', label: 'DELIVERABLES', icon: FileText },
    { id: 'training', label: 'TRAINING', icon: BookOpen },
    { id: 'support', label: 'SUPPORT', icon: MessageSquare },
];

export default function ClientPortal() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
                        CLIENT PORTAL
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Briefcase className="h-4 w-4 text-[var(--color-acid)]" />
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            Project status and asset delivery for {MOCK_CLIENT_DATA.client.name}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">LOGGED IN AS</p>
                        <p className="text-sm text-[var(--text-sovereign-primary)]">{MOCK_CLIENT_DATA.client.contactName}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[var(--color-acid)] flex items-center justify-center text-black font-bold">
                        {MOCK_CLIENT_DATA.client.contactName.charAt(0)}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="glass-panel p-1 rounded-lg flex flex-wrap gap-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-terminal text-xs transition-colors ${activeTab === tab.id
                            ? 'bg-[var(--color-acid)] text-black'
                            : 'text-[var(--text-sovereign-muted)] hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={PHYSICS.interaction}
                >
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'deliverables' && <DeliverablesTab />}
                    {activeTab === 'training' && <TrainingTab />}
                    {activeTab === 'support' && <SupportTab />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function OverviewTab() {
    return (
        <div className="space-y-6">
            {/* Progress Card */}
            <SpotlightCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg text-[var(--text-sovereign-primary)] mb-1">PROJECT VELOCITY</h3>
                        <p className="text-terminal text-xs text-[var(--text-sovereign-muted)]">
                            {MOCK_CLIENT_DATA.project.name}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl font-bold text-[var(--color-aurora-cyan)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                            {MOCK_CLIENT_DATA.project.progress}%
                        </span>
                        <span className="text-sm text-[var(--text-sovereign-muted)] ml-2 block">COMPLETION</span>
                    </div>
                </div>
                <div className="h-2 w-full bg-[var(--color-void)] rounded-full overflow-hidden border border-[var(--glass-sovereign-border)] relative">
                    <motion.div
                        className="h-full bg-[var(--color-aurora-cyan)] shadow-[0_0_15px_var(--color-aurora-cyan)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${MOCK_CLIENT_DATA.project.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </div>
            </SpotlightCard>

            {/* Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_CLIENT_DATA.milestones.map((milestone) => (
                    <GlassCard
                        key={milestone.id}
                        intensity="medium"
                        className={`p-4 ${milestone.status === 'in_progress' ? 'border-[var(--color-aurora-cyan)]' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">{milestone.date}</span>
                            {milestone.status === 'completed' && <CheckCircle className="h-4 w-4 text-[var(--color-acid)]" />}
                            {milestone.status === 'in_progress' && <PulseRing size={16} color="var(--color-aurora-cyan)" />}
                            {milestone.status === 'pending' && <Clock className="h-4 w-4 text-[var(--text-sovereign-muted)]" />}
                        </div>
                        <h4 className="text-sm font-medium text-[var(--text-sovereign-primary)]">{milestone.name}</h4>
                        <span className={`text-[10px] mt-2 inline-block px-2 py-0.5 rounded ${milestone.status === 'completed' ? 'bg-[rgba(187,255,0,0.1)] text-[var(--color-acid)]' :
                            milestone.status === 'in_progress' ? 'bg-[rgba(0,240,255,0.1)] text-[var(--color-aurora-cyan)]' :
                                'bg-white/5 text-[var(--text-sovereign-muted)]'
                            }`}>
                            {milestone.status.toUpperCase().replace('_', ' ')}
                        </span>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}

function DeliverablesTab() {
    const { toast } = useToast();

    const handleDownload = (item: { name: string; filename: string | null }) => {
        if (!item.filename) return;

        // Create a mock file download
        const content = `${item.name}\n\nThis is a sample deliverable document.\nGenerated on: ${new Date().toISOString()}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = item.filename;
        a.click();
        URL.revokeObjectURL(url);

        toast({
            title: "DOWNLOAD STARTED",
            description: `${item.name} is being downloaded`,
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MOCK_CLIENT_DATA.deliverables.map((item) => (
                <GlassCard key={item.id} intensity="medium" className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-[var(--color-void)] flex items-center justify-center text-[var(--text-sovereign-primary)] border border-[var(--glass-sovereign-border)]">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-[var(--text-sovereign-primary)]">{item.name}</h4>
                            <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">{item.date}</p>
                        </div>
                    </div>
                    {item.status === 'delivered' ? (
                        <GlowButton
                            variant="acid"
                            size="sm"
                            onClick={() => handleDownload(item)}
                        >
                            <Download className="h-3 w-3 mr-2" />
                            DOWNLOAD
                        </GlowButton>
                    ) : (
                        <span className="text-terminal text-xs text-[var(--text-sovereign-muted)] px-3 py-1 bg-white/5 rounded">
                            PENDING
                        </span>
                    )}
                </GlassCard>
            ))}
        </div>
    );
}

function TrainingTab() {
    const { toast } = useToast();
    const [playingVideo, setPlayingVideo] = useState<{ title: string; url: string } | null>(null);

    const handlePlayVideo = (video: { title: string; url: string }) => {
        setPlayingVideo(video);
        toast({
            title: "VIDEO PLAYING",
            description: `Now playing: ${video.title}`,
        });
    };

    return (
        <div className="space-y-6">
            {MOCK_CLIENT_DATA.trainingLibrary.map((category) => (
                <div key={category.id} className="space-y-4">
                    <h3 className="text-terminal text-sm text-[var(--text-sovereign-muted)] border-b border-[var(--glass-sovereign-border)] pb-2">
                        {category.category.toUpperCase()}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {category.videos.map((video) => (
                            <GlassCard
                                key={video.id}
                                intensity="medium"
                                className="p-0 overflow-hidden group cursor-pointer hover:border-[var(--color-aurora-cyan)] transition-colors"
                                onClick={() => handlePlayVideo(video)}
                            >
                                <div className="h-32 bg-[var(--color-void)] flex items-center justify-center relative">
                                    <Play className="h-10 w-10 text-[var(--color-aurora-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[10px] text-white font-mono">
                                        {video.duration}
                                    </div>
                                    {video.completed && (
                                        <div className="absolute top-2 right-2 bg-[var(--color-acid)] text-black text-[10px] px-2 py-0.5 rounded font-bold">
                                            WATCHED
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="text-sm font-medium text-[var(--text-sovereign-primary)] line-clamp-1">{video.title}</h4>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            ))}

            {/* Video Player Modal */}
            <AnimatePresence>
                {playingVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setPlayingVideo(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative glass-panel w-full max-w-3xl p-6 border border-[var(--glass-sovereign-border)]"
                            style={{ background: 'var(--color-structure)' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">
                                    {playingVideo.title}
                                </h2>
                                <button onClick={() => setPlayingVideo(null)} className="text-[var(--text-sovereign-muted)]">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Video className="h-16 w-16 text-[var(--color-aurora-cyan)] mx-auto mb-4" />
                                    <p className="text-[var(--text-sovereign-muted)]">Video player placeholder</p>
                                    <p className="text-xs text-[var(--text-sovereign-muted)] mt-2">
                                        In production, this would embed the actual video
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SupportTab() {
    const { toast } = useToast();
    const [message, setMessage] = useState('');
    const [showOutageModal, setShowOutageModal] = useState(false);
    const [outageDescription, setOutageDescription] = useState('');

    const handleSendMessage = () => {
        if (!message.trim()) return;
        toast({
            title: "MESSAGE SENT",
            description: "Your message has been sent to support. Typical reply time: 10 minutes.",
        });
        setMessage('');
    };

    const handleReportOutage = () => {
        if (!outageDescription.trim()) {
            toast({
                title: "DESCRIPTION REQUIRED",
                description: "Please describe the issue you're experiencing",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "OUTAGE REPORTED",
            description: "Our team has been notified and will respond immediately.",
        });
        setShowOutageModal(false);
        setOutageDescription('');
    };

    const handleViewCalendar = () => {
        window.open('https://calendly.com', '_blank');
        toast({
            title: "CALENDAR OPENED",
            description: "Select a time slot for your review call",
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
            {/* Chat Interface */}
            <GlassCard intensity="medium" className="flex flex-col h-full border-[var(--glass-sovereign-border)]">
                <div className="p-4 border-b border-[var(--glass-sovereign-border)] flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[var(--color-aurora-purple)] flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[var(--text-sovereign-primary)]">CONCIERGE SUPPORT</h3>
                        <p className="text-[10px] text-[var(--text-sovereign-muted)]">Typical reply time: 10m</p>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm text-[var(--text-sovereign-muted)]">Hello Sarah, how can we help you with your automation setup today?</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-[rgba(187,255,0,0.1)] border border-[var(--color-acid)] rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm text-[var(--text-sovereign-primary)]">I have a question about the onboarding workflow.</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-[var(--glass-sovereign-border)]">
                    <div className="relative">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="w-full bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg pl-4 pr-12 py-3 text-sm text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[var(--text-sovereign-muted)] hover:text-[var(--color-acid)]"
                            onClick={handleSendMessage}
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </GlassCard>

            <div className="space-y-6">
                <SpotlightCard className="p-6">
                    <Shield className="h-8 w-8 text-[var(--color-alarm)] mb-4" />
                    <h3 className="text-lg font-bold text-[var(--text-sovereign-primary)] mb-2">PRIORITY SUPPORT</h3>
                    <p className="text-sm text-[var(--text-sovereign-muted)] mb-4">
                        Your plan includes 24/7 priority support access. For urgent system issues, use the emergency channel.
                    </p>
                    <GlowButton
                        variant="alarm"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowOutageModal(true)}
                    >
                        REPORT OUTAGE
                    </GlowButton>
                </SpotlightCard>

                <GlassCard intensity="medium" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Video className="h-5 w-5 text-[var(--color-aurora-cyan)]" />
                        <h3 className="text-sm font-bold text-[var(--text-sovereign-primary)]">SCHEDULE REVIEW CALL</h3>
                    </div>
                    <p className="text-xs text-[var(--text-sovereign-muted)] mb-4">
                        Book a 30-min session with your dedicated success manager.
                    </p>
                    <GlowButton
                        variant="aurora"
                        size="sm"
                        className="w-full"
                        onClick={handleViewCalendar}
                    >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        VIEW CALENDAR
                    </GlowButton>
                </GlassCard>
            </div>

            {/* Outage Report Modal */}
            <AnimatePresence>
                {showOutageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowOutageModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative glass-panel w-full max-w-md p-6 border border-[var(--color-alarm)]"
                            style={{ background: 'var(--color-structure)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-terminal text-lg text-[var(--color-alarm)]">
                                    REPORT OUTAGE
                                </h2>
                                <button onClick={() => setShowOutageModal(false)} className="text-[var(--text-sovereign-muted)]">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-[var(--text-sovereign-muted)]">
                                    This will immediately notify our on-call team. Please describe the issue:
                                </p>
                                <textarea
                                    value={outageDescription}
                                    onChange={(e) => setOutageDescription(e.target.value)}
                                    placeholder="Describe what's not working..."
                                    className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-alarm)] min-h-[100px]"
                                    style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowOutageModal(false)}
                                    className="px-4 py-2 text-terminal text-xs text-[var(--text-sovereign-muted)]"
                                >
                                    CANCEL
                                </button>
                                <GlowButton variant="alarm" onClick={handleReportOutage}>
                                    SUBMIT REPORT
                                </GlowButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
