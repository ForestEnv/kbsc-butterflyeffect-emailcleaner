const router = require('express').Router();

const userRouter = require('./user');
const emailConnectionRouter = require('./email');

router.use('/users', userRouter);
router.use('/email', emailConnectionRouter);

module.exports = router;