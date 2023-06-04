const router = require("express").Router();
const WalletController = require("../../controllers/WalletController");

// POST http://localhost:3000/wallet
router.post("", WalletController.createWallet);

module.exports = router;
