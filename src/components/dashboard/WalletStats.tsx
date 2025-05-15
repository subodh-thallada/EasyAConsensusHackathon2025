import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WalletStats = () => {
  const { account, network } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Aptos client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account?.address) return;
      try {
        setIsLoading(true);
        const balance = await aptos.getAccountAPTAmount({
          accountAddress: account.address,
        });
        // Convert octas to APT (1 APT = 100,000,000 octas)
        const aptBalance = (Number(balance) / 100_000_000).toFixed(4);
        setBalance(aptBalance);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [account?.address]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? 'Loading...' : `${balance} APT`}</div>
          <p className="text-xs text-muted-foreground">
            Current balance in your wallet
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{network?.name || 'Not Connected'}</div>
          <p className="text-xs text-muted-foreground">
            Current network you're connected to
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wallet Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-bold break-all">
            {account?.address.toString() || 'Not Connected'}
          </div>
          <p className="text-xs text-muted-foreground">
            Your wallet address
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletStats; 