
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { useState, useEffect } from "react";

interface PerformanceData {
  date: string;
  value: number;
}

interface StrategyPerformanceChartProps {
  period: "day" | "week" | "month" | "year";
}

const StrategyPerformanceChart = ({ period }: StrategyPerformanceChartProps) => {
  const [data, setData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    // Generate mock data based on the selected period
    const mockData: PerformanceData[] = [];
    let startValue = 10000;
    let days = 0;
    
    switch(period) {
      case "day":
        days = 24; // Hours
        break;
      case "week":
        days = 7;
        break;
      case "month":
        days = 30;
        break;
      case "year":
        days = 12; // Months
        break;
    }
    
    for (let i = 0; i < days; i++) {
      // Random fluctuation with slight upward bias
      const fluctuation = (Math.random() - 0.4) * (period === "day" ? 1 : 5);
      const newValue = startValue * (1 + (fluctuation / 100));
      startValue = newValue;
      
      let dateLabel;
      if (period === "day") {
        dateLabel = `${i}:00`;
      } else if (period === "week") {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        dateLabel = days[i % 7];
      } else if (period === "month") {
        dateLabel = `Day ${i+1}`;
      } else {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        dateLabel = months[i % 12];
      }
      
      mockData.push({
        date: dateLabel,
        value: Math.round(newValue * 100) / 100
      });
    }
    
    setData(mockData);
  }, [period]);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0D1117] p-2 border border-[#2D333B] rounded shadow-md">
          <p className="text-xs text-white">{label}</p>
          <p className="text-xs font-semibold text-aptos-primary">
            ${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  const calculatePercentageChange = () => {
    if (data.length < 2) return 0;
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  const percentageChange = calculatePercentageChange();
  const isPositive = percentageChange >= 0;

  return (
    <div>
      <div className="mb-4">
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
          {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
        </span>
        <span className="text-xs text-muted-foreground ml-2">
          {period === "day" ? "Today" : period === "week" ? "This Week" : period === "month" ? "This Month" : "This Year"}
        </span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2D333B" vertical={false} />
            <XAxis 
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B949E', fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B949E', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString(undefined, { notation: 'compact' })}`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#00FFAA" : "#F87171"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: isPositive ? "#00FFAA" : "#F87171" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StrategyPerformanceChart;
