/**
 * Proposals Page - Sovereign Aesthetic
 * 
 * Contract management with:
 * - Terminal typography
 * - Glass panels
 * - Physics animations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
import {
    FileText,
    Plus,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    Send,
    Eye,
    Wand2,
    MoreVertical,
    X
} from 'lucide-react';
import { BentoGrid, BentoItem, BentoDataCard } from '@/components/BentoGrid';
import { GlassCard, GlowButton, SpotlightCard } from '@/components/GlassCard';
import { TypewriterText, PulseRing, StreamingNumber } from '@/components/Physics';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contract {
    id: number;
    clientName: string;
    amount: number;
    status: string;
    sentAt: string;
    signedAt?: string;
    paidAt?: string;
}

const statusConfig = {
    pending: { label: 'SENT', icon: Clock, color: 'var(--color-aurora-purple)', bg: 'rgba(112, 0, 255, 0.15)' },
    signed: { label: 'SIGNED', icon: CheckCircle, color: 'var(--color-aurora-cyan)', bg: 'rgba(0, 240, 255, 0.15)' },
    paid: { label: 'PAID', icon: DollarSign, color: 'var(--color-acid)', bg: 'rgba(187, 255, 0, 0.15)' },
    rejected: { label: 'DECLINED', icon: XCircle, color: 'var(--color-alarm)', bg: 'rgba(255, 51, 102, 0.15)' },
};

export default function Proposals() {
    const [showCreate, setShowCreate] = useState(false);
    const [newProposal, setNewProposal] = useState({ clientName: '', amount: '' });

    const { data: contracts = [], isLoading } = useQuery<Contract[]>({
        queryKey: ['/api/contracts'],
    });

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: { clientName: string; amount: number }) => {
            const res = await fetch('/api/contracts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, status: 'pending' }),
            });
            if (!res.ok) throw new Error('Failed to create proposal');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/contracts'] });
            setShowCreate(false);
            setNewProposal({ clientName: '', amount: '' });
        },
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <PulseRing color="var(--color-acid)" size={60} duration={1.5} />
                    <p className="text-terminal text-sm text-[var(--color-acid)] mt-6">
                        LOADING CONTRACTS...
                    </p>
                </div>
            </div>
        );
    }

    const totalValue = contracts.reduce((s, c) => s + c.amount, 0) / 100;
    const paidValue = contracts.filter(c => c.status === 'paid').reduce((s, c) => s + c.amount, 0) / 100;
    const pendingValue = contracts.filter(c => c.status === 'pending' || c.status === 'signed').reduce((s, c) => s + c.amount, 0) / 100;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">
                        PROPOSALS & CONTRACTS
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <FileText className="h-4 w-4 text-[var(--color-acid)]" />
                        <p className="text-sm text-[var(--text-sovereign-muted)]">
                            High-ticket proposals with embedded payments
                        </p>
                    </div>
                </div>
                <GlowButton variant="acid" onClick={() => setShowCreate(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    NEW PROPOSAL
                </GlowButton>
            </div>

            {/* Command Line */}
            <SpotlightCard className="p-6">
                <div className="flex items-center gap-4">
                    <Wand2 className="h-6 w-6 text-[var(--color-aurora-purple)]" />
                    <div className="flex-1">
                        <TypewriterText
                            text="Tracking contract statuses... Monitoring payment pipelines..."
                            speed={25}
                            loop
                            pauseDuration={3000}
                            className="text-lg text-[var(--color-aurora-purple)]"
                        />
                    </div>
                </div>
            </SpotlightCard>

            {/* Stats */}
            <BentoGrid columns={12} gap="normal">
                <BentoItem colSpan={4}>
                    <BentoDataCard
                        label="TOTAL PIPELINE"
                        value={`$${totalValue.toLocaleString()}`}
                        trend="neutral"
                        icon={<DollarSign className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={4}>
                    <BentoDataCard
                        label="PENDING"
                        value={`$${pendingValue.toLocaleString()}`}
                        trend="neutral"
                        icon={<Clock className="h-4 w-4" />}
                    />
                </BentoItem>
                <BentoItem colSpan={4}>
                    <BentoDataCard
                        label="COLLECTED"
                        value={`$${paidValue.toLocaleString()}`}
                        delta={paidValue > 0 ? 100 : 0}
                        trend="up"
                        icon={<CheckCircle className="h-4 w-4" />}
                    />
                </BentoItem>
            </BentoGrid>

            {/* Contract List */}
            <div>
                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)] mb-4">
                    ACTIVE CONTRACTS
                </h2>

                {contracts.length === 0 ? (
                    <GlassCard intensity="medium" className="p-12 text-center">
                        <FileText className="h-12 w-12 text-[var(--text-sovereign-muted)] mx-auto mb-4" />
                        <h3 className="text-[var(--text-sovereign-primary)] font-medium mb-2">No proposals yet</h3>
                        <p className="text-sm text-[var(--text-sovereign-muted)] mb-4">
                            Create your first proposal to get started
                        </p>
                        <GlowButton variant="acid" onClick={() => setShowCreate(true)}>
                            <Wand2 className="h-4 w-4 mr-2" />
                            CREATE PROPOSAL
                        </GlowButton>
                    </GlassCard>
                ) : (
                    <div className="space-y-2">
                        {contracts.map((contract) => (
                            <ContractRow key={contract.id} contract={contract} />
                        ))}
                    </div>
                )}
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
                            onClick={() => setShowCreate(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={PHYSICS.interaction}
                            className="relative glass-panel w-full max-w-md p-6 border border-[var(--glass-sovereign-border)]"
                            style={{ background: 'var(--color-structure)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-terminal text-lg text-[var(--text-sovereign-primary)]">
                                    NEW PROPOSAL
                                </h2>
                                <button onClick={() => setShowCreate(false)} className="text-[var(--text-sovereign-muted)]">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                                        CLIENT NAME
                                    </label>
                                    <input
                                        type="text"
                                        value={newProposal.clientName}
                                        onChange={(e) => setNewProposal({ ...newProposal, clientName: e.target.value })}
                                        placeholder="e.g., Acme Corp"
                                        className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                                        style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                                    />
                                </div>
                                <div>
                                    <label className="text-terminal text-xs text-[var(--text-sovereign-muted)] block mb-2">
                                        AMOUNT ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={newProposal.amount}
                                        onChange={(e) => setNewProposal({ ...newProposal, amount: e.target.value })}
                                        placeholder="e.g., 5000"
                                        className="w-full p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] text-[var(--text-sovereign-primary)] outline-none focus:border-[var(--color-acid)]"
                                        style={{ fontFamily: 'var(--font-sovereign-mono)' }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowCreate(false)}
                                    className="px-4 py-2 text-terminal text-xs text-[var(--text-sovereign-muted)]"
                                >
                                    CANCEL
                                </button>
                                <GlowButton
                                    variant="acid"
                                    disabled={!newProposal.clientName || !newProposal.amount || createMutation.isPending}
                                    onClick={() => createMutation.mutate({
                                        clientName: newProposal.clientName,
                                        amount: parseInt(newProposal.amount) * 100,
                                    })}
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    {createMutation.isPending ? 'SENDING...' : 'SEND PROPOSAL'}
                                </GlowButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ContractRow({ contract }: { contract: Contract }) {
    const status = statusConfig[contract.status as keyof typeof statusConfig] || statusConfig.pending;

    return (
        <motion.div
            className="glass-panel rounded-lg p-4 flex items-center gap-4"
            whileHover={{ x: 4, borderColor: 'var(--color-acid)' }}
            transition={PHYSICS.interaction}
        >
            <div
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ background: status.bg }}
            >
                <status.icon className="h-5 w-5" style={{ color: status.color }} />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[var(--text-sovereign-primary)] truncate">{contract.clientName}</h4>
                <p className="text-terminal text-[10px] text-[var(--text-sovereign-muted)]">
                    SENT {new Date(contract.sentAt).toLocaleDateString().toUpperCase()}
                </p>
            </div>

            <div className="text-right">
                <p className="font-bold text-[var(--color-acid)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                    ${(contract.amount / 100).toLocaleString()}
                </p>
                <span className="text-terminal text-[10px]" style={{ color: status.color }}>
                    {status.label}
                </span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-sovereign-muted)] hover:bg-white/10">
                        <MoreVertical className="h-4 w-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="glass-panel border-[var(--glass-sovereign-border)]"
                    style={{ background: 'var(--color-structure)' }}
                >
                    <DropdownMenuItem className="text-[var(--text-sovereign-primary)] focus:bg-[rgba(187,255,0,0.1)] focus:text-[var(--color-acid)]">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[var(--text-sovereign-primary)] focus:bg-[rgba(187,255,0,0.1)] focus:text-[var(--color-acid)]">
                        <Send className="h-4 w-4 mr-2" />
                        Resend
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
    );
}
