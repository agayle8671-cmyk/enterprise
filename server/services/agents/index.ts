/**
 * Sovereign OS Agent Registry
 * 
 * Central export point for all AI agents in the system.
 */

export { inboxSentinel, type Email, type EmailAnalysis, type DraftReply } from './inbox-sentinel';
export { dossierAgent, type ProspectInfo, type CompanyProfile, type ProspectProfile, type PreCallBriefing } from './dossier';
export { contentAlchemist, type ContentInput, type LinkedInPost, type TwitterThread, type NewsletterSection, type ContentBundle } from './content-alchemist';
export { closerAgent, type CallTranscript, type CallAnalysis, type ProposalDraft, type FollowUpEmail, type CRMUpdate } from './closer';

/**
 * Agent metadata for UI display
 */
export const AGENT_REGISTRY = {
    'inbox-sentinel': {
        name: 'Inbox Sentinel',
        role: 'Admin',
        description: 'Email triage, draft replies, spam filtering, Time Assassin detection',
        icon: 'Mail',
        color: '#FF6363',
        capabilities: ['analyze-email', 'draft-reply', 'triage-inbox', 'detect-time-assassins'],
    },
    'dossier': {
        name: 'The Dossier',
        role: 'Delivery',
        description: 'Prospect research, company profiling, pre-call briefings',
        icon: 'Search',
        color: '#8B5CF6',
        capabilities: ['research-company', 'profile-prospect', 'generate-briefing'],
    },
    'content-alchemist': {
        name: 'Content Alchemist',
        role: 'Marketing',
        description: 'Content repurposing, social media posts, newsletter sections',
        icon: 'Sparkles',
        color: '#10B981',
        capabilities: ['create-linkedin', 'create-twitter', 'create-newsletter', 'create-bundle'],
    },
    'closer': {
        name: 'The Closer',
        role: 'Sales',
        description: 'Call analysis, proposal drafts, follow-up emails, CRM updates',
        icon: 'Target',
        color: '#F59E0B',
        capabilities: ['analyze-call', 'draft-proposal', 'draft-followup', 'update-crm'],
    },
} as const;

export type AgentId = keyof typeof AGENT_REGISTRY;
