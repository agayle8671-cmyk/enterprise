import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/dashboard/Home";
import Founding50 from "@/pages/dashboard/Founding50";
import Buyback from "@/pages/dashboard/Buyback";

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
      
      <Route path="/dashboard/founding-50">
        <DashboardLayout>
          <Founding50 />
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/buyback">
        <DashboardLayout>
          <Buyback />
        </DashboardLayout>
      </Route>

      {/* Catch-all */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;