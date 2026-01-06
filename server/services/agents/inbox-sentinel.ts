/**
 * Inbox Sentinel Agent
 * 
 * AI-powered email triage and management agent.
 * Handles: Email analysis, draft replies, spam filtering, Time Assassin detection
 */

import { aiService } from '../ai';

export interface Email {
    id: string;
    from: string;
    subject: string;
    body: string;
    receivedAt: string;
    isRead?: boolean;
}

export interface EmailAnalysis {
    priority: 'urgent' | 'high' | 'medium' | 'low';
    category: 'client' | 'prospect' | 'team' | 'promotional' | 'personal' | 'spam';
    isTimeAssassin: boolean;
    suggestedAction: string;
    estimatedTimeToHandle: number; // minutes
    dripQuadrant: 'delegate' | 'replace' | 'invest' | 'produce';
}

export interface DraftReply {
    style: 'professional' | 'casual' | 'brief';
    subject?: string;
    body: string;
    confidence: number;
}

class InboxSentinelAgent {
    private readonly agentPrompt = `You are the Inbox Sentinel, an AI agent specialized in email triage and management.
Your role is to:
- Analyze incoming emails and categorize them by priority and type
- Draft professional reply suggestions
- Identify "Time Assassins" (low-value emails consuming time)
- Apply the 1:3:1 rule: Present 1 problem, 3 solutions, 1 recommendation

Respond ONLY with valid JSON. No markdown, no explanations outside the JSON structure.`;

    /**
     * Analyze an email for priority, category, and recommended action
     */
    async analyzeEmail(email: Email): Promise<EmailAnalysis> {
        const prompt = `Analyze this email and respond with a JSON object:

FROM: ${email.from}
SUBJECT: ${email.subject}
BODY:
${email.body}

Respond with ONLY this JSON structure:
{
  "priority": "urgent|high|medium|low",
  "category": "client|prospect|team|promotional|personal|spam",
  "isTimeAssassin": true/false,
  "suggestedAction": "brief action description",
  "estimatedTimeToHandle": number (in minutes),
  "dripQuadrant": "delegate|replace|invest|produce"
}`;

        try {
            const response = await aiService.chat(
                `inbox-sentinel-${Date.now()}`,
                prompt,
                'inbox_sentinel'
            );

            // Parse JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Email analysis error:', error);
        }

        // Fallback analysis
        return this.fallbackAnalysis(email);
    }

    /**
     * Generate draft reply options for an email using 1:3:1 rule
     */
    async generateReplies(email: Email): Promise<DraftReply[]> {
        const prompt = `Generate 3 reply options for this email using the 1:3:1 rule.
Return a JSON array with exactly 3 objects.

EMAIL:
FROM: ${email.from}
SUBJECT: ${email.subject}
BODY:
${email.body}

Respond with ONLY this JSON structure:
[
  {"style": "professional", "body": "reply text", "confidence": 0.9},
  {"style": "brief", "body": "reply text", "confidence": 0.8},
  {"style": "casual", "body": "reply text", "confidence": 0.7}
]`;

        try {
            const response = await aiService.chat(
                `inbox-sentinel-${Date.now()}`,
                prompt,
                'inbox_sentinel'
            );

            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Reply generation error:', error);
        }

        // Fallback replies
        return [
            { style: 'professional', body: `Thank you for your email. I will review this and get back to you shortly.`, confidence: 0.8 },
            { style: 'brief', body: `Thanks for reaching out. I'll follow up soon.`, confidence: 0.7 },
            { style: 'casual', body: `Got it, thanks! I'll take a look and circle back.`, confidence: 0.6 },
        ];
    }

    /**
     * Batch analyze multiple emails and sort by priority
     */
    async triageInbox(emails: Email[]): Promise<Array<Email & { analysis: EmailAnalysis }>> {
        const results = await Promise.all(
            emails.map(async (email) => ({
                ...email,
                analysis: await this.analyzeEmail(email),
            }))
        );

        // Sort by priority: urgent first, then high, medium, low
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return results.sort((a, b) =>
            priorityOrder[a.analysis.priority] - priorityOrder[b.analysis.priority]
        );
    }

    /**
     * Detect Time Assassins in a batch of emails
     */
    async detectTimeAssassins(emails: Email[]): Promise<Email[]> {
        const analyzed = await this.triageInbox(emails);
        return analyzed
            .filter(e => e.analysis.isTimeAssassin)
            .map(({ analysis, ...email }) => email);
    }

    /**
     * Fallback analysis when AI is unavailable
     */
    private fallbackAnalysis(email: Email): EmailAnalysis {
        const subject = email.subject.toLowerCase();
        const from = email.from.toLowerCase();

        // Simple heuristics
        const isUrgent = subject.includes('urgent') || subject.includes('asap');
        const isPromo = from.includes('newsletter') || from.includes('noreply') || subject.includes('unsubscribe');
        const isClient = from.includes('client') || subject.includes('project') || subject.includes('invoice');

        return {
            priority: isUrgent ? 'urgent' : isClient ? 'high' : isPromo ? 'low' : 'medium',
            category: isPromo ? 'promotional' : isClient ? 'client' : 'personal',
            isTimeAssassin: isPromo,
            suggestedAction: isPromo ? 'Archive or unsubscribe' : 'Review and respond',
            estimatedTimeToHandle: isPromo ? 1 : 5,
            dripQuadrant: isPromo ? 'replace' : isClient ? 'produce' : 'delegate',
        };
    }
}

export const inboxSentinel = new InboxSentinelAgent();
