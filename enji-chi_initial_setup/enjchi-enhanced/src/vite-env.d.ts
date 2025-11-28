/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENJIN_API_ENDPOINT: string;
  readonly VITE_ENJIN_API_KEY: string;
  readonly VITE_NFT_COLLECTION_ID: string;
  readonly VITE_NFT_TOKEN_ID: string;
  readonly VITE_CHAIN_ID: string;
  readonly VITE_CHAIN_NAME: string;
  readonly VITE_RPC_URL: string;
  readonly VITE_BLOCK_EXPLORER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
