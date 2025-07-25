import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ModuleComplete from "./pages/module-complete";
import ModuleSchedule from "./pages/module-schedule";
import ModuleDiet from "./pages/module-diet";
import BonusPosture from "./pages/bonus-posture";
import BonusBody from "./pages/bonus-body";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/module-complete" component={ModuleComplete} />
      <Route path="/module-schedule" component={ModuleSchedule} />
      <Route path="/module-diet" component={ModuleDiet} />
      <Route path="/bonus-posture" component={BonusPosture} />
      <Route path="/bonus-body" component={BonusBody} />
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
