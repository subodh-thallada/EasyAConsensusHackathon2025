
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

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
}

const StrategyCard = ({ strategy }: StrategyCardProps) => {
  const navigate = useNavigate();
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-emerald-900/20 text-emerald-400 border-emerald-400/20";
      case "Medium":
        return "bg-amber-900/20 text-amber-400 border-amber-400/20";
      case "High":
        return "bg-rose-900/20 text-rose-400 border-rose-400/20";
      default:
        return "bg-slate-900/20 text-slate-400 border-slate-400/20";
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
          className={`${getRiskColor(strategy.riskLevel)} text-xs px-2 py-0.5`}
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
        <Button 
          className="w-1/2 bg-aptos-primary hover:bg-aptos-primary/80 text-aptos-dark font-medium"
          onClick={() => {
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
              zIndex: 9999
            });
            // You can also trigger a toast or actual buy logic here
          }}
        >
          Buy Now
        </Button>

      </CardFooter>
    </Card>
  );
};

export default StrategyCard;
