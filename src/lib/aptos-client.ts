import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Initialize Aptos client with testnet configuration
const config = new AptosConfig({ 
  network: Network.TESTNET
});

// Create Aptos client instance
export const aptosClient = new Aptos(config);

// Your deployed contract address on testnet
export const CONTRACT_ADDRESS = "0x566ee672066090fd5692dc29e226897b4c6aa894bfef3f1c9075c4d16acee672"; // Replace with your actual deployed contract address

// Helper function to format APT amount to octas
export const aptToOctas = (apt: number): bigint => {
  return BigInt(Math.floor(apt * 100_000_000));
};

// Helper function to format octas to APT
export const octasToApt = (octas: bigint): number => {
  return Number(octas) / 100_000_000;
};

// Function to check if a transaction is successful
export const checkTransaction = async (hash: string): Promise<boolean> => {
  try {
    const txn = await aptosClient.waitForTransaction({ transactionHash: hash });
    return txn.success;
  } catch (error) {
    console.error("Error checking transaction:", error);
    return false;
  }
}; 