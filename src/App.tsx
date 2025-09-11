import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Forms from "./pages/Forms";
import Analytics from "./pages/Analytics";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="forms" element={<Forms />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="responses" element={<Dashboard />} />
            <Route path="messages" element={<Dashboard />} />
            <Route path="settings" element={<Dashboard />} />
            <Route path="profile" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
