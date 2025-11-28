# Enji-Chi Game

A blockchain-powered NFT hatching game built with Phaser 3, Vite, TypeScript, and Enjin SDK integration.

## 🎮 Overview

Enji-Chi is a web-based game that integrates with the Enjin blockchain platform, allowing players to connect their wallets and interact with NFTs. The game features a pulsing egg sprite that can be "hatched" through blockchain transactions, demonstrating the integration of gaming and Web3 technologies.

## ✨ Features

- **Phaser 3 Game Engine**: Smooth 2D game rendering with animations
- **Blockchain Integration**: Connect to Enjin Matrixchain using MetaMask or other Web3 wallets
- **NFT Verification**: Check ownership of Enji-chi Egg NFTs
- **Responsive Design**: Mobile-ready interface that adapts to different screen sizes
- **TypeScript**: Type-safe code for better development experience
- **Vite**: Fast development server with hot module replacement
- **WalletConnect Support**: Alternative wallet connection method (requires configuration)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.19+ or 22.12+ (required for Vite 7.2.4)
- **npm**: Version 9.2.0 or higher
- **Web3 Wallet**: MetaMask or compatible browser wallet

## 🚀 Quick Start

### 1. Installation

Clone the repository and install dependencies:

```bash
cd final
npm install
```

### 2. Configuration

Before running the game, you need to configure your API keys and settings:

#### Edit `src/config/sdk.config.ts`:

```typescript
export const ENJIN_CONFIG = {
  // Replace with your actual Enjin API key
  apiKey: 'YOUR_ENJIN_API_KEY_HERE',
  
  // Replace with your NFT collection ID
  nft: {
    collectionId: 'YOUR_COLLECTION_ID',
    tokenId: 'Enji-chi Egg #001',
    requiredForHatch: true
  }
};

export const WALLETCONNECT_CONFIG = {
  // Replace with your WalletConnect project ID
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  // ... rest of config
};
```

#### Where to get API keys:

- **Enjin API Key**: 
  1. Visit [Enjin Platform](https://platform.enjin.io)
  2. Create an account or log in
  3. Navigate to API settings
  4. Generate a new API key

- **WalletConnect Project ID**:
  1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
  2. Create a new project
  3. Copy your Project ID

- **NFT Collection ID**:
  1. Create or use an existing NFT collection on Enjin Platform
  2. Copy the collection ID from your dashboard

### 3. Development

Start the development server:

```bash
npm run dev
```

The game will open automatically in your browser at `http://localhost:3000`

### 4. Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 5. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🎯 How to Play

1. **Connect Wallet**: Click the "Connect Wallet" button or press `W`
2. **Verify NFT**: The game will automatically check if you own the required Enji-chi Egg NFT
3. **Hatch Egg**: Click "HATCH NOW" or press `H` to initiate the hatching transaction
4. **Watch Animation**: Enjoy the egg hatching animation!

## 🔧 Project Structure

```
final/
├── src/
│   ├── scenes/              # Phaser game scenes
│   │   ├── PreloadScene.ts  # Asset loading scene
│   │   └── MainScene.ts     # Main game scene
│   ├── services/            # Blockchain and API services
│   │   ├── BlockchainService.ts    # Wallet connectivity
│   │   ├── EnjinService.ts         # Enjin API integration
│   │   └── WalletConnectService.ts # WalletConnect fallback
│   ├── components/          # UI components
│   │   ├── HatchButton.ts   # Interactive hatch button
│   │   └── WalletUI.ts      # Wallet connection UI
│   ├── config/              # Configuration files
│   │   ├── game.config.ts   # Game settings
│   │   └── sdk.config.ts    # SDK and blockchain config
│   └── main.ts              # Application entry point
├── public/
│   └── assets/              # Game assets
│       └── sprites/         # Sprite images
├── index.html               # Main HTML file
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🌐 Network Configuration

The game is configured to work with **Enjin Matrixchain Testnet**:

- **Chain ID**: 6678
- **Network Name**: Enjin Matrixchain Testnet
- **RPC URL**: https://enjin-matrix-rpc.n.dwellir.com/
- **Currency**: ENJ
- **Block Explorer**: https://explorer.enjin.io

### Adding Network to MetaMask

If the network isn't automatically added, you can add it manually:

1. Open MetaMask
2. Click on the network dropdown
3. Select "Add Network"
4. Enter the network details above
5. Click "Save"

## 📦 Dependencies

### Core Dependencies

- **phaser**: ^3.90.0 - Game engine
- **ethers**: ^6.15.0 - Ethereum library for blockchain interactions
- **graphql-request**: ^7.3.3 - GraphQL client for Enjin API
- **@walletconnect/web3wallet**: ^1.16.1 - WalletConnect integration

### Dev Dependencies

- **typescript**: ^5.7.2 - TypeScript compiler
- **vite**: ^7.2.4 - Build tool and dev server

## 🎨 Customization

### Adding Custom Assets

1. Place your sprite images in `public/assets/sprites/`
2. Update the asset loading in `src/scenes/PreloadScene.ts`
3. Reference the assets in your scenes

### Modifying Game Settings

Edit `src/config/game.config.ts` to customize:

- Game dimensions
- Animation settings
- UI styling
- Button appearance

### Changing Blockchain Settings

Edit `src/config/sdk.config.ts` to modify:

- Network configuration
- NFT requirements
- API endpoints
- GraphQL queries

## 🐛 Troubleshooting

### Wallet Won't Connect

- Ensure MetaMask or another Web3 wallet is installed
- Check that you're on the correct network (Chain ID: 6678)
- Try refreshing the page
- Check browser console for error messages

### NFT Not Detected

- Verify you own the correct NFT in your wallet
- Check that the collection ID and token ID are correct in `sdk.config.ts`
- Ensure your Enjin API key is valid
- The game will use mock data if API key is not configured

### Build Errors

- Ensure Node.js version is 20.19+ or 22.12+
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

### Game Not Loading

- Check browser console for errors
- Ensure all dependencies are installed
- Try a different browser
- Disable browser extensions that might interfere

## 🔒 Security Notes

- Never commit your API keys to version control
- Use environment variables for sensitive data in production
- Always verify transactions before signing
- Only connect to trusted dApps

## 📝 Development Notes

### Mock Data Mode

If API keys are not configured, the game runs in "mock data mode":

- Wallet connection works normally
- NFT ownership checks return mock data (always true)
- Transactions are simulated (no actual blockchain interaction)
- Useful for development and testing

### Type Checking

Run TypeScript type checking without building:

```bash
npm run type-check
```

### Hot Module Replacement

Vite provides instant hot module replacement during development. Changes to your code will be reflected immediately without full page reloads.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Enjin Platform Documentation](https://docs.enjin.io)
- [Vite Documentation](https://vite.dev)
- [Ethers.js Documentation](https://docs.ethers.org)
- [WalletConnect Documentation](https://docs.walletconnect.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 💡 Tips

- Use the browser console to see detailed logs and debug information
- Press `W` to quickly connect your wallet
- Press `H` to quickly hatch (when wallet is connected)
- The egg animation is customizable in `game.config.ts`
- Check the console for helpful startup information

## 🎓 Learning Resources

- [Phaser 3 Examples](https://phaser.io/examples)
- [Enjin Developer Portal](https://docs.enjin.io)
- [Web3 Development Guide](https://ethereum.org/en/developers/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 📞 Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Consult the official documentation links
4. Check Enjin's developer community

---

**Built with ❤️ using Phaser 3, Vite, TypeScript, and Enjin SDK**

Version: 1.0.0  
Last Updated: November 28, 2025
