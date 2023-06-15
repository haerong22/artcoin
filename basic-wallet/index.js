import Web3 from "web3";

let web3 = new Web3("HTTP://127.0.0.1:7545");

const account = web3.eth.accounts.create();

// console.log("account: ", account);

const privateKey = account.privateKey;
const encrypt = await web3.eth.accounts.encrypt(privateKey, "password");
const decrypt = await web3.eth.accounts.decrypt(encrypt, "password");
// console.log(encrypt);
// console.log(decrypt);

const txResult = await web3.eth.accounts.signTransaction(
  {
    to: "0xd737F5B4c691f90a1F9A270f94cAaD19aAC45894",
    from: account.address,
    value: "1000",
    gas: 1000,
    gasPrice: 10,
    gasLimit: 1000000,
  },
  privateKey
);

console.log(txResult);
