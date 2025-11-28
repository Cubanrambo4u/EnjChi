# Enji-Chi Enhanced

A blockchain-powered NFT hatching game built with **React**, **Phaser 3**, **TypeScript**, and **Enjin Platform** integration. Features dual wallet support for both Enjin Wallet and MetaMask.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎮 Overview

Enji-Chi Enhanced is a web-based game that combines modern React UI with Phaser 3 game engine and blockchain technology. Players can connect their Enjin Wallet or MetaMask, verify NFT ownership, and interact with their Enji-chi Egg NFTs through an engaging hatching experience.

### Key Features

- ✨ **React + Phaser 3 Integration** - Modern UI framework with powerful game engine
- 🔗 **Dual Wallet Support** - Connect with Enjin Wallet or MetaMask
- 🎨 **Simplified Game Scene** - Clean black background with pulsing egg animation
- 🔐 **NFT Verification** - Check ownership via Enjin Platform API
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Fast Development** - Vite for instant hot module replacement
- 🎯 **TypeScript** - Full type safety throughout the codebase

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.19+ or 22.12+ (required for Vite 7.2.4)
- **npm**: Version 9.2.0 or higher
- **Git**: For version control
- **Web3 Wallet**: Enjin Wallet or MetaMask browser extension

### Installing Wallets

- **Enjin Wallet**: [Download from Enjin.io](https://enjin.io/products/wallet)
- **MetaMask**: [Download from MetaMask.io](https://metamask.io)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Cubanrambo4u/EnjChi.git
cd EnjChi/enjchi-enhanced
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18.3.1
- Phaser 3.90.0
- Ethers.js 6.15.0
- GraphQL Request 7.3.3
- TypeScript 5.7.2
- Vite 7.2.4

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Enjin Platform API Configuration
VITE_ENJIN_API_ENDPOINT=https://platform.enjin.io/graphql
VITE_ENJIN_API_KEY=your_enjin_api_key_here

# NFT Configuration
VITE_NFT_COLLECTION_ID=your_collection_id_here
VITE_NFT_TOKEN_ID=Enji-chi Egg #001

# Matrixchain Network Configuration
VITE_CHAIN_ID=6678
VITE_CHAIN_NAME=Enjin Matrixchain Testnet
VITE_RPC_URL=https://enjin-matrix-rpc.n.dwellir.com/
VITE_BLOCK_EXPLORER=https://explorer.enjin.io
```

#### Where to Get API Keys

**Enjin API Key:**
1. Visit [Enjin Platform](https://platform.enjin.io)
2. Create an account or log in
3. Navigate to API settings
4. Generate a new API key

**NFT Collection ID:**
1. Create or use an existing NFT collection on Enjin Platform
2. Copy the collection ID from your dashboard

### 4. Run Development Server

```bash
npm run dev
```

The game will open automatically in your browser at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 🎯 How to Play

1. **Open the Game** - Navigate to the game URL in your browser
2. **Connect Wallet** - Choose Enjin Wallet or MetaMask and connect
3. **Verify NFT** - The game automatically checks if you own the required NFT
4. **Hatch Egg** - Click the large "HATCH" button to initiate the hatching transaction
5. **Watch Animation** - Enjoy the egg hatching animation!

## 📁 Project Structure

```
enjchi-enhanced/
├── src/
│   ├── components/          # React components
│   │   ├── Game.tsx        # Phaser game wrapper
│   │   ├── Game.css
│   │   ├── WalletConnect.tsx  # Wallet connection UI
│   │   ├── WalletConnect.css
│   │   ├── HatchButton.tsx    # Hatch button component
│   │   └── HatchButton.css
│   ├── game/               # Phaser game code
│   │   └── scenes/
│   │       └── MainScene.ts   # Main game scene
│   ├── services/           # Blockchain services
│   │   ├── WalletService.ts   # Dual wallet support
│   │   └── EnjinService.ts    # Enjin Platform API
│   ├── config/             # Configuration
│   │   ├── blockchain.config.ts  # Chain config
│   │   └── game.config.ts        # Phaser config
│   ├── hooks/              # React hooks
│   │   └── useWallet.ts    # Wallet state hook
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main React app
│   ├── App.css
│   ├── main.tsx            # Entry point
│   ├── index.css
│   └── vite-env.d.ts
├── public/
│   └── assets/
│       └── sprites/        # Game assets
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── .env.example
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking

## 🌐 Network Configuration

The game is configured for **Enjin Matrixchain Testnet**:

- **Chain ID**: 6678
- **Network Name**: Enjin Matrixchain Testnet
- **RPC URL**: https://enjin-matrix-rpc.n.dwellir.com/
- **Currency**: ENJ
- **Block Explorer**: https://explorer.enjin.io

### Adding Network to MetaMask

The game will automatically prompt you to add the network. If needed, you can add it manually:

1. Open MetaMask
2. Click on the network dropdown
3. Select "Add Network"
4. Enter the network details above
5. Click "Save"

## 🔐 Wallet Support

### Enjin Wallet

- Primary wallet for Enjin ecosystem
- Seamless integration with Enjin Platform
- Native support for Matrixchain

### MetaMask

- Popular Ethereum wallet
- Wide browser support
- Fallback option for users

The game automatically detects available wallets and allows users to choose their preferred option.

## 🛠️ Technology Stack

- **React 18.3.1** - UI framework
- **Phaser 3.90.0** - Game engine
- **TypeScript 5.7.2** - Type-safe JavaScript
- **Vite 7.2.4** - Build tool and dev server
- **Ethers.js 6.15.0** - Ethereum library
- **GraphQL Request 7.3.3** - GraphQL client

## 🎨 Customization

### Modifying Game Settings

Edit `src/config/game.config.ts`:

```typescript
export const GAME_CONFIG = {
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  // ... other settings
};

export const EGG_ANIMATION_CONFIG = {
  pulseScale: 1.1,
  pulseDuration: 1000,
  pulseEase: 'Sine.easeInOut'
};
```

### Changing Blockchain Settings

Edit `src/config/blockchain.config.ts` or use environment variables in `.env`.

### Styling Components

Each React component has its own CSS file for easy customization:
- `WalletConnect.css` - Wallet connection UI
- `HatchButton.css` - Hatch button styling
- `Game.css` - Game container styling
- `App.css` - Main app layout

## 🐛 Troubleshooting

### Wallet Won't Connect

- Ensure wallet extension is installed and unlocked
- Check that you're on the correct network (Chain ID: 6678)
- Try refreshing the page
- Check browser console for error messages

### NFT Not Detected

- Verify you own the correct NFT in your wallet
- Check that collection ID and token ID are correct in `.env`
- Ensure your Enjin API key is valid
- The game uses mock data if API is not configured (for development)

### Build Errors

- Ensure Node.js version is 20.19+ or 22.12+
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`
- Run `npm run type-check` to identify TypeScript errors

### Game Not Loading

- Check browser console for errors
- Ensure all dependencies are installed
- Try a different browser
- Disable browser extensions that might interfere

## 📦 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

## 🔒 Security Notes

- ⚠️ Never commit your `.env` file to version control
- ⚠️ Never share your API keys publicly
- ⚠️ Always verify transactions before signing
- ⚠️ Only connect to trusted dApps
- ⚠️ Use environment variables for sensitive data in production

## 📝 Development Mode

If API keys are not configured, the game runs in "development mode":

- Wallet connection works normally
- NFT ownership checks return mock data (always true)
- Transactions are simulated (no actual blockchain interaction)
- Useful for development and testing without API access

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Enjin Platform Documentation](https://docs.enjin.io)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📞 Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Consult the official documentation links
4. Open an issue on GitHub

## 🎓 Learning Resources

- [Phaser 3 Examples](https://phaser.io/examples)
- [React + Phaser Integration Guide](https://phaser.io/news/2024/02/official-phaser-3-and-react-template)
- [Enjin Developer Portal](https://docs.enjin.io)
- [Web3 Development Guide](https://ethereum.org/en/developers/)

## 📊 Version History

### Version 2.0.0 (Current)
- Added React integration
- Implemented dual wallet support (Enjin + MetaMask)
- Simplified game scene with black background
- Large, prominent hatch button
- Enhanced UI/UX
- Improved project structure for GitHub

### Version 1.0.0
- Initial release with Phaser 3 and Enjin integration

---

## 🚀 Pushing to GitHub

To push this project to the repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Enji-Chi Enhanced v2.0.0"

# Add remote repository
git remote add origin https://github.com/Cubanrambo4u/EnjChi.git

# Push to main branch
git push -u origin main
```

---

**Built with ❤️ using React, Phaser 3, TypeScript, and Enjin Platform**

Version: 2.0.0  
Last Updated: November 28, 2025
