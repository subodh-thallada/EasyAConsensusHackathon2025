
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, TrendingUp, ChevronRight, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  info: string;
  action?: React.ReactNode;
}

const StatCard = ({ title, value, subValue, icon, info, action }: StatCardProps) => (
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
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">{info}</p>
        {action}
      </div>
    </CardContent>
  </Card>
);

const ManagerStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Assets Under Management"
        value="$125,750"
        subValue="12,575 APT"
        icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
        info="From 23 followers"
        action={
          <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
            Details <ChevronRight className="h-3 w-3" />
          </Button>
        }
      />
      <StatCard
        title="Performance"
        value="+32.6%"
        icon={<TrendingUp className="h-4 w-4 text-aptos-accent" />}
        info="Last 30 days"
        action={
          <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
            Analytics <ChevronRight className="h-3 w-3" />
          </Button>
        }
      />
      <StatCard
        title="Followers"
        value="23"
        subValue="+4 this week"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        info="3.5k AuM per follower"
        action={
          <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
            View all <ChevronRight className="h-3 w-3" />
          </Button>
        }
      />
    </div>
  );
};

export default ManagerStats;
