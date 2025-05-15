
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface Asset {
  name: string;
  value: number;
  color: string;
}

interface StrategyAllocationProps {
  strategyId: string;
}

const StrategyAllocation = ({ strategyId }: StrategyAllocationProps) => {
  // Sample allocations for each strategy
  const allocations = {
    "blue-chip": [
      { name: "BTC", value: 40, color: "#F7931A" },
      { name: "ETH", value: 30, color: "#627EEA" },
      { name: "APT", value: 10, color: "#9B87F5" },
      { name: "SOL", value: 10, color: "#00FFA3" },
      { name: "AVAX", value: 10, color: "#E84142" },
    ],
    "defi-yield": [
      { name: "AAVE", value: 25, color: "#B6509E" },
      { name: "UNI", value: 20, color: "#FF007A" },
      { name: "MKR", value: 15, color: "#6DAAF6" },
      { name: "APT", value: 20, color: "#9B87F5" },
      { name: "COMP", value: 20, color: "#00D395" },
    ],
    "aptos-innovation": [
      { name: "APT", value: 50, color: "#9B87F5" },
      { name: "Ecosystem", value: 30, color: "#7E69AB" },
      { name: "Dapps", value: 20, color: "#4ADE80" },
    ],
  };

  const data: Asset[] = allocations[strategyId as keyof typeof allocations] || allocations["blue-chip"];

  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => <span className="text-xs text-white">{value}</span>}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrategyAllocation;
