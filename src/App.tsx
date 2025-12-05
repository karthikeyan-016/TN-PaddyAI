import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sprout } from "lucide-react";

import Home from "./pages/Home";
import PredictionDashboard from "./pages/PredictionDashboard";
import ClimateInsights from "./pages/ClimateInsights";
import RiskAnalysis from "./pages/RiskAnalysis";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SplashScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1D2430] via-[#1D2430] to-green-900/20 relative overflow-hidden">
    {/* Animated background circles */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/10 rounded-full animate-ping" />
      <div
        className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-green-400/10 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
    </div>

    <div className="flex flex-col items-center space-y-8 relative z-10">
      {/* Bouncing animated icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <Sprout
          className="w-32 h-32 text-green-500 animate-bounce relative z-10"
          strokeWidth={1.5}
        />
      </div>

      {/* Animated title */}
      <h1
        className="text-5xl font-bold text-white text-center animate-fade-in opacity-0"
        style={{ animation: "fadeIn 0.8s ease-out 0.3s forwards" }}
      >
        Tamil Nadu Rice Prediction
      </h1>

      {/* Animated progress bar */}
      <div
        className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden animate-fade-in opacity-0"
        style={{ animation: "fadeIn 0.8s ease-out 0.6s forwards" }}
      >
        <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full progress-bar" />
      </div>

      <p
        className="text-gray-400 animate-pulse opacity-0"
        style={{ animation: "fadeIn 0.8s ease-out 0.9s forwards" }}
      >
        Loading...
      </p>
    </div>

    <style>{`
      @keyframes fadeIn {
        to { opacity: 1; }
      }
      .progress-bar {
        width: 0%;
        animation: fillBar 3.5s ease-out 0.5s forwards;
      }
      @keyframes fillBar {
        to { width: 100%; }
      }
    `}</style>
  </div>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on initial load/refresh, not on navigation
    return !sessionStorage.getItem("appLoaded");
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("appLoaded", "true");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<PredictionDashboard />} />
            <Route path="/climate" element={<ClimateInsights />} />
            <Route path="/risk" element={<RiskAnalysis />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
