/**
 * GhostAction - AI Action Preview Component
 * 
 * Shows semi-transparent preview of AI actions before execution.
 * Allows user to confirm or reject, building trust through transparency.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';
import { haptic } from '@/lib/haptics';
import { playSound } from '@/lib/sounds';

interface GhostActionProps {
    /** Description of what the AI is about to do */
    action: string;
    /** Type of action for visual styling */
    type: 'move' | 'delete' | 'create' | 'send' | 'update';
    /** Called when user confirms the action */
    onConfirm: () => void;
    /** Called when user rejects the action */
    onReject: () => void;
    /** Whether the action is visible */
    visible: boolean;
    /** Optional children to show as ghost preview */
    children?: React.ReactNode;
}

const ACTION_COLORS = {
    move: 'var(--color-aurora-blue)',
    delete: 'var(--color-alarm)',
    create: 'var(--color-acid)',
    send: 'var(--color-aurora-purple)',
    update: 'var(--color-sos-soul)',
};

export function GhostAction({
    action,
    type,
    onConfirm,
    onReject,
    visible,
    children
}: GhostActionProps) {
    const handleConfirm = () => {
        haptic('success');
        playSound('success');
        onConfirm();
    };

    const handleReject = () => {
        haptic('error');
        playSound('error');
        onReject();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative"
                >
                    {/* Ghost Preview Layer */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            opacity: 0.5,
                            border: `2px dashed ${ACTION_COLORS[type]}`,
                            borderRadius: '12px',
                            background: `${ACTION_COLORS[type]}10`,
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        {children}
                    </motion.div>

                    {/* Action Confirmation Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-16 left-0 right-0 flex items-center justify-between gap-3 p-3 rounded-xl"
                        style={{
                            background: 'var(--glass-surface)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <AlertCircle
                                className="w-4 h-4"
                                style={{ color: ACTION_COLORS[type] }}
                            />
                            <span className="text-xs font-mono text-[var(--text-sovereign-secondary)]">
                                {action}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReject}
                                className="p-2 rounded-lg bg-[var(--color-alarm)]/20 text-[var(--color-alarm)]"
                            >
                                <X className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleConfirm}
                                className="p-2 rounded-lg bg-[var(--color-acid)]/20 text-[var(--color-acid)]"
                            >
                                <Check className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * useGhostAction - Hook for managing ghost action state
 */
export function useGhostAction() {
    const [isVisible, setIsVisible] = useState(false);
    const [pendingAction, setPendingAction] = useState<{
        action: string;
        type: GhostActionProps['type'];
        execute: () => void;
    } | null>(null);

    const propose = (
        action: string,
        type: GhostActionProps['type'],
        execute: () => void
    ) => {
        haptic('ghost');
        setPendingAction({ action, type, execute });
        setIsVisible(true);
    };

    const confirm = () => {
        if (pendingAction) {
            pendingAction.execute();
        }
        setIsVisible(false);
        setPendingAction(null);
    };

    const reject = () => {
        setIsVisible(false);
        setPendingAction(null);
    };

    return {
        isVisible,
        pendingAction,
        propose,
        confirm,
        reject,
    };
}

import { useState } from 'react';
