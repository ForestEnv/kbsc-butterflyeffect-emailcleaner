const router = require("express").Router();

const userRouter = require("./user");
const emailConnectionRouter = require("./email_link");
const emailCountRouter = require("./email_count");
const emailPredictRouter = require("./email_predict");
const emailDeleteRouter = require("./email_delete");

router.use("/users", userRouter);
router.use("/email_link", emailConnectionRouter);
router.use("/email_count", emailCountRouter);
router.use("/email_predict", emailPredictRouter);
router.use("/email_delete", emailDeleteRouter);

module.exports = router;
