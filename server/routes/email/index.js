const router = require('express').Router();
const middlewares = require('../../middlewares/auth');
const controller = require('./controller');

router.post('/', middlewares.jwtAuth, controller.connectionEmail);

module.exports = router;