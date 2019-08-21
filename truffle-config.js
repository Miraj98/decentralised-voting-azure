const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
module.exports = {
  contracts_build_directory: "./client/src/builds",
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*"
    // },
    blockchainfyjsubcons: {
      network_id: "*",
      gas: 0,
      gasPrice: 0,
      provider: new HDWalletProvider(fs.readFileSync('/Users/miraj/Desktop/codefundopp/codefundopp.env', 'utf-8'), "https://blockchainfyjsubbloc.blockchain.azure.com:3200/OBwwyHUPU7aZFrPT5aCtRkzm"),
      consortium_id: 1566253505101
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.5.10"
    }
  }
};
