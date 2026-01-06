import { motion } from 'framer-motion';
import { Lock, Sparkles, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHYSICS } from '@/lib/animation-constants';
import { useSubscription, type PlanTier } from '@/lib/subscription';

interface ProLockProps {
    feature: string;
    requiredTier?: PlanTier;
    children: React.ReactNode;
    className?: string;
}

export function ProLock({ feature, requiredTier = 'pro', children, className = '' }: ProLockProps) {
    const { tier, isPro, isEnterprise } = useSubscription();

    const hasAccess =
        requiredTier === 'free' ? true :
            requiredTier === 'pro' ? isPro :
                isEnterprise;

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className={`relative ${className}`}>
            {/* Blurred content */}
            <div className="blur-[2px] pointer-events-none select-none opacity-50">
                {children}
            </div>

            {/* Lock overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl"
            >
                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white mb-4 shadow-lg">
                        {requiredTier === 'enterprise' ? (
                            <Crown className="h-6 w-6" />
                        ) : (
                            <Lock className="h-6 w-6" />
                        )}
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                        {requiredTier === 'enterprise' ? 'Enterprise Feature' : 'Pro Feature'}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        Unlock {feature} with {requiredTier === 'enterprise' ? 'Enterprise' : 'Pro'}
                    </p>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Upgrade to {requiredTier === 'enterprise' ? 'Enterprise' : 'Pro'}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

interface UpgradeBadgeProps {
    requiredTier?: PlanTier;
    small?: boolean;
}

export function UpgradeBadge({ requiredTier = 'pro', small = false }: UpgradeBadgeProps) {
    const { isPro, isEnterprise } = useSubscription();

    const hasAccess =
        requiredTier === 'pro' ? isPro :
            isEnterprise;

    if (hasAccess) return null;

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 font-medium ${small ? 'text-[10px]' : 'text-xs'}`}>
            <Lock className={small ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
            {requiredTier === 'enterprise' ? 'Enterprise' : 'Pro'}
        </span>
    );
}

interface UpgradeCTAProps {
    feature: string;
    description?: string;
    requiredTier?: PlanTier;
}

export function UpgradeCTA({ feature, description, requiredTier = 'pro' }: UpgradeCTAProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="raycast-panel p-6 border-l-4 border-amber-500"
        >
            <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                        Unlock {feature}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        {description || `Upgrade to ${requiredTier === 'enterprise' ? 'Enterprise' : 'Pro'} to access this feature.`}
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shrink-0">
                    Upgrade
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </motion.div>
    );
}

// Tier selector for demo/testing
export function TierSelector() {
    const { tier, setTier } = useSubscription();

    return (
        <div className="flex items-center gap-2 p-2 bg-card/50 rounded-xl border border-border/30">
            <span className="text-xs text-muted-foreground px-2">Tier:</span>
            {(['free', 'pro', 'enterprise'] as PlanTier[]).map((t) => (
                <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${tier === t
                            ? t === 'enterprise'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : t === 'pro'
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                    : 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
            ))}
        </div>
    );
}
