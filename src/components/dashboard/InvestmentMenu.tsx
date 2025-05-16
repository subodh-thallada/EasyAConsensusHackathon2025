import confetti from 'canvas-confetti'; // at the top
import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Strategy } from './StrategyCard';
import { useToast } from "@/components/ui/use-toast";
import { CONTRACT_ADDRESS, aptToOctas, checkTransaction } from '@/lib/aptos-client';

interface InvestmentMenuProps {
  strategy: Strategy;
  onInvestmentComplete?: () => void;
}

export default function InvestmentMenu({ strategy, onInvestmentComplete }: InvestmentMenuProps) {
  const { account, signAndSubmitTransaction } = useWallet();
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account?.address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to proceed with the investment.",
        variant: "destructive"
      });
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
  
      const amountInOctas = aptToOctas(Number(amount));
      const recipientAddress = "0x4a0a5f4feaea0b8f767b581e8bf9294e8da3644b61d012a639b8fc32c0ffc5ee"; // Replace with the actual wallet address
  
      const transaction = {
        data: {
          function: "0x1::coin::transfer",
          typeArguments: ["0x1::aptos_coin::AptosCoin"],
          functionArguments: [
            recipientAddress,
            amountInOctas.toString()
          ]
        }
      };
  
      const pendingTransaction = await signAndSubmitTransaction(transaction);
      const success = await checkTransaction(pendingTransaction.hash);
  
      if (success) {

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        toast({
          title: "Transaction Successful",
          description: `Successfully sent ${amount} APT to ${recipientAddress}`,
          variant: "default"
        });
  
        setAmount('');
        onInvestmentComplete?.();
      } else {
        throw new Error('Transaction failed');
      }
  
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMessage);
      toast({
        title: "Transaction Failed",
        description: errorMessage,
        variant: "destructive"
      });
      console.error('Investment error:', err);
    } finally {
      setIsLoading(false);
    }
  };  

  const calculateExpectedReturn = () => {
    const investmentAmount = parseFloat(amount) || 0;
    const annualReturn = (strategy.returnRate / 100) * investmentAmount;
    return annualReturn.toFixed(2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-aptos-primary hover:bg-aptos-primary/80 text-aptos-dark font-medium">
          Invest Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{strategy.name}</DialogTitle>
          <DialogDescription>
            {action === 'buy' ? 'Invest in' : 'Withdraw from'} this strategy. Please enter your desired amount.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label>Action</Label>
            <Select
              value={action}
              onValueChange={(value: 'buy' | 'sell') => setAction(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy / Invest</SelectItem>
                <SelectItem value="sell">Sell / Withdraw</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Amount (APT)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          {action === 'buy' && amount && (
            <div className="space-y-2 p-4 bg-secondary rounded-lg">
              <h4 className="font-medium">Investment Summary</h4>
              <div className="text-sm space-y-1">
                <p>Risk Level: {strategy.riskLevel}</p>
                <p>Expected Annual Return: {calculateExpectedReturn()} APT</p>
                <p>Annual Yield: {strategy.yieldPercentage}%</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !amount || !account?.address}
            >
              {isLoading ? 'Processing...' : action === 'buy' ? 'Invest' : 'Withdraw'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 