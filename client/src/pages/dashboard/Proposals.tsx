import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
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
    MoreVertical
} from 'lucide-react';
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
    pending: { label: 'Sent', icon: Clock, color: 'text-warning', bg: 'bg-warning/20' },
    signed: { label: 'Signed', icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/20' },
    paid: { label: 'Paid', icon: DollarSign, color: 'text-success', bg: 'bg-success/20' },
    rejected: { label: 'Declined', icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/20' },
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

    const totalValue = contracts.reduce((s, c) => s + c.amount, 0);
    const paidValue = contracts.filter(c => c.status === 'paid').reduce((s, c) => s + c.amount, 0);
    const pendingValue = contracts.filter(c => c.status === 'pending' || c.status === 'signed').reduce((s, c) => s + c.amount, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-headline text-foreground">Proposals & Contracts</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your high-ticket proposals with embedded payments
                    </p>
                </div>
                <Button
                    onClick={() => setShowCreate(true)}
                    className="bg-gradient-primary shadow-lg shadow-primary/30"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Proposal
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard
                    label="Total Pipeline"
                    value={`$${(totalValue / 100).toLocaleString()}`}
                    color="text-foreground"
                />
                <StatCard
                    label="Pending Payments"
                    value={`$${(pendingValue / 100).toLocaleString()}`}
                    color="text-warning"
                />
                <StatCard
                    label="Collected"
                    value={`$${(paidValue / 100).toLocaleString()}`}
                    color="text-success"
                />
            </div>

            {/* Contract List */}
            <div className="glass-card divide-y divide-border/30">
                {contracts.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-foreground mb-2">No proposals yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">Create your first proposal to get started</p>
                        <Button onClick={() => setShowCreate(true)} className="bg-gradient-primary">
                            <Wand2 className="h-4 w-4 mr-2" />
                            Create Proposal
                        </Button>
                    </div>
                ) : (
                    contracts.map((contract) => (
                        <ContractRow key={contract.id} contract={contract} />
                    ))
                )}
            </div>

            {/* Create Modal */}
            {showCreate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowCreate(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={PHYSICS.interaction}
                        className="liquid-glass-heavy w-full max-w-md p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-title text-foreground mb-6">Create New Proposal</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Client Name</label>
                                <input
                                    type="text"
                                    value={newProposal.clientName}
                                    onChange={(e) => setNewProposal({ ...newProposal, clientName: e.target.value })}
                                    placeholder="e.g., Acme Corp"
                                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Amount ($)</label>
                                <input
                                    type="number"
                                    value={newProposal.amount}
                                    onChange={(e) => setNewProposal({ ...newProposal, amount: e.target.value })}
                                    placeholder="e.g., 5000"
                                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="ghost" onClick={() => setShowCreate(false)} disablePhysics>Cancel</Button>
                            <Button
                                className="bg-gradient-primary"
                                disabled={!newProposal.clientName || !newProposal.amount || createMutation.isPending}
                                onClick={() => createMutation.mutate({
                                    clientName: newProposal.clientName,
                                    amount: parseInt(newProposal.amount) * 100,
                                })}
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Send Proposal
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

function ContractRow({ contract }: { contract: Contract }) {
    const status = statusConfig[contract.status as keyof typeof statusConfig] || statusConfig.pending;

    return (
        <motion.div
            className="p-4 flex items-center gap-4 hover:bg-card/30 transition-colors"
            whileHover={{ x: 4 }}
            transition={PHYSICS.interaction}
        >
            <div className={`h-10 w-10 rounded-xl ${status.bg} flex items-center justify-center`}>
                <status.icon className={`h-5 w-5 ${status.color}`} />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{contract.clientName}</h4>
                <p className="text-xs text-muted-foreground">
                    Sent {new Date(contract.sentAt).toLocaleDateString()}
                </p>
            </div>

            <div className="text-right">
                <p className="font-bold text-foreground">${(contract.amount / 100).toLocaleString()}</p>
                <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disablePhysics>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="liquid-glass-subtle">
                    <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" />
                        Resend
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
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
