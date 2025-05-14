
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

const mockTraders = [
  {
    id: '1',
    name: 'Crypto Alpha',
    avatarUrl: '',
    yield: 24.5,
    risk: 3,
    followers: 1243,
    portfolio: {
      APT: 40,
      BTC: 25,
      ETH: 20,
      SOL: 10,
      Others: 5,
    },
  },
  {
    id: '2',
    name: 'Stable Growth',
    avatarUrl: '',
    yield: 15.2,
    risk: 2,
    followers: 2785,
    portfolio: {
      APT: 35,
      USDC: 30,
      ETH: 20,
      BTC: 10,
      Others: 5,
    },
  },
  {
    id: '3',
    name: 'Aptos Maximalist',
    avatarUrl: '',
    yield: 32.8,
    risk: 4,
    followers: 876,
    portfolio: {
      APT: 75,
      Other_Aptos_Tokens: 25,
    },
  },
];

interface TraderSelectionProps {
  riskProfile: string;
  onComplete: () => void;
}

const TraderSelection = ({ riskProfile, onComplete }: TraderSelectionProps) => {
  const [selectedTraders, setSelectedTraders] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Filter traders based on risk profile and search query
  const filteredTraders = mockTraders.filter(trader => {
    // Risk filtering (1-2 for Low, 3 for Medium, 4-5 for High)
    const matchesRisk = 
      (riskProfile === 'Low' && trader.risk <= 2) ||
      (riskProfile === 'Medium' && trader.risk === 3) ||
      (riskProfile === 'High' && trader.risk >= 4) ||
      riskProfile === ''; // If no risk filter selected
      
    // Search filtering
    const matchesSearch = trader.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRisk && matchesSearch;
  });

  const handleAllocation = (traderId: string, value: number) => {
    setSelectedTraders({
      ...selectedTraders,
      [traderId]: value,
    });
  };

  const getTotalAllocation = () => {
    return Object.values(selectedTraders).reduce((sum, value) => sum + value, 0);
  };

  const handleContinue = () => {
    const totalAllocation = getTotalAllocation();
    
    if (totalAllocation === 0) {
      toast({
        title: "No allocation selected",
        description: "Please allocate your portfolio to at least one trader.",
        variant: "destructive",
      });
      return;
    }
    
    if (totalAllocation > 100) {
      toast({
        title: "Allocation exceeds 100%",
        description: "Your total allocation cannot exceed 100%.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Portfolio set up successfully!",
      description: `You've allocated ${totalAllocation}% of your portfolio across ${Object.keys(selectedTraders).length} traders.`,
    });
    
    onComplete();
  };

  // Helper to render risk stars
  const renderRiskStars = (risk: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-4 w-4 ${star <= risk ? 'text-amber-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Portfolio visualization (simplified)
  const renderPortfolio = (portfolio: Record<string, number>) => {
    return (
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded flex overflow-hidden">
        {Object.entries(portfolio).map(([coin, percentage], index) => (
          <div
            key={coin}
            style={{ width: `${percentage}%` }}
            className={`h-full ${getColorForIndex(index)}`}
            title={`${coin}: ${percentage}%`}
          />
        ))}
      </div>
    );
  };

  const getColorForIndex = (index: number) => {
    const colors = [
      'bg-aptos-primary',
      'bg-blue-500',
      'bg-aptos-accent',
      'bg-amber-500',
      'bg-gray-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">Select Traders to Follow</h2>
        <p className="text-muted-foreground">
          Based on your {riskProfile} risk profile, we recommend these traders.
          Allocate a percentage of your portfolio to each trader you want to follow.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Search traders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <div className="text-sm font-medium">
            Total Allocation: <span className={getTotalAllocation() > 100 ? 'text-red-500' : 'text-aptos-primary'}>
              {getTotalAllocation()}%
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {filteredTraders.map((trader) => (
            <div 
              key={trader.id}
              className="gradient-card p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="mb-4 lg:mb-0 lg:mr-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-aptos-primary to-aptos-accent flex items-center justify-center text-white font-bold text-lg">
                    {trader.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium">{trader.name}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Yield:</span>{' '}
                        <span className="font-medium text-aptos-accent">+{trader.yield}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Risk:</span>{' '}
                        <span className="font-medium">{renderRiskStars(trader.risk)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Followers:</span>{' '}
                        <span className="font-medium">{trader.followers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Portfolio Distribution</div>
                      {renderPortfolio(trader.portfolio)}
                      <div className="flex justify-between mt-1">
                        {Object.entries(trader.portfolio).slice(0, 3).map(([coin]) => (
                          <span key={coin} className="text-xs text-muted-foreground">{coin}</span>
                        ))}
                        {Object.keys(trader.portfolio).length > 3 && (
                          <span className="text-xs text-muted-foreground">...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0 lg:ml-6 lg:min-w-[180px]">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Allocation</label>
                        <span className="text-sm font-medium">{selectedTraders[trader.id] || 0}%</span>
                      </div>
                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={5}
                        value={[selectedTraders[trader.id] || 0]}
                        onValueChange={(value) => handleAllocation(trader.id, value[0])}
                      />
                    </div>
                    <Button 
                      variant={selectedTraders[trader.id] ? "default" : "outline"} 
                      className={selectedTraders[trader.id] ? "bg-aptos-primary hover:bg-aptos-secondary w-full" : "w-full"}
                    >
                      {selectedTraders[trader.id] ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredTraders.length === 0 && (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">No traders match your criteria. Try adjusting your search or risk profile.</p>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Button 
          onClick={handleContinue} 
          disabled={getTotalAllocation() === 0}
          className="bg-aptos-primary hover:bg-aptos-secondary"
        >
          Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TraderSelection;
