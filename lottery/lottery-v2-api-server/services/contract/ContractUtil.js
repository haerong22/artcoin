const config = require("../../config/app-config");
const envType = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: path.join(__dirname, `../../config/${envType}.env`),
});
const Web3 = require("web3");
const path = require("path");
const fs = require("fs");

class ContractUtil {
  constructor() {
    this.#initalizeWeb3();
  }

  #initalizeWeb3() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(config.blockchain[envType])
    );
  }

  async getContract(contractName) {
    const funcName = "getContract";

    try {
      if (!(await this.web3.eth.net.isListening())) {
        this.#initalizeWeb3();
      }
      const abi = this.#getContractAbi(contractName);
      const ca = process.env[contractName];

      const contract = new this.web3.eth.Contract(abi, ca);
    } catch (err) {
      console.error(`[${funcName}] err:`, err);
    }
  }

  async #getContractAbi(contractName) {
    const funcName = "#getContractAbi";

    try {
      const dir = path.resolve(__dirname, "../../contract");
      const json = fs.readFileSync(`${dir}/${contractName}.json`);
      const instance = JSON.parse(json);
      return instance.abi;
    } catch (err) {
      console.error(`[${funcName}] err:`, err);
    }
  }
}

module.exports = ContractUtil;
