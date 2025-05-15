import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import AuthWrapper from './components/layout/AuthWrapper';

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import StrategyDetail from "./pages/StrategyDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { addSeconds } from 'date-fns';

const queryClient = new QueryClient();

// Separate component to use wallet hook inside provider
const AppContent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthWrapper>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/strategy/:id" element={<StrategyDetail />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => {
        console.log("error", error);
      }}
    >
      <AppContent />
    </AptosWalletAdapterProvider>
  );
};

export default App;
