import express, { Request, Response } from 'express';
import cors from 'cors';
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Aptos client
const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

// Middleware
app.use(cors());
app.use(express.json());

/**
 * 1. need the aiblrity to retrieve the balance of an account
 * 
 * 
 * 2. need the ability to send APT from one account to another 
 * 
 * 
 *  
 * 4. need the ability to sign and submit a transaction
 */

// Get wallet balance endpoint
app.get('/api/balance/:accountAddress', async (req: Request, res: Response) => {
  try {
    const { accountAddress } = req.params;
    
    // Get account balance in octas (1 APT = 100,000,000 octas)
    const balance = await aptos.getAccountAPTAmount({
      accountAddress: accountAddress,
    });

    res.json({ 
      balance: balance,
      formattedBalance: `${Number(balance) / 100_000_000} APT` // Convert octas to APT
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ 
      error: 'Failed to fetch balance',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Transfer APT endpoint
app.post('/api/transfer', async (req: Request, res: Response) => {
  try {
    const { fromPrivateKey, toAddress, amount } = req.body;

    if (!fromPrivateKey || !toAddress || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'fromPrivateKey, toAddress, and amount are required'
      });
    }

    // Convert APT to octas (1 APT = 100,000,000 octas)
    const amountInOctas = Math.floor(Number(amount) * 100_000_000);

    // Create account from private key
    const sender = Account.fromPrivateKey({ privateKey: fromPrivateKey });

    // Submit transfer transaction
    const transaction = await aptos.transferAptos({
      sender: sender,
      recipient: toAddress,
      amount: BigInt(amountInOctas),
    });

    // Wait for transaction to complete
    const result = await aptos.waitForTransaction({
      transactionHash: transaction.hash,
    });

    res.json({
      success: true,
      transactionHash: transaction.hash,
      status: result.success ? 'completed' : 'failed',
      amount: amount,
      to: toAddress,
      from: sender.accountAddress
    });

  } catch (error) {
    console.error('Error transferring APT:', error);
    res.status(500).json({ 
      error: 'Failed to transfer APT',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Investment strategy purchase endpoint
app.post('/api/investment/purchase', async (req: Request, res: Response) => {
  try {
    const { 
      investorPrivateKey, 
      strategyId, 
      amount,
      investmentType // 'buy' or 'sell'
    } = req.body;

    if (!investorPrivateKey || !strategyId || !amount || !investmentType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'investorPrivateKey, strategyId, amount, and investmentType are required'
      });
    }

    // Convert APT amount to octas
    const amountInOctas = Math.floor(Number(amount) * 100_000_000);

    // Create investor account from private key
    const investor = Account.fromPrivateKey({ privateKey: investorPrivateKey });

    // TODO: In production, this would be fetched from your strategy smart contract
    const strategyAddress = "0x1234..."; // Replace with actual strategy contract address

    // Submit investment transaction
    const transaction = await aptos.transferAptos({
      sender: investor,
      recipient: strategyAddress,
      amount: BigInt(amountInOctas),
    });

    // Wait for transaction to complete
    const result = await aptos.waitForTransaction({
      transactionHash: transaction.hash,
    });

    // Record investment details
    const investment = {
      strategyId,
      investorAddress: investor.accountAddress,
      amount: amount,
      type: investmentType,
      timestamp: new Date(),
      transactionHash: transaction.hash,
      status: result.success ? 'completed' : 'failed'
    };

    res.json({
      success: true,
      investment,
      transactionDetails: {
        hash: transaction.hash,
        status: result.success ? 'completed' : 'failed'
      }
    });

  } catch (error) {
    console.error('Error processing investment:', error);
    res.status(500).json({ 
      error: 'Failed to process investment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Investment strategy withdrawal endpoint
app.post('/api/investment/withdraw', async (req: Request, res: Response) => {
  try {
    const { 
      investorPrivateKey, 
      strategyId, 
      amount 
    } = req.body;

    if (!investorPrivateKey || !strategyId || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'investorPrivateKey, strategyId, and amount are required'
      });
    }

    // Convert APT amount to octas
    const amountInOctas = Math.floor(Number(amount) * 100_000_000);

    // Create investor account from private key
    const investor = Account.fromPrivateKey({ privateKey: investorPrivateKey });

    // TODO: In production, this would be fetched from your strategy smart contract
    const strategyAddress = "0x1234..."; // Replace with actual strategy contract address

    // Submit withdrawal transaction
    // Note: In a real implementation, this would call a smart contract function
    // that handles the withdrawal logic and verification
    const transaction = await aptos.transferAptos({
      sender: strategyAddress, // This would actually be handled by the smart contract
      recipient: investor.accountAddress,
      amount: BigInt(amountInOctas),
    });

    // Wait for transaction to complete
    const result = await aptos.waitForTransaction({
      transactionHash: transaction.hash,
    });

    // Record withdrawal details
    const withdrawal = {
      strategyId,
      investorAddress: investor.accountAddress,
      amount: amount,
      type: 'withdraw',
      timestamp: new Date(),
      transactionHash: transaction.hash,
      status: result.success ? 'completed' : 'failed'
    };

    res.json({
      success: true,
      withdrawal,
      transactionDetails: {
        hash: transaction.hash,
        status: result.success ? 'completed' : 'failed'
      }
    });

  } catch (error) {
    console.error('Error processing withdrawal:', error);
    res.status(500).json({ 
      error: 'Failed to process withdrawal',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Sample route
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
