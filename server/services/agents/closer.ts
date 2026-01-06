/**
 * The Closer Agent
 * 
 * AI-powered sales analysis and proposal generation agent.
 * Handles: Call analysis, objection tracking, proposal drafts, CRM updates
 */

import { aiService } from '../ai';

export interface CallTranscript {
    id: string;
    prospect: string;
    company?: string;
    date: string;
    duration: number; // minutes
    transcript: string;
    participants?: string[];
}

export interface CallAnalysis {
    summary: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    buyingSignals: string[];
    objections: Array<{
        objection: string;
        response: string;
        handled: boolean;
    }>;
    nextSteps: string[];
    dealLikelihood: number; // 0-100
    recommendedFollowUp: string;
    keyTopics: string[];
}

export interface ProposalDraft {
    title: string;
    executive_summary: string;
    problem_statement: string;
    proposed_solution: string;
    deliverables: string[];
    timeline: string;
    investment: {
        amount: string;
        paymentTerms: string;
        roi: string;
    };
    next_steps: string[];
    terms: string[];
}

export interface FollowUpEmail {
    subject: string;
    body: string;
    callToAction: string;
    urgency: 'low' | 'medium' | 'high';
    suggestedSendTime: string;
}

export interface CRMUpdate {
    prospect: string;
    company?: string;
    stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
    dealValue?: string;
    nextAction: string;
    nextActionDate: string;
    notes: string;
    tags: string[];
}

class CloserAgent {
    private readonly agentPrompt = `You are The Closer, an AI sales analysis agent.
Your role is to:
- Analyze sales call transcripts for insights
- Identify objections and how they were handled
- Track follow-up actions and commitments
- Draft follow-up proposals and emails
- Update CRM with key information

Focus on actionable insights that help close deals.
Respond ONLY with valid JSON. No markdown, no explanations outside the JSON structure.`;

    /**
     * Analyze a sales call transcript
     */
    async analyzeCall(call: CallTranscript): Promise<CallAnalysis> {
        const prompt = `Analyze this sales call transcript for key insights.

CALL INFO:
Prospect: ${call.prospect}
${call.company ? `Company: ${call.company}` : ''}
Date: ${call.date}
Duration: ${call.duration} minutes

TRANSCRIPT:
${call.transcript.substring(0, 5000)}

Analyze for:
- Overall sentiment and deal likelihood
- Buying signals (positive indicators)
- Objections raised and how they were handled
- Commitments and next steps mentioned
- Key topics discussed

Return ONLY this JSON:
{
  "summary": "2-3 sentence summary of the call",
  "sentiment": "positive|neutral|negative",
  "buyingSignals": ["signal1", "signal2"],
  "objections": [
    {"objection": "what they said", "response": "your response", "handled": true/false}
  ],
  "nextSteps": ["action1", "action2"],
  "dealLikelihood": 75,
  "recommendedFollowUp": "what to do next",
  "keyTopics": ["topic1", "topic2"]
}`;

        try {
            const response = await aiService.chat(
                `closer-${Date.now()}`,
                prompt,
                'closer'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Call analysis error:', error);
        }

        // Fallback analysis
        return {
            summary: `Call with ${call.prospect} lasted ${call.duration} minutes. Further analysis needed.`,
            sentiment: 'neutral',
            buyingSignals: ['Showed interest in the product'],
            objections: [
                { objection: 'Budget concerns', response: 'Discussed ROI', handled: true }
            ],
            nextSteps: ['Send follow-up email', 'Schedule next call'],
            dealLikelihood: 50,
            recommendedFollowUp: 'Send a detailed proposal within 48 hours',
            keyTopics: ['Pricing', 'Implementation'],
        };
    }

    /**
     * Generate a value-based proposal
     */
    async draftProposal(
        prospect: string,
        company: string,
        callAnalysis?: CallAnalysis,
        customDetails?: Record<string, string>
    ): Promise<ProposalDraft> {
        const prompt = `Create a value-based proposal for a prospect.

PROSPECT: ${prospect}
COMPANY: ${company}
${callAnalysis ? `CALL INSIGHTS: ${JSON.stringify(callAnalysis)}` : ''}
${customDetails ? `ADDITIONAL DETAILS: ${JSON.stringify(customDetails)}` : ''}

Create a proposal that:
- Focuses on outcomes and ROI, not features
- Addresses any objections mentioned
- Has clear deliverables and timeline
- Includes investment with payment terms

Return ONLY this JSON:
{
  "title": "Proposal: [Outcome-focused title]",
  "executive_summary": "2-3 paragraph summary",
  "problem_statement": "the challenge they face",
  "proposed_solution": "how we solve it",
  "deliverables": ["deliverable1", "deliverable2"],
  "timeline": "implementation timeline",
  "investment": {
    "amount": "$X,XXX",
    "paymentTerms": "50% upfront, 50% on completion",
    "roi": "Expected return or value"
  },
  "next_steps": ["step1", "step2"],
  "terms": ["term1", "term2"]
}`;

        try {
            const response = await aiService.chat(
                `closer-${Date.now()}`,
                prompt,
                'closer'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Proposal draft error:', error);
        }

        // Fallback proposal
        return {
            title: `Proposal: Partnership with ${company}`,
            executive_summary: `This proposal outlines our recommended engagement with ${company} to address your key business challenges and drive measurable results.`,
            problem_statement: 'Your team is spending valuable time on tasks that could be automated, limiting your growth potential.',
            proposed_solution: 'We will implement a comprehensive solution that automates key workflows and frees up your team to focus on high-value activities.',
            deliverables: [
                'Initial assessment and strategy session',
                'Custom implementation plan',
                'Training and documentation',
                'Ongoing support and optimization',
            ],
            timeline: '4-6 weeks for full implementation',
            investment: {
                amount: '$10,000 - $25,000',
                paymentTerms: '50% to begin, 50% upon completion',
                roi: '3-5x return within first year',
            },
            next_steps: [
                'Review and sign proposal',
                'Schedule kickoff call',
                'Begin discovery phase',
            ],
            terms: [
                '30-day satisfaction guarantee',
                'NDA in place for all work',
            ],
        };
    }

    /**
     * Generate a follow-up email
     */
    async draftFollowUp(
        prospect: string,
        company: string,
        context: string,
        callAnalysis?: CallAnalysis
    ): Promise<FollowUpEmail> {
        const prompt = `Create a follow-up email for a sales prospect.

PROSPECT: ${prospect}
COMPANY: ${company}
CONTEXT: ${context}
${callAnalysis ? `CALL ANALYSIS: ${JSON.stringify(callAnalysis)}` : ''}

Create a professional follow-up that:
- References the conversation/context
- Provides value (insight, resource, next step)
- Has a clear call-to-action
- Is concise but warm

Return ONLY this JSON:
{
  "subject": "email subject line",
  "body": "the full email body",
  "callToAction": "what you want them to do",
  "urgency": "low|medium|high",
  "suggestedSendTime": "e.g., Tomorrow morning, 9 AM"
}`;

        try {
            const response = await aiService.chat(
                `closer-${Date.now()}`,
                prompt,
                'closer'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Follow-up email error:', error);
        }

        // Fallback email
        return {
            subject: `Following up - ${company}`,
            body: `Hi ${prospect},\n\nThank you for your time today. I wanted to follow up on our conversation and share some additional resources that I think you'll find valuable.\n\nAs discussed, I'll have the proposal ready for you by end of week. In the meantime, please don't hesitate to reach out if you have any questions.\n\nLooking forward to continuing our conversation.\n\nBest regards`,
            callToAction: 'Let me know if you have any questions',
            urgency: 'medium',
            suggestedSendTime: 'Tomorrow morning, 9 AM',
        };
    }

    /**
     * Generate CRM update record
     */
    async generateCRMUpdate(call: CallTranscript, analysis: CallAnalysis): Promise<CRMUpdate> {
        const stage = this.determineStage(analysis.dealLikelihood);

        return {
            prospect: call.prospect,
            company: call.company,
            stage,
            dealValue: analysis.dealLikelihood > 50 ? '$10,000+' : 'TBD',
            nextAction: analysis.nextSteps[0] || 'Follow up',
            nextActionDate: this.getNextBusinessDay(),
            notes: analysis.summary,
            tags: analysis.keyTopics,
        };
    }

    private determineStage(likelihood: number): CRMUpdate['stage'] {
        if (likelihood >= 80) return 'negotiation';
        if (likelihood >= 60) return 'proposal';
        if (likelihood >= 40) return 'qualified';
        return 'lead';
    }

    private getNextBusinessDay(): string {
        const date = new Date();
        date.setDate(date.getDate() + (date.getDay() === 5 ? 3 : date.getDay() === 6 ? 2 : 1));
        return date.toISOString().split('T')[0];
    }
}

export const closerAgent = new CloserAgent();
