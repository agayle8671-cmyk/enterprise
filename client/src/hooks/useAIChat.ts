import { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}

interface UseAIChatOptions {
    agentType?: string;
    onError?: (error: Error) => void;
}

export function useAIChat(options: UseAIChatOptions = {}) {
    const { agentType = 'command_center', onError } = options;

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(() => uuidv4());
    const abortControllerRef = useRef<AbortController | null>(null);

    // Add a user message and get AI response
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: uuidv4(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // Create placeholder for assistant response
        const assistantMessageId = uuidv4();
        const assistantMessage: Message = {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            isStreaming: true,
        };

        setMessages(prev => [...prev, assistantMessage]);

        try {
            // Try streaming first
            abortControllerRef.current = new AbortController();

            const response = await fetch('/api/ai/chat/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    sessionId,
                    agentType,
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            // Handle SSE streaming
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const data = JSON.parse(line.slice(6));

                                if (data.type === 'chunk') {
                                    fullContent += data.content;
                                    setMessages(prev =>
                                        prev.map(msg =>
                                            msg.id === assistantMessageId
                                                ? { ...msg, content: fullContent }
                                                : msg
                                        )
                                    );
                                } else if (data.type === 'complete') {
                                    setMessages(prev =>
                                        prev.map(msg =>
                                            msg.id === assistantMessageId
                                                ? { ...msg, content: data.content, isStreaming: false }
                                                : msg
                                        )
                                    );
                                } else if (data.type === 'error') {
                                    throw new Error(data.content);
                                }
                            } catch (e) {
                                // Ignore JSON parse errors from partial chunks
                            }
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                // User cancelled
                setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
            } else {
                // On error, fall back to non-streaming
                try {
                    const response = await fetch('/api/ai/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            message: content,
                            sessionId,
                            agentType,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setMessages(prev =>
                            prev.map(msg =>
                                msg.id === assistantMessageId
                                    ? { ...msg, content: data.response, isStreaming: false }
                                    : msg
                            )
                        );
                    } else {
                        throw new Error('Failed to get AI response');
                    }
                } catch (fallbackError) {
                    onError?.(fallbackError as Error);
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === assistantMessageId
                                ? { ...msg, content: 'Sorry, I encountered an error. Please try again.', isStreaming: false }
                                : msg
                        )
                    );
                }
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    }, [isLoading, sessionId, agentType, onError]);

    // Cancel current stream
    const cancel = useCallback(() => {
        abortControllerRef.current?.abort();
        setIsLoading(false);
    }, []);

    // Clear conversation
    const clearHistory = useCallback(async () => {
        try {
            await fetch(`/api/ai/history/${sessionId}`, { method: 'DELETE' });
            setMessages([]);
        } catch (error) {
            console.error('Failed to clear history:', error);
        }
    }, [sessionId]);

    // Add initial greeting on mount
    useEffect(() => {
        if (messages.length === 0) {
            const greeting: Message = {
                id: uuidv4(),
                role: 'assistant',
                content: "Welcome to Sovereign OS! I'm your Command Center AI. I help you identify Time Assassins, deploy AI agents, and buy back your time. What would you like to tackle today?",
                timestamp: new Date(),
            };
            setMessages([greeting]);
        }
    }, []);

    return {
        messages,
        isLoading,
        sessionId,
        sendMessage,
        cancel,
        clearHistory,
    };
}
