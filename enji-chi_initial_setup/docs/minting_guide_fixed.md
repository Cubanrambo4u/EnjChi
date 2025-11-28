# Enji-Chi Genesis Eggs: NFT Minting Guide

**Last Updated**: November 28, 2025  
**Network**: Enjin Matrixchain Testnet  
**Collection**: Enji-chi Genesis Eggs

---

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites and Account Setup](#prerequisites-and-account-setup)
3. [Getting Testnet Tokens](#getting-testnet-tokens)
4. [Creating Your NFT Collection](#creating-your-nft-collection)
5. [Minting Your First Enji-chi Egg](#minting-your-first-enji-chi-egg)
6. [Configuring the Game Integration](#configuring-the-game-integration)
7. [Testnet RPC Configuration](#testnet-rpc-configuration)
8. [Troubleshooting Common Issues](#troubleshooting-common-issues)
9. [Best Practices for NFT Metadata](#best-practices-for-nft-metadata)
10. [Next Steps](#next-steps)

---

## Introduction

Welcome to the Enji-Chi Genesis Eggs minting guide! This document will walk you through the complete process of creating your first NFT collection and minting "Enji-chi Egg #001" on the Enjin Matrixchain testnet.

### What is Enji-Chi?

Enji-Chi is a web-based blockchain game that combines the nostalgia of virtual pets with modern NFT technology. Each Enji-chi begins life as a Genesis Egg NFT that players can hatch and nurture into unique digital companions.

### What You'll Accomplish

By following this guide, you will:
- Create an Enjin Platform account
- Set up your wallet for the Matrixchain testnet
- Obtain testnet tokens for transactions
- Create the "Enji-chi Genesis Eggs" NFT collection
- Mint your first egg NFT: "Enji-chi Egg #001"
- Integrate your collection with the Enji-Chi game
- Test NFT ownership verification in the game

### Why Use the Testnet?

The testnet environment allows you to:
- Test all functionality without spending real money
- Experiment with different configurations safely
- Verify your game integration works correctly
- Learn the minting process before moving to mainnet

---

## Prerequisites and Account Setup

### Required Accounts

Before you begin, you'll need to create an Enjin Platform account.

#### Creating an Enjin Platform Account

1. **Navigate to the Enjin Platform**
   - Visit: [https://platform.canary.enjin.io/](https://platform.canary.enjin.io/)
   - This is the official Enjin Platform Cloud interface

2. **Sign Up**
   - Click the "Create an account" button
   - Enter your email address
   - Create a secure password
   - Accept the terms of service

3. **Verify Your Email**
   - Check your inbox for a verification email from Enjin
   - Click the verification link
   - You'll be redirected back to the platform

4. **Generate Your API Key**
   - After logging in, navigate to **Account Settings**
   - Go to the **Daemon Wallet** section
   - Click **"Generate API Token"**
   - **Important**: Copy and save this token securely - you'll need it later
   - This API key enables your wallet daemon to interact with the Enjin blockchain

### Wallet Setup Requirements

You'll need a compatible Web3 wallet to interact with the Enjin Matrixchain. The Enji-Chi game supports:

- **MetaMask** (Recommended for beginners)
- **WalletConnect-compatible wallets**
- **Enjin Wallet**

#### Setting Up MetaMask

If you don't have MetaMask installed:

1. Visit [https://metamask.io/](https://metamask.io/)
2. Download and install the browser extension
3. Create a new wallet or import an existing one
4. **Save your seed phrase securely** - never share it with anyone

---

## Getting Testnet Tokens

To mint NFTs on the testnet, you'll need testnet tokens to pay for gas fees. These tokens have no real-world value and are free to obtain.

### Testnet Token Acquisition Methods

#### Method 1: Multi-Chain Faucets

Several faucet platforms support blockchain testnets:

**Chainstack Faucet**
1. Visit: [https://chainstack.com/faucets/](https://chainstack.com/faucets/)
2. Select the appropriate testnet
3. Enter your wallet address
4. Complete any verification (CAPTCHA)
5. Request tokens
6. Tokens typically arrive within 1-5 minutes
7. You can refill every 24 hours

**Alchemy Faucet**
1. Visit: [https://www.alchemy.com/faucets](https://www.alchemy.com/faucets)
2. Connect your wallet or enter your address
3. Select the testnet network
4. Request tokens
5. Wait for confirmation

#### Method 2: Enjin Community Channels

- Join the official Enjin Discord server
- Request testnet tokens in the developer channels
- Community members and moderators can assist

### Verifying Token Receipt

1. Open your MetaMask wallet
2. Ensure you're connected to the Enjin Matrixchain Testnet (see [Testnet RPC Configuration](#testnet-rpc-configuration))
3. Check your balance - you should see testnet tokens
4. You'll need a small amount for gas fees (typically 0.01-0.1 tokens per transaction)

---

## Creating Your NFT Collection

Now that you have your account and testnet tokens, it's time to create your NFT collection.

### Step 1: Access the Collections Interface

1. Log in to the Enjin Platform at [https://platform.canary.enjin.io/](https://platform.canary.enjin.io/)
2. In the main navigation menu, click on **"Collections"**
3. You'll see a list of your existing collections (empty if this is your first time)

### Step 2: Create a New Collection

1. Click the **"Create Collection"** button (usually in the top-right corner)
2. You'll be presented with a collection creation form

### Step 3: Configure Collection Details

Fill out the following fields:

#### Basic Information

**Collection Name**: `Enji-chi Genesis Eggs`
- This is the name that will appear on blockchain explorers and marketplaces

**Collection Description**: 
```
The Genesis Eggs collection contains the first generation of Enji-chi virtual pets. Each egg is a unique NFT that can be hatched in the Enji-Chi game to reveal your digital companion. These eggs represent the beginning of your Enji-chi journey.
```

**Collection Symbol**: `EJIEGG`
- A short identifier for your collection (typically 3-6 characters)

#### Collection Properties

**Mint Policy**:
- Select **"Controlled"** - This allows you to control who can mint tokens
- For a game-controlled minting process, this is the recommended setting

**Market Policy**:
- **Royalty**: Set to `5%` (optional - this gives you a percentage of secondary sales)
- **Transferable**: Enable this to allow players to trade their eggs
- **Burnable**: Enable this if you want eggs to be "consumed" when hatched

**Supply Settings**:
- **Max Token Count**: `1000` (or your desired maximum number of eggs)
- **Max Token Supply**: Leave blank for unlimited supply per token, or set a specific number

#### Advanced Settings (Optional)

**Attributes**:
You can add collection-level attributes that will apply to all tokens:
- `type`: `Genesis`
- `generation`: `1`
- `game`: `Enji-Chi`

### Step 4: Submit Collection Creation

1. Review all your settings carefully
2. Click **"Create Collection"**
3. Your wallet will prompt you to sign the transaction
4. Confirm the transaction in your wallet
5. Wait for blockchain confirmation (typically 6-12 seconds on Matrixchain)

### Step 5: Obtain Your Collection ID

After the transaction is confirmed:

1. You'll be redirected to your collection's detail page
2. **Copy the Collection ID** - this is a long hexadecimal string (e.g., `0x1234...abcd`)
3. Save this ID securely - you'll need it for:
   - Minting tokens
   - Configuring the game
   - API interactions

**What you should see:**
- Collection name: "Enji-chi Genesis Eggs"
- Status: "Active" or "Confirmed"
- Your wallet address as the collection owner
- The Collection ID prominently displayed

---

## Minting Your First Enji-chi Egg

Now that your collection is created, it's time to mint your first NFT!

### Step 1: Navigate to Token Creation

1. From your collection's detail page, click on the **"Tokens"** tab
2. Click the **"Create Token"** button

### Step 2: Configure Token Details

#### Basic Token Information

**Token ID**: `1`
- This will be your first egg, so use ID 1
- Each subsequent egg will have a sequential ID (2, 3, 4, etc.)

**Token Name**: `Enji-chi Egg #001`
- Use leading zeros for better sorting (e.g., #001, #002, #010, #100)

**Token Description**:
```
Genesis Egg #001 - The first Enji-chi egg ever created. This rare egg contains a mysterious creature waiting to be hatched. What will emerge from this digital egg? Only time will tell...
```

#### Token Supply

**Initial Supply**: `1`
- For unique NFTs, mint only 1 copy
- For semi-fungible tokens, you can mint multiple copies

**Cap**: `1`
- This ensures only 1 copy of this specific egg can ever exist

### Step 3: Add Token Metadata

Metadata makes your NFT discoverable and displayable in wallets and marketplaces.

#### Preparing Your Egg Image

Before adding metadata, you should have your egg image ready:

**Recommended Image Specifications**:
- Format: PNG (with transparency) or JPG
- Size: 512x512 pixels minimum, 1024x1024 recommended
- Aspect Ratio: 1:1 (square)
- File Size: Under 10MB
- Color Space: RGB

#### Uploading to IPFS

For decentralized storage, upload your image to IPFS:

1. Use a service like:
   - [Pinata](https://pinata.cloud/) (recommended)
   - [NFT.Storage](https://nft.storage/)
   - [Web3.Storage](https://web3.storage/)

2. Upload your egg image
3. Copy the IPFS hash (e.g., `QmX...abc`)
4. Your image URL will be: `ipfs://QmX...abc`

#### Metadata JSON Structure

In the Enjin Platform, add metadata using this structure:

```json
{
  "name": "Enji-chi Egg #001",
  "description": "Genesis Egg #001 - The first Enji-chi egg ever created. This rare egg contains a mysterious creature waiting to be hatched.",
  "image": "ipfs://YOUR_IPFS_HASH_HERE",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    },
    {
      "trait_type": "Generation",
      "value": "Genesis"
    },
    {
      "trait_type": "Egg Number",
      "value": "001"
    },
    {
      "trait_type": "Status",
      "value": "Unhatched"
    },
    {
      "trait_type": "Type",
      "value": "Mystery"
    }
  ]
}
```

**How to add metadata in the Platform**:

1. In the token creation form, find the **"Metadata"** section
2. You can either:
   - **Option A**: Paste the JSON directly
   - **Option B**: Use the form fields to add each attribute individually

3. For the image field:
   - Enter your IPFS URL: `ipfs://YOUR_IPFS_HASH`
   - Or use an HTTP URL if you prefer centralized hosting

### Step 4: Mint the Token

1. Review all token details carefully
2. Click **"Mint Token"** or **"Create Token"**
3. In the Tokens section, locate your newly created token
4. Click the three vertical dots (⋮) next to the token
5. Select **"Mint"** from the dropdown menu
6. Specify the recipient address (your wallet address for testing)
7. Confirm the quantity (1 for this unique egg)
8. Click **"Confirm Mint"**

### Step 5: Confirm the Transaction

1. Your wallet (MetaMask) will pop up with a transaction request
2. Review the transaction details:
   - Network: Enjin Matrixchain Testnet
   - Gas fee: Should be very small (testnet tokens)
   - Action: Minting NFT
3. Click **"Confirm"**
4. Wait for blockchain confirmation (6-12 seconds)

### Step 6: Verify Your NFT

After confirmation:

1. You should see a success message in the Enjin Platform
2. The token status will change to "Minted"
3. Check your wallet:
   - Open MetaMask
   - Go to the "NFTs" tab
   - You should see "Enji-chi Egg #001"
   - Click on it to view details

**What you should see:**
- Token name and image
- Collection name
- Token ID
- Your wallet address as the owner

---

## Configuring the Game Integration

Now that you've minted your first egg, you need to connect it to the Enji-Chi game.

### Step 1: Locate Your Collection ID

If you didn't save it earlier:

1. Go to the Enjin Platform
2. Navigate to **Collections**
3. Click on "Enji-chi Genesis Eggs"
4. Copy the **Collection ID** (the long hexadecimal string)

### Step 2: Update the Game Configuration

The Enji-Chi game needs to know which collection to check for NFT ownership.

1. Navigate to your game project directory
2. Open the file: `final/src/config/sdk.config.ts`

3. Find the configuration section that looks like this:

```typescript
export const enjinConfig = {
  platform: {
    apiUrl: 'https://platform.canary.enjin.io/graphql',
    network: 'matrixchain-testnet'
  },
  collection: {
    // Add your Collection ID here
    collectionId: 'YOUR_COLLECTION_ID_HERE'
  },
  wallet: {
    chainId: 6678,
    rpcUrl: 'https://enjin-matrix-rpc.n.dwellir.com/'
  }
}
```

4. Replace `'YOUR_COLLECTION_ID_HERE'` with your actual Collection ID:

```typescript
collectionId: '0x1234567890abcdef...' // Your actual Collection ID
```

5. Save the file

### Step 3: Configure API Key (If Required)

If your game uses the Enjin Platform API directly:

1. Create a `.env` file in the `final/` directory (if it doesn't exist)
2. Add your API key:

```env
VITE_ENJIN_API_KEY=your_api_key_here
VITE_COLLECTION_ID=your_collection_id_here
```

3. Make sure `.env` is in your `.gitignore` to keep your API key secure

### Step 4: Test the Integration

1. Start the development server:
```bash
cd final
npm install
npm run dev
```

2. Open the game in your browser (typically `http://localhost:5173`)

3. Connect your wallet:
   - Click the "Connect Wallet" button
   - Select MetaMask (or your preferred wallet)
   - Approve the connection

4. Verify NFT detection:
   - The game should detect your "Enji-chi Egg #001" NFT
   - The egg sprite should appear on screen
   - The "HATCH NOW" button should be enabled

5. Test the hatch functionality:
   - Click "HATCH NOW"
   - Confirm the transaction in your wallet
   - Wait for confirmation
   - The game should respond to the successful transaction

---

## Testnet RPC Configuration

To interact with the Enjin Matrixchain testnet, you need to add the network to your wallet.

### Enjin Matrixchain Testnet Specifications

- **Network Name**: Enjin Matrixchain Testnet
- **Chain ID**: 6678
- **RPC URL**: https://enjin-matrix-rpc.n.dwellir.com/
- **Currency Symbol**: ENJ
- **Block Explorer**: (Check official Enjin documentation for the latest explorer URL)

### Adding the Network to MetaMask

#### Method 1: Manual Configuration

1. Open MetaMask
2. Click on the network dropdown (top of the extension)
3. Click **"Add Network"** or **"Add a network manually"**
4. Enter the following details:

   - **Network Name**: `Enjin Matrixchain Testnet`
   - **New RPC URL**: `https://enjin-matrix-rpc.n.dwellir.com/`
   - **Chain ID**: `6678`
   - **Currency Symbol**: `ENJ`
   - **Block Explorer URL**: (Leave blank or check Enjin docs)

5. Click **"Save"**
6. MetaMask will switch to the new network automatically

#### Method 2: Programmatic Addition (For Developers)

You can add a button in your game to automatically add the network:

```typescript
async function addEnjinTestnet() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x1A0E', // 6678 in hexadecimal
        chainName: 'Enjin Matrixchain Testnet',
        nativeCurrency: {
          name: 'Enjin Coin',
          symbol: 'ENJ',
          decimals: 18
        },
        rpcUrls: ['https://enjin-matrix-rpc.n.dwellir.com/'],
        blockExplorerUrls: []
      }]
    });
  } catch (error) {
    console.error('Failed to add network:', error);
  }
}
```

### Verifying Network Connection

1. Open MetaMask
2. Check that the network dropdown shows "Enjin Matrixchain Testnet"
3. Your testnet token balance should be visible
4. Try sending a small test transaction to verify connectivity

### Network Performance

As of January 2025, the Enjin Matrixchain features:
- **Block Time**: 6 seconds (improved from 12 seconds)
- **Network Speed**: 100% faster than previous versions
- **Finality**: Fast finality for quick transaction confirmation

---

## Troubleshooting Common Issues

### Connection Problems

#### Issue: "Cannot connect to Enjin Platform"

**Solutions**:
1. Check your internet connection
2. Verify you're using the correct Platform URL: `https://platform.canary.enjin.io/`
3. Clear your browser cache and cookies
4. Try a different browser
5. Check Enjin's status page for any service outages

#### Issue: "Wallet won't connect to the game"

**Solutions**:
1. Ensure MetaMask is unlocked
2. Verify you're on the correct network (Enjin Matrixchain Testnet)
3. Refresh the page and try again
4. Check that the game has permission to connect to your wallet
5. Try disconnecting and reconnecting your wallet

#### Issue: "Wrong network" error

**Solutions**:
1. Open MetaMask
2. Switch to "Enjin Matrixchain Testnet"
3. If the network isn't listed, add it manually (see [Testnet RPC Configuration](#testnet-rpc-configuration))
4. Refresh the game page

### Transaction Failures

#### Issue: "Transaction failed" or "Out of gas"

**Solutions**:
1. Check your testnet token balance - you need tokens for gas fees
2. Get more testnet tokens from a faucet
3. Try increasing the gas limit in MetaMask (Advanced settings)
4. Wait a few minutes and try again - the network might be congested

#### Issue: "Transaction pending forever"

**Solutions**:
1. Check the transaction on a block explorer
2. The transaction might be stuck - you can try to speed it up or cancel it in MetaMask
3. If cancelled, wait for confirmation before trying again
4. Ensure you're connected to the correct RPC endpoint

#### Issue: "Nonce too low" or "Nonce too high"

**Solutions**:
1. Open MetaMask
2. Go to Settings > Advanced
3. Click "Reset Account" (this clears transaction history, not your funds)
4. Try the transaction again

### NFT Not Appearing

#### Issue: "NFT not showing in wallet"

**Solutions**:
1. Wait a few minutes - it can take time for wallets to index new NFTs
2. Manually add the NFT in MetaMask:
   - Go to NFTs tab
   - Click "Import NFT"
   - Enter your Collection ID and Token ID
3. Check on the Enjin Platform - if it shows there, it's minted correctly
4. Try refreshing your wallet or restarting MetaMask

#### Issue: "Game doesn't detect my NFT"

**Solutions**:
1. Verify the Collection ID in `sdk.config.ts` is correct
2. Ensure your wallet is connected to the game
3. Check that you're on the correct network
4. Verify the NFT is in the connected wallet address
5. Check the browser console for error messages
6. Try disconnecting and reconnecting your wallet

### API Key Configuration Issues

#### Issue: "Invalid API key" error

**Solutions**:
1. Verify you copied the entire API key correctly
2. Check for extra spaces or line breaks
3. Regenerate the API key in the Enjin Platform:
   - Go to Account Settings
   - Daemon Wallet section
   - Generate a new API token
4. Update your configuration with the new key
5. Restart your development server

#### Issue: "API rate limit exceeded"

**Solutions**:
1. Wait a few minutes before making more requests
2. Implement request caching in your game
3. Optimize your API calls to reduce frequency
4. Contact Enjin support for higher rate limits if needed

### Common Error Messages

#### "Failed to fetch"
- **Cause**: Network connectivity issue or incorrect RPC URL
- **Solution**: Check your internet connection and verify the RPC URL

#### "User rejected the request"
- **Cause**: You clicked "Reject" in MetaMask
- **Solution**: Try the action again and click "Confirm"

#### "Insufficient funds for gas"
- **Cause**: Not enough testnet tokens for transaction fees
- **Solution**: Get more tokens from a faucet

#### "Collection not found"
- **Cause**: Incorrect Collection ID in configuration
- **Solution**: Double-check and update the Collection ID

#### "Token already minted"
- **Cause**: Trying to mint a token ID that already exists
- **Solution**: Use a different token ID

---

## Best Practices for NFT Metadata

### Image Guidelines

#### Recommended Specifications

**Format**:
- **PNG**: Best for images with transparency (recommended for eggs)
- **JPG**: Good for photographs or complex images without transparency
- **GIF**: For simple animations (limited support)
- **SVG**: For vector graphics (check platform support)

**Dimensions**:
- **Minimum**: 512x512 pixels
- **Recommended**: 1024x1024 pixels
- **Maximum**: 2048x2048 pixels (larger files take longer to load)
- **Aspect Ratio**: 1:1 (square) for best compatibility

**File Size**:
- Keep under 10MB for faster loading
- Optimize images before uploading
- Use tools like TinyPNG or ImageOptim

**Color**:
- Use RGB color space (not CMYK)
- Consider how the image looks on both light and dark backgrounds
- Test visibility at small sizes (thumbnails)

### Metadata Structure

Follow the standard NFT metadata format for maximum compatibility:

```json
{
  "name": "Token Name",
  "description": "Detailed description of the token",
  "image": "ipfs://QmHash or https://developers.metaplex.com/token-metadata/token-standard",
  "external_url": "https://solana.com/developers/guides/games/interact-with-tokens",
  "attributes": [
    {
      "trait_type": "Attribute Name",
      "value": "Attribute Value"
    }
  ]
}
```

### Writing Effective Descriptions

**Do**:
- Be clear and concise
- Highlight unique features
- Include lore or backstory
- Mention utility or functionality
- Use proper grammar and spelling

**Don't**:
- Make false claims or promises
- Use excessive marketing language
- Include personal information
- Copy descriptions from other projects
- Leave it blank

**Example Good Description**:
```
Genesis Egg #042 - A rare crystalline egg discovered in the digital realm. 
This egg pulses with mysterious energy and is said to contain one of the 
legendary Enji-chi creatures. Hatch it in the Enji-Chi game to discover 
what lies within. Part of the Genesis collection, limited to 1000 eggs.
```

### Attribute Configuration

Attributes make your NFTs filterable and comparable:

**Common Attribute Types**:

1. **Rarity Tiers**:
   - Common, Uncommon, Rare, Epic, Legendary, Mythic

2. **Numeric Attributes**:
   ```json
   {
     "trait_type": "Power Level",
     "value": 85,
     "max_value": 100
   }
   ```

3. **Date Attributes**:
   ```json
   {
     "trait_type": "Minted Date",
     "value": 1732780800,
     "display_type": "date"
   }
   ```

4. **Percentage Attributes**:
   ```json
   {
     "trait_type": "Hatch Progress",
     "value": 75,
     "display_type": "boost_percentage"
   }
   ```

**Best Practices**:
- Use consistent naming across all tokens
- Include 5-10 meaningful attributes
- Balance common and rare traits
- Consider future utility
- Make attributes relevant to gameplay

### IPFS Storage Considerations

**Why Use IPFS?**
- Decentralized storage (no single point of failure)
- Content-addressed (files can't be changed)
- Permanent storage (with proper pinning)
- Industry standard for NFTs

**IPFS Best Practices**:

1. **Pin Your Content**:
   - Use a pinning service (Pinata, NFT.Storage, Web3.Storage)
   - Don't rely on temporary IPFS gateways
   - Verify your content remains accessible

2. **Upload Order**:
   - Upload images first
   - Get IPFS hashes
   - Create metadata JSON with image hashes
   - Upload metadata JSON
   - Use metadata hash in your NFT

3. **Folder Structure**:
   ```
   collection/
   ├── images/
   │   ├── 1.png
   │   ├── 2.png
   │   └── ...
   └── metadata/
       ├── 1.json
       ├── 2.json
       └── ...
   ```

4. **Testing**:
   - Verify files load via multiple IPFS gateways
   - Test: `https://ipfs.io/ipfs/YOUR_HASH`
   - Test: `https://gateway.pinata.cloud/ipfs/YOUR_HASH`
   - Ensure images display correctly

### Metadata Standards Compliance

Follow these standards for maximum compatibility:

**ERC-721 Metadata Standard**:
- Used by most NFT marketplaces
- Supported by Enjin Platform
- Ensures your NFTs display correctly everywhere

**Required Fields**:
- `name`: Token name
- `description`: Token description
- `image`: Image URL (IPFS or HTTPS)

**Optional but Recommended**:
- `external_url`: Link to your game or website
- `attributes`: Array of traits
- `background_color`: Hex color without #
- `animation_url`: For animated content

**Example Complete Metadata**:
```json
{
  "name": "Enji-chi Egg #001",
  "description": "The first Genesis Egg, containing a legendary Enji-chi creature.",
  "image": "ipfs://QmYourImageHash",
  "external_url": "https://enjin.io/ecosystem",
  "background_color": "1a1a2e",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    },
    {
      "trait_type": "Generation",
      "value": "Genesis"
    },
    {
      "trait_type": "Egg Number",
      "value": 1,
      "display_type": "number"
    },
    {
      "trait_type": "Power Level",
      "value": 95,
      "max_value": 100
    },
    {
      "trait_type": "Element",
      "value": "Cosmic"
    },
    {
      "trait_type": "Status",
      "value": "Unhatched"
    }
  ]
}
```

---

## Next Steps

Congratulations! You've successfully minted your first Enji-chi Egg NFT. Here's what to do next:

### 1. Mint Additional Eggs

Now that you understand the process, you can mint more eggs:

**For Sequential Minting**:
1. Go to your collection in the Enjin Platform
2. Create new tokens with IDs 2, 3, 4, etc.
3. Use consistent naming: "Enji-chi Egg #002", "Enji-chi Egg #003"
4. Vary the attributes to create different rarities
5. Consider creating a minting script for bulk operations

**Batch Minting Tips**:
- Plan your rarity distribution (e.g., 60% common, 25% rare, 10% epic, 5% legendary)
- Prepare all images and metadata in advance
- Use consistent file naming conventions
- Test with a small batch first

### 2. Test the Hatch Functionality

Verify the complete game flow:

1. **Connect Wallet**: Ensure wallet connection works smoothly
2. **NFT Detection**: Verify the game detects your egg
3. **Hatch Transaction**: Test the hatching process
4. **Post-Hatch State**: Confirm the game responds correctly after hatching
5. **Error Handling**: Test what happens if transactions fail

**Testing Checklist**:
- [ ] Wallet connects successfully
- [ ] Egg appears with correct image and metadata
- [ ] "HATCH NOW" button is enabled
- [ ] Transaction prompts appear correctly
- [ ] Transaction confirmation works
- [ ] Game state updates after hatching
- [ ] Error messages are clear and helpful

### 3. Expand Your Collection

Consider adding variety to your collection:

**Different Egg Types**:
- Common Eggs (abundant, basic creatures)
- Rare Eggs (special colors or patterns)
- Epic Eggs (unique designs, powerful creatures)
- Legendary Eggs (extremely rare, exclusive creatures)

**Seasonal Variations**:
- Holiday-themed eggs
- Event-exclusive eggs
- Limited-time special editions

**Utility Additions**:
- Eggs that hatch into creatures with different abilities
- Eggs that provide in-game bonuses
- Eggs that unlock special content

### 4. Implement Advanced Features

Enhance your game with additional functionality:

**NFT Evolution**:
- Allow hatched creatures to evolve
- Create new NFTs for evolved forms
- Implement burning mechanics for evolution

**Trading System**:
- Enable peer-to-peer trading
- Create an in-game marketplace
- Implement trading fees or royalties

**Breeding Mechanics**:
- Allow players to breed their creatures
- Generate new eggs from breeding
- Create genetic attribute systems

**Staking and Rewards**:
- Let players stake their NFTs
- Reward active players with new eggs
- Create loyalty programs

### 5. Moving from Testnet to Mainnet

When you're ready to launch for real:

**Preparation Steps**:

1. **Thorough Testing**:
   - Test all features extensively on testnet
   - Get feedback from beta testers
   - Fix all bugs and issues
   - Optimize gas usage

2. **Mainnet Setup**:
   - Create a new collection on Enjin Matrixchain mainnet
   - Update your game configuration with mainnet settings
   - Prepare real ENJ tokens for gas fees
   - Set up proper API key management

3. **Security Audit**:
   - Review all smart contract interactions
   - Audit your wallet connection code
   - Implement rate limiting
   - Add proper error handling
   - Secure your API keys

4. **Launch Preparation**:
   - Prepare marketing materials
   - Set up community channels (Discord, Twitter)
   - Create a launch roadmap
   - Plan your minting strategy (public sale, whitelist, etc.)
   - Prepare customer support resources

**Mainnet Configuration Changes**:

Update your `sdk.config.ts`:
```typescript
export const enjinConfig = {
  platform: {
    apiUrl: 'https://platform.enjin.io/graphql', // Remove 'canary'
    network: 'matrixchain' // Remove '-testnet'
  },
  collection: {
    collectionId: 'YOUR_MAINNET_COLLECTION_ID' // New mainnet collection
  },
  wallet: {
    chainId: 1110, // Mainnet chain ID (verify with Enjin docs)
    rpcUrl: 'https://rpc.matrix.blockchain.enjin.io/' // Mainnet RPC
  }
}
```

**Important Mainnet Considerations**:
- Real money is involved - test everything thoroughly
- Gas fees cost real ENJ tokens
- Mistakes can be costly - double-check everything
- Have a support plan ready for users
- Monitor your collection and transactions closely

### 6. Community Building

Build a community around your game:

**Social Media**:
- Create Twitter/X account for updates
- Share development progress
- Showcase rare eggs and creatures
- Engage with the NFT gaming community

**Discord Server**:
- Create channels for support, trading, and general chat
- Host events and giveaways
- Gather feedback from players
- Build a loyal community

**Content Creation**:
- Write blog posts about your game
- Create video tutorials
- Share player stories
- Document your development journey

### 7. Analytics and Monitoring

Track your collection's performance:

**Metrics to Monitor**:
- Total eggs minted
- Active players
- Transaction volume
- Hatch rate
- Trading activity
- Player retention

**Tools**:
- Enjin Platform analytics
- Blockchain explorers
- Custom analytics in your game
- Community feedback

### 8. Continuous Improvement

Keep your game fresh and engaging:

**Regular Updates**:
- Add new egg types seasonally
- Introduce new creatures
- Implement player-requested features
- Fix bugs and improve performance

**Events**:
- Host special minting events
- Create limited-time challenges
- Offer exclusive rewards
- Collaborate with other projects

**Feedback Loop**:
- Listen to your community
- Implement popular suggestions
- Communicate your roadmap
- Be transparent about challenges

---

## Additional Resources

### Official Documentation

- **Enjin Platform Docs**: [https://docs.enjin.io](https://docs.enjin.io)
- **Enjin Platform Cloud**: [https://platform.canary.enjin.io](https://platform.canary.enjin.io)
- **Enjin Blog**: [https://enjin.io/blog](https://enjin.io/blog)
- **Enjin Changelog**: [https://enjin.io/changelogs](https://enjin.io/changelogs)

### Developer Tools

- **MetaMask**: [https://metamask.io](https://metamask.io)
- **Pinata (IPFS)**: [https://pinata.cloud](https://pinata.cloud)
- **NFT.Storage**: [https://nft.storage](https://nft.storage)
- **Chainlist**: [https://chainlist.org](https://chainlist.org)

### Community

- **Enjin Discord**: Join for support and community discussions
- **Enjin Twitter**: Follow for updates and announcements
- **Developer Forums**: Connect with other Enjin developers

### Learning Resources

- **NFT Metadata Standards**: Research ERC-721 and ERC-1155 standards
- **IPFS Best Practices**: Learn about decentralized storage
- **Blockchain Gaming**: Explore other blockchain game projects
- **Web3 Development**: Deepen your understanding of Web3 technologies

---

## Conclusion

You've now completed the full journey from creating an Enjin Platform account to minting your first Enji-chi Egg NFT and integrating it with your game. This is just the beginning of your blockchain gaming adventure!

Remember:
- Start small and test thoroughly on testnet
- Listen to your community and iterate
- Keep learning about blockchain technology
- Have fun building and creating!

If you encounter any issues not covered in this guide, don't hesitate to:
- Check the official Enjin documentation
- Ask in the Enjin Discord community
- Review the troubleshooting section
- Reach out to Enjin support

Happy minting, and may your Enji-chi creatures thrive! 🥚✨

---

**Document Version**: 1.0  
**Last Updated**: November 28, 2025  
**Maintained by**: Enji-Chi Development Team
