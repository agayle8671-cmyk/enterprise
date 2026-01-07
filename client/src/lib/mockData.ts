/**
 * Mock Data Generator for Bloomberg-style data density
 * Generates realistic business metrics, agent activities, and time tracking data
 */

export interface MetricData {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  prefix?: string;
  suffix?: string;
}

export interface AgentActivity {
  id: string;
  agentName: string;
  task: string;
  status: 'completed' | 'in_progress' | 'failed' | 'pending';
  timestamp: Date;
  duration: number;
  impact: string;
  category: string;
}

export interface TimeBreakdown {
  category: string;
  hours: number;
  percentage: number;
  change: number;
  tasks: number;
  color: string;
}

export interface ProposalData {
  id: string;
  clientName: string;
  projectTitle: string;
  value: number;
  status: 'draft' | 'sent' | 'reviewing' | 'negotiating' | 'won' | 'lost';
  probability: number;
  createdAt: Date;
  updatedAt: Date;
  daysInPipeline: number;
}

export interface EmailMetrics {
  hour: string;
  received: number;
  processed: number;
  flagged: number;
  responded: number;
}

// Generate hourly email metrics for last 24 hours
export function generateEmailMetrics(): EmailMetrics[] {
  const metrics: EmailMetrics[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourStr = hour.getHours().toString().padStart(2, '0') + ':00';
    
    const received = Math.floor(Math.random() * 25) + 5;
    const processed = Math.floor(received * (0.8 + Math.random() * 0.2));
    const flagged = Math.floor(processed * (0.1 + Math.random() * 0.15));
    const responded = Math.floor(processed * (0.3 + Math.random() * 0.2));
    
    metrics.push({ hour: hourStr, received, processed, flagged, responded });
  }
  
  return metrics;
}

// Generate agent activities
export function generateAgentActivities(count: number = 50): AgentActivity[] {
  const agents = [
    'Inbox Sentinel', 'Sales Agent', 'Research Agent', 'Content Alchemist',
    'Closer Agent', 'Calendar Agent', 'Analytics Agent', 'Social Agent'
  ];
  
  const tasks = [
    'Processed incoming emails', 'Drafted proposal', 'Researched competitor',
    'Generated social media post', 'Scheduled follow-up meeting', 
    'Updated CRM records', 'Analyzed campaign performance', 'Created content brief',
    'Responded to inquiry', 'Qualified lead', 'Sent contract', 'Updated dashboard',
    'Compiled weekly report', 'Optimized workflow', 'Monitored mentions',
    'Extracted key insights', 'Prioritized tasks', 'Flagged urgent items'
  ];
  
  const categories = ['Email', 'Sales', 'Research', 'Content', 'Calendar', 'Analytics', 'CRM', 'Social'];
  const statuses: Array<'completed' | 'in_progress' | 'failed' | 'pending'> = ['completed', 'in_progress', 'failed', 'pending'];
  const impacts = ['High', 'Medium', 'Low'];
  
  const activities: AgentActivity[] = [];
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    activities.push({
      id: `activity-${i}`,
      agentName: agents[Math.floor(Math.random() * agents.length)],
      task: tasks[Math.floor(Math.random() * tasks.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp,
      duration: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
      impact: impacts[Math.floor(Math.random() * impacts.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Generate time breakdown data
export function generateTimeBreakdown(): TimeBreakdown[] {
  return [
    { category: 'Email Management', hours: 12.5, percentage: 31, change: -15, tasks: 234, color: '#FF6363' },
    { category: 'Client Meetings', hours: 8.3, percentage: 21, change: +5, tasks: 18, color: '#8B5CF6' },
    { category: 'Proposal Writing', hours: 6.8, percentage: 17, change: -22, tasks: 12, color: '#22c55e' },
    { category: 'Research', hours: 5.2, percentage: 13, change: -8, tasks: 45, color: '#ffc940' },
    { category: 'Admin Tasks', hours: 4.1, percentage: 10, change: -35, tasks: 67, color: '#3b82f6' },
    { category: 'Social Media', hours: 2.1, percentage: 5, change: +12, tasks: 89, color: '#ec4899' },
    { category: 'Other', hours: 1.0, percentage: 3, change: 0, tasks: 34, color: '#989898' },
  ];
}

// Generate proposal pipeline data
export function generateProposals(count: number = 25): ProposalData[] {
  const clients = [
    'Acme Corp', 'TechStart Inc', 'Global Dynamics', 'Innovate Ltd', 'Quantum Systems',
    'Digital Ventures', 'Nexus Group', 'Vertex Solutions', 'Horizon Enterprises', 'Fusion Labs',
    'Alpha Industries', 'Beta Holdings', 'Gamma Tech', 'Delta Corp', 'Epsilon Partners'
  ];
  
  const projects = [
    'Marketing Automation System', 'Sales Process Optimization', 'AI Implementation',
    'Digital Transformation', 'CRM Integration', 'Analytics Dashboard', 'Content Strategy',
    'Lead Generation Campaign', 'Email Marketing System', 'Social Media Management',
    'Website Redesign', 'SEO Optimization', 'Brand Strategy', 'Product Launch'
  ];
  
  const statuses: Array<'draft' | 'sent' | 'reviewing' | 'negotiating' | 'won' | 'lost'> = 
    ['draft', 'sent', 'reviewing', 'negotiating', 'won', 'lost'];
  
  const proposals: ProposalData[] = [];
  
  for (let i = 0; i < count; i++) {
    const createdAt = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const updatedAt = new Date(createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    const daysInPipeline = Math.floor((Date.now() - createdAt.getTime()) / (24 * 60 * 60 * 1000));
    
    proposals.push({
      id: `proposal-${i}`,
      clientName: clients[Math.floor(Math.random() * clients.length)],
      projectTitle: projects[Math.floor(Math.random() * projects.length)],
      value: Math.floor(Math.random() * 100000) + 10000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      probability: Math.floor(Math.random() * 100),
      createdAt,
      updatedAt,
      daysInPipeline,
    });
  }
  
  return proposals.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

// Generate real-time metrics
export function generateRealtimeMetrics(): MetricData[] {
  return [
    { label: 'Active Tasks', value: 23, change: +12, changeLabel: 'vs last hour', prefix: '', suffix: '' },
    { label: 'Emails Processed', value: 156, change: +8, changeLabel: 'vs yesterday', prefix: '', suffix: '' },
    { label: 'Pipeline Value', value: '$2.4M', change: +15, changeLabel: 'this week', prefix: '', suffix: '' },
    { label: 'Time Saved Today', value: '4.5hrs', change: +22, changeLabel: 'vs avg', prefix: '', suffix: '' },
    { label: 'Agent Efficiency', value: '94%', change: +3, changeLabel: 'this month', prefix: '', suffix: '' },
    { label: 'Response Rate', value: '87%', change: -2, changeLabel: 'vs target', prefix: '', suffix: '' },
    { label: 'Conversion Rate', value: '12.3%', change: +5, changeLabel: 'this quarter', prefix: '', suffix: '' },
    { label: 'Client Satisfaction', value: '4.8/5', change: +8, changeLabel: 'vs last month', prefix: '', suffix: '' },
  ];
}

// Generate weekly performance data
export function generateWeeklyPerformance() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    timeSaved: Math.floor(Math.random() * 8) + 2,
    tasksCompleted: Math.floor(Math.random() * 50) + 20,
    emailsProcessed: Math.floor(Math.random() * 80) + 40,
    meetingsScheduled: Math.floor(Math.random() * 10) + 2,
  }));
}

// Generate agent performance metrics
export function generateAgentMetrics() {
  return [
    {
      name: 'Inbox Sentinel',
      tasksToday: 47,
      tasksWeek: 312,
      efficiency: 96,
      timeSaved: 4.2,
      errorRate: 0.8,
      uptime: 99.9,
    },
    {
      name: 'Sales Agent',
      tasksToday: 12,
      tasksWeek: 89,
      efficiency: 94,
      timeSaved: 2.8,
      errorRate: 1.2,
      uptime: 99.7,
    },
    {
      name: 'Research Agent',
      tasksToday: 23,
      tasksWeek: 167,
      efficiency: 92,
      timeSaved: 3.5,
      errorRate: 2.1,
      uptime: 99.5,
    },
    {
      name: 'Content Alchemist',
      tasksToday: 8,
      tasksWeek: 54,
      efficiency: 91,
      timeSaved: 1.9,
      errorRate: 1.8,
      uptime: 99.8,
    },
    {
      name: 'Closer Agent',
      tasksToday: 15,
      tasksWeek: 98,
      efficiency: 93,
      timeSaved: 2.3,
      errorRate: 1.5,
      uptime: 99.6,
    },
    {
      name: 'Calendar Agent',
      tasksToday: 19,
      tasksWeek: 134,
      efficiency: 97,
      timeSaved: 3.1,
      errorRate: 0.5,
      uptime: 100,
    },
  ];
}

// Format time ago
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Format currency
export function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
}
