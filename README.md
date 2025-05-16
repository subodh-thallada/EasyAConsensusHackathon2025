### Demo Video 

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/1gpxLJ-83vE/0.jpg)](https://www.youtube.com/watch?v=1gpxLJ-83vE)


### Screenshots of UI
![image](https://github.com/user-attachments/assets/6a217c61-2dc1-4ca3-8bb8-b815a1916fd5)
![image](https://github.com/user-attachments/assets/4252da85-b905-47ff-818e-7dc6f935eca5)
![image](https://github.com/user-attachments/assets/9236d22b-9254-4200-95aa-59395bcd57e6)
![image](https://github.com/user-attachments/assets/f283cce7-f12c-46f9-a646-399af3abe8c9)

### Description of interaction with relevant blockchain 

# 🔄 Smart Contract: `message_board_addr::message_board`

**Purpose:**
An on-chain messaging system that provides verifiable communication between fund managers and investors.

**Key Functions:**
- Creates a permanent on-chain object to store messages at a deterministic address
- `post_message`: Updates the current announcement visible to all investors
- `get_message_content`: Retrieves the latest message without requiring gas fees
- `exist_message`: Checks if any messages have been posted yet

**Security:**
- Utilizes Aptos's object model for reliable access control
- Implements the object extension pattern to manage message board permissions
- Creates the message board with a deterministic seed for consistent addressing
- Separates read and write operations to minimize attack surface

**Scalability:**
- Uses a singleton object pattern to minimize storage costs
- Implements view functions that don't require transactions for reading data
- Optimizes gas usage by updating existing messages rather than creating new ones
- Designed for high-frequency updates without blockchain bloat

---

# 💼 Development Tool: `Account Generation Script`

**Purpose:**
A testing framework that simulates user interactions for wallet creation and fund transfers during development.

**Key Functions:**
- Generates cryptographically secure accounts with private/public key pairs
- Funds test accounts with tokens from the devnet faucet
- Verifies account balances before and after transactions
- Logs operation results for debugging during development

**Security:**
- Creates unique accounts with secure key generation
- Demonstrates proper account handling patterns for your production code
- Isolates testing to the development network to prevent real asset exposure
- Shows the correct pattern for account creation that your app should follow

**Scalability:**
- Demonstrates how to batch operations for efficient testing
- Shows proper error handling patterns for transaction failures
- Provides a foundation for automated testing of your investment flows
- Can be extended to simulate multiple investors interacting with pools

---

# 🔌 Integration Framework: `Aptos Client Utility Module`

**Purpose:**
A standardized interface layer that ensures consistent blockchain interactions throughout your application.

**Key Functions:**
- Establishes a configured connection to the Aptos testnet
- Converts between human-readable APT and blockchain-native octas (1 APT = 100,000,000 octas)
- Verifies transaction success with proper error handling
- Centralizes blockchain configuration for consistent API access

**Security:**
- Implements robust transaction verification to prevent false success reporting
- Provides precise token conversion to prevent rounding errors in financial operations
- Centralizes network configuration to prevent connection to wrong networks
- Follows best practices for blockchain interaction patterns

**Scalability:**
- Creates a single point for network configuration changes as you move from testnet to mainnet
- Implements reusable functions to minimize code duplication across your application
- Provides standard error handling that can be expanded as your application grows
- Facilitates easy addition of new blockchain interactions as your platform evolves

### Descriptive Video
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/hiVH38nnhJg/0.jpg)](https://www.youtube.com/watch?v=uojqCXrsC2s)
