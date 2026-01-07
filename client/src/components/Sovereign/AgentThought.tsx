/**
 * AgentThought - ReAct Loop Visualization Component
 * 
 * Visualizes the AI Agent's reasoning process using the ReAct pattern:
 * - Thought (Orange Pulse): Agent is parsing the request
 * - Reasoning (Orange Text): Internal monologue visible to user
 * - Action (Ghost UI): Preview of what will happen
 * - Observation (Solid UI): Confirmed result
 * 
 * Uses International Orange (#FF4F00) to denote Agent activity.
 */

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type AgentStage = 'perception' | 'reasoning' | 'action' | 'observation';

interface AgentThoughtProps {
  thought: string;
  stage: AgentStage;
  className?: string;
  position?: { x: number; y: number };
}

export function AgentThought({
  thought,
  stage,
  className,
  position
}: AgentThoughtProps) {

  const stageLabels: Record<AgentStage, string> = {
    perception: 'perceiving',
    reasoning: 'reasoning',
    action: 'acting',
    observation: 'observing'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "relative flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md",
          "bg-[var(--color-sos-base)]/90",
          "border-[var(--color-sos-soul)]/20",
          className
        )}
        style={{
          boxShadow: 'var(--shadow-tactile-md)',
          ...(position ? { position: 'absolute', left: position.x, top: position.y } : {})
        }}
      >
        {/* Pulsing "Soul" Indicator */}
        <div className="relative w-3 h-3 flex-shrink-0">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--color-sos-soul)' }}
          />
        </div>

        {/* Thought Text */}
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{ color: 'var(--color-sos-soul)' }}
          >
            {stageLabels[stage]}
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-sos-text)' }}
          >
            {thought}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * AgentThoughtStream - Container for multiple thoughts
 * Displays a vertical stream of Agent reasoning
 */
interface AgentThoughtStreamProps {
  thoughts: Array<{
    id: string;
    thought: string;
    stage: AgentStage;
    timestamp: number;
  }>;
  className?: string;
}

export function AgentThoughtStream({ thoughts, className }: AgentThoughtStreamProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <AnimatePresence>
        {thoughts.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <AgentThought
              thought={item.thought}
              stage={item.stage}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * GhostAction - Preview of Agent action before execution
 * Shows semi-transparent preview of what will happen
 */
interface GhostActionProps {
  children: React.ReactNode;
  onConfirm?: () => void;
  onReject?: () => void;
  className?: string;
}

export function GhostAction({
  children,
  onConfirm,
  onReject,
  className
}: GhostActionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      className={cn("relative", className)}
    >
      {/* Ghost content with reduced opacity */}
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>

      {/* Confirmation overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {onConfirm && (
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background: 'var(--color-sos-green)',
              color: 'white',
              boxShadow: 'var(--shadow-tactile-sm)'
            }}
          >
            Confirm
          </button>
        )}
        {onReject && (
          <button
            onClick={onReject}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background: 'var(--color-sos-red)',
              color: 'white',
              boxShadow: 'var(--shadow-tactile-sm)'
            }}
          >
            Reject
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
