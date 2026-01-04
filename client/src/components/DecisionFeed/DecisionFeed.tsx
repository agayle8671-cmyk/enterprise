import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
import {
    Mail,
    FileText,
    Zap,
    Calendar,
    Bot,
    Clock,
    Check,
    X,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Star
} from 'lucide-react';

interface DecisionOption {
    label: string;
    description: string;
}

interface Decision {
    id: number;
    agentName?: string;
    title: string;
    description: string;
    type: string;
    priority: string;
    options?: string; // JSON string
    recommendation?: number;
    status: string;
    createdAt: string;
}

const typeIcons: Record<string, any> = {
    email: Mail,
    proposal: FileText,
    automation: Zap,
    scheduling: Calendar,
};

const priorityColors: Record<string, string> = {
    low: 'text-muted-foreground',
    medium: 'text-warning',
    high: 'text-destructive',
    urgent: 'text-destructive animate-pulse',
};

export function DecisionFeed() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const { data: decisions = [], isLoading } = useQuery<Decision[]>({
        queryKey: ['/api/decisions'],
        refetchInterval: 30000, // Poll every 30 seconds
    });

    if (isLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-4 animate-pulse">
                        <div className="h-4 bg-muted/30 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-muted/20 rounded w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    if (decisions.length === 0) {
        return (
            <div className="glass-card p-8 text-center">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No pending decisions</h3>
                <p className="text-sm text-muted-foreground">
                    Your AI agents are working. New decisions will appear here when they need your input.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <AnimatePresence mode="popLayout">
                {decisions.map((decision, index) => (
                    <DecisionCard
                        key={decision.id}
                        decision={decision}
                        index={index}
                        isExpanded={expandedId === decision.id}
                        onToggle={() => setExpandedId(expandedId === decision.id ? null : decision.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

interface DecisionCardProps {
    decision: Decision;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}

function DecisionCard({ decision, index, isExpanded, onToggle }: DecisionCardProps) {
    const queryClient = useQueryClient();
    const Icon = typeIcons[decision.type] || Bot;

    // Parse options from JSON
    const options: DecisionOption[] = decision.options
        ? JSON.parse(decision.options)
        : [];

    const updateMutation = useMutation({
        mutationFn: async ({ id, status, selectedOption }: { id: number; status: string; selectedOption?: number }) => {
            const res = await fetch(`/api/decisions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, selectedOption, resolvedAt: new Date().toISOString() }),
            });
            if (!res.ok) throw new Error('Failed to update decision');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/decisions'] });
        },
    });

    const handleApprove = (optionIndex?: number) => {
        updateMutation.mutate({
            id: decision.id,
            status: 'approved',
            selectedOption: optionIndex ?? decision.recommendation ?? 0
        });
    };

    const handleReject = () => {
        updateMutation.mutate({ id: decision.id, status: 'rejected' });
    };

    const timeAgo = getTimeAgo(decision.createdAt);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ ...PHYSICS.interaction, delay: index * 0.05 }}
            className="glass-card overflow-hidden"
        >
            {/* Header - Always visible */}
            <div
                className="p-4 cursor-pointer hover:bg-card/50 transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {decision.agentName && (
                                <span className="text-xs font-medium text-primary/80">{decision.agentName}</span>
                            )}
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {timeAgo}
                            </span>
                            {decision.priority === 'urgent' || decision.priority === 'high' ? (
                                <AlertCircle className={`h-3.5 w-3.5 ${priorityColors[decision.priority]}`} />
                            ) : null}
                        </div>

                        <h4 className="font-medium text-foreground text-sm leading-snug truncate">
                            {decision.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {decision.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {!isExpanded && options.length > 0 && (
                            <>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={(e) => { e.stopPropagation(); handleReject(); }}
                                    disabled={updateMutation.isPending}
                                    disablePhysics
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    className="h-8 bg-success/20 text-success hover:bg-success/30"
                                    onClick={(e) => { e.stopPropagation(); handleApprove(); }}
                                    disabled={updateMutation.isPending}
                                    disablePhysics
                                >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                </Button>
                            </>
                        )}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            disablePhysics
                        >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Expanded Content - 1:3:1 Options */}
            <AnimatePresence>
                {isExpanded && options.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={PHYSICS.interaction}
                        className="border-t border-border/30"
                    >
                        <div className="p-4 space-y-3">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Choose an option
                            </p>

                            {options.map((option, i) => {
                                const isRecommended = i === decision.recommendation;

                                return (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleApprove(i)}
                                        disabled={updateMutation.isPending}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${isRecommended
                                                ? 'border-primary/50 bg-primary/10 hover:bg-primary/15'
                                                : 'border-border/30 bg-card/30 hover:bg-card/50'
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${isRecommended
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted/30 text-muted-foreground'
                                                }`}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-foreground text-sm">{option.label}</span>
                                                    {isRecommended && (
                                                        <span className="flex items-center gap-1 text-xs text-primary font-medium">
                                                            <Star className="h-3 w-3 fill-primary" />
                                                            Recommended
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}

                            <div className="flex justify-end pt-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={handleReject}
                                    disabled={updateMutation.isPending}
                                    disablePhysics
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Dismiss
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export { DecisionCard };
