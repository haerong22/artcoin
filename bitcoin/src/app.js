const {
  createWallet,
  validWalletAddress,
  getBalance,
  send,
} = require("./wallet");

const address1 = "mogiyYzT98HWbXW4bDhpDg5VJBtWDBLUgS";
const address2 = "mtKNhay4CZ5QMqLECnx5HQZvByDD6589F3";
getBalance(address1).then((data) => console.log(address1, data));
getBalance(address2).then((data) => console.log(address2, data));

// send(address2, 10000);
