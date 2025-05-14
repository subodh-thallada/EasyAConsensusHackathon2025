
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const mockPortfolioData = [
  { name: "APT", value: 45, color: "#9b87f5" },
  { name: "ETH", value: 20, color: "#64748b" },
  { name: "BTC", value: 15, color: "#f59e0b" },
  { name: "USDC", value: 12, color: "#3b82f6" },
  { name: "Other", value: 8, color: "#94a3b8" },
];

const PortfolioAllocation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>Current distribution of your trading portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockPortfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {mockPortfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{ 
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value: string, entry: any) => (
                  <span className="text-sm">{value}: {entry.payload.value}%</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAllocation;
