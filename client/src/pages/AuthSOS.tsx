/**
 * Auth Page - Sovereign OS (S.O.S.) Design
 * 
 * Authentication with Cognitive Luxury aesthetic
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  SOSNoiseOverlay,
  MagneticCursor,
  TactileButton,
} from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { Mail, Lock, ArrowLeft, Sparkles } from "lucide-react";

export default function AuthSOS() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - redirect to dashboard
    setLocation("/dashboard");
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ 
        background: 'var(--color-sos-base)',
        color: 'var(--color-sos-text)'
      }}
    >
      <SOSNoiseOverlay />
      <MagneticCursor />

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8"
      >
        <TactileButton
          variant="ghost"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft size={18} className="mr-2" />
          back
        </TactileButton>
      </motion.div>

      {/* Quick Dashboard Access */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 right-8"
      >
        <TactileButton
          variant="secondary"
          onClick={() => setLocation("/dashboard")}
        >
          skip to dashboard
          <ArrowRight size={18} className="ml-2" />
        </TactileButton>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="p-10 rounded-3xl border border-white/40"
          style={{
            background: 'var(--color-sos-panel)',
            boxShadow: 'var(--shadow-tactile-lg)'
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background: 'var(--color-sos-soul)',
                boxShadow: 'var(--shadow-agent-glow)'
              }}
            >
              <Sparkles size={32} color="white" />
            </div>
            <h1 
              className="text-3xl font-bold lowercase"
              style={{ color: 'var(--color-sos-text)' }}
            >
              sovereign os
            </h1>
            <div 
              className="text-sm lowercase mt-2"
              style={{ color: 'var(--color-sos-muted)' }}
            >
              <TypewriterText
                phrases={
                  isLogin 
                    ? [
                        "welcome back to cognitive luxury",
                        "your agents are ready to work",
                        "enter the architecture of focus"
                      ]
                    : [
                        "join the cognitive luxury revolution",
                        "elevate your freelancing practice",
                        "experience sovereign intelligence"
                      ]
                }
                typingSpeed={45}
                deletingSpeed={25}
                pauseTime={2500}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email"
                className="block text-sm font-medium lowercase"
                style={{ color: 'var(--color-sos-text)' }}
              >
                email address
              </label>
              <div className="relative">
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-sos-muted)' }}
                >
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/40 font-sans lowercase"
                  style={{
                    background: 'var(--color-sos-base)',
                    color: 'var(--color-sos-text)',
                    boxShadow: 'var(--shadow-tactile-inset)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-sos-soul)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password"
                className="block text-sm font-medium lowercase"
                style={{ color: 'var(--color-sos-text)' }}
              >
                password
              </label>
              <div className="relative">
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-sos-muted)' }}
                >
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/40 font-sans"
                  style={{
                    background: 'var(--color-sos-base)',
                    color: 'var(--color-sos-text)',
                    boxShadow: 'var(--shadow-tactile-inset)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-sos-soul)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <TactileButton
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
            >
              {isLogin ? 'sign in' : 'create account'}
            </TactileButton>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm lowercase transition-colors"
              style={{ color: 'var(--color-sos-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-sos-soul)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-sos-muted)';
              }}
            >
              {isLogin ? "don't have an account? sign up" : "already have an account? sign in"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div 
              className="absolute inset-0 flex items-center"
            >
              <div 
                className="w-full border-t"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              />
            </div>
            <div className="relative flex justify-center">
              <span 
                className="px-4 text-xs lowercase"
                style={{ 
                  background: 'var(--color-sos-panel)',
                  color: 'var(--color-sos-muted)'
                }}
              >
                or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <TactileButton variant="secondary" size="sm">
              google
            </TactileButton>
            <TactileButton variant="secondary" size="sm">
              github
            </TactileButton>
          </div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-xs lowercase"
          style={{ color: 'var(--color-sos-muted)' }}
        >
          by signing in, you agree to our terms of service and privacy policy
        </motion.p>
      </motion.div>
    </div>
  );
}
