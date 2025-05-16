import express, { Request, Response, Router, RequestHandler } from 'express';
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

const router = Router();

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
router.get('/api/balance/:accountAddress', (async (req: Request, res: Response) => {
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
}) as RequestHandler);

// Transfer APT endpoint
router.post('/api/transfer', (async (req: Request, res: Response) => {
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
    const transaction = await aptos.transaction.build.simple({
      sender: sender.accountAddress,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [toAddress, BigInt(amountInOctas)],
      },
    });

    // Sign and submit the transaction
    const signedTxn = await aptos.signAndSubmitTransaction({
      signer: sender,
      transaction,
    });

    // Wait for transaction to complete
    const result = await aptos.waitForTransaction({
      transactionHash: signedTxn.hash,
    });

    res.json({
      success: true,
      transactionHash: signedTxn.hash,
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
}) as RequestHandler);

// Investment strategy purchase endpoint
router.post('/api/investment/purchase', (async (req: Request, res: Response) => {
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
    const transaction = await aptos.transaction.build.simple({
      sender: investor.accountAddress,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [strategyAddress, BigInt(amountInOctas)],
      },
    });

    // Sign and submit the transaction
    const signedTxn = await aptos.signAndSubmitTransaction({
      signer: investor,
      transaction,
    });

    // Wait for transaction to complete
    const result = await aptos.waitForTransaction({
      transactionHash: signedTxn.hash,
    });

    // Record investment details
    const investment = {
      strategyId,
      investorAddress: investor.accountAddress,
      amount: amount,
      type: investmentType,
      timestamp: new Date(),
      transactionHash: signedTxn.hash,
      status: result.success ? 'completed' : 'failed'
    };

    res.json({
      success: true,
      investment,
      transactionDetails: {
        hash: signedTxn.hash,
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
}) as RequestHandler);

// Investment strategy withdrawal endpoint
router.post('/api/investment/withdraw', (async (req: Request, res: Response) => {
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
    const transaction = await aptos.transaction.build.simple({
      sender: strategyAddress,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [investor.accountAddress, BigInt(amountInOctas)],
      },
    });

    // Sign and submit the transaction
    const signedTxn = await aptos.signAndSubmitTransaction({
      signer: investor,
      transaction,
    });

    // Wait for transaction to complete
    const result = await aptos.waitForTransaction({
      transactionHash: signedTxn.hash,
    });

    // Record withdrawal details
    const withdrawal = {
      strategyId,
      investorAddress: investor.accountAddress,
      amount: amount,
      type: 'withdraw',
      timestamp: new Date(),
      transactionHash: signedTxn.hash,
      status: result.success ? 'completed' : 'failed'
    };

    res.json({
      success: true,
      withdrawal,
      transactionDetails: {
        hash: signedTxn.hash,
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
}) as RequestHandler);

// Sample route
router.get('/api/hello', ((req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
}) as RequestHandler);

app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
