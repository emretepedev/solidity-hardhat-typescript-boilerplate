import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-docgen';
import 'hardhat-abi-exporter';
import 'hardhat-tracer';
import 'hardhat-spdx-license-identifier';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  abiExporter: {
    path: 'soldata/abi/',
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  solidity: process.env.SOLIDITY_VERSION || '0.8.7',
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  docgen: {
    path: 'docs/',
    clear: true,
    runOnCompile: true,
  },
  gasReporter: {
    enabled:
      process.env.REPORT_GAS !== undefined
        ? process.env.REPORT_GAS.toLowerCase() === 'true'
        : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || '',
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      ropsten: process.env.ETHERSCAN_API_KEY || '',
      rinkeby: process.env.ETHERSCAN_API_KEY || '',
      bscTestnet: process.env.BSCSCAN_API_KEY || '',
    },
  },
  spdxLicenseIdentifier: {
    runOnCompile: true,
  },
};

export default config;
