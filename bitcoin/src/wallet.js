const bitcore = require("bitcore-lib");
const axios = require("axios");
const { testnet } = require("bitcore-lib/lib/networks");

const TESTNET_ENDPOINT = "https://api.blockcypher.com/v1/btc/test3";

const createWallet = () => {
  const privateKey = new bitcore.PrivateKey();
  const address = privateKey.toAddress(testnet);
  return {
    privateKey: privateKey.toString(),
    address: address.toString(),
  };
};

const validWalletAddress = (address) => {
  return bitcore.Address.isValid(address, testnet);
};

const getBalance = async (address) => {
  const url = `${TESTNET_ENDPOINT}/addrs/${address}/balance`;
  const balance = await axios.get(url);
  return balance.data.balance;
};

const send = async (address, value) => {
  const privateKey = new bitcore.PrivateKey("{privateKey}");

  const apiToken = "9cf448f80b8e44c9b34c8742d4c8561d";

  var newtx = {
    inputs: [{ addresses: ["mogiyYzT98HWbXW4bDhpDg5VJBtWDBLUgS"] }],
    outputs: [{ addresses: [address], value: value }],
  };

  const newTxData = await axios.post(
    `${TESTNET_ENDPOINT}/txs/new`,
    JSON.stringify(newtx)
  );

  const tmptx = newTxData.data;
  tmptx.pubkeys = [];
  tmptx.signatures = tmptx.tosign.map((sign, n) => {
    const pubkey = privateKey.toPublicKey().toString("hex");
    tmptx.pubkeys.push(pubkey);
    const signature = bitcore.crypto.ECDSA.sign(
      Buffer.from(sign, "hex"),
      privateKey,
      "big"
    ).toString("hex");
    return signature;
  });

  axios
    .post(
      `${TESTNET_ENDPOINT}/txs/send?token=${apiToken}`,
      JSON.stringify(tmptx)
    )
    .then((finaltx) => {
      console.log(finaltx.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createWallet: createWallet,
  validWalletAddress: validWalletAddress,
  getBalance: getBalance,
  send: send,
};
