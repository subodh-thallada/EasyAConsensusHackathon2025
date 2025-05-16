import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, TrendingUp, Users, Calendar } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  info: string;
}

const StatCard = ({ title, value, subValue, icon, info }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subValue && (
        <p className="text-xs text-muted-foreground">{subValue}</p>
      )}
      <p className="text-xs text-muted-foreground mt-2">{info}</p>
    </CardContent>
  </Card>
);

const UserStats = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Balance"
        value="$7,245"
        subValue="721.84 APT"
        icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
        info="Updated just now"
      />
      <StatCard
        title="Total Profit"
        value="+$1,876"
        subValue="+34.9%"
        icon={<TrendingUp className="h-4 w-4 text-aptos-accent" />}
        info="Since you joined"
      />
      <StatCard
        title="Followed Traders"
        value="3"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        info="Across all portfolios"
      />
      <StatCard
        title="Time Invested"
        value="47 days"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        info="First investment on Jan 28, 2023"
      />
    </div>
  );
};

export default UserStats;
