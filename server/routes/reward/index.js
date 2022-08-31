const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.get("/getStatistics/:userNo", controller.showStatistics);
router.get("/getRank/:userNo", controller.showRank);

module.exports = router;
