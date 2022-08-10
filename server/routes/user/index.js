const router = require('express').Router();
const middlewares = require('../../middlewares/auth');
const controller = require('./controller');

router.post('/register', controller.register);
router.post('/login', middlewares.localAuth, controller.login);

module.exports = router;