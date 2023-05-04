const {
  createWallet,
  validWalletAddress,
  getBalance,
  send,
} = require("./wallet");

const address1 = "mogiyYzT98HWbXW4bDhpDg5VJBtWDBLUgS";
const address2 = "mtKNhay4CZ5QMqLECnx5HQZvByDD6589F3";
const address3 = "3LwJnhMfUuP8zCPqFmN6SHtDMR2kHaf8o3";
getBalance(address1).then((data) => console.log(address1, data));
getBalance(address2).then((data) => console.log(address2, data));
getBalance(address3, "mainnet").then((data) => console.log(address3, data));

// send(address2, 10000);

// const btc = [];

// const main = async () => {
//   for (const address of btc) {
//     const balance = await getBalance(address);
//     console.log(balance);
//     await delay(1000);
//   }
// };

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// main();
