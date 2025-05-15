import { useWallet } from '@aptos-labs/wallet-adapter-react';
import WalletConnect from '../components/WalletConnect';
import Layout from '../components/layout/Layout';
import UserStats from '../components/dashboard/UserStats';
import PortfolioValue from '../components/dashboard/PortfolioValue';
import StrategyCard, { Strategy } from '../components/dashboard/StrategyCard';
import WalletProtection from '../components/WalletProtection';
import WalletStats from '../components/dashboard/WalletStats';

export default function Dashboard() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please connect your wallet to view your dashboard
            </p>
            <WalletConnect />
          </div>
        </div>
      </Layout>
    );
  }

  // Sample investment strategies data
  const strategies: Strategy[] = [
    {
      id: "blue-chip",
      name: "Blue Chip Crypto Index",
      returnRate: 12.3,
      yieldPercentage: 8.1,
      riskLevel: "Low",
      description: "A diversified portfolio of established cryptocurrencies focused on stability and consistent returns."
    },
    {
      id: "defi-yield",
      name: "DeFi Yield Optimizer",
      returnRate: 24.7,
      yieldPercentage: 16.5,
      riskLevel: "Medium",
      description: "Leverages DeFi protocols to optimize yield farming strategies with automated rebalancing."
    },
    {
      id: "aptos-innovation",
      name: "Aptos Innovation Fund",
      returnRate: 42.8,
      yieldPercentage: 22.3,
      riskLevel: "High",
      description: "Focuses on high-growth Aptos ecosystem projects and early-stage tokens with significant upside potential."
    }
  ];

  return (
    <WalletProtection>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Investment Dashboard</h1>
            <p className="text-muted-foreground">
              Choose from our curated investment strategies
            </p>
          </div>

          <WalletStats />
          <UserStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {strategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </div>
        </div>
      </Layout>
    </WalletProtection>
  );
}
