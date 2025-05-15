import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

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

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      if (wallets.length > 0) {
        await connect(wallets[0].name);
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
              Address: {account?.address.toString().slice(0, 6)}...{account?.address.toString().slice(-4)}
            </span>
            <span className="text-sm text-muted-foreground">
              Network: {network?.name}
            </span>
            <span className="text-sm text-muted-foreground">
              Wallet: {wallet?.name}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(getFaucetLink(), '_blank')}
            >
              Get Testnet APT
            </Button>
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