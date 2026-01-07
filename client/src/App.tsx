import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SubscriptionProvider } from "@/lib/subscription";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/LandingRaycast";
import Auth from "@/pages/AuthRaycast";
import DashboardLayout from "@/components/layout/DashboardLayoutRaycast";
import Home from "@/pages/dashboard/HomeBloomberg";
import Founding50 from "@/pages/dashboard/Founding50";
import Buyback from "@/pages/dashboard/Buyback";
import Agents from "@/pages/dashboard/AgentsBloomberg";
import TimeAudit from "@/pages/dashboard/TimeAuditBloomberg";
import OfferArchitect from "@/pages/dashboard/OfferArchitect";
import ToolBuilder from "@/pages/dashboard/ToolBuilder";
import Proposals from "@/pages/dashboard/ProposalsBloomberg";
import ClientPortal from "@/pages/dashboard/ClientPortal";
import HelpCenter from "@/pages/dashboard/HelpCenter";
import Settings from "@/pages/dashboard/SettingsRaycast";
import SovereignDashboard from "@/pages/dashboard/SovereignDashboard";
import SovereignShowcase from "@/pages/dashboard/SovereignShowcase";

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