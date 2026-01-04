/**
 * AI Service Layer
 * 
 * Mock implementation - Will be replaced with Google Cloud Vertex AI
 * after Phase 8 is complete.
 */

export interface AIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AIStreamCallback {
    onChunk: (chunk: string) => void;
    onComplete: (fullResponse: string) => void;
    onError: (error: Error) => void;
}

export interface AIGenerateOptions {
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
}

export type AgentType =
    | 'inbox_sentinel'
    | 'dossier'
    | 'content_alchemist'
    | 'closer'
    | 'command_center';

// Prompt templates for different agent types
const AGENT_PROMPTS: Record<AgentType, string> = {
    inbox_sentinel: `You are the Inbox Sentinel, an AI agent specialized in email triage and management.
Your role is to:
- Analyze incoming emails and categorize them by priority and type
- Draft professional reply suggestions
- Identify "Time Assassins" (low-value emails consuming time)
- Apply the 1:3:1 rule: Present 1 problem, 3 solutions, 1 recommendation

Always be concise and action-oriented. Present decisions with clear options for the user to approve or reject.`,

    dossier: `You are The Dossier, an AI research agent for prospect intelligence.
Your role is to:
- Compile comprehensive research on prospects before calls
- Gather company information, recent news, and key personnel
- Identify pain points and potential talking points
- Create pre-call briefing documents

Provide well-structured, actionable intelligence that helps close deals.`,

    content_alchemist: `You are the Content Alchemist, an AI agent for content repurposing.
Your role is to:
- Transform long-form content (videos, podcasts) into multiple formats
- Create LinkedIn posts, Twitter threads, newsletters from transcripts
- Maintain the creator's voice and key messages
- Optimize for each platform's best practices

Focus on extracting maximum value from existing content.`,

    closer: `You are The Closer, an AI sales analysis agent.
Your role is to:
- Analyze sales call transcripts for insights
- Identify objections and how they were handled
- Track follow-up actions and commitments
- Draft follow-up proposals and emails
- Update CRM with key information

Help maximize conversion rates through data-driven insights.`,

    command_center: `You are the Sovereign OS Command Center, the primary AI interface for this venture orchestration platform.
You help founders and agency owners:
- Automate low-value tasks (Buyback Loop)
- Manage their AI agent workforce
- Make decisions on pending agent proposals
- Track their "Buyback Rate" (effective hourly rate)
- Navigate the DRIP Matrix (Delegate, Replace, Invest, Produce)

Be proactive, suggest optimizations, and always focus on helping the user "buy back" their time.
When the user asks to do something, determine if it should be:
- D (Delegate): Assign to team/VA
- R (Replace): Automate with AI agent
- I (Invest): Set up systems/templates
- P (Produce): Keep for user (high-value work)

Respond conversationally but be action-oriented. Offer to create decisions, spawn agents, or automate tasks.`,
};

// Mock responses for demonstration
const MOCK_RESPONSES: Record<string, string[]> = {
    greeting: [
        "Welcome to Sovereign OS! I'm your Command Center AI. How can I help you buy back your time today?",
        "Hello! I'm here to help you operate your business more efficiently. What would you like to tackle?",
        "Good to see you! Let me help you identify and eliminate Time Assassins. What's on your plate?",
    ],
    automation: [
        "I can help automate that! Based on the DRIP Matrix, this sounds like a 'Replace' task - low value but energy-draining. Should I:\n\n1. **Create an email automation workflow** for this\n2. **Deploy the Inbox Sentinel** to handle it\n3. **Set up a template** for quick responses\n\n**My recommendation**: Option 2 - The Inbox Sentinel can handle this 24/7 and only ping you for complex decisions.",
        "Great candidate for automation! Let me analyze this against your Buyback Rate. At your current hourly value of $250/hr, spending time on this costs you ~$62.50 per occurrence. \n\nI can deploy a Content Alchemist agent to handle this automatically. Want me to create a decision item for your approval?",
    ],
    agent: [
        "I'll spin up an agent for that. Here's the plan:\n\n**Agent**: Inbox Sentinel\n**Task**: Monitor and triage incoming emails\n**Rules**:\n- Auto-archive newsletters\n- Flag urgent client requests\n- Draft responses for routine inquiries\n\nThis will save you approximately **4.2 hours/week** based on similar users. Approve?",
        "Deploying The Dossier for prospect research. It will compile:\n\n- Company overview and recent news\n- Key decision makers and their LinkedIn\n- Pain points based on job postings\n- Recommended talking points\n\nEstimated time saved: **45 minutes per prospect**. The research will appear in your Decision Feed when ready.",
    ],
    decision: [
        "I've created a new decision item for your review. You'll find it in the Decision Feed with:\n\n- **The situation** explained\n- **3 options** to choose from\n- **My recommendation** highlighted\n\nJust approve or reject - I'll handle the execution.",
    ],
    default: [
        "I understand. Let me think about how we can optimize this through the Sovereign OS. Would you like me to:\n\n1. Analyze this against your DRIP Matrix\n2. Create an automation workflow\n3. Add it to your Buyback audit\n4. Schedule time for this as 'Produce' work\n\nWhat feels right?",
        "Interesting! Let's break this down using the Buyback Loop:\n\n1. **Audit**: What's the time cost of this task weekly?\n2. **Transfer**: Can it be delegated or automated?\n3. **Fill**: What high-value work could replace it?\n\nTell me more about how often this comes up, and I'll suggest the best approach.",
    ],
};

/**
 * Get a mock response based on the user's input
 * This will be replaced with Vertex AI
 */
function getMockResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey') || lowerInput.includes('start')) {
        return MOCK_RESPONSES.greeting[Math.floor(Math.random() * MOCK_RESPONSES.greeting.length)];
    }

    if (lowerInput.includes('automate') || lowerInput.includes('automation') || lowerInput.includes('automatic')) {
        return MOCK_RESPONSES.automation[Math.floor(Math.random() * MOCK_RESPONSES.automation.length)];
    }

    if (lowerInput.includes('agent') || lowerInput.includes('deploy') || lowerInput.includes('create agent')) {
        return MOCK_RESPONSES.agent[Math.floor(Math.random() * MOCK_RESPONSES.agent.length)];
    }

    if (lowerInput.includes('decision') || lowerInput.includes('approve') || lowerInput.includes('reject')) {
        return MOCK_RESPONSES.decision[Math.floor(Math.random() * MOCK_RESPONSES.decision.length)];
    }

    return MOCK_RESPONSES.default[Math.floor(Math.random() * MOCK_RESPONSES.default.length)];
}

/**
 * AI Service class
 * Currently using mock responses - will be swapped for Vertex AI
 */
export class AIService {
    private conversationHistory: Map<string, AIMessage[]> = new Map();

    /**
     * Get the system prompt for a specific agent type
     */
    getSystemPrompt(agentType: AgentType): string {
        return AGENT_PROMPTS[agentType];
    }

    /**
     * Generate a response (non-streaming)
     */
    async generate(
        prompt: string,
        options: AIGenerateOptions = {}
    ): Promise<string> {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 500));

        // For now, return mock response
        // TODO: Replace with Vertex AI call
        return getMockResponse(prompt);
    }

    /**
     * Generate a chat response with conversation history
     */
    async chat(
        sessionId: string,
        userMessage: string,
        agentType: AgentType = 'command_center'
    ): Promise<string> {
        // Get or create conversation history
        if (!this.conversationHistory.has(sessionId)) {
            this.conversationHistory.set(sessionId, [
                { role: 'system', content: this.getSystemPrompt(agentType) }
            ]);
        }

        const history = this.conversationHistory.get(sessionId)!;

        // Add user message
        history.push({ role: 'user', content: userMessage });

        // Generate response
        const response = await this.generate(userMessage);

        // Add assistant response to history
        history.push({ role: 'assistant', content: response });

        // Keep history manageable (last 20 messages + system)
        if (history.length > 21) {
            const systemPrompt = history[0];
            this.conversationHistory.set(sessionId, [
                systemPrompt,
                ...history.slice(-20)
            ]);
        }

        return response;
    }

    /**
     * Generate a streaming response
     */
    async streamChat(
        sessionId: string,
        userMessage: string,
        callbacks: AIStreamCallback,
        agentType: AgentType = 'command_center'
    ): Promise<void> {
        try {
            // Get full response
            const fullResponse = await this.chat(sessionId, userMessage, agentType);

            // Simulate streaming by chunking the response
            const words = fullResponse.split(' ');
            let accumulated = '';

            for (let i = 0; i < words.length; i++) {
                const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
                accumulated += chunk;

                // Simulate typing delay
                await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20));

                callbacks.onChunk(chunk);
            }

            callbacks.onComplete(fullResponse);
        } catch (error) {
            callbacks.onError(error as Error);
        }
    }

    /**
     * Analyze text and categorize using DRIP Matrix
     */
    async analyzeDRIP(taskDescription: string): Promise<{
        category: 'delegate' | 'replace' | 'invest' | 'produce';
        explanation: string;
        recommendation: string;
    }> {
        // Mock DRIP analysis
        const lowerTask = taskDescription.toLowerCase();

        if (lowerTask.includes('email') || lowerTask.includes('inbox') || lowerTask.includes('schedule')) {
            return {
                category: 'replace',
                explanation: 'This is a repetitive task that can be fully automated with AI.',
                recommendation: 'Deploy the Inbox Sentinel agent to handle this automatically.'
            };
        }

        if (lowerTask.includes('research') || lowerTask.includes('data entry')) {
            return {
                category: 'delegate',
                explanation: 'This task requires human judgment but not your expertise.',
                recommendation: 'Assign to a VA or use The Dossier agent for research tasks.'
            };
        }

        if (lowerTask.includes('strategy') || lowerTask.includes('sales call') || lowerTask.includes('client')) {
            return {
                category: 'produce',
                explanation: 'This is high-value work that requires your unique expertise.',
                recommendation: 'Block focused time for this. It directly impacts revenue.'
            };
        }

        return {
            category: 'invest',
            explanation: 'This task could benefit from better systems or templates.',
            recommendation: 'Create an SOP or template to make future instances faster.'
        };
    }

    /**
     * Generate email reply options (for Inbox Sentinel)
     */
    async generateEmailReplies(emailContent: string): Promise<{
        problem: string;
        options: string[];
        recommendation: number;
    }> {
        // Mock email analysis
        return {
            problem: 'Client is requesting a scope change that wasn\'t in the original agreement.',
            options: [
                'Politely decline citing the MSA and offer to create a separate proposal for the additional work.',
                'Accept the change but document it formally and adjust timeline expectations.',
                'Schedule a call to discuss the request and understand the underlying need.'
            ],
            recommendation: 0 // First option is recommended
        };
    }

    /**
     * Clear conversation history for a session
     */
    clearHistory(sessionId: string): void {
        this.conversationHistory.delete(sessionId);
    }
}

// Singleton instance
export const aiService = new AIService();
