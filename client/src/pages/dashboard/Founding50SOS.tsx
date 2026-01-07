/**
 * Founding 50 - Sovereign OS (S.O.S.) Design
 * 
 * Exclusive founding member program with:
 * - Email capture waitlist
 * - Position tracker
 * - Referral system with shareable links
 * - Social sharing buttons
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { TactileButton } from "@/components/Sovereign";
import {
  Crown, Sparkles, Users, TrendingUp, Gift,
  Share2, Twitter, Linkedin, Copy, Check, Mail
} from "lucide-react";

interface WaitlistEntry {
  email: string;
  position: number;
  referralCode: string;
  referrals: number;
}

export default function Founding50SOS() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistEntry, setWaitlistEntry] = useState<WaitlistEntry | null>(null);
  const [copied, setCopied] = useState(false);

  const handleJoinWaitlist = async () => {
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock waitlist entry
    const position = Math.floor(Math.random() * 30) + 1;
    const referralCode = `F50-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    setWaitlistEntry({
      email,
      position,
      referralCode,
      referrals: 0,
    });

    setIsSubmitting(false);
  };

  const copyReferralLink = () => {
    if (waitlistEntry) {
      navigator.clipboard.writeText(`https://sovereignos.com/f50?ref=${waitlistEntry.referralCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const benefits = [
    { icon: Crown, title: 'lifetime access', desc: 'One payment, forever yours' },
    { icon: Sparkles, title: 'founding rate', desc: '60% off regular pricing' },
    { icon: Users, title: 'exclusive community', desc: 'Private Slack + monthly calls' },
    { icon: TrendingUp, title: 'priority features', desc: 'Your requests get built first' },
  ];

  const inputStyle = {
    background: 'var(--color-sos-base)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '16px 20px',
    color: 'var(--color-sos-text)',
    width: '100%',
    fontSize: '16px',
    outline: 'none',
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <Crown size={48} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 16px' }} />
        <h1
          className="text-5xl font-bold lowercase mb-4"
          style={{ color: 'var(--color-sos-text)' }}
        >
          founding 50
        </h1>
        <p
          className="text-xl lowercase"
          style={{ color: 'var(--color-sos-muted)' }}
        >
          join an exclusive community of 50 founding members
        </p>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 rounded-xl border border-white/40 text-center"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-sm)'
              }}
            >
              <Icon size={24} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 12px' }} />
              <h3 className="text-sm font-semibold lowercase mb-1" style={{ color: 'var(--color-sos-text)' }}>
                {benefit.title}
              </h3>
              <p className="text-xs lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                {benefit.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-2xl border border-white/40 max-w-xl mx-auto"
        style={{
          background: 'var(--color-sos-panel)',
          boxShadow: 'var(--shadow-tactile-lg)'
        }}
      >
        {!waitlistEntry ? (
          // Email Capture Form
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles size={48} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 16px' }} />
              <h2 className="text-2xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                claim your spot
              </h2>
              <p className="lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                limited to 50 founding members
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinWaitlist()}
              />
              <TactileButton
                variant="primary"
                onClick={handleJoinWaitlist}
                disabled={!email || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <Mail size={18} />
                )}
              </TactileButton>
            </div>

            <p className="text-xs text-center lowercase" style={{ color: 'var(--color-sos-muted)' }}>
              no spam, ever. only updates about founding 50 launch.
            </p>
          </div>
        ) : (
          // Waitlist Confirmation
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--color-sos-green)', boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}
              >
                <Check size={32} color="white" />
              </div>
              <h2 className="text-2xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                you're on the list!
              </h2>
              <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                position #{waitlistEntry.position} of 50
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ background: 'var(--color-sos-shadow)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(waitlistEntry.position / 50) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-sos-soul)' }}
                />
              </div>
              <p className="text-xs text-center lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                {50 - waitlistEntry.position} spots remaining
              </p>
            </div>

            {/* Referral Section */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--color-sos-base)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Gift size={18} style={{ color: 'var(--color-sos-soul)' }} />
                <span className="text-sm font-medium lowercase" style={{ color: 'var(--color-sos-text)' }}>
                  move up the list with referrals
                </span>
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  readOnly
                  value={`sovereignos.com/f50?ref=${waitlistEntry.referralCode}`}
                  style={{ ...inputStyle, fontSize: '12px', padding: '10px 12px' }}
                />
                <TactileButton variant="secondary" onClick={copyReferralLink}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </TactileButton>
              </div>

              <div className="flex justify-center gap-3">
                <TactileButton
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=I just joined the Founding 50 waitlist for Sovereign OS!&url=https://sovereignos.com/f50?ref=${waitlistEntry.referralCode}`, '_blank')}
                >
                  <Twitter size={16} className="mr-2" />
                  share
                </TactileButton>
                <TactileButton
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://sovereignos.com/f50?ref=${waitlistEntry.referralCode}`, '_blank')}
                >
                  <Linkedin size={16} className="mr-2" />
                  share
                </TactileButton>
              </div>
            </div>

            <p className="text-xs text-center lowercase" style={{ color: 'var(--color-sos-muted)' }}>
              each referral moves you 1 position higher
            </p>
          </div>
        )}
      </motion.div>

      {/* Testimonial/Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-sm italic lowercase" style={{ color: 'var(--color-sos-muted)' }}>
          "sovereign os has completely transformed how i run my agency.
          the ai agents save me 20+ hours per week."
        </p>
        <p className="text-xs mt-2 uppercase tracking-wider" style={{ color: 'var(--color-sos-text)' }}>
          — early beta tester
        </p>
      </motion.div>
    </div>
  );
}
