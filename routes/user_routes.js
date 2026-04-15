const router = require('express').Router();
const controller = require('../controller/user_controller');

router.get('/login', controller.login_get);
router.post('/login', controller.login_post);

router.get('/signup', controller.signup_get);
router.post('/signup', controller.signup_post);

module.exports = router;
