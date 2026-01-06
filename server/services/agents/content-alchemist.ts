/**
 * Content Alchemist Agent
 * 
 * AI-powered content repurposing and transformation agent.
 * Handles: Video/audio transcription, content repurposing, social media posts
 */

import { aiService } from '../ai';

export interface ContentInput {
    type: 'transcript' | 'article' | 'notes' | 'video_description';
    content: string;
    title?: string;
    author?: string;
    originalPlatform?: string;
}

export interface LinkedInPost {
    hook: string;
    body: string;
    callToAction: string;
    hashtags: string[];
    estimatedEngagement: 'low' | 'medium' | 'high';
}

export interface TwitterThread {
    tweets: string[];
    hook: string;
    totalCharacters: number;
}

export interface NewsletterSection {
    headline: string;
    intro: string;
    mainContent: string;
    keyTakeaways: string[];
    callToAction: string;
}

export interface ContentBundle {
    original: ContentInput;
    linkedIn: LinkedInPost;
    twitter: TwitterThread;
    newsletter: NewsletterSection;
    keyMessages: string[];
    suggestedImages: string[];
}

class ContentAlchemistAgent {
    private readonly agentPrompt = `You are the Content Alchemist, an AI agent for content repurposing.
Your role is to:
- Transform long-form content (videos, podcasts) into multiple formats
- Create LinkedIn posts, Twitter threads, newsletters from transcripts
- Maintain the creator's voice and key messages
- Optimize for each platform's best practices

Respond ONLY with valid JSON. No markdown, no explanations outside the JSON structure.`;

    /**
     * Transform content into a LinkedIn post
     */
    async createLinkedInPost(input: ContentInput): Promise<LinkedInPost> {
        const prompt = `Transform this content into an engaging LinkedIn post.

CONTENT TYPE: ${input.type}
${input.title ? `TITLE: ${input.title}` : ''}
CONTENT:
${input.content.substring(0, 3000)}

Create a LinkedIn post that:
- Starts with a compelling hook (first 2 lines are crucial)
- Uses short paragraphs and line breaks for readability
- Includes a clear call-to-action
- Has 3-5 relevant hashtags

Return ONLY this JSON:
{
  "hook": "attention-grabbing first 1-2 lines",
  "body": "main post content with proper line breaks",
  "callToAction": "what you want readers to do",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "estimatedEngagement": "low|medium|high"
}`;

        try {
            const response = await aiService.chat(
                `content-alchemist-${Date.now()}`,
                prompt,
                'content_alchemist'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('LinkedIn post error:', error);
        }

        // Fallback post
        return {
            hook: 'Here\'s something I learned recently that changed my perspective...',
            body: this.summarizeContent(input.content, 500),
            callToAction: 'What are your thoughts? Share in the comments 👇',
            hashtags: ['#Leadership', '#Growth', '#Business'],
            estimatedEngagement: 'medium',
        };
    }

    /**
     * Transform content into a Twitter thread
     */
    async createTwitterThread(input: ContentInput): Promise<TwitterThread> {
        const prompt = `Transform this content into an engaging Twitter/X thread.

CONTENT TYPE: ${input.type}
${input.title ? `TITLE: ${input.title}` : ''}
CONTENT:
${input.content.substring(0, 3000)}

Create a Twitter thread that:
- Has a viral hook as the first tweet
- Uses 5-10 tweets maximum
- Each tweet is under 280 characters
- Ends with a CTA or summary

Return ONLY this JSON:
{
  "hook": "the first tweet - must be attention-grabbing",
  "tweets": ["tweet1", "tweet2", "tweet3"],
  "totalCharacters": 1200
}`;

        try {
            const response = await aiService.chat(
                `content-alchemist-${Date.now()}`,
                prompt,
                'content_alchemist'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Twitter thread error:', error);
        }

        // Fallback thread
        const sentences = input.content.split('.').filter(s => s.trim().length > 20).slice(0, 7);
        return {
            hook: `🧵 ${input.title || 'Here\'s a thread on something important'}:`,
            tweets: sentences.map((s, i) => `${i + 1}/ ${s.trim().substring(0, 250)}`),
            totalCharacters: sentences.join('').length,
        };
    }

    /**
     * Transform content into a newsletter section
     */
    async createNewsletterSection(input: ContentInput): Promise<NewsletterSection> {
        const prompt = `Transform this content into a newsletter section.

CONTENT TYPE: ${input.type}
${input.title ? `TITLE: ${input.title}` : ''}
CONTENT:
${input.content.substring(0, 3000)}

Create a newsletter section that:
- Has a compelling headline
- Starts with an engaging intro
- Provides valuable, actionable content
- Ends with key takeaways and CTA

Return ONLY this JSON:
{
  "headline": "attention-grabbing headline",
  "intro": "2-3 sentence intro paragraph",
  "mainContent": "the main body of the newsletter section",
  "keyTakeaways": ["takeaway1", "takeaway2", "takeaway3"],
  "callToAction": "what readers should do next"
}`;

        try {
            const response = await aiService.chat(
                `content-alchemist-${Date.now()}`,
                prompt,
                'content_alchemist'
            );

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Newsletter section error:', error);
        }

        // Fallback newsletter
        return {
            headline: input.title || 'Insights You Need to Know',
            intro: 'In this section, we dive into key insights that can transform your approach.',
            mainContent: this.summarizeContent(input.content, 800),
            keyTakeaways: ['Key insight 1', 'Key insight 2', 'Key insight 3'],
            callToAction: 'Reply to this email with your thoughts!',
        };
    }

    /**
     * Create a full content bundle from source content
     */
    async createContentBundle(input: ContentInput): Promise<ContentBundle> {
        const [linkedIn, twitter, newsletter] = await Promise.all([
            this.createLinkedInPost(input),
            this.createTwitterThread(input),
            this.createNewsletterSection(input),
        ]);

        // Extract key messages
        const keyMessages = this.extractKeyMessages(input.content);

        return {
            original: input,
            linkedIn,
            twitter,
            newsletter,
            keyMessages,
            suggestedImages: [
                'Quote card with key insight',
                'Infographic summarizing main points',
                'Carousel slides for LinkedIn',
            ],
        };
    }

    /**
     * Summarize content to a target length
     */
    private summarizeContent(content: string, maxLength: number): string {
        if (content.length <= maxLength) return content;

        const sentences = content.split(/[.!?]+/).filter(s => s.trim());
        let result = '';

        for (const sentence of sentences) {
            if ((result + sentence).length > maxLength - 50) break;
            result += sentence.trim() + '. ';
        }

        return result.trim() || content.substring(0, maxLength) + '...';
    }

    /**
     * Extract key messages from content
     */
    private extractKeyMessages(content: string): string[] {
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 30);
        // Return first 5 substantial sentences as key messages
        return sentences.slice(0, 5).map(s => s.trim());
    }
}

export const contentAlchemist = new ContentAlchemistAgent();
