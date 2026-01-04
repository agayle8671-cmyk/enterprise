import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat, type Message } from '@/hooks/useAIChat';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/Typewriter';
import { PHYSICS } from '@/lib/animation-constants';
import {
    Send,
    X,
    Sparkles,
    Bot,
    User,
    Loader2,
    Trash2,
    Minimize2,
    Maximize2
} from 'lucide-react';

interface CommandCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CommandCenter({ isOpen, onClose }: CommandCenterProps) {
    const { messages, isLoading, sendMessage, cancel, clearHistory } = useAIChat();
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    height: isMinimized ? 'auto' : 500,
                }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={PHYSICS.interaction}
                className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-3rem)] z-50 overflow-hidden flex flex-col rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
                style={{ backgroundColor: 'var(--raycast-bg)' }}
                onKeyDown={handleKeyDown}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground text-sm">Command Center</h3>
                            <p className="text-xs text-muted-foreground">Sovereign OS AI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={clearHistory}
                            title="Clear conversation"
                            disablePhysics
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMinimized(!isMinimized)}
                            disablePhysics
                        >
                            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={onClose}
                            disablePhysics
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                {!isMinimized && (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message) => (
                                    <MessageBubble key={message.id} message={message} />
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-border/30">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1 bg-card/30 border border-white/10 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary/50 transition-all flex items-center h-[42px]">
                                    {!input && (
                                        <Typewriter
                                            phrases={[
                                                "Ask AI anything...",
                                                "Draft monthly report...",
                                                "Analyze Q3 metrics...",
                                                "Search decision history...",
                                                "Optimize my schedule..."
                                            ]}
                                            className="absolute top-1/2 -translate-y-1/2 left-4 text-muted-foreground pointer-events-none text-sm opacity-60"
                                            cursorColor="var(--raycast-cursor)"
                                        />
                                    )}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder-transparent p-0"
                                        disabled={isLoading}
                                    />
                                </div>
                                {isLoading ? (
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="h-10 w-10"
                                        onClick={cancel}
                                        disablePhysics
                                    >
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="h-10 w-10 bg-gradient-primary shadow-lg shadow-primary/30"
                                        disabled={!input.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                                Press <kbd className="px-1.5 py-0.5 bg-card rounded text-[10px]">Esc</kbd> to close
                            </p>
                        </form>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={PHYSICS.interaction}
            className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >
            <div className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center ${isUser
                ? 'bg-primary/20 text-primary'
                : 'bg-gradient-primary text-white shadow shadow-primary/20'
                }`}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
                <div className={`inline-block px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isUser
                    ? 'bg-primary text-primary-foreground rounded-tr-md'
                    : 'bg-card/80 text-foreground rounded-tl-md'
                    }`}>
                    <MessageContent content={message.content} isStreaming={message.isStreaming} />
                </div>
            </div>
        </motion.div>
    );
}

function MessageContent({ content, isStreaming }: { content: string; isStreaming?: boolean }) {
    // Simple markdown-like rendering
    const lines = content.split('\n');

    return (
        <div className="space-y-2">
            {lines.map((line, i) => {
                // Headers
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-semibold">{line.slice(2, -2)}</p>;
                }
                // Bold inline text
                if (line.includes('**')) {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                        <p key={i}>
                            {parts.map((part, j) =>
                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                            )}
                        </p>
                    );
                }
                // List items
                if (line.startsWith('- ') || line.match(/^\d+\.\s/)) {
                    return <p key={i} className="pl-2">{line}</p>;
                }
                // Regular text
                if (line.trim()) {
                    return <p key={i}>{line}</p>;
                }
                return <br key={i} />;
            })}
            {isStreaming && (
                <span className="inline-block w-2 h-4 bg-primary/50 animate-pulse ml-1" />
            )}
        </div>
    );
}

// Floating toggle button
export function CommandCenterTrigger({ onClick, className = '' }: { onClick: () => void; className?: string }) {
    return (
        <motion.button
            onClick={onClick}
            title="Open Command Center (AI Assistant)"
            aria-label="Open Command Center"
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 bg-gradient-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center text-white z-50 glow-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={PHYSICS.interaction}
        >
            <Sparkles className="h-6 w-6" />
        </motion.button>
    );
}
