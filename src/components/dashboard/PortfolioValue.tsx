
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

// Mock data for portfolio value over time
const data = [
  { date: "Jan 1", value: 5000 },
  { date: "Jan 8", value: 5200 },
  { date: "Jan 15", value: 5100 },
  { date: "Jan 22", value: 5400 },
  { date: "Jan 29", value: 5300 },
  { date: "Feb 5", value: 5600 },
  { date: "Feb 12", value: 5800 },
  { date: "Feb 19", value: 6200 },
  { date: "Feb 26", value: 6400 },
  { date: "Mar 5", value: 6300 },
  { date: "Mar 12", value: 6700 },
  { date: "Mar 19", value: 7000 },
  { date: "Mar 26", value: 7200 },
];

// Calculate percentage change
const calculateChange = () => {
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const change = ((lastValue - firstValue) / firstValue) * 100;
  return change.toFixed(2);
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-aptos-dark p-3 border rounded-lg shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-aptos-primary">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const PortfolioValue = () => {
  const change = calculateChange();
  const isPositive = parseFloat(change) >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Portfolio Value</span>
          <span className={`inline-flex items-center ${isPositive ? 'text-aptos-accent' : 'text-red-500'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {change}%
          </span>
        </CardTitle>
        <CardDescription>Total assets under management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-3xl font-bold">${data[data.length - 1].value.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">
            ~{(data[data.length - 1].value / 10).toFixed(2)} APT
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${value}`}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="rgb(155, 135, 245)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, fill: "rgb(155, 135, 245)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioValue;
