const router = require('express').Router();
const middlewares = require('../../middlewares/auth');
const controller = require('./controller');

router.post('/', controller.connectionEmail);
router.post("/", controller.connectionAddEmail);
//이메일 수 조회는 get 방식으로 변경 필요
router.post("/", controller.countEmail);
//분류된 결과 조회는 get 방식으로 변경 필요
router.post("/", controller.predictEmail);
router.post("/", controller.deleteEmail);

module.exports = router;