import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import 'solidity-docgen';
import 'hardhat-finder';
import 'hardhat-storage-vault';
import 'hardhat-contract-sizer';
import 'hardhat-tracer';
import 'hardhat-exposed';
import 'hardhat-exposed/dist/type-extensions';
import './tasks';

dotenvConfig();

const {
  DEPLOYER_WALLET_PRIVATE_KEY,
  SOLC_VERSION,
  EVM_VERSION,
  SOLIDITY_VIA_IR,
  SOLIDITY_OPTIMIZER,
  SOLIDITY_OPTIMIZER_RUNS,
  ALLOW_UNLIMITED_CONTRACT_SIZE,
  REPORT_GAS,
  COINMARKETCAP_API_KEY,
  GAS_PRICE_API,
  ARBITRUM_TESTNET_RPC_URL,
  AVALANCHE_FUJI_TESTNET_RPC_URL,
  BSC_TESTNET_RPC_URL,
  SEPOLIA_RPC_URL,
  POLYGON_MUMBAI_RPC_URL,
  MAINNET_RPC_URL,
  ETHERSCAN_API_KEY,
  ARBISCAN_API_KEY,
  SNOWTRACE_API_KEY,
  BSCSCAN_API_KEY,
  SEPOLIA_ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  CUSTOM_EXPLORER_API_KEY,
  CUSTOM_NETWORK_CHAIN_ID,
  CUSTOM_NETWORK_API_URL,
  CUSTOM_NETWORK_BROWSER_URL,
  CUSTOM_NETWORK_URL,
  CUSTOM_NETWORK_ACCOUNTS_COUNT,
  CUSTOM_NETWORK_ACCOUNTS_MNEMONIC,
  CUSTOM_NETWORK_ACCOUNTS_PATH,
} = process.env;

function getWallet() {
  return DEPLOYER_WALLET_PRIVATE_KEY !== undefined
    ? [DEPLOYER_WALLET_PRIVATE_KEY]
    : [];
}

const config: HardhatUserConfig = {
  solidity: {
    version: SOLC_VERSION || '0.8.28',
    settings: {
      // TODO: temporary workaround to use the transient storage feature
      evmVersion: EVM_VERSION || 'cancun',
      viaIR:
        (SOLIDITY_VIA_IR && 'true' === SOLIDITY_VIA_IR.toLowerCase()) || false,
      optimizer: {
        enabled:
          (SOLIDITY_OPTIMIZER && 'true' === SOLIDITY_OPTIMIZER.toLowerCase()) ||
          false,
        runs:
          (SOLIDITY_OPTIMIZER_RUNS &&
            Boolean(parseInt(SOLIDITY_OPTIMIZER_RUNS)) &&
            parseInt(SOLIDITY_OPTIMIZER_RUNS)) ||
          200,
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  finder: {
    prettify: true,
    colorify: true,
    outputDir: './soldata',
  },
  storageVault: {
    check: {
      storeFile: 'storage-store-lock.json',
    },
    lock: {
      storeFile: 'storage-store-lock.json',
      prettify: true,
    },
  },
  docgen: {
    outputDir: './docs',
    pages: 'files',
  },
  contractSizer: {
    runOnCompile: false,
    strict: true,
  },
  gasReporter: {
    enabled: (REPORT_GAS && 'true' === REPORT_GAS.toLowerCase()) || false,
    coinmarketcap: COINMARKETCAP_API_KEY || '',
    gasPriceApi: GAS_PRICE_API || '',
    token: 'ETH',
    currency: 'USD',
  },
  exposed: {
    include: ['**/*.sol'],
    outDir: 'contracts-exposed',
    prefix: '$',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize:
        (ALLOW_UNLIMITED_CONTRACT_SIZE &&
          'true' === ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false,
      mining: {
        auto: true,
        interval: 5000,
      },
      hardfork: EVM_VERSION || 'cancun',
      enableTransientStorage: true,
    },
    custom: {
      url: CUSTOM_NETWORK_URL || '',
      accounts: {
        count:
          (CUSTOM_NETWORK_ACCOUNTS_COUNT &&
            Boolean(parseInt(CUSTOM_NETWORK_ACCOUNTS_COUNT)) &&
            parseInt(CUSTOM_NETWORK_ACCOUNTS_COUNT)) ||
          0,
        mnemonic: CUSTOM_NETWORK_ACCOUNTS_MNEMONIC || '',
        path: CUSTOM_NETWORK_ACCOUNTS_PATH || '',
      },
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || '',
      accounts: getWallet(),
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    avalancheFujiTestnet: {
      url: AVALANCHE_FUJI_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    polygonMumbai: {
      url: POLYGON_MUMBAI_RPC_URL || '',
      accounts: getWallet(),
    },
    arbitrumTestnet: {
      url: ARBITRUM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    mainnet: {
      url: MAINNET_RPC_URL || '',
      accounts: getWallet(),
    },
  },
  etherscan: {
    apiKey: {
      localhost: '0x00000000000000000000000000000000',
      custom: CUSTOM_EXPLORER_API_KEY || '',
      sepolia: SEPOLIA_ETHERSCAN_API_KEY || '',
      bscTestnet: BSCSCAN_API_KEY || '',
      avalancheFujiTestnet: SNOWTRACE_API_KEY || '',
      polygonMumbai: POLYGONSCAN_API_KEY || '',
      arbitrumTestnet: ARBISCAN_API_KEY || '',
      mainnet: ETHERSCAN_API_KEY || '',
    },
    customChains: [
      {
        network: 'localhost',
        chainId: 31337,
        urls: {
          apiURL: 'http://localhost/api',
          browserURL: 'http://localhost',
        },
      },
      {
        network: 'custom',
        chainId:
          (CUSTOM_NETWORK_CHAIN_ID &&
            Boolean(parseInt(CUSTOM_NETWORK_CHAIN_ID)) &&
            parseInt(CUSTOM_NETWORK_CHAIN_ID)) ||
          0,
        urls: {
          apiURL: CUSTOM_NETWORK_API_URL || '',
          browserURL: CUSTOM_NETWORK_BROWSER_URL || '',
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
