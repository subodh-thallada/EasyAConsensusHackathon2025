import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import TransferForm from './TransferForm';

export default function Dashboard() {
  const { account, disconnect } = useWallet();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account?.address) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/balance/${account.address}`);
        if (!response.ok) throw new Error('Failed to fetch balance');
        
        const data = await response.json();
        setBalance(data.formattedBalance);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch balance');
        console.error('Error fetching balance:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [account?.address]);

  if (!account) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Wallet Dashboard</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Wallet Address</p>
            <p className="font-mono break-all">{account.address}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-2xl font-bold">{balance}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <TransferForm onTransferComplete={() => {
            // Refresh balance after transfer
            setIsLoading(true);
            fetch(`/api/balance/${account.address}`)
              .then(res => res.json())
              .then(data => setBalance(data.formattedBalance))
              .catch(err => setError(err.message))
              .finally(() => setIsLoading(false));
          }} />
        </div>

        <div className="mt-8">
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
} 