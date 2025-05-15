import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Types } from 'aptos';

interface TransferFormProps {
  onTransferComplete?: () => void;
}

export default function TransferForm({ onTransferComplete }: TransferFormProps) {
  const { account, signAndSubmitTransaction } = useWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account?.address || !signAndSubmitTransaction) return;

    try {
      setIsLoading(true);
      setError(null);

      // Convert APT to Octas (1 APT = 100,000,000 Octas)
      const amountInOctas = BigInt(Math.floor(parseFloat(amount) * 100_000_000));

      // Submit transaction using wallet
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: "0x1::coin::transfer",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [toAddress, amountInOctas.toString()]
      };

      const result = await signAndSubmitTransaction({
        payload
      });

      if (result) {
        setToAddress('');
        setAmount('');
        onTransferComplete?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed');
      console.error('Transfer error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Transfer APT</h3>
      
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder="0x..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (APT)</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.000001"
          min="0"
          required
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : 'Send APT'}
      </Button>
    </form>
  );
} 