/**
 * Offer Architect - Sovereign OS (S.O.S.) Design
 * 
 * 4-Step Wizard for designing high-value offers:
 * 1. Expertise - Skills, experience, accomplishments
 * 2. Ideal Client - Target audience, pain points
 * 3. Transformation - Before/After state
 * 4. Generate - AI creates offer structure
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import {
  Package, Sparkles, Users, Target, DollarSign,
  ArrowRight, ArrowLeft, Check, Loader2
} from "lucide-react";

// Wizard step definition
const WIZARD_STEPS = [
  { id: 'expertise', title: 'your expertise', icon: Sparkles },
  { id: 'audience', title: 'ideal client', icon: Users },
  { id: 'transformation', title: 'transformation', icon: Target },
  { id: 'generate', title: 'generate offer', icon: DollarSign },
];

interface WizardData {
  // Step 1: Expertise
  skills: string;
  yearsExperience: string;
  accomplishments: string;
  // Step 2: Ideal Client
  targetAudience: string;
  painPoints: string;
  failedAttempts: string;
  // Step 3: Transformation
  beforeState: string;
  afterState: string;
  whatNotTaught: string;
}

export default function OfferArchitectSOS() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOffer, setGeneratedOffer] = useState<null | {
    transformationStatement: string;
    methodology: string[];
    pricing: string;
    guarantee: string;
  }>(null);

  const [formData, setFormData] = useState<WizardData>({
    skills: '',
    yearsExperience: '',
    accomplishments: '',
    targetAudience: '',
    painPoints: '',
    failedAttempts: '',
    beforeState: '',
    afterState: '',
    whatNotTaught: '',
  });

  const updateField = (field: keyof WizardData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.skills && formData.yearsExperience;
    }
    if (currentStep === 1) {
      return formData.targetAudience && formData.painPoints;
    }
    if (currentStep === 2) {
      return formData.beforeState && formData.afterState;
    }
    return true;
  };

  const generateOffer = async () => {
    setIsGenerating(true);

    // Simulate AI generation (in production, call Gemini API)
    await new Promise(resolve => setTimeout(resolve, 3000));

    setGeneratedOffer({
      transformationStatement: `Help ${formData.targetAudience} go from "${formData.beforeState}" to "${formData.afterState}" using my ${formData.yearsExperience} years of ${formData.skills} expertise.`,
      methodology: [
        'Discovery & Assessment Phase',
        'Strategy & Planning Session',
        'Implementation & Execution',
        'Optimization & Results Review',
      ],
      pricing: '$5,000 - $15,000',
      guarantee: '100% satisfaction or full refund within 30 days',
    });

    setIsGenerating(false);
  };

  const nextStep = () => {
    if (currentStep === 3) {
      generateOffer();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const inputStyle = {
    background: 'var(--color-sos-base)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'var(--color-sos-text)',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical' as const,
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-5xl font-bold lowercase" style={{ color: 'var(--color-sos-text)' }}>
          offer architect
        </h1>
        <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
          design irresistible high-value offers in 4 steps
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {WIZARD_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isComplete || isActive ? 1 : 0.5
                }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: isComplete ? 'var(--color-sos-green)' : isActive ? 'var(--color-sos-soul)' : 'var(--color-sos-panel)',
                    boxShadow: isActive ? 'var(--shadow-agent-glow)' : 'var(--shadow-tactile-sm)',
                  }}
                >
                  {isComplete ? (
                    <Check size={20} color="white" />
                  ) : (
                    <Icon size={20} color={isActive ? 'white' : 'var(--color-sos-muted)'} />
                  )}
                </div>
                <span
                  className="text-xs lowercase font-medium"
                  style={{ color: isActive ? 'var(--color-sos-text)' : 'var(--color-sos-muted)' }}
                >
                  {step.title}
                </span>
              </motion.div>

              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className="w-16 h-0.5 mx-2"
                  style={{
                    background: index < currentStep ? 'var(--color-sos-green)' : 'var(--color-sos-shadow)'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Wizard Content */}
      <motion.div
        className="max-w-2xl mx-auto p-8 rounded-2xl border border-white/40"
        style={{
          background: 'var(--color-sos-panel)',
          boxShadow: 'var(--shadow-tactile-lg)'
        }}
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Expertise */}
          {currentStep === 0 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold lowercase" style={{ color: 'var(--color-sos-text)' }}>
                what's your expertise?
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    your core skills
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., conversion copywriting, sales funnels, email marketing"
                    value={formData.skills}
                    onChange={(e) => updateField('skills', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    years of experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5+ years"
                    value={formData.yearsExperience}
                    onChange={(e) => updateField('yearsExperience', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    key accomplishments (optional)
                  </label>
                  <textarea
                    placeholder="e.g., Generated $2M+ for clients, worked with Fortune 500..."
                    value={formData.accomplishments}
                    onChange={(e) => updateField('accomplishments', e.target.value)}
                    style={textareaStyle}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Ideal Client */}
          {currentStep === 1 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold lowercase" style={{ color: 'var(--color-sos-text)' }}>
                who's your ideal client?
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    target audience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., SaaS founders at $1-5M ARR"
                    value={formData.targetAudience}
                    onChange={(e) => updateField('targetAudience', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    their biggest pain points
                  </label>
                  <textarea
                    placeholder="e.g., Low conversion rates, high churn, struggling to scale..."
                    value={formData.painPoints}
                    onChange={(e) => updateField('painPoints', e.target.value)}
                    style={textareaStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    what have they tried that failed?
                  </label>
                  <textarea
                    placeholder="e.g., Generic marketing agencies, DIY templates..."
                    value={formData.failedAttempts}
                    onChange={(e) => updateField('failedAttempts', e.target.value)}
                    style={textareaStyle}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Transformation */}
          {currentStep === 2 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold lowercase" style={{ color: 'var(--color-sos-text)' }}>
                what transformation do you create?
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    before state (where they are now)
                  </label>
                  <textarea
                    placeholder="e.g., Wasting money on ads that don't convert..."
                    value={formData.beforeState}
                    onChange={(e) => updateField('beforeState', e.target.value)}
                    style={textareaStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    after state (where they'll be)
                  </label>
                  <textarea
                    placeholder="e.g., Predictable pipeline of qualified leads, 3x ROAS..."
                    value={formData.afterState}
                    onChange={(e) => updateField('afterState', e.target.value)}
                    style={textareaStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm lowercase mb-2" style={{ color: 'var(--color-sos-muted)' }}>
                    what do you teach that others don't?
                  </label>
                  <textarea
                    placeholder="e.g., My proprietary 'Revenue Engine' framework..."
                    value={formData.whatNotTaught}
                    onChange={(e) => updateField('whatNotTaught', e.target.value)}
                    style={textareaStyle}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Generate */}
          {currentStep === 3 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold lowercase" style={{ color: 'var(--color-sos-text)' }}>
                {generatedOffer ? 'your offer blueprint' : 'ready to generate?'}
              </h2>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 size={48} className="animate-spin mb-4" style={{ color: 'var(--color-sos-soul)' }} />
                  <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                    <TypewriterText
                      phrases={[
                        "analyzing your expertise...",
                        "mapping transformation journey...",
                        "calculating value stack...",
                        "building offer architecture..."
                      ]}
                      typingSpeed={50}
                      deletingSpeed={30}
                      pauseTime={1500}
                    />
                  </p>
                </div>
              ) : generatedOffer ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl" style={{ background: 'var(--color-sos-base)' }}>
                    <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-sos-soul)' }}>
                      transformation statement
                    </h3>
                    <p className="text-lg" style={{ color: 'var(--color-sos-text)' }}>
                      {generatedOffer.transformationStatement}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: 'var(--color-sos-base)' }}>
                    <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-sos-soul)' }}>
                      methodology map
                    </h3>
                    <ul className="space-y-2">
                      {generatedOffer.methodology.map((step, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: 'var(--color-sos-soul)', color: 'white' }}
                          >
                            {i + 1}
                          </div>
                          <span style={{ color: 'var(--color-sos-text)' }}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: 'var(--color-sos-base)' }}>
                      <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-sos-green)' }}>
                        suggested pricing
                      </h3>
                      <p className="text-2xl font-bold font-mono" style={{ color: 'var(--color-sos-text)' }}>
                        {generatedOffer.pricing}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl" style={{ background: 'var(--color-sos-base)' }}>
                      <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-sos-blue)' }}>
                        guarantee
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-sos-text)' }}>
                        {generatedOffer.guarantee}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package size={64} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 16px' }} />
                  <p className="text-lg lowercase mb-4" style={{ color: 'var(--color-sos-muted)' }}>
                    we'll use your inputs to generate a complete offer blueprint
                  </p>
                  <ul className="text-sm lowercase space-y-2" style={{ color: 'var(--color-sos-text)' }}>
                    <li>✓ transformation statement</li>
                    <li>✓ methodology map</li>
                    <li>✓ pricing recommendations</li>
                    <li>✓ risk-reversal guarantee</li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
          <TactileButton
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={18} className="mr-2" />
            back
          </TactileButton>

          {generatedOffer ? (
            <TactileButton variant="primary" onClick={() => {
              setCurrentStep(0);
              setGeneratedOffer(null);
              setFormData({
                skills: '', yearsExperience: '', accomplishments: '',
                targetAudience: '', painPoints: '', failedAttempts: '',
                beforeState: '', afterState: '', whatNotTaught: '',
              });
            }}>
              create new offer
            </TactileButton>
          ) : (
            <TactileButton
              variant="primary"
              onClick={nextStep}
              disabled={!canProceed() || isGenerating}
            >
              {currentStep === 3 ? 'generate' : 'next'}
              {currentStep !== 3 && <ArrowRight size={18} className="ml-2" />}
            </TactileButton>
          )}
        </div>
      </motion.div>
    </div>
  );
}
