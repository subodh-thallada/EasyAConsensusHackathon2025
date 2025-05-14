
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import RiskProfileSelector from '../components/onboarding/RiskProfileSelector';
import TraderSelection from '../components/onboarding/TraderSelection';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [riskProfile, setRiskProfile] = useState('');
  const navigate = useNavigate();

  const handleRiskProfileSelected = (risk: string) => {
    setRiskProfile(risk);
    setStep(2);
  };

  const handleTraderSelectionComplete = () => {
    // In a real app, this would save the selections to the backend
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
                <div className="relative flex justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 1 ? 'bg-aptos-primary' : 'bg-gray-200 dark:bg-gray-700'
                  } text-white font-medium text-sm`}>
                    1
                  </div>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 2 ? 'bg-aptos-primary' : 'bg-gray-200 dark:bg-gray-700'
                  } text-white font-medium text-sm`}>
                    2
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 text-center text-sm font-medium">
                <div className={step >= 1 ? 'text-aptos-primary' : 'text-muted-foreground'}>
                  Risk Profile
                </div>
                <div className={step >= 2 ? 'text-aptos-primary' : 'text-muted-foreground'}>
                  Select Traders
                </div>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && <RiskProfileSelector onComplete={handleRiskProfileSelected} />}
        {step === 2 && <TraderSelection riskProfile={riskProfile} onComplete={handleTraderSelectionComplete} />}
      </div>
    </Layout>
  );
};

export default Onboarding;
