const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.get("/getStatistics/:userNo", controller.showStatistics);
router.get("/getRank/:userNo", controller.showRank);
router.post("/discount/:userNo", controller.desclineUserMiles);

module.exports = router;
