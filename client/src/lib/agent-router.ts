/**
 * Agent Command Router
 * Parses natural language commands and routes to appropriate agents
 * Part of the Sovereign OS Command Center
 */

export type AgentType =
    | 'inbox-sentinel'
    | 'dossier'
    | 'content-alchemist'
    | 'closer'
    | 'offer-architect'
    | 'system';

export interface AgentCommand {
    agent: AgentType;
    action: string;
    parameters: Record<string, string>;
    originalCommand: string;
    confidence: number;
}

export interface AgentResponse {
    success: boolean;
    message: string;
    data?: any;
    pendingDecision?: boolean;
}

// Command patterns for agent routing
const COMMAND_PATTERNS: { pattern: RegExp; agent: AgentType; action: string }[] = [
    // Inbox Sentinel
    { pattern: /(?:check|scan|analyze)\s+(?:my\s+)?(?:inbox|emails?|mail)/i, agent: 'inbox-sentinel', action: 'scan' },
    { pattern: /draft\s+(?:a\s+)?(?:reply|response)\s+(?:to|for)/i, agent: 'inbox-sentinel', action: 'draft-reply' },
    { pattern: /(?:filter|clean|organize)\s+(?:my\s+)?(?:inbox|emails?)/i, agent: 'inbox-sentinel', action: 'filter' },

    // The Dossier
    { pattern: /(?:research|look up|find info|brief me)\s+(?:on|about)/i, agent: 'dossier', action: 'research' },
    { pattern: /(?:prepare|create)\s+(?:a\s+)?(?:dossier|briefing|profile)/i, agent: 'dossier', action: 'prepare-briefing' },
    { pattern: /(?:who is|tell me about|background on)/i, agent: 'dossier', action: 'profile' },

    // Content Alchemist
    { pattern: /(?:transcribe|convert|summarize)\s+(?:this\s+)?(?:video|recording|audio)/i, agent: 'content-alchemist', action: 'transcribe' },
    { pattern: /(?:repurpose|transform|turn)\s+(?:this\s+)?(?:into|to)\s+(?:linkedin|post|newsletter)/i, agent: 'content-alchemist', action: 'repurpose' },
    { pattern: /(?:create|generate|write)\s+(?:a\s+)?(?:linkedin|twitter|social)\s+post/i, agent: 'content-alchemist', action: 'create-post' },

    // The Closer
    { pattern: /(?:analyze|review)\s+(?:this\s+)?(?:call|transcript|meeting)/i, agent: 'closer', action: 'analyze-call' },
    { pattern: /(?:draft|create|write)\s+(?:a\s+)?(?:proposal|follow-up)/i, agent: 'closer', action: 'draft-proposal' },
    { pattern: /(?:update|sync)\s+(?:the\s+)?(?:crm|client record)/i, agent: 'closer', action: 'update-crm' },

    // Offer Architect
    { pattern: /(?:create|design|build)\s+(?:a\s+)?(?:new\s+)?(?:offer|package|service)/i, agent: 'offer-architect', action: 'create-offer' },
    { pattern: /(?:prepare|launch|set up)\s+(?:a\s+)?(?:founding\s+50|f50|beta|launch)\s+campaign/i, agent: 'offer-architect', action: 'founding-50' },
    { pattern: /(?:generate|create)\s+(?:a\s+)?methodology\s+(?:map|diagram)/i, agent: 'offer-architect', action: 'methodology-map' },

    // System commands
    { pattern: /(?:show|list|view)\s+(?:my\s+)?(?:pending\s+)?decisions/i, agent: 'system', action: 'list-decisions' },
    { pattern: /(?:approve|accept)\s+all\s+(?:pending\s+)?(?:decisions|recommendations)/i, agent: 'system', action: 'approve-all' },
    { pattern: /(?:show|view)\s+(?:my\s+)?(?:agent|team)\s+(?:status|activity)/i, agent: 'system', action: 'agent-status' },
    { pattern: /(?:time|hours)\s+(?:saved|reclaimed|audit)/i, agent: 'system', action: 'time-audit' },
];

/**
 * Parse a natural language command and route to the appropriate agent
 */
export function parseCommand(input: string): AgentCommand | null {
    const normalizedInput = input.trim().toLowerCase();

    for (const { pattern, agent, action } of COMMAND_PATTERNS) {
        if (pattern.test(normalizedInput)) {
            // Extract parameters from the command
            const parameters = extractParameters(input, action);

            return {
                agent,
                action,
                parameters,
                originalCommand: input,
                confidence: calculateConfidence(input, pattern),
            };
        }
    }

    // If no pattern matches, default to general AI chat
    return null;
}

/**
 * Extract relevant parameters from the command
 */
function extractParameters(input: string, action: string): Record<string, string> {
    const params: Record<string, string> = {};

    // Extract email/person references
    const emailMatch = input.match(/(?:to|from|about|for)\s+([A-Za-z\s]+?)(?:\s+about|\s+regarding|$)/i);
    if (emailMatch) {
        params.recipient = emailMatch[1].trim();
    }

    // Extract topic/subject
    const topicMatch = input.match(/(?:about|regarding|on|for)\s+(.+?)(?:\s+and|\s+or|$)/i);
    if (topicMatch) {
        params.topic = topicMatch[1].trim();
    }

    // Extract company name patterns
    const companyMatch = input.match(/(?:company|business|firm|agency)\s+(?:called|named)?\s*([A-Za-z\s&]+)/i);
    if (companyMatch) {
        params.company = companyMatch[1].trim();
    }

    return params;
}

/**
 * Calculate confidence score for the match
 */
function calculateConfidence(input: string, pattern: RegExp): number {
    const match = input.match(pattern);
    if (!match) return 0;

    // Base confidence from match length ratio
    const matchLength = match[0].length;
    const inputLength = input.length;
    const ratio = matchLength / inputLength;

    // Higher ratio = higher confidence
    return Math.min(0.95, 0.5 + (ratio * 0.5));
}

/**
 * Get agent display information
 */
export function getAgentInfo(agent: AgentType): { name: string; description: string; icon: string } {
    const agents = {
        'inbox-sentinel': {
            name: 'Inbox Sentinel',
            description: 'Manages email triage, drafts replies, detects time assassins',
            icon: 'Mail',
        },
        'dossier': {
            name: 'The Dossier',
            description: 'Researches prospects, prepares briefings for calls',
            icon: 'Search',
        },
        'content-alchemist': {
            name: 'Content Alchemist',
            description: 'Transcribes and repurposes content across platforms',
            icon: 'Sparkles',
        },
        'closer': {
            name: 'The Closer',
            description: 'Analyzes calls, updates CRM, drafts proposals',
            icon: 'Target',
        },
        'offer-architect': {
            name: 'Offer Architect',
            description: 'Designs high-ticket offers and Founding 50 campaigns',
            icon: 'Lightbulb',
        },
        'system': {
            name: 'Sovereign OS',
            description: 'System commands and agent orchestration',
            icon: 'Command',
        },
    };

    return agents[agent] || agents.system;
}

/**
 * Execute a routed command
 */
export async function executeCommand(command: AgentCommand): Promise<AgentResponse> {
    const { agent, action, parameters } = command;

    try {
        // Route to appropriate agent API
        const response = await fetch(`/api/agents/${agent}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, parameters, originalCommand: command.originalCommand }),
        });

        if (!response.ok) {
            throw new Error(`Agent ${agent} returned error: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            message: data.message || 'Command executed successfully',
            data: data.result,
            pendingDecision: data.pendingDecision,
        };
    } catch (error) {
        console.error(`Agent command error:`, error);
        return {
            success: false,
            message: `Failed to execute command with ${getAgentInfo(agent).name}`,
        };
    }
}

/**
 * Get suggested commands for autocomplete
 */
export function getSuggestions(partial: string): string[] {
    if (!partial || partial.length < 2) return [];

    const suggestions = [
        'Check my inbox for urgent emails',
        'Research [company name] before my call',
        'Draft a follow-up proposal for [client]',
        'Repurpose my latest video into a LinkedIn post',
        'Show pending decisions',
        'Prepare a Founding 50 campaign',
        'Analyze yesterday\'s sales call',
        'Time audit for this week',
        'Create a new high-ticket offer',
    ];

    return suggestions
        .filter(s => s.toLowerCase().includes(partial.toLowerCase()))
        .slice(0, 5);
}
