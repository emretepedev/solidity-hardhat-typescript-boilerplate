import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import 'solidity-docgen';
import 'hardhat-finder';
import 'hardhat-storage-vault';
import 'hardhat-contract-sizer';
import 'hardhat-tracer';
import './tasks';

dotenvConfig();

const {
  DEPLOYER_WALLET_PRIVATE_KEY,
  SOLC_VERSION,
  SOLIDITY_VIA_IR,
  SOLIDITY_OPTIMIZER,
  SOLIDITY_OPTIMIZER_RUNS,
  ALLOW_UNLIMITED_CONTRACT_SIZE,
  REPORT_GAS,
  COINMARKETCAP_API_KEY,
  GAS_PRICE_API,
  ARBITRUM_TESTNET_RPC_URL,
  AURORA_TESTNET_RPC_URL,
  AVALANCHE_FUJI_TESTNET_RPC_URL,
  BSC_TESTNET_RPC_URL,
  FTM_TESTNET_RPC_URL,
  GOERLI_RPC_URL,
  SEPOLIA_RPC_URL,
  HARMONY_TEST_RPC_URL,
  HECO_TESTNET_RPC_URL,
  MOONBASE_ALPHA_RPC_URL,
  POLYGON_MUMBAI_RPC_URL,
  SOKOL_RPC_URL,
  ARBISCAN_API_KEY,
  AURORA_API_KEY,
  SNOWTRACE_API_KEY,
  BSCSCAN_API_KEY,
  FTMSCAN_API_KEY,
  HARMONY_POPS_API_KEY,
  HECOINFO_API_KEY,
  GOERLI_ETHERSCAN_API_KEY,
  SEPOLIA_ETHERSCAN_API_KEY,
  MOONSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  BLOCKSCOUT_API_KEY,
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
      // TODO: x get from env, default cancun until hardhat set it as default
      evmVersion: 'cancun',
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
  networks: {
    hardhat: {
      allowUnlimitedContractSize:
        (ALLOW_UNLIMITED_CONTRACT_SIZE &&
          'true' === ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false,
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
    arbitrumTestnet: {
      url: ARBITRUM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    auroraTestnet: {
      url: AURORA_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    avalancheFujiTestnet: {
      url: AVALANCHE_FUJI_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    ftmTestnet: {
      url: FTM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    goerli: {
      url: GOERLI_RPC_URL || '',
      accounts: getWallet(),
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || '',
      accounts: getWallet(),
    },
    harmonyTest: {
      url: HARMONY_TEST_RPC_URL || '',
      accounts: getWallet(),
    },
    hecoTestnet: {
      url: HECO_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    moonbaseAlpha: {
      url: MOONBASE_ALPHA_RPC_URL || '',
      accounts: getWallet(),
    },
    polygonMumbai: {
      url: POLYGON_MUMBAI_RPC_URL || '',
      accounts: getWallet(),
    },
    sokol: {
      url: SOKOL_RPC_URL || '',
      accounts: getWallet(),
    },
  },
  etherscan: {
    apiKey: {
      localhost: BLOCKSCOUT_API_KEY || '',
      arbitrumTestnet: ARBISCAN_API_KEY || '',
      auroraTestnet: AURORA_API_KEY || '',
      avalancheFujiTestnet: SNOWTRACE_API_KEY || '',
      bscTestnet: BSCSCAN_API_KEY || '',
      ftmTestnet: FTMSCAN_API_KEY || '',
      harmonyTest: HARMONY_POPS_API_KEY || '',
      hecoTestnet: HECOINFO_API_KEY || '',
      goerli: GOERLI_ETHERSCAN_API_KEY || '',
      sepolia: SEPOLIA_ETHERSCAN_API_KEY || '',
      moonbaseAlpha: MOONSCAN_API_KEY || '',
      polygonMumbai: POLYGONSCAN_API_KEY || '',
      sokol: BLOCKSCOUT_API_KEY || '',
      custom: CUSTOM_EXPLORER_API_KEY || '',
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
