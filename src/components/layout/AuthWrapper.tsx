import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Navigate, useLocation } from 'react-router-dom';
import WalletConnect from '../WalletConnect';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { connected } = useWallet();
  const location = useLocation();

  // Don't require wallet connection for these routes
  const publicRoutes = ['/', '/login', '/signup', '/about'];
  if (publicRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  if (!connected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please connect your wallet to access this page
          </p>
          <WalletConnect />
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 