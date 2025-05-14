
import Layout from '../components/layout/Layout';
import UserStats from '../components/dashboard/UserStats';
import PortfolioValue from '../components/dashboard/PortfolioValue';
import TradersList from '../components/dashboard/TradersList';

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your investments.
          </p>
        </div>

        <UserStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <PortfolioValue />
          </div>
          <div>
            <TradersList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
