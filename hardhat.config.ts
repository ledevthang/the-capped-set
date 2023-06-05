import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import './tasks/accounts';
import './tasks/deploy';

import { resolve } from 'path';

import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import { NetworkUserConfig } from 'hardhat/types';
dotenvConfig({ path: resolve(__dirname, './.env') });

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file');
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
  throw new Error('Please set your INFURA_API_KEY in a .env file');
}

const chainIds = {
  arbitrum: 42161,
  avalanche: 43114,
  bsc: 56,
  bscTestnet: 97,
  hardhat: 31337,
  mainnet: 1,
  optimism: 10,
  polygonMainnet: 137,
  polygonMumbai: 80001,
  rinkeby: 4,
  ropsten: 3,
  goerli: 5,
  kovan: 42,
  opera: 250,
  ftmTestnet: 4002,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string;
  switch (chain) {
    case 'avalanche':
      jsonRpcUrl = 'https://api.avax.network/ext/bc/C/rpc';
      break;
    case 'bsc':
      jsonRpcUrl = 'https://bsc-dataseed1.binance.org';
      break;
    case 'bscTestnet':
      jsonRpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
      break;
    case 'opera':
      jsonRpcUrl = 'https://rpc.ftm.tools';
      break;
    case 'ftmTestnet':
      jsonRpcUrl = 'https://rpc.testnet.fantom.network';
      break;
    case 'polygonMainnet':
      jsonRpcUrl = 'https://polygon.llamarpc.com';
      break;
    default:
      jsonRpcUrl = 'https://' + chain + '.infura.io/v3/' + infuraApiKey;
  }
  return {
    accounts: {
      count: 10,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      opera: process.env.FANTOM_API_KEY,
      ftmTestnet: process.env.FANTOM_API_KEY,
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    arbitrum: getChainConfig('arbitrum'),
    avalanche: getChainConfig('avalanche'),
    bsc: getChainConfig('bsc'),
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [
        'e2c2bc4be96ddebc10c51c8ce1cde22adccc40223e85e311162a6c35863dbaa3',
      ],
      chainId: 97,
    },
    mainnet: getChainConfig('mainnet'),
    optimism: getChainConfig('optimism'),
    polygonMainnet: getChainConfig('polygonMainnet'),
    polygonMumbai: getChainConfig('polygonMumbai'),
    rinkeby: getChainConfig('rinkeby'),
    ropsten: getChainConfig('ropsten'),
    goerli: getChainConfig('goerli'),
    kovan: getChainConfig('kovan'),
    ftmTestnet: getChainConfig('ftmTestnet'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    version: '0.8.14',
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: 'none',
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',
  paths: {  },
  networks: {  },
}

export default config;
