const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.get(
  "/getStatistics/:user_no",
  middlewares.jwtAuth,
  controller.showStatistics
);
router.get("/getRank/:userNo", middlewares.jwtAuth, controller.showRank);
router.post(
  "/discount/:userNo",
  middlewares.jwtAuth,
  controller.desclineUserMiles
);

router.get(
  "/userRewardInfo/:user_no",
  middlewares.jwtAuth,
  controller.showRewardInfo
);

router.get("/userMiles/:userNo", middlewares.jwtAuth, controller.showMiles);

module.exports = router;
