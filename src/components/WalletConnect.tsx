import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useNavigate } from 'react-router-dom';

const WalletConnect = () => {
  const {
    account,
    connect,
    connected,
    disconnect,
    network,
    wallet,
    wallets
  } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const navigate = useNavigate();

  // Initialize Aptos client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const fetchBalance = async () => {
    if (!account?.address) return;
    try {
      setIsLoadingBalance(true);
      const balance = await aptos.getAccountAPTAmount({
        accountAddress: account.address,
      });
      // Convert octas to APT (1 APT = 100,000,000 octas)
      const aptBalance = (Number(balance) / 100_000_000).toFixed(4);
      setBalance(aptBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    if (connected && account?.address) {
      fetchBalance();
    }
  }, [connected, account?.address]);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      if (wallets.length > 0) {
        await connect(wallets[0].name);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      navigate('/');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const getFaucetLink = () => {
    if (!account?.address) return 'https://aptoslabs.com/testnet-faucet';
    return `https://aptoslabs.com/testnet-faucet?address=${account.address.toString()}`;
  };

  return (
    <div className="flex items-center gap-4">
      {!connected ? (
        <Button 
          onClick={handleConnect} 
          disabled={isLoading}
          className="bg-aptos-primary hover:bg-aptos-secondary"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {account?.address.toString().slice(0, 6)}...{account?.address.toString().slice(-4)}
            </span>
            <span className="text-sm font-medium">
              Balance: {isLoadingBalance ? 'Loading...' : `${balance} APT`}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 