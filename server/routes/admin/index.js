const router = require("express").Router();
const middlewares = require("../../middlewares/auth");
const controller = require("./controller");

router.get("/updateMiles", controller.updateUserMiles);
router.post("/register", controller.adminregister);
router.post("/login", middlewares.adlocalAuth, controller.adminlogin);
module.exports = router;
