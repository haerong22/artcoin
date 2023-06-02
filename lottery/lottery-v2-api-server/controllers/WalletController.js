const ResponseHandler = require("../services/ResponseHandler");
const CipherUtil = require("../services/CipherUtil");

class WalletController {
  static async createWallet(req, res) {
    const funcName = "createWallet";

    try {
      const accountName = req.body.account_name;
      const account = req.body.account;
      const privateKey = req.body.private_key;
      console.log(`[${funcName}] req.body: ${JSON.stringify(req.body)}`);

      const walletInfo = {
        account_name: accountName,
        account: account,
        privateKey: CipherUtil.encrypt(privateKey),
      };

      console.log(`[${funcName}] walletInfo: ${JSON.stringify(walletInfo)}`);
    } catch (err) {
      console.error(`[${funcName}] err:`, err);
      return ResponseHandler.sendServerError(req, res, err);
    }
  }
}

module.exports = WalletController;
