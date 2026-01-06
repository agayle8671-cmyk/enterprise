import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/ai";
import { inboxSentinel, dossierAgent, contentAlchemist, closerAgent, AGENT_REGISTRY } from "./services/agents";
import { insertCampaignSchema, insertLeadSchema, insertAgentSchema, insertDecisionSchema, insertContractSchema, insertTimeEntrySchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Helper to get current user ID
  const getUserId = (req: any) => req.user?.id || "demo-user-id";

  // Health Check for Railway
  app.get("/health", (_req, res) => {
    res.status(200).send("OK");
  });

  // Campaigns
  app.get("/api/campaigns", async (req, res) => {
    try {
      const userId = getUserId(req);
      const campaigns = await storage.getCampaignsByUserId(userId);
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(parseInt(req.params.id));
      if (!campaign) return res.status(404).json({ error: "Campaign not found" });
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const userId = getUserId(req);
      const data = insertCampaignSchema.parse({ ...req.body, userId });
      const campaign = await storage.createCampaign(data);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.updateCampaign(parseInt(req.params.id), req.body);
      if (!campaign) return res.status(404).json({ error: "Campaign not found" });
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  // Leads
  app.get("/api/campaigns/:campaignId/leads", async (req, res) => {
    try {
      const leads = await storage.getLeadsByCampaignId(parseInt(req.params.campaignId));
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);

      // Update campaign stats
      const campaign = await storage.getCampaign(data.campaignId);
      if (campaign) {
        await storage.updateCampaign(campaign.id, {
          waitlistSize: campaign.waitlistSize + 1
        });
      }

      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.updateLead(parseInt(req.params.id), req.body);
      if (!lead) return res.status(404).json({ error: "Lead not found" });
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const success = await storage.deleteLead(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: "Lead not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Agents
  app.get("/api/agents", async (req, res) => {
    try {
      const userId = getUserId(req);
      const agents = await storage.getAgentsByUserId(userId);
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agents" });
    }
  });

  app.post("/api/agents", async (req, res) => {
    try {
      const userId = getUserId(req);
      const data = insertAgentSchema.parse({ ...req.body, userId });
      const agent = await storage.createAgent(data);
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create agent" });
    }
  });

  app.patch("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.updateAgent(parseInt(req.params.id), req.body);
      if (!agent) return res.status(404).json({ error: "Agent not found" });
      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: "Failed to update agent" });
    }
  });

  app.delete("/api/agents/:id", async (req, res) => {
    try {
      const success = await storage.deleteAgent(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: "Agent not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete agent" });
    }
  });

  // Time Audit
  app.get("/api/time-entries", async (req, res) => {
    try {
      const userId = getUserId(req);
      const entries = await storage.getTimeEntries(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch time entries" });
    }
  });

  app.post("/api/time-entries", async (req, res) => {
    try {
      const userId = getUserId(req);
      const data = insertTimeEntrySchema.parse({ ...req.body, userId });
      const entry = await storage.createTimeEntry(data);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create time entry" });
    }
  });

  // Decisions
  app.get("/api/decisions", async (req, res) => {
    try {
      const userId = getUserId(req);
      const decisions = await storage.getPendingDecisionsByUserId(userId);
      res.json(decisions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch decisions" });
    }
  });

  app.post("/api/decisions", async (req, res) => {
    try {
      const userId = getUserId(req);
      const data = insertDecisionSchema.parse({ ...req.body, userId });
      const decision = await storage.createDecision(data);
      res.status(201).json(decision);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create decision" });
    }
  });

  app.patch("/api/decisions/:id", async (req, res) => {
    try {
      const decision = await storage.updateDecision(parseInt(req.params.id), req.body);
      if (!decision) return res.status(404).json({ error: "Decision not found" });
      res.json(decision);
    } catch (error) {
      res.status(500).json({ error: "Failed to update decision" });
    }
  });

  // Contracts
  app.get("/api/contracts", async (req, res) => {
    try {
      const userId = getUserId(req);
      const contracts = await storage.getContractsByUserId(userId);
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contracts" });
    }
  });

  app.post("/api/contracts", async (req, res) => {
    try {
      const userId = getUserId(req);
      const data = insertContractSchema.parse({ ...req.body, userId });
      const contract = await storage.createContract(data);
      res.status(201).json(contract);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create contract" });
    }
  });

  app.patch("/api/contracts/:id", async (req, res) => {
    try {
      const contract = await storage.updateContract(parseInt(req.params.id), req.body);
      if (!contract) return res.status(404).json({ error: "Contract not found" });
      res.json(contract);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contract" });
    }
  });

  // Dashboard stats (aggregated data)
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const userId = getUserId(req);

      const campaigns = await storage.getCampaignsByUserId(userId);
      const agents = await storage.getAgentsByUserId(userId);
      const decisions = await storage.getPendingDecisionsByUserId(userId);
      const contracts = await storage.getContractsByUserId(userId);

      // Calculate total time saved
      const totalTimeSaved = agents.reduce((sum, agent) => sum + (agent.timeSaved || 0), 0);

      // Active contracts
      const activeContracts = contracts.filter(c => c.status === "pending" || c.status === "signed");

      res.json({
        totalCampaigns: campaigns.length,
        totalAgents: agents.length,
        pendingDecisions: decisions.length,
        activeContracts: activeContracts.length,
        totalTimeSaved,
        campaigns: campaigns.slice(0, 1), // Return main campaign for dashboard
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // ==========================================================================
  // AI ROUTES - Command Center & Agent APIs
  // ==========================================================================

  // Chat with Command Center AI
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, sessionId, agentType = 'command_center' } = req.body;

      if (!message || !sessionId) {
        return res.status(400).json({ error: "Message and sessionId are required" });
      }

      const response = await aiService.chat(sessionId, message, agentType);
      res.json({ response, sessionId });
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // Streaming chat endpoint (Server-Sent Events)
  app.post("/api/ai/chat/stream", async (req, res) => {
    try {
      const { message, sessionId, agentType = 'command_center' } = req.body;

      if (!message || !sessionId) {
        return res.status(400).json({ error: "Message and sessionId are required" });
      }

      // Set up SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      await aiService.streamChat(
        sessionId,
        message,
        {
          onChunk: (chunk) => {
            res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`);
          },
          onComplete: (fullResponse) => {
            res.write(`data: ${JSON.stringify({ type: 'complete', content: fullResponse })}\n\n`);
            res.end();
          },
          onError: (error) => {
            res.write(`data: ${JSON.stringify({ type: 'error', content: error.message })}\n\n`);
            res.end();
          }
        },
        agentType
      );
    } catch (error) {
      console.error("AI stream error:", error);
      res.status(500).json({ error: "Failed to stream AI response" });
    }
  });

  // DRIP Matrix analysis
  app.post("/api/ai/analyze-drip", async (req, res) => {
    try {
      const { taskDescription } = req.body;

      if (!taskDescription) {
        return res.status(400).json({ error: "Task description is required" });
      }

      const analysis = await aiService.analyzeDRIP(taskDescription);
      res.json(analysis);
    } catch (error) {
      console.error("DRIP analysis error:", error);
      res.status(500).json({ error: "Failed to analyze task" });
    }
  });

  // Generate email reply options (for Inbox Sentinel)
  app.post("/api/ai/email-replies", async (req, res) => {
    try {
      const { emailContent } = req.body;

      if (!emailContent) {
        return res.status(400).json({ error: "Email content is required" });
      }

      const replies = await aiService.generateEmailReplies(emailContent);
      res.json(replies);
    } catch (error) {
      console.error("Email reply generation error:", error);
      res.status(500).json({ error: "Failed to generate email replies" });
    }
  });

  // Clear AI conversation history
  app.delete("/api/ai/history/:sessionId", async (req, res) => {
    try {
      aiService.clearHistory(req.params.sessionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to clear history" });
    }
  });

  // ==========================================
  // AGENT COMMAND ENDPOINTS (Sovereign OS)
  // ==========================================

  // Unified agent command endpoint
  app.post("/api/agents/:agent", async (req, res) => {
    try {
      const { agent } = req.params;
      const { action, parameters, originalCommand } = req.body;
      const userId = getUserId(req);

      console.log(`Agent ${agent} received: ${action}`, parameters);

      // Route to specific agent handler
      let result: any;
      let pendingDecision = false;

      switch (agent) {
        case 'inbox-sentinel':
          result = await handleInboxSentinel(action, parameters, userId);
          pendingDecision = true;
          break;
        case 'dossier':
          result = await handleDossier(action, parameters, userId);
          pendingDecision = true;
          break;
        case 'content-alchemist':
          result = await handleContentAlchemist(action, parameters, userId);
          pendingDecision = true;
          break;
        case 'closer':
          result = await handleCloser(action, parameters, userId);
          pendingDecision = true;
          break;
        case 'offer-architect':
          result = await handleOfferArchitect(action, parameters, userId);
          pendingDecision = false; // Direct action
          break;
        case 'system':
          result = await handleSystemCommand(action, parameters, userId);
          pendingDecision = false;
          break;
        default:
          return res.status(400).json({ error: `Unknown agent: ${agent}` });
      }

      res.json({
        message: result.message,
        result: result.data,
        pendingDecision,
      });
    } catch (error) {
      console.error("Agent command error:", error);
      res.status(500).json({ error: "Agent command failed" });
    }
  });

  // Get agent status overview
  app.get("/api/agents/status", async (req, res) => {
    try {
      const userId = getUserId(req);
      const agents = await storage.getAgentsByUserId(userId);
      const decisions = await storage.getPendingDecisionsByUserId(userId);

      res.json({
        agents: agents.map(a => ({
          id: a.id,
          name: a.name,
          role: a.role,
          status: a.status,
          timeSaved: a.timeSaved || 0,
        })),
        pendingDecisions: decisions.length,
        totalTimeSaved: agents.reduce((sum, a) => sum + (a.timeSaved || 0), 0),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agent status" });
    }
  });

  // Batch approve decisions
  app.post("/api/decisions/batch-approve", async (req, res) => {
    try {
      const { ids } = req.body;
      const userId = getUserId(req);

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "No decision IDs provided" });
      }

      let approved = 0;
      for (const id of ids) {
        try {
          await storage.updateDecision(id, {
            status: 'approved',
          });
          approved++;
        } catch (e) {
          console.error(`Failed to approve decision ${id}:`, e);
        }
      }

      res.json({
        message: `Approved ${approved} of ${ids.length} decisions`,
        approved,
        total: ids.length,
      });
    } catch (error) {
      res.status(500).json({ error: "Batch approve failed" });
    }
  });

  // Batch reject decisions
  app.post("/api/decisions/batch-reject", async (req, res) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "No decision IDs provided" });
      }

      let rejected = 0;
      for (const id of ids) {
        try {
          await storage.updateDecision(id, {
            status: 'rejected',
          });
          rejected++;
        } catch (e) {
          console.error(`Failed to reject decision ${id}:`, e);
        }
      }

      res.json({
        message: `Rejected ${rejected} of ${ids.length} decisions`,
        rejected,
        total: ids.length,
      });
    } catch (error) {
      res.status(500).json({ error: "Batch reject failed" });
    }
  });

  return httpServer;
}

// ==========================================
// AGENT HANDLERS
// ==========================================

async function handleInboxSentinel(action: string, parameters: Record<string, string>, userId: string) {
  switch (action) {
    case 'scan':
      // Create a decision for inbox scan results
      await storage.createDecision({
        userId,
        agentName: 'Inbox Sentinel',
        title: 'Inbox Scan Complete: 3 Urgent Items',
        description: 'Found 3 emails requiring your attention. 12 were auto-filtered as promotional.',
        type: 'email',
        priority: 'medium',
        options: JSON.stringify([
          { label: 'Review urgent emails', description: 'Open inbox with urgent filter applied' },
          { label: 'Auto-reply with templates', description: 'Send templated responses to routine inquiries' },
          { label: 'Schedule review for later', description: 'Add to tomorrow\'s agenda' },
        ]),
        recommendation: 0,
        status: 'pending',
      });
      return { message: 'Inbox scanned. Found 3 urgent items.', data: { urgent: 3, filtered: 12 } };

    case 'draft-reply':
      const recipient = parameters.recipient || 'the sender';
      await storage.createDecision({
        userId,
        agentName: 'Inbox Sentinel',
        title: `Draft Reply to ${recipient}`,
        description: 'I\'ve drafted 3 response options based on the email context and your communication style.',
        type: 'email',
        priority: 'low',
        options: JSON.stringify([
          { label: 'Professional & Brief', description: 'Concise acknowledgment with next steps' },
          { label: 'Detailed & Thorough', description: 'Full response addressing all points' },
          { label: 'Defer & Schedule', description: 'Acknowledge receipt, suggest a call' },
        ]),
        recommendation: 0,
        status: 'pending',
      });
      return { message: `Draft replies prepared for ${recipient}`, data: { recipient } };

    default:
      return { message: `Inbox Sentinel: ${action} executed`, data: {} };
  }
}

async function handleDossier(action: string, parameters: Record<string, string>, userId: string) {
  const topic = parameters.topic || parameters.company || 'the subject';

  await storage.createDecision({
    userId,
    agentName: 'The Dossier',
    title: `Research Complete: ${topic}`,
    description: `I've compiled a briefing on ${topic} including company background, recent news, and key decision makers.`,
    type: 'proposal',
    priority: 'medium',
    options: JSON.stringify([
      { label: 'View Full Briefing', description: 'Open the complete research document' },
      { label: 'Add to Call Prep', description: 'Attach to your upcoming meeting notes' },
      { label: 'Export as PDF', description: 'Download for offline reference' },
    ]),
    recommendation: 0,
    status: 'pending',
  });

  return { message: `Research briefing prepared on ${topic}`, data: { topic } };
}

async function handleContentAlchemist(action: string, parameters: Record<string, string>, userId: string) {
  switch (action) {
    case 'repurpose':
    case 'create-post':
      await storage.createDecision({
        userId,
        agentName: 'Content Alchemist',
        title: 'Content Ready for Review',
        description: 'I\'ve transformed your input into 3 platform-optimized versions.',
        type: 'automation',
        priority: 'low',
        options: JSON.stringify([
          { label: 'LinkedIn Article', description: 'Long-form thought leadership piece (800 words)' },
          { label: 'Twitter Thread', description: 'Engaging 7-tweet thread with hooks' },
          { label: 'Newsletter Section', description: 'Email-ready content block' },
        ]),
        recommendation: 0,
        status: 'pending',
      });
      return { message: 'Content transformed and ready for review', data: { formats: 3 } };

    case 'transcribe':
      return { message: 'Transcription in progress. Will notify when complete.', data: { status: 'processing' } };

    default:
      return { message: `Content Alchemist: ${action} executed`, data: {} };
  }
}

async function handleCloser(action: string, parameters: Record<string, string>, userId: string) {
  switch (action) {
    case 'analyze-call':
      await storage.createDecision({
        userId,
        agentName: 'The Closer',
        title: 'Call Analysis Complete',
        description: 'Identified 4 key objections and 2 buying signals. Proposal draft is ready.',
        type: 'proposal',
        priority: 'high',
        options: JSON.stringify([
          { label: 'View Analysis', description: 'See detailed call breakdown with timestamps' },
          { label: 'Send Proposal', description: 'Forward the AI-drafted proposal for review' },
          { label: 'Update CRM', description: 'Sync insights to client record' },
        ]),
        recommendation: 1,
        status: 'pending',
      });
      return { message: 'Call analyzed. Found 4 objections, 2 buying signals.', data: { objections: 4, signals: 2 } };

    case 'draft-proposal':
      await storage.createDecision({
        userId,
        agentName: 'The Closer',
        title: 'Proposal Draft Ready',
        description: 'Value-based proposal with ROI calculations and outcome statements.',
        type: 'proposal',
        priority: 'medium',
        options: JSON.stringify([
          { label: 'Review & Edit', description: 'Open proposal in editor' },
          { label: 'Send to Client', description: 'Email with e-signature request' },
          { label: 'Schedule Follow-up', description: 'Set reminder for 48 hours' },
        ]),
        recommendation: 0,
        status: 'pending',
      });
      return { message: 'Proposal draft completed', data: {} };

    default:
      return { message: `The Closer: ${action} executed`, data: {} };
  }
}

async function handleOfferArchitect(action: string, parameters: Record<string, string>, userId: string) {
  switch (action) {
    case 'founding-50':
      return {
        message: 'Launching Founding 50 campaign wizard...',
        data: { redirect: '/dashboard/founding-50' }
      };
    case 'create-offer':
      return {
        message: 'Opening Offer Architect...',
        data: { redirect: '/dashboard/offers' }
      };
    default:
      return { message: `Offer Architect: ${action}`, data: {} };
  }
}

async function handleSystemCommand(action: string, parameters: Record<string, string>, userId: string) {
  switch (action) {
    case 'list-decisions':
      const decisions = await storage.getPendingDecisionsByUserId(userId);
      return { message: `You have ${decisions.length} pending decisions`, data: { count: decisions.length } };
    case 'approve-all':
      return { message: 'Batch approve initiated. Use the Decision Feed to confirm.', data: { action: 'batch-approve' } };
    case 'time-audit':
      return { message: 'Opening Time Audit...', data: { redirect: '/dashboard/time-audit' } };
    case 'agent-status':
      const agents = await storage.getAgentsByUserId(userId);
      return { message: `${agents.filter(a => a.status === 'Running').length} agents active`, data: { agents: agents.length } };
    default:
      return { message: `System: ${action}`, data: {} };
  }
}
