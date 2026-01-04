import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { Button } from '@/components/ui/button';
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
    Copy
} from 'lucide-react';

const WIZARD_STEPS = [
    { id: 'skills', title: 'Your Expertise', icon: Sparkles },
    { id: 'audience', title: 'Ideal Client', icon: Users },
    { id: 'transformation', title: 'Transformation', icon: Target },
    { id: 'offer', title: 'Your Offer', icon: DollarSign },
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

    const currentStepData = WIZARD_STEPS[currentStep];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-headline text-foreground">Offer Architect</h1>
                <p className="text-muted-foreground mt-1">
                    Build a high-ticket offer that positions you as the obvious choice
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
                {WIZARD_STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <motion.div
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${index === currentStep
                                    ? 'bg-primary text-primary-foreground'
                                    : index < currentStep
                                        ? 'bg-success/20 text-success'
                                        : 'bg-card/50 text-muted-foreground'
                                }`}
                            animate={{ scale: index === currentStep ? 1.05 : 1 }}
                            transition={PHYSICS.interaction}
                        >
                            {index < currentStep ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <step.icon className="h-4 w-4" />
                            )}
                            <span className="text-sm font-medium hidden md:inline">{step.title}</span>
                        </motion.div>
                        {index < WIZARD_STEPS.length - 1 && (
                            <div className={`w-8 lg:w-16 h-0.5 mx-2 ${index < currentStep ? 'bg-success' : 'bg-border'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="glass-card p-8">
                <AnimatePresence mode="wait">
                    {!generatedOffer ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={PHYSICS.interaction}
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
                    <div className="flex justify-between mt-8 pt-6 border-t border-border/30">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            disablePhysics
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={isGenerating}
                            className="bg-gradient-primary"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : currentStep === WIZARD_STEPS.length - 1 ? (
                                <>
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    Generate Offer
                                </>
                            ) : (
                                <>
                                    Next
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function StepSkills({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-title text-foreground mb-2">What's Your Expertise?</h2>
                <p className="text-muted-foreground">Tell us about your skills and experience</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Core Expertise</label>
                <textarea
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    placeholder="e.g., I help agencies automate their operations, I'm a conversion copywriter for SaaS..."
                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground min-h-[100px]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <input
                        type="text"
                        value={formData.years}
                        onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                        placeholder="e.g., 8 years"
                        className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Key Achievements</label>
                    <input
                        type="text"
                        value={formData.achievements}
                        onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                        placeholder="e.g., Helped 50+ clients scale to $1M+"
                        className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>
        </div>
    );
}

function StepAudience({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-title text-foreground mb-2">Who's Your Ideal Client?</h2>
                <p className="text-muted-foreground">Define who you serve best</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ideal Client Profile</label>
                <input
                    type="text"
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    placeholder="e.g., SaaS founders doing $500K-$2M ARR"
                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">Their Biggest Pain Points</label>
                <textarea
                    value={formData.painPoints}
                    onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                    placeholder="e.g., Stuck at revenue plateau, working 60+ hour weeks, can't hire effectively..."
                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground min-h-[100px]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">What Are They Currently Trying?</label>
                <input
                    type="text"
                    value={formData.currentSolutions}
                    onChange={(e) => setFormData({ ...formData, currentSolutions: e.target.value })}
                    placeholder="e.g., Hiring VAs, using multiple tools, reading books..."
                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                />
            </div>
        </div>
    );
}

function StepTransformation({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-title text-foreground mb-2">What Transformation Do You Deliver?</h2>
                <p className="text-muted-foreground">Describe the end result your clients achieve</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">The Dream Outcome</label>
                <textarea
                    value={formData.transformation}
                    onChange={(e) => setFormData({ ...formData, transformation: e.target.value })}
                    placeholder="e.g., A fully automated business that runs without them, 10 hours of time reclaimed weekly..."
                    className="w-full bg-card/50 border border-border/30 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground min-h-[120px]"
                />
            </div>

            <div className="glass-card p-4 border-l-4 border-primary">
                <h4 className="font-medium text-foreground mb-2">💡 Transformation Formula</h4>
                <p className="text-sm text-muted-foreground">
                    <strong>From:</strong> {formData.painPoints.split(',')[0] || '[Current pain]'}<br />
                    <strong>To:</strong> {formData.transformation || '[Dream outcome]'}<br />
                    <strong>Without:</strong> {formData.currentSolutions.split(',')[0] || '[Failed solution]'}
                </p>
            </div>
        </div>
    );
}

function StepOffer({ formData, isGenerating }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-title text-foreground mb-2">Generate Your Offer</h2>
                <p className="text-muted-foreground">
                    We'll create your transformation statement, methodology map, and pricing guidance
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Expertise</h4>
                    <p className="text-foreground">{formData.expertise || 'Not specified'}</p>
                </div>
                <div className="glass-card p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Ideal Client</h4>
                    <p className="text-foreground">{formData.audience || 'Not specified'}</p>
                </div>
                <div className="glass-card p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Pain Points</h4>
                    <p className="text-foreground">{formData.painPoints || 'Not specified'}</p>
                </div>
                <div className="glass-card p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Transformation</h4>
                    <p className="text-foreground">{formData.transformation || 'Not specified'}</p>
                </div>
            </div>

            {isGenerating && (
                <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Crafting your high-ticket offer...</p>
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
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-title text-foreground">Your Offer is Ready!</h2>
                    <p className="text-muted-foreground">Here's your high-ticket offer framework</p>
                </div>
            </div>

            {/* Transformation Statement */}
            <div className="glass-card p-6 border-l-4 border-primary">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">Transformation Statement</h3>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard} disablePhysics>
                        {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <p className="text-lg text-foreground leading-relaxed">{offer.statement}</p>
            </div>

            {/* Methodology Map */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Methodology Map</h3>
                </div>
                <div className="space-y-3">
                    {offer.methodology.map((step: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-card/30 rounded-lg"
                        >
                            <div className="h-8 w-8 bg-primary/15 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                                {i + 1}
                            </div>
                            <span className="text-foreground">{step}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing & Guarantee */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-success" />
                        <h4 className="font-medium text-foreground">Pricing Guidance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{offer.pricing}</p>
                </div>
                <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-warning" />
                        <h4 className="font-medium text-foreground">Guarantee</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{offer.guarantee}</p>
                </div>
            </div>

            <div className="flex justify-end">
                <Button variant="outline" onClick={onReset} disablePhysics>
                    Start Over
                </Button>
            </div>
        </motion.div>
    );
}
