/**
 * Offer Architect Page - Sovereign Aesthetic
 * 
 * High-ticket offer creation wizard with:
 * - Glass panel wizard steps
 * - Aurora generation effects
 * - Terminal typography output
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import {
    Sparkles,
    ArrowRight,
    ArrowLeft,
    Target,
    Users,
    DollarSign,
    CheckCircle,
    Loader2,
    Wand2,
    BookOpen,
    Copy,
    Brain
} from 'lucide-react';
import { GlassCard, GlowButton, SpotlightCard } from '@/components/GlassCard';
import { TypewriterText, PulseRing } from '@/components/Physics';

const WIZARD_STEPS = [
    { id: 'skills', title: 'EXPERTISE', icon: Sparkles },
    { id: 'audience', title: 'AUDIENCE', icon: Users },
    { id: 'transformation', title: 'TRANSFORMATION', icon: Target },
    { id: 'offer', title: 'OFFER GEN', icon: DollarSign },
];

export default function OfferArchitect() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        expertise: '',
        years: '',
        achievements: '',
        audience: '',
        painPoints: '',
        currentSolutions: '',
        transformation: '',
    });
    const [generatedOffer, setGeneratedOffer] = useState<{
        statement: string;
        methodology: string[];
        pricing: string;
        guarantee: string;
    } | null>(null);

    const handleNext = async () => {
        if (currentStep < WIZARD_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Generate offer
            setIsGenerating(true);
            await new Promise(resolve => setTimeout(resolve, 2000));

            setGeneratedOffer({
                statement: `I help ${formData.audience} go from ${formData.painPoints.split(',')[0]} to ${formData.transformation} in 90 days or less, without ${formData.currentSolutions.split(',')[0]}.`,
                methodology: [
                    "Week 1-2: Foundation Audit & Strategy Blueprint",
                    "Week 3-4: System Setup & Integration",
                    "Week 5-8: Implementation & Optimization",
                    "Week 9-12: Scaling & Sustainability",
                ],
                pricing: "Premium positioning: $5,000 - $15,000 per engagement",
                guarantee: "100% satisfaction guarantee with milestone-based payments",
            });
            setIsGenerating(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-terminal text-2xl text-[var(--text-sovereign-primary)]">OFFER ARCHITECT</h1>
                <div className="flex items-center gap-2 mt-2">
                    <Brain className="h-4 w-4 text-[var(--color-acid)]" />
                    <p className="text-sm text-[var(--text-sovereign-muted)]">
                        Construct high-ticket offers using algorithmic positioning
                    </p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between px-4">
                {WIZARD_STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center relative z-10">
                        <motion.div
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${index === currentStep
                                ? 'bg-[var(--color-acid)] text-black border-[var(--color-acid)]'
                                : index < currentStep
                                    ? 'bg-[rgba(187,255,0,0.15)] text-[var(--color-acid)] border-[var(--color-acid)]'
                                    : 'bg-[var(--color-structure)] text-[var(--text-sovereign-muted)] border-[var(--glass-sovereign-border)]'
                                }`}
                            animate={{ scale: index === currentStep ? 1.05 : 1 }}
                            transition={PHYSICS.interaction}
                        >
                            {index < currentStep ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <step.icon className="h-4 w-4" />
                            )}
                            <span className="text-terminal text-xs font-bold hidden md:inline">{step.title}</span>
                        </motion.div>
                        {index < WIZARD_STEPS.length - 1 && (
                            <div className="hidden md:block w-12 h-px mx-2"
                                style={{ background: index < currentStep ? 'var(--color-acid)' : 'var(--glass-sovereign-border)' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <GlassCard intensity="medium" className="p-8 min-h-[500px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    {!generatedOffer ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={PHYSICS.interaction}
                            className="flex-1"
                        >
                            {currentStep === 0 && (
                                <StepSkills formData={formData} setFormData={setFormData} />
                            )}
                            {currentStep === 1 && (
                                <StepAudience formData={formData} setFormData={setFormData} />
                            )}
                            {currentStep === 2 && (
                                <StepTransformation formData={formData} setFormData={setFormData} />
                            )}
                            {currentStep === 3 && (
                                <StepOffer formData={formData} isGenerating={isGenerating} />
                            )}
                        </motion.div>
                    ) : (
                        <GeneratedOffer offer={generatedOffer} onReset={() => {
                            setGeneratedOffer(null);
                            setCurrentStep(0);
                            setFormData({
                                expertise: '',
                                years: '',
                                achievements: '',
                                audience: '',
                                painPoints: '',
                                currentSolutions: '',
                                transformation: '',
                            });
                        }} />
                    )}
                </AnimatePresence>

                {/* Navigation */}
                {!generatedOffer && (
                    <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--glass-sovereign-border)' }}>
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 text-terminal text-sm px-4 py-2 rounded transition-colors ${currentStep === 0 ? 'text-[var(--text-sovereign-muted)] opacity-50 cursor-not-allowed' : 'text-[var(--text-sovereign-primary)] hover:bg-white/5'
                                }`}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            BACK
                        </button>
                        <GlowButton
                            onClick={handleNext}
                            disabled={isGenerating}
                            variant="acid"
                        >
                            {isGenerating ? (
                                <div className="flex items-center gap-2">
                                    <PulseRing color="black" size={16} />
                                    GENERATING...
                                </div>
                            ) : currentStep === WIZARD_STEPS.length - 1 ? (
                                <>
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    GENERATE OFFER
                                </>
                            ) : (
                                <>
                                    NEXT
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </GlowButton>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}

function InputField({ label, value, onChange, placeholder, multiline = false }: any) {
    return (
        <div>
            <label className="block text-terminal text-xs text-[var(--text-sovereign-muted)] mb-2">{label.toUpperCase()}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-sovereign-primary)] placeholder:text-[var(--text-sovereign-muted)] min-h-[100px] outline-none focus:border-[var(--color-acid)] transition-colors"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-[var(--color-void)] border border-[var(--glass-sovereign-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-sovereign-primary)] placeholder:text-[var(--text-sovereign-muted)] outline-none focus:border-[var(--color-acid)] transition-colors"
                />
            )}
        </div>
    );
}

function StepSkills({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium text-[var(--text-sovereign-primary)] mb-2">Identify Expertise</h2>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Input your core competencies and track record</p>
            </div>

            <InputField
                label="Core Expertise"
                value={formData.expertise}
                onChange={(e: any) => setFormData({ ...formData, expertise: e.target.value })}
                placeholder="e.g., I help agencies automate their operations..."
                multiline
            />

            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="Years Experience"
                    value={formData.years}
                    onChange={(e: any) => setFormData({ ...formData, years: e.target.value })}
                    placeholder="e.g., 8 years"
                />
                <InputField
                    label="Key Achievements"
                    value={formData.achievements}
                    onChange={(e: any) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="e.g., Scaled 50+ clients"
                />
            </div>
        </div>
    );
}

function StepAudience({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium text-[var(--text-sovereign-primary)] mb-2">Target Profile</h2>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Define the ideal client avatar</p>
            </div>

            <InputField
                label="Ideal Client Profile"
                value={formData.audience}
                onChange={(e: any) => setFormData({ ...formData, audience: e.target.value })}
                placeholder="e.g., SaaS founders doing $500K-$2M ARR"
            />

            <InputField
                label="Pain Points"
                value={formData.painPoints}
                onChange={(e: any) => setFormData({ ...formData, painPoints: e.target.value })}
                placeholder="e.g., Stuck at revenue plateau, working 60+ hour weeks..."
                multiline
            />

            <InputField
                label="Current Failed Solutions"
                value={formData.currentSolutions}
                onChange={(e: any) => setFormData({ ...formData, currentSolutions: e.target.value })}
                placeholder="e.g., Hiring VAs, multiple tools..."
            />
        </div>
    );
}

function StepTransformation({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium text-[var(--text-sovereign-primary)] mb-2">Desired Outcome</h2>
                <p className="text-sm text-[var(--text-sovereign-muted)]">Quantify the transformation delivered</p>
            </div>

            <InputField
                label="Dream Outcome"
                value={formData.transformation}
                onChange={(e: any) => setFormData({ ...formData, transformation: e.target.value })}
                placeholder="e.g., A fully automated business that runs without them..."
                multiline
            />

            <div className="glass-panel p-4 border-l-2 border-[var(--color-acid)] bg-[rgba(187,255,0,0.05)]">
                <h4 className="text-terminal text-sm text-[var(--text-sovereign-primary)] mb-2">TRANSFORMATION FORMULA</h4>
                <div className="space-y-1 text-xs text-[var(--text-sovereign-muted)]" style={{ fontFamily: 'var(--font-sovereign-mono)' }}>
                    <p><span className="text-[var(--color-acid)]">FROM:</span> {formData.painPoints.split(',')[0] || '[PAIN]'}</p>
                    <p><span className="text-[var(--color-acid)]">TO:</span> {formData.transformation || '[OUTCOME]'}</p>
                    <p><span className="text-[var(--color-acid)]">WITHOUT:</span> {formData.currentSolutions.split(',')[0] || '[EFFORT]'}</p>
                </div>
            </div>
        </div>
    );
}

function StepOffer({ formData, isGenerating }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium text-[var(--text-sovereign-primary)] mb-2">Summary Review</h2>
                <p className="text-sm text-[var(--text-sovereign-muted)]">
                    System will generate positioning based on inputs
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'EXPERTISE', val: formData.expertise },
                    { label: 'AUDIENCE', val: formData.audience },
                    { label: 'PAIN POINTS', val: formData.painPoints },
                    { label: 'TRANSFORMATION', val: formData.transformation },
                ].map((item, i) => (
                    <div key={i} className="glass-panel p-4 bg-[var(--color-void)]">
                        <h4 className="text-terminal text-[10px] text-[var(--text-sovereign-muted)] mb-2">{item.label}</h4>
                        <p className="text-sm text-[var(--text-sovereign-primary)] line-clamp-2">{item.val || 'Pending...'}</p>
                    </div>
                ))}
            </div>

            {isGenerating && (
                <div className="text-center py-12">
                    <TypewriterText text="Analyzing market positioning... constructing offer..." speed={50} loop className="text-[var(--color-acid)] text-terminal" />
                </div>
            )}
        </div>
    );
}

function GeneratedOffer({ offer, onReset }: { offer: any; onReset: () => void }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(offer.statement);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={PHYSICS.interaction}
            className="space-y-6"
        >
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-acid)] flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-black" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-[var(--text-sovereign-primary)]">OFFER GENERATED</h2>
                    <p className="text-terminal text-xs text-[var(--text-sovereign-muted)]">High-ticket framework ready</p>
                </div>
            </div>

            {/* Transformation Statement */}
            <SpotlightCard className="p-6 border border-[var(--color-acid)]">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-terminal text-sm text-[var(--color-acid)]">CORE PROMISE</h3>
                    <button onClick={copyToClipboard} className="text-[var(--text-sovereign-muted)] hover:text-[var(--color-acid)]">
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                </div>
                <p className="text-lg text-[var(--text-sovereign-primary)] leading-relaxed font-light">"{offer.statement}"</p>
            </SpotlightCard>

            {/* Methodology Map */}
            <div className="glass-panel p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-[var(--color-aurora-cyan)]" />
                    <h3 className="text-terminal text-sm text-[var(--text-sovereign-primary)]">METHODOLOGY MAP</h3>
                </div>
                <div className="space-y-3">
                    {offer.methodology.map((step: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-void)] border border-[var(--glass-sovereign-border)]"
                        >
                            <div className="h-6 w-6 rounded flex items-center justify-center text-[var(--color-acid)] font-bold text-xs bg-[rgba(187,255,0,0.1)]">
                                {i + 1}
                            </div>
                            <span className="text-sm text-[var(--text-sovereign-primary)]">{step}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing & Guarantee */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-[var(--color-aurora-purple)]" />
                        <h4 className="text-terminal text-xs text-[var(--text-sovereign-muted)]">PRICING</h4>
                    </div>
                    <p className="text-sm text-[var(--text-sovereign-primary)]">{offer.pricing}</p>
                </div>
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-[var(--color-alarm)]" />
                        <h4 className="text-terminal text-xs text-[var(--text-sovereign-muted)]">GUARANTEE</h4>
                    </div>
                    <p className="text-sm text-[var(--text-sovereign-primary)]">{offer.guarantee}</p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onReset}
                    className="text-terminal text-xs text-[var(--text-sovereign-muted)] hover:text-[var(--text-sovereign-primary)] border-b border-transparent hover:border-[var(--text-sovereign-primary)] transition-all"
                >
                    RESET WIZARD
                </button>
            </div>
        </motion.div>
    );
}
