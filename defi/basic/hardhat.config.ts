import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      gas: 10000000,
      gasPrice: 875000000,
    },

    goerli: {
      url: "https://ethereum-goerli-rpc.allthatnode.com/ahMlAykfDRTRtFAyI5r1jYAbMrWoiX8N",
      accounts: [
        "ac71e7080a5f6d3c164954f9a2c548edffa9bb340ad11df564ebefea6a25b941",
      ],
    },
  },

  etherscan: {
    apiKey: "9N7IQRFI9F2JAWQ83Y9U8GB5TQ18KXAMBX",
  },
};

export default config;
