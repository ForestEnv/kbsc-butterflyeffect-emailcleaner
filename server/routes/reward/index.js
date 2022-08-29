const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.get("/getStatistics/:userNo", controller.showStatistics);

module.exports = router;
