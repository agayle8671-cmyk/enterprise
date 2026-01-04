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

  // Create decisions with 1:3:1 pattern
  await db.insert(decisions).values([
    {
      userId: "demo-user-id",
      agentId: null,
      agentName: "Inbox Sentinel",
      title: "Client Reply: Scope Creep Request",
      description: "Client X asked for extra revisions outside the original scope. I've analyzed the situation and prepared three response options.",
      type: "email",
      priority: "high",
      options: JSON.stringify([
        { label: "Politely Decline", description: "Cite the MSA and offer to create a separate proposal for the additional work at standard rates." },
        { label: "Offer Compromise", description: "Accept one minor revision but clearly state this is a one-time exception. Document for future reference." },
        { label: "Schedule Discussion", description: "Propose a call to discuss the underlying needs and potentially upsell to a larger engagement." }
      ]),
      recommendation: 0,
      status: "pending"
    },
    {
      userId: "demo-user-id",
      agentId: null,
      agentName: "Content Alchemist",
      title: "Blog Post Draft Ready",
      description: "I've repurposed your 45-minute podcast episode into a 2,000-word blog post. Ready for your review.",
      type: "proposal",
      priority: "medium",
      options: JSON.stringify([
        { label: "Publish Now", description: "Post is polished and SEO-optimized. Schedule for tomorrow at 9 AM EST." },
        { label: "Request Edits", description: "I'll revise based on your feedback. Typical turnaround is 2 hours." },
        { label: "Transform Format", description: "Convert this into a LinkedIn carousel or Twitter thread instead." }
      ]),
      recommendation: 0,
      status: "pending"
    },
    {
      userId: "demo-user-id",
      agentId: null,
      agentName: "The Dossier",
      title: "Pre-Call Brief: Acme Corp",
      description: "Your call with Sarah from Acme Corp is in 2 hours. I've compiled research on their recent funding, tech stack, and potential pain points.",
      type: "scheduling",
      priority: "urgent",
      options: JSON.stringify([
        { label: "Review Brief", description: "Open the full dossier with talking points and objection handlers." },
        { label: "Quick Summary", description: "Get a 2-minute voice summary of key points before the call." },
        { label: "Reschedule", description: "I'll draft a professional reschedule email citing a conflict." }
      ]),
      recommendation: 0,
      status: "pending"
    },
    {
      userId: "demo-user-id",
      agentId: null,
      agentName: "Invoice Chaser",
      title: "Overdue Invoice: Wayne Enterprises",
      description: "Invoice #2847 ($15,000) is now 14 days overdue. I've prepared escalation options.",
      type: "automation",
      priority: "high",
      options: JSON.stringify([
        { label: "Send Friendly Reminder", description: "Automated but personalized follow-up email. Maintains relationship." },
        { label: "Escalate to Decision Maker", description: "CC the finance director based on my research of their org chart." },
        { label: "Apply Late Fee", description: "Send formal notice with 2% late fee as per contract terms." }
      ]),
      recommendation: 0,
      status: "pending"
    },
  ]).onConflictDoNothing();
  console.log("✓ Created decisions with 1:3:1 options");

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
