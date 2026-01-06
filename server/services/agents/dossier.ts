/**
 * The Dossier Agent
 * 
 * AI-powered prospect research and intelligence agent.
 * Handles: Company research, pre-call briefings, prospect profiling
 */

import { aiService } from '../ai';

export interface ProspectInfo {
    name: string;
    company?: string;
    title?: string;
    linkedIn?: string;
    website?: string;
    notes?: string;
}

export interface CompanyProfile {
    name: string;
    industry: string;
    size: string;
    founded?: string;
    headquarters?: string;
    description: string;
    keyProducts: string[];
    recentNews: string[];
    painPoints: string[];
    opportunities: string[];
}

export interface ProspectProfile {
    name: string;
    title: string;
    company: string;
    background: string;
    decisionMakingRole: 'decision_maker' | 'influencer' | 'champion' | 'gatekeeper';
    communicationStyle: string;
    professionalInterests: string[];
    potentialPainPoints: string[];
}

export interface PreCallBriefing {
    prospect: ProspectProfile;
    company: CompanyProfile;
    talkingPoints: string[];
    questionsToAsk: string[];
    objectionHandlers: Array<{ objection: string; response: string }>;
    closingStrategies: string[];
    estimatedDealSize: string;
    nextSteps: string[];
}

class DossierAgent {
    private readonly agentPrompt = `You are The Dossier, an AI research agent for prospect intelligence.
Your role is to:
- Compile comprehensive research on prospects before calls
- Gather company information, recent news, and key personnel
- Identify pain points and potential talking points
- Create pre-call briefing documents

Respond ONLY with valid JSON. No markdown, no explanations outside the JSON structure.`;

    /**
     * Research a company and generate a profile
     */
    async researchCompany(companyName: string, website?: string): Promise<CompanyProfile> {
        const prompt = `Research and create a company profile for: ${companyName}
${website ? `Website: ${website}` : ''}

Generate realistic business intelligence. Return ONLY this JSON:
{
  "name": "${companyName}",
  "industry": "industry type",
  "size": "startup/smb/mid-market/enterprise",
  "founded": "year or Unknown",
  "headquarters": "city, country",
  "description": "2-3 sentence company description",
  "keyProducts": ["product1", "product2"],
  "recentNews": ["recent development 1", "recent development 2"],
  "painPoints": ["common pain point 1", "pain point 2"],
  "opportunities": ["sales opportunity 1", "opportunity 2"]
}`;

        try {
            const response = await aiService.chat(
                `dossier-${Date.now()}`,
                prompt,
                'dossier'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Company research error:', error);
        }

        // Fallback profile
        return {
            name: companyName,
            industry: 'Technology',
            size: 'mid-market',
            description: `${companyName} is a company in the technology sector.`,
            keyProducts: ['Core Platform'],
            recentNews: ['Company continues to grow'],
            painPoints: ['Scaling challenges', 'Efficiency optimization'],
            opportunities: ['Automation potential', 'Process improvement'],
        };
    }

    /**
     * Create a prospect profile
     */
    async profileProspect(prospect: ProspectInfo): Promise<ProspectProfile> {
        const prompt = `Create a prospect profile for:
Name: ${prospect.name}
${prospect.company ? `Company: ${prospect.company}` : ''}
${prospect.title ? `Title: ${prospect.title}` : ''}
${prospect.notes ? `Notes: ${prospect.notes}` : ''}

Return ONLY this JSON:
{
  "name": "${prospect.name}",
  "title": "their title or inferred role",
  "company": "${prospect.company || 'Unknown'}",
  "background": "brief professional background",
  "decisionMakingRole": "decision_maker|influencer|champion|gatekeeper",
  "communicationStyle": "direct/analytical/collaborative/consultative",
  "professionalInterests": ["interest1", "interest2"],
  "potentialPainPoints": ["pain1", "pain2"]
}`;

        try {
            const response = await aiService.chat(
                `dossier-${Date.now()}`,
                prompt,
                'dossier'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Prospect profile error:', error);
        }

        // Fallback profile
        return {
            name: prospect.name,
            title: prospect.title || 'Executive',
            company: prospect.company || 'Unknown',
            background: 'Experienced professional in their field.',
            decisionMakingRole: 'influencer',
            communicationStyle: 'Direct and results-oriented',
            professionalInterests: ['Business growth', 'Efficiency'],
            potentialPainPoints: ['Time management', 'Scaling operations'],
        };
    }

    /**
     * Generate a comprehensive pre-call briefing
     */
    async generateBriefing(prospect: ProspectInfo): Promise<PreCallBriefing> {
        const [prospectProfile, companyProfile] = await Promise.all([
            this.profileProspect(prospect),
            prospect.company ? this.researchCompany(prospect.company, prospect.website) : Promise.resolve(null),
        ]);

        const company = companyProfile || {
            name: prospect.company || 'Unknown',
            industry: 'General Business',
            size: 'Unknown',
            description: 'Company information unavailable.',
            keyProducts: [],
            recentNews: [],
            painPoints: ['Time efficiency', 'Growth challenges'],
            opportunities: ['Process automation', 'Strategic consulting'],
        };

        const prompt = `Create a pre-call briefing for a sales call.

PROSPECT: ${JSON.stringify(prospectProfile)}
COMPANY: ${JSON.stringify(company)}

Return ONLY this JSON:
{
  "talkingPoints": ["point1", "point2", "point3"],
  "questionsToAsk": ["question1", "question2", "question3"],
  "objectionHandlers": [
    {"objection": "common objection", "response": "how to handle it"}
  ],
  "closingStrategies": ["strategy1", "strategy2"],
  "estimatedDealSize": "$X - $Y",
  "nextSteps": ["step1", "step2"]
}`;

        try {
            const response = await aiService.chat(
                `dossier-${Date.now()}`,
                prompt,
                'dossier'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const briefingData = JSON.parse(jsonMatch[0]);
                return {
                    prospect: prospectProfile,
                    company,
                    ...briefingData,
                };
            }
        } catch (error) {
            console.error('Briefing generation error:', error);
        }

        // Fallback briefing
        return {
            prospect: prospectProfile,
            company,
            talkingPoints: [
                'Understand their current challenges',
                'Present our solution value proposition',
                'Discuss implementation timeline',
            ],
            questionsToAsk: [
                'What are your top priorities this quarter?',
                'What solutions have you tried before?',
                'Who else is involved in this decision?',
            ],
            objectionHandlers: [
                { objection: 'Too expensive', response: 'Focus on ROI and time saved' },
                { objection: 'Not the right time', response: 'Discuss opportunity cost of waiting' },
            ],
            closingStrategies: ['Trial offer', 'Phased implementation'],
            estimatedDealSize: '$5,000 - $25,000',
            nextSteps: ['Send proposal', 'Schedule follow-up call'],
        };
    }
}

export const dossierAgent = new DossierAgent();
