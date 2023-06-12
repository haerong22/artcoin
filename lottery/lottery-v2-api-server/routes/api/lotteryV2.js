const router = require("express").Router();
const LotteryV2Controller = require("../../controllers/LotteryV2Controller");

router.post("/enter", LotteryV2Controller.enter);

router.get("/balance", LotteryV2Controller.getBalance);

module.exports = router;
