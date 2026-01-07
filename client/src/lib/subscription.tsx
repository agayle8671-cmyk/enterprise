import { createContext, useContext, useState, ReactNode } from 'react';

export type PlanTier = 'free' | 'pro' | 'enterprise';

interface SubscriptionContextType {
    tier: PlanTier;
    setTier: (tier: PlanTier) => void;
    isPro: boolean;
    isEnterprise: boolean;
    canUse: (feature: FeatureKey) => boolean;
    getLimit: (feature: FeatureKey) => number | 'unlimited';
    canAccessAgent: (agentName: string) => boolean;
}

// Feature keys that can be gated
export type FeatureKey =
    | 'agents'
    | 'ai_chat'
    | 'tools'
    | 'proposals'
    | 'custom_domains'
    | 'white_label'
    | 'email_integration'
    | 'team_members'
    | 'api_access'
    | 'custom_agents';

// Feature limits by tier
const FEATURE_LIMITS: Record<PlanTier, Partial<Record<FeatureKey, number | 'unlimited'>>> = {
    free: {
        agents: 1,
        ai_chat: 20, // messages per day
        tools: 1,
        proposals: 3,
        custom_domains: 0,
        white_label: 0,
        email_integration: 0,
        team_members: 0,
        api_access: 0,
        custom_agents: 0,
    },
    pro: {
        agents: 'unlimited',
        ai_chat: 'unlimited',
        tools: 'unlimited',
        proposals: 'unlimited',
        custom_domains: 'unlimited',
        white_label: 'unlimited',
        email_integration: 'unlimited',
        team_members: 0,
        api_access: 0,
        custom_agents: 0,
    },
    enterprise: {
        agents: 'unlimited',
        ai_chat: 'unlimited',
        tools: 'unlimited',
        proposals: 'unlimited',
        custom_domains: 'unlimited',
        white_label: 'unlimited',
        email_integration: 'unlimited',
        team_members: 5,
        api_access: 'unlimited',
        custom_agents: 'unlimited',
    },
};

// Which agents are available per tier
export const AGENT_TIERS: Record<string, PlanTier> = {
    'Inbox Sentinel': 'free',
    'The Dossier': 'pro',
    'Content Alchemist': 'pro',
    'The Closer': 'pro',
    'Invoice Chaser': 'pro',
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    // In production, this would come from API/auth
    const [tier, setTier] = useState<PlanTier>('free');

    const isPro = tier === 'pro' || tier === 'enterprise';
    const isEnterprise = tier === 'enterprise';

    const canUse = (feature: FeatureKey): boolean => {
        const limit = FEATURE_LIMITS[tier][feature];
        if (limit === 'unlimited') return true;
        if (limit === undefined) return false;
        return limit > 0;
    };

    const getLimit = (feature: FeatureKey): number | 'unlimited' => {
        return FEATURE_LIMITS[tier][feature] ?? 0;
    };

    const canAccessAgent = (agentName: string): boolean => {
        const tierRequired = AGENT_TIERS[agentName] || 'pro';
        if (tierRequired === 'free') return true;
        if (tierRequired === 'pro') return isPro;
        if (tierRequired === 'enterprise') return isEnterprise;
        return false;
    };

    return (
        <SubscriptionContext.Provider value={{ tier, setTier, isPro, isEnterprise, canUse, getLimit, canAccessAgent }}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within SubscriptionProvider');
    }
    return context;
}
