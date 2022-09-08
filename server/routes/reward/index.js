const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.get(
  "/getStatistics/:userNo",
  middlewares.jwtAuth,
  controller.showStatistics
);
router.get("/getRank/:userNo", middlewares.jwtAuth, controller.showRank);
router.post(
  "/discount/:userNo",
  middlewares.jwtAuth,
  controller.desclineUserMiles
);

module.exports = router;
