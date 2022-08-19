const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.post("/", controller.countEmail);

module.exports = router;
