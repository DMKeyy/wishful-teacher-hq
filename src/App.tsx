
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Teachers from "./pages/Teachers";
import Wishes from "./pages/Wishes";
import Courses from "./pages/Courses";
import ControlPanel from "./pages/ControlPanel";
import ProfilePage from "./pages/ProfilePage";
import FormPage from "./pages/FormPage";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard Layout Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Navigate to="/wishes" replace />} />
            <Route path="wishes/*" element={<Wishes />} />
            <Route path="teachers/*" element={<Teachers />} />
            <Route path="courses/*" element={<Courses />} />
            <Route path="control-panel" element={<ControlPanel />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="form" element={<FormPage />} />
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
