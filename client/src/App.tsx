import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SubscriptionProvider } from "@/lib/subscription";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/LandingSOSv2";
import Auth from "@/pages/AuthSOS";
import DashboardLayout from "@/components/layout/DashboardLayoutSOS";
import Home from "@/pages/dashboard/HomeSOS";
import Founding50 from "@/pages/dashboard/Founding50SOS";
import Buyback from "@/pages/dashboard/BuybackSOS";
import Agents from "@/pages/dashboard/AgentsSOS";
import TimeAudit from "@/pages/dashboard/TimeAuditSOS";
import OfferArchitect from "@/pages/dashboard/OfferArchitectSOS";
import ToolBuilder from "@/pages/dashboard/ToolBuilderSOS";
import Proposals from "@/pages/dashboard/ProposalsSOS";
import ClientPortal from "@/pages/dashboard/ClientPortalSOS";
import HelpCenter from "@/pages/dashboard/HelpCenterSOS";
import Settings from "@/pages/dashboard/SettingsSOS";
import SovereignDashboard from "@/pages/dashboard/SovereignDashboard";
import SovereignShowcase from "@/pages/dashboard/SovereignShowcase";
import SovereignOS from "@/pages/dashboard/SovereignOS";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />

      {/* Protected/Dashboard Routes */}
      <Route path="/dashboard">
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/agents">
        <DashboardLayout>
          <Agents />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/time-audit">
        <DashboardLayout>
          <TimeAudit />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/founding-50">
        <DashboardLayout>
          <Founding50 />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/offer-architect">
        <DashboardLayout>
          <OfferArchitect />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/tool-builder">
        <DashboardLayout>
          <ToolBuilder />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/proposals">
        <DashboardLayout>
          <Proposals />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/client-portal">
        <DashboardLayout>
          <ClientPortal />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/buyback">
        <DashboardLayout>
          <Buyback />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/help">
        <DashboardLayout>
          <HelpCenter />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/settings">
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/sovereign">
        <DashboardLayout>
          <SovereignDashboard />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/sovereign-showcase">
        <SovereignShowcase />
      </Route>

      <Route path="/dashboard/sovereign-os">
        <SovereignOS />
      </Route>

      {/* Catch-all */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Router />
          </ThemeProvider>
        </TooltipProvider>
      </SubscriptionProvider>
    </QueryClientProvider>
  );
}

export default App;