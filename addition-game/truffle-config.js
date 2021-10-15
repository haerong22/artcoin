// truffle.js config for klaytn.
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = '1001'
const GASLIMIT = '20000000'
const URL = `https://api.baobab.klaytn.net:8651`
const PRIVATE_KEY = '0xc7ecad33a6740ec255f0999e765193ac18cb1e85d9b027fcf319ed9e33d0a908'

module.exports = {
  networks: {  
    klaytn: {
      provider: new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    }  
  },
  compilers: {      
    solc: {        
      version: "0.4.24" 
    }
  }
}
