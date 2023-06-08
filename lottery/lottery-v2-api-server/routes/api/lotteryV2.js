const router = require("express").Router();
const LotteryV2Controller = require("../../controllers/LotteryV2Controller");

// POST http://localhost:3000/wallet
router.post("/enter", LotteryV2Controller.enter);

module.exports = router;
