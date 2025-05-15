
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Strategy } from "../components/dashboard/StrategyCard";
import StrategyPerformanceChart from "../components/dashboard/StrategyPerformanceChart";
import StrategyAllocation from "../components/dashboard/StrategyAllocation";
import { useMemo } from "react";

const StrategyDetail = () => {
  const { id } = useParams();

  // Sample strategies data - in a real app this would come from an API
  const strategies: Strategy[] = [
    {
      id: "blue-chip",
      name: "Blue Chip Crypto Index",
      returnRate: 12.3,
      yieldPercentage: 8.1,
      riskLevel: "Low",
      description: "A diversified portfolio of established cryptocurrencies focused on stability and consistent returns. This strategy invests primarily in Bitcoin, Ethereum, and other top market cap assets."
    },
    {
      id: "defi-yield",
      name: "DeFi Yield Optimizer",
      returnRate: 24.7,
      yieldPercentage: 16.5,
      riskLevel: "Medium",
      description: "Leverages DeFi protocols to optimize yield farming strategies with automated rebalancing. This strategy uses staking, lending, and liquidity provision to generate higher returns."
    },
    {
      id: "aptos-innovation",
      name: "Aptos Innovation Fund",
      returnRate: 42.8,
      yieldPercentage: 22.3,
      riskLevel: "High",
      description: "Focuses on high-growth Aptos ecosystem projects and early-stage tokens with significant upside potential. This strategy invests in promising new protocols and applications built on the Aptos blockchain."
    }
  ];

  const strategy = useMemo(() => {
    return strategies.find(s => s.id === id) || strategies[0];
  }, [id]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-emerald-400";
      case "Medium": return "text-amber-400";
      case "High": return "text-rose-400";
      default: return "text-slate-400";
    }
  };

  // Volatility score based on risk level
  const getVolatilityScore = (risk: string) => {
    switch (risk) {
      case "Low": return "2.1";
      case "Medium": return "4.8";
      case "High": return "7.9";
      default: return "3.5";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{strategy.name}</h1>
            <p className="text-muted-foreground">
              Strategy Overview and Performance
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-aptos-primary hover:bg-aptos-primary/80 text-aptos-dark font-medium">
            Buy This ETF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <Card className="bg-[#161B22] border-[#2D333B]">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Performance History</CardTitle>
                <CardDescription>Track record over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="month">
                  <TabsList className="mb-4">
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                  <TabsContent value="day">
                    <StrategyPerformanceChart period="day" />
                  </TabsContent>
                  <TabsContent value="week">
                    <StrategyPerformanceChart period="week" />
                  </TabsContent>
                  <TabsContent value="month">
                    <StrategyPerformanceChart period="month" />
                  </TabsContent>
                  <TabsContent value="year">
                    <StrategyPerformanceChart period="year" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <div className="space-y-6">
              <Card className="bg-[#161B22] border-[#2D333B]">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Strategy Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Return</p>
                      <p className={`text-xl font-semibold ${strategy.returnRate >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                        {strategy.returnRate >= 0 ? "+" : ""}{strategy.returnRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">APY</p>
                      <p className="text-xl font-semibold text-aptos-primary">
                        {strategy.yieldPercentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className={`text-xl font-semibold ${getRiskColor(strategy.riskLevel)}`}>
                        {strategy.riskLevel}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Volatility Score</p>
                      <p className="text-xl font-semibold text-white">
                        {getVolatilityScore(strategy.riskLevel)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#161B22] border-[#2D333B]">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <StrategyAllocation strategyId={strategy.id} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="bg-[#161B22] border-[#2D333B] mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium">About This Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{strategy.description}</p>
            
            <div className="mt-6 bg-[#0D1117] p-4 rounded-md border border-[#2D333B]">
              <h3 className="font-medium text-white mb-2">Investment Strategy</h3>
              <p className="text-sm text-muted-foreground">
                This strategy uses a combination of technical analysis, market sentiment, and fundamental research to identify high-potential investment opportunities. The portfolio is regularly rebalanced to maintain optimal risk exposure and maximize returns.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StrategyDetail;
