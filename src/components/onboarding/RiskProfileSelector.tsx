
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const riskProfiles = [
  {
    level: 'Low',
    description: 'Conservative strategy focusing on stable returns with minimal volatility.',
    expectedReturn: '5-10%',
    color: 'border-blue-400 bg-blue-50 dark:bg-blue-950/30',
    activeColor: 'border-blue-500 bg-blue-100 dark:bg-blue-900/50 ring-2 ring-blue-500'
  },
  {
    level: 'Medium',
    description: 'Balanced approach with moderate risk for consistent growth potential.',
    expectedReturn: '10-20%',
    color: 'border-aptos-primary bg-aptos-primary/5 dark:bg-aptos-primary/20',
    activeColor: 'border-aptos-primary bg-aptos-primary/10 dark:bg-aptos-primary/30 ring-2 ring-aptos-primary'
  },
  {
    level: 'High',
    description: 'Aggressive strategy targeting maximum growth with higher volatility.',
    expectedReturn: '20%+',
    color: 'border-aptos-accent bg-aptos-accent/5 dark:bg-aptos-accent/10',
    activeColor: 'border-aptos-accent bg-aptos-accent/10 dark:bg-aptos-accent/20 ring-2 ring-aptos-accent'
  },
];

interface RiskProfileSelectorProps {
  onComplete: (selectedRisk: string) => void;
}

const RiskProfileSelector = ({ onComplete }: RiskProfileSelectorProps) => {
  const [selectedRisk, setSelectedRisk] = useState('');
  const { toast } = useToast();

  const handleContinue = () => {
    if (!selectedRisk) {
      toast({
        title: 'Please select a risk profile',
        description: 'You need to select a risk profile to continue.',
        variant: 'destructive',
      });
      return;
    }
    
    onComplete(selectedRisk);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">Select Your Risk Profile</h2>
        <p className="text-muted-foreground">
          Choose your preferred yield/risk level to help us recommend suitable traders for your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {riskProfiles.map((profile) => (
          <div
            key={profile.level}
            className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              selectedRisk === profile.level ? profile.activeColor : profile.color
            }`}
            onClick={() => setSelectedRisk(profile.level)}
          >
            <h3 className="text-xl font-medium mb-2">{profile.level} Risk</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {profile.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Expected Return:</span>
              <span className="text-sm font-bold">{profile.expectedReturn}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedRisk} 
          className="bg-aptos-primary hover:bg-aptos-secondary"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RiskProfileSelector;
