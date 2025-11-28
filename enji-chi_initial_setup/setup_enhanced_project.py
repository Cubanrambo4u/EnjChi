#!/usr/bin/env python3
"""
Script to set up the enhanced Enji-Chi game project structure
"""
import os
import json

def create_directory_structure():
    """Create the complete directory structure"""
    directories = [
        "enjchi-enhanced/src/components",
        "enjchi-enhanced/src/game/scenes",
        "enjchi-enhanced/src/services",
        "enjchi-enhanced/src/config",
        "enjchi-enhanced/src/types",
        "enjchi-enhanced/src/hooks",
        "enjchi-enhanced/public/assets/sprites",
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def create_package_json():
    """Create package.json with all dependencies"""
    package_json = {
        "name": "enjchi-enhanced",
        "version": "2.0.0",
        "description": "Enhanced Enji-Chi - A blockchain-powered NFT hatching game with React, Phaser 3, and dual wallet support",
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "tsc && vite build",
            "preview": "vite preview",
            "type-check": "tsc --noEmit",
            "lint": "eslint src --ext ts,tsx"
        },
        "keywords": [
            "phaser",
            "phaser3",
            "react",
            "game",
            "blockchain",
            "nft",
            "enjin",
            "metamask",
            "web3",
            "typescript",
            "vite"
        ],
        "author": "",
        "license": "MIT",
        "dependencies": {
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "phaser": "^3.90.0",
            "ethers": "^6.15.0",
            "graphql-request": "^7.3.3"
        },
        "devDependencies": {
            "@types/react": "^18.3.12",
            "@types/react-dom": "^18.3.1",
            "@vitejs/plugin-react": "^4.3.4",
            "typescript": "^5.7.2",
            "vite": "^7.2.4"
        }
    }
    
    with open("enjchi-enhanced/package.json", "w") as f:
        json.dump(package_json, f, indent=2)
    print("✓ Created package.json")

def create_gitignore():
    """Create .gitignore file"""
    gitignore_content = """# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build outputs
dist/
build/
*.local

# Environment variables
.env
.env.local
.env.production
.env.development

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
.cache/
.temp/

# Vite
.vite/
node_modules/.vite/
"""
    
    with open("enjchi-enhanced/.gitignore", "w") as f:
        f.write(gitignore_content)
    print("✓ Created .gitignore")

def create_env_example():
    """Create .env.example file"""
    env_example = """# Enjin Platform API Configuration
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

# Optional: WalletConnect (if needed in future)
# VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
"""
    
    with open("enjchi-enhanced/.env.example", "w") as f:
        f.write(env_example)
    print("✓ Created .env.example")

if __name__ == "__main__":
    print("Setting up enhanced Enji-Chi project structure...\n")
    create_directory_structure()
    print()
    create_package_json()
    create_gitignore()
    create_env_example()
    print("\n✅ Project structure created successfully!")
