const util = require('util');
const exec = util.promisify(require('child_process').exec);

const urls = {
  'rinkeby': 'https://rinkeby.etherscan.io/address/',
  'ftmTestnet': 'https://testnet.ftmscan.com/address/',
  'bscTestnet': 'https://testnet.bscscan.com/address/',
  'polygonMumbai': 'https://mumbai.polygonscan.com/address/',
  'avalanche': 'https://api.avax-test.network/ext/C/rpc',
}

async function abc() {
  console.log(JSON.stringify(await Promise.all(['rinkeby', 'bscTestnet', 'ftmTestnet', 'polygonMumbai', 'avalanche'].map(async(chain) => {
    const { stdout } = await exec(`yarn deploy --network ${chain}`);
    const address = stdout.substring(stdout.indexOf('0x')).trim();

    await new Promise((resolve) => setTimeout(resolve, 30 * 1000));

    await exec(`yarn hardhat verify --network ${chain} ${address}`).catch((err) => {
      console.log('Error', chain, address, err)
    });
    return {
      chain,
      address,
      url: urls[chain] + address + '#code'
    }
  }))))
}

abc();
