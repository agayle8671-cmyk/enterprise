/**
 * Tool Builder - Sovereign OS (S.O.S.) Design
 * 
 * Create and deploy lead generation tools:
 * - ROI Calculator template
 * - Grader/Auditor template
 * - Quiz/Assessment template
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import {
  Wrench, Plus, Calculator, CheckCircle, HelpCircle,
  ArrowRight, Play, ExternalLink, BarChart3
} from "lucide-react";

type TemplateType = 'roi' | 'grader' | 'quiz';

interface Template {
  id: TemplateType;
  name: string;
  icon: typeof Calculator;
  description: string;
  color: string;
  fields: string[];
}

const TEMPLATES: Template[] = [
  {
    id: 'roi',
    name: 'ROI Calculator',
    icon: Calculator,
    description: 'Help prospects calculate their potential return on investment',
    color: 'var(--color-sos-green)',
    fields: ['Current Revenue', 'Current Costs', 'Time Investment'],
  },
  {
    id: 'grader',
    name: 'SEO Grader',
    icon: CheckCircle,
    description: 'Score and audit websites with actionable recommendations',
    color: 'var(--color-sos-blue)',
    fields: ['Website URL', 'Industry', 'Competitors'],
  },
  {
    id: 'quiz',
    name: 'Readiness Quiz',
    icon: HelpCircle,
    description: 'Qualify leads with a personalized assessment',
    color: 'var(--color-sos-soul)',
    fields: ['Business Size', 'Current Tools', 'Goals'],
  },
];

// ROI Calculator Demo
function ROICalculatorPreview() {
  const [revenue, setRevenue] = useState('100000');
  const [costs, setCosts] = useState('60000');
  const [improvement, setImprovement] = useState('20');

  const currentProfit = parseInt(revenue) - parseInt(costs);
  const projectedRevenue = parseInt(revenue) * (1 + parseInt(improvement) / 100);
  const projectedProfit = projectedRevenue - parseInt(costs);
  const roi = ((projectedProfit - currentProfit) / parseInt(costs)) * 100;

  const inputStyle = {
    background: 'var(--color-sos-base)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    padding: '10px 12px',
    color: 'var(--color-sos-text)',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs lowercase block mb-1" style={{ color: 'var(--color-sos-muted)' }}>
            current revenue
          </label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="text-xs lowercase block mb-1" style={{ color: 'var(--color-sos-muted)' }}>
            current costs
          </label>
          <input
            type="number"
            value={costs}
            onChange={(e) => setCosts(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="text-xs lowercase block mb-1" style={{ color: 'var(--color-sos-muted)' }}>
            improvement %
          </label>
          <input
            type="number"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div
        className="p-4 rounded-xl text-center"
        style={{ background: 'var(--color-sos-green)', color: 'white' }}
      >
        <p className="text-xs uppercase tracking-wider mb-1 opacity-80">projected roi</p>
        <p className="text-3xl font-bold font-mono">{roi.toFixed(0)}%</p>
        <p className="text-xs mt-1 opacity-80">
          +${(projectedProfit - currentProfit).toLocaleString()} additional profit
        </p>
      </div>
    </div>
  );
}

// Grader Preview
function GraderPreview() {
  const [url, setUrl] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyze = async () => {
    if (!url) return;
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setScore(Math.floor(Math.random() * 40) + 50); // 50-90
    setAnalyzing(false);
  };

  const inputStyle = {
    background: 'var(--color-sos-base)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    padding: '10px 12px',
    color: 'var(--color-sos-text)',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="https://yourwebsite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={inputStyle}
        />
        <TactileButton variant="primary" onClick={analyze} disabled={!url || analyzing}>
          {analyzing ? '...' : 'grade'}
        </TactileButton>
      </div>

      {score !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl"
          style={{
            background: score >= 70 ? 'var(--color-sos-green)' : score >= 50 ? 'var(--color-sos-soul)' : 'var(--color-sos-red)',
            color: 'white'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">seo score</p>
              <p className="text-3xl font-bold font-mono">{score}/100</p>
            </div>
            <BarChart3 size={48} className="opacity-50" />
          </div>
          <div className="mt-3 text-xs space-y-1">
            <p>✓ Meta tags: {score > 60 ? 'Good' : 'Needs work'}</p>
            <p>✓ Page speed: {score > 70 ? 'Fast' : 'Slow'}</p>
            <p>✓ Mobile: {score > 50 ? 'Responsive' : 'Issues'}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Quiz Preview
function QuizPreview() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    { q: "What's your team size?", options: ['1-5', '6-20', '21-50', '50+'] },
    { q: "Primary goal?", options: ['Growth', 'Efficiency', 'Scale', 'Automation'] },
    { q: "Current tools?", options: ['None', 'Basic', 'Advanced', 'Enterprise'] },
  ];

  const answer = (opt: string) => {
    setAnswers([...answers, opt]);
    setStep(step + 1);
  };

  if (step >= questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 rounded-xl text-center"
        style={{ background: 'var(--color-sos-soul)', color: 'white' }}
      >
        <p className="text-xs uppercase tracking-wider mb-2 opacity-80">your result</p>
        <p className="text-xl font-bold mb-2">Growth Ready</p>
        <p className="text-xs opacity-80">You're a perfect fit for our accelerator program</p>
        <TactileButton
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={() => { setStep(0); setAnswers([]); }}
        >
          retake
        </TactileButton>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-sos-muted)' }}>
          question {step + 1} of {questions.length}
        </p>
        <div
          className="h-1 flex-1 mx-4 rounded-full overflow-hidden"
          style={{ background: 'var(--color-sos-shadow)' }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((step + 1) / questions.length) * 100}%`,
              background: 'var(--color-sos-soul)'
            }}
          />
        </div>
      </div>

      <p className="text-lg font-medium" style={{ color: 'var(--color-sos-text)' }}>
        {questions[step].q}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {questions[step].options.map((opt) => (
          <TactileButton
            key={opt}
            variant="secondary"
            size="sm"
            onClick={() => answer(opt)}
            className="justify-center"
          >
            {opt}
          </TactileButton>
        ))}
      </div>
    </div>
  );
}

export default function ToolBuilderSOS() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType | null>(null);
  const [deployedTools, setDeployedTools] = useState([
    { name: 'lead qualifier', type: 'quiz', status: 'active', uses: 234 },
    { name: 'proposal generator', type: 'roi', status: 'active', uses: 89 },
  ]);

  const handleDeploy = (templateId: TemplateType) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setDeployedTools([...deployedTools, {
        name: template.name.toLowerCase(),
        type: templateId,
        status: 'draft',
        uses: 0,
      }]);
      setActiveTemplate(null);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
              tool builder
            </h1>
            <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
              create lead-capturing tools from templates
            </p>
          </div>
        </div>

        {/* Live Analytics */}
        <div className="p-4 rounded-xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-sm)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} style={{ color: 'var(--color-sos-soul)' }} />
            <span className="text-xs font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-sos-soul)' }}>
              Tool Performance
            </span>
          </div>
          <div className="text-sm lowercase" style={{ color: 'var(--color-sos-text)' }}>
            <TypewriterText
              phrases={[
                "lead qualifier: 234 uses, 89% completion rate",
                "proposal generator saved 47 hours this month",
                "tools captured 156 new leads this week",
                "conversion rate up 34% with quiz funnel"
              ]}
              typingSpeed={42}
              deletingSpeed={21}
              pauseTime={3000}
            />
          </div>
        </div>
      </motion.div>

      {/* Template Selection */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium lowercase" style={{ color: 'var(--color-sos-text)' }}>
          choose a template
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            const isActive = activeTemplate === template.id;

            return (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTemplate(isActive ? null : template.id)}
                className="p-6 rounded-2xl border cursor-pointer transition-all"
                style={{
                  background: 'var(--color-sos-panel)',
                  borderColor: isActive ? template.color : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? `0 0 30px ${template.color}30` : 'var(--shadow-tactile-md)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: template.color }}
                >
                  <Icon size={24} color="white" />
                </div>
                <h3 className="text-lg font-semibold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                  {template.name.toLowerCase()}
                </h3>
                <p className="text-sm lowercase mb-4" style={{ color: 'var(--color-sos-muted)' }}>
                  {template.description}
                </p>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 border-t border-white/20 space-y-3"
                  >
                    <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-sos-muted)' }}>
                      preview
                    </p>

                    {template.id === 'roi' && <ROICalculatorPreview />}
                    {template.id === 'grader' && <GraderPreview />}
                    {template.id === 'quiz' && <QuizPreview />}

                    <TactileButton
                      variant="primary"
                      className="w-full mt-4"
                      onClick={(e) => { e.stopPropagation(); handleDeploy(template.id); }}
                    >
                      <Plus size={16} className="mr-2" />
                      deploy this tool
                    </TactileButton>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Deployed Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium lowercase" style={{ color: 'var(--color-sos-text)' }}>
          your tools ({deployedTools.length})
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {deployedTools.map((tool, index) => (
            <motion.div
              key={`${tool.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/40"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Wrench size={24} style={{ color: 'var(--color-sos-blue)' }} />
                <span
                  className="text-xs uppercase tracking-wider px-2 py-1 rounded"
                  style={{
                    background: tool.status === 'active' ? 'var(--color-sos-green)' : 'var(--color-sos-muted)',
                    color: 'white'
                  }}
                >
                  {tool.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                {tool.name}
              </h3>
              <p className="text-sm lowercase mb-4" style={{ color: 'var(--color-sos-muted)' }}>
                {tool.type} • {tool.uses} uses
              </p>
              <div className="flex gap-2">
                <TactileButton variant="secondary" className="flex-1" size="sm">
                  edit
                </TactileButton>
                <TactileButton variant="ghost" size="sm">
                  <ExternalLink size={16} />
                </TactileButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
