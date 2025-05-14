
import Layout from '../components/layout/Layout';
import ManagerStats from '../components/asset-manager/ManagerStats';
import PortfolioAllocation from '../components/asset-manager/PortfolioAllocation';
import TraderLeaderboard from '../components/asset-manager/TraderLeaderboard';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

const AssetManagerDashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Asset Manager Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your strategy and grow your follower base.
            </p>
          </div>
          <Button className="bg-aptos-primary hover:bg-aptos-secondary">
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        </div>

        <ManagerStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <TraderLeaderboard />
          </div>
          <div>
            <PortfolioAllocation />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssetManagerDashboard;
