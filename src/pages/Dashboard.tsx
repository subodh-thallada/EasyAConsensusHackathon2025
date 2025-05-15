
import Layout from '../components/layout/Layout';
import UserStats from '../components/dashboard/UserStats';
import PortfolioValue from '../components/dashboard/PortfolioValue';
import StrategyCard, { Strategy } from '../components/dashboard/StrategyCard';

const Dashboard = () => {
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
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Investment Dashboard</h1>
          <p className="text-muted-foreground">
            Choose from our curated investment strategies
          </p>
        </div>

        <UserStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {strategies.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
