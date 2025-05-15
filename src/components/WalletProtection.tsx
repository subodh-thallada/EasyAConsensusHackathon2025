import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

interface WalletProtectionProps {
  children: React.ReactNode;
}

const WalletProtection = ({ children }: WalletProtectionProps) => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!connected) {
      navigate('/');
    } else if (connected && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [connected, navigate, location.pathname]);

  if (!connected) {
    return null;
  }

  return <>{children}</>;
};

export default WalletProtection; 