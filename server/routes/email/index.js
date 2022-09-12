const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.post("/connection", controller.connectionEmail);
router.post("/connectionAdd", controller.connectionAddEmail);
router.get("/:no", middlewares.jwtAuth, controller.getDeleteNumber);
router.get("/inquiry/:user_no", middlewares.jwtAuth, controller.getEmailId);
router.get("/count/:user_no", middlewares.jwtAuth, controller.countEmail);
router.post("/predict", middlewares.jwtAuth, controller.predictEmail);
router.post("/delete", middlewares.jwtAuth, controller.deleteEmail);

router.get(
  "/deleteTable/:userNo",
  middlewares.jwtAuth,
  controller.showDeleteEmail
);
router.post("/restore", middlewares.jwtAuth, controller.restoreEmailList);

module.exports = router;
