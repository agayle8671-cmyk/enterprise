import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import generatedImage from "@assets/generated_images/abstract_enterprise_technology_background_with_dark_slate_and_purple_gradients.png";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel - Visual */}
      <div className="hidden md:flex relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={generatedImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-bold mb-4">S</div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">Sovereign OS</h2>
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-xl text-slate-200 font-medium leading-relaxed mb-6">
            "Sovereign OS didn't just organize my agency, it eliminated 80% of my workload. I've scaled to $2M ARR while working 20 hours a week."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">AS</div>
            <div>
              <div className="font-semibold text-white">Alex Smith</div>
              <div className="text-sm text-slate-400">Founder, Scale Systems</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col justify-center px-8 md:px-24 bg-white">
        <div className="w-full max-w-sm mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500">Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                className="h-11 bg-slate-50 border-slate-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-11 bg-slate-50 border-slate-200"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            type="button" 
            className="w-full h-11 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
            onClick={() => {
                setLocation("/dashboard");
            }}
          >
            Admin Fast Track
          </Button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/" className="font-semibold text-blue-600 hover:text-blue-500">
              Apply for access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}