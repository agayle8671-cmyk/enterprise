import { db } from "./db/index";
import {
  type User, type InsertUser,
  type Campaign, type InsertCampaign,
  type Lead, type InsertLead,
  type Agent, type InsertAgent,
  type Decision, type InsertDecision,
  type Contract, type InsertContract,
  type AuditLog, type InsertAuditLog,
  type TimeEntry, type InsertTimeEntry,
  users, campaigns, leads, agents, decisions, contracts, auditLogs, timeEntries
} from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Campaigns
  getCampaignsByUserId(userId: string): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined>;

  // Leads
  getLeadsByCampaignId(campaignId: number): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;

  // Agents
  getAgentsByUserId(userId: string): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<boolean>;

  // Decisions
  getPendingDecisionsByUserId(userId: string): Promise<Decision[]>;
  getDecision(id: number): Promise<Decision | undefined>;
  createDecision(decision: InsertDecision): Promise<Decision>;
  updateDecision(id: number, decision: Partial<InsertDecision>): Promise<Decision | undefined>;

  // Contracts
  getContractsByUserId(userId: string): Promise<Contract[]>;
  getContract(id: number): Promise<Contract | undefined>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: number, contract: Partial<InsertContract>): Promise<Contract | undefined>;

  // Audit Logs
  getAuditLogsByUserId(userId: string, limit?: number): Promise<AuditLog[]>;
  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;

  // Time Entries
  getTimeEntries(userId: string): Promise<TimeEntry[]>;
  createTimeEntry(entry: InsertTimeEntry): Promise<TimeEntry>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Campaigns
  async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return await db.select().from(campaigns).where(eq(campaigns.userId, userId)).orderBy(desc(campaigns.createdAt));
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
    return campaign;
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [newCampaign] = await db.insert(campaigns).values(campaign).returning();
    return newCampaign;
  }

  async updateCampaign(id: number, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const [updated] = await db.update(campaigns).set(campaign).where(eq(campaigns.id, id)).returning();
    return updated;
  }

  // Leads
  async getLeadsByCampaignId(campaignId: number): Promise<Lead[]> {
    return await db.select().from(leads).where(eq(leads.campaignId, campaignId)).orderBy(desc(leads.score));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return lead;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined> {
    const [updated] = await db.update(leads).set(lead).where(eq(leads.id, id)).returning();
    return updated;
  }

  async deleteLead(id: number): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Agents
  async getAgentsByUserId(userId: string): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.userId, userId)).orderBy(desc(agents.createdAt));
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id)).limit(1);
    return agent;
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const [newAgent] = await db.insert(agents).values(agent).returning();
    return newAgent;
  }

  async updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const [updated] = await db.update(agents).set(agent).where(eq(agents.id, id)).returning();
    return updated;
  }

  async deleteAgent(id: number): Promise<boolean> {
    const result = await db.delete(agents).where(eq(agents.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Decisions
  async getPendingDecisionsByUserId(userId: string): Promise<Decision[]> {
    return await db.select().from(decisions)
      .where(and(eq(decisions.userId, userId), eq(decisions.status, "pending")))
      .orderBy(desc(decisions.createdAt));
  }

  async getDecision(id: number): Promise<Decision | undefined> {
    const [decision] = await db.select().from(decisions).where(eq(decisions.id, id)).limit(1);
    return decision;
  }

  async createDecision(decision: InsertDecision): Promise<Decision> {
    const [newDecision] = await db.insert(decisions).values(decision).returning();
    return newDecision;
  }

  async updateDecision(id: number, decision: Partial<InsertDecision>): Promise<Decision | undefined> {
    const [updated] = await db.update(decisions).set(decision).where(eq(decisions.id, id)).returning();
    return updated;
  }

  // Contracts
  async getContractsByUserId(userId: string): Promise<Contract[]> {
    return await db.select().from(contracts).where(eq(contracts.userId, userId)).orderBy(desc(contracts.sentAt));
  }

  async getContract(id: number): Promise<Contract | undefined> {
    const [contract] = await db.select().from(contracts).where(eq(contracts.id, id)).limit(1);
    return contract;
  }

  async createContract(contract: InsertContract): Promise<Contract> {
    const [newContract] = await db.insert(contracts).values(contract).returning();
    return newContract;
  }

  async updateContract(id: number, contract: Partial<InsertContract>): Promise<Contract | undefined> {
    const [updated] = await db.update(contracts).set(contract).where(eq(contracts.id, id)).returning();
    return updated;
  }

  // Audit Logs
  async getAuditLogsByUserId(userId: string, limit: number = 50): Promise<AuditLog[]> {
    return await db.select().from(auditLogs)
      .where(eq(auditLogs.userId, userId))
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit);
  }

  async createAuditLog(log: InsertAuditLog): Promise<AuditLog> {
    const [newLog] = await db.insert(auditLogs).values(log).returning();
    return newLog;
  }

  // Time Entries
  async getTimeEntries(userId: string): Promise<TimeEntry[]> {
    return await db.select().from(timeEntries).where(eq(timeEntries.userId, userId)).orderBy(desc(timeEntries.createdAt));
  }

  async createTimeEntry(entry: InsertTimeEntry): Promise<TimeEntry> {
    const [newEntry] = await db.insert(timeEntries).values(entry).returning();
    return newEntry;
  }
}



export const storage = new DatabaseStorage();
