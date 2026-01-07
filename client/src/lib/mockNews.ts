/**
 * Mock News/Updates Data Generator
 * 
 * Generates Bloomberg-style news items for dashboard pages
 */

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  thumbnail?: string;
  excerpt?: string;
  trend?: "up" | "down" | "neutral";
  author?: string;
}

const categories = ["AI", "Agents", "Pipeline", "Automation", "Analytics", "System"];

const newsTemplates = [
  { title: "AI Agent Successfully Processes 1,000+ Emails in Record Time", category: "Agents", trend: "up" },
  { title: "Pipeline Value Reaches $2.4M as Q4 Deals Close", category: "Pipeline", trend: "up" },
  { title: "New Automation Framework Saves 40% More Time", category: "Automation", trend: "up" },
  { title: "Inbox Sentinel Achieves 99.9% Uptime This Quarter", category: "System", trend: "neutral" },
  { title: "Sales Agent Generates $450K in Proposals This Month", category: "Agents", trend: "up" },
  { title: "Time Audit Reveals 68% Automation Rate Achieved", category: "Analytics", trend: "up" },
  { title: "Research Agent Enriches 500+ CRM Records Overnight", category: "Agents", trend: "up" },
  { title: "Weekly ROI Increases 45% Due to AI Optimization", category: "Analytics", trend: "up" },
  { title: "Content Alchemist Produces 12 Blog Posts Autonomously", category: "AI", trend: "up" },
  { title: "Calendar Agent Schedules 100+ Meetings with Zero Conflicts", category: "Agents", trend: "neutral" },
  { title: "Closer Agent Achieves 92% Conversion Rate on Follow-ups", category: "Pipeline", trend: "up" },
  { title: "System Processes 10,000 Tasks in Parallel Without Errors", category: "System", trend: "neutral" },
  { title: "New Agent Deployment Reduces Manual Work by 30%", category: "Automation", trend: "up" },
  { title: "AI-Powered Analytics Predict Q1 Revenue Within 2% Accuracy", category: "Analytics", trend: "up" },
  { title: "Multi-Agent Collaboration System Launches Successfully", category: "AI", trend: "up" },
  { title: "Email Processing Speed Increases 3x with New Algorithm", category: "Agents", trend: "up" },
  { title: "Proposal Win Rate Climbs to 67% After AI Optimization", category: "Pipeline", trend: "up" },
  { title: "Time Saved This Week Exceeds 100 Hours Across All Agents", category: "Analytics", trend: "up" },
  { title: "System Uptime Maintains 99.99% for 90 Consecutive Days", category: "System", trend: "neutral" },
  { title: "Agent Error Rate Drops Below 1% Industry Benchmark", category: "Agents", trend: "up" },
];

const excerpts = [
  "Latest automation breakthrough shows significant efficiency gains across all operational metrics.",
  "System performance metrics exceed expectations as deployment scales continue.",
  "New AI capabilities demonstrate unprecedented accuracy in complex workflow scenarios.",
  "Integration with existing systems proves seamless, enabling rapid adoption.",
  "User satisfaction scores reach all-time high following latest feature release.",
  "Cost savings analysis reveals substantial ROI within first quarter of deployment.",
  "Machine learning models achieve 95%+ accuracy in predictive analytics tasks.",
  "Real-time processing capabilities enable instant decision-making support.",
  "Scalability tests confirm system can handle 10x current load without degradation.",
  "Security audit confirms enterprise-grade compliance across all operations.",
];

// Generate realistic timestamps
function generateTimestamp(): string {
  const now = Date.now();
  const randomOffset = Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
  const date = new Date(now - randomOffset);
  
  const hoursAgo = Math.floor((now - date.getTime()) / (1000 * 60 * 60));
  
  if (hoursAgo < 1) return `${Math.floor((now - date.getTime()) / (1000 * 60))}m ago`;
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo}d ago`;
}

// Generate placeholder thumbnail URLs (using placeholder service or gradients)
function generateThumbnail(category: string): string {
  const colors: Record<string, string> = {
    "AI": "BBFF00",
    "Agents": "4AF6C3",
    "Pipeline": "FF433D",
    "Automation": "BBFF00",
    "Analytics": "4AF6C3",
    "System": "FF433D",
  };
  
  const color = colors[category] || "BBFF00";
  const width = 400;
  const height = 300;
  
  // Using placeholder.com with custom colors
  return `https://via.placeholder.com/${width}x${height}/${color.replace('#', '')}/000000?text=${category}`;
}

/**
 * Generate mock news items
 */
export function generateNewsItems(count: number = 20): NewsItem[] {
  const items: NewsItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = newsTemplates[i % newsTemplates.length];
    const excerpt = excerpts[Math.floor(Math.random() * excerpts.length)];
    
    items.push({
      id: `news-${i}`,
      title: template.title,
      category: template.category,
      timestamp: generateTimestamp(),
      thumbnail: generateThumbnail(template.category),
      excerpt,
      trend: template.trend as any,
      author: "System AI",
    });
  }
  
  return items.sort((a, b) => {
    // Sort by timestamp (newest first)
    const aTime = a.timestamp.includes('m') ? 1 : a.timestamp.includes('h') ? 2 : 3;
    const bTime = b.timestamp.includes('m') ? 1 : b.timestamp.includes('h') ? 2 : 3;
    return aTime - bTime;
  });
}

/**
 * Generate news by category
 */
export function generateNewsByCategory(category: string, count: number = 10): NewsItem[] {
  const allNews = generateNewsItems(50);
  return allNews.filter(item => item.category === category).slice(0, count);
}

/**
 * Generate trending news (high engagement)
 */
export function generateTrendingNews(count: number = 5): NewsItem[] {
  const allNews = generateNewsItems(50);
  return allNews.filter(item => item.trend === "up").slice(0, count);
}
