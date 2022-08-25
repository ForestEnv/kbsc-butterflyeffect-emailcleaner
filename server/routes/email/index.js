const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.post("/connection", middlewares.jwtAuth, controller.connectionEmail);
router.post("/connectionAdd", controller.connectionAddEmail);
//이메일 수 조회는 get 방식으로 변경 필요
router.post("/count", controller.countEmail);
//분류된 결과 조회는 get 방식으로 변경 필요
router.post("/predict", controller.predictEmail);
router.post("/delete", controller.deleteEmail);

module.exports = router;
