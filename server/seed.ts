import { db } from "./db/index";
import { users, campaigns, leads, agents, decisions, contracts } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Create demo user
  const [demoUser] = await db.insert(users).values({
    id: "demo-user-id",
    username: "demo",
    password: "demo123",
    email: "james@sovereign.os",
    name: "James Doe",
    role: "owner"
  }).onConflictDoNothing().returning();

  console.log("✓ Created demo user");

  // Create Founding 50 campaign
  const [campaign] = await db.insert(campaigns).values({
    userId: "demo-user-id",
    name: "Founding 50 Launch",
    goalMembers: 50,
    currentMembers: 32,
    totalRevenue: 16000000, // $160,000 in cents
    conversionRate: "24.5",
    waitlistSize: 418,
    status: "active"
  }).onConflictDoNothing().returning();

  console.log("✓ Created campaign");

  // Create leads
  if (campaign) {
    await db.insert(leads).values([
      { campaignId: campaign.id, name: "Sarah Connor", email: "sarah@skynet.com", company: "SkyNet Systems", revenue: "$5M+", score: 98, status: "High Priority" },
      { campaignId: campaign.id, name: "John Wick", email: "j.wick@continental.com", company: "Continental Services", revenue: "$2M - $5M", score: 85, status: "Qualified" },
      { campaignId: campaign.id, name: "Bruce Wayne", email: "bruce@wayne.ent", company: "Wayne Enterprises", revenue: "$10M+", score: 92, status: "High Priority" },
      { campaignId: campaign.id, name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", revenue: "$50M+", score: 99, status: "VIP" },
      { campaignId: campaign.id, name: "Peter Parker", email: "peter@dailybugle.com", company: "Freelance Photo", revenue: "<$100k", score: 45, status: "Nurture" },
    ]).onConflictDoNothing();
    console.log("✓ Created leads");
  }

  // Create agents
  await db.insert(agents).values([
    { userId: "demo-user-id", name: "Inbox Zero Agent", role: "Administrative", status: "Running", uptime: "99.8%", color: "bg-blue-500", timeSaved: 240 },
    { userId: "demo-user-id", name: "Content Repurposer", role: "Marketing", status: "Running", uptime: "98.2%", color: "bg-purple-500", timeSaved: 180 },
    { userId: "demo-user-id", name: "Lead Enricher", role: "Sales", status: "Paused", uptime: "0%", color: "bg-slate-400", timeSaved: 0 },
    { userId: "demo-user-id", name: "Invoice Chaser", role: "Finance", status: "Running", uptime: "100%", color: "bg-emerald-500", timeSaved: 120 },
  ]).onConflictDoNothing();
  console.log("✓ Created agents");

  // Create decisions
  await db.insert(decisions).values([
    { userId: "demo-user-id", agentId: null, title: "Outreach Campaign Draft", description: "Drafted 50 personalized LinkedIn messages for the 'SaaS Founders' list. Ready for review.", type: "Review", status: "pending" },
    { userId: "demo-user-id", agentId: null, title: "Client Reply: Scope Creep", description: "Client X asked for extra revisions. I drafted a polite refusal citing the MSA. Approve to send?", type: "Decision", status: "pending" },
    { userId: "demo-user-id", agentId: null, title: "Weekly Report Generation", description: "Compiled Jan 2026 performance report. PDF ready for distribution.", type: "Review", status: "pending" },
  ]).onConflictDoNothing();
  console.log("✓ Created decisions");

  // Create contracts
  await db.insert(contracts).values([
    { userId: "demo-user-id", clientName: "Acme Corp Strategy", amount: 1500000, status: "pending" },
    { userId: "demo-user-id", clientName: "Stark Industries Retainer", amount: 850000, status: "paid" },
  ]).onConflictDoNothing();
  console.log("✓ Created contracts");

  console.log("\n✅ Seed completed successfully!");
  process.exit(0);
}

seed().catch(console.error);
