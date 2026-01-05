import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/ai";
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

  return httpServer;
}
