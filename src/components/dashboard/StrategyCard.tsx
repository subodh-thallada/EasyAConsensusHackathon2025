import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvestmentMenu from "./InvestmentMenu";

export interface Strategy {
  id: string;
  name: string;
  returnRate: number;
  yieldPercentage: number;
  riskLevel: "Low" | "Medium" | "High";
  description: string;
}

interface StrategyCardProps {
  strategy: Strategy;
  onInvestmentComplete?: () => void;
}

const StrategyCard = ({ strategy, onInvestmentComplete }: StrategyCardProps) => {
  const navigate = useNavigate();
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="bg-[#161B22] border-[#2D333B] shadow-lg hover:shadow-[#00FFAA]/5 transition-all duration-300 hover:ring-1 hover:ring-[#00FFAA]/10 group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-[#C9D1D9] group-hover:text-white transition-colors">
          {strategy.name}
        </CardTitle>
        <Badge 
          variant="outline" 
          className={getRiskColor(strategy.riskLevel)}
        >
          {strategy.riskLevel} Risk
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Return Rate</p>
            <div className="flex items-center">
              {strategy.returnRate >= 0 ? (
                <ArrowUp className="h-4 w-4 text-emerald-400 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-rose-500 mr-1" />
              )}
              <p className={`text-xl font-semibold ${
                strategy.returnRate >= 0 ? "text-emerald-400" : "text-rose-500"
              }`}>
                {strategy.returnRate >= 0 ? "+" : ""}{strategy.returnRate}%
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">APY</p>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-aptos-primary mr-1" />
              <p className="text-xl font-semibold text-aptos-primary">
                {strategy.yieldPercentage}%
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {strategy.description}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="w-1/2 border-[#2D333B] hover:bg-[#2D333B] hover:text-white"
          onClick={() => navigate(`/strategy/${strategy.id}`)}
        >
          View Details
        </Button>
        <div className="w-1/2">
          <InvestmentMenu 
            strategy={strategy}
            onInvestmentComplete={onInvestmentComplete}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default StrategyCard;
